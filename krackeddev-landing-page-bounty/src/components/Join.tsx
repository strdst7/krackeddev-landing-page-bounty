import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Hibiscus, Logo } from "./Art";
import type { Guild } from "../data";

const roles = ["I build things", "I design things", "I'm just starting", "I'm hiring", "I want to partner"];
const guildOpts: Guild[] = ["Web", "AI", "Design", "Mobile", "Data", "Hardware"];

export default function Join() {
  const [role, setRole] = useState(roles[0]);
  const [guild, setGuild] = useState<Guild>("Web");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [burst, setBurst] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setBurst((b) => b + 1);
  };

  return (
    <>
      <section id="join" className="relative overflow-hidden px-4 pb-24 sm:px-6">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] border-[3px] border-ink bg-hibiscus p-8 text-paper shadow-print sm:p-14 lg:p-20">
          <div className="pointer-events-none absolute inset-0 batik text-paper/10" />
          <Hibiscus className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 animate-spin-slow opacity-90" petal="#f4b3c2" />
          <Hibiscus className="pointer-events-none absolute -bottom-20 left-[40%] h-48 w-48 animate-spin-slow opacity-60" petal="#f3b63a" center="#e2382c" />

          {/* confetti */}
          <AnimatePresence>
            {burst > 0 &&
              Array.from({ length: 18 }).map((_, k) => (
                <motion.div
                  key={`${burst}-${k}`}
                  initial={{ x: "50%", y: "60%", scale: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: `${10 + Math.random() * 80}%`, y: `${Math.random() * 80}%`, scale: 0.6 + Math.random() * 0.6, rotate: Math.random() * 360, opacity: [1, 1, 0] }}
                  transition={{ duration: 1.8, ease: "easeOut" }}
                  className="pointer-events-none absolute left-0 top-0 h-12 w-12"
                >
                  <Hibiscus className="h-full w-full" petal={["#f4b3c2", "#f3b63a", "#a7cfe8", "#f5eee0"][k % 4]} />
                </motion.div>
              ))}
          </AnimatePresence>

          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="font-hand text-3xl text-turmeric">jom, join kami</p>
              <h2 className="font-display text-6xl font-black leading-[0.9] tracking-tight sm:text-8xl">
                Pull up
                <br />a chair.
              </h2>
              <p className="mt-6 max-w-md text-xl text-paper/85">
                There's always space at the table. Free forever, no gatekeeping, just builders building.
              </p>
            </div>

            <div className="rounded-[32px] border-[3px] border-ink bg-paper p-6 text-ink sm:p-8" data-nochaos>
              <AnimatePresence mode="wait">
                {!done ? (
                  <motion.form key="form" exit={{ opacity: 0, scale: 0.95 }} onSubmit={submit} className="space-y-5">
                    <div>
                      <div className="mb-2 text-sm font-bold uppercase tracking-widest text-ink/60">Who are you?</div>
                      <div className="flex flex-wrap gap-2">
                        {roles.map((r) => (
                          <button type="button" key={r} onClick={() => setRole(r)} className={`rounded-full border-2 border-ink px-3 py-1.5 text-sm font-semibold transition ${role === r ? "bg-ink text-paper" : "hover:bg-paper-2"}`}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-sm font-bold uppercase tracking-widest text-ink/60">Home guild</div>
                      <div className="grid grid-cols-3 gap-2">
                        {guildOpts.map((g) => (
                          <button type="button" key={g} onClick={() => setGuild(g)} className={`rounded-2xl border-2 border-ink py-2 text-sm font-bold transition ${guild === g ? "bg-turmeric shadow-print-sm" : "hover:bg-paper-2"}`}>
                            {g}
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
                        className="flex-1 rounded-full border-[2.5px] border-ink bg-paper px-5 py-3 font-medium outline-none focus:bg-paper-2"
                      />
                      <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-full border-[2.5px] border-ink bg-jungle px-6 py-3 font-bold text-paper transition hover:-translate-y-0.5 hover:shadow-print-sm">
                        Join <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                    <Hibiscus className="mx-auto h-20 w-20 animate-wobble" />
                    <h3 className="mt-4 font-display text-4xl font-black">Selamat datang!</h3>
                    <p className="mt-2 text-lg text-ink/70">
                      You're in the <strong>{guild}</strong> guild. Check {email} for your invite. Your first +30 XP is waiting.
                    </p>
                    <button onClick={() => { setDone(false); setEmail(""); }} className="mt-5 font-hand text-2xl text-hibiscus underline">
                      add another friend
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-[3px] border-ink bg-paper-2 px-4 pb-10 pt-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-ink/70">
                A community of builders learning, building and shipping together across Malaysia & Southeast Asia.
              </p>
            </div>
            {[
              { h: "Community", l: ["Guilds", "Weekly classes", "Hackathons", "KD Square"] },
              { h: "Opportunities", l: ["Bounties", "Post a bounty", "Startups directory", "Apprenticeships"] },
              { h: "Say hai", l: ["Discord", "Threads", "X / Twitter", "GitHub"] },
            ].map((c) => (
              <div key={c.h}>
                <div className="text-sm font-bold uppercase tracking-[0.2em] text-ink/50">{c.h}</div>
                <ul className="mt-3 space-y-2">
                  {c.l.map((x) => (
                    <li key={x}>
                      <a href="#top" className="font-semibold transition hover:text-hibiscus">{x}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 overflow-hidden">
            <div className="font-display text-[clamp(4rem,15vw,13rem)] font-black leading-[0.8] tracking-[-0.05em] text-outline select-none">
              krackeddev
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink/20 pt-6 text-sm text-ink/60">
            <span>Dibina dengan ❤ di Malaysia · A concept for the KrackedDev landing page bounty</span>
            <span className="font-hand text-xl">psst, try sticker mode ✦</span>
          </div>
        </div>
      </footer>
    </>
  );
}
