"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        });
      }

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.from(item, {
          opacity: 0,
          x: index % 2 === 0 ? -60 : 60,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 md:mb-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-apple-muted">
            Experience
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-apple-text md:text-5xl">
            每一步，都指向更复杂的问题。
          </h2>
        </div>

        <div className="relative">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-4 top-0 h-full w-[1px] bg-gradient-to-b from-apple-blue/50 via-apple-blue/20 to-transparent md:left-1/2"
          />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, index) => (
              <div
                key={item.year}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className={`relative flex flex-col gap-4 pl-12 md:flex-row md:items-center md:gap-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[11px] top-1 h-3 w-3 rounded-full border-2 border-apple-blue bg-apple-black md:left-1/2 md:-translate-x-1/2" />

                {/* Year */}
                <div className="md:w-1/2 md:text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-apple-muted">
                    {item.year}
                  </p>
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                  <h3 className="text-lg font-semibold text-apple-text">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm text-apple-blue">{item.company}</p>
                  <p className="text-sm leading-relaxed text-apple-muted md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
