/**
 * Theme Variants
 * 
 * Defines component-specific styling variants for each theme.
 * Components use getVariant() to get theme-appropriate classes.
 * 
 * This enables truly different visual treatments per theme,
 * not just color changes but different borders, shadows, hover states, etc.
 */

import type { ThemeId } from './registry';

// ============================================================================
// VARIANT TYPES
// ============================================================================

type ComponentVariants = {
  button: {
    primary: string;
    secondary: string;
    ghost: string;
    outline: string;
  };
  link: {
    default: string;
    nav: string;
    muted: string;
  };
  card: {
    default: string;
    elevated: string;
    interactive: string;
  };
  badge: {
    default: string;
    primary: string;
    secondary: string;
    accent: string;
    outline: string;
  };
  input: {
    default: string;
  };
  nav: {
    container: string;
    item: string;
    itemActive: string;
  };
  section: {
    default: string;
    alternate: string;
  };
  heading: {
    h1: string;
    h2: string;
    h3: string;
  };
  sectionHeader: string;
};

// ============================================================================
// MAIN THEME VARIANTS
// Modern, polished with smooth transitions and subtle shadows
// ============================================================================

const mainVariants: ComponentVariants = {
  button: {
    primary: `
      bg-[var(--primary)] text-[var(--primary-fg)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)]
      transition-all duration-200 ease-out
      hover:-translate-y-0.5 hover:brightness-110
      active:translate-y-0 active:shadow-[var(--shadow)]
      focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2
    `,
    secondary: `
      bg-[var(--secondary)] text-[var(--secondary-fg)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      shadow-[var(--shadow)] hover:shadow-[var(--shadow-lg)]
      transition-all duration-200 ease-out
      hover:-translate-y-0.5 hover:bg-[var(--muted)]
      active:translate-y-0
      focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
    `,
    ghost: `
      bg-transparent text-[var(--fg)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      transition-colors duration-200 ease-out
      hover:bg-[var(--muted)]
      focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
    `,
    outline: `
      bg-transparent text-[var(--fg)]
      border border-[var(--border)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      transition-all duration-200 ease-out
      hover:bg-[var(--muted)] hover:border-[var(--fg-muted)]
      focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
    `,
  },
  link: {
    default: `
      text-[var(--primary)] underline-offset-4
      transition-colors duration-200
      hover:underline hover:text-[var(--accent)]
      focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 rounded
    `,
    nav: `
      text-[var(--fg)] font-medium
      transition-colors duration-200
      hover:text-[var(--primary)]
      focus:outline-none
    `,
    muted: `
      text-[var(--fg-muted)]
      transition-colors duration-200
      hover:text-[var(--fg)]
    `,
  },
  card: {
    default: `
      bg-[var(--card)] text-[var(--card-fg)]
      rounded-[var(--radius-lg)] p-6
      border border-[var(--border)]
    `,
    elevated: `
      bg-[var(--card)] text-[var(--card-fg)]
      rounded-[var(--radius-lg)] p-6
      shadow-[var(--shadow-lg)]
    `,
    interactive: `
      bg-[var(--card)] text-[var(--card-fg)]
      rounded-[var(--radius-lg)] p-6
      border border-[var(--border)]
      shadow-[var(--shadow)]
      transition-all duration-300 ease-out
      hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 hover:border-[var(--primary)]
    `,
  },
  badge: {
    default: `
      inline-flex items-center px-2.5 py-0.5
      rounded-full text-xs font-medium
      bg-[var(--muted)] text-[var(--muted-fg)]
    `,
    primary: `
      inline-flex items-center px-2.5 py-0.5
      rounded-full text-xs font-medium
      bg-[var(--primary)] text-[var(--primary-fg)]
    `,
    secondary: `
      inline-flex items-center px-2.5 py-0.5
      rounded-full text-xs font-medium
      bg-[var(--secondary)] text-[var(--secondary-fg)]
    `,
    accent: `
      inline-flex items-center px-2.5 py-0.5
      rounded-full text-xs font-medium
      bg-[var(--accent)] text-[var(--accent-fg)]
    `,
    outline: `
      inline-flex items-center px-2.5 py-0.5
      rounded-full text-xs font-medium
      border border-[var(--border)] text-[var(--fg)]
    `,
  },
  input: {
    default: `
      w-full px-4 py-2.5
      bg-[var(--bg)] text-[var(--fg)]
      border border-[var(--border)]
      rounded-[var(--radius)]
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent
      placeholder:text-[var(--fg-muted)]
    `,
  },
  nav: {
    container: `
      bg-[var(--bg)]/80 backdrop-blur-md
      border-b border-[var(--border)]
    `,
    item: `
      text-[var(--fg-muted)] font-medium px-3 py-2
      transition-colors duration-200
      hover:text-[var(--fg)]
      rounded-[var(--radius)]
    `,
    itemActive: `
      text-[var(--primary)] font-medium px-3 py-2
      bg-[var(--primary)]/10
      rounded-[var(--radius)]
    `,
  },
  section: {
    default: `bg-[var(--bg)]`,
    alternate: `bg-[var(--bg-secondary)]`,
  },
  heading: {
    h1: `
      text-4xl md:text-5xl lg:text-6xl
      font-[var(--heading-weight)] tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h2: `
      text-3xl md:text-4xl
      font-[var(--heading-weight)] tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h3: `
      text-xl md:text-2xl
      font-[var(--heading-weight)] tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
  },
  sectionHeader: `
    text-3xl md:text-4xl font-bold tracking-tight text-[var(--fg)]
  `,
};

// ============================================================================
// BRUTALIST THEME VARIANTS
// Raw, stark with hard edges and no shadows
// ============================================================================

const brutalistVariants: ComponentVariants = {
  button: {
    primary: `
      bg-[var(--primary)] text-[var(--primary-fg)]
      border-2 border-[var(--border)] px-6 py-2.5
      font-mono uppercase tracking-wider text-sm
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)]
      active:invert
      focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2
    `,
    secondary: `
      bg-[var(--bg)] text-[var(--fg)]
      border-2 border-[var(--border)] px-6 py-2.5
      font-mono uppercase tracking-wider text-sm
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)]
      focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2
    `,
    ghost: `
      bg-transparent text-[var(--fg)]
      px-6 py-2.5
      font-mono uppercase tracking-wider text-sm
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)]
      focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2
    `,
    outline: `
      bg-transparent text-[var(--fg)]
      border-2 border-[var(--border)] px-6 py-2.5
      font-mono uppercase tracking-wider text-sm
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)]
      focus:outline-none focus:ring-2 focus:ring-[var(--fg)] focus:ring-offset-2
    `,
  },
  link: {
    default: `
      text-[var(--fg)] font-mono
      border-b-2 border-[var(--fg)]
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:px-1
      focus:outline-none focus:bg-[var(--fg)] focus:text-[var(--bg)]
    `,
    nav: `
      text-[var(--fg)] font-mono uppercase tracking-wider text-sm
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)]
      focus:outline-none
    `,
    muted: `
      text-[var(--fg-muted)] font-mono
      transition-none
      hover:text-[var(--fg)]
    `,
  },
  card: {
    default: `
      bg-[var(--card)] text-[var(--card-fg)]
      border-2 border-[var(--border)] p-6
    `,
    elevated: `
      bg-[var(--card)] text-[var(--card-fg)]
      border-2 border-[var(--border)] p-6
    `,
    interactive: `
      bg-[var(--card)] text-[var(--card-fg)]
      border-2 border-[var(--border)] p-6
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)]
    `,
  },
  badge: {
    default: `
      inline-flex items-center px-2 py-1
      border border-[var(--border)]
      font-mono uppercase tracking-wider text-xs
      bg-[var(--bg)] text-[var(--fg)]
    `,
    primary: `
      inline-flex items-center px-2 py-1
      border-2 border-[var(--border)]
      font-mono uppercase tracking-wider text-xs
      bg-[var(--fg)] text-[var(--bg)]
    `,
    secondary: `
      inline-flex items-center px-2 py-1
      border border-[var(--border)]
      font-mono uppercase tracking-wider text-xs
      bg-[var(--muted)] text-[var(--fg)]
    `,
    accent: `
      inline-flex items-center px-2 py-1
      border-2 border-[var(--accent)]
      font-mono uppercase tracking-wider text-xs
      bg-[var(--accent)] text-[var(--accent-fg)]
    `,
    outline: `
      inline-flex items-center px-2 py-1
      border-2 border-[var(--border)]
      font-mono uppercase tracking-wider text-xs
      bg-transparent text-[var(--fg)]
    `,
  },
  input: {
    default: `
      w-full px-4 py-2.5
      bg-[var(--bg)] text-[var(--fg)]
      border-2 border-[var(--border)]
      font-mono
      transition-none
      focus:outline-none focus:bg-[var(--fg)] focus:text-[var(--bg)]
      placeholder:text-[var(--fg-muted)]
    `,
  },
  nav: {
    container: `
      bg-[var(--bg)]
      border-b-2 border-[var(--border)]
    `,
    item: `
      text-[var(--fg)] font-mono uppercase tracking-wider text-sm px-4 py-2
      transition-none
      hover:bg-[var(--fg)] hover:text-[var(--bg)]
    `,
    itemActive: `
      text-[var(--bg)] font-mono uppercase tracking-wider text-sm px-4 py-2
      bg-[var(--fg)]
    `,
  },
  section: {
    default: `bg-[var(--bg)]`,
    alternate: `bg-[var(--bg-secondary)] border-y-2 border-[var(--border)]`,
  },
  heading: {
    h1: `
      text-5xl md:text-7xl lg:text-8xl
      font-serif font-normal tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h2: `
      text-3xl md:text-5xl
      font-serif font-normal tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h3: `
      text-xl md:text-2xl
      font-mono uppercase tracking-wider
      text-[var(--fg)]
    `,
  },
  sectionHeader: `
    text-4xl md:text-5xl font-serif font-normal tracking-tight text-[var(--fg)] border-b-2 border-[var(--border)] pb-4
  `,
};

// ============================================================================
// NEO-BRUTALISM THEME VARIANTS
// Playful with thick borders, hard shadows, and bouncy interactions
// ============================================================================

const neoBrutalismVariants: ComponentVariants = {
  button: {
    primary: `
      bg-[var(--primary)] text-[var(--primary-fg)]
      border-3 border-[var(--border)] px-6 py-2.5
      font-bold text-base
      shadow-[var(--shadow)]
      transition-all duration-100 ease-out
      hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]
      active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_var(--border)]
      focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
    `,
    secondary: `
      bg-[var(--secondary)] text-[var(--secondary-fg)]
      border-3 border-[var(--border)] px-6 py-2.5
      font-bold text-base
      shadow-[var(--shadow)]
      transition-all duration-100 ease-out
      hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]
      active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_var(--border)]
      focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
    `,
    ghost: `
      bg-transparent text-[var(--fg)]
      border-3 border-transparent px-6 py-2.5
      font-bold text-base
      transition-all duration-100 ease-out
      hover:border-[var(--border)] hover:shadow-[var(--shadow)]
      focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
    `,
    outline: `
      bg-[var(--bg)] text-[var(--fg)]
      border-3 border-[var(--border)] px-6 py-2.5
      font-bold text-base
      transition-all duration-100 ease-out
      hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[var(--shadow)]
      active:translate-x-0 active:translate-y-0
      focus:outline-none focus:ring-2 focus:ring-[var(--border)] focus:ring-offset-2
    `,
  },
  link: {
    default: `
      text-[var(--primary)] font-bold
      border-b-3 border-[var(--primary)]
      transition-all duration-100
      hover:bg-[var(--primary)] hover:text-[var(--primary-fg)] hover:px-1
      focus:outline-none focus:bg-[var(--primary)] focus:text-[var(--primary-fg)]
    `,
    nav: `
      text-[var(--fg)] font-bold
      transition-all duration-100
      hover:text-[var(--primary)]
      focus:outline-none
    `,
    muted: `
      text-[var(--fg-muted)] font-medium
      transition-colors duration-100
      hover:text-[var(--fg)]
    `,
  },
  card: {
    default: `
      bg-[var(--card)] text-[var(--card-fg)]
      border-3 border-[var(--border)] p-6
      rounded-[var(--radius-lg)]
      shadow-[var(--shadow)]
    `,
    elevated: `
      bg-[var(--card)] text-[var(--card-fg)]
      border-3 border-[var(--border)] p-6
      rounded-[var(--radius-lg)]
      shadow-[var(--shadow-lg)]
    `,
    interactive: `
      bg-[var(--card)] text-[var(--card-fg)]
      border-3 border-[var(--border)] p-6
      rounded-[var(--radius-lg)]
      shadow-[var(--shadow)]
      transition-all duration-100 ease-out
      hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]
      active:translate-x-0 active:translate-y-0
    `,
  },
  badge: {
    default: `
      inline-flex items-center px-3 py-1
      border-2 border-[var(--border)]
      rounded-full font-bold text-xs
      bg-[var(--muted)] text-[var(--muted-fg)]
      shadow-[2px_2px_0px_var(--border)]
    `,
    primary: `
      inline-flex items-center px-3 py-1
      border-2 border-[var(--border)]
      rounded-full font-bold text-xs
      bg-[var(--primary)] text-[var(--primary-fg)]
      shadow-[2px_2px_0px_var(--border)]
    `,
    secondary: `
      inline-flex items-center px-3 py-1
      border-2 border-[var(--border)]
      rounded-full font-bold text-xs
      bg-[var(--secondary)] text-[var(--secondary-fg)]
      shadow-[2px_2px_0px_var(--border)]
    `,
    accent: `
      inline-flex items-center px-3 py-1
      border-2 border-[var(--border)]
      rounded-full font-bold text-xs
      bg-[var(--accent)] text-[var(--accent-fg)]
      shadow-[2px_2px_0px_var(--border)]
    `,
    outline: `
      inline-flex items-center px-3 py-1
      border-2 border-[var(--border)]
      rounded-full font-bold text-xs
      bg-transparent text-[var(--fg)]
      shadow-[2px_2px_0px_var(--border)]
    `,
  },
  input: {
    default: `
      w-full px-4 py-2.5
      bg-[var(--bg)] text-[var(--fg)]
      border-3 border-[var(--border)]
      rounded-[var(--radius)]
      font-medium
      shadow-[var(--shadow)]
      transition-all duration-100
      focus:outline-none focus:-translate-x-0.5 focus:-translate-y-0.5 focus:shadow-[var(--shadow-lg)]
      placeholder:text-[var(--fg-muted)]
    `,
  },
  nav: {
    container: `
      bg-[var(--bg)]
      border-b-3 border-[var(--border)]
    `,
    item: `
      text-[var(--fg)] font-bold px-4 py-2
      transition-all duration-100
      hover:bg-[var(--secondary)] hover:-translate-y-0.5
      rounded-[var(--radius)]
    `,
    itemActive: `
      text-[var(--primary-fg)] font-bold px-4 py-2
      bg-[var(--primary)]
      border-2 border-[var(--border)]
      rounded-[var(--radius)]
      shadow-[2px_2px_0px_var(--border)]
    `,
  },
  section: {
    default: `bg-[var(--bg)]`,
    alternate: `bg-[var(--bg-secondary)] border-y-3 border-[var(--border)]`,
  },
  heading: {
    h1: `
      text-5xl md:text-6xl lg:text-7xl
      font-extrabold tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h2: `
      text-3xl md:text-4xl
      font-extrabold tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h3: `
      text-xl md:text-2xl
      font-bold
      text-[var(--fg)]
    `,
  },
  sectionHeader: `
    text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--fg)]
  `,
};

// ============================================================================
// MINIMALIST THEME VARIANTS
// Clean, subtle with refined transitions
// ============================================================================

const minimalistVariants: ComponentVariants = {
  button: {
    primary: `
      bg-[var(--primary)] text-[var(--primary-fg)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      transition-all duration-300 ease-out
      hover:opacity-90
      active:opacity-80
      focus:outline-none focus:ring-1 focus:ring-[var(--primary)] focus:ring-offset-2
    `,
    secondary: `
      bg-[var(--secondary)] text-[var(--secondary-fg)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      transition-all duration-300 ease-out
      hover:bg-[var(--muted)]
      focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:ring-offset-2
    `,
    ghost: `
      bg-transparent text-[var(--fg)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      transition-colors duration-300 ease-out
      hover:bg-[var(--muted)]
      focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:ring-offset-2
    `,
    outline: `
      bg-transparent text-[var(--fg)]
      border border-[var(--border)]
      rounded-[var(--radius)] px-6 py-2.5 font-medium
      transition-all duration-300 ease-out
      hover:border-[var(--fg)]
      focus:outline-none focus:ring-1 focus:ring-[var(--border)] focus:ring-offset-2
    `,
  },
  link: {
    default: `
      text-[var(--fg)]
      transition-all duration-300
      hover:opacity-60
      focus:outline-none focus:opacity-60
    `,
    nav: `
      text-[var(--fg-muted)] font-medium
      transition-colors duration-300
      hover:text-[var(--fg)]
      focus:outline-none
    `,
    muted: `
      text-[var(--fg-muted)]
      transition-colors duration-300
      hover:text-[var(--fg)]
    `,
  },
  card: {
    default: `
      bg-[var(--card)] text-[var(--card-fg)]
      rounded-[var(--radius-lg)] p-8
      border border-[var(--border)]
    `,
    elevated: `
      bg-[var(--card)] text-[var(--card-fg)]
      rounded-[var(--radius-lg)] p-8
      shadow-[var(--shadow)]
    `,
    interactive: `
      bg-[var(--card)] text-[var(--card-fg)]
      rounded-[var(--radius-lg)] p-8
      border border-[var(--border)]
      transition-all duration-300 ease-out
      hover:border-[var(--fg-muted)]
    `,
  },
  badge: {
    default: `
      inline-flex items-center px-2 py-0.5
      rounded text-xs font-medium
      bg-[var(--muted)] text-[var(--muted-fg)]
    `,
    primary: `
      inline-flex items-center px-2 py-0.5
      rounded text-xs font-medium
      bg-[var(--fg)] text-[var(--bg)]
    `,
    secondary: `
      inline-flex items-center px-2 py-0.5
      rounded text-xs font-medium
      bg-[var(--muted)] text-[var(--fg)]
    `,
    accent: `
      inline-flex items-center px-2 py-0.5
      rounded text-xs font-medium
      border border-[var(--border)]
      text-[var(--fg)]
    `,
    outline: `
      inline-flex items-center px-2 py-0.5
      rounded text-xs font-medium
      border border-[var(--border)]
      text-[var(--fg)]
    `,
  },
  input: {
    default: `
      w-full px-4 py-2.5
      bg-transparent text-[var(--fg)]
      border-b border-[var(--border)]
      transition-colors duration-300
      focus:outline-none focus:border-[var(--fg)]
      placeholder:text-[var(--fg-muted)]
    `,
  },
  nav: {
    container: `
      bg-[var(--bg)]
      border-b border-[var(--border)]
    `,
    item: `
      text-[var(--fg-muted)] font-medium px-3 py-2
      transition-colors duration-300
      hover:text-[var(--fg)]
    `,
    itemActive: `
      text-[var(--fg)] font-medium px-3 py-2
    `,
  },
  section: {
    default: `bg-[var(--bg)]`,
    alternate: `bg-[var(--bg-secondary)]`,
  },
  heading: {
    h1: `
      text-4xl md:text-5xl
      font-medium tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h2: `
      text-2xl md:text-3xl
      font-medium tracking-[var(--heading-letter-spacing)]
      text-[var(--fg)]
    `,
    h3: `
      text-lg md:text-xl
      font-medium
      text-[var(--fg)]
    `,
  },
  sectionHeader: `
    text-2xl md:text-3xl font-medium tracking-tight text-[var(--fg)]
  `,
};

// ============================================================================
// VARIANT MAP AND GETTER
// ============================================================================

const variantMap: Record<ThemeId, ComponentVariants> = {
  main: mainVariants,
  brutalist: brutalistVariants,
  'neo-brutalism': neoBrutalismVariants,
  minimalist: minimalistVariants,
};

// Overload signatures
export function getVariant<C extends keyof ComponentVariants>(
  themeId: ThemeId | string,
  component: C
): ComponentVariants[C];
export function getVariant<
  C extends keyof ComponentVariants,
  V extends keyof ComponentVariants[C]
>(themeId: ThemeId | string, component: C, variant: V): string;

// Implementation
export function getVariant<
  C extends keyof ComponentVariants,
  V extends keyof ComponentVariants[C]
>(themeId: ThemeId | string, component: C, variant?: V): string | ComponentVariants[C] {
  const themeVariants = variantMap[themeId as ThemeId] || variantMap.main;
  const componentVariants = themeVariants[component];
  
  // If variant is provided, return the specific variant string
  if (variant !== undefined) {
    return (componentVariants[variant] as string) || '';
  }
  
  // Otherwise return the entire component variants object
  return componentVariants;
}

export type { ComponentVariants };
