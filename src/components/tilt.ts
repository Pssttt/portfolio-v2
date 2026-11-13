import type { MouseEvent } from "react";

const reduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Tilt a card toward the cursor and move its shine. Writes CSS variables only, no re-render. */
export function tilt(e: MouseEvent<HTMLElement>) {
  if (reduced()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
  const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
  el.style.setProperty("--ty", `${((x - 0.5) * 12).toFixed(2)}deg`);
  el.style.setProperty("--tx", `${((0.5 - y) * 12).toFixed(2)}deg`);
  el.style.setProperty("--px", `${(x * 100).toFixed(1)}%`);
  el.style.setProperty("--py", `${(y * 100).toFixed(1)}%`);
  el.style.setProperty("--fx", `${(x * 100).toFixed(1)}%`);
}

export function untilt(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--tx", "0deg");
  e.currentTarget.style.setProperty("--ty", "0deg");
}
