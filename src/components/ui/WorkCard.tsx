"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface WorkCardProps {
  title: string;
  description: string;
  tags: string[];
  result: string;
  index: number;
}

/**
 * Work card with enhanced 3D tilt — the card follows the cursor
 * like it's being lit by a moving light source. Rotates on X/Y axes
 * with dynamic edge glow shadow that shifts with the tilt direction.
 */
export function WorkCard({ title, description, tags, result, index }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Enhanced tilt range: ±18° for more dramatic 3D effect
    setRotateX(((y - centerY) / centerY) * -18);
    setRotateY(((x - centerX) / centerX) * 18);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
    setIsHovered(false);
  };

  // Dynamic shadow based on tilt direction
  const shadowX = rotateY * -1.5;
  const shadowY = rotateX * 1.5;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000 h-full"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          translateZ: isHovered ? 60 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="preserve-3d relative flex h-full flex-col overflow-hidden rounded-2xl border border-apple-subtext/10 bg-apple-gray p-6 md:p-8"
        style={{
          boxShadow: isHovered
            ? `${shadowX}px ${shadowY}px 40px rgba(41, 151, 255, 0.12), 0 20px 60px -20px rgba(41, 151, 255, 0.18), inset 0 1px 0 rgba(255,255,255,0.03)`
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.02)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* Dynamic glare — follows cursor like a spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(41, 151, 255, 0.18) 0%, rgba(41, 151, 255, 0.06) 30%, transparent 60%)`,
          }}
        />

        {/* Edge glow ring — visible on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at ${glarePosition.x}% ${glarePosition.y}%, rgba(95, 201, 159, 0.12) 0%, transparent 70%)`,
            boxShadow: isHovered
              ? "0 0 30px rgba(41, 151, 255, 0.1), 0 0 60px rgba(41, 151, 255, 0.05)"
              : "none",
          }}
        />

        {/* Top row */}
        <div className="relative z-10 mb-6 flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-apple-subtext/20 px-3 py-1 text-xs text-apple-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-apple-subtext/20 text-apple-muted transition-all duration-300 group-hover:border-apple-blue/50 group-hover:bg-apple-blue/10 group-hover:text-apple-blue">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Content — flex-1 pushes the impact row to bottom */}
        <div className="relative z-10 flex-1">
          <h3 className="mb-3 text-xl font-semibold text-apple-text md:text-2xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-apple-muted md:text-base">
            {description}
          </p>
        </div>

        {/* Impact row — always at bottom */}
        <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-apple-subtext/10 pt-5">
          <span className="text-xs font-medium uppercase tracking-wider text-apple-muted">
            Impact
          </span>
          <span className="text-sm font-medium text-apple-mint">{result}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
