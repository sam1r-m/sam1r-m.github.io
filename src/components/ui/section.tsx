'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/themes';
import { getVariant } from '@/themes/variants';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate';
  container?: boolean;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', container = true, children, ...props }, ref) => {
    const { themeId } = useTheme();
    const variantClasses = getVariant(themeId, 'section', variant);
    
    return (
      <section
        ref={ref}
        className={cn(variantClasses, 'py-16 md:py-24', className)}
        {...props}
      >
        {container ? (
          <div className="container mx-auto px-4 md:px-6">{children}</div>
        ) : (
          children
        )}
      </section>
    );
  }
);

Section.displayName = 'Section';
