'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/themes';
import { getVariant } from '@/themes/variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-sm px-4 py-1.5',
  md: '', // Uses variant default
  lg: 'text-lg px-8 py-3',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const { themeId } = useTheme();
    const variantClasses = getVariant(themeId, 'button', variant);
    
    return (
      <button
        ref={ref}
        className={cn(variantClasses, size !== 'md' && sizeClasses[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
