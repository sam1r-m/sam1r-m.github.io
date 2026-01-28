'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Filter } from 'lucide-react'
import { projects, getAllTags } from '@/data/projects'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button, SectionHeader } from '@/components/ui'
import { useTheme } from '@/themes/theme-provider'
import { cn, getSpringConfig } from '@/lib/utils'

export function ProjectsPage() {
  const { theme } = useTheme()
  const springConfig = getSpringConfig(theme)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  const allTags = getAllTags()
  
  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects
    return projects.filter((p) => p.tags.includes(selectedTag))
  }, [selectedTag])
  
  return (
    <div className="py-section container mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader subtitle="A collection of projects I've built, from web applications to design systems.">
        Projects
      </SectionHeader>
      
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={springConfig}
        className="mb-12"
      >
        <div className={cn(
          'flex items-center gap-2 mb-4 text-sm text-muted-foreground',
          theme === 'brutalist' && 'font-mono uppercase tracking-wide'
        )}>
          <Filter size={16} />
          <span>Filter by technology:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTag(null)}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </motion.div>
      
      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTag ?? 'all'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: index * 0.05 }}
              layout
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <CardTitle>{project.title}</CardTitle>
                    <span className={cn(
                      'text-sm text-muted-foreground shrink-0',
                      theme === 'brutalist' && 'font-mono'
                    )}>
                      {project.year}
                    </span>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  {project.longDescription && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.longDescription}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className={cn(
                          'cursor-pointer',
                          selectedTag === tag && 'bg-primary text-primary-foreground'
                        )}
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="gap-4">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          No projects found with the selected filter.
        </motion.div>
      )}
    </div>
  )
}
