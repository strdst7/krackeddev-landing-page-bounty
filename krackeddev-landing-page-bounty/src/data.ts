export type Guild = "Web" | "AI" | "Design" | "Mobile" | "Data" | "Hardware";

export const guildColors: Record<Guild, string> = {
  Web: "bg-hibiscus text-paper",
  AI: "bg-jungle text-paper",
  Design: "bg-pink text-ink",
  Mobile: "bg-turmeric text-ink",
  Data: "bg-sky text-ink",
  Hardware: "bg-ink text-paper",
};

export type Bounty = {
  id: number;
  title: string;
  sponsor: string;
  reward: number;
  difficulty: "Starter" | "Mid" | "Spicy";
  guild: Guild;
  days: number;
  applicants: number;
  tags: string[];
  brief: string;
  status: "Open" | "Judging" | "Won";
};

export const bounties: Bounty[] = [
  {
    id: 1,
    title: "Redesign our community landing page",
    sponsor: "KrackedDev",
    reward: 300,
    difficulty: "Starter",
    guild: "Design",
    days: 6,
    applicants: 41,
    tags: ["Figma", "React", "Open brief"],
    brief:
      "Zero constraints. Retro, futuristic, minimal or pure chaos. Show us how you'd welcome the next 10,000 Malaysian builders.",
    status: "Open",
  },
  {
    id: 2,
    title: "Halal food finder: map clustering",
    sponsor: "Makan.my",
    reward: 1200,
    difficulty: "Mid",
    guild: "Web",
    days: 12,
    applicants: 9,
    tags: ["Next.js", "Mapbox", "PostGIS"],
    brief:
      "Our map chokes at 40k pins. Add server-side clustering and a buttery zoom experience for mobile users in the Klang Valley.",
    status: "Open",
  },
  {
    id: 3,
    title: "Bahasa Melayu speech-to-text fine-tune",
    sponsor: "Suara Labs",
    reward: 3000,
    difficulty: "Spicy",
    guild: "AI",
    days: 21,
    applicants: 5,
    tags: ["Whisper", "Python", "Manglish"],
    brief:
      "Fine-tune an open model that actually understands 'boleh lah, can one'. Dataset provided. Benchmarks required.",
    status: "Open",
  },
  {
    id: 4,
    title: "Kedai runcit inventory app (offline-first)",
    sponsor: "Runcit Go",
    reward: 900,
    difficulty: "Mid",
    guild: "Mobile",
    days: 14,
    applicants: 12,
    tags: ["Flutter", "SQLite", "Sync"],
    brief:
      "Corner shops in Kelantan have patchy internet. Build an offline-first stock tracker that syncs when signal comes back.",
    status: "Open",
  },
  {
    id: 5,
    title: "Flood-level dashboard for Klang river",
    sponsor: "Civic Data MY",
    reward: 1500,
    difficulty: "Mid",
    guild: "Data",
    days: 10,
    applicants: 7,
    tags: ["D3", "Open data", "Alerts"],
    brief:
      "Turn public JPS sensor feeds into a dashboard and a WhatsApp alert bot residents can actually use during monsoon season.",
    status: "Judging",
  },
  {
    id: 6,
    title: "Smart durian ripeness sensor prototype",
    sponsor: "Musang Farms",
    reward: 2200,
    difficulty: "Spicy",
    guild: "Hardware",
    days: 30,
    applicants: 3,
    tags: ["ESP32", "Acoustics", "ML"],
    brief:
      "Farmers knock and listen. Can a microcontroller do it better? Build a prototype that classifies ripeness by tap sound.",
    status: "Open",
  },
  {
    id: 7,
    title: "Illustrated onboarding for a fintech",
    sponsor: "Duit Kita",
    reward: 600,
    difficulty: "Starter",
    guild: "Design",
    days: 8,
    applicants: 18,
    tags: ["Illustration", "Lottie"],
    brief:
      "Five onboarding screens that make saving money feel like a warm hug, not a lecture. Local flavour encouraged.",
    status: "Won",
  },
  {
    id: 8,
    title: "Open-source MyKad OCR helper",
    sponsor: "Community",
    reward: 450,
    difficulty: "Starter",
    guild: "AI",
    days: 9,
    applicants: 14,
    tags: ["OCR", "Privacy", "OSS"],
    brief:
      "A tiny on-device library to read IC fields without sending images to a server. Privacy first, MIT licensed.",
    status: "Open",
  },
];

export type Member = {
  name: string;
  handle: string;
  city: string;
  guild: Guild;
  xp: number;
  emoji: string;
  shipped: string;
  bg: string;
};

