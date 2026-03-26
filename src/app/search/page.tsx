"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES, Category, searchNewsletters, Newsletter } from "@/lib/data";
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
  const [results, setResults] = useState<Newsletter[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState("subscribers");

  const frequencies = [
    { value: "all", label: "Any frequency" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  useEffect(() => {
    const q = searchParams.get("q") || "";
    const cat = (searchParams.get("category") as Category) || "all";
    const freq = searchParams.get("frequency") || "all";
    setQuery(q);
    setSelectedCategory(cat);
    setSelectedFrequency(freq);
    performSearch(q, cat, freq);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const performSearch = (
    q: string,
    cat: Category | "all",
    freq: string
  ) => {
    const found = searchNewsletters(q, cat, freq);
    setResults(found);
    setHasSearched(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, selectedCategory, selectedFrequency);
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedFrequency !== "all") params.set("frequency", selectedFrequency);
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryChange = (cat: Category | "all") => {
    setSelectedCategory(cat);
    performSearch(query, cat, selectedFrequency);
  };

  const handleFrequencyChange = (freq: string) => {
    setSelectedFrequency(freq);
    performSearch(query, selectedCategory, freq);
  };

  const handleClear = () => {
    setQuery("");
    setSelectedCategory("all");
    setSelectedFrequency("all");
    performSearch("", "all", "all");
    router.push("/search");
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "subscribers") return b.subscribers - a.subscribers;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-3xl font-black text-gray-900 mb-6">
            Search Newsletters
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
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
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search newsletters, authors, topics..."
                className="w-full pl-12 pr-32 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                {(query || selectedCategory !== "all" || selectedFrequency !== "all") && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters and Sort Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Frequency:</span>
            <div className="flex gap-2">
              {frequencies.map((f) => (
                <button
                  key={f.value}
                  onClick={() => handleFrequencyChange(f.value)}
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
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="subscribers">Most subscribers</option>
              <option value="rating">Highest rated</option>
              <option value="name">A–Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        {hasSearched && (
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              {sortedResults.length === 0 ? (
                "No newsletters found"
              ) : (
                <>
                  <span className="font-semibold text-gray-900">
                    {sortedResults.length}
                  </span>{" "}
                  newsletter{sortedResults.length !== 1 ? "s" : ""} found
                  {query && (
                    <>
                      {" "}
                      for{" "}
                      <span className="font-semibold text-gray-900">
                        &ldquo;{query}&rdquo;
                      </span>
                    </>
                  )}
                </>
              )}
            </p>
          </div>
        )}

        {/* Results Grid */}
        {sortedResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {sortedResults.map((newsletter) => (
              <NewsletterCard key={newsletter.id} newsletter={newsletter} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No newsletters found
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Try different keywords, browse by category, or clear your filters
              to see all newsletters.
            </p>
            <button
              onClick={handleClear}
              className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Start exploring
            </h3>
            <p className="text-gray-500">
              Search for newsletters by name, author, or topic
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
