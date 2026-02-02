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
  name: 'Samir Mohammed',
  title: 'Computational Math Student',
  email: 's6mohamm@uwaterloo.ca',
  location: 'Toronto, Canada',
  summary: `Fourth-year Computational Mathematics student at the University of Waterloo with minors in Computer Science and Economics. 
  Experienced in data science, machine learning, and business analytics through internships at Capital One, Communitech, NeoStats, and Microsoft. 
  CFA Level I passed. Building things at the intersection of math, code, and data.`,
  
  experience: [
    {
      id: 'exp-1',
      company: 'Capital One',
      role: 'Strategy & Data Analyst Intern',
      location: 'Toronto, ON',
      startDate: '2025-09',
      endDate: '2025-12',
      description: 'Redesigned credit limit increase program decision logic and built valuation models.',
      highlights: [
        'Redesigned customer-initiated Credit Limit Increase program by modeling approval outcomes under risk, profitability, and regulatory constraints',
        'Designed a policy expected to increase approval rates by over 20x while maintaining portfolio risk thresholds',
        'Built Python-based simulations and valuation models to estimate portfolio-level P&L and evaluate risk',
        'Presented findings to senior stakeholders across Product, Risk, and Finance with policy approved for 2026 rollout',
      ],
      technologies: ['Python', 'SQL', 'Data Analysis'],
    },
    {
      id: 'exp-2',
      company: 'Communitech',
      role: 'Business Analyst Intern',
      location: 'Kitchener, ON',
      startDate: '2025-01',
      endDate: '2025-05',
      description: 'Redesigned due diligence workflows and automated cost-audit pipelines.',
      highlights: [
        'Redesigned due diligence workflow for federal funding program (ElevateIP), standardizing eligibility assessments for 450+ startups',
        'Created process documentation and flowcharts adopted by program leadership',
        'Automated cost-audit pipeline with Apps Script and Excel logic, cutting manual review time by 95%',
      ],
      technologies: ['Google Apps Script', 'Excel', 'Process Design'],
    },
    {
      id: 'exp-3',
      company: 'NeoStats',
      role: 'Data Science & ML Intern',
      location: 'Bangalore, IN',
      startDate: '2024-05',
      endDate: '2024-08',
      description: 'Developed ML models for cross-selling optimization and streamlined data pipelines.',
      highlights: [
        'Developed PySpark-based ML models in Azure Databricks to optimize in-app cross-selling, increasing conversions by 12%',
        'Streamlined data pipelines by integrating Microsoft Fabric with Azure workflows, reducing processing time by 20%',
        'Created internal resource-allocation tool using VBA and Excel macros, saving 12 hours of manual work per week',
      ],
      technologies: ['PySpark', 'Azure Databricks', 'Microsoft Fabric', 'VBA'],
    },
    {
      id: 'exp-4',
      company: 'Microsoft',
      role: 'Azure & AI Intern (WEA)',
      location: 'Remote',
      startDate: '2023-05',
      endDate: '2023-08',
      description: 'Developed data-driven investment coaching system using Azure ML.',
      highlights: [
        'Developed data-driven investment coaching system using Azure ML, VMs, and containerized workflows',
        'Collaborated with cross-functional team to design and deploy MVP integrating real-time financial data',
        'Delivered project ahead of schedule',
      ],
      technologies: ['Azure ML', 'Docker', 'Python'],
    },
  ],
  
  education: [
    {
      id: 'edu-1',
      institution: 'University of Waterloo',
      degree: 'BMath (Honours)',
      field: 'Computational Mathematics',
      startDate: '2022',
      endDate: '2027',
      highlights: [
        'Minors in Computer Science and Economics',
        'CFA Level I Passed (November 2025)',
        'President\'s Scholarship of Distinction (95%+ admission average)',
        'UKMT Senior Maths Challenge: 2× Gold Award, Pink Kangaroo qualifier',
      ],
    },
  ],
  
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'SQL', 'C++', 'R', 'MATLAB', 'VBA'],
    },
    {
      category: 'Data & ML',
      items: ['NumPy', 'pandas', 'scikit-learn', 'PySpark', 'TensorFlow'],
    },
    {
      category: 'Cloud & Tools',
      items: ['Azure', 'Databricks', 'Snowflake', 'Git', 'Jupyter'],
    },
    {
      category: 'Certifications',
      items: ['CFA Level I', 'Azure AZ-104', 'Azure AZ-305'],
    },
  ],
  
  certifications: [
    'CFA Level I (November 2025)',
    'Microsoft Azure AZ-104 (Administrator Associate)',
    'Microsoft Azure AZ-305 (Solutions Architect Expert)',
  ],
};
