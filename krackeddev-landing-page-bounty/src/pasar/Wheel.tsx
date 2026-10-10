import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Dices, RotateCw } from "lucide-react";
import { bounties } from "../data";
import { MaskLines, Reveal } from "./fx";

const picks = bounties.filter((b) => b.status !== "Won");
const n = picks.length;
const seg = 360 / n;
const CX = 260;
const CY = 260;
const R = 228;
const COLORS = ["#ffc93c", "#ff5a45", "#7ce0b6", "#ff8fc7", "#6fb7ff", "#ffe08a", "#ff8a5c", "#9be3c7"];

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 34 }).map((_, i) => ({
        i,
        x: (Math.random() - 0.5) * 620,
        y: -Math.random() * 460 - 60,
        r: Math.random() * 720 - 360,
        c: COLORS[i % COLORS.length],
        d: 0.9 + Math.random() * 0.9,
        w: 6 + Math.random() * 10,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20">
      {bits.map((b) => (
        <motion.span
          key={b.i}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{ x: b.x, y: b.y, opacity: [1, 1, 0], rotate: b.r, scale: 1 }}
          transition={{ duration: b.d, ease: [0.1, 0.7, 0.3, 1] }}
          className="absolute block rounded-[2px]"
          style={{ width: b.w, height: b.w * 0.45, background: b.c }}
        />
      ))}
    </div>
  );
}

