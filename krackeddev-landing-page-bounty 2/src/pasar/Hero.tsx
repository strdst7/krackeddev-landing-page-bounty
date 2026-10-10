import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import DotCanvas from "./DotCanvas";
import { CountUp, Magnetic } from "./fx";

const stats = [
  { v: 1500, s: "+", l: "builders in the kampung" },
  { v: 3550, s: "", l: "RM paid out · 12 bounties", p: "RM" },
  { v: 0, s: "%", l: "commission. ever." },
];

export default function Hero({ onJump }: { onJump: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-night">
      {/* ambient layers */}
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 120%, rgba(255,90,69,0.22), transparent 60%), radial-gradient(90% 60% at 10% -10%, rgba(111,183,255,0.16), transparent 60%)" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gold/10 blur-[100px]"
        animate={{ x: [0, 90, 0], y: [0, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-orchid/12 blur-[90px]"
        animate={{ x: [0, -70, 0], y: [0, 60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* the living wordmark */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <DotCanvas word="KRACKED" sub="DEVS · MALAYSIA · EST. 2026" className="h-full w-full" />
      </motion.div>

      {/* corner UI */}
      {/* pointer-events-none so the dot-field underneath still feels the cursor */}
      <motion.div style={{ opacity: fade }} className="pointer-events-none relative z-10 flex h-full flex-col justify-between p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulsering rounded-full bg-mint" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
            </span>
            <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-mint">live · 214 builders online</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {["Web", "AI", "Design", "Mobile", "Data", "Hardware"].map((g, i) => (
              <motion.span
                key={g}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="rounded-full border border-white/15 px-3 py-1 font-mono2 text-[10px] uppercase tracking-widest text-white/60"
              >
                {g}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}>
              <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-gold">concept 02 — pasar malam</p>
              <h1 className="sr-only">KrackedDevs — where Malaysia comes to build</h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
                Not a job board. A <span className="text-butter">pasar malam</span> for builders: guilds, weekly classes,
                paid bounties, hackathons and a scoreboard that only cares what you <em className="text-flare not-italic">shipped</em>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <button
                  onClick={() => onJump("wheel")}
                  className="group flex items-center gap-2 rounded-full bg-flare px-7 py-4 text-base font-extrabold text-night transition-colors hover:bg-gold"
                >
                  Spin for a bounty
                  <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-90" />
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => onJump("stack")}
                  className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-bold text-white/90 transition hover:border-gold hover:text-gold"
                >
                  See the board <ArrowUpRight className="h-4 w-4" />
                </button>
              </Magnetic>
              <span className="font-mono2 text-xs uppercase tracking-widest text-white/40">free forever · 0% fees</span>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-5">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.1, duration: 0.7 }}
                className="rounded-2xl border border-white/12 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors hover:border-gold/60"
              >
                <div className="font-poster text-3xl leading-none text-butter sm:text-4xl">
                  {s.p}
                  <CountUp to={s.v} />
                  {s.s}
                </div>
                <div className="mt-2 text-[11px] uppercase leading-tight tracking-wider text-white/50">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono2 text-[10px] uppercase tracking-[0.4em] text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity: fade }}
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
