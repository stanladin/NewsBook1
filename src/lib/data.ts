export type Category =
  | "tech"
  | "fashion"
  | "cooking"
  | "world-news"
  | "finance"
  | "health"
  | "science"
  | "sports"
  | "travel"
  | "culture";

export interface Newsletter {
  id: string;
  title: string;
  author: string;
  description: string;
  category: Category;
  tags: string[];
  subscribers: number;
  frequency: "daily" | "weekly" | "monthly" | "biweekly";
  imageColor: string;
  imageIcon: string;
  featured: boolean;
  rating: number;
  url: string;
}

export const CATEGORIES: {
  id: Category;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
}[] = [
  {
    id: "tech",
    label: "Tech",
    icon: "💻",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Latest in technology, AI, and software",
  },
  {
    id: "fashion",
    label: "Fashion",
    icon: "👗",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    description: "Style, trends, and fashion industry news",
  },
  {
    id: "cooking",
    label: "Cooking",
    icon: "🍳",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Recipes, food culture, and culinary arts",
  },
  {
    id: "world-news",
    label: "World News",
    icon: "🌍",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Global events, politics, and world affairs",
  },
  {
    id: "finance",
    label: "Finance",
    icon: "📈",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    description: "Markets, investing, and personal finance",
  },
  {
    id: "health",
    label: "Health",
    icon: "🏃",
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Wellness, fitness, and medical research",
  },
  {
    id: "science",
    label: "Science",
    icon: "🔬",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    description: "Research, discoveries, and innovation",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚽",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "Sports news, results, and analysis",
  },
  {
    id: "travel",
    label: "Travel",
    icon: "✈️",
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    description: "Destinations, tips, and travel guides",
  },
  {
    id: "culture",
    label: "Culture",
    icon: "🎭",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Arts, entertainment, and pop culture",
  },
];

