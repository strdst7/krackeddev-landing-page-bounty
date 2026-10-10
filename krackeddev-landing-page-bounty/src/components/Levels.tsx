import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { levels, xpActions } from "../data";
import { Hibiscus } from "./Art";

type Counts = Record<(typeof xpActions)[number]["id"], number>;

export default function Levels() {
  const [counts, setCounts] = useState<Counts>({ github: 30, submit: 4, mention: 1, win: 1, poll: 8 });
  const [name, setName] = useState("You");

  const xp = useMemo(() => xpActions.reduce((s, a) => s + a.xp * counts[a.id], 0) + 30, [counts]);
  const idx = levels.reduce((acc, l, i) => (xp >= l.min ? i : acc), 0);
  const cur = levels[idx];
  const next = levels[idx + 1];
  const pct = next ? ((xp - cur.min) / (next.min - cur.min)) * 100 : 100;

  return (
    <section id="levels" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full text-pink halftone opacity-70" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-hand text-3xl text-hibiscus">naik level, naik nama</p>
          <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
            From <span className="italic">Budak Baru</span> to <span className="italic text-jungle">Legenda.</span>
          </h2>
          <p className="mt-5 text-lg text-ink/70">
            XP rewards what you ship. Drag the sliders and see where a month of building could take you. Profile
            completion gives you a free +30 to start.
          </p>
        </div>

        {/* level path */}
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-1.5 rounded-full bg-ink/15 md:block" />
          <motion.div
            className="absolute left-0 top-8 hidden h-1.5 rounded-full bg-ink md:block"
            animate={{ width: `${Math.min(100, ((idx + pct / 100) / (levels.length - 1)) * 100)}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />
          <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
            {levels.map((l, i) => {
              const reached = i <= idx;
              return (
                <div key={l.name} className="flex flex-col items-center text-center">
                  <motion.div
                    animate={{ scale: i === idx ? 1.15 : 1, rotate: i === idx ? [0, -6, 6, 0] : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-ink font-display text-2xl font-black ${
                      reached ? "shadow-print-sm" : "bg-paper opacity-60"
                    }`}
                    style={{ background: reached ? l.color : undefined, color: reached && (i === 3 || i === 4) ? "#f5eee0" : "#1c1a16" }}
                  >
                    {i + 1}
                    {i === idx && <span className="absolute -top-8 whitespace-nowrap font-hand text-xl text-ink">{name || "You"} ↓</span>}
                  </motion.div>
                  <div className="mt-3 font-display text-xl font-black">{l.name}</div>
                  <div className="text-sm italic text-ink/60">{l.en}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-ink/50">{l.min.toLocaleString()} XP</div>
                  <div className={`mt-2 text-sm leading-snug ${reached ? "text-ink" : "text-ink/40"}`}>{l.perk}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* calculator */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.3fr_1fr]" data-nochaos>
          <div className="rounded-[32px] border-[3px] border-ink bg-paper p-6 shadow-print sm:p-8">
            <h3 className="font-display text-2xl font-black">Your month of shipping</h3>
            <div className="mt-6 space-y-6">
              {xpActions.map((a) => (
                <div key={a.id}>
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={a.id} className="font-semibold">
                      {a.label} <span className="text-sm font-normal text-ink/50">({a.note})</span>
                    </label>
                    <span className="font-display text-lg font-black tabular-nums">
                      {counts[a.id]} <span className="text-xs font-sans font-semibold text-ink/50">{a.unit}</span>
                    </span>
                  </div>
                  <input
                    id={a.id}
                    type="range"
                    min={0}
                    max={a.max}
                    value={counts[a.id]}
                    onChange={(e) => setCounts((c) => ({ ...c, [a.id]: Number(e.target.value) }))}
                    className="mt-2 w-full accent-hibiscus"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* profile card */}
          <motion.div layout className="relative overflow-hidden rounded-[32px] border-[3px] border-ink p-7 shadow-print sm:p-8" style={{ background: cur.color }}>
            <div className={`pointer-events-none absolute inset-0 batik ${idx >= 3 ? "text-paper/10" : "text-ink/10"}`} />
            <div className={`relative ${idx >= 3 ? "text-paper" : "text-ink"}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Kracked profile</span>
                <Hibiscus className="h-10 w-10" petal="#f5eee0" />
              </div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 16))}
                className="mt-6 w-full border-b-2 border-dashed border-current bg-transparent font-display text-4xl font-black outline-none"
                aria-label="Your name"
              />
              <div className="mt-1 font-hand text-2xl">{cur.name}: {cur.en}</div>

              <div className="mt-8 font-display text-7xl font-black leading-none tabular-nums">
                {xp.toLocaleString()}
                <span className="ml-2 font-sans text-lg font-bold">XP</span>
              </div>

              <div className="mt-6">
                <div className="h-4 overflow-hidden rounded-full border-[2.5px] border-ink bg-paper">
                  <motion.div className="h-full bg-ink" animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 90, damping: 16 }} />
                </div>
                <div className="mt-2 text-sm font-semibold">
                  {next ? `${(next.min - xp).toLocaleString()} XP to ${next.name}` : "Max level. You're a legend. 🏆"}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border-2 border-current bg-black/5 p-4 text-sm">
                <span className="font-bold">Unlocked:</span> {levels.slice(0, idx + 1).map((l) => l.perk).join(" · ")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
