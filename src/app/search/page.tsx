"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES, Category, searchNewsletters } from "@/lib/data";
import NewsletterCard from "@/components/NewsletterCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    (searchParams.get("category") as Category) || "all"
  );
  const [selectedFrequency, setSelectedFrequency] = useState(
    searchParams.get("frequency") || "all"
  );
  const [sortBy, setSortBy] = useState("subscribers");

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

  const handleQueryChange = (val: string) => {
    setQuery(val);
    const params = new URLSearchParams();
    if (val) params.set("q", val);
    router.replace(`/search?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedFrequency("all");
    router.replace("/search", { scroll: false });
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-6">
          <h1 className="text-2xl font-black text-gray-900 mb-4">Search</h1>
          <div className="relative">
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
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search newsletters, topics, authors..."
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
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