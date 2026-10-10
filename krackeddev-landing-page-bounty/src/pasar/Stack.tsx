import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Check, Clock, Users } from "lucide-react";
import { bounties, type Bounty } from "../data";

const items = bounties.filter((b) => b.status !== "Won").slice(0, 5);
const accents = ["#ffc93c", "#ff5a45", "#7ce0b6", "#ff8fc7", "#6fb7ff"];

function StackCard({
  b,
  i,
  n,
  progress,
}: {
  b: Bounty;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const [taken, setTaken] = useState(false);
  const start = i / n;
  const scale = useTransform(progress, [start, 1], [1, 0.88]);
  const dim = useTransform(progress, [(i + 1) / n, 1], [1, i === n - 1 ? 1 : 0.5]);
  const accent = accents[i % accents.length];

  return (
    <div className="sticky top-[9vh] mb-6 sm:top-[13vh] sm:mb-[7vh]" style={{ zIndex: i + 1 }}>
      <motion.div
        style={{ scale, opacity: dim }}
        initial={{ y: 60, rotate: i % 2 ? 1.4 : -1.4 }}
        whileInView={{ y: 0, rotate: i % 2 ? 0.7 : -0.7 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group relative mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/12 bg-night-2"
      >
        {/* accent spine */}
        <div className="absolute inset-y-0 left-0 w-2" style={{ background: accent }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: `radial-gradient(90% 120% at 0% 0%, ${accent}22, transparent 55%)` }}
        />
        {/* shine sweep */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

        <div className="relative grid gap-5 p-5 sm:gap-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-10">
          <div className="flex items-baseline gap-3 lg:block">
            <div className="font-poster text-5xl leading-none text-white/15 transition-colors group-hover:text-white/30 sm:text-6xl lg:text-8xl">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="font-mono2 text-[11px] uppercase tracking-[0.25em]" style={{ color: accent }}>
              {b.guild} guild
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 font-mono2 text-[11px] uppercase tracking-widest text-white/45">
              <span>{b.sponsor}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {b.days}d left
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" /> {b.applicants} on it
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  b.status === "Open" ? "bg-mint/20 text-mint" : "bg-azure/20 text-azure"
                }`}
              >
                {b.status}
              </span>
            </div>
            <h3 className="mt-2 font-poster text-2xl leading-[1.05] tracking-wide text-white sm:text-4xl lg:text-5xl">
              {b.title}
            </h3>
            <p className="mt-3 line-clamp-3 max-w-xl text-[15px] leading-relaxed text-white/60 sm:line-clamp-none">{b.brief}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {b.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-3 py-1 font-mono2 text-[11px] text-white/60 transition-colors hover:border-white/40">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-end lg:gap-5">
            <div className="text-left lg:text-right">
              <div className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-white/40">reward</div>
              <div className="font-poster text-4xl leading-none sm:text-5xl lg:text-6xl" style={{ color: accent }}>
                RM{b.reward.toLocaleString()}
              </div>
              <div className="mt-1 font-mono2 text-[11px] text-white/40">+{100 + Math.round(b.reward / 10)} XP if you win</div>
            </div>
            <motion.button
              onClick={() => setTaken(!taken)}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold transition-colors"
              style={{ background: taken ? "#7ce0b6" : accent, color: "#0c1a19" }}
            >
              {taken ? (
                <>
                  <Check className="h-4 w-4" /> You're on it
                </>
              ) : (
                <>
                  Take this bounty <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(items.length - 1, Math.floor(v * items.length));
    setActive((p) => (p === idx ? p : idx));
  });

  return (
    <section id="stack" className="relative bg-night pb-24 pt-16 sm:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-gold">the board</p>
            <h2 className="mt-3 font-poster text-5xl leading-[0.95] tracking-wide text-white sm:text-7xl">
              BOUNTIES, STACKED
              <br />
              <span className="stroke-type">LIKE NASI LEMAK</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/60">
            Scroll and they pile up. Every card is a real brief from a real Malaysian team — take one, ship it, get paid
            straight to you. We take nothing.
          </p>
        </div>
      </div>

      {/* rail */}
      <div className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
        <div className="relative h-56 w-px bg-white/15">
          <motion.div className="absolute left-0 top-0 w-px bg-gold" style={{ height: railHeight }} />
          {items.map((b, i) => (
            <div
              key={b.id}
              className="absolute -right-[3px] flex -translate-y-1/2 items-center justify-end gap-2"
              style={{ top: `${(i / (items.length - 1)) * 100}%` }}
            >
              <span
                className={`whitespace-nowrap font-mono2 text-[10px] uppercase tracking-widest transition-all duration-300 ${
                  i === active ? "translate-x-0 text-gold opacity-100" : "translate-x-3 text-white/30 opacity-0"
                }`}
              >
                {b.sponsor}
              </span>
              <span className={`h-2 w-2 shrink-0 rounded-full transition-all duration-300 ${i <= active ? "scale-125 bg-gold" : "bg-white/25"}`} />
            </div>
          ))}
        </div>
      </div>

      <div ref={ref} className="mx-auto mt-14 max-w-7xl px-4 sm:px-6">
        {items.map((b, i) => (
          <StackCard key={b.id} b={b} i={i} n={items.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
