"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  value: number;
  description: string;
}

const skills: Skill[] = [
  { name: "用户研究", value: 95, description: "同理心地图、用户访谈" },
  { name: "数据分析", value: 90, description: "SQL、漏斗、归因模型" },
  { name: "增长策略", value: 88, description: "AARRR、病毒系数" },
  { name: "A/B 测试", value: 92, description: "实验设计、统计显著" },
  { name: "原型设计", value: 85, description: "Figma、快速验证" },
  { name: "跨团队协作", value: 94, description: "工程、设计、业务对齐" },
];

export function SkillConstellation() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Center quote */}
      <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.p
          key={hovered !== null ? hovered : "default"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-sm font-medium text-apple-text md:text-base"
        >
          {hovered !== null
            ? skills[hovered].description
            : "我不只是设计功能，我设计用户成功的最短路径。"}
        </motion.p>
      </div>

      {/* Orbiting skills */}
      <div className="relative flex aspect-square items-center justify-center">
        {skills.map((skill, index) => {
          const total = skills.length;
          const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
          const radiusPercent = 38;
          const x = Math.cos(angle) * radiusPercent;
          const y = Math.sin(angle) * radiusPercent;
          const size = skill.value / 5;

          return (
            <motion.div
              key={skill.name}
              className="absolute flex cursor-pointer flex-col items-center justify-center"
              style={{
                left: `${50 + x}%`,
                top: `${50 + y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 120,
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: hovered === index ? 1.15 : 1,
                }}
                transition={{
                  y: {
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  scale: { type: "spring", stiffness: 200, damping: 15 },
                }}
                className="relative flex items-center justify-center rounded-full border border-apple-blue/30 bg-apple-dark/80 shadow-[0_0_20px_rgba(41,151,255,0.15)] backdrop-blur-sm"
                style={{
                  width: `${size * 3}px`,
                  height: `${size * 3}px`,
                  minWidth: "80px",
                  minHeight: "80px",
                }}
              >
                <span className="text-lg font-semibold text-apple-text">
                  {skill.value}
                </span>
                <span className="absolute -bottom-5 whitespace-nowrap text-xs text-apple-muted">
                  {skill.name}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Decorative rings */}
        <div className="pointer-events-none absolute inset-0 rounded-full border border-apple-subtext/5" />
        <div className="pointer-events-none absolute inset-[15%] rounded-full border border-apple-blue/5" />
        <div className="pointer-events-none absolute inset-[30%] rounded-full border border-apple-subtext/5" />
      </div>
    </div>
  );
}
