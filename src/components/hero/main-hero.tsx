'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui';
import { useTheme, useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

/**
 * MainHero
 * 
 * Modern motion design hero with:
 * - Animated gradient background orbs
 * - Kinetic typography with staggered reveals
 * - Floating UI elements
 * - Smooth scroll-linked parallax
 * - Glossy, polished buttons with hover states
 */
export function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { colorMode } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  const orbVariants: Variants = {
    animate: {
      x: [0, 30, -20, 0],
      y: [0, -30, 20, 0],
      scale: [1, 1.1, 0.95, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated background orbs */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={orbVariants}
            animate="animate"
            className={cn(
              'absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-30',
              colorMode === 'dark' ? 'bg-blue-500' : 'bg-blue-400'
            )}
          />
          <motion.div
            variants={orbVariants}
            animate="animate"
            style={{ animationDelay: '5s' }}
            className={cn(
              'absolute top-1/2 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30',
              colorMode === 'dark' ? 'bg-purple-500' : 'bg-purple-400'
            )}
          />
          <motion.div
            variants={orbVariants}
            animate="animate"
            style={{ animationDelay: '10s' }}
            className={cn(
              'absolute -bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-20',
              colorMode === 'dark' ? 'bg-pink-500' : 'bg-pink-400'
            )}
          />
        </div>
      )}

      {/* Grid background */}
      <div
        className={cn(
          'absolute inset-0 opacity-[0.03]',
          'bg-[linear-gradient(var(--fg)_1px,transparent_1px),linear-gradient(90deg,var(--fg)_1px,transparent_1px)]',
          'bg-[size:60px_60px]'
        )}
      />

      {/* Content */}
      <motion.div
        style={prefersReducedMotion ? {} : { y: springY, opacity }}
        className="relative z-10 container mx-auto px-4 md:px-6"
      >
        <motion.div
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2',
                'bg-[var(--primary)]/10 text-[var(--primary)]',
                'rounded-full text-sm font-medium',
                'border border-[var(--primary)]/20'
              )}
            >
              <Sparkles className="w-4 h-4" />
              Available for work
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className={cn(
              'text-5xl md:text-6xl lg:text-7xl font-bold',
              'tracking-tight leading-[1.1]',
              'bg-gradient-to-br from-[var(--fg)] via-[var(--fg)] to-[var(--fg-muted)]',
              'bg-clip-text text-transparent'
            )}
          >
            Building digital
            <br />
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text">
              experiences
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-[var(--fg-muted)] max-w-2xl mx-auto"
          >
            Full-stack developer passionate about creating beautiful, performant,
            and accessible web applications that make a difference.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <NextLink href="/projects">
              <Button variant="primary" size="lg">
                View Projects
              </Button>
            </NextLink>
            <NextLink href="/resume">
              <Button variant="outline" size="lg">
                Resume
              </Button>
            </NextLink>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as [number, number, number, number] }}
              className="flex flex-col items-center gap-2 text-[var(--fg-muted)]"
            >
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
