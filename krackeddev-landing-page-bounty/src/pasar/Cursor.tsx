import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 34, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 500, damping: 34, mass: 0.4 });
  const tx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.8 });
  const ty = useSpring(y, { stiffness: 120, damping: 20, mass: 0.8 });
  const [state, setState] = useState<"idle" | "link" | "down" | "hidden">("hidden");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setState("idle");
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, input, select, [data-cursor]");
      setState(interactive ? "link" : "idle");
    };
    const down = () => setState("down");
    const up = () => setState("idle");
    const leave = () => setState("hidden");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = state === "link" ? 58 : state === "down" ? 26 : 34;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-butter/80 mix-blend-difference"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, opacity: state === "hidden" ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 rounded-full bg-flare"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: state === "hidden" ? 0 : 1, scale: state === "down" ? 2.4 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[89] h-64 w-64 rounded-full opacity-40 blur-3xl"
        style={{
          x: tx,
          y: ty,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,201,60,0.5), rgba(255,90,69,0.18) 45%, transparent 70%)",
        }}
      />
    </>
  );
}
