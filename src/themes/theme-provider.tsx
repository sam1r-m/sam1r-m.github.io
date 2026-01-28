'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { ThemeId, themes, getTheme, Theme } from './registry'

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
  
  // Apply tokens - use dark tokens if available and dark mode is active
  const lightTokens = theme.tokens
  const darkTokens = theme.darkTokens
  
  // Apply each token
  Object.entries(lightTokens).forEach(([key, value]) => {
    // Skip non-CSS-variable properties (the dark* properties we added)
    if (!key.startsWith('--')) return
    
    // Check if there's a dark override
    const darkValue = useDark && darkTokens ? darkTokens[key as keyof typeof lightTokens] : undefined
    root.style.setProperty(key, darkValue ?? value)
  })
  
  // Apply fonts
  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>('main')
  const [isDark, setIsDarkState] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // Initialize from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null
    const savedDarkMode = localStorage.getItem(DARK_MODE_STORAGE_KEY)
    
    // Check if savedTheme is valid
    if (savedTheme && themes.some(t => t.id === savedTheme)) {
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
  
  const currentTheme = themes.find(t => t.id === theme)
  const supportsDarkMode = currentTheme?.features.supportsDarkMode ?? false
  
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
