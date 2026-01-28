'use client';

import { forwardRef, type AnchorHTMLAttributes } from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { useTheme } from '@/themes';
import { getVariant } from '@/themes/variants';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps {
  variant?: 'default' | 'nav' | 'muted';
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', href, children, ...props }, ref) => {
    const { themeId } = useTheme();
    const variantClasses = getVariant(themeId, 'link', variant);
    
    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(variantClasses, className)}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';
