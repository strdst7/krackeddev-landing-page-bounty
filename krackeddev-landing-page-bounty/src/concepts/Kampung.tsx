import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Doors from "../components/Doors";
import Bounties from "../components/Bounties";
import Levels from "../components/Levels";
import Members from "../components/Members";
import Events from "../components/Events";
import Stories from "../components/Stories";
import Faq from "../components/Faq";
import Join from "../components/Join";
import { Sticker, stickerKinds, type StickerKind } from "../components/Art";

type Placed = { id: number; x: number; y: number; kind: StickerKind; rot: number };

export default function Kampung() {
  const [chaos, setChaos] = useState(false);
  const [stickers, setStickers] = useState<Placed[]>([]);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    if (chaos) {
      setHint(true);
      const t = setTimeout(() => setHint(false), 3200);
      return () => clearTimeout(t);
    }
  }, [chaos]);

  const onClick = (e: React.MouseEvent) => {
    if (!chaos) return;
    const target = e.target as HTMLElement;
    if (target.closest("[data-nochaos], a, button, input, select, label")) return;
    setStickers((s) => [
      ...s.slice(-60),
      {
        id: Date.now() + Math.random(),
        x: e.pageX,
        y: e.pageY,
        kind: stickerKinds[Math.floor(Math.random() * stickerKinds.length)],
        rot: Math.random() * 40 - 20,
      },
    ]);
  };

  return (
    <div className={`grain relative min-h-screen ${chaos ? "sticker-cursor" : ""}`} onClick={onClick}>
      <Nav chaos={chaos} setChaos={setChaos} />
      <main>
        <Hero />
        <Ticker />
        <Doors />
        <Bounties />
        <Levels />
        <Members />
        <Events />
        <Stories />
        <Faq />
      </main>
      <Join />

      {/* sticker layer */}
      <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
        <AnimatePresence>
          {stickers.map((s) => (
            <motion.div
              key={s.id}
              initial={{ scale: 2.2, opacity: 0, rotate: s.rot - 30 }}
              animate={{ scale: 1, opacity: 1, rotate: s.rot }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 16 }}
              className="absolute"
              style={{ left: s.x, top: s.y, translateX: "-50%", translateY: "-50%" }}
            >
              <Sticker kind={s.kind} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* chaos controls */}
      <AnimatePresence>
        {chaos && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border-[3px] border-ink bg-paper p-1.5 pl-4 shadow-print"
            data-nochaos
          >
            <span className="text-sm font-bold">{hint ? "Click anywhere to stamp ✦" : `${stickers.length} stickers stamped`}</span>
            <button onClick={() => setStickers([])} className="rounded-full border-2 border-ink px-3 py-1 text-sm font-bold hover:bg-paper-2">
              Clear
            </button>
            <button onClick={() => setChaos(false)} className="rounded-full border-2 border-ink bg-ink px-3 py-1 text-sm font-bold text-paper">
              Done
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
