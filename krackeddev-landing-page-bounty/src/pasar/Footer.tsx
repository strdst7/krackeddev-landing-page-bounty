import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, Sparkles } from "lucide-react";
import { Magnetic } from "./fx";

const COLORS = ["#ffc93c", "#ff5a45", "#7ce0b6", "#ff8fc7", "#6fb7ff"];
const WORD = "KRACKEDDEV";
const states = [
  "PERLIS", "KEDAH", "PENANG", "PERAK", "SELANGOR", "KUALA LUMPUR", "PUTRAJAYA", "N. SEMBILAN", "MELAKA",
  "JOHOR", "PAHANG", "TERENGGANU", "KELANTAN", "SABAH", "SARAWAK", "LABUAN",
];
const roles = ["I build", "I design", "I'm starting out", "I'm hiring", "I want to partner"];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const [role, setRole] = useState(roles[0]);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [word, setWord] = useState(WORD);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    setWord("SELAMAT DATANG");
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-butter text-night">
      <div className="pointer-events-none absolute inset-0 batik opacity-[0.06]" />

      {/* join */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-night/60">join the crew</p>
            <h2 className="mt-3 font-poster text-6xl leading-[0.88] tracking-wide sm:text-8xl">
              PULL UP
              <br />A CHAIR.
            </h2>
            <p className="mt-5 max-w-md text-lg text-night/70">
              There's always space at the table. Free forever, no gatekeeping — just builders building, from Kangar to
              Kota Kinabalu.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex items-center gap-2 rounded-full border-2 border-night px-6 py-3 font-bold transition hover:bg-night hover:text-butter"
                >
                  <ArrowUp className="h-4 w-4" /> Back to the top
                </button>
              </Magnetic>
              <span className="font-mono2 text-[11px] uppercase tracking-[0.25em] text-night/50">
                or scroll back and spin the wheel again
              </span>
            </div>
          </div>

          <div className="rounded-[28px] border-2 border-night bg-night p-7 text-white sm:p-9">
            {!sent ? (
              <form onSubmit={submit} className="space-y-6">
                <div>
                  <div className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-mint">who are you?</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roles.map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setRole(r)}
                        className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                          role === r ? "border-flare bg-flare text-night" : "border-white/20 text-white/70 hover:border-white/50"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.my"
                    className="flex-1 rounded-full border-2 border-white/20 bg-white/[0.04] px-5 py-3.5 font-medium text-white outline-none transition placeholder:text-white/35 focus:border-gold"
                  />
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-extrabold text-night transition hover:bg-mint"
                  >
                    Join <Sparkles className="h-4 w-4" />
                  </motion.button>
                </div>
                <p className="font-mono2 text-[11px] leading-relaxed text-white/40">
                  No spam. One email when your guild has something worth your weekend.
                </p>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-4 text-center">
                <motion.div
                  animate={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold text-4xl"
                >
                  🌺
                </motion.div>
                <h3 className="mt-5 font-poster text-4xl tracking-wide text-butter">SELAMAT DATANG!</h3>
                <p className="mt-2 text-white/65">
                  You're on the list as <strong className="text-mint">{role.toLowerCase()}</strong>. Invite flying to {email}.
                  First +30 XP is waiting on your profile.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                    setWord(WORD);
                  }}
                  className="mt-5 font-mono2 text-[11px] uppercase tracking-[0.25em] text-flare underline"
                >
                  add another friend
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* states marquee */}
      <div className="marquee-pause relative overflow-hidden border-y-2 border-night bg-night py-2.5 text-butter">
        <motion.div className="marquee-track gap-6 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {[0, 1].map((d) => (
            <div key={d} className="flex gap-6 pr-6">
              {states.map((s) => (
                <span key={s} className="flex items-center gap-6 font-mono2 text-xs uppercase tracking-[0.3em]">
                  {s} <span className="text-flare">✿</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* kinetic wordmark */}
      <motion.div style={{ x }} className="relative select-none py-10">
        <div className="flex justify-center gap-[0.02em] px-2">
          {word.split("").map((ch, i) => (
            <motion.span
              key={`${ch}-${i}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 18 }}
              whileHover={{ y: -22, rotate: [-5, 5, -2, 0], scale: 1.06, color: COLORS[i % COLORS.length] }}
              animate={{ y: [0, -7, 0] }}
              className="font-poster text-[clamp(2.6rem,12vw,11rem)] leading-[0.82] tracking-tight"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t-2 border-night/20 px-4 py-7 font-mono2 text-[11px] uppercase tracking-[0.2em] text-night/60 sm:px-6">
        <span>Concept 02 · Pasar Malam — made for the KrackedDev open bounty</span>
        <span className="flex flex-wrap items-center gap-4">
          <a href="#wheel" className="transition hover:text-flare">Wheel</a>
          <a href="#stack" className="transition hover:text-flare">Bounties</a>
          <a href="#guilds" className="transition hover:text-flare">Guilds</a>
          <a href="#xp" className="transition hover:text-flare">XP</a>
        </span>
        <span>Dibina dengan ❤ di Malaysia</span>
      </div>
    </footer>
  );
}
