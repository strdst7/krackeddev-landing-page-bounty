import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Flower2,
  Leaf,
  Menu,
  Plus,
  Sprout,
  X,
} from "lucide-react";
import gardenImage from "../assets/bunga-garden.jpg";
import KdMark from "../components/KdMark";
import { useLang } from "../boilerplate";
import { bounties, events, members, type Guild, type Bounty } from "../data";

const guilds: { name: Guild; icon: string; color: string; line: string; x: number; y: number }[] = [
  { name: "Web", icon: "✿", color: "#ed6959", line: "M 430 300 C 350 240 268 190 138 126", x: 138, y: 126 },
  { name: "AI", icon: "✽", color: "#e6a940", line: "M 430 300 C 412 228 364 150 324 92", x: 324, y: 92 },
  { name: "Design", icon: "✿", color: "#a485c6", line: "M 430 300 C 430 212 430 150 430 78", x: 430, y: 78 },
  { name: "Mobile", icon: "✽", color: "#5b9b78", line: "M 430 300 C 448 220 492 158 548 98", x: 548, y: 98 },
  { name: "Data", icon: "✿", color: "#d9885c", line: "M 430 300 C 502 238 584 198 710 142", x: 710, y: 142 },
  { name: "Hardware", icon: "✽", color: "#5b90a2", line: "M 430 300 C 408 360 326 396 216 414", x: 216, y: 414 },
];

const guildColor: Record<Guild, string> = {
  Web: "#ed6959",
  AI: "#e6a940",
  Design: "#a485c6",
  Mobile: "#5b9b78",
  Data: "#d9885c",
  Hardware: "#5b90a2",
};

const initialSeeds = [
  { handle: "aisyahbuilds", x: 9, y: 40 },
  { handle: "weijie.dev", x: 22, y: 13 },
  { handle: "arvk", x: 35, y: 36 },
  { handle: "nurul.codes", x: 48, y: 8 },
  { handle: "dlim", x: 61, y: 40 },
  { handle: "hajar.data", x: 74, y: 15 },
  { handle: "apiz", x: 88, y: 38 },
];

