'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, SectionHeader } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig, formatDate } from '@/lib/utils'

// Sample posts for static rendering (will be replaced with actual MDX posts)
const samplePosts = [
  {
    slug: 'building-scalable-design-systems',
    frontmatter: {
      title: 'Building Scalable Design Systems',
      date: '2024-01-15',
      summary: 'Lessons learned from building and maintaining design systems at scale, including component architecture and theming strategies.',
      tags: ['Design Systems', 'React', 'CSS'],
    },
    readingTime: '8 min read',
  },
  {
    slug: 'the-art-of-clean-code',
    frontmatter: {
      title: 'The Art of Clean Code',
      date: '2024-01-08',
      summary: 'Exploring principles and practices that make code more readable, maintainable, and enjoyable to work with.',
      tags: ['Clean Code', 'Best Practices'],
    },
    readingTime: '6 min read',
  },
]

export function JournalPreview() {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  
  return (
    <section className={cn(
      'py-section container mx-auto px-4 sm:px-6 lg:px-8',
      theme === 'brutalist' && 'border-t-2 border-foreground'
    )}>
      <SectionHeader subtitle="Thoughts on development, design, and building for the web.">
        Latest Writings
      </SectionHeader>
      
      <div className="grid md:grid-cols-2 gap-6">
        {samplePosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...springConfig, delay: index * 0.1 }}
          >
            <Link href={`/journal/${post.slug}`}>
              <Card className="h-full group cursor-pointer">
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
                    'group-hover:text-primary transition-colors',
                    theme === 'minimalist' && 'font-serif'
                  )}>
                    {post.frontmatter.title}
                  </CardTitle>
                  <CardDescription>
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
      </div>
      
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/journal">
          <Button variant="secondary" className="group">
            Read All Posts
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
