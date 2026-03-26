"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, getNewslettersByCategory, Newsletter } from "@/lib/data";
import { toggleFavorite, isFavorite } from "@/lib/favorites";

interface CategoryCardProps {
  categoryId: (typeof CATEGORIES)[0]["id"];
}

function FavoriteIcon({ newsletterId }: { newsletterId: string }) {
  const [favorited, setFavorited] = useState(() => isFavorite(newsletterId));

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(newsletterId);
    setFavorited(newState);
  };

  return (
    <button
      onClick={handleClick}
      className={`p-1 rounded-full transition-colors ${
        favorited ? "text-red-500" : "text-gray-400 hover:text-red-400"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        className="w-3.5 h-3.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}

export default function CategoryCard({ categoryId }: CategoryCardProps) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

  const newsletters = getNewslettersByCategory(categoryId).slice(0, 3);
  const count = getNewslettersByCategory(categoryId).length;

  return (
    <Link href={`/categories/${categoryId}`}>
      <div
        className={`group ${category.bgColor} rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-100`}
      >
        <div className="text-3xl mb-3">{category.icon}</div>
        <h3 className={`font-bold text-lg ${category.color} mb-1`}>
          {category.label}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-2">
          {category.description}
        </p>

        {newsletters.length > 0 && (
          <div className="space-y-1.5 mb-3">
            {newsletters.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between text-xs text-gray-600 bg-white/50 rounded-lg px-2 py-1.5"
              >
                <span className="truncate font-medium">{n.title}</span>
                <FavoriteIcon newsletterId={n.id} />
              </div>
            ))}
          </div>
        )}

        <div className="text-xs font-medium text-gray-600 mb-3">
          <span className="text-gray-400">Most searched: </span>
          {category.mostSearched}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-400">
            {count} newsletter{count !== 1 ? "s" : ""}
          </span>
          <span
            className={`text-xs font-semibold ${category.color} flex items-center gap-1 group-hover:gap-2 transition-all`}
          >
            Browse
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
