'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { href: 'https://github.com', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:hello@example.com', icon: Mail, label: 'Email' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'p-2 rounded-[var(--radius)]',
                  'text-[var(--fg-muted)] hover:text-[var(--fg)]',
                  'hover:bg-[var(--muted)] transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--primary)]'
                )}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Copyright and tech */}
          <div className="text-sm text-[var(--fg-muted)] text-center md:text-right">
            <p>© {currentYear} All rights reserved.</p>
            <p className="mt-1">
              Built with{' '}
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--fg)] underline underline-offset-4"
              >
                Next.js
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
