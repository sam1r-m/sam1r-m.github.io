import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { PostWrapper } from './post-wrapper';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
  };
}

// Custom MDX components for consistent styling - these don't use hooks
const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-relaxed" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-[var(--primary)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 pl-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 pl-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 pl-4 border-l-4 border-[var(--primary)] italic text-[var(--fg-muted)]"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = typeof props.children === 'string' && props.children.includes('\n');
    if (isBlock) {
      return <code {...props} />;
    }
    return (
      <code
        className="px-1.5 py-0.5 bg-[var(--muted)] rounded text-sm font-mono"
        {...props}
      />
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 p-4 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-x-auto text-sm"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-[var(--border)]" />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-6 rounded-[var(--radius-lg)] max-w-full"
      alt={props.alt || ''}
      {...props}
    />
  ),
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || post.frontmatter.published === false) {
    notFound();
  }

  return (
    <PostWrapper post={post}>
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </PostWrapper>
  );
}
