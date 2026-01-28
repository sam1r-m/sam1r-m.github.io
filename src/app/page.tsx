import { Hero } from '@/components/hero';
import { FeaturedProjects } from '@/components/sections/featured-projects';
import { LatestPosts } from '@/components/sections/latest-posts';
import { AboutPreview } from '@/components/sections/about-preview';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <LatestPosts />
      <AboutPreview />
    </>
  );
}
