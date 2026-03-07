"use client";

import { motion, Variants, TargetAndTransition } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

// ===========================================
// PAGE TRANSITIONS - Smooth between pages
// ===========================================
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
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
    y: 20 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// ===========================================
// SLIDE IN - From sides
// ===========================================
export const slideInLeft: Variants = {
  hidden: { x: -30, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const slideInRight: Variants = {
  hidden: { x: 30, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// ===========================================
// PAGE WRAPPER - Use this for each page
// ===========================================
export function PageWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.05 }
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}