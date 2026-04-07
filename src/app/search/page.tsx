"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES, Category, searchNewsletters } from "@/lib/data";
import NewsletterCard from "@/components/NewsletterCard";

interface WebSearchResult {
  title: string;
  url: string;
  displayUrl: string;
  snippet: string;
  source: string;
  publishedAt: string;
  favicon: string;
}

type Tab = "web" | "newsletters";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeTab, setActiveTab] = useState<Tab>(
    (searchParams.get("tab") as Tab) || "newsletters"
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category) || "all"
  );
  const [selectedFrequency, setSelectedFrequency] = useState(
    searchParams.get("frequency") || "all"
  );
  const [sortBy, setSortBy] = useState("subscribers");

  const [webResults, setWebResults] = useState<WebSearchResult[]>([]);
  const [webLoading, setWebLoading] = useState(false);
  const [webError, setWebError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const frequencies = [
    { value: "all", label: "Any frequency" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  const newsletterResults = searchNewsletters(
    query,
    selectedCategory,
    selectedFrequency
  );
  const sortedNewsletters = [...newsletterResults].sort((a, b) => {
    if (sortBy === "subscribers") return b.subscribers - a.subscribers;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.title.localeCompare(b.title);
    return 0;
  });

  useEffect(() => {
    if (activeTab !== "web") return;
    if (!query.trim() || query.trim().length < 2) {
      setWebResults([]);
      setWebError(null);
      setWebLoading(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    setWebLoading(true);
    setWebError(null);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}`
        );
        if (!res.ok) throw new Error("Search request failed");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setWebResults(data.results || []);
      } catch (err) {
        setWebError(
          err instanceof Error ? err.message : "Search failed. Please try again."
        );
        setWebResults([]);
      } finally {
        setWebLoading(false);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, activeTab]);

  const syncUrl = (q: string, tab: Tab) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("tab", tab);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    syncUrl(val, activeTab);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    syncUrl(query, tab);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedFrequency("all");
    setWebResults([]);
    setWebError(null);
    router.replace("/search", { scroll: false });
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-0">
          <h1 className="text-2xl font-black text-gray-900 mb-4">Search</h1>
          <div className="relative mb-4">
            {webLoading && activeTab === "web" ? (
              <svg
                className="animate-spin absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            )}
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder={
                activeTab === "web"
                  ? "Search the web for websites..."
                  : "Search newsletter titles, authors, topics..."
              }
              autoFocus
              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
            {hasQuery && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex gap-1 border-b border-gray-100">
            <button
              onClick={() => handleTabChange("web")}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                activeTab === "web"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              Web Results
              {hasQuery && activeTab === "web" && webResults.length > 0 && (
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {webResults.length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleTabChange("newsletters")}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
                activeTab === "newsletters"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                />
              </svg>
              Newsletter Catalog
              {hasQuery && activeTab === "newsletters" && sortedNewsletters.length > 0 && (
                <span className="bg-blue-100 text-blue-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {sortedNewsletters.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "web" ? (
          <>
            {!hasQuery && (
              <div className="text-center py-24">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
                  🌐
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Search the web
                </h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  Type anything above to search for websites in real time.
                </p>
                <div className="mt-8">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    Popular searches
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      "forbes",
                      "bbc news",
                      "netflix",
                      "techcrunch",
                      "espn",
                      "vogue",
                    ].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleQueryChange(s)}
                        className="px-4 py-1.5 bg-white border border-gray-200 text-sm text-gray-600 rounded-full hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {hasQuery && webLoading && webResults.length === 0 && (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-gray-200 rounded" />
                      <div className="w-24 h-3 bg-gray-200 rounded" />
                    </div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                    <div className="w-full h-3 bg-gray-100 rounded mb-1" />
                    <div className="w-2/3 h-3 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>
            )}

            {hasQuery && webError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">⚠️</div>
                <p className="font-semibold text-red-700 mb-1">
                  Search unavailable
                </p>
                <p className="text-sm text-red-500">{webError}</p>
              </div>
            )}

            {hasQuery && !webLoading && !webError && webResults.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Try different keywords or check your spelling.
                </p>
                <button
                  onClick={handleClear}
                  className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}

            {webResults.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">
                      {webResults.length}
                    </span>{" "}
                    web results for{" "}
                    <span className="font-semibold text-gray-900">
                      &quot;{query}&quot;
                    </span>
                  </p>
                </div>
                <div className="space-y-4">
                  {webResults.map((result, i) => (
                    <a
                      key={i}
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={result.favicon}
                          alt=""
                          className="w-4 h-4"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <span className="text-xs text-gray-500">
                          {result.source}
                        </span>
                        {result.publishedAt && (
                          <span className="text-xs text-gray-400">
                            • {result.publishedAt}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                        {result.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {result.snippet}
                      </p>
                      <p className="text-xs text-blue-500 mt-1">
                        {result.displayUrl}
                      </p>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                All categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-blue-600 text-white shadow-sm"
                      : `${cat.bgColor} ${cat.color} hover:opacity-80`
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Frequency:</span>
                {frequencies.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSelectedFrequency(f.value)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedFrequency === f.value
                        ? "bg-gray-900 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="subscribers">Most subscribers</option>
                  <option value="rating">Highest rated</option>
                  <option value="name">A-Z</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">
                  {sortedNewsletters.length}
                </span>{" "}
                newsletter{sortedNewsletters.length !== 1 ? "s" : ""} found
                {query && (
                  <>
                    {" "}for{" "}
                    <span className="font-semibold text-gray-900">
                      &quot;{query}&quot;
                    </span>
                  </>
                )}
              </p>
            </div>

            {sortedNewsletters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {sortedNewsletters.map((n) => (
                  <NewsletterCard key={n.id} newsletter={n} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  No newsletters found
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Try different keywords or clear the filters.
                </p>
                <button
                  onClick={handleClear}
                  className="bg-blue-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
