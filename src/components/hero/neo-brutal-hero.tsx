'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Zap, Star, ArrowRight, Heart } from 'lucide-react';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

/**
 * NeoBrutalHero
 * 
 * Playful, bold design with:
 * - Thick borders and hard offset shadows
 * - Bright accent colors (orange, pink, yellow)
 * - Bouncy spring animations
 * - Sticker-like badges and floating elements
 * - Punchy micro-interactions on hover
 */

function StickerBadge({
  children,
  className,
  rotate = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { scale: 0, rotate: rotate - 20 }}
      animate={{ scale: 1, rotate }}
      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: rotate + 5 }}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2',
        'bg-[var(--secondary)] border-3 border-[var(--border)]',
        'rounded-full font-bold text-sm',
        'shadow-[4px_4px_0px_var(--border)]',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function FloatingShape({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { y: 0 }}
      animate={prefersReducedMotion ? {} : { y: [-10, 10, -10] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
        delay,
      }}
      className={cn(
        'absolute border-3 border-[var(--border)]',
        'shadow-[4px_4px_0px_var(--border)]',
        className
      )}
    />
  );
}

export function NeoBrutalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--bg)]"
    >
      {/* Decorative floating shapes */}
      {!prefersReducedMotion && (
        <>
          <FloatingShape
            className="w-16 h-16 rounded-lg bg-[var(--primary)] top-20 left-[10%] rotate-12"
            delay={0}
          />
          <FloatingShape
            className="w-12 h-12 rounded-full bg-[var(--accent)] top-32 right-[15%] -rotate-6"
            delay={0.5}
          />
          <FloatingShape
            className="w-20 h-20 rounded-lg bg-[var(--secondary)] bottom-32 left-[20%] rotate-45"
            delay={1}
          />
          <FloatingShape
            className="w-10 h-10 rounded-full bg-[var(--primary)] bottom-40 right-[25%]"
            delay={1.5}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        style={prefersReducedMotion ? {} : { y }}
        className="relative z-10 container mx-auto px-4 md:px-6"
      >
        <motion.div
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Floating sticker badges */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-8">
            <StickerBadge rotate={-3}>
              <Zap className="w-4 h-4 text-[var(--primary)]" />
              Available Now
            </StickerBadge>
            <StickerBadge rotate={2} className="bg-[var(--primary)] text-[var(--primary-fg)]">
              <Star className="w-4 h-4" />
              UWaterloo
            </StickerBadge>
            <StickerBadge rotate={-1} className="hidden md:inline-flex bg-[var(--accent)] text-[var(--accent-fg)]">
              <Heart className="w-4 h-4" />
              Open Source Fan
            </StickerBadge>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
          >
            <span className="block">Hey! I&apos;m a</span>
            <span
              className={cn(
                'block mt-2 px-4 py-2 -ml-2',
                'bg-[var(--primary)] text-[var(--primary-fg)]',
                'border-3 border-[var(--border)]',
                'shadow-[6px_6px_0px_var(--border)]',
                'inline-block rotate-[-1deg]'
              )}
            >
              Developer
            </span>
            <span className="block mt-4">who builds cool stuff.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl text-[var(--fg-muted)] max-w-xl font-medium"
          >
            Computational Math @ UWaterloo.
            Data science, analytics, and building cool stuff!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-4"
          >
            <NextLink href="/projects">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { x: -2, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { x: 2, y: 2 }}
                className={cn(
                  'flex items-center gap-2 px-8 py-4',
                  'bg-[var(--primary)] text-[var(--primary-fg)]',
                  'border-3 border-[var(--border)]',
                  'font-bold text-lg',
                  'shadow-[6px_6px_0px_var(--border)]',
                  'hover:shadow-[8px_8px_0px_var(--border)]',
                  'active:shadow-[2px_2px_0px_var(--border)]',
                  'transition-shadow duration-100'
                )}
              >
                See My Work
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </NextLink>
            <NextLink href="/journal">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { x: -2, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { x: 2, y: 2 }}
                className={cn(
                  'flex items-center gap-2 px-8 py-4',
                  'bg-[var(--bg)] text-[var(--fg)]',
                  'border-3 border-[var(--border)]',
                  'font-bold text-lg',
                  'shadow-[6px_6px_0px_var(--border)]',
                  'hover:shadow-[8px_8px_0px_var(--border)]',
                  'active:shadow-[2px_2px_0px_var(--border)]',
                  'transition-shadow duration-100'
                )}
              >
                Read My Blog
              </motion.button>
            </NextLink>
          </motion.div>

          {/* Fun stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap gap-6"
          >
            {[
              { label: 'Year', value: '4th' },
              { label: 'Projects', value: '10+' },
              { label: 'Coffees', value: '∞' },
            ].map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  'px-6 py-4',
                  'bg-[var(--card)] border-3 border-[var(--border)]',
                  'shadow-[4px_4px_0px_var(--border)]'
                )}
              >
                <p className="text-3xl font-extrabold text-[var(--primary)]">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-[var(--fg-muted)] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
