import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Kampung from "./concepts/Kampung";
import Pasar from "./pasar/Pasar";
import Sandbox from "./concepts/Sandbox";
import Garden from "./concepts/Garden";
import { LangProvider } from "./boilerplate";

type Concept = "A" | "B" | "C" | "D";

const concepts: { id: Concept; tag: string; name: string; note: string }[] = [
  { id: "B", tag: "02", name: "Pasar Malam", note: "kinetic · canvas · playful" },
  { id: "A", tag: "01", name: "Kampung Print", note: "risograph · warm · editorial" },
  { id: "C", tag: "03", name: "Sandbox", note: "tactile sliders · interactive craft" },
  { id: "D", tag: "04", name: "Bunga Club", note: "a living garden · soft kinetic" },
];

export default function App() {
  const [concept, setConcept] = useState<Concept>("D");
  const [peek, setPeek] = useState(false);

  useEffect(() => {
    const bg = concept === "B" ? "#0c1a19" : "#f5eee0";
    document.body.style.background = bg;
    document.documentElement.style.background = bg;
  }, [concept]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select")) return;
      if (e.key === "1") setConcept("A");
      if (e.key === "2") setConcept("B");
      if (e.key === "3") setConcept("C");
      if (e.key === "4") setConcept("D");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const swap = (c: Concept) => {
    if (c === concept) return;
    setConcept(c);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <LangProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={concept}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {concept === "B" ? <Pasar /> : concept === "A" ? <Kampung /> : concept === "C" ? <Sandbox /> : <Garden />}
        </motion.div>
      </AnimatePresence>

      {/* concept switcher */}
      <div
        className="fixed bottom-3 left-1/2 z-[95] max-w-[calc(100vw-16px)] -translate-x-1/2 select-none sm:bottom-4 sm:left-4 sm:translate-x-0"
        onMouseEnter={() => setPeek(true)}
        onMouseLeave={() => setPeek(false)}
      >
        <motion.div
          layout
          className="flex items-stretch gap-0.5 rounded-full border border-white/20 bg-night/90 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-1 sm:pr-3"
        >
          <div className="hidden items-center gap-2 rounded-full px-3 py-1.5 sm:flex">
            <span className="font-mono2 text-[10px] uppercase tracking-[0.22em] text-white/45">concept</span>
          </div>
          {concepts.map((c) => {
            const on = c.id === concept;
            return (
              <button
                key={c.id}
                onClick={() => swap(c.id)}
                className="group relative overflow-hidden rounded-full px-2.5 py-1.5 text-left sm:px-3"
                title={`${c.name} — ${c.note} (press ${c.id === "A" ? 1 : c.id === "B" ? 2 : c.id === "C" ? 3 : 4})`}
              >
                {on && (
                  <motion.span
                    layoutId="concept-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative flex items-center gap-1.5 font-mono2 text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[11px] sm:tracking-[0.14em] ${on ? "text-night" : "text-white/60 group-hover:text-white"}`}>
                  <span className="sm:hidden">{c.tag}</span>
                  <span className="hidden sm:inline">{c.tag} · {c.name}</span>
                </span>
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence>
          {peek && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="mt-2 w-max max-w-[16rem] rounded-2xl border border-white/15 bg-night/90 p-3 backdrop-blur-md"
            >
              <p className="font-mono2 text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                Four creative directions for the community. Playful prototypes to flex and inspire.
                <br />
                <span className="text-gold">Press 1, 2, 3, or 4 to switch.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LangProvider>
  );
}
