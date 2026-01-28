'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/themes';
import { getVariant } from '@/themes/variants';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const { themeId } = useTheme();
    const variantClasses = getVariant(themeId, 'badge', variant);
    
    return (
      <span
        ref={ref}
        className={cn(variantClasses, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
