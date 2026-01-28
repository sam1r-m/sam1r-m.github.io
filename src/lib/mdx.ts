import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * MDX Utilities
 * 
 * Handles reading and parsing MDX files from the content/journal directory.
 * Uses gray-matter for frontmatter parsing and next-mdx-remote for rendering.
 */

export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published?: boolean;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

const JOURNAL_PATH = path.join(process.cwd(), 'content', 'journal');

/**
 * Calculate reading time for content
 */
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get all post slugs for static generation
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(JOURNAL_PATH)) {
    return [];
  }
  
  return fs
    .readdirSync(JOURNAL_PATH)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(JOURNAL_PATH, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      summary: data.summary || '',
      tags: data.tags || [],
      published: data.published !== false,
    },
    readingTime: calculateReadingTime(content),
    content,
  };
}

/**
 * Get all posts sorted by date (newest first)
 */
export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post || post.frontmatter.published === false) return null;
      
      // Return only metadata, not content
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  
  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
