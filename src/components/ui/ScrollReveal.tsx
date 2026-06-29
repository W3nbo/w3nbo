"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType =
  | "fadeUp"
  | "blurIn"
  | "scaleIn"
  | "slideLeft"
  | "slideRight";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: number;
}

/**
 * Scroll-triggered entrance animation.
 *
 * Design:
 * 1. useLayoutEffect — runs before browser paint, no FOUC
 * 2. gsap.set() — immediately hides the element before first paint
 * 3. Separate paused tween + ScrollTrigger — explicit control, no magic
 * 4. Cleanup kills both, then clears GSAP inline styles
 *
 * This is immune to React Strict Mode double-mount because:
 * - Cleanup clears ALL GSAP state (tween + ST + inline styles)
 * - Remount starts from a pristine element with zero GSAP residue
 */
export function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 1,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return; // let CSS handle everything
    }

    // ── 1. Build initial hidden state ──
    const fromProps: gsap.TweenVars = { opacity: 0 };

    switch (animation) {
      case "fadeUp":
        fromProps.y = 60;
        break;
      case "blurIn":
        fromProps.y = 40;
        fromProps.filter = "blur(12px)";
        break;
      case "scaleIn":
        fromProps.scale = 0.9;
        fromProps.y = 40;
        break;
      case "slideLeft":
        fromProps.x = -80;
        break;
      case "slideRight":
        fromProps.x = 80;
        break;
    }

    // ── 2. Apply hidden state BEFORE paint ──
    gsap.set(el, fromProps);

    // ── 3. Create paused entrance tween ──
    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration,
      delay,
      ease: "power3.out",
      paused: true,
      overwrite: "auto",
    });

    // ── 4. ScrollTrigger drives the tween ──
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none",
      animation: tween,
    });

    // ── 5. Cleanup: kill everything, clear GSAP residue ──
    return () => {
      st.kill();
      tween.kill();
      // Clear ONLY the props GSAP set on this element
      gsap.set(el, {
        clearProps: "opacity,x,y,scale,filter,transform",
      });
    };
  }, [animation, delay, duration]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
