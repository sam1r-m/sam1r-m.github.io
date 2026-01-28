'use client';

import { motion, type Variants } from 'framer-motion';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import NextLink from 'next/link';
import { useReducedMotion } from '@/themes';
import { formatDate } from '@/lib/utils';
import type { PostMeta } from '@/lib/mdx';

interface PostWrapperProps {
  post: PostMeta;
  children: React.ReactNode;
}

export function PostWrapper({ post, children }: PostWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--bg)]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.article
          variants={prefersReducedMotion ? undefined : containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          {/* Back link */}
          <motion.div variants={itemVariants} className="mb-8">
            <NextLink
              href="/journal"
              className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </NextLink>
          </motion.div>

          {/* Header */}
          <motion.header variants={itemVariants} className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{post.frontmatter.title}</h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-4 text-[var(--fg-muted)]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--muted)] text-[var(--muted-fg)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {post.frontmatter.summary && (
              <p className="mt-6 text-lg text-[var(--fg-muted)] leading-relaxed">
                {post.frontmatter.summary}
              </p>
            )}
          </motion.header>

          {/* Content */}
          <motion.div variants={itemVariants}>
            {children}
          </motion.div>

          {/* Footer */}
          <motion.footer
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-[var(--border)]"
          >
            <NextLink
              href="/journal"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-transparent text-[var(--fg)] border border-[var(--border)] rounded-[var(--radius)] hover:bg-[var(--muted)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </NextLink>
          </motion.footer>
        </motion.article>
      </div>
    </section>
  );
}
