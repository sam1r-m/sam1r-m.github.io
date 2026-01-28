'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Zap, Code, Palette, Rocket } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import Link from 'next/link'

const badges = [
  { icon: Code, label: 'Full-Stack' },
  { icon: Palette, label: 'Design' },
  { icon: Zap, label: 'Performance' },
  { icon: Rocket, label: 'Innovation' },
]

export function NeoBrutalHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden py-20"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating shapes */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              className="absolute top-20 right-10 w-20 h-20 bg-accent border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)] rounded-lg"
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -10, 10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-32 left-10 w-16 h-16 bg-secondary border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)] rounded-full"
              animate={{ 
                rotate: [0, -15, 15, 0],
                x: [0, 10, -10, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/3 left-1/4 w-12 h-12 bg-primary border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)]"
              animate={{ 
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}
      </div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4"
        style={{ opacity, y: prefersReducedMotion ? 0 : y }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Sticker badges */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-8 justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.25, 
                  delay: 0.1 + index * 0.1,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [-2, 2, -2, 0],
                  transition: { duration: 0.2 }
                }}
              >
                <Badge className="flex items-center gap-2 cursor-default">
                  <badge.icon size={14} />
                  {badge.label}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Main headline */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <motion.span 
                className="inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Hey!
              </motion.span>{' '}
              <motion.span 
                className="inline-block bg-primary text-primary-foreground px-4 py-1 border-[3px] border-foreground shadow-[4px_4px_0_0_var(--foreground)] -rotate-2"
                whileHover={{ rotate: 2, scale: 1.02 }}
              >
                I'm
              </motion.span>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mt-2">
              <motion.span 
                className="inline-block bg-accent text-accent-foreground px-4 py-1 border-[3px] border-foreground shadow-[6px_6px_0_0_var(--foreground)] rotate-1"
                whileHover={{ rotate: -1, scale: 1.02 }}
              >
                Creative
              </motion.span>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mt-2">
              Developer
              <motion.span 
                className="inline-block ml-4"
                animate={!prefersReducedMotion ? { rotate: [0, 14, 0] } : {}}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              >
                👋
              </motion.span>
            </h1>
          </motion.div>
          
          {/* Description card */}
          <motion.div
            className="bg-card border-[3px] border-foreground shadow-[6px_6px_0_0_var(--foreground)] p-6 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.3 }}
            whileHover={{ 
              shadow: '8px 8px 0 0 var(--foreground)',
              x: -2,
              y: -2
            }}
          >
            <p className="text-lg md:text-xl text-center">
              I build <span className="font-bold underline decoration-4 decoration-accent">awesome websites</span> and 
              <span className="font-bold underline decoration-4 decoration-secondary"> web apps</span> with 
              modern tech. Let's make something <span className="font-bold">cool together!</span>
            </p>
          </motion.div>
          
          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.4 }}
          >
            <Link href="/projects">
              <Button size="lg" className="text-lg px-8">
                See My Work 🚀
              </Button>
            </Link>
            <Link href="/journal">
              <Button variant="secondary" size="lg" className="text-lg px-8">
                Read My Blog 📝
              </Button>
            </Link>
          </motion.div>
          
          {/* Scroll hint */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={!prefersReducedMotion ? { y: [0, 8, 0] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-flex flex-col items-center text-muted-foreground"
            >
              <span className="text-sm font-bold mb-2">SCROLL DOWN</span>
              <div className="w-6 h-10 border-[3px] border-foreground rounded-full flex justify-center pt-2">
                <motion.div 
                  className="w-2 h-2 bg-foreground rounded-full"
                  animate={!prefersReducedMotion ? { y: [0, 12, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
