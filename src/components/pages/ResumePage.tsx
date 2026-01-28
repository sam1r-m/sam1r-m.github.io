'use client'

import { motion } from 'framer-motion'
import { Download, MapPin, Mail, Briefcase, GraduationCap, Award } from 'lucide-react'
import { resume } from '@/data/resume'
import { Button, Badge, SectionHeader } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig } from '@/lib/utils'

export function ResumePage() {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  
  const formatDateRange = (start: string, end: string | null) => {
    const formatDate = (d: string) => {
      const date = new Date(d)
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    }
    return `${formatDate(start)} — ${end === null ? 'Present' : formatDate(end)}`
  }
  
  return (
    <div className="py-section container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className={cn(
              'text-4xl md:text-5xl font-bold mb-2',
              theme === 'brutalist' && 'font-serif uppercase tracking-wide',
              theme === 'minimalist' && 'font-serif'
            )}>
              {resume.name}
            </h1>
            <p className={cn(
              'text-xl text-muted-foreground mb-4',
              theme === 'brutalist' && 'font-mono'
            )}>
              {resume.title}
            </p>
            <div className={cn(
              'flex flex-wrap gap-4 text-sm text-muted-foreground',
              theme === 'brutalist' && 'font-mono'
            )}>
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                {resume.location}
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} />
                {resume.email}
              </span>
            </div>
          </div>
          
          <a href="/resume.pdf" download>
            <Button className="shrink-0">
              <Download size={18} className="mr-2" />
              Download PDF
            </Button>
          </a>
        </div>
        
        {/* Summary */}
        <p className={cn(
          'mt-8 text-lg text-muted-foreground leading-relaxed',
          theme === 'brutalist' && 'font-mono border-l-2 border-foreground pl-4',
          theme === 'minimalist' && 'border-l border-border pl-4'
        )}>
          {resume.summary}
        </p>
      </motion.div>
      
      {/* Experience */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springConfig}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <Briefcase size={24} className={cn(
            theme === 'main' && 'text-primary',
            theme === 'neo-brutalism' && 'text-accent'
          )} />
          <h2 className={cn(
            'text-2xl font-bold',
            theme === 'brutalist' && 'font-serif uppercase tracking-wide',
            theme === 'minimalist' && 'font-serif'
          )}>
            Experience
          </h2>
        </div>
        
        <div className="space-y-8">
          {resume.experience.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...springConfig, delay: index * 0.1 }}
              className={cn(
                'relative pl-6 border-l-2 border-border',
                theme === 'brutalist' && 'border-foreground',
                theme === 'neo-brutalism' && 'border-[3px]'
              )}
            >
              {/* Timeline dot */}
              <div className={cn(
                'absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary',
                theme === 'brutalist' && 'rounded-none',
                theme === 'neo-brutalism' && 'border-2 border-foreground'
              )} />
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                <h3 className={cn(
                  'text-xl font-semibold',
                  theme === 'brutalist' && 'font-serif',
                  theme === 'minimalist' && 'font-serif'
                )}>
                  {exp.role}
                </h3>
                <span className={cn(
                  'text-sm text-muted-foreground',
                  theme === 'brutalist' && 'font-mono uppercase tracking-wide'
                )}>
                  {formatDateRange(exp.startDate, exp.endDate)}
                </span>
              </div>
              
              <p className={cn(
                'text-muted-foreground mb-3',
                theme === 'brutalist' && 'font-mono'
              )}>
                {exp.company} · {exp.location}
              </p>
              
              <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
              <ul className="space-y-2 mb-4">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              
              {exp.technologies && (
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Education */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springConfig}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap size={24} className={cn(
            theme === 'main' && 'text-primary',
            theme === 'neo-brutalism' && 'text-accent'
          )} />
          <h2 className={cn(
            'text-2xl font-bold',
            theme === 'brutalist' && 'font-serif uppercase tracking-wide',
            theme === 'minimalist' && 'font-serif'
          )}>
            Education
          </h2>
        </div>
        
        {resume.education.map((edu) => (
          <div key={edu.institution} className={cn(
            'p-6 border border-border rounded-theme',
            theme === 'brutalist' && 'border-2',
            theme === 'neo-brutalism' && 'border-[3px] shadow-[4px_4px_0_0_var(--foreground)]'
          )}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
              <h3 className={cn(
                'text-xl font-semibold',
                theme === 'brutalist' && 'font-serif',
                theme === 'minimalist' && 'font-serif'
              )}>
                {edu.institution}
              </h3>
              <span className={cn(
                'text-sm text-muted-foreground',
                theme === 'brutalist' && 'font-mono uppercase tracking-wide'
              )}>
                {edu.startDate} — {edu.endDate}
              </span>
            </div>
            <p className="text-muted-foreground">
              {edu.degree} in {edu.field}
            </p>
            {edu.gpa && <p className="text-sm text-muted-foreground mt-1">GPA: {edu.gpa}</p>}
            {edu.honors && (
              <div className="flex flex-wrap gap-2 mt-3">
                {edu.honors.map((honor) => (
                  <Badge key={honor}>{honor}</Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </motion.section>
      
      {/* Skills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={springConfig}
        className="mb-16"
      >
        <div className="flex items-center gap-3 mb-8">
          <Award size={24} className={cn(
            theme === 'main' && 'text-primary',
            theme === 'neo-brutalism' && 'text-accent'
          )} />
          <h2 className={cn(
            'text-2xl font-bold',
            theme === 'brutalist' && 'font-serif uppercase tracking-wide',
            theme === 'minimalist' && 'font-serif'
          )}>
            Skills
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6">
          {resume.skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className={cn(
                'text-lg font-semibold mb-3',
                theme === 'brutalist' && 'font-mono uppercase tracking-wide text-sm',
                theme === 'minimalist' && 'text-muted-foreground'
              )}>
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
      
      {/* Certifications */}
      {resume.certifications && resume.certifications.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springConfig}
        >
          <h2 className={cn(
            'text-2xl font-bold mb-6',
            theme === 'brutalist' && 'font-serif uppercase tracking-wide',
            theme === 'minimalist' && 'font-serif'
          )}>
            Certifications
          </h2>
          <div className="flex flex-wrap gap-3">
            {resume.certifications.map((cert) => (
              <Badge key={cert}>{cert}</Badge>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  )
}
