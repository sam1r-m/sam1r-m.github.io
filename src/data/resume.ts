export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null; // null = present
  description: string;
  highlights: string[];
  technologies?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  highlights?: string[];
  gpa?: string;
  honors?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Resume {
  name: string;
  title: string;
  email: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications?: string[];
}

export const resume: Resume = {
  name: 'Alex Developer',
  title: 'Senior Full-Stack Developer',
  email: 'hello@example.com',
  location: 'San Francisco, CA',
  summary: `Experienced full-stack developer with 6+ years building scalable web applications. 
  Passionate about clean code, user experience, and mentoring junior developers. 
  Led teams of up to 8 engineers and delivered products used by millions.`,
  
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Inc.',
      role: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: null,
      description: 'Leading frontend architecture and development for a B2B SaaS platform.',
      highlights: [
        'Architected and led migration from legacy codebase to Next.js, improving performance by 40%',
        'Built real-time collaboration features serving 50k+ daily active users',
        'Mentored 4 junior developers and established code review best practices',
        'Reduced bundle size by 60% through code splitting and lazy loading',
      ],
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      role: 'Full-Stack Developer',
      location: 'Remote',
      startDate: '2020-03',
      endDate: '2021-12',
      description: 'Built and maintained core product features for a fintech startup.',
      highlights: [
        'Developed payment processing system handling $2M+ monthly transactions',
        'Implemented OAuth 2.0 authentication with 99.9% uptime',
        'Created automated testing pipeline reducing bugs in production by 35%',
        'Built internal admin dashboard used by 20+ support staff',
      ],
    },
    {
      id: 'exp-3',
      company: 'Digital Agency Co.',
      role: 'Frontend Developer',
      location: 'New York, NY',
      startDate: '2018-06',
      endDate: '2020-02',
      description: 'Developed responsive web applications for enterprise clients.',
      highlights: [
        'Built 15+ client projects from concept to deployment',
        'Introduced component library reducing development time by 25%',
        'Achieved 95+ Lighthouse scores across all client projects',
        'Collaborated directly with designers to ensure pixel-perfect implementations',
      ],
    },
  ],
  
  education: [
    {
      id: 'edu-1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2014',
      endDate: '2018',
      highlights: [
        'Graduated with Honors',
        'Teaching Assistant for Web Development course',
        'Led student tech club with 50+ members',
      ],
    },
  ],
  
  skills: [
    {
      category: 'Languages',
      items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'],
    },
    {
      category: 'DevOps & Tools',
      items: ['AWS', 'Docker', 'CI/CD', 'Git', 'Vercel'],
    },
    {
      category: 'Other',
      items: ['System Design', 'Technical Writing', 'Team Leadership', 'Agile'],
    },
  ],
};
