import { NextRequest, NextResponse } from "next/server";

export interface WebSearchResult {
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  source: string;
  publishedAt: string;
  favicon: string;
}

function extractText(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = xml.match(re);
  if (!match) return "";
  return (match[1] || match[2] || "").trim();
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  const match = xml.match(re);
  return match ? match[1] : "";
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]+>/g, "").trim();
}

function getDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function getFaviconUrl(domain: string): string {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [], error: null });
  }

  try {
    const encoded = encodeURIComponent(query);

    const rssUrl = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;

    const response = await fetch(rssUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();

    const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

    const results: WebSearchResult[] = itemBlocks.slice(0, 12).map((item) => {
      const rawTitle = extractText(item, "title");
      const rawLink = extractText(item, "link") || extractAttr(item, "link", "href");
      const rawDesc = extractText(item, "description");
      const source = extractText(item, "source");
      const pubDate = extractText(item, "pubDate");

      const title = decodeHtmlEntities(stripHtml(rawTitle));
      const resolvedUrl = rawLink || "";
      const snippet = decodeHtmlEntities(stripHtml(rawDesc)).slice(0, 240);
      const domain = getDomain(resolvedUrl);

      let publishedAt = "";
      if (pubDate) {
        try {
          publishedAt = new Date(pubDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        } catch {
          publishedAt = pubDate;
        }
      }

      return {
        title,
        url: resolvedUrl,
        displayUrl: domain,
        snippet,
        source: source || domain,
        publishedAt,
        favicon: getFaviconUrl(domain),
      };
    });

    return NextResponse.json({ results, error: null });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json(
      { results: [], error: "Search failed. Please try again." },
      { status: 500 }
    );
  }
}
