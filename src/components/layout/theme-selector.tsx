'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, ChevronDown } from 'lucide-react'
import { cn, getSpringConfig } from '@/lib/utils'
import { useTheme } from '@/themes/theme-provider'
import { getThemeList, ThemeId } from '@/themes/registry'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const springConfig = getSpringConfig(theme)
  
  const themes = getThemeList()
  const currentTheme = themes.find((t) => t.id === theme)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])
  
  return (
    <div ref={containerRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 text-sm rounded-theme',
          'border border-border bg-background hover:bg-muted transition-colors',
          theme === 'brutalist' && 'border-2 font-mono uppercase text-xs tracking-wide',
          theme === 'neo-brutalism' && 'border-[3px] shadow-[2px_2px_0_0_var(--foreground)] font-bold',
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={springConfig}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select theme"
      >
        <Palette size={16} />
        <span className="hidden sm:inline">{currentTheme?.label}</span>
        <ChevronDown 
          size={14} 
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={springConfig}
            className={cn(
              'absolute right-0 mt-2 w-48 py-2 z-50',
              'bg-card border border-border rounded-theme shadow-theme-lg',
              theme === 'brutalist' && 'border-2',
              theme === 'neo-brutalism' && 'border-[3px] shadow-[4px_4px_0_0_var(--foreground)]',
            )}
            role="listbox"
            aria-label="Theme options"
          >
            {themes.map((t) => (
              <motion.button
                key={t.id}
                onClick={() => {
                  setTheme(t.id as ThemeId)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full px-4 py-2 text-left text-sm flex items-center justify-between',
                  'hover:bg-muted transition-colors',
                  t.id === theme && 'bg-muted',
                  theme === 'brutalist' && 'font-mono uppercase text-xs tracking-wide',
                  theme === 'neo-brutalism' && 'font-bold',
                )}
                whileHover={{ x: 4 }}
                transition={springConfig}
                role="option"
                aria-selected={t.id === theme}
              >
                <div>
                  <div className="font-medium">{t.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t.description}
                  </div>
                </div>
                {t.id === theme && (
                  <Check size={16} className="text-primary shrink-0 ml-2" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
