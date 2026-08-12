"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * Anima un número entero de 0 al valor final cuando entra en pantalla.
 * `prefix`/`suffix` van fuera de la animación (ej. "+" y "%").
 */
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [isInView, value, duration, count]);

  useEffect(() => rounded.on("change", (v) => setDisplay(v)), [rounded]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
