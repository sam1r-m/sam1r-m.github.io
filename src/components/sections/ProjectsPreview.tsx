'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { getFeaturedProjects } from '@/data/projects'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button, SectionHeader } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig } from '@/lib/utils'

export function ProjectsPreview() {
  const projects = getFeaturedProjects()
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  
  return (
    <section className="py-section container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader subtitle="A selection of projects I've worked on recently.">
        Featured Work
      </SectionHeader>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ ...springConfig, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <CardTitle>{project.title}</CardTitle>
                  <span className={cn(
                    'text-sm text-muted-foreground',
                    theme === 'brutalist' && 'font-mono'
                  )}>
                    {project.year}
                  </span>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge variant="outline">+{project.tags.length - 4}</Badge>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/projects">
          <Button variant="secondary" className="group">
            View All Projects
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}
