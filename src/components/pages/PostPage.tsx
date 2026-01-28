'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { Post } from '@/lib/mdx'
import { Badge, Button } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig, formatDate } from '@/lib/utils'

interface PostPageProps {
  post: Post
}

// Custom MDX components
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold mt-12 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold mt-10 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold mt-8 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-relaxed" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-primary hover:underline" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-muted p-4 rounded-theme overflow-x-auto my-6 text-sm" {...props} />
  ),
}

export function PostPage({ post }: PostPageProps) {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  
  return (
    <article className="py-section container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={springConfig}
        className="mb-8"
      >
        <Link href="/journal">
          <Button variant="ghost" size="sm" className="group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Button>
        </Link>
      </motion.div>
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="mb-12"
      >
        {/* Meta */}
        <div className={cn(
          'flex items-center gap-4 text-sm text-muted-foreground mb-4',
          theme === 'brutalist' && 'font-mono uppercase tracking-wide text-xs'
        )}>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>
        
        {/* Title */}
        <h1 className={cn(
          'text-4xl md:text-5xl font-bold mb-6',
          theme === 'brutalist' && 'font-serif uppercase tracking-wide',
          theme === 'minimalist' && 'font-serif'
        )}>
          {post.frontmatter.title}
        </h1>
        
        {/* Summary */}
        <p className={cn(
          'text-xl text-muted-foreground mb-6',
          theme === 'brutalist' && 'font-mono',
          theme === 'minimalist' && 'italic'
        )}>
          {post.frontmatter.summary}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.frontmatter.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </motion.header>
      
      {/* Divider */}
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ ...springConfig, delay: 0.2 }}
        className={cn(
          'border-border mb-12',
          theme === 'brutalist' && 'border-foreground border-t-2',
          theme === 'neo-brutalism' && 'border-foreground border-t-[3px]'
        )}
      />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className={cn(
          'prose prose-lg max-w-none',
          'prose-headings:scroll-mt-20',
          theme === 'brutalist' && 'prose-headings:font-serif prose-headings:uppercase prose-headings:tracking-wide',
          theme === 'minimalist' && 'prose-headings:font-serif'
        )}
      >
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeHighlight, rehypeSlug],
            },
          }}
        />
      </motion.div>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-16 pt-8 border-t border-border"
      >
        <Link href="/journal">
          <Button variant="secondary" className="group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            More Posts
          </Button>
        </Link>
      </motion.footer>
    </article>
  )
}
