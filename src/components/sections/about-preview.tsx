'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Briefcase, Code } from 'lucide-react';
import NextLink from 'next/link';
import { Section, Heading, Button, Badge } from '@/components/ui';
import { useReducedMotion } from '@/themes';
import { resume } from '@/data/resume';

export function AboutPreview() {
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

  const topSkills = resume.skills.flatMap((s) => s.items).slice(0, 8);

  return (
    <Section variant="alternate">
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* Left column - Text content */}
        <motion.div variants={itemVariants}>
          <Heading as="h2">About Me</Heading>
          <p className="mt-4 text-lg text-[var(--fg-muted)]">
            {resume.summary}
          </p>

          {/* Quick info */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-[var(--fg-muted)]">
              <MapPin className="w-5 h-5 text-[var(--primary)]" />
              <span>{resume.location}</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--fg-muted)]">
              <Briefcase className="w-5 h-5 text-[var(--primary)]" />
              <span>{resume.title}</span>
            </div>
            <div className="flex items-center gap-3 text-[var(--fg-muted)]">
              <Code className="w-5 h-5 text-[var(--primary)]" />
              <span>{resume.experience.length}+ years of experience</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <NextLink href="/resume">
              <Button variant="primary">
                View Full Resume
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </NextLink>
          </div>
        </motion.div>

        {/* Right column - Skills */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4">Technologies I work with</h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm py-1.5 px-3">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Recent experience */}
          <div className="mt-8 pt-8 border-t border-[var(--border)]">
            <h3 className="text-lg font-semibold mb-4">Current Role</h3>
            <div className="space-y-1">
              <p className="font-medium">{resume.experience[0].role}</p>
              <p className="text-[var(--fg-muted)]">{resume.experience[0].company}</p>
              <p className="text-sm text-[var(--fg-muted)]">
                {resume.experience[0].startDate} — Present
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