export default function Wheel({ onJump }: { onJump: (id: string) => void }) {
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [burst, setBurst] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  const spinTo = (index: number) => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const jitter = (Math.random() - 0.5) * seg * 0.55;
    const desired = ((360 - (index * seg + seg / 2) + jitter) % 360 + 360) % 360;
    const current = ((rot % 360) + 360) % 360;
    setRot(rot + 360 * 4 + ((desired - current + 360) % 360));
  };

  const spinRandom = () => spinTo(Math.floor(Math.random() * n));

  return (
    <section id="wheel" className="relative overflow-hidden bg-butter py-24 text-night lg:py-32">
      <div className="pointer-events-none absolute inset-0 batik opacity-[0.07]" />
      <div className="pointer-events-none absolute -left-24 top-10 font-poster text-[10rem] leading-none stroke-type-dark opacity-[0.06] select-none">
        SPIN
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* ---- the wheel ---- */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <AnimatePresence>{burst > 0 && <Confetti key={burst} />}</AnimatePresence>

          {/* rotating outer type ring */}
          <motion.svg viewBox="0 0 520 520" className="absolute inset-[-9%] h-[118%] w-[118%]" animate={{ rotate: 360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }}>
            <defs>
              <path id="ring" d="M260,260 m-236,0 a236,236 0 1,1 472,0 a236,236 0 1,1 -472,0" />
            </defs>
            <text className="fill-night/55 font-mono2 text-[13px] uppercase" style={{ letterSpacing: "0.34em" }}>
              <textPath href="#ring">pasar malam bounty wheel · spin to win · rm150 – rm3,000 · kd takes 0% · </textPath>
            </text>
          </motion.svg>

          <motion.svg viewBox="0 0 520 520" className="absolute inset-0 h-full w-full drop-shadow-[0_18px_40px_rgba(12,26,25,0.35)]">
            {/* bulbs */}
            {Array.from({ length: 28 }).map((_, i) => {
              const a = -90 + (360 / 28) * i;
              const [x, y] = polar(246, a);
              return (
                <motion.circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={5}
                  fill="#fff6d8"
                  stroke="#0c1a19"
                  strokeWidth={1.5}
                  animate={{ opacity: spinning ? [1, 0.25, 1] : [0.55, 1, 0.55] }}
                  transition={{ duration: spinning ? 0.22 : 1.8, repeat: Infinity, delay: (i % 7) * 0.12 }}
                />
              );
            })}

            <motion.g animate={{ rotate: rot }} transition={{ duration: 4.6, ease: [0.1, 0.62, 0.12, 1] }} onAnimationComplete={() => {
              if (!spinning) return;
              const r = ((rot % 360) + 360) % 360;
              const landed = Math.floor(((360 - r) % 360) / seg) % n;
              setResult(landed);
              setSpinning(false);
              setBurst((b) => b + 1);
            }} style={{ transformOrigin: "260px 260px", transformBox: "view-box" }}>
              {picks.map((b, i) => {
                const a0 = -90 + i * seg;
                const a1 = a0 + seg;
                const [x0, y0] = polar(R, a0);
                const [x1, y1] = polar(R, a1);
                const [tx, ty] = polar(R * 0.63, a0 + seg / 2);
                const c = COLORS[i % COLORS.length];
                return (
                  <g
                    key={b.id}
                    onClick={() => spinTo(i)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    className="cursor-pointer"
                  >
                    <path
                      d={`M${CX},${CY} L${x0},${y0} A${R},${R} 0 0,1 ${x1},${y1} Z`}
                      fill={c}
                      stroke="#0c1a19"
                      strokeWidth={hover === i ? 4 : 2.5}
                      style={{
                        transformBox: "view-box",
                        transformOrigin: `${CX}px ${CY}px`,
                        transform: hover === i ? "scale(1.035)" : "scale(1)",
                        transition: "transform .25s ease",
                      }}
                    />
                    <text x={tx} y={ty - 8} textAnchor="middle" className="fill-night font-poster" style={{ fontSize: 26 }} transform={`rotate(${a0 + seg / 2 + 90} ${tx} ${ty - 8})`}>
                      RM{b.reward}
                    </text>
                    <text x={tx} y={ty + 14} textAnchor="middle" className="fill-night/65 font-mono2" style={{ fontSize: 10.5, letterSpacing: "0.12em" }} transform={`rotate(${a0 + seg / 2 + 90} ${tx} ${ty + 14})`}>
                      {b.guild.toUpperCase()} · {b.days}D
                    </text>
                  </g>
                );
              })}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#0c1a19" strokeWidth={3} />
            </motion.g>

            {/* hub */}
            <circle cx={CX} cy={CY} r={72} fill="#0c1a19" stroke="#ffc93c" strokeWidth={3} />
            <motion.g animate={{ scale: spinning ? 0.94 : 1 }} style={{ transformOrigin: "260px 260px", transformBox: "view-box" }}>
              <text x={CX} y={CY - 6} textAnchor="middle" className="fill-butter font-poster" style={{ fontSize: 27, letterSpacing: "0.04em" }}>
                {spinning ? "..." : "SPIN"}
              </text>
              <text x={CX} y={CY + 18} textAnchor="middle" className="fill-white/45 font-mono2" style={{ fontSize: 9.5, letterSpacing: "0.22em" }}>
                TAP ANY SLICE
              </text>
            </motion.g>
          </motion.svg>

          {/* pointer */}
          <motion.div
            className="absolute left-1/2 top-[-14px] z-10 -translate-x-1/2"
            animate={{ rotate: spinning ? [0, -14, 10, -8, 0] : 0 }}
            transition={{ duration: spinning ? 0.34 : 0.4, repeat: spinning ? Infinity : 0 }}
          >
            <svg width="34" height="40" viewBox="0 0 34 40">
              <path d="M17 39 L2 6 A16 16 0 0 1 32 6 Z" fill="#ff5a45" stroke="#0c1a19" strokeWidth="3" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* ---- copy + result ---- */}
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-night/60">the fun bit</p>
          <MaskLines
            lines={["CAN'T PICK A", "BOUNTY? LET THE", <span key="w" className="text-flare">WHEEL DECIDE.</span>]}
            className="mt-3 font-poster text-5xl leading-[0.92] tracking-wide sm:text-7xl"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-night/70">
              Eight live briefs, one spin. Land on a slice and it's yours to attempt — or tap any slice to skip the
              theatrics. Either way you bank <strong>+20 XP</strong> just for submitting.
            </p>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={spinRandom}
              disabled={spinning}
              className="flex items-center gap-2 rounded-full bg-night px-7 py-4 font-extrabold text-butter transition disabled:opacity-50"
            >
              {spinning ? <RotateCw className="h-4 w-4 animate-spin" /> : <Dices className="h-4 w-4" />}
              {spinning ? "Spinning…" : "Spin the wheel"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onJump("stack")}
              className="flex items-center gap-2 rounded-full border-2 border-night px-7 py-4 font-bold text-night transition hover:bg-night hover:text-butter"
            >
              Browse all <ArrowUpRight className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="mt-8 min-h-[190px]">
            <AnimatePresence mode="wait">
              {result !== null ? (
                <motion.div
                  key={result}
                  initial={{ opacity: 0, y: 26, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="relative overflow-hidden rounded-[26px] border-[3px] border-night bg-night p-6 text-white"
                >
                  <div className="pointer-events-none absolute inset-0 shine opacity-20" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-mint">
                        landed on · {picks[result].sponsor}
                      </div>
                      <h3 className="mt-2 font-poster text-3xl leading-tight tracking-wide">{picks[result].title}</h3>
                      <p className="mt-2 max-w-md text-sm text-white/60">{picks[result].brief}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-poster text-4xl leading-none" style={{ color: COLORS[result % COLORS.length] }}>
                        RM{picks[result].reward}
                      </div>
                      <div className="mt-1 font-mono2 text-[11px] text-white/45">
                        +{100 + Math.round(picks[result].reward / 10)} XP
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {picks[result].tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/20 px-3 py-1 font-mono2 text-[11px] text-white/70">
                        {t}
                      </span>
                    ))}
                    <button
                      onClick={() => onJump("join")}
                      className="ml-auto rounded-full bg-flare px-4 py-1.5 text-sm font-extrabold text-night transition hover:bg-gold"
                    >
                      I'll take it →
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-[26px] border-2 border-dashed border-night/30 p-6 text-center"
                >
                  <div className="font-poster text-2xl tracking-wide text-night/45">
                    {spinning ? "WHEEL IS TURNING…" : "NO SLICE PICKED YET"}
                  </div>
                  <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.2em] text-night/40">
                    {n} live bounties in play
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
