/**
 * Theme Registry
 * 
 * Central configuration for all themes. Each theme defines:
 * - tokens: CSS custom property values (colors, spacing, etc.)
 * - fonts: Font family CSS values
 * - motion: Animation characteristics (spring configs, durations)
 * - features: Feature flags (e.g., supportsDarkMode)
 * 
 * To add a new theme:
 * 1. Add a new entry to this registry
 * 2. Create a hero component in src/components/hero/
 * 3. Add the hero to the Hero router
 * 4. Optionally add component variant overrides
 */

export type ThemeId = 'main' | 'brutalist' | 'neo-brutalism' | 'minimalist';

export interface ThemeTokens {
  // Colors
  '--bg': string;
  '--bg-secondary': string;
  '--fg': string;
  '--fg-muted': string;
  '--primary': string;
  '--primary-fg': string;
  '--secondary': string;
  '--secondary-fg': string;
  '--accent': string;
  '--accent-fg': string;
  '--border': string;
  '--card': string;
  '--card-fg': string;
  '--muted': string;
  '--muted-fg': string;
  
  // Effects
  '--shadow': string;
  '--shadow-lg': string;
  '--radius': string;
  '--radius-lg': string;
  
  // Typography scale multipliers
  '--text-scale': string;
  '--heading-scale': string;
  '--letter-spacing': string;
  '--heading-letter-spacing': string;
  '--line-height': string;
  '--heading-weight': string;
}

export interface ThemeFonts {
  '--font-sans': string;
  '--font-serif': string;
  '--font-mono': string;
  '--font-display': string;
  '--font-body': string;
}

export interface ThemeMotion {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    default: string;
    spring: { stiffness: number; damping: number; mass: number };
    bounce: { stiffness: number; damping: number };
  };
  hover: {
    scale: number;
    y: number;
  };
}

export interface ThemeFeatures {
  supportsDarkMode: boolean;
  hasAnimatedHero: boolean;
  usesShadows: boolean;
  usesGradients: boolean;
}

export interface Theme {
  id: ThemeId;
  label: string;
  description: string;
  tokens: ThemeTokens;
  darkTokens?: Partial<ThemeTokens>; // Only for themes that support dark mode
  fonts: ThemeFonts;
  motion: ThemeMotion;
  features: ThemeFeatures;
}

// ============================================================================
// THEME DEFINITIONS
// ============================================================================

const mainTheme: Theme = {
  id: 'main',
  label: 'Main',
  description: 'Modern design with frosted glass and gradients',
  tokens: {
    // Light mode - clean, bright with subtle glass effects
    '--bg': '#fafafa',
    '--bg-secondary': '#f4f4f5',
    '--fg': '#18181b',
    '--fg-muted': '#71717a',
    '--primary': '#6366f1',
    '--primary-fg': '#ffffff',
    '--secondary': 'rgba(0, 0, 0, 0.05)',
    '--secondary-fg': '#18181b',
    '--accent': '#a855f7',
    '--accent-fg': '#ffffff',
    '--border': 'rgba(0, 0, 0, 0.1)',
    '--card': 'rgba(255, 255, 255, 0.8)',
    '--card-fg': '#18181b',
    '--muted': 'rgba(0, 0, 0, 0.04)',
    '--muted-fg': '#71717a',
    '--shadow': '0 1px 3px rgba(0, 0, 0, 0.1)',
    '--shadow-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '--radius': '0.75rem',
    '--radius-lg': '1rem',
    '--text-scale': '1',
    '--heading-scale': '1',
    '--letter-spacing': '0',
    '--heading-letter-spacing': '-0.03em',
    '--line-height': '1.6',
    '--heading-weight': '600',
  },
  darkTokens: {
    // Dark mode - Cohere/Apple inspired with liquid glass
    '--bg': '#050505',
    '--bg-secondary': '#0a0a0a',
    '--fg': '#fafafa',
    '--fg-muted': '#a1a1aa',
    '--primary': '#6366f1',
    '--primary-fg': '#ffffff',
    '--secondary': 'rgba(255, 255, 255, 0.08)',
    '--secondary-fg': '#fafafa',
    '--accent': '#a855f7',
    '--accent-fg': '#ffffff',
    '--border': 'rgba(255, 255, 255, 0.1)',
    '--card': 'rgba(255, 255, 255, 0.05)',
    '--card-fg': '#fafafa',
    '--muted': 'rgba(255, 255, 255, 0.06)',
    '--muted-fg': '#71717a',
    '--shadow': '0 0 0 1px rgba(255, 255, 255, 0.05)',
    '--shadow-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  },
  fonts: {
    '--font-sans': 'var(--font-inter)',
    '--font-serif': 'Georgia, serif',
    '--font-mono': 'var(--font-jetbrains-mono)',
    '--font-display': 'var(--font-inter)',
    '--font-body': 'var(--font-inter)',
  },
  motion: {
    duration: { fast: 150, normal: 300, slow: 500 },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: { stiffness: 300, damping: 30, mass: 1 },
      bounce: { stiffness: 400, damping: 10 },
    },
    hover: { scale: 1.02, y: -2 },
  },
  features: {
    supportsDarkMode: true,
    hasAnimatedHero: true,
    usesShadows: true,
    usesGradients: true,
  },
};

