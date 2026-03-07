"use client";

import { motion, Variants, TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";

// ===========================================
// PAGE TRANSITIONS - Smooth between pages
// ===========================================
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] // Using array for custom easing
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.4 }
  }
};

// ===========================================
// STAGGER CHILDREN - For lists and grids
// ===========================================
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// ===========================================
// FADE UP - Content appears as you scroll
// ===========================================
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" // Using string for built-in easing
    }
  }
};

// ===========================================
// FADE IN - Simple opacity fade
// ===========================================
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// ===========================================
// SCALE ON HOVER - Cards and buttons
// ===========================================
export const scaleOnHover = {
  whileHover: { 
    scale: 1.03,
    transition: { duration: 0.2 }
  } as TargetAndTransition,
  whileTap: { 
    scale: 0.98 
  } as TargetAndTransition
};

// ===========================================
// GENTLE PULSE - For attention (subtle)
// ===========================================
export const gentlePulse = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } as TargetAndTransition
};

// ===========================================
// SLIDE IN - From sides
// ===========================================
export const slideInLeft: Variants = {
  hidden: { x: -50, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// ===========================================
// COUNTING NUMBERS - For stats
// ===========================================
export const countAnimation = {
  animate: {
    scale: [1, 1.1, 1],
    transition: { duration: 0.3 }
  } as TargetAndTransition
};

// ===========================================
// PAGE WRAPPER - Use this for each page
// ===========================================
export function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// SECTION WRAPPER - For scroll animations
// ===========================================
export function SectionWrapper({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// ===========================================
// CARD WRAPPER - For product cards
// ===========================================
export function CardWrapper({ children, index = 0 }: { children: ReactNode; index?: number }) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}