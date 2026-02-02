'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

export function MinimalistHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50])
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  }
  
  const title = "Designer & Developer"
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Subtle background line */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-px h-[40vh] bg-border"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
          style={{ originY: 0 }}
        />
      </div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center"
        style={{ opacity, y: prefersReducedMotion ? 0 : textY }}
      >
        {/* Elegant serif headline */}
        <div className="overflow-hidden mb-4">
          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-lg md:text-xl text-muted-foreground italic"
          >
            Hello, I'm
          </motion.p>
        </div>
        
        {/* Name - large and elegant */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight"
          >
            Samir
          </motion.h1>
        </div>
        
        {/* Animated title */}
        <div className="overflow-hidden mb-12">
          <motion.div
            className="flex justify-center flex-wrap gap-x-3"
            initial="hidden"
            animate="visible"
          >
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={prefersReducedMotion ? {} : letterVariants}
                className="text-xl md:text-2xl text-muted-foreground tracking-widest uppercase"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </div>
        
        {/* Subtle divider */}
        <motion.div
          className="w-16 h-px bg-border mx-auto mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Computational Math @ UWaterloo.
          Data, code, and everything in between.
        </motion.p>
        
        {/* CTAs - minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link href="/projects">
            <Button variant="secondary" size="lg" className="group">
              View Work
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
          <Link href="/journal" className="text-muted-foreground hover:text-foreground transition-colors duration-300">
            <span className="border-b border-transparent hover:border-current pb-1">
              Read Journal
            </span>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={!prefersReducedMotion ? { y: [0, 6, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted-foreground text-sm tracking-widest uppercase"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  )
}
