'use client';

import { forwardRef, type HTMLAttributes, type ElementType } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/themes';
import { getVariant } from '@/themes/variants';

type HeadingLevel = 'h1' | 'h2' | 'h3';

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = 'h2', children, ...props }, ref) => {
    const { themeId } = useTheme();
    const variantClasses = getVariant(themeId, 'heading', as);
    const Component = as as ElementType;
    
    return (
      <Component
        ref={ref}
        className={cn(variantClasses, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';
