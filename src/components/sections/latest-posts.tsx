'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import NextLink from 'next/link';
import { Section, Heading, Card, Badge, Button } from '@/components/ui';
import { useReducedMotion } from '@/themes';
import { formatDate } from '@/lib/utils';

// Sample posts - in production, this would come from MDX
const samplePosts = [
  {
    slug: 'building-accessible-components',
    title: 'Building Accessible Components from Scratch',
    summary: 'Learn how to create truly accessible UI components that work for everyone.',
    date: '2024-01-15',
    tags: ['Accessibility', 'React', 'Best Practices'],
  },
  {
    slug: 'modern-css-techniques',
    title: 'Modern CSS Techniques I Use Every Day',
    summary: 'A collection of CSS patterns and techniques that have transformed my workflow.',
    date: '2024-01-08',
    tags: ['CSS', 'Web Development'],
  },
  {
    slug: 'typescript-patterns',
    title: 'TypeScript Patterns for Large Applications',
    summary: 'Practical patterns for maintaining type safety in growing codebases.',
    date: '2024-01-01',
    tags: ['TypeScript', 'Architecture'],
  },
];

export function LatestPosts() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
  };

  return (
    <Section>
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="flex items-end justify-between mb-12">
          <div>
            <Heading as="h2">Latest Thoughts</Heading>
            <p className="mt-2 text-[var(--fg-muted)]">
              Writing about code, design, and the craft of building software.
            </p>
          </div>
          <NextLink href="/journal" className="hidden md:block">
            <Button variant="ghost">
              Read All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </NextLink>
        </motion.div>

        {/* Posts list */}
        <div className="space-y-6">
          {samplePosts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <NextLink href={`/journal/${post.slug}`}>
                <Card variant="interactive" className="group">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold group-hover:text-[var(--primary)] transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-[var(--fg-muted)] text-sm">
                        {post.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-[var(--fg-muted)]">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:block">
                      <ArrowRight className="w-5 h-5 text-[var(--fg-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Card>
              </NextLink>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div variants={itemVariants} className="mt-8 text-center md:hidden">
          <NextLink href="/journal">
            <Button variant="outline">
              Read All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </NextLink>
        </motion.div>
      </motion.div>
    </Section>
  );
}
