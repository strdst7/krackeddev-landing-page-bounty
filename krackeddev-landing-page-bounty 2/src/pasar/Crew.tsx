import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Hand } from "lucide-react";
import { members } from "../data";
import { MaskLines, Scramble, Tilt } from "./fx";

const GUILD_COLOR: Record<string, string> = {
  Web: "#ffc93c",
  AI: "#ff8fc7",
  Design: "#7ce0b6",
  Mobile: "#6fb7ff",
  Data: "#ffe08a",
  Hardware: "#ff8a5c",
};

export default function Crew() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [hai, setHai] = useState<string[]>([]);
  const [grabbing, setGrabbing] = useState(false);

  const nudge = (dir: number) => rail.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!drag.current.down || !rail.current) return;
      const dx = e.clientX - drag.current.x;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      rail.current.scrollLeft = drag.current.left - dx;
    };
    const up = () => {
      drag.current.down = false;
      setGrabbing(false);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    if (!rail.current) return;
    drag.current = { down: true, x: e.clientX, left: rail.current.scrollLeft, moved: false };
    setGrabbing(true);
  };

  const sayHai = (handle: string) => {
    if (drag.current.moved) return;
    setHai((h) => (h.includes(handle) ? h : [...h, handle]));
  };

  return (
    <section id="crew" className="relative overflow-hidden bg-flare py-24 text-night lg:py-28">
      <div className="pointer-events-none absolute inset-0 batik opacity-[0.08]" />
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #ffc93c 0, transparent 45%)", backgroundSize: "200% 200%" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono2 text-xs uppercase tracking-[0.35em] text-night/60">
              <Scramble text="the people behind the ships" />
            </p>
            <MaskLines
              lines={["1,500 BUILDERS.", "DRAG TO MEET THEM."]}
              className="mt-3 font-poster text-5xl leading-[0.92] tracking-wide sm:text-7xl"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.22em] text-night/60 sm:flex">
              <Hand className="h-4 w-4" /> drag the rail
            </span>
            <button
              onClick={() => nudge(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-night transition hover:bg-night hover:text-flare"
              aria-label="Scroll crew left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => nudge(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-night transition hover:bg-night hover:text-flare"
              aria-label="Scroll crew right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        onPointerDown={onDown}
        className={`rail relative mt-12 flex select-none snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] ${
          grabbing ? "snap-none" : ""
        }`}
        style={{ touchAction: "pan-y" }}
        data-cursor="drag"
      >
        {members.map((m, i) => {
          const c = GUILD_COLOR[m.guild] ?? "#ffc93c";
          const said = hai.includes(m.handle);
          return (
            <motion.div
              key={m.handle}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: (i % 4) * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-[268px] shrink-0 snap-start sm:w-[300px]"
            >
              <Tilt className="h-full" max={9}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border-2 border-night bg-night p-6 text-white">
                  <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                    style={{ background: c }}
                  />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <div className="relative flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
                    <motion.span
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/15 text-3xl"
                      style={{ background: m.bg }}
                    >
                      {m.emoji}
                    </motion.span>
                    <span className="rounded-full px-2.5 py-1 font-mono2 text-[10px] uppercase tracking-[0.18em] text-night" style={{ background: c }}>
                      {m.guild}
                    </span>
                  </div>

                  <div className="relative mt-5" style={{ transform: "translateZ(20px)" }}>
                    <h3 className="font-poster text-2xl leading-tight tracking-wide">{m.name}</h3>
                    <div className="font-mono2 text-[11px] uppercase tracking-widest text-white/40">
                      @{m.handle} · {m.city}
                    </div>
                  </div>

                  <div className="relative mt-5">
                    <div className="flex items-baseline justify-between font-mono2 text-[10px] uppercase tracking-widest text-white/45">
                      <span>latest ship</span>
                      <span className="tabnum" style={{ color: c }}>
                        {m.xp.toLocaleString()} xp
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-snug text-white/75">{m.shipped}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: c }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, (m.xp / 9000) * 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => sayHai(m.handle)}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="relative mt-6 w-full rounded-full border-2 py-2.5 text-sm font-extrabold transition-colors"
                    style={{ borderColor: c, background: said ? c : "transparent", color: said ? "#0c1a19" : c }}
                  >
                    {said ? "✦ hai back to you" : "say hai 👋"}
                  </button>
                </div>
              </Tilt>
            </motion.div>
          );
        })}

        <div className="flex w-[268px] shrink-0 snap-start items-center justify-center sm:w-[300px]">
          <div className="rounded-[26px] border-2 border-dashed border-night/45 p-8 text-center">
            <div className="font-poster text-3xl leading-tight tracking-wide">YOU?</div>
            <p className="mt-2 font-mono2 text-[11px] uppercase leading-relaxed tracking-widest text-night/60">
              this card is empty.
              <br />
              fill it in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
