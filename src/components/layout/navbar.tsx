'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn, getVariant, getSpringConfig } from '@/lib/utils'
import { useTheme } from '@/themes/theme-provider'
import { ThemeSelector } from './theme-selector'
import { DarkModeToggle } from './dark-mode-toggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
  { href: '/journal', label: 'Journal' },
]

export function Navbar() {
  const { theme, supportsDarkMode } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navVariant = getVariant(theme, 'nav')
  const springConfig = getSpringConfig(theme)
  
  return (
    <header className={cn('sticky top-0 z-50', navVariant)}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NextLink 
            href="/" 
            className="font-display text-xl font-bold tracking-tight"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={springConfig}
            >
              Portfolio
            </motion.span>
          </NextLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink key={link.href} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </div>
            
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
              <ThemeSelector />
              {supportsDarkMode && <DarkModeToggle />}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSelector />
            {supportsDarkMode && <DarkModeToggle />}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={springConfig}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={springConfig}
                  >
                    <NextLink
                      href={link.href}
                      className="block py-2 text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NextLink>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { theme } = useTheme()
  const linkVariant = getVariant(theme, 'link')
  const springConfig = getSpringConfig(theme)
  
  return (
    <NextLink href={href}>
      <motion.span
        className={cn(
          'text-sm font-medium text-muted-foreground hover:text-foreground transition-colors',
          // Override link styles for nav
          theme === 'brutalist' && 'uppercase tracking-wide font-mono',
          theme === 'minimalist' && 'tracking-wide'
        )}
        whileHover={{ y: -1 }}
        transition={springConfig}
      >
        {children}
      </motion.span>
    </NextLink>
  )
}
