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
  | "culture"
  | "gaming"
  | "movies";

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
  mostSearched: string;
}[] = [
  {
    id: "world-news",
    label: "World News",
    icon: "🌍",
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Global events, politics, and world affairs",
    mostSearched: "BBC News",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚽",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "Sports news, results, and analysis",
    mostSearched: "ESPN",
  },
  {
    id: "health",
    label: "Health",
    icon: "🏃",
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Wellness, fitness, and medical research",
    mostSearched: "WebMD",
  },
  {
    id: "fashion",
    label: "Fashion",
    icon: "👗",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    description: "Style, trends, and fashion industry news",
    mostSearched: "Vogue",
  },
  {
    id: "tech",
    label: "Technology",
    icon: "💻",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Latest in technology, AI, and software",
    mostSearched: "Wired",
  },
  {
    id: "finance",
    label: "Finance",
    icon: "📈",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    description: "Markets, investing, and personal finance",
    mostSearched: "Bloomberg",
  },
  {
    id: "science",
    label: "Science",
    icon: "🔬",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    description: "Research, discoveries, and innovation",
    mostSearched: "National Geographic",
  },
  {
    id: "cooking",
    label: "Cooking",
    icon: "🍳",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Recipes, food culture, and culinary arts",
    mostSearched: "Bon Appétit",
  },
  {
    id: "travel",
    label: "Travel",
    icon: "✈️",
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    description: "Destinations, tips, and travel guides",
    mostSearched: "Condé Nast Traveler",
  },
  {
    id: "culture",
    label: "Culture",
    icon: "🎭",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Arts, entertainment, and pop culture",
    mostSearched: "Rolling Stone",
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: "🎮",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    description: "Video games, reviews, and gaming news",
    mostSearched: "PC Gamer",
  },
  {
    id: "movies",
    label: "Movies",
    icon: "🎬",
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Film news, reviews, and streaming",
    mostSearched: "IMDb",
  },
];

