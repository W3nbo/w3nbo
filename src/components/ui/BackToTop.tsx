"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";

/**
 * Back-to-top button with spring physics via Lenis.
 * Springs into view with a bouncy animation and scrolls
 * to top using a custom spring-like easing curve.
 */
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      // Spring-like easing: fast start with gentle deceleration + subtle overshoot
      lenis.scrollTo(0, {
        duration: 1.8,
        easing: (t: number) => {
          // Custom spring curve: exponential decay with subtle bounce
          const c4 = (2 * Math.PI) / 3;
          return t === 1
            ? 1
            : 1 - Math.pow(2, -10 * t) * Math.sin((t - 0.04) * c4) + 1;
        },
      });
    } else {
      // Fallback for reduced-motion or before Lenis initializes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 12,
            mass: 0.8,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-apple-subtext/20 bg-apple-dark/80 text-apple-text shadow-lg shadow-apple-blue/10 backdrop-blur-md transition-colors hover:border-apple-blue/50 hover:text-apple-blue"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
