"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Typewriter } from "@/components/ui/Typewriter";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GridBackground } from "@/components/ui/GridBackground";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32"
    >
      {/* Flowing grid overlay — subtle tech atmosphere */}
      <GridBackground />

      {/* Subtle radial vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-radial from-transparent via-apple-black/30 to-apple-black/80" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-apple-muted"
        >
          AI Product Creator
        </motion.div>

        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-apple-text md:text-6xl lg:text-7xl">
          <AnimatedText text="Hi, I'm W3nbo Xu" delay={0.4} />
        </h1>

        <div className="mb-8 h-8 text-lg text-apple-blue md:text-xl">
          &lt;
          <Typewriter
            phrases={[
              "AI Product Creator",
              "Data-Driven Thinker",
              "Full-Stack Builder",
              "Problem Solver",
            ]}
          />
          /&gt;
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-apple-muted md:text-lg"
        >
          市场营销 × 人工智能双学科背景。擅长从用户洞察到产品落地的全链路实践，
          <br />
          借助 AI 工具高效推动 MVP 验证，将复杂技术转化为直观体验。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#works" variant="primary">
            查看作品
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            联系我
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-apple-subtext/30 p-1"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-apple-muted"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
