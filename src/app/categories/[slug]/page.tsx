import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CATEGORIES,
  NEWSLETTERS,
  Category,
  formatSubscribers,
} from "@/lib/data";
import NewsletterCard from "@/components/NewsletterCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.id }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  const newsletters = NEWSLETTERS.filter((n) => n.category === (slug as Category))
    .sort((a, b) => b.subscribers - a.subscribers);

  const totalSubscribers = newsletters.reduce((s, n) => s + n.subscribers, 0);
  const topRated = [...newsletters].sort((a, b) => b.rating - a.rating)[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className={`${category.bgColor} border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-start gap-5">
            <div className="text-6xl">{category.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href="/categories"
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  Categories
                </Link>
                <span className="text-gray-300">/</span>
                <span className={`text-sm font-semibold ${category.color}`}>
                  {category.label}
                </span>
              </div>
              <h1 className={`text-3xl font-black ${category.color} mb-2`}>
                {category.label} Newsletters
              </h1>
              <p className="text-gray-600 max-w-xl">{category.description}</p>

              <div className="flex flex-wrap gap-6 mt-5">
                <div>
                  <div className="text-2xl font-black text-gray-900">
                    {newsletters.length}
                  </div>
                  <div className="text-xs text-gray-500">Newsletters</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900">
                    {formatSubscribers(totalSubscribers)}
                  </div>
                  <div className="text-xs text-gray-500">Total subscribers</div>
                </div>
                {topRated && (
                  <div>
                    <div className="text-2xl font-black text-gray-900 flex items-center gap-1">
                      {topRated.rating}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-xs text-gray-500">Top rating</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletters Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {newsletters.length > 0 ? (
          <>
            {/* Featured in category */}
            {newsletters.filter((n) => n.featured).length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-black text-gray-900 mb-4">
                  ⭐ Featured in {category.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {newsletters
                    .filter((n) => n.featured)
                    .map((newsletter) => (
                      <NewsletterCard
                        key={newsletter.id}
                        newsletter={newsletter}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* All newsletters */}
            {newsletters.filter((n) => !n.featured).length > 0 && (
              <div>
                <h2 className="text-xl font-black text-gray-900 mb-4">
                  All {category.label} Newsletters
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {newsletters
                    .filter((n) => !n.featured)
                    .map((newsletter) => (
                      <NewsletterCard
                        key={newsletter.id}
                        newsletter={newsletter}
                      />
                    ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Coming soon
            </h3>
            <p className="text-gray-500">
              We&apos;re curating newsletters for this category. Check back soon!
            </p>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.filter((c) => c.id !== slug).map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${cat.bgColor} ${cat.color} hover:opacity-80 transition-opacity`}
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
