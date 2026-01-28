'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import NextLink from 'next/link';
import { Section, Heading, Card, Badge, Button } from '@/components/ui';
import { getFeaturedProjects } from '@/data/projects';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';

export function FeaturedProjects() {
  const projects = getFeaturedProjects();
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
  };

  return (
    <Section variant="alternate">
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="flex items-end justify-between mb-12">
          <div>
            <Heading as="h2">Featured Projects</Heading>
            <p className="mt-2 text-[var(--fg-muted)]">
              A selection of recent work I&apos;m proud of.
            </p>
          </div>
          <NextLink href="/projects" className="hidden md:block">
            <Button variant="ghost">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </NextLink>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card variant="interactive" className="h-full flex flex-col">
                {/* Project image placeholder */}
                <div className="aspect-video bg-[var(--muted)] rounded-[var(--radius)] mb-4 flex items-center justify-center">
                  <span className="text-[var(--fg-muted)] text-sm">
                    {project.title}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-[var(--fg-muted)] text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="default">+{project.tags.length - 3}</Badge>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-1 text-sm text-[var(--fg-muted)]',
                          'hover:text-[var(--fg)] transition-colors'
                        )}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-1 text-sm text-[var(--fg-muted)]',
                          'hover:text-[var(--fg)] transition-colors'
                        )}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <motion.div variants={itemVariants} className="mt-8 text-center md:hidden">
          <NextLink href="/projects">
            <Button variant="outline">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </NextLink>
        </motion.div>
      </motion.div>
    </Section>
  );
}
