import { Metadata } from 'next';
import { JournalList } from './journal-list';
import { getAllPosts, getAllTags } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on code, design, and building software.',
};

export default function JournalPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <JournalList posts={posts} tags={tags} />;
}
