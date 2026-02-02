'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion, useTheme } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

// Font configurations for cycling
const FONT_STYLES = [
  { 
    name: 'Modern', 
    fontFamily: 'var(--font-inter)', 
    fontWeight: 800,
    fontStyle: 'normal',
    letterSpacing: '-0.03em',
  },
  { 
    name: 'Typewriter', 
    fontFamily: 'var(--font-special-elite)', 
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0.05em',
  },
  { 
    name: 'Bold', 
    fontFamily: 'var(--font-bebas-neue)', 
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0.02em',
  },
  { 
    name: 'Graffiti', 
    fontFamily: 'var(--font-permanent-marker)', 
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0em',
  },
  { 
    name: 'Elegant', 
    fontFamily: 'var(--font-playfair-display)', 
    fontWeight: 900,
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
  },
  { 
    name: 'Retro', 
    fontFamily: 'var(--font-righteous)', 
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0em',
  },
  { 
    name: 'Display', 
    fontFamily: 'var(--font-abril-fatface)', 
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0em',
  },
];

// Typewriter component for initial load
function TypewriterText({ 
  text, 
  onComplete,
  delay = 0,
}: { 
  text: string; 
  onComplete?: () => void;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { colorMode, theme } = useTheme();
  const isDark = colorMode === 'dark' && theme.features.supportsDarkMode;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, 80);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, onComplete, delay, prefersReducedMotion]);

  return (
    <span className="inline-block">
      {displayedText}
      {!isComplete && (
        <motion.span
          className={cn(
            "inline-block w-[3px] h-[1em] ml-1 align-middle",
            isDark ? "bg-white/80" : "bg-black/60"
          )}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        />
      )}
    </span>
  );
}

// Font-cycling name component
function FontCyclingName({ children }: { children: string }) {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { colorMode, theme } = useTheme();
  const isDark = colorMode === 'dark' && theme.features.supportsDarkMode;

  const startCycling = useCallback(() => {
    if (prefersReducedMotion) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentFontIndex((prev) => (prev + 1) % FONT_STYLES.length);
    }, 150);
  }, [prefersReducedMotion]);

  const stopCycling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
    startCycling();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    stopCycling();
    // Reset to default font
    setCurrentFontIndex(0);
  };

  useEffect(() => {
    return () => stopCycling();
  }, [stopCycling]);

  const currentFont = FONT_STYLES[currentFontIndex];

  return (
    <motion.span
      className="relative inline-block cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Glow effect on hover */}
      <motion.span
        className="absolute inset-0 blur-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main text with gradient */}
      <span 
        className={cn(
          'relative z-10',
          'bg-gradient-to-r bg-clip-text text-transparent',
          isDark 
            ? 'from-indigo-300 via-purple-300 to-pink-300' 
            : 'from-indigo-600 via-purple-600 to-pink-600',
          'transition-colors duration-300',
          isHovering && (isDark ? 'from-indigo-200 via-purple-200 to-pink-200' : 'from-indigo-500 via-purple-500 to-pink-500')
        )}
        style={{
          fontFamily: currentFont.fontFamily,
          fontWeight: currentFont.fontWeight,
          fontStyle: currentFont.fontStyle,
          letterSpacing: currentFont.letterSpacing,
          transition: 'font-family 0.1s ease, font-weight 0.1s ease, letter-spacing 0.1s ease',
        }}
      >
        {children}
      </span>
      
      {/* Font name indicator */}
      <motion.span
        className={cn(
          "absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-mono whitespace-nowrap",
          isDark ? "text-white/50" : "text-black/50"
        )}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: isHovering ? 1 : 0, y: isHovering ? 0 : -5 }}
        transition={{ duration: 0.2 }}
      >
        {currentFont.name}
      </motion.span>
    </motion.span>
  );
}

