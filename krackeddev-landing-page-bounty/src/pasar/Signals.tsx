import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, Medal, Trophy, Vote, Zap } from "lucide-react";
import { levels, members } from "../data";
import { MaskLines, Scramble } from "./fx";

const COLORS = ["#6fb7ff", "#ffc93c", "#ff8fc7", "#7ce0b6", "#ff5a45"];
const R = 118;
const C = 2 * Math.PI * R;

const earnActions = [
  { id: "github", label: "Push to GitHub", xp: 5, icon: Code2, note: "+5 / day" },
  { id: "submit", label: "Submit a bounty", xp: 20, icon: Zap, note: "+20" },
  { id: "mention", label: "Honourable mention", xp: 50, icon: Medal, note: "+50" },
  { id: "win", label: "Win RM1,000 bounty", xp: 200, icon: Trophy, note: "100 + reward/10" },
  { id: "poll", label: "Vote in a poll", xp: 10, icon: Vote, note: "+10" },
] as const;

const verbs = ["shipped", "submitted a bounty for", "joined the guild after winning", "opened a PR to", "posted a build log about", "got an honourable mention for"];
const things = ["a kopitiam queue app", "Jawi OCR v0.4", "flood alerts for Klang", "a batik token pack", "teh tarik splitter PWA", "durian ripeness sensor", "MyKad reader lib", "pasar malam heatmap"];

type FeedItem = { id: number; who: string; emoji: string; text: string; xp: number; ago: string; bg: string };

let seed = 1;
const makeItem = (xp = 0): FeedItem => {
  const m = members[Math.floor(Math.random() * members.length)];
  return {
    id: seed++,
    who: m.name,
    emoji: m.emoji,
    bg: m.bg,
    text: `${verbs[Math.floor(Math.random() * verbs.length)]} ${things[Math.floor(Math.random() * things.length)]}`,
    xp,
    ago: "just now",
  };
};

