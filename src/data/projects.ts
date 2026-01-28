export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  links: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration.',
    longDescription: `A full-featured e-commerce platform that handles everything from product management to payment processing. Built with performance and accessibility in mind.

Key features include:
- Server-side rendering for optimal SEO
- Stripe integration for secure payments
- Admin dashboard for inventory management
- Real-time order tracking`,
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
    },
    featured: true,
    year: 2024,
  },
  {
    id: 'ai-dashboard',
    title: 'AI Analytics Dashboard',
    description: 'Real-time analytics dashboard powered by machine learning insights.',
    longDescription: `An enterprise analytics platform that leverages AI to provide actionable insights from complex data sets.

The dashboard processes millions of data points and presents them through intuitive visualizations.`,
    tags: ['React', 'Python', 'TensorFlow', 'D3.js', 'AWS'],
    links: {
      live: 'https://example.com',
    },
    featured: true,
    year: 2024,
  },
  {
    id: 'mobile-banking',
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric authentication.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Security'],
    links: {
      github: 'https://github.com',
    },
    featured: true,
    year: 2023,
  },
  {
    id: 'design-system',
    title: 'Design System Library',
    description: 'A comprehensive design system with 50+ accessible components.',
    tags: ['React', 'Storybook', 'CSS-in-JS', 'Accessibility'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
    },
    featured: false,
    year: 2023,
  },
  {
    id: 'task-manager',
    title: 'Collaborative Task Manager',
    description: 'Real-time task management app with team collaboration features.',
    tags: ['Vue.js', 'Firebase', 'WebSockets', 'PWA'],
    links: {
      live: 'https://example.com',
    },
    featured: false,
    year: 2023,
  },
  {
    id: 'weather-app',
    title: 'Weather Forecast App',
    description: 'Beautiful weather app with location-based forecasts.',
    tags: ['React', 'API Integration', 'Geolocation', 'Charts'],
    links: {
      live: 'https://example.com',
      github: 'https://github.com',
    },
    featured: false,
    year: 2022,
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
