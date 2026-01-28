'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Button } from '@/components/ui'
import { useTheme } from '@/themes'
import { cn } from '@/lib/utils'

export default function NotFound() {
  const { themeId } = useTheme()
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="text-center px-4"
      >
        <h1 className={cn(
          'text-8xl md:text-9xl font-bold mb-4',
          themeId === 'brutalist' && 'font-serif',
          themeId === 'minimalist' && 'font-serif'
        )}>
          404
        </h1>
        <h2 className={cn(
          'text-2xl md:text-3xl font-semibold mb-4',
          themeId === 'brutalist' && 'font-mono uppercase tracking-wide'
        )}>
          Page Not Found
        </h2>
        <p className="text-[var(--fg-muted)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
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
