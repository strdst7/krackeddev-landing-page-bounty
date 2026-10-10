import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Building2, Landmark, Users } from "lucide-react";

const doors = [
  {
    id: "community",
    n: "01",
    who: "For builders",
    title: "Find your people.",
    icon: Users,
    bg: "bg-hibiscus",
    text: "text-paper",
    pattern: "text-paper/15",
    points: [
      "Guilds for web, AI, design, mobile, data & hardware",
      "Weekly classes, from vibe coding to AI agents",
      "Hackathons with real prize money",
      "KD Square: offline meetups & co-working",
    ],
    cta: "Join free",
  },
  {
    id: "companies",
    n: "02",
    who: "For companies",
    title: "Fund a bounty, or hire.",
    icon: Building2,
    bg: "bg-turmeric",
    text: "text-ink",
    pattern: "text-ink/10",
    points: [
      "Post a brief with your budget in MYR",
      "Vetted community builders pick it up & deliver",
      "Pay the builder directly. KD takes 0%",
      "Need someone ongoing? Hire from proven talent",
    ],
    cta: "Post a bounty",
  },
  {
    id: "government",
    n: "03",
    who: "For government & partners",
    title: "A talent pipeline that funds itself.",
    icon: Landmark,
    bg: "bg-jungle",
    text: "text-paper",
    pattern: "text-paper/10",
    points: [
      "Zero cost to taxpayers",
      "Juniors upskilled through real, paid projects",
      "Aligned with the Digital Economy Blueprint 2021–2030",
      "Co-hosted events, guild partnerships, Login with KD",
    ],
    cta: "Partner with us",
  },
];

export default function Doors() {
  const [active, setActive] = useState("community");

  return (
    <section id="doors" className="relative px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-hand text-3xl text-hibiscus">pintu masuk →</p>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              Three doors,
              <br />
              <span className="italic">one kampung.</span>
            </h2>
          </div>
          <p className="max-w-sm text-lg text-ink/70">
            Whoever you are, there's a way in. Pick a door and peek inside. Every door leads to the same table.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:h-[520px] lg:flex-row">
          {doors.map((d) => {
            const isActive = active === d.id;
            const Icon = d.icon;
            return (
              <motion.div
                key={d.id}
                layout
                onMouseEnter={() => setActive(d.id)}
                onClick={() => setActive(d.id)}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
                className={`relative cursor-pointer overflow-hidden rounded-[32px] border-[3px] border-ink ${d.bg} ${d.text} ${
                  isActive ? "shadow-print lg:flex-[2.6]" : "lg:flex-1"
                }`}
              >
                <div className={`pointer-events-none absolute inset-0 batik ${d.pattern}`} />
                {/* arch door shape */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border-[3px] border-current opacity-20" />
                <div className="relative flex h-full flex-col p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-6xl font-black opacity-90">{d.n}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-current">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="mt-auto pt-10">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] opacity-80">{d.who}</p>
                    <h3 className="mt-2 font-display text-3xl font-black leading-tight sm:text-4xl">{d.title}</h3>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.12 }}
                        >
                          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                            {d.points.map((p) => (
                              <li key={p} className="flex gap-2 text-[15px] leading-snug">
                                <span className="mt-0.5">✿</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                          <a
                            href="#join"
                            className="mt-7 inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-paper px-5 py-2.5 font-bold text-ink transition hover:-translate-y-0.5 hover:shadow-print-sm"
                          >
                            {d.cta} <ArrowUpRight className="h-4 w-4" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-ink/60">
          <span className="text-sm font-bold uppercase tracking-[0.2em]">Worked with</span>
          <span className="font-display text-2xl font-black text-ink">MyDIGITAL</span>
          <span className="font-display text-2xl font-black text-ink">UiTM</span>
          <span className="font-hand text-2xl">+ your logo here?</span>
        </div>
      </div>
    </section>
  );
}
