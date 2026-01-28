'use client'

import { forwardRef, HTMLAttributes } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn, getVariant, getSpringConfig } from '@/lib/utils'
import { useTheme } from '@/themes/theme-provider'

export interface SectionHeaderProps extends Omit<HTMLMotionProps<'h2'>, 'ref'> {
  subtitle?: string
}

export const SectionHeader = forwardRef<HTMLHeadingElement, SectionHeaderProps>(
  ({ className, subtitle, children, ...props }, ref) => {
    const { theme } = useTheme()
    const themeVariant = getVariant(theme, 'sectionHeader')
    const springConfig = getSpringConfig(theme)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={springConfig}
        className="mb-12"
      >
        <motion.h2
          ref={ref}
          className={cn(themeVariant, className)}
          {...props}
        >
          {children}
        </motion.h2>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            {subtitle}
          </p>
        )}
      </motion.div>
    )
  }
)

SectionHeader.displayName = 'SectionHeader'
