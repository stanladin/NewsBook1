import { WebSearchResult } from "@/app/api/search/route";

interface WebResultCardProps {
  result: WebSearchResult;
  index: number;
}

export default function WebResultCard({ result, index }: WebResultCardProps) {
  return (
    <a
      href={result.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Source row */}
      <div className="flex items-center gap-2 mb-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result.favicon}
          alt=""
          width={16}
          height={16}
          className="w-4 h-4 rounded-sm"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <span className="text-xs font-medium text-gray-500 truncate">
          {result.source}
        </span>
        {result.displayUrl && result.displayUrl !== result.source && (
          <span className="text-xs text-gray-300 truncate hidden sm:inline">
            · {result.displayUrl}
          </span>
        )}
        {result.publishedAt && (
          <span className="text-xs text-gray-300 ml-auto shrink-0">
            {result.publishedAt}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-2">
        {result.title}
      </h3>

      {/* Snippet */}
      {result.snippet && (
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
          {result.snippet}
        </p>
      )}

      {/* Read more indicator */}
      <div className="mt-2 flex items-center gap-1 text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
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
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
        Open article
      </div>
    </a>
  );
}
