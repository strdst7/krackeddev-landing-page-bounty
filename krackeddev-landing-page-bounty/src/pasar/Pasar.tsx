import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Cursor from "./Cursor";
import Hero from "./Hero";
import Marquees from "./Marquees";
import Stack from "./Stack";
import Wheel from "./Wheel";
import Crew from "./Crew";
import Guilds from "./Guilds";
import RouteMap from "./RouteMap";
import Signals from "./Signals";
import Footer from "./Footer";

const nav = [
  { id: "stack", label: "Bounties" },
  { id: "wheel", label: "Wheel" },
  { id: "crew", label: "Crew" },
  { id: "guilds", label: "Guilds" },
  { id: "xp", label: "XP" },
];

export default function Pasar() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 90);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="pasar grain grain-dark relative min-h-screen">
      <Cursor />

      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left"
        style={{ scaleX: bar, background: "linear-gradient(90deg,#ff5a45,#ffc93c,#7ce0b6,#6fb7ff)" }}
      />

      {/* nav */}
      <header
        className={`fixed inset-x-0 top-[3px] z-[70] transition-all duration-500 ${
          solid ? "border-b border-white/10 bg-night/85 py-2 backdrop-blur-md" : "py-4"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-flare font-poster text-sm text-night"
            >
              KD
            </motion.span>
            <span className="font-poster text-lg tracking-[0.14em] text-white">
              KRACKED<span className="text-gold">DEV</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((l) => (
              <button
                key={l.id}
                onClick={() => jump(l.id)}
                className="group relative px-3 py-2 font-mono2 text-[11px] uppercase tracking-[0.22em] text-white/60 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("join-end")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-extrabold text-night transition-colors hover:bg-mint"
          >
            Join free
          </motion.button>
        </div>
      </header>

      <main>
        <Hero onJump={jump} />
        <Marquees />
        <Stack />
        <Wheel onJump={jump} />
        <Crew />
        <Guilds />
        <RouteMap />
        <Signals />
      </main>
      <div id="join-end" />
      <Footer />
    </div>
  );
}
