'use client'

import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn, getSpringConfig } from '@/lib/utils'
import { useTheme } from '@/themes/theme-provider'

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
]

export function Footer() {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  
  return (
    <footer className={cn(
      'border-t border-border py-12 mt-auto',
      theme === 'brutalist' && 'border-t-2',
      theme === 'neo-brutalism' && 'border-t-[3px]',
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'p-2 rounded-theme text-muted-foreground hover:text-foreground transition-colors',
                  theme === 'brutalist' && 'border border-transparent hover:border-foreground',
                  theme === 'neo-brutalism' && 'hover:bg-secondary border-2 border-transparent hover:border-foreground',
                )}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={springConfig}
                aria-label={link.label}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>
          
          {/* Credits */}
          <div className={cn(
            'text-sm text-muted-foreground text-center md:text-right',
            theme === 'brutalist' && 'font-mono uppercase tracking-wide text-xs',
          )}>
            <p>
              Built with{' '}
              <a 
                href="https://nextjs.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Next.js
              </a>
              {' '}&{' '}
              <a 
                href="https://framer.com/motion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                Framer Motion
              </a>
            </p>
            <p className="mt-1">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
