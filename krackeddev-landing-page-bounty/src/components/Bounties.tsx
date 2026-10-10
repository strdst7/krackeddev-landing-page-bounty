import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Dices, Search, Users, X, Check } from "lucide-react";
import { bounties, guildColors, type Bounty, type Guild } from "../data";

const guilds: (Guild | "All")[] = ["All", "Web", "AI", "Design", "Mobile", "Data", "Hardware"];
const diffChili: Record<Bounty["difficulty"], string> = { Starter: "🌶", Mid: "🌶🌶", Spicy: "🌶🌶🌶" };
const tagColors = ["bg-paper", "bg-pink", "bg-sky", "bg-turmeric"];

export default function Bounties() {
  const [guild, setGuild] = useState<Guild | "All">("All");
  const [sort, setSort] = useState<"reward" | "days" | "new">("reward");
  const [q, setQ] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [selected, setSelected] = useState<Bounty | null>(null);
  const [lucky, setLucky] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<number[]>([]);

  const list = useMemo(() => {
    let l = bounties.filter((b) => (guild === "All" || b.guild === guild) && (!openOnly || b.status === "Open"));
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((b) => (b.title + b.sponsor + b.tags.join(" ")).toLowerCase().includes(s));
    }
    return [...l].sort((a, b) => (sort === "reward" ? b.reward - a.reward : sort === "days" ? a.days - b.days : b.id - a.id));
  }, [guild, sort, q, openOnly]);

  const total = bounties.filter((b) => b.status === "Open").reduce((s, b) => s + b.reward, 0);

  const feelingLucky = () => {
    const open = bounties.filter((b) => b.status === "Open");
    const pick = open[Math.floor(Math.random() * open.length)];
    setGuild("All");
    setQ("");
    setLucky(pick.id);
    setTimeout(() => {
      document.getElementById(`bounty-${pick.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
    setTimeout(() => setLucky(null), 2600);
  };

  return (
    <section id="bounties" className="relative bg-paper-2 px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-[radial-gradient(circle_at_12px_0,transparent_12px,var(--color-paper-2)_13px)] bg-[length:24px_24px]" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-hand text-3xl text-jungle">pasar bounty, open every night</p>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
              Real briefs.
              <br />
              <span className="italic text-hibiscus">Real ringgit.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-ink/70">
              Startups, civic groups and the community post problems. You pick one, ship it, get paid directly. Even an
              honourable mention earns you XP.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-3xl border-[3px] border-ink bg-paper p-5 shadow-print">
              <div className="text-xs font-bold uppercase tracking-widest text-ink/60">Up for grabs</div>
              <div className="font-display text-4xl font-black">RM{total.toLocaleString()}</div>
            </div>
            <button
              onClick={feelingLucky}
              data-nochaos
              className="group flex flex-col items-center justify-center rounded-3xl border-[3px] border-ink bg-hibiscus px-5 text-paper shadow-print transition hover:-translate-y-1"
            >
              <Dices className="h-7 w-7 transition group-hover:rotate-180" />
              <span className="mt-1 text-xs font-bold uppercase tracking-wider">Feeling lucky</span>
            </button>
          </div>
        </div>

        {/* controls */}
        <div className="mt-12 flex flex-col gap-4 rounded-[28px] border-[3px] border-ink bg-paper p-4 lg:flex-row lg:items-center" data-nochaos>
          <div className="flex flex-wrap gap-2">
            {guilds.map((g) => (
              <button
                key={g}
                onClick={() => setGuild(g)}
                className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold transition ${
                  guild === g ? "bg-ink text-paper" : "hover:bg-paper-2"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-2 lg:justify-end">
            <label className="flex flex-1 items-center gap-2 rounded-full border-2 border-ink bg-paper px-3 py-1.5 lg:max-w-56">
              <Search className="h-4 w-4 shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Flutter, AI, map…"
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-ink/40"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border-2 border-ink bg-paper px-3 py-1.5 text-sm font-bold outline-none"
            >
              <option value="reward">Biggest reward</option>
              <option value="days">Ending soon</option>
              <option value="new">Newest</option>
            </select>
            <button
              onClick={() => setOpenOnly(!openOnly)}
              className={`rounded-full border-2 border-ink px-3 py-1.5 text-sm font-bold ${openOnly ? "bg-jungle text-paper" : ""}`}
            >
              {openOnly ? "✓ " : ""}Open only
            </button>
          </div>
        </div>

        {/* grid */}
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((b, i) => (
              <motion.button
                layout
                key={b.id}
                id={`bounty-${b.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: lucky === b.id ? [0, -3, 3, -2, 0] : i % 2 ? 0.8 : -0.8,
                  scale: lucky === b.id ? 1.05 : 1,
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, rotate: 0 }}
                onClick={() => setSelected(b)}
                data-nochaos
                className={`group relative flex flex-col text-left ${lucky === b.id ? "z-10" : ""}`}
              >
                <div
                  className={`ticket-edge flex h-full flex-col rounded-3xl border-[3px] border-ink bg-paper transition ${
                    lucky === b.id ? "bg-turmeric" : ""
                  } ${b.status !== "Open" ? "opacity-80" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2 p-5 pb-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${guildColors[b.guild]}`}>
                      {b.guild}
                    </span>
                    <span
                      className={`rounded-full border-2 border-ink px-2 py-0.5 text-[11px] font-bold uppercase ${
                        b.status === "Open" ? "bg-paper" : b.status === "Judging" ? "bg-sky" : "bg-ink text-paper"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="px-5">
                    <p className="text-xs font-semibold text-ink/60">{b.sponsor}</p>
                    <h3 className="mt-1 font-display text-xl font-bold leading-snug">{b.title}</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {b.tags.map((t, ti) => (
                        <span key={t} className={`rounded-md border-[1.5px] border-ink px-1.5 py-0.5 text-[11px] font-semibold ${tagColors[ti % 4]}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mx-5 my-4 border-t-[2.5px] border-dashed border-ink/40" />
                  <div className="mt-auto flex items-end justify-between px-5 pb-5">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-ink/50">Reward</div>
                      <div className="font-display text-3xl font-black leading-none">
                        <span className="text-base align-top">RM</span>
                        {b.reward.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right text-xs font-semibold text-ink/70">
                      <div title={b.difficulty}>{diffChili[b.difficulty]}</div>
                      <div className="mt-1 flex items-center justify-end gap-1">
                        <Clock className="h-3 w-3" /> {b.days}d left
                      </div>
                    </div>
                  </div>
                </div>
                {submitted.includes(b.id) && (
                  <span className="absolute -right-2 -top-3 rotate-12 rounded-full border-2 border-ink bg-jungle px-2 py-1 text-xs font-bold text-paper">
                    Submitted ✓
                  </span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
          {list.length === 0 && (
            <div className="col-span-full rounded-3xl border-[3px] border-dashed border-ink/40 p-12 text-center">
              <p className="font-display text-2xl font-bold">Tak jumpa lah. Nothing matches.</p>
              <p className="mt-2 text-ink/60">Got a problem worth solving? Post it as a bounty.</p>
            </div>
          )}
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center">
          <a href="#join" className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-ink px-6 py-3 font-bold text-paper transition hover:bg-jungle">
            See all bounties <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#join" className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-paper px-6 py-3 font-bold transition hover:bg-turmeric">
            Post a bounty · 0% fee
          </a>
        </div>
      </div>

      {/* modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
            data-nochaos
          >
            <motion.div
              initial={{ y: 40, rotate: -2, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[32px] border-[3px] border-ink bg-paper shadow-print"
            >
              <div className={`relative p-7 ${guildColors[selected.guild]}`}>
                <div className="pointer-events-none absolute inset-0 batik opacity-15" />
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full border-2 border-current p-1.5" aria-label="Close">
                  <X className="h-4 w-4" />
                </button>
                <p className="relative text-sm font-bold uppercase tracking-widest opacity-80">
                  {selected.sponsor} · {selected.guild} guild
                </p>
                <h3 className="relative mt-2 pr-8 font-display text-3xl font-black leading-tight">{selected.title}</h3>
              </div>
              <div className="p-7">
                <p className="text-lg leading-relaxed text-ink/80">{selected.brief}</p>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { k: "Reward", v: `RM${selected.reward.toLocaleString()}` },
                    { k: "Time left", v: `${selected.days} days` },
                    { k: "Win XP", v: `+${100 + Math.round(selected.reward / 10)}` },
                  ].map((s) => (
                    <div key={s.k} className="rounded-2xl border-2 border-ink bg-paper-2 p-3">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-ink/50">{s.k}</div>
                      <div className="font-display text-xl font-black">{s.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-ink/60">
                  <Users className="h-4 w-4" /> {selected.applicants} builders already working on this · {selected.difficulty} {diffChili[selected.difficulty]}
                </div>
                {selected.status === "Open" ? (
                  <button
                    onClick={() => {
                      setSubmitted((s) => (s.includes(selected.id) ? s : [...s, selected.id]));
                      setSelected(null);
                    }}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-[2.5px] border-ink bg-hibiscus py-3.5 font-bold text-paper transition hover:-translate-y-0.5 hover:shadow-print-sm"
                  >
                    {submitted.includes(selected.id) ? (
                      <>
                        <Check className="h-5 w-5" /> You're in. Go ship it!
                      </>
                    ) : (
                      <>I'm taking this one (+20 XP)</>
                    )}
                  </button>
                ) : (
                  <div className="mt-6 rounded-full border-[2.5px] border-dashed border-ink py-3.5 text-center font-bold text-ink/60">
                    {selected.status === "Judging" ? "Submissions closed. Judging in progress" : "This one's been won 🎉"}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