// Liquid Glass SVG Filters
function LiquidGlassFilters() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* Main container glass effect */}
        <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.01 0.01" 
            numOctaves="3" 
            seed="5" 
            result="noise" 
          />
          <feGaussianBlur in="noise" stdDeviation="1" result="blur" />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="blur" 
            scale="30" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>

        {/* Subtle glass for buttons */}
        <filter id="liquid-glass-subtle" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.015 0.015" 
            numOctaves="2" 
            seed="10" 
            result="noise" 
          />
          <feGaussianBlur in="noise" stdDeviation="0.5" result="blur" />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="blur" 
            scale="15" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>

        {/* Card glass effect */}
        <filter id="liquid-glass-card" x="-50%" y="-50%" width="200%" height="200%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.008 0.008" 
            numOctaves="2" 
            seed="42" 
            result="noise" 
          />
          <feGaussianBlur in="noise" stdDeviation="0.8" result="blur" />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="blur" 
            scale="20" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </defs>
    </svg>
  );
}

// Liquid Glass Card Component
function LiquidGlassCard({ 
  children, 
  className,
  intensity = 'normal'
}: { 
  children: React.ReactNode; 
  className?: string;
  intensity?: 'subtle' | 'normal' | 'strong';
}) {
  const { colorMode, theme } = useTheme();
  const isDark = colorMode === 'dark' && theme.features.supportsDarkMode;
  const filterId = intensity === 'subtle' ? 'liquid-glass-subtle' : 
                   intensity === 'strong' ? 'liquid-glass' : 'liquid-glass-card';
  
  return (
    <div className={cn('relative', className)}>
      {/* Inner glow layer */}
      <div 
        className="absolute inset-0 rounded-[inherit] overflow-hidden z-10"
        style={{
          boxShadow: isDark 
            ? 'inset 1px 1px 0px rgba(255, 255, 255, 0.3), inset 0 0 2px 1px rgba(255, 255, 255, 0.2)'
            : 'inset 1px 1px 0px rgba(255, 255, 255, 0.8), inset 0 0 2px 1px rgba(0, 0, 0, 0.05)',
        }}
      />
      {/* Liquid glass refraction layer */}
      <div 
        className="absolute inset-0 rounded-[inherit] overflow-hidden -z-10"
        style={{
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          filter: `url(#${filterId})`,
          isolation: 'isolate',
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
        }}
      />
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

// Liquid Glass Button Component
function LiquidGlassButton({ 
  children, 
  className,
  variant = 'default'
}: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'default' | 'primary';
}) {
  const { colorMode, theme } = useTheme();
  const isDark = colorMode === 'dark' && theme.features.supportsDarkMode;
  const isPrimary = variant === 'primary';
  
  return (
    <div className={cn('relative group', className)}>
      {/* Inner glow */}
      <div 
        className="absolute inset-0 rounded-2xl overflow-hidden z-10 pointer-events-none"
        style={{
          boxShadow: isPrimary 
            ? 'inset 1px 1px 0px rgba(255, 255, 255, 0.4), inset 0 0 3px 1px rgba(255, 255, 255, 0.2)'
            : isDark
              ? 'inset 1px 1px 0px rgba(255, 255, 255, 0.25), inset 0 0 2px 1px rgba(255, 255, 255, 0.15)'
              : 'inset 1px 1px 0px rgba(255, 255, 255, 0.8), inset 0 0 2px 1px rgba(0, 0, 0, 0.05)',
        }}
      />
      {/* Liquid glass layer */}
      <div 
        className="absolute inset-0 rounded-2xl overflow-hidden -z-10"
        style={{
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          filter: 'url(#liquid-glass-subtle)',
          isolation: 'isolate',
          backgroundColor: isPrimary 
            ? 'rgba(99, 102, 241, 0.5)' 
            : isDark 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.05)',
        }}
      />
      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}

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

export function MainHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { colorMode, theme } = useTheme();
  const isDark = colorMode === 'dark' && theme.features.supportsDarkMode;

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
        staggerChildren: 0.12,
        delayChildren: 0.3,
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
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500",
        isDark ? "bg-[#0a0a0a]" : "bg-[#fafafa]"
      )}
    >
      {/* SVG Filters */}
      <LiquidGlassFilters />

      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <GradientOrb
          className={cn(
            "w-[700px] h-[700px] -top-48 -left-48",
            isDark ? "bg-indigo-600/40" : "bg-indigo-400/30"
          )}
          delay={0}
          duration={25}
        />
        <GradientOrb
          className={cn(
            "w-[600px] h-[600px] top-1/4 -right-32",
            isDark ? "bg-purple-600/35" : "bg-purple-400/25"
          )}
          delay={5}
          duration={30}
        />
        <GradientOrb
          className={cn(
            "w-[500px] h-[500px] -bottom-32 left-1/3",
            isDark ? "bg-violet-600/30" : "bg-violet-400/20"
          )}
          delay={10}
          duration={22}
        />
        <GradientOrb
          className={cn(
            "w-[400px] h-[400px] top-1/2 left-1/2",
            isDark ? "bg-fuchsia-600/20" : "bg-fuchsia-400/15"
          )}
          delay={7}
          duration={28}
        />
      </div>

      {/* Subtle noise texture overlay */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none",
          isDark ? "opacity-[0.015]" : "opacity-[0.03]"
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial gradient for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark 
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.8) 70%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(250,250,250,0.9) 70%)',
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
          {/* Status badge - liquid glass */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <LiquidGlassCard intensity="subtle" className="rounded-full">
              <div className="px-4 py-2 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className={cn(
                  "text-xs font-medium uppercase tracking-wider",
                  isDark ? "text-white/70" : "text-black/70"
                )}>Open to opportunities</span>
              </div>
            </LiquidGlassCard>
          </motion.div>

          {/* Main headline - Typewriter + Font Cycling */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="leading-[1.1]">
              {/* "Hi, I'm" with typewriter effect */}
              <span className={cn(
                "block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-2 md:mb-4",
                isDark ? "text-white/70" : "text-black/60"
              )}>
                <TypewriterText text="Hi, I'm" delay={500} />
              </span>
              
              {/* "SAMIR" - massive with font cycling on hover */}
              <span 
                className="block text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] leading-[0.9]"
              >
                <FontCyclingName>SAMIR</FontCyclingName>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={cn(
              "mt-8 text-center text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-light",
              isDark ? "text-white/40" : "text-black/50"
            )}
          >
            Computational Math @ UWaterloo
            <span className={cn("mx-3", isDark ? "text-white/20" : "text-black/20")}>·</span>
            Data science & analytics
          </motion.p>

          {/* CTA Buttons - liquid glass */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <NextLink href="/projects">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <LiquidGlassButton variant="primary" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-8 py-4 text-white font-medium">
                    View Projects
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </LiquidGlassButton>
              </motion.div>
            </NextLink>
            
            <NextLink href="/resume">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <LiquidGlassButton className="cursor-pointer">
                  <div className={cn(
                    "px-8 py-4 font-medium",
                    isDark ? "text-white/90" : "text-black/80"
                  )}>
                    Resume
                  </div>
                </LiquidGlassButton>
              </motion.div>
            </NextLink>
          </motion.div>

          {/* Stats row - liquid glass cards */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'Internships', value: '4' },
              { label: 'Year', value: '4th' },
              { label: 'Certifications', value: '3' },
              { label: 'Projects', value: '10+' },
            ].map((stat) => (
              <LiquidGlassCard key={stat.label} className="rounded-2xl">
                <div className="p-5 text-center">
                  <p className={cn(
                    "text-2xl md:text-3xl font-semibold bg-gradient-to-r bg-clip-text text-transparent",
                    isDark ? "from-indigo-300 to-purple-300" : "from-indigo-600 to-purple-600"
                  )}>
                    {stat.value}
                  </p>
                  <p className={cn(
                    "text-sm mt-1.5",
                    isDark ? "text-white/40" : "text-black/50"
                  )}>{stat.label}</p>
                </div>
              </LiquidGlassCard>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={cn(
            "flex flex-col items-center gap-2",
            isDark ? "text-white/30" : "text-black/30"
          )}
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className={cn(
            "w-px h-8 bg-gradient-to-b to-transparent",
            isDark ? "from-white/30" : "from-black/30"
          )} />
        </motion.div>
      </motion.div>
    </div>
  );
}
