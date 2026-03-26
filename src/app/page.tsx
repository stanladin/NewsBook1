import Link from "next/link";
import {
  NEWSLETTERS,
  CATEGORIES,
  formatSubscribers,
} from "@/lib/data";
import CategoryCard from "@/components/CategoryCard";

export default function HomePage() {
  const trending = [...NEWSLETTERS]
    .sort((a, b) => b.subscribers - a.subscribers)
    .slice(0, 4);
  const topCategories = [...CATEGORIES.slice(0, 7), CATEGORIES.find(c => c.id === "gaming")!];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block"></span>
              Discover 1000+ newsletters
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
              Your personal{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                newsletter
              </span>{" "}
              library
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
              Search, discover, and save the world&apos;s best newsletters —
              from tech and fashion to cooking and world news. All in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg text-base"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                Search Newsletters
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-white/20 transition-colors text-base"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
            <div>
              <div className="text-3xl font-black text-white">1K+</div>
              <div className="text-blue-200 text-sm mt-1">Newsletters</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">11</div>
              <div className="text-blue-200 text-sm mt-1">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white">Free</div>
              <div className="text-blue-200 text-sm mt-1">Forever</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                Browse by Category
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Find newsletters tailored to your interests
              </p>
            </div>
            <Link
              href="/categories"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
            >
              All categories
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
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {topCategories.map((cat) => (
              <CategoryCard key={cat.id} categoryId={cat.id} />
            ))}
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-900">
              Trending Now
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Most subscribed newsletters this month
            </p>
          </div>
          <div className="space-y-3">
            {trending.map((newsletter, index) => {
              const category = CATEGORIES.find(
                (c) => c.id === newsletter.category
              );
              return (
                <a
                  key={newsletter.id}
                  href={newsletter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-gray-100">
                    <div className="text-2xl font-black text-gray-200 w-8 shrink-0 text-center">
                      {index + 1}
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${newsletter.imageColor} flex items-center justify-center text-xl shrink-0`}
                    >
                      {newsletter.imageIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-gray-900 text-sm truncate">
                          {newsletter.title}
                        </h3>
                        {category && (
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${category.bgColor} ${category.color} shrink-0`}
                          >
                            {category.label}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        by {newsletter.author}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-gray-900">
                        {formatSubscribers(newsletter.subscribers)}
                      </div>
                      <div className="text-xs text-gray-400">subscribers</div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* CTA Banner */}
        <section>
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Save your favorites. Build your library.
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Create a free account to bookmark newsletters, organize your
              reading list, and get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/auth?mode=signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-3 rounded-2xl hover:bg-blue-50 transition-colors shadow"
              >
                Create free account
              </Link>
              <Link
                href="/members"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-8 py-3 rounded-2xl hover:bg-white/20 transition-colors"
              >
                View member benefits
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                Contact Us
              </h2>
              <p className="text-gray-400 mb-6">
                Have questions or suggestions? We&apos;d love to hear from you.
              </p>
              <a
                href="mailto:stanladin@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-8 py-3 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                stanladin@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-sm font-black">N</span>
              </div>
              <span className="text-lg font-black text-gray-900">
                News<span className="text-blue-600">Book</span>
              </span>
            </div>
            <nav className="flex flex-wrap gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link
                href="/search"
                className="hover:text-gray-900 transition-colors"
              >
                Search
              </Link>
              <Link
                href="/categories"
                className="hover:text-gray-900 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/members"
                className="hover:text-gray-900 transition-colors"
              >
                My Library
              </Link>
            </nav>
            <p className="text-sm text-gray-400">
              © 2026 NewsBook. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