function BloomMark({
  color = "#ed6959",
  center = "#f1c35b",
  className = "",
  delay = 0,
}: {
  color?: string;
  center?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={className}
      initial={{ scale: 0, rotate: -24 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 13, delay }}
    >
      <motion.g
        style={{ transformOrigin: "50px 50px", transformBox: "view-box" }}
        animate={{ rotate: [-4, 4, -4], scale: [0.97, 1.04, 0.97] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="25"
            rx="12"
            ry="21"
            transform={`rotate(${i * 60} 50 50)`}
            fill={color}
            stroke="#163d34"
            strokeWidth="2.5"
          />
        ))}
        <circle cx="50" cy="50" r="12" fill={center} stroke="#163d34" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="3.5" fill="#163d34" />
      </motion.g>
    </motion.svg>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <div
      className="relative flex rounded-full border border-bloom-ink/20 bg-bloom-paper/70 p-0.5"
      role="group"
      aria-label={t.langLabel}
    >
      {(["en", "bm"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
            lang === l ? "text-bloom-cream" : "text-bloom-ink/55 hover:text-bloom-ink"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-bloom-ink"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </div>
  );
}

function GardenNav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const links: [string, string][] = [
    [t.nav.roots, "#roots"],
    [t.nav.harvest, "#harvest"],
    [t.nav.season, "#season"],
    [t.nav.wall, "#garden-wall"],
  ];

  return (
    <header className={`absolute inset-x-0 top-0 z-40 transition-colors duration-300 ${scrolled ? "bg-bloom-cream/90 backdrop-blur-md" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8 sm:py-5">
        <a href="#bloom-top" className="group flex items-center gap-2.5" aria-label="KrackedDev home">
          <KdMark className="aspect-[62/33] h-7 w-auto transition-transform duration-500 group-hover:rotate-2 sm:h-8" />
          <span className="bloom-display text-xl font-black tracking-tight text-bloom-ink">
            Kracked<span className="italic text-bloom-coral">Dev</span>
            <span className="ml-1.5 hidden font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-bloom-leaf sm:inline">
              {t.brand.tag}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="bloom-link-underline py-1 text-sm font-semibold text-bloom-ink/75 hover:text-bloom-ink">
              {label}
            </a>
          ))}
          <LangToggle />
          <a href="#join-bloom" className="inline-flex items-center gap-2 rounded-full bg-bloom-ink px-5 py-2.5 text-sm font-bold text-bloom-cream transition hover:-translate-y-0.5 hover:bg-bloom-leaf">
            {t.nav.join} <ArrowUpRight className="h-4 w-4" />
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangToggle />
          <button onClick={() => setOpen(!open)} className="rounded-full border border-bloom-ink/20 bg-bloom-paper/75 p-2.5" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-bloom-ink/10 bg-bloom-cream md:hidden"
          >
            <div className="grid gap-1 px-5 py-3">
              {links.map(([label, href]) => (
                <a key={href} onClick={() => setOpen(false)} href={href} className="rounded-xl px-3 py-3 font-semibold hover:bg-bloom-mist">
                  {label}
                </a>
              ))}
              <a onClick={() => setOpen(false)} href="#join-bloom" className="mt-1 rounded-xl bg-bloom-ink px-4 py-3 text-center font-bold text-bloom-cream">
                {t.nav.join}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function BloomHero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 100]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section ref={ref} id="bloom-top" className="relative isolate flex min-h-[760px] h-[100svh] max-h-[1100px] overflow-hidden bg-bloom-cream">
      <motion.div className="absolute inset-0" style={{ y: artY, scale: reduce ? 1 : 1.08 }}>
        <img src={gardenImage} alt="A community garden in Kuala Lumpur, where local makers gather around a shared work table" className="h-full w-full object-cover object-[58%_center] sm:object-center" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,244,233,0.98)_0%,rgba(246,244,233,0.94)_31%,rgba(246,244,233,0.74)_47%,rgba(246,244,233,0.08)_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-bloom-cream via-bloom-cream/70 to-transparent" />
      <div className="bloom-grain pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" />

      <div className="pointer-events-none absolute right-[7%] top-[19%] hidden h-20 w-20 rounded-full border border-bloom-paper/80 sm:block" />
      <motion.div className="pointer-events-none absolute right-[10%] top-[14%] hidden sm:block" animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }}>
        <BloomMark className="h-16 w-16" color="#f1c35b" delay={0.25} />
      </motion.div>
      <motion.div className="pointer-events-none absolute right-[29%] top-[27%] hidden sm:block" animate={{ y: [0, -12, 0], rotate: [0, 9, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <Leaf className="h-10 w-10 rotate-[-35deg] text-bloom-leaf/80" strokeWidth={1.2} />
      </motion.div>

      <GardenNav />

      <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 pb-20 pt-28 sm:px-8 lg:pb-14">
        <motion.p
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-5 flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.28em] text-bloom-leaf sm:text-xs"
        >
          <span className="h-px w-8 bg-bloom-coral" />
          {t.hero.eyebrow}
        </motion.p>

        <h1 className="bloom-display max-w-[830px] text-[clamp(4.2rem,10vw,9.3rem)] font-black leading-[0.83] tracking-[-0.065em] text-bloom-ink">
          <span className="block overflow-hidden pb-2">
            <motion.span initial={{ y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 1.05, delay: 0.25, ease: [0.16, 1, 0.3, 1] }} className="block">
              Kracked<span className="italic text-bloom-coral">Dev</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-3">
            <motion.span initial={{ y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="block font-medium italic text-bloom-leaf">
              {t.hero.titleB}
            </motion.span>
          </span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.8 }} className="mt-5 max-w-[460px] text-base leading-relaxed text-bloom-ink/75 sm:mt-7 sm:text-lg">
          {t.hero.sub}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.88 }} className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9">
          <a href="#roots" className="group inline-flex items-center gap-2.5 rounded-full bg-bloom-ink px-6 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-bloom-leaf">
            {t.hero.cta1} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#harvest" className="rounded-full border border-bloom-ink/30 bg-bloom-paper/75 px-6 py-3.5 font-bold transition hover:border-bloom-ink hover:bg-bloom-paper">
            {t.hero.cta2}
          </a>
        </motion.div>

        <motion.a
          href="#roots"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-bloom-ink/50 sm:left-8"
        >
          {t.hero.scroll} <ArrowDownRight className="h-4 w-4 animate-bounce" />
        </motion.a>
      </motion.div>

      <div className="pointer-events-none absolute bottom-[14%] right-[4%] hidden max-w-[190px] rotate-[-7deg] whitespace-pre-line font-serif text-[13px] italic leading-snug text-white drop-shadow md:block">
        {t.hero.aside}
      </div>
    </section>
  );
}

function Blueprint() {
  const { t } = useLang();
  const words = [...t.blueprint.marquee, ...t.blueprint.marquee, ...t.blueprint.marquee];

  return (
    <section className="relative overflow-hidden bg-[#101010] px-5 pb-24 pt-20 text-bloom-cream sm:px-8 lg:pb-32 lg:pt-24">
      <div className="bloom-grain pointer-events-none absolute inset-0 opacity-25" />

      {/* ticker of what the ecosystem is */}
      <div className="absolute inset-x-0 top-0 overflow-hidden border-b border-white/10 py-3">
        <div className="flex w-max animate-marquee">
          {words.map((w, i) => (
            <span key={i} className="mx-4 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
              {w} <span className="text-bloom-sun">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-8 grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-bloom-sun">{t.blueprint.eyebrow}</p>
          <h2 className="bloom-display text-4xl font-black leading-[1.04] tracking-[-0.03em] sm:text-5xl">{t.blueprint.tagline}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{t.blueprint.body}</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">{t.blueprint.operator}</p>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <span className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-bloom-sun/60" />
          <span className="absolute -right-3 -top-3 h-6 w-6 border-r-2 border-t-2 border-bloom-sun/60" />
          <span className="absolute -bottom-3 -left-3 h-6 w-6 border-l-2 border-b-2 border-bloom-sun/60" />
          <span className="absolute -right-3 -bottom-3 h-6 w-6 border-r-2 border-b-2 border-bloom-sun/60" />
          <KdMark
            className="aspect-[62/33] w-full"
            ink="#f6f4e9"
            grid="rgba(16,16,16,0.12)"
            detailA="rgba(16,16,16,0.9)"
            detailB="rgba(16,16,16,0.5)"
          />
          <p className="mt-4 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">{t.blueprint.plate}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Roots() {
  const { t } = useLang();
  const [activeGuild, setActiveGuild] = useState<Guild>("Web");
  const active = guilds.find((g) => g.name === activeGuild)!;
  const people = members.filter((m) => m.guild === activeGuild).slice(0, 3);

  return (
    <section id="roots" className="relative overflow-hidden px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute -right-28 top-0 h-[28rem] w-[28rem] rounded-full bg-bloom-lilac/65 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.76fr_1.24fr] lg:items-center">
          <div>
            <Reveal>
              <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-bloom-coral">{t.roots.eyebrow}</p>
              <h2 className="bloom-display text-5xl font-black leading-[0.96] tracking-[-0.045em] sm:text-7xl">
                {t.roots.titleA}
                <br />
                <span className="italic text-bloom-leaf">{t.roots.titleB}</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-bloom-ink/70">{t.roots.sub}</p>
            </Reveal>

            <div className="mt-9 border-t border-bloom-ink/15" role="tablist" aria-label={t.nav.roots}>
              {guilds.map((g, i) => (
                <motion.button
                  key={g.name}
                  layout
                  role="tab"
                  aria-selected={activeGuild === g.name}
                  onClick={() => setActiveGuild(g.name)}
                  onMouseEnter={() => setActiveGuild(g.name)}
                  className={`group flex w-full items-center gap-4 border-b border-bloom-ink/15 py-3.5 text-left transition-colors ${activeGuild === g.name ? "text-bloom-ink" : "text-bloom-ink/45 hover:text-bloom-ink"}`}
                >
                  <span className="w-6 font-mono text-[11px] text-bloom-ink/35">0{i + 1}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-lg transition-transform duration-300 group-hover:rotate-12" style={{ color: g.color }}>{g.icon}</span>
                  <span className="flex-1 font-semibold">{g.name} guild</span>
                  <motion.span animate={{ x: activeGuild === g.name ? 0 : -5, opacity: activeGuild === g.name ? 1 : 0 }} className="text-bloom-coral">
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="mt-5 min-h-[86px]">
                <p className="font-serif text-xl italic text-bloom-leaf">{t.guildDesc[active.name]}</p>
                <div className="mt-3 flex items-center gap-2.5">
                  {people.map((person, i) => (
                    <motion.span key={person.handle} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.08, type: "spring", stiffness: 220 }} title={person.name} className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-bloom-cream text-base" style={{ background: person.bg }}>
                      {person.emoji}
                    </motion.span>
                  ))}
                  <span className="text-xs font-semibold text-bloom-ink/50">{active.name} {t.roots.folks}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className="relative mx-auto aspect-[1.38/1] w-full max-w-[860px]">
              <svg viewBox="0 0 860 500" className="h-full w-full" role="img" aria-label={`A growing guild network. ${active.name} guild is highlighted.`}>
                <defs>
                  <radialGradient id="root-glow">
                    <stop stopColor={active.color} stopOpacity=".20" />
                    <stop offset="1" stopColor={active.color} stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="430" cy="300" r="190" fill="url(#root-glow)" />
                <motion.path d="M 430 482 C 424 420 438 358 430 300" fill="none" stroke="#2d7050" strokeWidth="9" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
                {guilds.map((g, i) => (
                  <g key={g.name}>
                    <path d={g.line} fill="none" stroke="#8da78f" strokeWidth="3" strokeLinecap="round" opacity=".22" />
                    <motion.path
                      key={`${g.name}-${activeGuild === g.name}`}
                      d={g.line}
                      fill="none"
                      stroke={activeGuild === g.name ? g.color : "#73987e"}
                      strokeWidth={activeGuild === g.name ? 5 : 2.25}
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1, opacity: activeGuild === g.name ? 1 : 0.48 }}
                      transition={{ duration: activeGuild === g.name ? 1.2 : 0.65, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.55 + i * 0.09, type: "spring", stiffness: 150, damping: 12 }}
                      animate={activeGuild === g.name ? { y: [0, -5, 0] } : { y: [0, 2, 0] }}
                      style={{ transformOrigin: `${g.x}px ${g.y}px`, transformBox: "view-box" }}
                      onClick={() => setActiveGuild(g.name)}
                      className="cursor-pointer"
                    >
                      <circle cx={g.x} cy={g.y} r={activeGuild === g.name ? 34 : 28} fill={activeGuild === g.name ? g.color : "#fffdf4"} stroke="#163d34" strokeWidth="2.5" />
                      <text x={g.x} y={g.y + 11} textAnchor="middle" fontSize="31" fill={activeGuild === g.name ? "#fffdf4" : g.color}>{g.icon}</text>
                      <text x={g.x} y={g.y + 57} textAnchor="middle" fontSize="13" fontWeight="700" fill="#163d34">{g.name}</text>
                    </motion.g>
                  </g>
                ))}
                <motion.g initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, type: "spring" }} style={{ transformOrigin: "430px 300px", transformBox: "view-box" }}>
                  <circle cx="430" cy="300" r="53" fill="#163d34" />
                  <text x="430" y="296" textAnchor="middle" fontSize="12" letterSpacing="2.4" fontWeight="700" fill="#fffdf4">GROW</text>
                  <text x="430" y="316" textAnchor="middle" fontSize="12" letterSpacing="2.4" fontWeight="700" fill="#f1c35b">TOGETHER</text>
                </motion.g>
              </svg>
            </div>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-3 px-3 text-sm text-bloom-ink/50">
              <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full" style={{ background: active.color }} /> {t.roots.hint}</span>
              <span className="font-serif italic">{t.roots.footnote}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Harvest() {
  const { t } = useLang();
  const [guild, setGuild] = useState<Guild | "All">("All");
  const [selected, setSelected] = useState<Bounty | null>(null);
  const [taken, setTaken] = useState<number[]>([]);
  const openBounties = bounties.filter((b) => b.status === "Open");
  const filtered = guild === "All" ? openBounties : openBounties.filter((b) => b.guild === guild);
  const guildOptions: (Guild | "All")[] = ["All", "Web", "AI", "Design", "Mobile", "Data", "Hardware"];
  const total = openBounties.reduce((sum, b) => sum + b.reward, 0);

  return (
    <section id="harvest" className="relative overflow-hidden bg-bloom-dusk px-5 py-24 text-bloom-cream sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute -right-20 top-16 h-96 w-96 rounded-full bg-bloom-leaf/30 blur-[90px]" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-bloom-coral/15 blur-[80px]" />
      <div className="bloom-grain pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] text-bloom-sun"><Sprout className="h-4 w-4" /> {t.harvest.eyebrow}</p>
            <h2 className="bloom-display text-5xl font-black leading-[.95] tracking-[-.045em] sm:text-7xl">
              {t.harvest.titleA}
              <br />
              <span className="font-medium italic text-bloom-sun">{t.harvest.titleB}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14} className="max-w-sm">
            <p className="text-lg leading-relaxed text-bloom-cream/68">{t.harvest.sub}</p>
            <div className="mt-4 font-serif text-2xl italic text-bloom-cream">RM{total.toLocaleString()} {t.harvest.total}</div>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-b border-bloom-cream/15 pb-4" role="group" aria-label={t.nav.harvest}>
          {guildOptions.map((g) => (
            <button key={g} onClick={() => setGuild(g)} className={`relative py-2 text-sm font-semibold transition-colors ${guild === g ? "text-bloom-sun" : "text-bloom-cream/50 hover:text-bloom-cream"}`}>
              {g}
              {guild === g && <motion.span layoutId="bounty-filter" className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-bloom-sun" />}
            </button>
          ))}
          <span className="ml-auto py-2 font-mono text-[10px] uppercase tracking-[.18em] text-bloom-cream/40">{t.harvest.count.replace("{n}", String(filtered.length))}</span>
        </div>

        <motion.div layout className="mt-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((b, i) => (
              <motion.button
                layout
                key={b.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.42, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(b)}
                className="group grid w-full grid-cols-[2.2rem_1fr_auto] items-center gap-3 border-b border-bloom-cream/15 py-5 text-left transition-colors hover:bg-white/[0.035] sm:grid-cols-[2.5rem_1fr_7rem_8rem_2rem] sm:gap-5 sm:py-6"
              >
                <span className="font-mono text-xs text-bloom-cream/35">0{i + 1}</span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-bloom-cream transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">{b.title}</span>
                  <span className="mt-1 block truncate text-xs text-bloom-cream/45">{b.sponsor} <span className="sm:hidden"> · {b.guild}</span></span>
                </span>
                <span className="hidden text-sm text-bloom-cream/50 sm:block">{b.guild} guild</span>
                <span className="text-right">
                  <span className="block font-serif text-xl font-semibold text-bloom-sun sm:text-2xl">RM{b.reward.toLocaleString()}</span>
                  <span className="text-[10px] uppercase tracking-[.12em] text-bloom-cream/40">{t.harvest.daysLeft.replace("{d}", String(b.days))}</span>
                </span>
                <span className="hidden h-9 w-9 items-center justify-center rounded-full border border-bloom-cream/20 transition-all group-hover:rotate-45 group-hover:border-bloom-sun group-hover:bg-bloom-sun group-hover:text-bloom-ink sm:flex">
                  {taken.includes(b.id) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && <p className="py-14 text-center font-serif text-2xl italic text-bloom-cream/60">—</p>}
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-bloom-cream/55">
          <span>{t.harvest.note}</span>
          <a href="#join-bloom" className="inline-flex items-center gap-2 font-bold text-bloom-sun transition hover:gap-3">{t.harvest.share} <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-bloom-ink/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 23 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl overflow-hidden rounded-[32px] bg-bloom-cream text-bloom-ink shadow-2xl"
            >
              <div className="absolute -right-10 -top-10 opacity-30"><BloomMark className="h-40 w-40" color={guildColor[selected.guild]} /></div>
              <div className="relative p-7 sm:p-9">
                <button onClick={() => setSelected(null)} className="absolute right-5 top-5 rounded-full border border-bloom-ink/20 p-2" aria-label="Close brief"><X className="h-4 w-4" /></button>
                <span className="text-xs font-extrabold uppercase tracking-[.2em] text-bloom-leaf">{selected.sponsor} · {selected.guild} guild</span>
                <h3 className="bloom-display mt-4 max-w-[90%] text-3xl font-black leading-tight sm:text-4xl">{selected.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-bloom-ink/70">{selected.brief}</p>
                <div className="mt-6 flex flex-wrap gap-2">{selected.tags.map((tag) => <span key={tag} className="rounded-full border border-bloom-ink/20 px-3 py-1 text-xs font-semibold">{tag}</span>)}</div>
                <div className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-bloom-ink/15 pt-5">
                  <div><div className="text-[10px] font-bold uppercase tracking-[.2em] text-bloom-ink/45">{t.harvest.reward}</div><div className="bloom-display text-4xl font-black text-bloom-coral">RM{selected.reward.toLocaleString()}</div></div>
                  <button
                    onClick={() => {
                      setTaken((prev) => prev.includes(selected.id) ? prev : [...prev, selected.id]);
                      setSelected(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-bloom-ink px-5 py-3 font-bold text-white transition hover:bg-bloom-leaf"
                  >
                    {taken.includes(selected.id) ? t.harvest.modalCtaDone : t.harvest.modalCta} <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const growthSteps = [
  { number: "01", flower: "#ed6959", top: 134 },
  { number: "02", flower: "#a485c6", top: 70 },
  { number: "03", flower: "#e6a940", top: 119 },
  { number: "04", flower: "#5b9b78", top: 48 },
];

function Season() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(t.season.steps.length - 1, Math.max(0, Math.floor(value * t.season.steps.length)));
    setActive((current) => current === next ? current : next);
  });

  return (
    <section id="season" className="overflow-hidden bg-bloom-lilac/65 px-5 py-24 sm:px-8 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[.7fr_1fr] md:items-end">
          <Reveal>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[.25em] text-bloom-leaf">{t.season.eyebrow}</p>
            <h2 className="bloom-display text-5xl font-black leading-[.95] tracking-[-.04em] sm:text-6xl">
              {t.season.titleA}
              <br />
              <span className="italic">{t.season.titleB}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="max-w-xl text-lg leading-relaxed text-bloom-ink/68">
            <p>{t.season.sub}</p>
          </Reveal>
        </div>

        <div className="relative mt-16 hidden h-[460px] md:block">
          <svg viewBox="0 0 1000 245" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[245px] w-full overflow-visible">
            <path d="M 38 148 C 155 148 166 72 282 72 S 416 155 526 155 S 660 100 756 100 S 884 52 964 52" fill="none" stroke="#adc0ae" strokeWidth="3" strokeDasharray="4 9" strokeLinecap="round" />
            <motion.path d="M 38 148 C 155 148 166 72 282 72 S 416 155 526 155 S 660 100 756 100 S 884 52 964 52" fill="none" stroke="#2d7050" strokeWidth="3" strokeLinecap="round" style={{ pathLength: scrollYProgress }} />
          </svg>

          {growthSteps.map((step, i) => {
            const left = [4, 29, 55, 81][i];
            return (
              <motion.div key={step.number} className="absolute w-[19%]" style={{ left: `${left}%`, top: `${step.top}px` }} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ delay: i * 0.1, duration: .7 }}>
                <motion.div animate={{ scale: active >= i ? [1, 1.08, 1] : 1, rotate: active >= i ? [0, -4, 4, 0] : 0 }} transition={{ duration: .8 }} className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-bloom-ink bg-bloom-paper">
                  <BloomMark className="h-10 w-10" color={step.flower} delay={i * .1} />
                </motion.div>
                <div className="mt-7 font-mono text-[10px] tracking-[.2em] text-bloom-ink/45">{step.number}</div>
                <h3 className="bloom-display mt-1 text-2xl font-bold">{t.season.steps[i].title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-bloom-ink/65">{t.season.steps[i].description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 space-y-8 border-l border-bloom-leaf/35 pl-5 md:hidden">
          {growthSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * .05} className="relative">
              <span className="absolute -left-[26px] top-0 flex h-3 w-3 rounded-full border-2 border-bloom-lilac bg-bloom-leaf" />
              <div className="flex items-center gap-3"><BloomMark className="h-9 w-9" color={step.flower} /><span className="font-mono text-[10px] tracking-[.2em] text-bloom-ink/45">{step.number}</span></div>
              <h3 className="bloom-display mt-2 text-2xl font-bold">{t.season.steps[i].title}</h3>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-bloom-ink/65">{t.season.steps[i].description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-bloom-ink/10 pt-5 text-sm text-bloom-ink/55">
          <span>{t.season.onTheWay}</span>
          {events.slice(0, 3).map((event, i) => <span key={event.title} className="inline-flex items-center gap-2"><span className="font-semibold text-bloom-ink">{event.title}</span>{i < 2 && <span className="text-bloom-coral">✿</span>}</span>)}
        </Reveal>
      </div>
    </section>
  );
}

type Seed = { id: string; name: string; guild: Guild; x: number; y: number; isNew?: boolean };

function GardenWall() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [guild, setGuild] = useState<Guild>("Web");
  const [planted, setPlanted] = useState(false);
  const [plants, setPlants] = useState<Seed[]>(() => initialSeeds.flatMap((spot) => {
    const member = members.find((m) => m.handle === spot.handle);
    return member ? [{ id: member.handle, name: member.name.split(" ")[0], guild: member.guild, x: spot.x, y: spot.y }] : [];
  }));
  const plantArea = useRef<HTMLDivElement>(null);

  const plantSeed = (e: FormEvent) => {
    e.preventDefault();
    const firstName = name.trim().split(/\s+/)[0];
    if (!firstName) return;
    const rect = plantArea.current?.getBoundingClientRect();
    const cols = Math.max(2, Math.floor((rect?.width ?? 800) / 135));
    const nextIndex = plants.length;
    const x = 8 + (nextIndex % cols) * (84 / Math.max(cols - 1, 1)) + (Math.random() * 4 - 2);
    const y = 13 + ((nextIndex * 19) % 39) + (Math.random() * 5 - 2.5);
    setPlants((current) => [...current, { id: `${Date.now()}`, name: firstName.slice(0, 14), guild, x: Math.max(7, Math.min(93, x)), y, isNew: true }].slice(-24));
    setName("");
    setPlanted(true);
  };

  return (
    <section id="garden-wall" className="relative overflow-hidden bg-bloom-cream px-5 py-24 sm:px-8 lg:py-32">
      <div className="pointer-events-none absolute -left-20 top-32 h-80 w-80 rounded-full bg-bloom-mist/70 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.25em] text-bloom-coral"><Flower2 className="h-4 w-4" /> {t.wall.eyebrow}</p>
            <h2 className="bloom-display text-5xl font-black leading-[.94] tracking-[-.045em] sm:text-7xl">
              {t.wall.titleA}
              <br />
              <span className="font-medium italic text-bloom-leaf">{t.wall.titleB}</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-bloom-ink/65">{t.wall.sub}</p>
          </Reveal>

          <Reveal delay={0.13}>
            <form onSubmit={plantSeed} className="grid gap-3 rounded-[26px] border border-bloom-ink/12 bg-bloom-paper/80 p-3 shadow-[0_10px_35px_rgba(22,61,52,.06)] sm:grid-cols-[1fr_145px_auto] sm:items-center">
              <label className="sr-only" htmlFor="seed-name">{t.wall.placeholder}</label>
              <input id="seed-name" required value={name} onChange={(e) => setName(e.target.value)} maxLength={22} placeholder={t.wall.placeholder} className="min-w-0 rounded-full border border-bloom-ink/15 bg-transparent px-4 py-3 text-sm font-semibold outline-none transition placeholder:font-normal placeholder:text-bloom-ink/40 focus:border-bloom-leaf" />
              <label className="sr-only" htmlFor="seed-guild">{t.nav.roots}</label>
              <select id="seed-guild" value={guild} onChange={(e) => setGuild(e.target.value as Guild)} className="rounded-full border border-bloom-ink/15 bg-bloom-cream px-4 py-3 text-sm font-semibold outline-none focus:border-bloom-leaf">
                {guilds.map((g) => <option key={g.name} value={g.name}>{t.wall.guildLabel.replace("{g}", g.name)}</option>)}
              </select>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-bloom-coral px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-bloom-ink">
                {t.wall.plant} <Plus className="h-4 w-4" />
              </button>
            </form>
            <AnimatePresence>
              {planted && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 pl-4 text-xs font-semibold text-bloom-leaf">{t.wall.planted}</motion.p>}
            </AnimatePresence>
          </Reveal>
        </div>

        <div ref={plantArea} className="relative mt-12 min-h-[400px] overflow-hidden rounded-[30px] border border-bloom-ink/10 bg-bloom-mist/65 sm:mt-16 sm:min-h-[475px]">
          <div className="bloom-grain pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-bloom-leaf/25 to-transparent" />
          <motion.div className="pointer-events-none absolute -bottom-24 -left-[10%] h-48 w-[120%] rounded-[50%] bg-bloom-leaf/15" animate={{ x: [-12, 12, -12] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="pointer-events-none absolute -bottom-36 left-[28%] h-52 w-[90%] rounded-[50%] bg-bloom-leaf/10" animate={{ x: [14, -14, 14] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }} />

          {plants.map((plant, i) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, scale: 0.15, rotate: -18, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              transition={{ type: "spring", stiffness: 125, damping: 13, delay: plant.isNew ? 0 : i * 0.045 }}
              className="absolute z-10 flex h-[170px] w-[86px] -translate-x-1/2 flex-col items-center"
              style={{ left: `${plant.x}%`, top: `${plant.y}%` }}
            >
              <motion.div animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }} transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.11 }} className="relative flex h-full w-full flex-col items-center">
                <BloomMark className="relative z-10 h-[58px] w-[58px]" color={guildColor[plant.guild]} delay={plant.isNew ? 0.28 : 0.5 + i * 0.06} />
                <svg viewBox="0 0 86 91" className="absolute left-0 top-[37px] h-[100px] w-[86px] overflow-visible" aria-hidden="true">
                  <motion.path d="M43 4 C 42 24 48 43 43 88" fill="none" stroke="#2d7050" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: plant.isNew ? 0.05 : i * 0.04 }} />
                  <motion.path d="M44 47 C 31 34 23 38 24 49 C 33 54 40 52 44 47Z" fill="#78a978" stroke="#2d7050" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.55 + i * 0.04, type: "spring" }} style={{ transformOrigin: "44px 47px", transformBox: "view-box" }} />
                  <motion.path d="M43 65 C 56 51 64 56 62 67 C 54 72 47 70 43 65Z" fill="#78a978" stroke="#2d7050" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.72 + i * 0.04, type: "spring" }} style={{ transformOrigin: "43px 65px", transformBox: "view-box" }} />
                </svg>
                <span className="relative z-10 mt-auto max-w-full truncate rounded-full bg-bloom-cream/90 px-2.5 py-1 text-[11px] font-bold text-bloom-ink shadow-sm">{plant.name}</span>
                <span className="relative z-10 mt-1 text-[9px] font-semibold uppercase tracking-[.12em] text-bloom-ink/55">{plant.guild}</span>
              </motion.div>
              {plant.isNew && <motion.span initial={{ scale: 0, y: 12 }} animate={{ scale: [0, 1.2, 1], y: -6, opacity: [0, 1, 0] }} transition={{ duration: 1.6 }} className="pointer-events-none absolute -top-3 z-20 font-serif text-xl font-bold text-bloom-coral">+1</motion.span>}
            </motion.div>
          ))}

          <div className="absolute bottom-4 left-5 z-20 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-bloom-ink/45 sm:bottom-5 sm:left-7">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-bloom-leaf" />
            {t.wall.counter.replace("{n}", String(plants.length))}
          </div>
          <div className="absolute bottom-4 right-5 z-20 hidden font-serif text-sm italic text-bloom-ink/45 sm:bottom-5 sm:right-7 sm:block">{t.wall.note}</div>
        </div>
      </div>
    </section>
  );
}

function Closing() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setJoined(true);
  };

  return (
    <>
      <section id="join-bloom" className="relative overflow-hidden bg-bloom-coral px-5 py-24 text-white sm:px-8 lg:py-32">
        <div className="bloom-grain pointer-events-none absolute inset-0 opacity-30" />
        <motion.div className="pointer-events-none absolute -right-12 -top-20 opacity-25" animate={{ rotate: 360 }} transition={{ duration: 65, repeat: Infinity, ease: "linear" }}><BloomMark className="h-[360px] w-[360px]" color="#fffdf4" center="#f1c35b" /></motion.div>
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <Reveal>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[.24em] text-white/75">{t.closing.eyebrow}</p>
            <h2 className="bloom-display text-6xl font-black leading-[.9] tracking-[-.055em] sm:text-8xl">
              {t.closing.titleA}
              <br />
              <span className="font-medium italic">{t.closing.titleB}</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">{t.closing.sub}</p>
          </Reveal>

          <div className="rounded-[28px] border border-white/35 bg-white/10 p-5 backdrop-blur-sm sm:p-7" data-nochaos>
            <AnimatePresence mode="wait">
              {joined ? (
                <motion.div key="welcome" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-5 text-center">
                  <BloomMark className="mx-auto h-20 w-20" color="#fffdf4" />
                  <h3 className="bloom-display mt-4 text-3xl font-bold">{t.closing.welcomeTitle}</h3>
                  <p className="mt-2 text-white/80">{t.closing.welcomeBody.replace("{email}", email)}</p>
                  <button onClick={() => { setJoined(false); setEmail(""); }} className="mt-5 text-sm font-bold underline underline-offset-4">{t.closing.invite}</button>
                </motion.div>
              ) : (
                <motion.form key="join-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit}>
                  <label htmlFor="garden-email" className="text-xs font-extrabold uppercase tracking-[.2em] text-white/75">{t.closing.label}</label>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input id="garden-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.my" className="min-w-0 flex-1 rounded-full border border-white/45 bg-white/10 px-5 py-3.5 text-white outline-none placeholder:text-white/55 focus:bg-white/15" />
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-bloom-cream px-5 py-3.5 font-bold text-bloom-ink transition hover:-translate-y-0.5 hover:bg-white">{t.closing.cta} <ArrowRight className="h-4 w-4" /></button>
                  </div>
                  <p className="mt-3 text-xs text-white/65">{t.closing.fine}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <footer className="bg-bloom-cream px-5 py-7 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-bloom-ink/55">
          <a href="#bloom-top" className="flex items-center gap-2 font-semibold text-bloom-ink">
            <KdMark className="aspect-[62/33] h-6 w-auto" /> KrackedDev · {t.brand.tag}
          </a>
          <span className="font-serif italic">{t.footer.tagline}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{t.footer.operator}</span>
          <span>{t.footer.made}</span>
          <a href="#bloom-top" className="inline-flex items-center gap-1 font-semibold hover:text-bloom-coral">{t.footer.top} ↑</a>
        </div>
      </footer>
    </>
  );
}

export default function Garden() {
  return (
    <div className="bloom-page relative min-h-screen overflow-hidden">
      <BloomHero />
      <Blueprint />
      <Roots />
      <Harvest />
      <Season />
      <GardenWall />
      <Closing />
    </div>
  );
}
