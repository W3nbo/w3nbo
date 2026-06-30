"use client";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WorkCard } from "@/components/ui/WorkCard";
import { works } from "@/data";

export function Works() {
  return (
    <section id="works" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal animation="fadeUp" className="mb-16 md:mb-24">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-apple-muted">
            Selected Works
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-apple-text md:text-5xl">
            把假设，变成可验证的产品。
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <WorkCard key={work.title} {...work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
