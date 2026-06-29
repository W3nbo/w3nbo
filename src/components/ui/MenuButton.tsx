"use client";

import { motion } from "framer-motion";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  const lineTransition = { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] };

  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-12 w-12 flex-col items-center justify-center gap-[6px] rounded-full border border-apple-subtext/20 bg-apple-dark/50 backdrop-blur-md transition-colors hover:border-apple-blue/50"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <motion.span
        className="block h-[2px] w-5 bg-apple-text origin-center"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 4 : 0,
        }}
        transition={lineTransition}
      />
      <motion.span
        className="block h-[2px] w-5 bg-apple-text"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={lineTransition}
      />
      <motion.span
        className="block h-[2px] w-5 bg-apple-text origin-center"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -4 : 0,
        }}
        transition={lineTransition}
      />
    </button>
  );
}
