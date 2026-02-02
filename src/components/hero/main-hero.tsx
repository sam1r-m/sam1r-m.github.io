'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, type Variants, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion, useTheme } from '@/themes';
import { cn } from '@/lib/utils';
import NextLink from 'next/link';

// Font configurations for auto-cycling (every 5 seconds)
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
  { 
    name: 'Geometric', 
    fontFamily: 'var(--font-space-grotesk)', 
    fontWeight: 700,
    fontStyle: 'normal',
    letterSpacing: '-0.02em',
  },
  { 
    name: 'Serif', 
    fontFamily: 'var(--font-cormorant)', 
    fontWeight: 700,
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

// Auto-cycling font name component (changes every 5 seconds)
function AutoCyclingName({ children }: { children: string }) {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { colorMode, theme } = useTheme();
  const isDark = colorMode === 'dark' && theme.features.supportsDarkMode;

  // Auto-cycle every 5 seconds
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentFontIndex((prev) => (prev + 1) % FONT_STYLES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentFont = FONT_STYLES[currentFontIndex];

  return (
    <span className="relative inline-block">
      {/* Main text with gradient */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentFontIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn(
            'relative z-10 inline-block',
            'bg-gradient-to-r bg-clip-text text-transparent',
            isDark 
              ? 'from-indigo-300 via-purple-300 to-pink-300' 
              : 'from-indigo-600 via-purple-600 to-pink-600',
          )}
          style={{
            fontFamily: currentFont.fontFamily,
            fontWeight: currentFont.fontWeight,
            fontStyle: currentFont.fontStyle,
            letterSpacing: currentFont.letterSpacing,
          }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
      
      {/* Font name indicator */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentFont.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm font-mono whitespace-nowrap",
            isDark ? "text-white/40" : "text-black/40"
          )}
        >
          {currentFont.name}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Clean Glass Card Component (CSS-only, no SVG filters)
function GlassCard({ 
  children, 
  className,
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const { colorMode, theme } = useTheme();
  const isDark = colorMode === 'dark' && theme.features.supportsDarkMode;
  
  return (
    <div 
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'backdrop-blur-xl',
        isDark 
          ? 'bg-white/[0.08] border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
          : 'bg-white/70 border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
        className
      )}
    >
      {/* Subtle gradient overlay for depth */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none",
          isDark 
            ? "bg-gradient-to-br from-white/[0.08] via-transparent to-transparent"
            : "bg-gradient-to-br from-white/50 via-transparent to-transparent"
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Clean Glass Button Component
function GlassButton({ 
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
    <div 
      className={cn(
        'relative rounded-xl overflow-hidden transition-all duration-300',
        'backdrop-blur-lg',
        isPrimary
          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_4px_30px_rgba(99,102,241,0.6)]'
          : isDark 
            ? 'bg-white/[0.1] border border-white/[0.2] hover:bg-white/[0.15] hover:border-white/[0.3]' 
            : 'bg-black/[0.05] border border-black/[0.1] hover:bg-black/[0.08] hover:border-black/[0.15]',
        className
      )}
    >
      {/* Shine effect for primary button */}
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      )}
      <div className="relative z-10">{children}</div>
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
          isDark ? "opacity-[0.015]" : "opacity-[0.02]"
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
          {/* Status badge - glass */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <GlassCard className="rounded-full !rounded-full">
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
            </GlassCard>
          </motion.div>

          {/* Main headline - Typewriter + Auto Font Cycling */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="leading-[1.1]">
              {/* "Hi, I'm" with typewriter effect */}
              <span className={cn(
                "block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-2 md:mb-4",
                isDark ? "text-white/70" : "text-black/60"
              )}>
                <TypewriterText text="Hi, I'm" delay={500} />
              </span>
              
              {/* "SAMIR" - massive with auto font cycling */}
              <span 
                className="block text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] leading-[0.9]"
              >
                <AutoCyclingName>SAMIR</AutoCyclingName>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={cn(
              "mt-12 text-center text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-light",
              isDark ? "text-white/40" : "text-black/50"
            )}
          >
            Computational Math @ UWaterloo
            <span className={cn("mx-3", isDark ? "text-white/20" : "text-black/20")}>·</span>
            Data science & analytics
          </motion.p>

          {/* CTA Buttons - glass */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <NextLink href="/projects">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <GlassButton variant="primary" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-8 py-4 text-white font-medium">
                    View Projects
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </GlassButton>
              </motion.div>
            </NextLink>
            
            <NextLink href="/resume">
              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                <GlassButton className="cursor-pointer">
                  <div className={cn(
                    "px-8 py-4 font-medium",
                    isDark ? "text-white/90" : "text-black/80"
                  )}>
                    Resume
                  </div>
                </GlassButton>
              </motion.div>
            </NextLink>
          </motion.div>

          {/* Stats row - glass cards */}
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
              <GlassCard key={stat.label}>
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
              </GlassCard>
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