export const members: Member[] = [
  { name: "Aisyah Rahman", handle: "aisyahbuilds", city: "Shah Alam", guild: "Design", xp: 4820, emoji: "🌺", shipped: "Batik design tokens", bg: "#f4b3c2" },
  { name: "Wei Jie Tan", handle: "weijie.dev", city: "Penang", guild: "Web", xp: 6110, emoji: "🍜", shipped: "Hawker queue app", bg: "#f3b63a" },
  { name: "Arvind Kumar", handle: "arvk", city: "Ipoh", guild: "AI", xp: 7340, emoji: "🧠", shipped: "Manglish sentiment model", bg: "#a7cfe8" },
  { name: "Nurul Iman", handle: "nurul.codes", city: "Kota Bharu", guild: "Mobile", xp: 3290, emoji: "🛵", shipped: "Pasar malam finder", bg: "#e2382c" },
  { name: "Daniel Lim", handle: "dlim", city: "Kuching", guild: "Hardware", xp: 2980, emoji: "🔌", shipped: "Rain gauge IoT kit", bg: "#1e5a3c" },
  { name: "Siti Hajar", handle: "hajar.data", city: "Johor Bahru", guild: "Data", xp: 5210, emoji: "📊", shipped: "Petrol price tracker", bg: "#f3b63a" },
  { name: "Hafiz Azman", handle: "apiz", city: "Cyberjaya", guild: "Web", xp: 8890, emoji: "⚡", shipped: "2 bounties, now apprentice", bg: "#f4b3c2" },
  { name: "Priya Devi", handle: "priyamakes", city: "Klang", guild: "Design", xp: 4010, emoji: "🎨", shipped: "Raya e-card generator", bg: "#a7cfe8" },
  { name: "Jason Wong", handle: "jwong", city: "Kota Kinabalu", guild: "Mobile", xp: 3760, emoji: "🏝️", shipped: "Dive-log app", bg: "#e2382c" },
  { name: "Farah Nadia", handle: "farahn", city: "Melaka", guild: "AI", xp: 6630, emoji: "🤖", shipped: "Jawi OCR", bg: "#1e5a3c" },
  { name: "Kavin Raj", handle: "kavinraj", city: "Seremban", guild: "Data", xp: 2450, emoji: "🗺️", shipped: "Bus route heatmap", bg: "#f4b3c2" },
  { name: "Mei Ling Ong", handle: "meiling", city: "Petaling Jaya", guild: "Web", xp: 5590, emoji: "🧋", shipped: "Boba loyalty PWA", bg: "#f3b63a" },
];

export const levels = [
  { name: "Budak Baru", en: "The New Kid", min: 0, color: "#a7cfe8", perk: "Profile badge + guild access" },
  { name: "Tukang", en: "The Maker", min: 300, color: "#f3b63a", perk: "Bounty submissions unlocked" },
  { name: "Mahir", en: "The Skilled", min: 1200, color: "#f4b3c2", perk: "Priority hackathon seats" },
  { name: "Sifu", en: "The Mentor", min: 3500, color: "#1e5a3c", perk: "Run a weekly class" },
  { name: "Legenda", en: "The Legend", min: 8000, color: "#e2382c", perk: "Apprenticeship shortlist" },
];

export const xpActions = [
  { id: "github", label: "GitHub activity", note: "+5 XP / day", xp: 5, unit: "days", max: 60 },
  { id: "submit", label: "Bounty submission", note: "+20 XP each", xp: 20, unit: "subs", max: 20 },
  { id: "mention", label: "Honourable mention", note: "+50 XP each", xp: 50, unit: "mentions", max: 10 },
  { id: "win", label: "Bounty win (RM1,000)", note: "100 + reward/10", xp: 200, unit: "wins", max: 10 },
  { id: "poll", label: "Community poll vote", note: "+10 XP each", xp: 10, unit: "votes", max: 30 },
] as const;

export const events = [
  { day: "MON", date: "02", title: "Vibe Coding 101", kind: "Weekly class", where: "Online · Discord stage", time: "8:30pm", color: "bg-turmeric" },
  { day: "WED", date: "04", title: "Design Crit Night", kind: "Guild session", where: "KD Square, Bangsar", time: "7:30pm", color: "bg-pink" },
  { day: "SAT", date: "07", title: "Teh Tarik & Ship", kind: "Offline meetup", where: "Kopitiam, PJ SS2", time: "10:00am", color: "bg-sky" },
  { day: "FRI", date: "13", title: "Monsoon Hack '26", kind: "48h hackathon", where: "UiTM Shah Alam", time: "All weekend", color: "bg-hibiscus text-paper" },
  { day: "THU", date: "19", title: "AI Agents Deep Dive", kind: "Weekly class", where: "Online", time: "9:00pm", color: "bg-jungle text-paper" },
];

export const faqs = [
  { q: "Is it really free to join?", a: "Yes. Joining, discussing, showcasing projects and applying for bounties are completely free for every developer, forever." },
  { q: "I'm a beginner. Am I kracked enough?", a: "Kracked is a direction, not a credential. Plenty of members started as Budak Baru and climbed by shipping small Starter bounties first." },
  { q: "How does XP work?", a: "You earn XP for shipping, not for showing up: GitHub activity, bounty submissions, honourable mentions, wins and community votes. Levels unlock perks like hackathon priority and apprenticeship shortlists." },
  { q: "How do companies post a bounty?", a: "Write a brief, set a budget in MYR, and vetted builders pick it up. You pay the builder directly. KD takes 0%." },
  { q: "Is this only for Malaysians?", a: "We're rooted in Malaysia and growing across Southeast Asia. If you build with us, you're one of us." },
];

export const shippedTicker = [
  "🌺 Aisyah shipped Batik design tokens",
  "🍜 Wei Jie won RM1,200 · Hawker queue",
  "🧠 Arvind hit Legenda",
  "🛵 Nurul joined Mobile Guild",
  "📊 Siti opened a PR to Civic Data MY",
  "⚡ Hafiz became an apprentice",
  "🎨 Priya got an honourable mention",
  "🤖 Farah released Jawi OCR v0.3",
  "🧋 Mei Ling hosted Teh Tarik & Ship",
];
