'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme, useReducedMotion } from '@/themes';
import { getVariant } from '@/themes/variants';
import { ThemeSelector } from './theme-selector';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/journal', label: 'Substack' },
  { href: '/resume', label: 'Resume' },
];

export function Nav() {
  const { themeId } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const containerClasses = getVariant(themeId, 'nav', 'container');
  const itemClasses = getVariant(themeId, 'nav', 'item');
  const itemActiveClasses = getVariant(themeId, 'nav', 'itemActive');

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={cn(containerClasses, 'sticky top-0 z-50')}>
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <NextLink
            href="/"
            className="font-display font-bold text-xl text-[var(--fg)] hover:text-[var(--primary)] transition-colors"
          >
            Portfolio
          </NextLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                className={cn(
                  isActive(item.href) ? itemActiveClasses : itemClasses
                )}
              >
                {item.label}
              </NextLink>
            ))}
          </div>

          {/* Theme Selector + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <ThemeSelector />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'md:hidden p-2 rounded-[var(--radius)]',
                'hover:bg-[var(--muted)] transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
              )}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[var(--fg)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--fg)]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[var(--border)]"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => (
                  <NextLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block',
                      isActive(item.href) ? itemActiveClasses : itemClasses
                    )}
                  >
                    {item.label}
                  </NextLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
