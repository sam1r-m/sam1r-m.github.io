'use client';

import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Section, Heading, Card, Badge, Button } from '@/components/ui';
import { resume } from '@/data/resume';
import { useReducedMotion } from '@/themes';
import { cn } from '@/lib/utils';

export default function ResumePage() {
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
    <Section>
      <motion.div
        variants={prefersReducedMotion ? {} : containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Heading as="h1">{resume.name}</Heading>
              <p className="text-xl text-[var(--primary)] mt-1">{resume.title}</p>
            </div>
            <a href="/resume.pdf" download>
              <Button variant="primary">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </a>
          </div>

          {/* Contact info */}
          <div className="mt-6 flex flex-wrap gap-4 text-[var(--fg-muted)]">
            <a
              href={`mailto:${resume.email}`}
              className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors"
            >
              <Mail className="w-4 h-4" />
              {resume.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {resume.location}
            </span>
          </div>

          {/* Summary */}
          <p className="mt-6 text-lg text-[var(--fg-muted)] leading-relaxed">
            {resume.summary}
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-[var(--primary)]" />
            <Heading as="h2">Experience</Heading>
          </div>
          <div className="space-y-6">
            {resume.experience.map((exp, index) => (
              <Card key={exp.id} variant="default">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-[var(--primary)]">{exp.company}</p>
                  </div>
                  <div className="text-sm text-[var(--fg-muted)] md:text-right">
                    <p>{exp.location}</p>
                    <p>
                      {exp.startDate} — {exp.endDate || 'Present'}
                    </p>
                  </div>
                </div>
                <p className="text-[var(--fg-muted)] mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className={cn(
                        'text-sm text-[var(--fg-muted)]',
                        'before:content-["→"] before:mr-2 before:text-[var(--primary)]'
                      )}
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
            <Heading as="h2">Education</Heading>
          </div>
          <div className="space-y-6">
            {resume.education.map((edu) => (
              <Card key={edu.id} variant="default">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-[var(--primary)]">{edu.institution}</p>
                    <p className="text-sm text-[var(--fg-muted)]">{edu.field}</p>
                  </div>
                  <div className="text-sm text-[var(--fg-muted)] md:text-right">
                    <p>
                      {edu.startDate} — {edu.endDate}
                    </p>
                  </div>
                </div>
                {edu.highlights && (
                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className={cn(
                          'text-sm text-[var(--fg-muted)]',
                          'before:content-["→"] before:mr-2 before:text-[var(--primary)]'
                        )}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants}>
          <Heading as="h2" className="mb-6">Skills</Heading>
          <div className="grid md:grid-cols-2 gap-6">
            {resume.skills.map((skillGroup) => (
              <Card key={skillGroup.category} variant="default">
                <h3 className="font-semibold mb-3">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
