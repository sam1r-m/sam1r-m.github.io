'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { PostMeta } from '@/lib/mdx'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, SectionHeader } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig, formatDate } from '@/lib/utils'

interface JournalPageProps {
  posts: PostMeta[]
}

export function JournalPage({ posts }: JournalPageProps) {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    posts.forEach((post) => post.frontmatter.tags.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [posts])
  
  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts
    return posts.filter((p) => p.frontmatter.tags.includes(selectedTag))
  }, [posts, selectedTag])
  
  return (
    <div className="py-section container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <SectionHeader subtitle="Thoughts on development, design, and building for the web.">
        Substack
      </SectionHeader>
      
      {/* Tags filter */}
      {allTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="mb-12"
        >
          <div className={cn(
            'flex items-center gap-2 mb-4 text-sm text-muted-foreground',
            theme === 'brutalist' && 'font-mono uppercase tracking-wide'
          )}>
            <Tag size={16} />
            <span>Filter by topic:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Posts list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTag ?? 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: index * 0.05 }}
            >
              <Link href={`/journal/${post.slug}`}>
                <Card className="group cursor-pointer">
                  <CardHeader>
                    <div className={cn(
                      'flex items-center gap-4 text-sm text-muted-foreground mb-2',
                      theme === 'brutalist' && 'font-mono uppercase tracking-wide text-xs'
                    )}>
                      <time dateTime={post.frontmatter.date}>
                        {formatDate(post.frontmatter.date)}
                      </time>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readingTime}
                      </span>
                    </div>
                    <CardTitle className={cn(
                      'text-2xl group-hover:text-primary transition-colors',
                      theme === 'minimalist' && 'font-serif'
                    )}>
                      {post.frontmatter.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.frontmatter.summary}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.frontmatter.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          {posts.length === 0 
            ? 'No posts yet. Check back soon!'
            : 'No posts found with the selected tag.'}
        </motion.div>
      )}
    </div>
  )
}
