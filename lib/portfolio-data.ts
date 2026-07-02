import {
  Code2,
  Palette,
  Bot,
  Layout,
  Server,
  Database,
  Gauge,
  Lightbulb,
  type LucideIcon,
} from 'lucide-react'

export const profile = {
  name: 'Samuel R. Appleton',
  roles: [
    'Accountant',
    'ICT Specialist',
    'Web Developer & Graphic Designer',
    'Computer Trainer',
  ],
  intro:
    'I deliver practical financial and ICT solutions that help organizations and individuals operate more efficiently and grow. I specialize in Accounting and Finance (including financial reporting and QuickBooks), alongside ICT services such as Website Development, Graphic Design, Computer Training, and Practical Digital solutions that improve Productivity and Decision-making.',
  email: 'samappleton0@gmail.com',
  phone: '+231770449708 / +231888323165',
  location: 'Monrovia, Liberia',
  linkedin: 'https://linkedin.com/in/samuelappleton',
  github: 'https://github.com/samuelappleton',
  resumePath: '/resume.pdf',
}

export type Service = {
  icon: LucideIcon
  title: string
  image: string
  description: string
  tech: string[]
}

export const services: Service[] = [
  {
    icon: Code2,
    title: 'Web Development',
    image: '/images/service-web.png',
    description:
      'Responsive websites, business websites, landing pages, portfolio websites, blogs, and e-commerce platforms.',
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    image: '/images/service-uiux.png',
    description:
      'Wireframes, prototypes, user interfaces, user experience design, mobile-first layouts, and design systems.',
    tech: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    icon: Bot,
    title: 'AI Solutions',
    image: '/images/service-ai.png',
    description:
      'AI integrations, chatbots, prompt engineering, automation, intelligent assistants, and AI-powered applications.',
    tech: ['AI SDK', 'Prompt Engineering', 'LLMs', 'Automation'],
  },
  {
    icon: Layout,
    title: 'Frontend Development',
    image: '/images/service-frontend.png',
    description:
      'Interactive interfaces using React, Next.js, JavaScript, TypeScript, Tailwind CSS, and responsive design.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: Server,
    title: 'Backend Development',
    image: '/images/service-backend.png',
    description:
      'REST APIs, authentication, databases, Node.js, Express.js, cloud integrations, and scalable backend systems.',
    tech: ['Node.js', 'Express.js', 'REST APIs', 'Cloud'],
  },
  {
    icon: Database,
    title: 'Database Management',
    image: '/images/service-database.png',
    description:
      'MongoDB, PostgreSQL, MySQL, Firebase, data modeling, optimization, and secure data management.',
    tech: ['PostgreSQL', 'MongoDB', 'Firebase', 'MySQL'],
  },
  {
    icon: Gauge,
    title: 'Website Optimization',
    image: '/images/service-optimization.png',
    description:
      'SEO optimization, performance improvements, accessibility, Core Web Vitals, and speed optimization.',
    tech: ['SEO', 'Core Web Vitals', 'Accessibility'],
  },
  {
    icon: Lightbulb,
    title: 'Technical Consulting',
    image: '/images/service-consulting.png',
    description:
      'Software planning, architecture, technology recommendations, digital transformation, and project guidance.',
    tech: ['Architecture', 'Strategy', 'Digital Transformation'],
  },
]

export const skills: string[] = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express.js',
  'Python',
  'MongoDB',
  'PostgreSQL',
  'Firebase',
  'Tailwind CSS',
  'Git',
  'GitHub',
  'Docker',
  'REST APIs',
  'AI Integration',
  'Prompt Engineering',
  'Figma',
]

export type Project = {
  title: string
  image: string
  description: string
  tech: string[]
  demo: string
  github: string
  caseStudy: string
}

