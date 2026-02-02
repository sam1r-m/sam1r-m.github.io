'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

const HERO_TEXT = 'CREATIVE';
const SUBTITLE_WORDS = ['DEVELOPER', 'STUDENT', 'BUILDER'];

// Color palette for background gradient cycling
const GRADIENT_COLORS = [
  { from: '#1a1a2e', to: '#16213e' },
  { from: '#0f0f23', to: '#1a1a3e' },
  { from: '#1e1e3f', to: '#2d2d5a' },
  { from: '#141428', to: '#1f1f3d' },
];

function SplitText({ text, className }: { text: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      y: 100,
      opacity: 0,
      rotateX: -90,
    },
    visible: { 
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={cn('inline-flex overflow-hidden', className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {text.split('').map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span>{words[0]}</span>;
  }

  return (
    <span className="relative inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 flex items-center"
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible">{words[0]}</span>
    </span>
  );
}

function GradientBackground() {
  const [colorIndex, setColorIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % GRADIENT_COLORS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentColors = GRADIENT_COLORS[colorIndex];

  return (
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{
        background: `linear-gradient(135deg, ${currentColors.from} 0%, ${currentColors.to} 100%)`,
      }}
      transition={{ duration: 3, ease: 'easeInOut' }}
    />
  );
}

function FloatingShapes() {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 border border-white/10 rotate-45"
        animate={{ 
          rotate: [45, 90, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white/5"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/5"
        animate={{ 
          y: [-20, 20, -20],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function BrutalistHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <GradientBackground />
      
      {/* Floating geometric shapes */}
      <FloatingShapes />

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="max-w-6xl">
          {/* Small intro text */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-sm md:text-base uppercase tracking-[0.3em] text-white/60 mb-6"
          >
            Full-Stack <RotatingWord words={SUBTITLE_WORDS} />
          </motion.p>

          {/* Main hero text with split animation */}
          <h1 className="font-serif text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.85] tracking-[-0.02em] text-white mb-8">
            <SplitText text={HERO_TEXT} />
          </h1>

          {/* Secondary line */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <h2 className="font-serif text-[8vw] md:text-[6vw] lg:text-[4vw] leading-[0.9] text-white/80 mb-12">
              PORTFOLIO
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="max-w-xl"
          >
            <p className="font-mono text-base md:text-lg text-white/50 leading-relaxed mb-12">
              Computational Math @ UWaterloo. 
              Data science, analytics, and building things that work.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="flex flex-wrap gap-4"
          >
            <NextLink
              href="/projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-sm uppercase tracking-wider overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10">View Work</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </NextLink>
            
            <NextLink
              href="/resume"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-mono text-sm uppercase tracking-wider transition-all hover:bg-white/10 hover:border-white/60"
            >
              Resume
            </NextLink>
          </motion.div>
        </div>
      </div>

      {/* Bottom info bar */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-0 left-0 right-0 border-t border-white/10 py-6"
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap justify-between items-center gap-4 font-mono text-xs uppercase tracking-wider text-white/40">
            <span>Based in Toronto, Canada</span>
            <span>University of Waterloo</span>
            <span className="hidden md:inline">React • Next.js • TypeScript</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll ↓
            </motion.span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
