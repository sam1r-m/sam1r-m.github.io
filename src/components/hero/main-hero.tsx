'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

/**
 * MainHero - Redesigned
 * 
 * Cohere/Apple-inspired dark theme with:
 * - Animated gradient orbs in background
 * - Frosted glass elements (glassmorphism)
 * - Gradient text accents
 * - Smooth, elegant animations
 * - Grid pattern overlay
 */

function GradientOrb({ 
  className, 
  delay = 0,
  duration = 20,
}: { 
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    return <div className={cn('absolute rounded-full blur-3xl', className)} />;
  }

  return (
    <motion.div
      className={cn('absolute rounded-full blur-3xl', className)}
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -40, 30, 0],
        scale: [1, 1.2, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl',
        'border border-white/10',
        'rounded-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}

export function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <GradientOrb
          className="w-[600px] h-[600px] -top-40 -left-40 bg-indigo-600/30"
          delay={0}
          duration={25}
        />
        <GradientOrb
          className="w-[500px] h-[500px] top-1/3 -right-20 bg-purple-600/25"
          delay={5}
          duration={30}
        />
        <GradientOrb
          className="w-[400px] h-[400px] -bottom-20 left-1/4 bg-violet-600/20"
          delay={10}
          duration={22}
        />
        <GradientOrb
          className="w-[300px] h-[300px] top-1/2 left-1/2 bg-fuchsia-600/15"
          delay={7}
          duration={28}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, #050505 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={prefersReducedMotion ? {} : { opacity, y }}
        className="relative z-10 container mx-auto px-6 md:px-8"
      >
        <motion.div
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Status badge - frosted glass */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-white/70">Open to opportunities</span>
            </GlassCard>
          </motion.div>

          {/* Main headline with gradient */}
          <motion.h1
            variants={itemVariants}
            className="text-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.1]"
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Samir
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-center text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Computational Math @ UWaterloo.
            <br className="hidden sm:block" />
            Data science, analytics, and building things that work.
          </motion.p>

          {/* CTA Buttons - frosted glass */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <NextLink href="/projects">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className={cn(
                  'group flex items-center gap-2 px-8 py-4',
                  'bg-gradient-to-r from-indigo-500 to-purple-600',
                  'text-white font-medium rounded-xl',
                  'transition-all duration-300',
                  'hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]'
                )}
              >
                View Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </NextLink>
            
            <NextLink href="/resume">
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                className={cn(
                  'px-8 py-4',
                  'bg-white/10 backdrop-blur-md',
                  'text-white font-medium rounded-xl',
                  'border border-white/20',
                  'transition-all duration-300',
                  'hover:bg-white/15 hover:border-white/30'
                )}
              >
                Resume
              </motion.button>
            </NextLink>
          </motion.div>

          {/* Stats row - frosted glass cards */}
          <motion.div
            variants={itemVariants}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'Internships', value: '4' },
              { label: 'Year', value: '4th' },
              { label: 'Certifications', value: '3' },
              { label: 'Projects', value: '10+' },
            ].map((stat) => (
              <GlassCard key={stat.label} className="p-4 text-center">
                <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}
