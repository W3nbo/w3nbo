"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2026.05 — 2026.06",
    title: "产品负责人",
    company: "XU 绪 · 智能待办事项软件",
    description:
      "从 0 到 1 主导全流程产品落地。输出 PRD 与 Figma 高保真原型，引入 NLP 自然语言解析能力，借助 AI 编程工具独立完成前后端开发。上线后基于埋点数据迭代，操作步骤减少约 30%，吸引近 500 人次使用。",
  },
  {
    year: "2026.01 — 2026.02",
    title: "数据分析负责人",
    company: "电信客户流失预测项目",
    description:
      "独立主导完整数据分析流程：7043 条数据 21 维 EDA，搭建决策树与神经网络对比实验，引入 SHAP 可解释性分析。最优模型 AUC 达 0.86，输出 5 条流失预警与精准挽留策略。",
  },
  {
    year: "2025.06 — 2025.09",
    title: "调研负责人",
    company: "数聚商圈 · 消费焕新社会实践",
    description:
      "深入商圈一线开展消费者问卷调研，回收有效样本 500+。使用 Excel 完成数据清洗与分析，提炼消费者行为特征与核心诉求，协同团队输出完整调研报告与实施方案。获浙江工商大学程大涛社会实践教育基金三等奖。",
  },
  {
    year: "2024 — 2028",
    title: "市场营销 × 人工智能 双学士学位",
    company: "浙江工商大学",
    description:
      "GPA 3.7/5.0，多次获得综合能力突出奖学金。市场营销专业软科排名 A+，全国第 8，浙江省第 1。",
  },
];

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
