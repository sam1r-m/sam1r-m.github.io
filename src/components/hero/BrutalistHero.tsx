'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

const marqueeWords = ['DEVELOPER', 'DESIGNER', 'CREATIVE', 'BUILDER', 'THINKER']

export function BrutalistHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [currentWord, setCurrentWord] = useState(0)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // Rotate through words
  useEffect(() => {
    if (prefersReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % marqueeWords.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [prefersReducedMotion])
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col noise-bg"
    >
      {/* Top Marquee */}
      {!prefersReducedMotion && (
        <div className="border-b-2 border-foreground overflow-hidden py-3">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="mx-8 text-sm font-mono uppercase tracking-widest text-muted-foreground">
                DESIGN • CODE • CREATE • SHIP • REPEAT •
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <motion.div 
        className="flex-1 container mx-auto px-4 py-16 flex flex-col justify-center"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Typography */}
          <div className="space-y-8">
            {/* Dynamic Word */}
            <div className="h-24 md:h-32 overflow-hidden border-2 border-foreground">
              <motion.div
                key={currentWord}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.15, ease: 'linear' }}
                className="h-full flex items-center justify-center bg-foreground text-background"
              >
                <span className="font-mono text-4xl md:text-6xl font-bold tracking-widest">
                  {marqueeWords[currentWord]}
                </span>
              </motion.div>
            </div>
            
            {/* Name */}
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl uppercase tracking-wide leading-none">
              Your<br />
              <span className="text-stroke">Name</span>
            </h1>
            
            {/* Description */}
            <p className="font-mono text-lg border-l-2 border-foreground pl-4 max-w-md">
              Building digital experiences with raw honesty. No frills, just function.
            </p>
          </div>
          
          {/* Right Column - Info Blocks */}
          <div className="space-y-6">
            {/* Status Block */}
            <motion.div 
              className="border-2 border-foreground p-6 bg-card"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.1 }}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Status
              </div>
              <div className="font-serif text-2xl">
                Available for Work
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-accent animate-pulse" />
                <span className="font-mono text-sm">OPEN TO OPPORTUNITIES</span>
              </div>
            </motion.div>
            
            {/* Location Block */}
            <motion.div 
              className="border-2 border-foreground p-6 bg-card"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.2 }}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">
                Location
              </div>
              <div className="font-serif text-2xl">
                San Francisco, CA
              </div>
              <div className="mt-2 font-mono text-sm text-muted-foreground">
                Remote-friendly worldwide
              </div>
            </motion.div>
            
            {/* CTA */}
            <motion.div 
              className="flex gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.3 }}
            >
              <Link href="/projects" className="flex-1">
                <Button size="lg" className="w-full group">
                  WORK
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/resume" className="flex-1">
                <Button variant="secondary" size="lg" className="w-full">
                  CV
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom Info Bar */}
      <div className="border-t-2 border-foreground py-4">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-4 font-mono text-sm uppercase tracking-wider">
          <span>EST. 2020</span>
          <span>FRONTEND / FULLSTACK</span>
          <span>REACT / NEXT.JS / NODE</span>
          <span>SCROLL ↓</span>
        </div>
      </div>
      
      {/* Text stroke style */}
      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 2px currentColor;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  )
}
