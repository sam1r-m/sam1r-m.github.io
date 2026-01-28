'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { ThemeId, themes, getTheme } from './registry'

interface ThemeContextType {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  isDark: boolean
  setIsDark: (dark: boolean) => void
  toggleDark: () => void
  supportsDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'site-theme'
const DARK_MODE_STORAGE_KEY = 'site-dark-mode'

function applyThemeTokens(themeId: ThemeId, isDark: boolean) {
  const theme = getTheme(themeId)
  const root = document.documentElement
  
  // Remove dark class first
  root.classList.remove('dark')
  
  // Apply theme class
  root.setAttribute('data-theme', themeId)
  
  // Determine if we should use dark mode
  const useDark = isDark && theme.features.supportsDarkMode
  
  if (useDark) {
    root.classList.add('dark')
  }
  
  // Set CSS variables for colors
  const tokens = theme.tokens
  
  // Apply light or dark tokens based on mode
  root.style.setProperty('--background', useDark && tokens.darkBackground ? tokens.darkBackground : tokens.background)
  root.style.setProperty('--foreground', useDark && tokens.darkForeground ? tokens.darkForeground : tokens.foreground)
  root.style.setProperty('--muted', useDark && tokens.darkMuted ? tokens.darkMuted : tokens.muted)
  root.style.setProperty('--muted-foreground', useDark && tokens.darkMutedForeground ? tokens.darkMutedForeground : tokens.mutedForeground)
  root.style.setProperty('--primary', useDark && tokens.darkPrimary ? tokens.darkPrimary : tokens.primary)
  root.style.setProperty('--primary-foreground', useDark && tokens.darkPrimaryForeground ? tokens.darkPrimaryForeground : tokens.primaryForeground)
  root.style.setProperty('--secondary', useDark && tokens.darkSecondary ? tokens.darkSecondary : tokens.secondary)
  root.style.setProperty('--secondary-foreground', useDark && tokens.darkSecondaryForeground ? tokens.darkSecondaryForeground : tokens.secondaryForeground)
  root.style.setProperty('--accent', useDark && tokens.darkAccent ? tokens.darkAccent : tokens.accent)
  root.style.setProperty('--accent-foreground', useDark && tokens.darkAccentForeground ? tokens.darkAccentForeground : tokens.accentForeground)
  root.style.setProperty('--border', useDark && tokens.darkBorder ? tokens.darkBorder : tokens.border)
  root.style.setProperty('--card', useDark && tokens.darkCard ? tokens.darkCard : tokens.card)
  root.style.setProperty('--card-foreground', useDark && tokens.darkCardForeground ? tokens.darkCardForeground : tokens.cardForeground)
  
  // Apply fonts
  root.style.setProperty('--font-sans', theme.fonts.sans)
  root.style.setProperty('--font-mono', theme.fonts.mono)
  root.style.setProperty('--font-serif', theme.fonts.serif)
  root.style.setProperty('--font-display', theme.fonts.display)
  
  // Apply styles
  root.style.setProperty('--radius', theme.styles.radius)
  root.style.setProperty('--border-width', theme.styles.borderWidth)
  root.style.setProperty('--shadow', theme.styles.shadow)
  root.style.setProperty('--shadow-lg', theme.styles.shadowLg)
  root.style.setProperty('--shadow-hover', theme.styles.shadowHover)
  root.style.setProperty('--letter-spacing', theme.styles.letterSpacing)
  root.style.setProperty('--letter-spacing-tight', theme.styles.letterSpacingTight)
  root.style.setProperty('--letter-spacing-wide', theme.styles.letterSpacingWide)
  root.style.setProperty('--section-spacing', theme.styles.sectionSpacing)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('main')
  const [isDark, setIsDarkState] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Initialize from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
    const savedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY)
    
    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme)
    }
    
    if (savedDarkMode !== null) {
      setIsDarkState(savedDarkMode === 'true')
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDarkState(prefersDark)
    }
    
    setMounted(true)
  }, [])
  
  // Apply theme when it changes
  useEffect(() => {
    if (mounted) {
      applyThemeTokens(theme, isDark)
    }
  }, [theme, isDark, mounted])
  
  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme)
    localStorage.setItem(THEME_STORAGE_KEY, newTheme)
  }, [])
  
  const setIsDark = useCallback((dark: boolean) => {
    setIsDarkState(dark)
    localStorage.setItem(DARK_MODE_STORAGE_KEY, String(dark))
  }, [])
  
  const toggleDark = useCallback(() => {
    setIsDark(!isDark)
  }, [isDark, setIsDark])
  
  const supportsDarkMode = themes[theme]?.features.supportsDarkMode ?? false
  
  // Prevent flash by not rendering until mounted
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    )
  }
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark,
        setIsDark,
        toggleDark,
        supportsDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
