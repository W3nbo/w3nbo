"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "line" | "gradient" | "dots";
}

/**
 * Subtle animated section divider.
 * Serves as a micro-interaction bridge between major content sections.
 *
 * Variants:
 * - "line": thin animated rule expanding from center
 * - "gradient": soft gradient fade with glowing center dot
 * - "dots": row of animated dots appearing sequentially
 */
export function SectionDivider({ variant = "gradient" }: SectionDividerProps) {
  if (variant === "line") {
    return (
      <div className="flex justify-center py-10">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-apple-blue/20 to-transparent origin-center"
        />
      </div>
    );
  }

  if (variant === "dots") {
    const dots = Array.from({ length: 5 });
    return (
      <div className="flex items-center justify-center gap-3 py-10">
        {dots.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.4,
              delay: i * 0.08,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
            className="h-1.5 w-1.5 rounded-full bg-apple-blue/25"
          />
        ))}
      </div>
    );
  }

  // "gradient" — default
  return (
    <div className="flex flex-col items-center gap-2 py-10">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-[1px] w-full max-w-xs bg-gradient-to-r from-transparent via-apple-blue/15 to-transparent origin-center"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="h-1 w-1 rounded-full bg-apple-blue/25"
      />
    </div>
  );
}
