import { useEffect, useRef } from "react";

/**
 * KdMark — a living recreation of the KrackedDevs block monogram.
 * The letterforms are built from a coarse cell grid (chunky bars, stepped
 * corners, a square counter in the D), drawn on canvas so the mark can:
 *   - assemble itself in a diagonal wave when it scrolls into view
 *   - glitch between two "frames" of tiny register squares, forever
 */

const COLS = 62;
const ROWS = 33;

type Cell = { r: number; c: number };

function buildCells(): Cell[] {
  const set = new Set<string>();
  const fill = (r0: number, r1: number, c0: number, c1: number) => {
    for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) set.add(`${r},${c}`);
  };

  // ---- K ----
  fill(0, 31, 2, 7); // stem
  for (let i = 0; i < 8; i++) fill(14 - 2 * i, 15 - 2 * i, 8 + 2 * i, 13 + 2 * i); // upper arm
  for (let i = 0; i < 8; i++) fill(16 + 2 * i, 17 + 2 * i, 8 + 2 * i, 13 + 2 * i); // lower arm
  set.delete("15,8"); // junction notch

  // ---- D ----
  fill(0, 31, 34, 39); // stem
  fill(0, 1, 40, 50); // top bar
  fill(2, 3, 40, 53);
  fill(4, 5, 40, 58);
  fill(6, 26, 54, 58); // right bar
  fill(27, 27, 40, 58); // bottom bar
  fill(28, 28, 40, 56);
  fill(29, 29, 40, 53);
  fill(30, 31, 40, 50);
  fill(32, 32, 34, 48); // base extension
  for (let r = 10; r <= 19; r++) for (let c = 43; c <= 50; c++) set.delete(`${r},${c}`); // counter
  set.delete("15,57"); // right-edge notch
  set.delete("15,58");

  return [...set].map((k) => {
    const [r, c] = k.split(",").map(Number);
    return { r, c };
  });
}

const CELLS = buildCells();

const easeOutBack = (x: number) => {
  const c = 1.35;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};

export default function KdMark({
  className = "",
  ink = "#101010",
  grid = "rgba(255,255,255,0.07)",
  detailA = "rgba(255,255,255,0.85)",
  detailB = "rgba(255,255,255,0.45)",
  delay = 0,
}: {
  className?: string;
  ink?: string;
  grid?: string;
  detailA?: string;
  detailB?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let inView = false;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (inView = e.isIntersecting)),
      { threshold: 0.12 }
    );
    io.observe(canvas);

    let raf = 0;
    let start = -1;

    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (w > 0 && h > 0) {
        if (start < 0 && inView) start = now + delay;
        const t = start < 0 ? -1 : (now - start) / 1000;
        const frame = Math.floor(Math.max(0, now - (start < 0 ? 0 : start)) / 480) % 2;
        const cw = w / COLS;
        const ch = h / ROWS;
        const size = Math.min(cw, ch) * 0.995;
        const lineW = Math.max(0.5, size * 0.022);

        for (const { r, c } of CELLS) {
          const local = t < 0 ? 0 : Math.min(1, Math.max(0, (t * 1000 - (c * 14 + r * 9)) / 320));
          if (local <= 0) continue;
          const s = easeOutBack(local);
          const w0 = size * s;
          const x = c * cw + (cw - w0) / 2;
          const y = r * ch + (ch - w0) / 2;

          ctx.fillStyle = ink;
          ctx.fillRect(x, y, w0, w0);

          ctx.strokeStyle = grid;
          ctx.lineWidth = lineW;
          ctx.strokeRect(x + lineW / 2, y + lineW / 2, Math.max(0, w0 - lineW), Math.max(0, w0 - lineW));

          const v = (c * 7 + r * 13) % 11;
          const on = frame === 0 ? v === 0 : v === 6;
          if (on && local > 0.92) {
            const qs = size * 0.3;
            ctx.fillStyle = frame === 0 ? detailA : detailB;
            ctx.fillRect(c * cw + (cw - qs) / 2, r * ch + (ch - qs) / 2, qs, qs);
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [ink, grid, detailA, detailB, delay]);

  return <canvas ref={ref} className={className} role="img" aria-label="KrackedDevs KD monogram" />;
}