const brutalistTheme: Theme = {
  id: 'brutalist',
  label: 'Brutalist',
  description: 'Raw, print-inspired design with mono/serif typography',
  tokens: {
    '--bg': '#f5f5f0',
    '--bg-secondary': '#e8e8e0',
    '--fg': '#1a1a1a',
    '--fg-muted': '#4a4a4a',
    '--primary': '#1a1a1a',
    '--primary-fg': '#f5f5f0',
    '--secondary': '#e8e8e0',
    '--secondary-fg': '#1a1a1a',
    '--accent': '#ff3333',
    '--accent-fg': '#ffffff',
    '--border': '#1a1a1a',
    '--card': '#ffffff',
    '--card-fg': '#1a1a1a',
    '--muted': '#e8e8e0',
    '--muted-fg': '#4a4a4a',
    '--shadow': 'none',
    '--shadow-lg': 'none',
    '--radius': '0',
    '--radius-lg': '0',
    '--text-scale': '1.05',
    '--heading-scale': '1.15',
    '--letter-spacing': '0.02em',
    '--heading-letter-spacing': '-0.03em',
    '--line-height': '1.5',
    '--heading-weight': '400',
  },
  fonts: {
    '--font-sans': 'var(--font-ibm-plex-mono)',
    '--font-serif': 'var(--font-libre-baskerville)',
    '--font-mono': "'IBM Plex Mono', 'Courier New', monospace",
    '--font-display': 'var(--font-libre-baskerville)',
    '--font-body': 'var(--font-ibm-plex-mono)',
  },
  motion: {
    duration: { fast: 50, normal: 100, slow: 200 },
    easing: {
      default: 'linear',
      spring: { stiffness: 500, damping: 50, mass: 0.5 },
      bounce: { stiffness: 600, damping: 15 },
    },
    hover: { scale: 1, y: 0 },
  },
  features: {
    supportsDarkMode: false,
    hasAnimatedHero: true,
    usesShadows: false,
    usesGradients: false,
  },
};

