import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MousePointer2 } from "lucide-react";
import heroImg from "../assets/hero-kl.jpg";
import { Hibiscus, Squiggle, Starburst } from "./Art";
import { members } from "../data";

const polaroids = [
  { m: members[0], x: "-8%", y: "8%", r: -8 },
  { m: members[6], x: "68%", y: "2%", r: 7 },
  { m: members[2], x: "-12%", y: "62%", r: 5 },
  { m: members[11], x: "72%", y: "66%", r: -6 },
];

export default function Hero() {
  const area = useRef<HTMLDivElement>(null);

  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:pt-32">
      {/* background shapes */}
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-pink/60 blur-0" />
      <div className="pointer-events-none absolute right-[-6rem] top-24 h-96 w-96 rounded-full text-turmeric/40 halftone" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3 py-1 text-sm font-semibold"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jungle opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-jungle" />
            </span>
            1,500+ builders · 6 guilds · 0% fees
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-[clamp(3.2rem,8.5vw,7.4rem)] font-black leading-[0.88] tracking-[-0.035em]"
          >
            Where
            <br />
            <span className="relative inline-block italic text-hibiscus">
              Malaysia
              <Squiggle className="absolute -bottom-2 left-0 h-4 w-full" color="#1e5a3c" />
            </span>
            <br />
            comes to{" "}
            <span className="relative inline-block">
              build.
              <Hibiscus className="absolute -right-12 -top-6 h-14 w-14 animate-wobble sm:-right-16 sm:h-20 sm:w-20" petal="#f4b3c2" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 sm:text-xl"
          >
            A kampung of designers, devs, tinkerers and first-timers who learn out loud, win paid bounties and ship
            real things together. You earn XP for <em className="font-display font-semibold not-italic text-jungle">shipping</em>, not
            for showing up.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#join"
              className="group inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-ink px-6 py-3.5 text-base font-bold text-paper transition hover:-translate-y-1 hover:bg-hibiscus hover:shadow-print"
            >
              Find your people
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#bounties"
              className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-turmeric px-6 py-3.5 text-base font-bold transition hover:-translate-y-1 hover:shadow-print"
            >
              Browse bounties
            </a>
            <span className="font-hand text-2xl text-jungle">← it's free, really</span>
          </motion.div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {members.slice(0, 6).map((m) => (
                <div
                  key={m.handle}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-paper text-lg ring-2 ring-ink"
                  style={{ background: m.bg }}
                >
                  {m.emoji}
                </div>
              ))}
            </div>
            <p className="text-sm leading-snug text-ink/70">
              <strong className="text-ink">RM3,550</strong> paid out across 12 bounties
              <br />
              from Perlis to Sabah, and counting.
            </p>
          </div>
        </div>

        {/* poster + draggable polaroids */}
        <div ref={area} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, rotate: 4, y: 30 }}
            animate={{ opacity: 1, rotate: 2, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="relative mx-auto w-[78%] overflow-hidden rounded-[28px] border-[3px] border-ink bg-paper-2 shadow-print"
          >
            <img src={heroImg} alt="Risograph illustration of Kuala Lumpur with people building giant blocks" className="aspect-[3/4.4] w-full object-cover" />
          </motion.div>

          <Starburst className="absolute -top-4 right-2 h-28 w-28 animate-spin-slow sm:h-32 sm:w-32" fill="#e2382c">
            <span className="block animate-[spin-slow_22s_linear_infinite_reverse] font-display text-base font-black leading-none text-paper sm:text-lg">
              RM150–<br />3,000<br />
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest">per bounty</span>
            </span>
          </Starburst>

          {polaroids.map(({ m, x, y, r }, i) => (
            <motion.div
              key={m.handle}
              drag
              dragConstraints={area}
              dragElastic={0.2}
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              whileHover={{ scale: 1.04 }}
              initial={{ opacity: 0, scale: 0.6, rotate: r }}
              animate={{ opacity: 1, scale: 1, rotate: r }}
              transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 200, damping: 14 }}
              className="absolute z-10 w-32 cursor-grab touch-none rounded-md border-[2.5px] border-ink bg-paper p-2 pb-3 shadow-print-sm active:cursor-grabbing sm:w-36"
              style={{ left: x, top: y }}
              data-nochaos
            >
              <div className="flex aspect-square items-center justify-center rounded-sm text-5xl" style={{ background: m.bg }}>
                {m.emoji}
              </div>
              <div className="mt-2 font-hand text-xl leading-none">{m.name.split(" ")[0]}</div>
              <div className="text-[11px] font-semibold leading-tight text-ink/60">
                {m.guild} guild · {m.city}
              </div>
            </motion.div>
          ))}

          <div className="pointer-events-none absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap font-hand text-xl text-ink/70">
            <MousePointer2 className="h-4 w-4" /> drag the crew around
          </div>
        </div>
      </div>
    </section>
  );
}
