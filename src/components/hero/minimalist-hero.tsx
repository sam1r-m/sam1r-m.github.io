'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

/**
 * MinimalistHero
 * 
 * Clean, elegant design with:
 * - Restrained motion (subtle fades, slow transitions)
 * - Refined serif/sans typography pairing
 * - Generous whitespace
 * - Minimal color palette
 * - Understated hover effects
 * - Premium, editorial feel
 */

export function MinimalistHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.5 },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center"
    >
      {/* Subtle background line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          variants={prefersReducedMotion ? undefined : lineVariants}
          initial="hidden"
          animate="visible"
          className="w-[1px] h-[60vh] bg-[var(--border)] origin-top"
        />
      </div>

      {/* Content */}
      <motion.div
        style={prefersReducedMotion ? {} : { opacity, y }}
        className="relative z-10 container mx-auto px-4 md:px-6"
      >
        <motion.div
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {/* Small intro */}
          <motion.p
            variants={itemVariants}
            className="text-sm uppercase tracking-[0.3em] text-[var(--fg-muted)] mb-8"
          >
            Software Developer
          </motion.p>

          {/* Main headline - elegant serif */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.15] tracking-tight"
          >
            Crafting thoughtful digital experiences with care and precision.
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="my-12 w-16 h-[1px] bg-[var(--border)]"
          />

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-lg"
          >
            I help companies build products that are both beautiful and functional.
            Currently available for select projects.
          </motion.p>

          {/* Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col sm:flex-row gap-8"
          >
            <NextLink href="/projects" className="group">
              <span className="flex items-center gap-3 text-[var(--fg)]">
                <span className="text-base font-medium">View Projects</span>
                <motion.span
                  className="inline-block"
                  whileHover={prefersReducedMotion ? {} : { x: 3, y: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowDownRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.span>
              </span>
              <span className="block mt-1.5 h-[1px] bg-[var(--fg)] w-0 group-hover:w-full transition-all duration-300" />
            </NextLink>

            <NextLink href="/resume" className="group">
              <span className="flex items-center gap-3 text-[var(--fg)]">
                <span className="text-base font-medium">Resume</span>
                <motion.span
                  className="inline-block"
                  whileHover={prefersReducedMotion ? {} : { x: 3, y: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowDownRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.span>
              </span>
              <span className="block mt-1.5 h-[1px] bg-[var(--fg)] w-0 group-hover:w-full transition-all duration-300" />
            </NextLink>

            <NextLink href="/journal" className="group">
              <span className="flex items-center gap-3 text-[var(--fg)]">
                <span className="text-base font-medium">Substack</span>
                <motion.span
                  className="inline-block"
                  whileHover={prefersReducedMotion ? {} : { x: 3, y: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowDownRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.span>
              </span>
              <span className="block mt-1.5 h-[1px] bg-[var(--fg)] w-0 group-hover:w-full transition-all duration-300" />
            </NextLink>
          </motion.div>

          {/* Availability indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-[var(--fg-muted)]">
              Currently taking on new projects
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
