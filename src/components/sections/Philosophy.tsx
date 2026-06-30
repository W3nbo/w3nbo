"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { pillars } from "@/data";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal animation="blurIn" className="mb-16 md:mb-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-apple-muted">
            Product Philosophy
          </p>
          <blockquote className="max-w-4xl text-2xl font-medium leading-snug tracking-tight text-apple-text md:text-4xl">
            &ldquo;好的产品不是功能更多，而是让用户更快抵达目标。AI 是加速器，不是目的。&rdquo;
          </blockquote>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <ScrollReveal
              key={pillar.title}
              animation={index % 2 === 0 ? "slideLeft" : "slideRight"}
              delay={index * 0.15}
            >
              <div className="group h-full rounded-2xl border border-apple-subtext/10 bg-apple-dark/50 p-8 transition-colors duration-300 hover:border-apple-blue/30 hover:bg-apple-dark">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-apple-blue/30 bg-apple-blue/10 text-apple-blue">
                  0{index + 1}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-apple-text">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-apple-muted md:text-base">
                  {pillar.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
