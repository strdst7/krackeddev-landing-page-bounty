import { useState } from "react";
import { motion } from "framer-motion";
import { members, type Guild } from "../data";
import { MaskLines, Reveal } from "./fx";

const guildMeta: { g: Guild; icon: string; color: string; desc: string; skills: [string, number][] }[] = [
  { g: "Web", icon: "🕸️", color: "#ffc93c", desc: "Frontends, backends, full-stack chaos. The guild that ships most bounties.", skills: [["React / Next", 92], ["Node & APIs", 78], ["Perf tuning", 64]] },
  { g: "AI", icon: "🧠", color: "#ff8fc7", desc: "Agents, fine-tunes and Manglish NLP that actually understands 'boleh lah'.", skills: [["LLM agents", 84], ["Fine-tuning", 71], ["RAG & vectors", 76]] },
  { g: "Design", icon: "🎨", color: "#7ce0b6", desc: "Product, brand and illustration. The people who make the rest of us look good.", skills: [["UI systems", 88], ["Illustration", 74], ["Motion", 61]] },
  { g: "Mobile", icon: "📱", color: "#6fb7ff", desc: "Flutter, Swift, Kotlin and offline-first apps for patchy-signal kampung.", skills: [["Flutter", 90], ["Offline sync", 69], ["App Store ops", 55]] },
  { g: "Data", icon: "📊", color: "#ffe08a", desc: "Dashboards, civic tech and open data. Flood sensors to petrol prices.", skills: [["D3 & viz", 82], ["SQL / PostGIS", 77], ["Pipelines", 63]] },
  { g: "Hardware", icon: "🔌", color: "#ff8a5c", desc: "IoT, ESP32 and things that blink. Durian ripeness sensors included.", skills: [["ESP32", 79], ["Sensors", 72], ["Embedded ML", 58]] },
];

export default function Guilds() {
  const [active, setActive] = useState(0);
  const a = guildMeta[active];
  const crew = members.filter((m) => m.guild === a.g).slice(0, 4);

  return (
    <section id="guilds" className="relative overflow-hidden bg-night py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[120px]"
        animate={{ background: [a.color + "55", "#ff5a4555", a.color + "55"] }}
        transition={{ duration: 3 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-gold">six guilds</p>
            <MaskLines lines={["PICK YOUR", "ORBIT."]} className="mt-3 font-poster text-5xl leading-[0.92] tracking-wide text-white sm:text-7xl" />
          </div>
          <p className="max-w-sm text-white/60">
            Guilds are where the regulars hang out: crit nights, pair-building, shared bounties. Hover an orbit to peek,
            tap to move in.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          {/* orbit */}
          <div className="relative mx-auto aspect-square w-full max-w-[540px]">
            {/* decorative rotating rings */}
            <svg viewBox="0 0 540 540" className="absolute inset-0 h-full w-full">
              <g style={{ animation: "spin-slow 48s linear infinite", transformOrigin: "270px 270px", transformBox: "view-box" }}>
                <circle cx="270" cy="270" r="248" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 12" />
              </g>
              <circle cx="270" cy="270" r="196" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
              <circle cx="270" cy="270" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" strokeDasharray="2 8" />
              {guildMeta.map((gm, i) => {
                const ang = (Math.PI * 2 * i) / guildMeta.length - Math.PI / 2;
                const x = 270 + Math.cos(ang) * 196;
                const y = 270 + Math.sin(ang) * 196;
                return (
                  <motion.line
                    key={gm.g}
                    x1="270"
                    y1="270"
                    x2={x}
                    y2={y}
                    stroke={gm.color}
                    strokeWidth={i === active ? 2.5 : 1}
                    strokeDasharray="5 7"
                    animate={{ opacity: i === active ? 0.95 : 0.16, pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* center hub */}
            <div className="absolute left-1/2 top-1/2 w-[46%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                layout
                className="relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-full border-2 p-5 text-center text-night"
                style={{ borderColor: a.color, background: a.color }}
              >
                <motion.div key={a.g} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
                  <div className="text-4xl">{a.icon}</div>
                  <div className="mt-1 font-poster text-2xl leading-none tracking-wide">{a.g.toUpperCase()}</div>
                  <div className="mt-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-night/60">
                    {280 + active * 47} members
                  </div>
                </motion.div>
                <span className="pointer-events-none absolute inset-0 shine opacity-25" />
              </motion.div>
              <span
                className="pointer-events-none absolute inset-[-14%] rounded-full opacity-40"
                style={{ boxShadow: `0 0 60px 12px ${a.color}66` }}
              />
            </div>

            {/* nodes */}
            {guildMeta.map((gm, i) => {
              const ang = (Math.PI * 2 * i) / guildMeta.length - Math.PI / 2;
              const left = 50 + Math.cos(ang) * 36.3;
              const top = 50 + Math.sin(ang) * 36.3;
              const on = i === active;
              return (
                <motion.button
                  key={gm.g}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  animate={{ scale: on ? 1.14 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  whileTap={{ scale: 0.94 }}
                  aria-label={`${gm.g} guild`}
                >
                  <motion.span
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className="flex h-16 w-16 items-center justify-center rounded-full border-2 bg-night-2 text-2xl transition-colors sm:h-20 sm:w-20"
                      style={{ borderColor: on ? gm.color : "rgba(255,255,255,0.18)", boxShadow: on ? `0 0 34px ${gm.color}55` : "none" }}
                    >
                      {gm.icon}
                    </span>
                    <span
                      className="font-mono2 text-[10px] uppercase tracking-[0.18em] transition-colors"
                      style={{ color: on ? gm.color : "rgba(255,255,255,0.4)" }}
                    >
                      {gm.g}
                    </span>
                  </motion.span>
                </motion.button>
              );
            })}
          </div>

          {/* detail */}
          <div>
            <motion.div key={a.g} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: a.color }} />
                <span className="font-mono2 text-xs uppercase tracking-[0.3em] text-white/50">{a.g} guild</span>
              </div>
              <h3 className="mt-4 font-poster text-4xl leading-tight tracking-wide text-white sm:text-5xl">{a.desc}</h3>

              <div className="mt-8 space-y-4">
                {a.skills.map(([s, v], i) => (
                  <div key={s}>
                    <div className="flex items-baseline justify-between font-mono2 text-[11px] uppercase tracking-widest text-white/50">
                      <span>{s}</span>
                      <span className="tabnum" style={{ color: a.color }}>
                        {v}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div className="h-full rounded-full" style={{ background: a.color }} initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 0.1 + i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }} />
                    </div>
                  </div>
                ))}
              </div>

              <Reveal delay={0.15}>
                <div className="mt-9">
                  <div className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-white/40">regulars in this guild</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {crew.map((m, i) => (
                      <motion.div
                        key={m.handle}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                        whileHover={{ y: -4 }}
                        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-1.5 pr-4"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full text-base" style={{ background: m.bg }}>
                          {m.emoji}
                        </span>
                        <span className="text-sm font-semibold text-white/85">{m.name.split(" ")[0]}</span>
                        <span className="font-mono2 text-[10px] text-white/40">{m.xp.toLocaleString()}xp</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
