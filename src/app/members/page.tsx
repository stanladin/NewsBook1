"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NEWSLETTERS, CATEGORIES, Newsletter, formatSubscribers } from "@/lib/data";
import { getFavorites, getUser, User } from "@/lib/favorites";
import NewsletterCard from "@/components/NewsletterCard";

export default function MembersPage() {
  const [user, setUser] = useState<User | null>(() => getUser());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [activeTab, setActiveTab] = useState<"all" | string>("all");

  useEffect(() => {
    const handleUserChanged = () => {
      setUser(getUser());
      setFavorites(getFavorites());
    };
    window.addEventListener("userChanged", handleUserChanged);
    window.addEventListener("storage", handleUserChanged);
    return () => {
      window.removeEventListener("userChanged", handleUserChanged);
      window.removeEventListener("storage", handleUserChanged);
    };
  }, []);

  const savedNewsletters: Newsletter[] = favorites
    .map((id) => NEWSLETTERS.find((n) => n.id === id))
    .filter(Boolean) as Newsletter[];

  const filteredNewsletters =
    activeTab === "all"
      ? savedNewsletters
      : savedNewsletters.filter((n) => n.category === activeTab);

  const savedCategories = [
    ...new Set(savedNewsletters.map((n) => n.category)),
  ];

  const handleFavoriteChange = (id: string, isFav: boolean) => {
    if (!isFav) {
      setFavorites((prev) => prev.filter((fid) => fid !== id));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">
            📚
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">
            Your Newsletter Library
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Sign in or create a free account to save your favorite newsletters
            and build your personal library.
          </p>
          <div className="space-y-3">
            <Link
              href="/auth?mode=signup"
              className="flex items-center justify-center w-full bg-blue-600 text-white font-bold py-3 rounded-2xl hover:bg-blue-700 transition-colors"
            >
              Create free account
            </Link>
            <Link
              href="/auth"
              className="flex items-center justify-center w-full bg-gray-50 text-gray-700 font-semibold py-3 rounded-2xl hover:bg-gray-100 transition-colors border border-gray-200"
            >
              Sign in
            </Link>
          </div>

          {/* Benefits */}
          <div className="mt-8 text-left space-y-3">
            {[
              { icon: "❤️", text: "Save unlimited favorites" },
              { icon: "📂", text: "Organize by category" },
              { icon: "🔔", text: "Get personalized picks" },
              { icon: "⚡", text: "Quick access to your list" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-base">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-sm">
              {user.avatar}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-black text-gray-900">
                {user.name}&apos;s Library
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Member since {user.joinedDate} · {savedNewsletters.length} saved newsletter{savedNewsletters.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/search"
                className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
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
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                Discover more
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6 max-w-md">
            <div className="text-center">
              <div className="text-xl font-black text-gray-900">
                {savedNewsletters.length}
              </div>
              <div className="text-xs text-gray-500">Saved</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-gray-900">
                {savedCategories.length}
              </div>
              <div className="text-xs text-gray-500">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-black text-gray-900">
                {savedNewsletters.length > 0
                  ? formatSubscribers(
                      savedNewsletters.reduce((s, n) => s + n.subscribers, 0)
                    )
                  : "0"}
              </div>
              <div className="text-xs text-gray-500">Total reach</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {savedNewsletters.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your library is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start saving newsletters by clicking the heart icon on any
              newsletter card.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl hover:bg-blue-700 transition-colors"
              >
                🔍 Search Newsletters
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                📂 Browse Categories
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
                }`}
              >
                All ({savedNewsletters.length})
              </button>
              {savedCategories.map((catId) => {
                const cat = CATEGORIES.find((c) => c.id === catId);
                if (!cat) return null;
                const count = savedNewsletters.filter(
                  (n) => n.category === catId
                ).length;
                return (
                  <button
                    key={catId}
                    onClick={() => setActiveTab(catId)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                      activeTab === catId
                        ? "bg-blue-600 text-white shadow-sm"
                        : `${cat.bgColor} ${cat.color} hover:opacity-80`
                    }`}
                  >
                    {cat.icon} {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Newsletters Grid */}
            {filteredNewsletters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredNewsletters.map((newsletter) => (
                  <NewsletterCard
                    key={newsletter.id}
                    newsletter={newsletter}
                    onFavoriteChange={handleFavoriteChange}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500">
                  No saved newsletters in this category yet.
                </p>
              </div>
            )}

            {/* Discover More */}
            <div className="mt-14 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-blue-100">
              <h3 className="text-xl font-black text-gray-900 mb-2">
                Discover more newsletters
              </h3>
              <p className="text-gray-500 mb-6 text-sm">
                Explore our full collection and find your next favorite read
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {CATEGORIES.filter((c) => !savedCategories.includes(c.id)).slice(0, 5).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${cat.bgColor} ${cat.color} hover:opacity-80 transition-opacity`}
                  >
                    {cat.icon} {cat.label}
                  </Link>
                ))}
                <Link
                  href="/search"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  🔍 Search all
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