export const projects: Project[] = [
  {
    title: 'Nova Commerce',
    image: '/images/project-1.png',
    description:
      'A full-featured e-commerce platform with cart, payments, and an admin dashboard for inventory management.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Insight Analytics',
    image: '/images/project-2.png',
    description:
      'A SaaS analytics dashboard delivering real-time KPIs, charts, and automated reporting for growing teams.',
    tech: ['React', 'Node.js', 'Recharts'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Aria Assistant',
    image: '/images/project-3.png',
    description:
      'An AI-powered chatbot with contextual memory, tool calling, and streaming responses for customer support.',
    tech: ['AI SDK', 'Next.js', 'Vector DB'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Vault Banking',
    image: '/images/project-4.png',
    description:
      'A secure mobile banking experience with transactions, budgeting insights, and biometric authentication.',
    tech: ['React Native', 'Node.js', 'Plaid'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Estate Finder',
    image: '/images/project-5.png',
    description:
      'A real-estate listing platform with interactive maps, saved searches, and rich property galleries.',
    tech: ['Next.js', 'Mapbox', 'Supabase'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'PulseFit',
    image: '/images/project-6.png',
    description:
      'A fitness tracking web app with activity rings, progress charts, and personalized workout plans.',
    tech: ['React', 'Firebase', 'Chart.js'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
]

export const whyChooseMe = [
  {
    title: 'Clean Code',
    description:
      'Maintainable, well-documented, and tested code that scales gracefully with your product.',
  },
  {
    title: 'Responsive Design',
    description:
      'Pixel-perfect experiences that look and feel great on every device and screen size.',
  },
  {
    title: 'Fast Delivery',
    description:
      'Efficient workflows and clear communication that ship quality work on time.',
  },
  {
    title: 'Scalable Solutions',
    description:
      'Architecture built for growth, from first users to millions of requests.',
  },
]

export type TimelineItem = {
  period: string
  title: string
  org: string
  description: string
  tag: string
}

export const timeline: TimelineItem[] = [
  {
    period: '2023 — Present',
    title: 'Senior Full-Stack Engineer',
    org: 'Lumen Labs',
    description:
      'Lead engineer on AI-powered products, mentoring a team of five and owning architecture across the stack.',
    tag: 'Experience',
  },
  {
    period: '2021 — 2023',
    title: 'Full-Stack Developer',
    org: 'Brightwave Studio',
    description:
      'Delivered 30+ client web apps, established the design system, and improved delivery speed by 40%.',
    tag: 'Experience',
  },
  {
    period: '2022',
    title: 'AWS Certified Solutions Architect',
    org: 'Amazon Web Services',
    description:
      'Certified in designing distributed, resilient, and cost-optimized systems on the cloud.',
    tag: 'Certification',
  },
  {
    period: '2021',
    title: 'Product of the Year — Hackathon Winner',
    org: 'DevWorld Global',
    description:
      'Awarded first place among 200+ teams for an AI accessibility tool built in 48 hours.',
    tag: 'Award',
  },
  {
    period: '2019 — 2021',
    title: 'Frontend Developer',
    org: 'Pixel & Co.',
    description:
      'Built interactive marketing sites and shipped a component library used across the agency.',
    tag: 'Experience',
  },
]

export type Testimonial = {
  name: string
  position: string
  company: string
  image: string
  rating: number
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Mitchell',
    position: 'Product Director',
    company: 'Lumen Labs',
    image: '/images/client-1.png',
    rating: 5,
    quote:
      'Alex transformed our vision into a polished product ahead of schedule. The attention to detail and technical depth were exceptional.',
  },
  {
    name: 'James Carter',
    position: 'CTO',
    company: 'Brightwave',
    image: '/images/client-2.png',
    rating: 5,
    quote:
      'One of the most reliable engineers I have worked with. Clean architecture, clear communication, and real business impact.',
  },
  {
    name: 'Elena Rossi',
    position: 'Founder',
    company: 'Estate Finder',
    image: '/images/client-3.png',
    rating: 5,
    quote:
      'From design to deployment, Alex handled everything with professionalism. Our launch exceeded every metric we set.',
  },
]

export const resumeSummary = [
  { label: 'Years of Experience', value: '6+ Years' },
  { label: 'Core Skills', value: 'Full-Stack, AI, UI/UX' },
  { label: 'Certifications', value: 'AWS Solutions Architect' },
  { label: 'Education', value: 'B.Sc. Computer Science' },
  { label: 'Projects Delivered', value: '80+ Projects' },
]
