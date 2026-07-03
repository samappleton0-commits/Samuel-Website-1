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
    'ICT Trainer',
  ],
  intro:
    'I specialize in Accounting and Finance, alongside ICT services such as Website Development, Graphic Design, ICT Training, and Practical Digital solutions that improve efficiency, productivity, and business growth.',
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
    title: 'Website Development',
    image: '/images/service-web.png',
    description:
      'Designing Responsive, Modern, and User-Friendly Websites that strengthen your online presence and support business growth.',
    tech: ['Next.js', 'TypeScript', 'HTML,CSS'],
  },
  {
    icon: Palette,
    title: 'Accounting & Finance',
    image: '/images/service-uiux.png',
    description:
      'Providing Financial Management, Financial Reporting, and QuickBooks solutions to improve Business performance.',
    tech: ['Budgeting', 'QuickBooks', 'Bookkeeping'],
  },
  {
    icon: Bot,
    title: 'ICT Training & Solutions',
    image: '/images/service-ai.png',
    description:
      'Delivering practical ICT Training, Technical Support, and Digital solutions.',
    tech: ['Windows OS', 'Microsoft Office', 'Digital Literacy'],
  },
  {
    icon: Layout,
    title: 'Graphic Design',
    image: '/images/service-frontend.png',
    description:
      'Creating professional visual designs that communicate your brand effectively through logos, Marketing materials, and Digital Graphics.',
    tech: ['Adobe Photoshop', 'Canva', 'Corel-Draw', 'Branding'],
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
    title: 'E-Commerce Website',
    image: '/images/project-1.png',
    description:
      'A secure and user-friendly online store that enables businesses to showcase products, manage inventory, process orders, and provide customers with a seamless shopping experience.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'School Website',
    image: '/images/project-2.png',
    description:
      'A modern and responsive school website designed to provide easy access to academic information, admissions, news, events, and communication between the institution, students, and parents.',
    tech: ['React', 'Node.js', 'Recharts'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Portfolio Website',
    image: '/images/project-3.png',
    description:
      'An AI-powered chatbot with contextual memory, tool calling, and streaming responses for customer support.',
    tech: ['AI SDK', 'Next.js', 'Vector DB'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Marketing',
    image: '/images/project-4.png',
    description:
      'Creating eye-catching flyers, brochures, posters, banners, business cards, and social media graphics to effectively promote your brand.',
    tech: ['React Native', 'Node.js', 'Plaid'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Logo and Brand',
    image: '/images/project-5.png',
    description:
      'A real-estate listing platform with interactive maps, saved searches, and rich property galleries.',
    tech: ['Next.js', 'Mapbox', 'Supabase'],
    demo: '#',
    github: '#',
    caseStudy: '#',
  },
  {
    title: 'Digital & Print Design',
    image: '/images/project-6.png',
    description:
      'Developing high-quality designs for both digital platforms and print media, ensuring clear communication and a consistent visual identity.',
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
  { label: 'Years of Experience', value: '5+ Years' },
  { label: 'Core Skills', value: 'Full-Stack, AI, UI/UX' },
  { label: 'Certifications', value: 'AWS Solutions Architect' },
  { label: 'Education', value: 'B.Sc. Computer Science' },
  { label: 'Projects Delivered', value: '30+ Projects' },
]
