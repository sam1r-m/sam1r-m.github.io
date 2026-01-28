import {
  Inter,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Libre_Baskerville,
  Space_Grotesk,
  DM_Sans,
  Outfit,
  Cormorant,
} from 'next/font/google';

/**
 * Font Definitions
 * 
 * Fonts are loaded here and exported for use in the layout.
 * Each theme uses different font combinations:
 * 
 * - Main: Inter (sans), JetBrains Mono (mono)
 * - Brutalist: IBM Plex Mono (mono body), Libre Baskerville (serif headings)
 * - Neo-Brutalism: Space Grotesk (display), DM Sans (body)
 * - Minimalist: Outfit (sans), Cormorant (serif display)
 */

// Main theme fonts
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// Brutalist theme fonts (REQUIRED: IBM Plex Mono + Libre Baskerville)
export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

// Neo-Brutalism theme fonts
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

// Minimalist theme fonts
export const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const cormorant = Cormorant({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

/**
 * Combined font variable class string
 * Apply this to the html element to make all font CSS variables available
 */
export const fontVariables = [
  inter.variable,
  jetbrainsMono.variable,
  ibmPlexMono.variable,
  libreBaskerville.variable,
  spaceGrotesk.variable,
  dmSans.variable,
  outfit.variable,
  cormorant.variable,
].join(' ');
