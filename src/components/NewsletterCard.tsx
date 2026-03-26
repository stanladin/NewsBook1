"use client";

import { useState } from "react";
import { Newsletter, CATEGORIES, formatSubscribers } from "@/lib/data";
import { toggleFavorite, isFavorite } from "@/lib/favorites";

interface NewsletterCardProps {
  newsletter: Newsletter;
  onFavoriteChange?: (id: string, isFav: boolean) => void;
}

export default function NewsletterCard({
  newsletter,
  onFavoriteChange,
}: NewsletterCardProps) {
  const [favorited, setFavorited] = useState(() => isFavorite(newsletter.id));
  const [animating, setAnimating] = useState(false);

  const category = CATEGORIES.find((c) => c.id === newsletter.category);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(newsletter.id);
    setFavorited(newState);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
    onFavoriteChange?.(newsletter.id, newState);
  };

  const frequencyLabel = {
    daily: "Daily",
    weekly: "Weekly",
    biweekly: "Bi-weekly",
    monthly: "Monthly",
  }[newsletter.frequency];

  return (
    <a href={newsletter.url} target="_blank" rel="noopener noreferrer">
      <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full flex flex-col">
        {/* Header Gradient */}
        <div
          className={`bg-gradient-to-br ${newsletter.imageColor} h-28 flex items-center justify-center relative`}
        >
          <span className="text-5xl">{newsletter.imageIcon}</span>
          {newsletter.featured && (
            <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Featured
            </span>
          )}
          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              favorited
                ? "bg-red-500 text-white"
                : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            } ${animating ? "scale-125" : "scale-100"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={favorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${category.bgColor} ${category.color}`}
              >
                {category.icon} {category.label}
              </span>
            )}
            <span className="text-xs text-gray-400 ml-auto">{frequencyLabel}</span>
          </div>

          <h3 className="font-bold text-gray-900 text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors">
            {newsletter.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">by {newsletter.author}</p>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
            {newsletter.description}
          </p>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              {formatSubscribers(newsletter.subscribers)} subscribers
            </div>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-3.5 h-3.5 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">
                {newsletter.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