const neoBrutalismTheme: Theme = {
  id: 'neo-brutalism',
  label: 'Neo Brutalism',
  description: 'Playful, bold design with thick borders and hard shadows',
  tokens: {
    '--bg': '#fffbeb',
    '--bg-secondary': '#fef3c7',
    '--fg': '#1c1917',
    '--fg-muted': '#57534e',
    '--primary': '#f97316',
    '--primary-fg': '#1c1917',
    '--secondary': '#fde68a',
    '--secondary-fg': '#1c1917',
    '--accent': '#ec4899',
    '--accent-fg': '#ffffff',
    '--border': '#1c1917',
    '--card': '#ffffff',
    '--card-fg': '#1c1917',
    '--muted': '#fef3c7',
    '--muted-fg': '#57534e',
    '--shadow': '4px 4px 0px #1c1917',
    '--shadow-lg': '8px 8px 0px #1c1917',
    '--radius': '0.25rem',
    '--radius-lg': '0.5rem',
    '--text-scale': '1.1',
    '--heading-scale': '1.2',
    '--letter-spacing': '0',
    '--heading-letter-spacing': '-0.02em',
    '--line-height': '1.6',
    '--heading-weight': '800',
  },
  fonts: {
    '--font-sans': 'var(--font-space-grotesk)',
    '--font-serif': 'Georgia, serif',
    '--font-mono': 'var(--font-jetbrains-mono)',
    '--font-display': 'var(--font-space-grotesk)',
    '--font-body': 'var(--font-dm-sans)',
  },
  motion: {
    duration: { fast: 100, normal: 200, slow: 400 },
    easing: {
      default: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      spring: { stiffness: 200, damping: 12, mass: 1 },
      bounce: { stiffness: 300, damping: 8 },
    },
    hover: { scale: 1.05, y: -4 },
  },
  features: {
    supportsDarkMode: false,
    hasAnimatedHero: true,
    usesShadows: true,
    usesGradients: false,
  },
};

const minimalistTheme: Theme = {
  id: 'minimalist',
  label: 'Minimalist',
  description: 'Clean, elegant design with refined typography',
  tokens: {
    '--bg': '#fafafa',
    '--bg-secondary': '#f5f5f5',
    '--fg': '#171717',
    '--fg-muted': '#737373',
    '--primary': '#171717',
    '--primary-fg': '#fafafa',
    '--secondary': '#f5f5f5',
    '--secondary-fg': '#171717',
    '--accent': '#171717',
    '--accent-fg': '#fafafa',
    '--border': '#e5e5e5',
    '--card': '#ffffff',
    '--card-fg': '#171717',
    '--muted': '#f5f5f5',
    '--muted-fg': '#737373',
    '--shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '--shadow-lg': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    '--radius': '0.125rem',
    '--radius-lg': '0.25rem',
    '--text-scale': '1',
    '--heading-scale': '0.95',
    '--letter-spacing': '0.01em',
    '--heading-letter-spacing': '-0.02em',
    '--line-height': '1.75',
    '--heading-weight': '500',
  },
  fonts: {
    '--font-sans': 'var(--font-outfit)',
    '--font-serif': 'var(--font-cormorant)',
    '--font-mono': 'var(--font-jetbrains-mono)',
    '--font-display': 'var(--font-cormorant)',
    '--font-body': 'var(--font-outfit)',
  },
  motion: {
    duration: { fast: 200, normal: 400, slow: 600 },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: { stiffness: 100, damping: 20, mass: 0.8 },
      bounce: { stiffness: 150, damping: 25 },
    },
    hover: { scale: 1, y: -1 },
  },
  features: {
    supportsDarkMode: false,
    hasAnimatedHero: true,
    usesShadows: true,
    usesGradients: false,
  },
};

// ============================================================================
// REGISTRY EXPORTS
// ============================================================================

export const themes: Theme[] = [
  mainTheme,
  brutalistTheme,
  neoBrutalismTheme,
  minimalistTheme,
];

export const themeMap: Record<ThemeId, Theme> = {
  main: mainTheme,
  brutalist: brutalistTheme,
  'neo-brutalism': neoBrutalismTheme,
  minimalist: minimalistTheme,
};

export const defaultTheme: ThemeId = 'main';

export function getTheme(id: ThemeId): Theme {
  return themeMap[id] || themeMap[defaultTheme];
}

export function getThemeIds(): ThemeId[] {
  return themes.map((t) => t.id);
}

// Alias for backwards compatibility
export function getThemeList(): Theme[] {
  return themes;
}
