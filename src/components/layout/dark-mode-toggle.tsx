'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { cn, getSpringConfig } from '@/lib/utils'
import { useTheme } from '@/themes'

export function DarkModeToggle() {
  const { theme, colorMode, toggleColorMode } = useTheme()
  const springConfig = getSpringConfig(theme.id)
  const supportsDarkMode = theme.features.supportsDarkMode
  const isDark = colorMode === 'dark'
  
  if (!supportsDarkMode) {
    return null
  }
  
  return (
    <motion.button
      onClick={toggleColorMode}
      className={cn(
        'p-2 rounded-theme border border-border bg-background hover:bg-muted transition-colors',
        'relative overflow-hidden'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springConfig}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 180 : 0,
          scale: isDark ? 0 : 1,
        }}
        transition={springConfig}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun size={18} />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : -180,
          scale: isDark ? 1 : 0,
        }}
        transition={springConfig}
        className="flex items-center justify-center"
      >
        <Moon size={18} />
      </motion.div>
    </motion.button>
  )
}
