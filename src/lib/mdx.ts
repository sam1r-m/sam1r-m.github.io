import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * MDX Utilities
 * 
 * Handles reading and parsing MDX files from the content/journal directory.
 * Uses gray-matter for frontmatter parsing and next-mdx-remote for rendering.
 */

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

const JOURNAL_PATH = path.join(process.cwd(), 'content', 'journal');

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
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    summary: data.summary || '',
    tags: data.tags || [],
    published: data.published !== false,
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
      if (!post || post.published === false) return null;
      
      // Return only metadata, not content
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get all unique tags from posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}
