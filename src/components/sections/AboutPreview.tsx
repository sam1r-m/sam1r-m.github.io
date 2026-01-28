'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Zap, Users } from 'lucide-react'
import { SectionHeader } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig } from '@/lib/utils'

const highlights = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, tested code that scales.',
  },
  {
    icon: Palette,
    title: 'Design-Focused',
    description: 'Creating beautiful interfaces with attention to detail.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Building fast, optimized applications.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working effectively with teams and stakeholders.',
  },
]

export function AboutPreview() {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  
  return (
    <section className={cn(
      'py-section container mx-auto px-4 sm:px-6 lg:px-8',
      theme === 'brutalist' && 'border-t-2 border-foreground'
    )}>
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={springConfig}
        >
          <SectionHeader>About Me</SectionHeader>
          
          <div className={cn(
            'space-y-4 text-lg text-muted-foreground',
            theme === 'brutalist' && 'font-mono',
            theme === 'minimalist' && 'leading-relaxed'
          )}>
            <p>
              I'm a software engineer passionate about creating exceptional digital experiences. 
              With expertise in modern web technologies, I specialize in building 
              applications that are both beautiful and performant.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, 
              contributing to open source, or sharing knowledge through writing and mentoring.
            </p>
          </div>
        </motion.div>
        
        {/* Highlights grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ ...springConfig, delay: index * 0.1 }}
              className={cn(
                'p-6 rounded-theme border border-border bg-card',
                theme === 'brutalist' && 'border-2',
                theme === 'neo-brutalism' && 'border-[3px] shadow-[4px_4px_0_0_var(--foreground)]'
              )}
            >
              <item.icon 
                size={24} 
                className={cn(
                  'mb-4',
                  theme === 'main' && 'text-primary',
                  theme === 'brutalist' && 'text-accent',
                  theme === 'neo-brutalism' && 'text-accent',
                  theme === 'minimalist' && 'text-foreground'
                )}
              />
              <h3 className={cn(
                'font-semibold mb-2',
                theme === 'brutalist' && 'font-serif uppercase tracking-wide',
                theme === 'minimalist' && 'font-serif'
              )}>
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
