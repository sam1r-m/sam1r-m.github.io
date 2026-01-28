'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/themes';
import { getVariant } from '@/themes/variants';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    const { themeId } = useTheme();
    const variantClasses = getVariant(themeId, 'input', 'default');
    
    return (
      <input
        ref={ref}
        type={type}
        className={cn(variantClasses, className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
