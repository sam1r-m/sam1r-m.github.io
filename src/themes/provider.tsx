'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { type ThemeId, type Theme, getTheme, defaultTheme, themes } from './registry';

// ============================================================================
// TYPES
// ============================================================================

type ColorMode = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

// ============================================================================
// CONTEXT
// ============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null);

// ============================================================================
// STORAGE KEYS
// ============================================================================

const THEME_STORAGE_KEY = 'theme-id';
const COLOR_MODE_STORAGE_KEY = 'color-mode';

// ============================================================================
// PROVIDER
// ============================================================================

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeId, setThemeIdState] = useState<ThemeId>(defaultTheme);
  const [colorMode, setColorModeState] = useState<ColorMode>('light');
  const [mounted, setMounted] = useState(false);

  // Load persisted values on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    const storedColorMode = localStorage.getItem(COLOR_MODE_STORAGE_KEY) as ColorMode | null;

    if (storedTheme && themes.some((t) => t.id === storedTheme)) {
      setThemeIdState(storedTheme);
    }

    if (storedColorMode === 'light' || storedColorMode === 'dark') {
      setColorModeState(storedColorMode);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColorModeState(prefersDark ? 'dark' : 'light');
    }

    setMounted(true);
  }, []);

  // Apply CSS variables when theme or color mode changes
  useEffect(() => {
    if (!mounted) return;

    const theme = getTheme(themeId);
    const root = document.documentElement;

    // Apply base tokens
    Object.entries(theme.tokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Apply dark mode tokens if applicable
    if (theme.features.supportsDarkMode && colorMode === 'dark' && theme.darkTokens) {
      Object.entries(theme.darkTokens).forEach(([key, value]) => {
        if (value) root.style.setProperty(key, value);
      });
    }

    // Apply font tokens
    Object.entries(theme.fonts).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Set data attributes for CSS selectors
    root.setAttribute('data-theme', themeId);
    root.setAttribute('data-color-mode', theme.features.supportsDarkMode ? colorMode : 'light');

  }, [themeId, colorMode, mounted]);

  const setThemeId = useCallback((id: ThemeId) => {
    setThemeIdState(id);
    localStorage.setItem(THEME_STORAGE_KEY, id);
  }, []);

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode);
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  const theme = getTheme(themeId);

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeId,
        setThemeId,
        colorMode,
        setColorMode,
        toggleColorMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// ============================================================================
// HOOKS
// ============================================================================

// Default context value for SSR/SSG - uses default theme
const defaultContextValue: ThemeContextValue = {
  theme: getTheme(defaultTheme),
  themeId: defaultTheme,
  setThemeId: () => {},
  colorMode: 'light',
  setColorMode: () => {},
  toggleColorMode: () => {},
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  // Return default values during SSR/SSG instead of throwing
  if (!context) {
    return defaultContextValue;
  }
  return context;
}

export function useThemeMotion() {
  const { theme } = useTheme();
  return theme.motion;
}

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
