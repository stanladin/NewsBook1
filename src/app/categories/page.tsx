import { CATEGORIES, NEWSLETTERS } from "@/lib/data";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesPage() {
  const totalNewsletters = NEWSLETTERS.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Browse Categories
            </h1>
            <p className="text-gray-500 text-base">
              Explore {totalNewsletters}+ newsletters across {CATEGORIES.length}{" "}
              categories. Find exactly what interests you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Newsletters", value: `${totalNewsletters}+`, icon: "📰" },
            { label: "Categories", value: CATEGORIES.length, icon: "📂" },
            { label: "Daily Updates", value: "3", icon: "⚡" },
            { label: "Free to Browse", value: "100%", icon: "✅" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 border border-gray-100 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} categoryId={cat.id} />
          ))}
        </div>

        {/* Popular picks within core categories */}
        <div className="mt-14">
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Spotlight Categories
          </h2>
          <p className="text-gray-500 mb-8 text-sm">
            Our top four categories with the most popular newsletters
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["world-news", "sports", "health", "gaming"] as const).map((catId) => {
              const cat = CATEGORIES.find((c) => c.id === catId)!;
              const newsletters = NEWSLETTERS.filter((n) => n.category === catId)
                .sort((a, b) => b.subscribers - a.subscribers)
                .slice(0, 3);
              return (
                <div
                  key={catId}
                  className={`${cat.bgColor} rounded-2xl p-5 border border-transparent`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{cat.icon}</span>
                    <h3 className={`font-black text-lg ${cat.color}`}>
                      {cat.label}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {newsletters.map((n) => (
                      <li key={n.id}>
                        <a
                          href={n.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-gray-700 hover:text-gray-900 flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-blue-500 shrink-0 transition-colors"></span>
                          <span className="truncate">{n.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/categories/${catId}`}
                    className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${cat.color} hover:underline`}
                  >
                    See all {cat.label} newsletters →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
