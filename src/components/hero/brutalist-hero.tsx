'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

/**
 * BrutalistHero
 * 
 * Raw, print-inspired design with:
 * - IBM Plex Mono + Libre Baskerville typography pairing
 * - Kinetic typography with type-shift effects
 * - Scrolling marquee
 * - High contrast, intentional stark aesthetic
 * - No shadows, sharp corners, binary color transitions
 * - Harsh, immediate hover states (no smooth transitions)
 */

const words = ['DEVELOPER', 'DESIGNER', 'CREATOR', 'BUILDER'];

function TypeShift({ words }: { words: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span>{words[0]}</span>;
  }

  return (
    <span className="relative inline-block overflow-hidden">
      {words.map((word, index) => (
        <motion.span
          key={word}
          className="absolute inset-0"
          initial={false}
          animate={{
            y: index === currentIndex ? 0 : index < currentIndex ? '-100%' : '100%',
            opacity: index === currentIndex ? 1 : 0,
          }}
          transition={{ duration: 0.1 }}
        >
          {word}
        </motion.span>
      ))}
      <span className="invisible">{words[0]}</span>
    </span>
  );
}

function Marquee({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="overflow-hidden border-y-2 border-[var(--border)] bg-[var(--fg)] text-[var(--bg)]">
      <div
        className={cn(
          'flex whitespace-nowrap py-3',
          !prefersReducedMotion && 'animate-marquee'
        )}
      >
        {/* Duplicate content for seamless loop */}
        <span className="flex items-center gap-8 px-4">{children}</span>
        <span className="flex items-center gap-8 px-4" aria-hidden>{children}</span>
      </div>
    </div>
  );
}

export function BrutalistHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0 } },
  };

  return (
    <div ref={containerRef} className="min-h-[90vh] flex flex-col">
      {/* Top marquee */}
      <Marquee>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="font-mono text-sm uppercase tracking-widest">
            AVAILABLE FOR WORK • OPEN TO OPPORTUNITIES • HIRE ME •
          </span>
        ))}
      </Marquee>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="container mx-auto px-4 md:px-6 py-12">
          {/* Grid layout */}
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            {/* Left column - main headline */}
            <div className="col-span-12 lg:col-span-8">
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0 }}
              >
                {/* Small label */}
                <p className="font-mono text-sm uppercase tracking-[0.2em] mb-4 border-b-2 border-[var(--border)] pb-2 inline-block">
                  FULL-STACK
                </p>

                {/* Main headline with serif font */}
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
                  <TypeShift words={words} />
                </h1>

                {/* Subheadline */}
                <div className="mt-8 border-l-4 border-[var(--fg)] pl-4">
                  <p className="font-mono text-base md:text-lg leading-relaxed max-w-xl">
                    BUILDING DIGITAL PRODUCTS WITH CODE AND DESIGN.
                    <br />
                    NO FRILLS. JUST FUNCTION.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right column - info blocks */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 mt-8 lg:mt-0">
              {/* Status block */}
              <div className="border-2 border-[var(--border)] p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-1">
                  STATUS
                </p>
                <p className="font-serif text-2xl">Open to work</p>
              </div>

              {/* Location block */}
              <div className="border-2 border-[var(--border)] p-4">
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--fg-muted)] mb-1">
                  BASED IN
                </p>
                <p className="font-serif text-2xl">San Francisco</p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2 mt-auto">
                <NextLink
                  href="/projects"
                  className="block border-2 border-[var(--border)] bg-[var(--fg)] text-[var(--bg)] p-4 font-mono text-sm uppercase tracking-widest text-center hover:bg-[var(--bg)] hover:text-[var(--fg)] transition-none"
                >
                  VIEW PROJECTS →
                </NextLink>
                <NextLink
                  href="/resume"
                  className="block border-2 border-[var(--border)] p-4 font-mono text-sm uppercase tracking-widest text-center hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-none"
                >
                  RESUME
                </NextLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative grid */}
      <motion.div
        variants={prefersReducedMotion ? {} : gridVariants}
        initial="hidden"
        animate="visible"
        className="border-t-2 border-[var(--border)] p-4"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-12 md:grid-cols-24 gap-1">
            {Array.from({ length: 48 }).map((_, i) => (
              <motion.div
                key={i}
                variants={cellVariants}
                className={cn(
                  'aspect-square border border-[var(--border)]',
                  i % 7 === 0 && 'bg-[var(--fg)]',
                  i % 11 === 0 && 'bg-[var(--accent)]'
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
