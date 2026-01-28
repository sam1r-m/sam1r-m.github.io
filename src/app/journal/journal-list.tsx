'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import NextLink from 'next/link';
import { Section, Heading, Card, Badge, Button } from '@/components/ui';
import { useReducedMotion } from '@/themes';
import { formatDate } from '@/lib/utils';
import type { PostMeta } from '@/lib/mdx';

interface JournalListProps {
  posts: PostMeta[];
  tags: string[];
}

export function JournalList({ posts, tags }: JournalListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const filteredPosts = selectedTag
    ? posts.filter((p) =>
        p.frontmatter.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      )
    : posts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Section>
      {/* Header */}
      <div className="mb-12">
        <Heading as="h1">Journal</Heading>
        <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-2xl">
          Thoughts on code, design, and the craft of building software.
          Writing helps me learn and hopefully helps others too.
        </p>
      </div>

      {/* Filters */}
      {tags.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-[var(--fg-muted)]" />
            <span className="text-sm font-medium text-[var(--fg-muted)]">
              Filter by topic:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All ({posts.length})
            </Button>
            {tags.map((tag) => {
              const count = posts.filter((p) =>
                p.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
              ).length;
              return (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Posts list */}
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout={!prefersReducedMotion}
            >
              <NextLink href={`/journal/${post.slug}`}>
                <Card variant="interactive" className="group">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold group-hover:text-[var(--primary)] transition-colors">
                        {post.frontmatter.title}
                      </h2>
                      <p className="mt-2 text-[var(--fg-muted)]">
                        {post.frontmatter.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-4">
                        <span className="flex items-center gap-1.5 text-sm text-[var(--fg-muted)]">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.frontmatter.date)}
                        </span>
                        <div className="flex gap-2">
                          {post.frontmatter.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant={selectedTag === tag ? 'primary' : 'secondary'}
                            >
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
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--fg-muted)]">
            {posts.length === 0
              ? 'No posts yet. Check back soon!'
              : 'No posts found with the selected tag.'}
          </p>
          {selectedTag && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setSelectedTag(null)}
            >
              Clear Filter
            </Button>
          )}
        </div>
      )}
    </Section>
  );
}
