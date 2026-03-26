import { notFound } from "next/navigation";
import Link from "next/link";
import {
  NEWSLETTERS,
  CATEGORIES,
  getNewsletterById,
  formatSubscribers,
} from "@/lib/data";
import NewsletterCard from "@/components/NewsletterCard";
import FavoriteButton from "@/components/FavoriteButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return NEWSLETTERS.map((n) => ({ id: n.id }));
}

export default async function NewsletterDetailPage({ params }: PageProps) {
  const { id } = await params;
  const newsletter = getNewsletterById(id);

  if (!newsletter) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.id === newsletter.category);
  const related = NEWSLETTERS.filter(
    (n) => n.category === newsletter.category && n.id !== newsletter.id
  )
    .sort((a, b) => b.subscribers - a.subscribers)
    .slice(0, 3);

  const frequencyLabel = {
    daily: "Daily",
    weekly: "Weekly",
    biweekly: "Bi-weekly",
    monthly: "Monthly",
  }[newsletter.frequency];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/categories/${category.id}`}
                className={`hover:text-gray-700 transition-colors ${category.color}`}
              >
                {category.icon} {category.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900 font-medium truncate">
            {newsletter.title}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Hero Banner */}
          <div
            className={`bg-gradient-to-br ${newsletter.imageColor} h-48 sm:h-64 flex items-center justify-center relative`}
          >
            <span className="text-8xl sm:text-9xl">{newsletter.imageIcon}</span>
            {newsletter.featured && (
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold px-3 py-1 rounded-full">
                ⭐ Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {category && (
                    <Link
                      href={`/categories/${category.id}`}
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${category.bgColor} ${category.color} hover:opacity-80 transition-opacity`}
                    >
                      {category.icon} {category.label}
                    </Link>
                  )}
                  <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                    {frequencyLabel}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">
                  {newsletter.title}
                </h1>
                <p className="text-gray-500 text-sm">by {newsletter.author}</p>
              </div>
              <FavoriteButton newsletterId={newsletter.id} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-50">
              <div className="text-center">
                <div className="text-xl font-black text-gray-900">
                  {formatSubscribers(newsletter.subscribers)}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-gray-900 flex items-center justify-center gap-1">
                  {newsletter.rating}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-yellow-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-gray-900 capitalize">
                  {newsletter.frequency}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Frequency</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-base font-bold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600 leading-relaxed">{newsletter.description}</p>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h2 className="text-base font-bold text-gray-900 mb-2">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {newsletter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors capitalize"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            <div className={`bg-gradient-to-br ${newsletter.imageColor} rounded-2xl p-6 text-white`}>
              <h3 className="text-lg font-black mb-1">
                Subscribe to {newsletter.title}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Join {formatSubscribers(newsletter.subscribers)} readers — delivered{" "}
                {newsletter.frequency}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                  readOnly
                />
                <button className="bg-white text-gray-900 font-bold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm shrink-0">
                  Subscribe free
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Newsletters */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-gray-900">
                More {category?.label} Newsletters
              </h2>
              {category && (
                <Link
                  href={`/categories/${category.id}`}
                  className={`text-sm font-semibold ${category.color} flex items-center gap-1`}
                >
                  View all
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
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((n) => (
                <NewsletterCard key={n.id} newsletter={n} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