export default function Signals() {
  const [xp, setXp] = useState(1340);
  const [feed, setFeed] = useState<FeedItem[]>(() => [makeItem(20), makeItem(5), makeItem(50), makeItem(10)]);
  const [community, setCommunity] = useState(18420);
  const timer = useRef<number | null>(null);

  const idx = levels.reduce((acc, l, i) => (xp >= l.min ? i : acc), 0);
  const cur = levels[idx];
  const next = levels[idx + 1];
  const cap = levels[levels.length - 1].min;
  const p = Math.min(1, xp / cap);
  const color = COLORS[idx];

  const spark = useMemo(() => {
    const pts: number[] = [];
    let v = 30;
    for (let i = 0; i < 28; i++) {
      v = Math.max(8, Math.min(96, v + (Math.random() - 0.42) * 22));
      pts.push(v);
    }
    return pts;
  }, []);
  const sparkPath = `M ${spark.map((v, i) => `${(i / (spark.length - 1)) * 300} ${100 - v}`).join(" L ")}`;

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setCommunity((c) => c + Math.floor(Math.random() * 40) + 5);
      setFeed((f) => [{ ...makeItem(Math.floor(Math.random() * 40) + 5), ago: "just now" }, ...f.map((x, i) => ({ ...x, ago: i === 0 ? "1m" : x.ago }))].slice(0, 6));
    }, 3600);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  const earn = (a: (typeof earnActions)[number]) => {
    setXp((x) => x + a.xp);
    setCommunity((c) => c + a.xp);
    setFeed((f) => [{ id: seed++, who: "You", emoji: "✦", bg: color, text: `${a.label.toLowerCase()} — nice one`, xp: a.xp, ago: "just now" }, ...f].slice(0, 6));
  };

  return (
    <section id="xp" className="relative overflow-hidden bg-mint py-24 text-night lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.35] mix-blend-multiply" />
      <div className="pointer-events-none absolute -right-10 top-10 font-poster text-[9rem] leading-none stroke-type-dark opacity-[0.07] select-none">
        XP
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-night/60">the scoreboard</p>
            <MaskLines
              lines={["XP IS EARNED BY", <Scramble key="s" text="SHIPPING. NOT LURKING." />]}
              className="mt-3 font-poster text-4xl leading-[0.95] tracking-wide sm:text-6xl"
            />
          </div>
          <div className="rounded-2xl border-2 border-night bg-night px-5 py-3 text-butter">
            <div className="flex items-center gap-2 font-mono2 text-[10px] uppercase tracking-[0.3em] text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulsering rounded-full bg-flare" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-flare" />
              </span>
              community xp today
            </div>
            <motion.div key={community} initial={{ scale: 1.14 }} animate={{ scale: 1 }} className="font-poster text-4xl leading-none tabnum">
              {community.toLocaleString()}
            </motion.div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* ring */}
          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-[420px]">
              <svg viewBox="0 0 300 300" className="h-full w-full -rotate-90">
                <circle cx="150" cy="150" r={R} fill="none" stroke="rgba(12,26,25,0.14)" strokeWidth="18" />
                {Array.from({ length: 60 }).map((_, i) => {
                  const a = (Math.PI * 2 * i) / 60;
                  const r1 = R + 14;
                  const r2 = R + (i % 5 === 0 ? 24 : 19);
                  return (
                    <line
                      key={i}
                      x1={150 + Math.cos(a) * r1}
                      y1={150 + Math.sin(a) * r1}
                      x2={150 + Math.cos(a) * r2}
                      y2={150 + Math.sin(a) * r2}
                      stroke="rgba(12,26,25,0.3)"
                      strokeWidth={i % 5 === 0 ? 2.4 : 1.2}
                    />
                  );
                })}
                <motion.circle
                  cx="150"
                  cy="150"
                  r={R}
                  fill="none"
                  stroke={color}
                  strokeWidth="18"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  animate={{ strokeDashoffset: C * (1 - p) }}
                  transition={{ type: "spring", stiffness: 60, damping: 16 }}
                />
              </svg>

              {/* level pips around the ring */}
              {levels.map((l, i) => {
                const a = (Math.min(1, l.min / cap) * 360 - 90) * (Math.PI / 180);
                return (
                  <motion.button
                    key={l.name}
                    onClick={() => setXp(l.min + (i === levels.length - 1 ? 400 : 10))}
                    className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-night transition-transform hover:scale-150"
                    style={{ left: `${50 + Math.cos(a) * 39.3}%`, top: `${50 + Math.sin(a) * 39.3}%`, background: i <= idx ? COLORS[i] : "#0c1a19" }}
                    aria-label={`Jump to ${l.name}`}
                  />
                );
              })}

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <motion.div key={cur.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-night/60">
                  level {idx + 1} / {levels.length}
                </motion.div>
                <motion.div key={`n-${xp}`} initial={{ scale: 1.12 }} animate={{ scale: 1 }} className="font-poster text-7xl leading-none tabnum">
                  {xp.toLocaleString()}
                </motion.div>
                <motion.div key={`l-${cur.name}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-1 font-poster text-2xl tracking-wide" style={{ color }}>
                  {cur.name.toUpperCase()}
                </motion.div>
                <div className="mt-1 max-w-[190px] text-xs italic text-night/60">{cur.en} — {cur.perk}</div>
                <div className="mt-3 font-mono2 text-[11px] font-bold uppercase tracking-widest">
                  {next ? `${(next.min - xp).toLocaleString()} xp → ${next.name}` : "max level 🏆"}
                </div>
              </div>
            </div>

            {/* earn buttons */}
            <div className="mt-8 w-full">
              <div className="mb-3 text-center font-mono2 text-[11px] uppercase tracking-[0.25em] text-night/60">tap to earn — watch the ring move</div>
              <div className="flex flex-wrap justify-center gap-2">
                {earnActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <motion.button
                      key={a.id}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => earn(a)}
                      className="group flex items-center gap-2 rounded-full border-2 border-night bg-night/[0.03] px-4 py-2.5 text-sm font-bold transition-colors hover:bg-night hover:text-mint"
                      title={a.note}
                    >
                      <Icon className="h-4 w-4" />
                      {a.label}
                      <span className="font-mono2 text-[11px] opacity-60 group-hover:opacity-90">+{a.xp}</span>
                    </motion.button>
                  );
                })}
              </div>
              <input
                type="range"
                min={0}
                max={cap + 900}
                step={10}
                value={xp}
                onChange={(e) => setXp(Number(e.target.value))}
                aria-label="Your XP"
                className="mt-5 w-full accent-flare"
              />
            </div>
          </div>

          {/* live feed */}
          <div className="flex flex-col gap-5">
            <div className="relative overflow-hidden rounded-[28px] border-2 border-night bg-night p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.3em] text-mint">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pulsering rounded-full bg-mint" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                  </span>
                  live from the kampung
                </div>
                <div className="font-mono2 text-[11px] text-white/35 animate-blink">● rec</div>
              </div>

              <div className="mt-5 space-y-2.5">
                <AnimatePresence initial={false}>
                  {feed.map((f) => (
                    <motion.div
                      key={f.id}
                      layout
                      initial={{ opacity: 0, x: -30, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{ opacity: 0, x: 30, height: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      className="flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg" style={{ background: f.bg }}>
                        {f.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm text-white/90">
                          <strong className="font-bold text-butter">{f.who}</strong> {f.text}
                        </div>
                        <div className="font-mono2 text-[10px] uppercase tracking-widest text-white/35">{f.ago}</div>
                      </div>
                      {f.xp > 0 && <span className="shrink-0 font-poster text-lg text-mint tabnum">+{f.xp}</span>}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* sparkline */}
            <div className="rounded-[28px] border-2 border-night bg-night/[0.06] p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-night/60">ships per day · last 4 weeks</span>
                <span className="font-poster text-2xl">+128%</span>
              </div>
              <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="mt-4 h-24 w-full">
                <defs>
                  <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0c1a19" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#0c1a19" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path d={`${sparkPath} L 300 100 L 0 100 Z`} fill="url(#sparkfill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
                <motion.path
                  d={sparkPath}
                  fill="none"
                  stroke="#0c1a19"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
                {spark.map((v, i) =>
                  i % 4 === 0 ? <motion.circle key={i} cx={(i / (spark.length - 1)) * 300} cy={100 - v} r="3" fill="#ff5a45" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.03 }} /> : null,
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
