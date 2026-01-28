'use client';

import { useTheme } from '@/themes';
import type { ThemeId } from '@/themes/registry';
import { MainHero } from './main-hero';
import { BrutalistHero } from './brutalist-hero';
import { NeoBrutalHero } from './neo-brutal-hero';
import { MinimalistHero } from './minimalist-hero';

/**
 * Hero Router
 * 
 * Selects and renders the appropriate hero implementation based on the active theme.
 * Each theme has its own distinct hero with different:
 * - Layout and structure
 * - Typography treatment
 * - Animation language
 * - Visual elements
 * 
 * To add a new theme's hero:
 * 1. Create a new hero component in this folder
 * 2. Add it to the heroComponents map below
 */

const heroComponents: Record<ThemeId, React.ComponentType> = {
  main: MainHero,
  brutalist: BrutalistHero,
  'neo-brutalism': NeoBrutalHero,
  minimalist: MinimalistHero,
};

export function Hero() {
  const { themeId } = useTheme();
  const HeroComponent = heroComponents[themeId] || MainHero;
  
  return <HeroComponent />;
}

// Re-export individual heroes for direct use if needed
export { MainHero } from './main-hero';
export { BrutalistHero } from './brutalist-hero';
export { NeoBrutalHero } from './neo-brutal-hero';
export { MinimalistHero } from './minimalist-hero';
