import Link from "next/link";
import { CATEGORIES, getNewslettersByCategory } from "@/lib/data";

interface CategoryCardProps {
  categoryId: (typeof CATEGORIES)[0]["id"];
}

export default function CategoryCard({ categoryId }: CategoryCardProps) {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;

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
        <p className="text-gray-500 text-sm leading-relaxed mb-3">
          {category.description}
        </p>
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
