'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig } from '@/lib/utils'

export default function NotFound() {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="text-center px-4"
      >
        <h1 className={cn(
          'text-8xl md:text-9xl font-bold mb-4',
          theme === 'brutalist' && 'font-serif',
          theme === 'minimalist' && 'font-serif'
        )}>
          404
        </h1>
        <h2 className={cn(
          'text-2xl md:text-3xl font-semibold mb-4',
          theme === 'brutalist' && 'font-mono uppercase tracking-wide'
        )}>
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button>
            <Home size={18} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