export const NEWSLETTERS: Newsletter[] = [
  // Tech
  {
    id: "1",
    title: "Forbes Tech",
    author: "Forbes Editorial Team",
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
    url: "https://forbes.com",
  },
  {
    id: "2",
    title: "TechCrunch",
    author: "TechCrunch Team",
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
    url: "https://techcrunch.com",
  },
  {
    id: "3",
    title: "Wired",
    author: "Wired Editorial Team",
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
    url: "https://wired.com",
  },
  {
    id: "4",
    title: "The Verge",
    author: "The Verge Team",
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
    url: "https://theverge.com",
  },
  {
    id: "22",
    title: "Engadget",
    author: "Engadget Editorial",
    description:
      "The essential weekly newsletter for mobile enthusiasts and developers. Covers iOS and Android app trends, mobile UX best practices, smartphone hardware reviews.",
    category: "tech",
    tags: ["mobile", "iOS", "Android", "apps", "smartphone", "mobile web", "UX", "app development"],
    subscribers: 74000,
    frequency: "weekly",
    imageColor: "from-indigo-500 to-blue-600",
    imageIcon: "📱",
    featured: false,
    rating: 4.6,
    url: "https://engadget.com",
  },
  {
    id: "23",
    title: "Ars Technica",
    author: "Ars Technica Team",
    description:
      "Deep-dive analysis of the mobile app market, app store optimization, monetization strategies, and growth tactics for mobile websites and native apps.",
    category: "tech",
    tags: ["mobile", "apps", "app store", "iOS", "Android", "mobile websites", "monetization", "ASO"],
    subscribers: 51000,
    frequency: "weekly",
    imageColor: "from-violet-500 to-purple-600",
    imageIcon: "📲",
    featured: false,
    rating: 4.4,
    url: "https://arstechnica.com",
  },
  {
    id: "44",
    title: "CNET",
    author: "CNET Team",
    description:
      "CNET delivers the best tech news, advice, and reviews. From smartphones and laptops to smart home devices and software.",
    category: "tech",
    tags: ["reviews", "news", "software", "hardware", "mobile"],
    subscribers: 189000,
    frequency: "daily",
    imageColor: "from-blue-500 to-cyan-600",
    imageIcon: "📰",
    featured: false,
    rating: 4.7,
    url: "https://cnet.com",
  },
  {
    id: "45",
    title: "Tom's Hardware",
    author: "Tom's Hardware Team",
    description:
      "PC hardware and computer tech news. Expert reviews, benchmarks, and build guides for processors, graphics cards, and more.",
    category: "tech",
    tags: ["hardware", "PC", "reviews", "benchmarks"],
    subscribers: 145000,
    frequency: "daily",
    imageColor: "from-orange-500 to-red-600",
    imageIcon: "🖥️",
    featured: false,
    rating: 4.6,
    url: "https://tomshardware.com",
  },
  {
    id: "46",
    title: "TechRadar",
    author: "TechRadar Team",
    description:
      "The technology source for the latest tech news, reviews, and buying advice. Phone, laptop, and gadget reviews.",
    category: "tech",
    tags: ["reviews", "news", "phones", "laptops"],
    subscribers: 167000,
    frequency: "daily",
    imageColor: "from-purple-500 to-pink-600",
    imageIcon: "📱",
    featured: false,
    rating: 4.5,
    url: "https://techradar.com",
  },
  {
    id: "47",
    title: "How-To Geek",
    author: "How-To Geek Team",
    description:
      "Tech tutorials, guides, and tips. Learn how to use your devices, troubleshoot problems, and get the most out of your technology.",
    category: "tech",
    tags: ["tutorials", "guides", "tips", "technology"],
    subscribers: 98000,
    frequency: "weekly",
    imageColor: "from-green-500 to-teal-600",
    imageIcon: "📘",
    featured: false,
    rating: 4.4,
    url: "https://howtogeek.com",
  },
  {
    id: "48",
    title: "Digital Trends",
    author: "Digital Trends Team",
    description:
      "Technology news, reviews, and product guides. Covering smartphones, laptops, home entertainment, and digital lifestyle.",
    category: "tech",
    tags: ["news", "reviews", "lifestyle", "digital"],
    subscribers: 112000,
    frequency: "daily",
    imageColor: "from-sky-500 to-blue-600",
    imageIcon: "🔊",
    featured: false,
    rating: 4.5,
    url: "https://digitaltrends.com",
  },
  {
    id: "49",
    title: "Gizmodo",
    author: "Gizmodo Team",
    description:
      "Science and technology news. The future is here. Coverage of gadgets, science, and the weird and wonderful world of technology.",
    category: "tech",
    tags: ["science", "gadgets", "news", "culture"],
    subscribers: 87000,
    frequency: "daily",
    imageColor: "from-red-500 to-orange-600",
    imageIcon: "🔧",
    featured: false,
    rating: 4.4,
    url: "https://gizmodo.com",
  },
  // Fashion
  {
    id: "5",
    title: "Vogue",
    author: "Vogue Editorial Team",
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
    url: "https://vogue.com",
  },
  {
    id: "6",
    title: "GQ",
    author: "GQ Editorial Team",
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
    url: "https://gq.com",
  },
  {
    id: "7",
    title: "Elle",
    author: "Elle Editorial Team",
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
    url: "https://elle.com",
  },
  // Cooking
  {
    id: "8",
    title: "Bon Appétit",
    author: "Bon Appétit Team",
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
    url: "https://bonappetit.com",
  },
  {
    id: "9",
    title: "Serious Eats",
    author: "Serious Eats Team",
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
    url: "https://seriouseats.com",
  },
  {
    id: "10",
    title: "Food52",
    author: "Food52 Team",
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
    url: "https://food52.com",
  },
  // World News
  {
    id: "11",
    title: "BBC News",
    author: "BBC Editorial Team",
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
    url: "https://bbc.com/news",
  },
  {
    id: "12",
    title: "The Guardian",
    author: "The Guardian Team",
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
    url: "https://theguardian.com",
  },
  {
    id: "13",
    title: "Reuters",
    author: "Reuters Editorial Team",
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
    url: "https://reuters.com",
  },
  {
    id: "27",
    title: "Forbes",
    author: "Forbes Editorial Team",
    description:
      "World's leading source for business news, investing, entrepreneurship, and leadership. Coverage of global markets, companies, and economic trends.",
    category: "world-news",
    tags: ["business", "economy", "markets", "entrepreneurship"],
    subscribers: 420000,
    frequency: "daily",
    imageColor: "from-green-600 to-teal-600",
    imageIcon: "🏆",
    featured: true,
    rating: 4.7,
    url: "https://forbes.com",
  },
  // Finance
  {
    id: "14",
    title: "Bloomberg",
    author: "Bloomberg Editorial Team",
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
    url: "https://bloomberg.com",
  },
  {
    id: "15",
    title: "CNBC",
    author: "CNBC Team",
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
    url: "https://cnbc.com",
  },
  // Health
  {
    id: "16",
    title: "WebMD",
    author: "WebMD Editorial Team",
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
    url: "https://webmd.com",
  },
  {
    id: "17",
    title: "Healthline",
    author: "Healthline Team",
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
    url: "https://healthline.com",
  },
  // Science
  {
    id: "18",
    title: "National Geographic",
    author: "Nat Geo Team",
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
    url: "https://nationalgeographic.com",
  },
  {
    id: "32",
    title: "BBC Nature",
    author: "BBC Nature Team",
    description:
      "Wildlife and nature stories from around the world. Discover amazing animals, ecosystems, and conservation efforts.",
    category: "science",
    tags: ["wildlife", "nature", "animals", "conservation"],
    subscribers: 142000,
    frequency: "weekly",
    imageColor: "from-green-500 to-emerald-600",
    imageIcon: "🦁",
    featured: false,
    rating: 4.7,
    url: "https://bbc.com/nature",
  },
  {
    id: "33",
    title: "Discovery",
    author: "Discovery Team",
    description:
      "Explore the wonders of science, technology, and nature. From space exploration to deep sea discoveries and everything in between.",
    category: "science",
    tags: ["discovery", "science", "exploration", "nature"],
    subscribers: 98000,
    frequency: "weekly",
    imageColor: "from-blue-500 to-cyan-600",
    imageIcon: "🔍",
    featured: false,
    rating: 4.6,
    url: "https://discovery.com",
  },
  {
    id: "34",
    title: "National Geographic Wild",
    author: "Nat Geo Wild Team",
    description:
      "Your source for wildlife documentaries, animal behavior, and nature photography from around the globe.",
    category: "science",
    tags: ["wildlife", "animals", "nature", "documentary"],
    subscribers: 87000,
    frequency: "weekly",
    imageColor: "from-amber-500 to-orange-600",
    imageIcon: "🐯",
    featured: false,
    rating: 4.7,
    url: "https://nationalgeographic.com/wild",
  },
  {
    id: "35",
    title: "Animal Planet",
    author: "Animal Planet Team",
    description:
      "Everything about animals! Pet care, wildlife, animal behavior, and conservation stories from around the world.",
    category: "science",
    tags: ["animals", "wildlife", "pets", "nature"],
    subscribers: 76000,
    frequency: "weekly",
    imageColor: "from-yellow-500 to-amber-600",
    imageIcon: "🐘",
    featured: false,
    rating: 4.5,
    url: "https://animalplanet.com",
  },
  // Sports
  {
    id: "19",
    title: "ESPN",
    author: "ESPN Editorial Team",
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
    url: "https://espn.com",
  },
  {
    id: "24",
    title: "Top Gear",
    author: "Top Gear Team",
    description:
      "The world's biggest car magazine. Reviews, news, and everything automotive including motorsport and car culture.",
    category: "sports",
    tags: ["cars", "motorsport", "reviews", "automotive"],
    subscribers: 145000,
    frequency: "weekly",
    imageColor: "from-red-500 to-orange-600",
    imageIcon: "🏎️",
    featured: false,
    rating: 4.7,
    url: "https://topgear.com",
  },
  {
    id: "28",
    title: "Goal.com",
    author: "Goal.com Team",
    description:
      "The world's biggest football website. Latest news, scores, transfers, and updates from all major leagues and competitions worldwide.",
    category: "sports",
    tags: ["football", "soccer", "transfers", "matches"],
    subscribers: 380000,
    frequency: "daily",
    imageColor: "from-green-500 to-emerald-600",
    imageIcon: "⚽",
    featured: true,
    rating: 4.7,
    url: "https://goal.com",
  },
  {
    id: "29",
    title: "Sky Sports Football",
    author: "Sky Sports Team",
    description:
      "Premier football coverage from the UK. News, transfers, match reports, and expert analysis from Premier League and European football.",
    category: "sports",
    tags: ["football", "premier league", "european", "transfers"],
    subscribers: 210000,
    frequency: "daily",
    imageColor: "from-blue-500 to-indigo-600",
    imageIcon: "🏃",
    featured: false,
    rating: 4.6,
    url: "https://skysports.com/football",
  },
  // Travel
  {
    id: "20",
    title: "Condé Nast Traveler",
    author: "CNT Editorial Team",
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
    url: "https://cntraveler.com",
  },
  // Culture
  {
    id: "21",
    title: "Rolling Stone",
    author: "Rolling Stone Team",
    description:
      "Music, movies, TV, and politics. The权威 source for music news, reviews, and cultural commentary.",
    category: "culture",
    tags: ["music", "movies", "entertainment", "culture"],
    subscribers: 98000,
    frequency: "weekly",
    imageColor: "from-purple-500 to-pink-600",
    imageIcon: "🎸",
    featured: true,
    rating: 4.7,
    url: "https://rollingstone.com",
  },
  {
    id: "25",
    title: "Pitchfork",
    author: "Pitchfork Team",
    description:
      "The most trusted voice in music. In-depth music reviews, news, and analysis from indie to mainstream.",
    category: "culture",
    tags: ["music", "reviews", "indie", "culture"],
    subscribers: 112000,
    frequency: "daily",
    imageColor: "from-green-500 to-teal-600",
    imageIcon: "🎧",
    featured: false,
    rating: 4.6,
    url: "https://pitchfork.com",
  },
  {
    id: "26",
    title: "Tate",
    author: "Tate Gallery Team",
    description:
      "Contemporary art news, exhibitions, and insights from the world's leading art institutions.",
    category: "culture",
    tags: ["art", "museum", "exhibitions", "contemporary"],
    subscribers: 87000,
    frequency: "weekly",
    imageColor: "from-purple-600 to-pink-600",
    imageIcon: "🎨",
    featured: false,
    rating: 4.5,
    url: "https://tate.org.uk",
  },
  {
    id: "36",
    title: "Vanity Fair",
    author: "Vanity Fair Team",
    description:
      "Culture, style, and politics. Profiles, reviews, and cultural commentary from Hollywood to high society.",
    category: "culture",
    tags: ["culture", "style", "politics", "entertainment"],
    subscribers: 65000,
    frequency: "weekly",
    imageColor: "from-amber-500 to-orange-600",
    imageIcon: "📰",
    featured: false,
    rating: 4.6,
    url: "https://vanityfair.com",
  },
  {
    id: "37",
    title: "NME",
    author: "NME Team",
    description:
      "New Music Express - music news, reviews, and culture. The权威 source for alternative and mainstream music.",
    category: "culture",
    tags: ["music", "news", "reviews", "culture"],
    subscribers: 58000,
    frequency: "weekly",
    imageColor: "from-red-500 to-pink-600",
    imageIcon: "🎤",
    featured: false,
    rating: 4.4,
    url: "https://nme.com",
  },
  // Gaming
  {
    id: "30",
    title: "PC Gamer",
    author: "PC Gamer Team",
    description:
      "The world's best PC gaming publication. Reviews, previews, hardware guides, and everything PC gaming from the experts.",
    category: "gaming",
    tags: ["pc", "gaming", "reviews", "hardware"],
    subscribers: 185000,
    frequency: "weekly",
    imageColor: "from-indigo-500 to-purple-600",
    imageIcon: "💻",
    featured: true,
    rating: 4.8,
    url: "https://pcgamer.com",
  },
  {
    id: "25",
    title: "GameSpot",
    author: "GameSpot Team",
    description:
      "GameSpot is the world's leading source for PC, PlayStation, Xbox, Wii, and video game news, reviews, previews, trailers, movies, anime and comics.",
    category: "gaming",
    tags: ["gaming", "video games", "reviews", "news"],
    subscribers: 112000,
    frequency: "daily",
    imageColor: "from-green-500 to-teal-600",
    imageIcon: "🎮",
    featured: false,
    rating: 4.6,
    url: "https://gamespot.com",
  },
  {
    id: "21",
    title: "IGN",
    author: "IGN Editorial Team",
    description:
      "The world's leading source for video game news, reviews, and coverage. Xbox, PlayStation, Nintendo, PC and mobile gaming.",
    category: "gaming",
    tags: ["gaming", "video games", "reviews", "news"],
    subscribers: 98000,
    frequency: "weekly",
    imageColor: "from-red-500 to-orange-600",
    imageIcon: "🎯",
    featured: true,
    rating: 4.7,
    url: "https://ign.com",
  },
  {
    id: "31",
    title: "Push Square",
    author: "Push Square Team",
    description:
      "Your daily source for PlayStation news, reviews, and features. Covering PS5, PS4, PS VR, and the entire PlayStation ecosystem.",
    category: "gaming",
    tags: ["playstation", "ps5", "ps4", "gaming"],
    subscribers: 67000,
    frequency: "daily",
    imageColor: "from-blue-500 to-indigo-600",
    imageIcon: "🎮",
    featured: false,
    rating: 4.5,
    url: "https://pushsquare.com",
  },
  // Movies
  {
    id: "38",
    title: "IMDb",
    author: "IMDb Team",
    description:
      "The world's most popular and authoritative source for movie, TV, and celebrity content. Reviews, ratings, trailers, and more.",
    category: "movies",
    tags: ["movies", "tv", "reviews", "ratings"],
    subscribers: 420000,
    frequency: "daily",
    imageColor: "from-yellow-500 to-amber-600",
    imageIcon: "🎥",
    featured: true,
    rating: 4.8,
    url: "https://imdb.com",
  },
  {
    id: "39",
    title: "Netflix",
    author: "Netflix Team",
    description:
      "Everything Netflix - new shows, movies, original content, and streaming news. Stay updated on what's next.",
    category: "movies",
    tags: ["netflix", "streaming", "tv shows", "movies"],
    subscribers: 380000,
    frequency: "weekly",
    imageColor: "from-red-600 to-rose-700",
    imageIcon: "📺",
    featured: true,
    rating: 4.7,
    url: "https://netflix.com",
  },
  {
    id: "40",
    title: "HBO",
    author: "HBO Team",
    description:
      "HBO original series, movies, and documentaries. The权威 source for HBO content news and updates.",
    category: "movies",
    tags: ["hbo", "tv shows", "originals", "documentaries"],
    subscribers: 210000,
    frequency: "weekly",
    imageColor: "from-purple-600 to-indigo-700",
    imageIcon: "🎭",
    featured: false,
    rating: 4.6,
    url: "https://hbomax.com",
  },
  {
    id: "41",
    title: "Rotten Tomatoes",
    author: "Rotten Tomatoes Team",
    description:
      "Movie reviews, ratings, and news. The权威 source for film critics and what to watch next.",
    category: "movies",
    tags: ["movies", "reviews", "ratings", "film"],
    subscribers: 165000,
    frequency: "daily",
    imageColor: "from-red-500 to-orange-600",
    imageIcon: "🍅",
    featured: true,
    rating: 4.7,
    url: "https://rottentomatoes.com",
  },
  {
    id: "42",
    title: "Disney",
    author: "Disney Team",
    description:
      "Disney, Pixar, Marvel, and Star Wars. All things Disney - movies, shows, and updates from the House of Mouse.",
    category: "movies",
    tags: ["disney", "marvel", "pixar", "star wars"],
    subscribers: 195000,
    frequency: "weekly",
    imageColor: "from-blue-500 to-cyan-600",
    imageIcon: "🏰",
    featured: false,
    rating: 4.6,
    url: "https://disney.com",
  },
  {
    id: "43",
    title: "FlixPatrol",
    author: "FlixPatrol Team",
    description:
      "Streaming charts and statistics. Track which movies and TV shows are trending on Netflix, Disney+, HBO, and more.",
    category: "movies",
    tags: ["streaming", "charts", "trending", "statistics"],
    subscribers: 87000,
    frequency: "daily",
    imageColor: "from-green-500 to-teal-600",
    imageIcon: "📊",
    featured: false,
    rating: 4.5,
    url: "https://flixpatrol.com",
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
