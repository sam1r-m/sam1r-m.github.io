'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { Section, Heading, Card, Badge, Button } from '@/components/ui';
import { projects, getAllTags } from '@/data/projects';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allTags = getAllTags();
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = selectedTag
    ? projects.filter((p) => p.tags.includes(selectedTag))
    : projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Section>
      {/* Header */}
      <div className="mb-12">
        <Heading as="h1">Projects</Heading>
        <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-2xl">
          A collection of projects I&apos;ve worked on, from full-stack applications
          to design systems and open-source contributions.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-[var(--fg-muted)]" />
          <span className="text-sm font-medium text-[var(--fg-muted)]">Filter by tag:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            All ({projects.length})
          </Button>
          {allTags.map((tag) => {
            const count = projects.filter((p) => p.tags.includes(tag)).length;
            return (
              <Button
                key={tag}
                variant={selectedTag === tag ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag} ({count})
              </Button>
            );
          })}
        </div>
      </div>

      {/* Projects grid */}
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout={!prefersReducedMotion}
            >
              <Card variant="interactive" className="h-full flex flex-col">
                {/* Project image placeholder */}
                <div className="aspect-video bg-[var(--muted)] rounded-[var(--radius)] mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-[var(--fg-muted)] text-sm">
                    {project.title}
                  </span>
                  {project.featured && (
                    <Badge variant="primary" className="absolute top-2 right-2">
                      Featured
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-[var(--fg-muted)]">{project.year}</span>
                  </div>
                  <p className="text-[var(--fg-muted)] text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTag === tag ? 'primary' : 'secondary'}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTag(tag);
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-1.5 text-sm',
                          'text-[var(--fg-muted)] hover:text-[var(--primary)]',
                          'transition-colors'
                        )}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'flex items-center gap-1.5 text-sm',
                          'text-[var(--fg-muted)] hover:text-[var(--primary)]',
                          'transition-colors'
                        )}
                      >
                        <Github className="w-4 h-4" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[var(--fg-muted)]">
            No projects found with the selected tag.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setSelectedTag(null)}
          >
            Clear Filter
          </Button>
        </div>
      )}
    </Section>
  );
}
