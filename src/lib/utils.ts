import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes intelligently.
 * Use this for all dynamic class name composition.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get spring animation config based on theme
 */
export function getSpringConfig(theme: string) {
  switch (theme) {
    case 'brutalist':
      return { type: 'tween' as const, duration: 0.1 };
    case 'neo-brutalism':
      return { type: 'spring' as const, stiffness: 200, damping: 12 };
    case 'minimalist':
      return { type: 'tween' as const, duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };
    default:
      return { type: 'spring' as const, stiffness: 300, damping: 30 };
  }
}

/**
 * Get variant classes for a component based on theme
 * Re-exported from themes/variants for convenience
 */
export { getVariant } from '@/themes/variants';

/**
 * Format a date string for display
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Format a date as a relative time string (e.g., "2 days ago")
 */
export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);
  const diffInDays = Math.floor((now.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

/**
 * Slugify a string for use in URLs
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}
