import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import kopiImg from "../assets/kopitiam.jpg";
import { Starburst } from "./Art";

const stories = [
  {
    quote: "I won two bounties while still in uni. Next thing I knew, they brought me on as an apprentice. My lecturers still don't fully get what I do.",
    name: "Hafiz, 21",
    role: "Web Guild · Apprentice",
    bg: "bg-turmeric",
  },
  {
    quote: "Bootcamps wanted RM15k. Here I got real briefs, real feedback and real money. My portfolio is 100% things people actually use.",
    name: "Nurul, 26",
    role: "Mobile Guild · Career switcher",
    bg: "bg-pink",
  },
  {
    quote: "We posted a bounty on Friday and had a working prototype by Wednesday. Paid the builder directly, then hired her part-time.",
    name: "Daniel",
    role: "Founder, Runcit Go",
    bg: "bg-sky",
  },
];

const steps = [
  { n: "1", t: "Make your profile", d: "Link GitHub, pick a guild, grab your first +30 XP.", c: "bg-pink" },
  { n: "2", t: "Start building", d: "Join a class, ask questions, take a Starter bounty.", c: "bg-turmeric" },
  { n: "3", t: "Get seen & get paid", d: "Win bounties, climb levels, land the apprenticeship or the job.", c: "bg-sky" },
];

export default function Stories() {
  const [i, setI] = useState(0);
  const s = stories[i];
  const go = (d: number) => setI((p) => (p + d + stories.length) % stories.length);

  return (
    <section className="relative overflow-hidden bg-pink/40 px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-0 batik text-hibiscus/10" />
      <div className="relative mx-auto max-w-7xl">
        {/* journey */}
        <div className="text-center">
          <p className="font-hand text-3xl text-hibiscus">senang je</p>
          <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
            You can code. <span className="italic">Now what?</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((st, k) => (
            <motion.div
              key={st.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: k * 0.1 }}
              className="relative rounded-[28px] border-[3px] border-ink bg-paper p-7 shadow-print"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink font-display text-2xl font-black ${st.c}`}>{st.n}</div>
              <h3 className="mt-5 font-display text-2xl font-black">{st.t}</h3>
              <p className="mt-2 text-ink/70">{st.d}</p>
              {k < 2 && <span className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 font-display text-4xl font-black md:block">→</span>}
            </motion.div>
          ))}
        </div>

        {/* stories */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[32px] border-[3px] border-ink shadow-print rotate-2">
              <img src={kopiImg} alt="Illustration of builders collaborating at a kopitiam" className="aspect-[4/5] w-full object-cover" />
            </div>
            <Starburst className="absolute -left-6 -top-6 h-28 w-28" fill="#1e5a3c">
              <span className="font-display text-lg font-black leading-none text-paper">
                Not just
                <br />a job board
              </span>
            </Starburst>
          </div>

          <div data-nochaos>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink/60">Kracked stories</p>
            <div className="relative mt-4 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -2, y: 20 }}
                  animate={{ opacity: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, rotate: 2, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className={`rounded-[32px] border-[3px] border-ink p-8 shadow-print ${s.bg}`}
                >
                  <Quote className="h-10 w-10" />
                  <p className="mt-4 font-display text-2xl font-semibold leading-snug sm:text-3xl">"{s.quote}"</p>
                  <div className="mt-6">
                    <div className="font-bold">{s.name}</div>
                    <div className="text-sm text-ink/70">{s.role}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => go(-1)} className="rounded-full border-[2.5px] border-ink bg-paper p-3 transition hover:bg-turmeric" aria-label="Previous story">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => go(1)} className="rounded-full border-[2.5px] border-ink bg-paper p-3 transition hover:bg-turmeric" aria-label="Next story">
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="ml-2 flex gap-2">
                {stories.map((_, k) => (
                  <button key={k} onClick={() => setI(k)} className={`h-3 rounded-full border-2 border-ink transition-all ${k === i ? "w-8 bg-ink" : "w-3"}`} aria-label={`Story ${k + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
