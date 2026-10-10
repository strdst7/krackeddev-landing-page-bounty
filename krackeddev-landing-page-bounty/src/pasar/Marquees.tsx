import { motion } from "framer-motion";

const rows = [
  {
    bg: "bg-gold",
    fg: "text-night",
    rot: -2.2,
    dur: 34,
    dir: 1,
    items: ["POST A BOUNTY", "0% COMMISSION", "SHIP IT", "GUILD WARS", "RM150 – RM3,000", "BUILD IN PUBLIC", "XP FOR SHIPPING"],
    sep: "✿",
  },
  {
    bg: "bg-night-2",
    fg: "text-mint",
    rot: 1.6,
    dur: 46,
    dir: -1,
    items: ["BELAJAR", "BINA", " UNTUNG", "BERSAMA", "LEARN", "BUILD", "EARN", "TOGETHER"],
    sep: "◆",
  },
  {
    bg: "bg-flare",
    fg: "text-night",
    rot: -1.1,
    dur: 28,
    dir: 1,
    items: ["MONSOON HACK '26", "TEH TARIK & SHIP", "DESIGN CRIT NIGHT", "VIBE CODING 101", "KD SQUARE"],
    sep: "✦",
  },
];

export default function Marquees() {
  return (
    <section className="relative z-20 -mt-2 space-y-3 overflow-hidden bg-night py-10 sm:py-14">
      {rows.map((r, i) => (
        <div
          key={i}
          className="marquee-pause relative overflow-hidden border-y-2 border-night py-3"
          style={{ transform: `rotate(${r.rot}deg) scaleX(1.06)`, background: i === 1 ? "#122926" : undefined }}
        >
          <div className={`${r.bg} ${r.fg} py-2`}>
            <motion.div
              className="marquee-track items-center gap-6 whitespace-nowrap"
              animate={{ x: r.dir === 1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: r.dur, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center gap-6 pr-6">
                  {r.items.map((t) => (
                    <span key={t} className="flex items-center gap-6 font-poster text-2xl tracking-wide sm:text-4xl">
                      {t}
                      <span className="text-base opacity-60">{r.sep}</span>
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
