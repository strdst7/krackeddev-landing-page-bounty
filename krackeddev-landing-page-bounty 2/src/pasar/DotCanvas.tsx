import { useEffect, useRef } from "react";

type Dot = { bx: number; by: number; x: number; y: number; vx: number; vy: number; w: boolean };
type Wave = { x: number; y: number; t: number };

const PALETTE = ["#ffc93c", "#ff5a45", "#ff8fc7", "#7ce0b6", "#6fb7ff"];

export default function DotCanvas({
  word = "KRACKED",
  sub = "DEVS",
  className = "",
}: {
  word?: string;
  sub?: string;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const box = wrap.current;
    if (!cv || !box) return;
    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let waves: Wave[] = [];
    let W = 0;
    let H = 0;
    let dpr = 1;
    let raf = 0;
    let pointer = { x: -9999, y: -9999, active: false };
    const off = document.createElement("canvas");

    const build = () => {
      const r = box.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // sample the wordmark into an offscreen mask
      const step = W < 640 ? 15 : W < 1100 ? 17 : 19;
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.clearRect(0, 0, W, H);
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      const fit = (text: string, maxW: number, start: number) => {
        let size = start;
        octx.font = `400 ${size}px Anton, Archivo, sans-serif`;
        while (octx.measureText(text).width > maxW && size > 12) {
          size -= 2;
          octx.font = `400 ${size}px Anton, Archivo, sans-serif`;
        }
        return size;
      };

      const big = fit(word, W * 0.9, Math.min(H * 0.42, 300));
      octx.font = `400 ${big}px Anton, Archivo, sans-serif`;
      octx.fillText(word, W / 2, H * 0.44);

      const small = Math.max(14, big * 0.19);
      octx.font = `700 ${small}px "Space Mono", monospace`;
      octx.fillText(sub, W / 2, H * 0.44 + big * 0.62);

      const img = octx.getImageData(0, 0, W, H).data;
      dots = [];
      for (let y = step / 2; y < H; y += step) {
        for (let x = step / 2; x < W; x += step) {
          const a = img[(Math.floor(y) * W + Math.floor(x)) * 4 + 3];
          dots.push({ bx: x, by: y, x, y, vx: 0, vy: 0, w: a > 110 });
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, W, H);
      const t = time * 0.001;

      for (const d of dots) {
        // ambient drift
        const wx = Math.sin(t * 0.7 + d.by * 0.012 + d.bx * 0.004) * (d.w ? 1.4 : 3);
        const wy = Math.cos(t * 0.6 + d.bx * 0.011) * (d.w ? 1.4 : 3);
        let tx = d.bx + wx;
        let ty = d.by + wy;

        // pointer repulsion
        let heat = 0;
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const R = 150;
          if (dist < R && dist > 0.01) {
            const f = (1 - dist / R) ** 2;
            heat = f;
            tx += (dx / dist) * f * 78;
            ty += (dy / dist) * f * 78;
          }
        }

        // click shockwaves
        for (const wv of waves) {
          const age = (time - wv.t) / 1000;
          const radius = age * 620;
          const dist = Math.hypot(d.x - wv.x, d.y - wv.y);
          const band = Math.abs(dist - radius);
          if (band < 70 && age < 1.4) {
            const f = (1 - band / 70) * (1 - age / 1.4);
            heat = Math.max(heat, f);
            const nx = (d.x - wv.x) / (dist || 1);
            const ny = (d.y - wv.y) / (dist || 1);
            tx += nx * f * 60;
            ty += ny * f * 60;
          }
        }

        d.vx += (tx - d.x) * 0.16;
        d.vy += (ty - d.y) * 0.16;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;

        if (d.w) {
          const c = PALETTE[(Math.floor(d.bx / 130) + Math.floor(t * 0.5)) % PALETTE.length];
          ctx.fillStyle = heat > 0.05 ? "#ffffff" : c;
          const r = 2.5 + heat * 3.4;
          ctx.globalAlpha = 0.92;
          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#7ce0b6";
          ctx.globalAlpha = 0.1 + heat * 0.5;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.05 + heat * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      waves = waves.filter((w) => (time - w.t) / 1000 < 1.5);
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => (pointer.active = false);
    const onClick = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      waves.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
    };

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(0);
    });
    ro.observe(box);

    const ready = () => {
      build();
      if (reduce) draw(0);
    };
    if (document.fonts?.ready) document.fonts.ready.then(ready);
    else ready();

    if (!reduce) {
      cv.addEventListener("pointermove", onMove, { passive: true });
      cv.addEventListener("pointerleave", onLeave);
      cv.addEventListener("pointerdown", onClick);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("pointerdown", onClick);
    };
  }, [word, sub]);

  return (
    <div ref={wrap} className={className}>
      <canvas ref={canvas} className="block h-full w-full" />
    </div>
  );
}
