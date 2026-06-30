"use client";

import { useEffect, useRef } from "react";

/**
 * A subtle flowing grid background rendered on canvas.
 * Designed to overlay the hero section with very low opacity,
 * creating a tech-forward atmosphere without being distracting.
 * Pauses animation when off-screen via IntersectionObserver.
 */
export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    const cellSize = 64;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    let offset = 0;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!prefersReducedMotion) {
        time += 0.003;
        offset = (offset + 0.15) % cellSize;
      }

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;

      // Draw subtle vertical lines with wave
      ctx.strokeStyle = "rgba(41, 151, 255, 0.035)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i <= cols; i++) {
        const x = i * cellSize - (offset % cellSize);
        ctx.beginPath();

        for (let j = 0; j <= rows; j++) {
          const y = j * cellSize;
          // Subtle wave distortion on vertical lines
          const waveX = x + Math.sin(y * 0.02 + time) * 3;
          if (j === 0) {
            ctx.moveTo(waveX, y);
          } else {
            ctx.lineTo(waveX, y);
          }
        }
        ctx.stroke();
      }

      // Draw subtle horizontal lines (slightly more visible for grid feel)
      ctx.strokeStyle = "rgba(41, 151, 255, 0.025)";
      for (let j = 0; j <= rows; j++) {
        const y = j * cellSize - (offset % cellSize);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Occasional brighter intersection dots for depth
      for (let i = 1; i < cols; i++) {
        for (let j = 1; j < rows; j++) {
          const x = i * cellSize - (offset % cellSize);
          const y = j * cellSize - (offset % cellSize);
          // Only draw some intersections (sparse)
          if ((i + j) % 5 === 0) {
            const pulse = Math.sin(time * 2 + i * 0.5 + j * 0.5) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(41, 151, 255, ${0.06 * pulse})`;
            ctx.fill();
          }
        }
      }
    };

    const animate = () => {
      if (isVisibleRef.current) {
        draw();
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Pause animation when canvas is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      setSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
