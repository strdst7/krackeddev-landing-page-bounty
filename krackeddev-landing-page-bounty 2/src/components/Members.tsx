import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutGrid, Trophy, MapPin } from "lucide-react";
import { guildColors, members, type Guild } from "../data";

const guildInfo: { g: Guild; desc: string; icon: string }[] = [
  { g: "Web", desc: "Frontends, backends, full-stack chaos", icon: "🕸️" },
  { g: "AI", desc: "Agents, models & Manglish NLP", icon: "🧠" },
  { g: "Design", desc: "Product, brand, illustration", icon: "🎨" },
  { g: "Mobile", desc: "Flutter, Swift, Kotlin & PWA", icon: "📱" },
  { g: "Data", desc: "Dashboards, civic & open data", icon: "📊" },
  { g: "Hardware", desc: "IoT, ESP32 & things that blink", icon: "🔌" },
];

export default function Members() {
  const [guild, setGuild] = useState<Guild | null>(null);
  const [view, setView] = useState<"wall" | "board">("wall");
  const [waves, setWaves] = useState<Record<string, number>>({});

  const list = useMemo(() => {
    const l = members.filter((m) => !guild || m.guild === guild);
    return view === "board" ? [...l].sort((a, b) => b.xp - a.xp) : l;
  }, [guild, view]);

  return (
    <section id="members" className="relative bg-ink px-4 py-24 text-paper sm:px-6 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-hand text-3xl text-turmeric">kenalan baru</p>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              Meet the <span className="italic text-pink">crew.</span>
            </h2>
            <p className="mt-5 max-w-lg text-lg text-paper/70">
              Students, career-switchers, seniors and side-project addicts from all 13 states. Pick a guild, find your
              people.
            </p>
          </div>
          <div className="flex rounded-full border-2 border-paper p-1" data-nochaos>
            {(["wall", "board"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
                  view === v ? "bg-paper text-ink" : "text-paper/70 hover:text-paper"
                }`}
              >
                {v === "wall" ? <LayoutGrid className="h-4 w-4" /> : <Trophy className="h-4 w-4" />}
                {v === "wall" ? "Wall" : "Leaderboard"}
              </button>
            ))}
          </div>
        </div>

        {/* guilds */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" data-nochaos>
          {guildInfo.map(({ g, desc, icon }) => {
            const on = guild === g;
            return (
              <button
                key={g}
                onClick={() => setGuild(on ? null : g)}
                className={`group rounded-3xl border-2 p-4 text-left transition ${
                  on ? `${guildColors[g]} border-paper -translate-y-1` : "border-paper/25 hover:border-paper"
                }`}
              >
                <div className="text-3xl transition group-hover:scale-110">{icon}</div>
                <div className="mt-3 font-display text-xl font-black">{g}</div>
                <div className={`text-xs leading-snug ${on ? "opacity-80" : "text-paper/60"}`}>{desc}</div>
                <div className={`mt-2 text-xs font-bold ${on ? "" : "text-paper/40"}`}>{members.filter((m) => m.guild === g).length * 37 + 41} members</div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {view === "wall" ? (
            <motion.div
              key="wall"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {list.map((m, i) => (
                <motion.div
                  key={m.handle}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group relative h-64 [perspective:1000px]"
                >
                  <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* front */}
                    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-3xl border-[3px] border-paper [backface-visibility:hidden]" style={{ background: m.bg }}>
                      <div className="flex flex-1 items-center justify-center text-7xl">{m.emoji}</div>
                      <div className="border-t-[3px] border-paper bg-ink p-3">
                        <div className="font-display text-lg font-black leading-tight">{m.name}</div>
                        <div className="flex items-center gap-1 text-xs text-paper/60">
                          <MapPin className="h-3 w-3" /> {m.city}
                        </div>
                      </div>
                    </div>
                    {/* back */}
                    <div className="absolute inset-0 flex flex-col rounded-3xl border-[3px] border-paper bg-paper p-4 text-ink [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <span className={`self-start rounded-full px-2.5 py-1 text-[11px] font-bold uppercase ${guildColors[m.guild]}`}>{m.guild}</span>
                      <div className="mt-3 text-sm text-ink/60">@{m.handle}</div>
                      <div className="font-display text-3xl font-black">{m.xp.toLocaleString()} XP</div>
                      <div className="mt-2 text-xs font-bold uppercase tracking-wider text-ink/50">Latest ship</div>
                      <div className="font-hand text-xl leading-tight">{m.shipped}</div>
                      <button
                        data-nochaos
                        onClick={() => setWaves((w) => ({ ...w, [m.handle]: (w[m.handle] || 0) + 1 }))}
                        className="mt-auto rounded-full border-2 border-ink bg-turmeric py-1.5 text-sm font-bold transition active:scale-95"
                      >
                        👋 Say hai {waves[m.handle] ? `· ${waves[m.handle]}` : ""}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.ol
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-10 overflow-hidden rounded-[28px] border-2 border-paper/30"
            >
              {list.map((m, i) => (
                <motion.li
                  key={m.handle}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`flex items-center gap-4 border-b-2 border-paper/10 px-4 py-3 last:border-0 sm:px-6 ${i < 3 ? "bg-paper/5" : ""}`}
                >
                  <span className="w-8 font-display text-2xl font-black text-paper/50">{i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}</span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-paper text-xl" style={{ background: m.bg }}>
                    {m.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-bold">{m.name}</div>
                    <div className="truncate text-xs text-paper/50">{m.city} · {m.shipped}</div>
                  </div>
                  <span className={`hidden rounded-full px-2.5 py-1 text-[11px] font-bold uppercase sm:inline ${guildColors[m.guild]}`}>{m.guild}</span>
                  <div className="hidden w-40 md:block">
                    <div className="h-2 overflow-hidden rounded-full bg-paper/10">
                      <motion.div className="h-full bg-turmeric" initial={{ width: 0 }} animate={{ width: `${(m.xp / 9000) * 100}%` }} transition={{ delay: 0.2 + i * 0.04 }} />
                    </div>
                  </div>
                  <span className="w-24 text-right font-display text-xl font-black tabular-nums">{m.xp.toLocaleString()}</span>
                </motion.li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
        <p className="mt-6 text-center font-hand text-xl text-paper/50">hover a card to flip it · concept profiles, not real members</p>
      </div>
    </section>
  );
}