export const NEWSLETTERS: Newsletter[] = [
  // Tech
  {
    id: "1",
    title: "The Byte Brief",
    author: "Alex Chen",
    description:
      "Your daily digest of the most important tech stories, from AI breakthroughs to startup funding. Concise, insightful, and always ahead of the curve.",
    category: "tech",
    tags: ["AI", "startups", "software", "hardware", "mobile", "apps", "smartphone"],
    subscribers: 245000,
    frequency: "daily",
    imageColor: "from-blue-500 to-indigo-600",
    imageIcon: "💻",
    featured: true,
    rating: 4.8,
    url: "#",
  },
  {
    id: "2",
    title: "Silicon Dispatch",
    author: "Maya Patel",
    description:
      "Deep dives into Silicon Valley culture, venture capital trends, and the humans behind the world's most influential tech companies.",
    category: "tech",
    tags: ["venture capital", "startups", "Silicon Valley"],
    subscribers: 128000,
    frequency: "weekly",
    imageColor: "from-cyan-500 to-blue-600",
    imageIcon: "🚀",
    featured: false,
    rating: 4.6,
    url: "#",
  },
  {
    id: "3",
    title: "AI Weekly",
    author: "Dr. Sam Torres",
    description:
      "The most comprehensive weekly roundup of artificial intelligence research, product launches, and ethical discussions in the AI space.",
    category: "tech",
    tags: ["AI", "machine learning", "research", "ethics"],
    subscribers: 312000,
    frequency: "weekly",
    imageColor: "from-purple-500 to-blue-600",
    imageIcon: "🤖",
    featured: true,
    rating: 4.9,
    url: "#",
  },
  {
    id: "4",
    title: "DevPulse",
    author: "Jordan Kim",
    description:
      "Essential reads for software developers: new frameworks, open source highlights, coding tips, and career advice in the tech industry.",
    category: "tech",
    tags: ["development", "open source", "frameworks", "career", "mobile", "apps", "iOS", "Android", "web"],
    subscribers: 89000,
    frequency: "weekly",
    imageColor: "from-green-500 to-teal-600",
    imageIcon: "⚡",
    featured: false,
    rating: 4.5,
    url: "#",
  },
  {
    id: "22",
    title: "Mobile Matters",
    author: "Tara Singh",
    description:
      "The essential weekly newsletter for mobile enthusiasts and developers. Covers iOS and Android app trends, mobile UX best practices, smartphone hardware reviews, and the business of mobile websites and apps.",
    category: "tech",
    tags: ["mobile", "iOS", "Android", "apps", "smartphone", "mobile web", "UX", "app development"],
    subscribers: 74000,
    frequency: "weekly",
    imageColor: "from-indigo-500 to-blue-600",
    imageIcon: "📱",
    featured: false,
    rating: 4.6,
    url: "#",
  },
  {
    id: "23",
    title: "App Economy Weekly",
    author: "Chris Barrett",
    description:
      "Deep-dive analysis of the mobile app market, app store optimization, monetization strategies, and growth tactics for mobile websites and native apps on iOS and Android.",
    category: "tech",
    tags: ["mobile", "apps", "app store", "iOS", "Android", "mobile websites", "monetization", "ASO"],
    subscribers: 51000,
    frequency: "weekly",
    imageColor: "from-violet-500 to-purple-600",
    imageIcon: "📲",
    featured: false,
    rating: 4.4,
    url: "#",
  },
  // Fashion
  {
    id: "5",
    title: "Vogue Insider",
    author: "Isabella Rossi",
    description:
      "Exclusive runway reports, trend forecasts, and behind-the-scenes access to the world's most prestigious fashion houses and designers.",
    category: "fashion",
    tags: ["runway", "luxury", "designers", "trends"],
    subscribers: 198000,
    frequency: "weekly",
    imageColor: "from-pink-500 to-rose-600",
    imageIcon: "👗",
    featured: true,
    rating: 4.7,
    url: "#",
  },
  {
    id: "6",
    title: "Street Style Weekly",
    author: "Zoe Martin",
    description:
      "Celebrating real fashion from real people. Street style photography, affordable trend alerts, and sustainable fashion spotlights.",
    category: "fashion",
    tags: ["street style", "sustainable", "affordable", "trends"],
    subscribers: 76000,
    frequency: "weekly",
    imageColor: "from-fuchsia-500 to-pink-600",
    imageIcon: "📸",
    featured: false,
    rating: 4.4,
    url: "#",
  },
  {
    id: "7",
    title: "The Fashion Report",
    author: "Marcus Delacroix",
    description:
      "Industry analysis, brand partnerships, and fashion business news. Essential reading for professionals in the fashion ecosystem.",
    category: "fashion",
    tags: ["business", "industry", "brands", "analysis"],
    subscribers: 54000,
    frequency: "biweekly",
    imageColor: "from-amber-500 to-orange-600",
    imageIcon: "💎",
    featured: false,
    rating: 4.3,
    url: "#",
  },
  // Cooking
  {
    id: "8",
    title: "The Kitchen Table",
    author: "Chef Maria Santos",
    description:
      "Seasonal recipes, cooking techniques, and food stories from kitchens around the world. Perfect for home cooks of every skill level.",
    category: "cooking",
    tags: ["recipes", "seasonal", "techniques", "home cooking"],
    subscribers: 167000,
    frequency: "weekly",
    imageColor: "from-orange-400 to-red-500",
    imageIcon: "🍳",
    featured: true,
    rating: 4.8,
    url: "#",
  },
  {
    id: "9",
    title: "Flavor Lab",
    author: "David Nguyen",
    description:
      "The science of cooking meets creative experimentation. Molecular gastronomy, food chemistry, and innovative recipes for adventurous palates.",
    category: "cooking",
    tags: ["science", "molecular gastronomy", "experimental", "techniques"],
    subscribers: 43000,
    frequency: "biweekly",
    imageColor: "from-lime-500 to-green-600",
    imageIcon: "🧪",
    featured: false,
    rating: 4.6,
    url: "#",
  },
  {
    id: "10",
    title: "Global Eats",
    author: "Priya Sharma",
    description:
      "Explore world cuisines from the comfort of your kitchen. Authentic recipes, cultural context, and ingredient guides from every continent.",
    category: "cooking",
    tags: ["world cuisine", "international", "authentic", "cultural"],
    subscribers: 91000,
    frequency: "weekly",
    imageColor: "from-yellow-400 to-orange-500",
    imageIcon: "🌮",
    featured: false,
    rating: 4.7,
    url: "#",
  },
  // World News
  {
    id: "11",
    title: "The Global Brief",
    author: "Reuters Editorial Team",
    description:
      "Unbiased, comprehensive coverage of international news. Stay informed on geopolitics, economics, and humanitarian issues affecting our world.",
    category: "world-news",
    tags: ["geopolitics", "international", "economics", "humanitarian"],
    subscribers: 523000,
    frequency: "daily",
    imageColor: "from-green-600 to-teal-700",
    imageIcon: "🌍",
    featured: true,
    rating: 4.7,
    url: "#",
  },
  {
    id: "12",
    title: "Asia Correspondent",
    author: "Li Wei Zhang",
    description:
      "Your trusted source for news across Asia-Pacific. From politics and economics to culture and society across the world's most populous region.",
    category: "world-news",
    tags: ["Asia", "Pacific", "politics", "economics"],
    subscribers: 87000,
    frequency: "daily",
    imageColor: "from-red-500 to-orange-600",
    imageIcon: "🗺️",
    featured: false,
    rating: 4.5,
    url: "#",
  },
  {
    id: "13",
    title: "Climate Watch",
    author: "Environmental Press Collective",
    description:
      "Dedicated coverage of climate change, environmental policy, and green technology solutions shaping the future of our planet.",
    category: "world-news",
    tags: ["climate", "environment", "policy", "green tech"],
    subscribers: 156000,
    frequency: "weekly",
    imageColor: "from-emerald-500 to-green-700",
    imageIcon: "🌱",
    featured: false,
    rating: 4.6,
    url: "#",
  },
  // Finance
  {
    id: "14",
    title: "Market Pulse",
    author: "Sarah Bloomberg",
    description:
      "Daily market updates, investment analysis, and financial news. From stocks and crypto to real estate and commodities.",
    category: "finance",
    tags: ["markets", "stocks", "crypto", "investing"],
    subscribers: 287000,
    frequency: "daily",
    imageColor: "from-emerald-500 to-teal-600",
    imageIcon: "📈",
    featured: true,
    rating: 4.6,
    url: "#",
  },
  {
    id: "15",
    title: "Personal Finance Pro",
    author: "Robert Chen",
    description:
      "Practical money advice for everyday people. Budgeting strategies, retirement planning, tax tips, and wealth-building for all income levels.",
    category: "finance",
    tags: ["budgeting", "retirement", "tax", "personal finance"],
    subscribers: 134000,
    frequency: "weekly",
    imageColor: "from-teal-500 to-emerald-600",
    imageIcon: "💰",
    featured: false,
    rating: 4.5,
    url: "#",
  },
  // Health
  {
    id: "16",
    title: "Wellness Weekly",
    author: "Dr. Emma Wilson",
    description:
      "Evidence-based health tips, nutrition science, mental wellness strategies, and the latest medical research made accessible for everyone.",
    category: "health",
    tags: ["wellness", "nutrition", "mental health", "research"],
    subscribers: 209000,
    frequency: "weekly",
    imageColor: "from-rose-400 to-red-500",
    imageIcon: "🏃",
    featured: true,
    rating: 4.7,
    url: "#",
  },
  {
    id: "17",
    title: "The Mindful Digest",
    author: "Dr. James Park",
    description:
      "Meditation, mindfulness, and mental health resources. Weekly practices, research insights, and expert interviews on psychological wellbeing.",
    category: "health",
    tags: ["mindfulness", "meditation", "mental health", "psychology"],
    subscribers: 78000,
    frequency: "weekly",
    imageColor: "from-violet-400 to-purple-500",
    imageIcon: "🧘",
    featured: false,
    rating: 4.8,
    url: "#",
  },
  // Science
  {
    id: "18",
    title: "Science Digest",
    author: "Nature Media Group",
    description:
      "Weekly highlights from the world of science — space exploration, biology, physics, and the discoveries changing our understanding of the universe.",
    category: "science",
    tags: ["space", "biology", "physics", "discovery"],
    subscribers: 176000,
    frequency: "weekly",
    imageColor: "from-violet-500 to-indigo-600",
    imageIcon: "🔬",
    featured: true,
    rating: 4.9,
    url: "#",
  },
  // Sports
  {
    id: "19",
    title: "The Sporting Edge",
    author: "Sports Analytics Team",
    description:
      "In-depth sports analysis, fantasy insights, and behind-the-scenes stories. Data-driven takes on football, basketball, tennis, and more.",
    category: "sports",
    tags: ["analytics", "fantasy", "football", "basketball"],
    subscribers: 312000,
    frequency: "daily",
    imageColor: "from-yellow-500 to-orange-600",
    imageIcon: "⚽",
    featured: true,
    rating: 4.6,
    url: "#",
  },
  // Travel
  {
    id: "20",
    title: "Wanderlust Weekly",
    author: "The Globe Trotters Collective",
    description:
      "Hidden gems, travel hacks, destination guides, and inspiring stories from travelers around the world. Your passport to adventure.",
    category: "travel",
    tags: ["destinations", "travel hacks", "adventure", "guides"],
    subscribers: 143000,
    frequency: "weekly",
    imageColor: "from-sky-400 to-blue-500",
    imageIcon: "✈️",
    featured: true,
    rating: 4.8,
    url: "#",
  },
  // Culture
  {
    id: "21",
    title: "Culture Club",
    author: "Arts & Culture Desk",
    description:
      "Film, music, literature, and art — your weekly guide to the cultural moments worth experiencing and the conversations shaping our society.",
    category: "culture",
    tags: ["film", "music", "art", "literature"],
    subscribers: 98000,
    frequency: "weekly",
    imageColor: "from-purple-500 to-pink-600",
    imageIcon: "🎭",
    featured: true,
    rating: 4.7,
    url: "#",
  },
];

export function formatSubscribers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
  return count.toString();
}

export function searchNewsletters(
  query: string,
  category?: Category | "all",
  frequency?: string
): Newsletter[] {
  let results = NEWSLETTERS;

  if (category && category !== "all") {
    results = results.filter((n) => n.category === category);
  }

  if (frequency && frequency !== "all") {
    results = results.filter((n) => n.frequency === frequency);
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q) ||
        n.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  return results;
}

export function getFeaturedNewsletters(): Newsletter[] {
  return NEWSLETTERS.filter((n) => n.featured);
}

export function getNewslettersByCategory(category: Category): Newsletter[] {
  return NEWSLETTERS.filter((n) => n.category === category);
}

export function getNewsletterById(id: string): Newsletter | undefined {
  return NEWSLETTERS.find((n) => n.id === id);
}
