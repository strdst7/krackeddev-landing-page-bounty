import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { MaskLines } from "./fx";

const cities = [
  { name: "Kangar", state: "Perlis", x: 292, y: 62, members: 34 },
  { name: "Georgetown", state: "Penang", x: 268, y: 112, members: 186 },
  { name: "Ipoh", state: "Perak", x: 300, y: 186, members: 121 },
  { name: "Kuala Lumpur", state: "WL", x: 322, y: 248, members: 612 },
  { name: "Melaka", state: "Melaka", x: 338, y: 306, members: 88 },
  { name: "Johor Bahru", state: "Johor", x: 362, y: 372, members: 143 },
  { name: "Kuantan", state: "Pahang", x: 418, y: 268, members: 67 },
  { name: "Kuching", state: "Sarawak", x: 556, y: 356, members: 94 },
  { name: "Kota Kinabalu", state: "Sabah", x: 700, y: 214, members: 76 },
];

const route = `M ${cities[0].x} ${cities[0].y} ` + cities
  .slice(1)
  .map((c, i) => {
    const p = cities[i];
    const mx = (p.x + c.x) / 2 + (i % 2 ? 34 : -34);
    const my = (p.y + c.y) / 2;
    return `Q ${mx} ${my} ${c.x} ${c.y}`;
  })
  .join(" ");

export default function RouteMap() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mx = useMotionValue(cities[0].x);
  const my = useMotionValue(cities[0].y);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const draw = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);
  const [lit, setLit] = useState(0);

  useMotionValueEvent(draw, "change", (v) => {
    const next = Math.max(0, Math.min(cities.length - 1, Math.floor(v * cities.length)));
    setLit((prev) => (prev === next ? prev : next));
    const p = pathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    const pt = p.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    mx.set(pt.x);
    my.set(pt.y);
  });

  return (
    <section className="relative overflow-hidden bg-night-2 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 batik text-mint/10" />
      <div ref={ref} className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-mint">dari perlis sampai sabah</p>
          <MaskLines
            lines={["13 STATES.", <span key="1" className="text-gold">ONE GROUP</span>, "CHAT."]}
            className="mt-3 font-poster text-5xl leading-[0.92] tracking-wide text-white sm:text-7xl"
          />
          <p className="mt-6 max-w-md text-lg text-white/60">
            Members from every state and both coasts. Scroll to trace the route — each stop is a real chapter of the
            kampung, with its own meetups and guild regulars.
          </p>

          <div className="mt-8 space-y-2">
            {cities.map((c, i) => (
              <motion.div
                key={c.name}
                animate={{ opacity: i <= lit ? 1 : 0.28, x: i <= lit ? 0 : -8 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 font-mono2 text-xs uppercase tracking-widest"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i <= lit ? "bg-gold" : "bg-white/30"}`} />
                <span className={i <= lit ? "text-white" : "text-white/40"}>{c.name}</span>
                <span className="text-white/30">{c.state}</span>
                <span className="ml-auto tabnum text-mint">{c.members}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <svg viewBox="180 20 620 420" className="w-full">
            {/* stylised landmasses */}
            <g fill="rgba(124,224,182,0.10)" stroke="rgba(124,224,182,0.35)" strokeWidth="1.5">
              <path d="M282 40 C 246 74, 250 120, 272 150 C 292 176, 288 206, 300 236 C 312 268, 300 300, 320 336 C 336 366, 340 400, 362 402 C 386 404, 392 366, 386 330 C 380 296, 400 272, 404 240 C 408 206, 386 178, 372 146 C 358 114, 344 62, 320 44 C 306 34, 294 30, 282 40 Z" />
              <path d="M500 300 C 520 262, 566 250, 604 258 C 646 266, 660 232, 700 206 C 736 182, 780 196, 786 226 C 792 258, 752 268, 740 296 C 728 324, 700 336, 664 344 C 620 354, 586 386, 552 382 C 516 378, 486 332, 500 300 Z" />
            </g>

            <path ref={pathRef} d={route} fill="none" stroke="#ffc93c" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 8" pathLength={1} style={{ strokeDashoffset: 0 }} />
            <motion.path d={route} fill="none" stroke="#ff5a45" strokeWidth="4.5" strokeLinecap="round" style={{ pathLength: draw }} />

            {cities.map((c, i) => {
              const on = i <= lit;
              return (
                <g key={c.name}>
                  {on && <motion.circle cx={c.x} cy={c.y} r="10" fill="#ffc93c" opacity="0.35" initial={{ scale: 0.4, opacity: 0.5 }} animate={{ scale: [0.6, 1.9], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }} />}
                  <motion.circle
                    cx={c.x}
                    cy={c.y}
                    r={i === lit ? 8 : 5.5}
                    fill={on ? "#ffc93c" : "rgba(255,255,255,0.25)"}
                    stroke="#0c1a19"
                    strokeWidth="2"
                    animate={{ scale: on ? 1 : 0.7 }}
                    transition={{ type: "spring", stiffness: 300, damping: 16 }}
                    style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  />
                  <motion.text
                    x={c.x + 14}
                    y={c.y + 4}
                    className="font-mono2"
                    style={{ fontSize: 11, letterSpacing: "0.08em" }}
                    fill={on ? "#f4f1e8" : "rgba(244,241,232,0.3)"}
                  >
                    {c.name.toUpperCase()}
                  </motion.text>
                </g>
              );
            })}

            {/* travelling marker */}
            <motion.g style={{ x: mx, y: my }}>
              <circle r="16" fill="rgba(255,90,69,0.25)" />
              <circle r="7" fill="#ff5a45" stroke="#0c1a19" strokeWidth="2" />
            </motion.g>
          </svg>
          <div className="absolute bottom-2 right-2 font-mono2 text-[10px] uppercase tracking-[0.3em] text-white/30">
            stylised map · not to scale
          </div>
        </div>
      </div>
    </section>
  );
}


