"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const baseStyles =
    "relative overflow-hidden rounded-full px-7 py-3 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/50";

  const variantStyles = {
    primary: "bg-apple-blue text-white hover:bg-apple-blue-hover",
    secondary:
      "border border-apple-subtext/30 bg-transparent text-apple-text hover:border-apple-blue/50 hover:bg-apple-blue/10",
    ghost: "bg-transparent text-apple-text hover:text-apple-blue",
  };

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    onClick?.();
  };

  const rippleElements = ripples.map((ripple) => (
    <motion.span
      key={ripple.id}
      initial={{ scale: 0, opacity: 0.5 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pointer-events-none absolute rounded-full bg-white/30"
      style={{
        left: ripple.x,
        top: ripple.y,
        width: 100,
        height: 100,
        marginLeft: -50,
        marginTop: -50,
      }}
    />
  ));

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick}>
        {rippleElements}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} onClick={handleClick}>
      {rippleElements}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
