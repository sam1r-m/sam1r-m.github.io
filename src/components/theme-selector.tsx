'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme, themes, useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';

export function ThemeSelector() {
  const { theme, themeId, setThemeId, colorMode, toggleColorMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.15 },
      };

  return (
    <div className="flex items-center gap-2">
      {/* Dark mode toggle - only for Main theme */}
      {theme.features.supportsDarkMode && (
        <button
          onClick={toggleColorMode}
          className={cn(
            'p-2 rounded-[var(--radius)] transition-colors',
            'hover:bg-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
          )}
          aria-label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
        >
          {colorMode === 'light' ? (
            <Moon className="w-5 h-5 text-[var(--fg)]" />
          ) : (
            <Sun className="w-5 h-5 text-[var(--fg)]" />
          )}
        </button>
      )}

      {/* Theme selector dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-[var(--radius)]',
            'bg-[var(--secondary)] text-[var(--secondary-fg)]',
            'border border-[var(--border)]',
            'transition-colors hover:bg-[var(--muted)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
          )}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Palette className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">{theme.label}</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...motionProps}
              className={cn(
                'absolute right-0 mt-2 w-56 py-2',
                'bg-[var(--card)] border border-[var(--border)]',
                'rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]',
                'z-50'
              )}
              role="listbox"
            >
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setThemeId(t.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2 text-left',
                    'transition-colors hover:bg-[var(--muted)]',
                    'focus:outline-none focus:bg-[var(--muted)]',
                    themeId === t.id && 'bg-[var(--muted)]'
                  )}
                  role="option"
                  aria-selected={themeId === t.id}
                >
                  <div className="font-medium text-[var(--fg)]">{t.label}</div>
                  <div className="text-xs text-[var(--fg-muted)]">{t.description}</div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
