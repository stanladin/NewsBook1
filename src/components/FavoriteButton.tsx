"use client";

import { useState } from "react";
import { toggleFavorite, isFavorite } from "@/lib/favorites";

interface FavoriteButtonProps {
  newsletterId: string;
}

export default function FavoriteButton({ newsletterId }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(() => isFavorite(newsletterId));
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    const newState = toggleFavorite(newsletterId);
    setFavorited(newState);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
        animating ? "scale-95" : "scale-100"
      } ${
        favorited
          ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
          : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
      }`}
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
      {favorited ? "Saved" : "Save"}
    </button>
  );
}
