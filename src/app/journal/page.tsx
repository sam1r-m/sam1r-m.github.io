import { Metadata } from 'next';
import { JournalList } from './journal-list';
import { getAllPosts, getAllTags } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Substack',
  description: 'Thoughts, ideas and reflections from my life.',
};

export default function JournalPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <JournalList posts={posts} tags={tags} />;
}
