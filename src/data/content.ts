import type { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiPython,
  SiGithub,
  SiFramer,
  SiUnity,
  SiUnrealengine,
  SiCursor,
  SiGooglegemini,
  SiBlender,
  SiClaude,
  SiFigma,
  SiExpress,
  SiGooglesearchconsole,
} from 'react-icons/si';
import {
  TbApi,
  TbPalette,
  TbSparkles,
  TbSeo,
  TbRocket,
  TbDatabase,
  TbWorld,
  TbChartBar,
} from 'react-icons/tb';

export type Project = {
  id: string;
  name: string;
  tagline: string;
  year: string;
  overview: string;
  problem: string;
  solution: string;
  stack: string[];
  challenges: string;
  impact: string;
  accent: string;
  backgroundImage?: string;
  video?: string;
  liveUrl?: string;
  githubUrl?: string;
  underDevelopment?: boolean;
};

export type Skill = {
  name: string;
  icon: IconType;
  level: number;
  group:
    | 'Frontend'
    | 'Backend'
    | 'Database'
    | 'SEO & Performance'
    | 'AR/VR'
    | 'UI Design'
    | 'AI Tools';
};

export type Service = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  highlight: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Achievement = {
  title: string;
  issuer: string;
  prize?: string;
  year: string;
};

export const profile = {
  name: 'Rohith Vijay',
  role: 'Freelance Web Developer & SEO Specialist',
  titleTag: 'Rohith Vijay | Freelance Web Developer & SEO Specialist in Chennai',
  subtitle:
    'Engineering high-performance web applications, MERN stack solutions, and SEO-driven digital platforms in Chennai.',
  bio: 'Freelance Web Developer and SEO Specialist based in Chennai with hands-on expertise across MERN stack development, modern React architectures, Core Web Vitals optimization, and immersive AR/VR technologies.',
  email: 'rohithvijay2205@gmail.com',
  github: 'https://github.com/rohithkhan',
  linkedin: 'https://www.linkedin.com/in/v-rohith-a06243296/',
  resume: '/Rohith_Resume.docx',
  location: 'Chennai, Tamil Nadu, India',
  locality: 'Chennai',
  region: 'Tamil Nadu',
  country: 'India',
  availability: 'Available for freelance projects & consultations',
};

export const stats = [
  { label: 'Years Experience', value: 3, suffix: '+' },
  { label: 'Projects Shipped', value: 6, suffix: '+' },
  { label: 'Core Technologies', value: 16, suffix: '+' },
  { label: 'Dedication', value: 999, suffix: '', display: '∞' },
];

export const skills: Skill[] = [
  // Frontend
  { name: 'React', icon: SiReact, level: 95, group: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, level: 90, group: 'Frontend' },
  { name: 'JavaScript (ES6+)', icon: SiJavascript, level: 92, group: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, level: 82, group: 'Frontend' },
  { name: 'Vite', icon: SiVite, level: 90, group: 'Frontend' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, level: 94, group: 'Frontend' },
  { name: 'Framer Motion', icon: SiFramer, level: 88, group: 'Frontend' },
  { name: 'GSAP', icon: TbSparkles, level: 80, group: 'Frontend' },

  // Backend
  { name: 'Node.js', icon: SiNodedotjs, level: 85, group: 'Backend' },
  { name: 'Express.js', icon: SiExpress, level: 84, group: 'Backend' },
  { name: 'REST APIs', icon: TbApi, level: 88, group: 'Backend' },
  { name: 'Git & GitHub', icon: SiGithub, level: 90, group: 'Backend' },
  { name: 'Python', icon: SiPython, level: 50, group: 'Backend' },

  // Database
  { name: 'MongoDB', icon: SiMongodb, level: 82, group: 'Database' },
  { name: 'Database Design', icon: TbDatabase, level: 80, group: 'Database' },

  // SEO & Performance
  { name: 'Technical SEO', icon: TbSeo, level: 92, group: 'SEO & Performance' },
  { name: 'On-Page SEO', icon: TbWorld, level: 90, group: 'SEO & Performance' },
  { name: 'Core Web Vitals', icon: TbRocket, level: 88, group: 'SEO & Performance' },
  { name: 'Structured Data (Schema)', icon: TbChartBar, level: 90, group: 'SEO & Performance' },
  { name: 'Search Console', icon: SiGooglesearchconsole, level: 85, group: 'SEO & Performance' },

  // UI Design
  { name: 'UI / UX Design', icon: TbPalette, level: 85, group: 'UI Design' },
  { name: 'Figma', icon: SiFigma, level: 84, group: 'UI Design' },

  // AR/VR
  { name: 'Unity', icon: SiUnity, level: 80, group: 'AR/VR' },
  { name: 'Unreal Engine', icon: SiUnrealengine, level: 85, group: 'AR/VR' },
  { name: 'Blender', icon: SiBlender, level: 80, group: 'AR/VR' },

  // AI Tools
  { name: 'Cursor AI', icon: SiCursor, level: 95, group: 'AI Tools' },
  { name: 'Claude', icon: SiClaude, level: 88, group: 'AI Tools' },
  { name: 'Gemini', icon: SiGooglegemini, level: 85, group: 'AI Tools' },
];

export const skillGroups: { name: Skill['group']; blurb: string }[] = [
  { name: 'Frontend', blurb: 'Crafting responsive, accessible, interactive web interfaces with modern React.' },
  { name: 'Backend', blurb: 'Architecting scalable Node.js & Express REST APIs with secure authentication.' },
  { name: 'Database', blurb: 'Data modeling, schema design, and query optimization with MongoDB.' },
  { name: 'SEO & Performance', blurb: 'Driving organic visibility with technical SEO, Schema markup & Core Web Vitals.' },
  { name: 'UI Design', blurb: 'Designing modern user flows, component libraries, and interactive prototypes.' },
  { name: 'AR/VR', blurb: 'Developing spatial tracking and real-time interactive 3D simulations.' },
  { name: 'AI Tools', blurb: 'Accelerating development workflows with cutting-edge AI engineering tools.' },
];

export const services: Service[] = [
  {
    id: 'freelance-web-development',
    eyebrow: 'Full-Cycle Development',
    title: 'Freelance Website Development',
    description:
      'Custom website development built for performance, mobile responsiveness, and client acquisition. Clean architecture that transforms your business requirements into a polished online presence.',
    deliverables: [
      'Mobile-first responsive design across all devices',
      'Clean TypeScript & Tailwind CSS architecture',
      'Semantic HTML5 structure & accessibility standards',
      'Production deployment on Vercel with HTTPS',
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    highlight: 'Conversion-Focused & Scalable',
  },
  {
    id: 'mern-stack-development',
    eyebrow: 'End-to-End Applications',
    title: 'MERN Stack Development',
    description:
      'Robust full-stack web applications powered by MongoDB, Express.js, React, and Node.js. Designed for internal portals, school management platforms, and web SaaS products.',
    deliverables: [
      'RESTful API engineering with Node.js & Express',
      'Secure authentication & role-based permissions (RBAC)',
      'MongoDB database modeling & query indexing',
      'Modular state management and data caching',
    ],
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    highlight: 'Enterprise-Grade Architecture',
  },
  {
    id: 'react-nextjs-development',
    eyebrow: 'Modern Web Apps',
    title: 'React & Next.js Development',
    description:
      'Interactive single-page and server-rendered web applications with dynamic interactions, smooth transitions, and high-standard UI engineering.',
    deliverables: [
      'Modular, reusable React component systems',
      'Fluid motion design using Framer Motion & GSAP',
      'Optimized client-side and server-side rendering',
      'Cross-browser and multi-platform compatibility',
    ],
    techStack: ['React', 'Next.js', 'Framer Motion', 'TypeScript'],
    highlight: 'Sub-Second Interactions',
  },
  {
    id: 'business-website-development',
    eyebrow: 'Commercial Presence',
    title: 'Business Website Development',
    description:
      'Tailored websites for startups, service firms, and businesses in Chennai. Focused on establishing credibility, communicating services, and capturing qualified customer inquiries.',
    deliverables: [
      'Brand-aligned layout and custom typography',
      'Lead capture and seamless inquiry contact channels',
      'Social proof, portfolio showcase, and client trust flows',
      'Fast loading speeds under 1.5s on mobile networks',
    ],
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Vercel'],
    highlight: 'Built to Convert Visitors',
  },
  {
    id: 'technical-seo',
    eyebrow: 'Search Engine Architecture',
    title: 'Technical SEO & Performance Optimization',
    description:
      'Comprehensive technical audits and code-level SEO implementations to ensure search engine crawlers can index and understand every critical page.',
    deliverables: [
      'Schema.org JSON-LD structured data (Person, WebSite, LocalBusiness, FAQ)',
      'Core Web Vitals optimization (LCP, INP, CLS)',
      'Sitemap.xml, robots.txt, and canonical URL setup',
      'Text-to-HTML ratio & crawler accessibility tuning',
    ],
    techStack: ['Schema.org', 'Lighthouse', 'Search Console', 'JSON-LD'],
    highlight: 'Search Crawler Friendly',
  },
  {
    id: 'onpage-seo',
    eyebrow: 'Organic Visibility',
    title: 'On-Page SEO & Content Strategy',
    description:
      'Strategic keyword mapping and content hierarchy optimization to help websites rank organically for competitive search terms in Chennai and beyond.',
    deliverables: [
      'Search-intent keyword research and page mapping',
      'Strict H1-H3 heading hierarchy implementation',
      'High-CTR meta titles & meta description copywriting',
      'Semantic internal linking and image alt optimization',
    ],
    techStack: ['On-Page SEO', 'Keyword Strategy', 'Semantic HTML', 'Local SEO'],
    highlight: 'Chennai & Regional Rankings',
  },
];

export const faqs: FaqItem[] = [
  {
    question: 'How can I hire a freelance web developer in Chennai?',
    answer:
      'You can reach out directly through the contact section on this website or email me at rohithvijay2205@gmail.com with your project brief, expected timeline, and requirements. I review your scope, provide a technical consultation, and share a transparent milestone-based proposal.',
  },
  {
    question: 'What technologies do you use for website development?',
    answer:
      'I specialize in the modern JavaScript and TypeScript ecosystem: React, Next.js, Vite, Tailwind CSS, Node.js, Express, and MongoDB (the MERN stack). For animations and polish, I use Framer Motion and GSAP, deploying on Vercel for high global availability.',
  },
  {
    question: 'Do you provide MERN stack development services in Chennai?',
    answer:
      'Yes. I build complete full-stack web applications using the MERN stack (MongoDB, Express.js, React, Node.js). This includes database schema design, secure RESTful APIs, JWT authentication, role-based access control, and responsive client-side dashboards.',
  },
  {
    question: 'Do you offer SEO services for business websites?',
    answer:
      'Yes. I provide technical SEO audits, Schema.org JSON-LD structured data markup, on-page optimization, heading hierarchy structuring, Core Web Vitals performance tuning, and local SEO strategies to help your business gain sustainable organic visibility on Google.',
  },
  {
    question: 'Can you develop websites for small businesses in Chennai?',
    answer:
      'Yes. I help small businesses, local enterprises, and professionals in Chennai establish modern, mobile-responsive websites that load fast, rank well on Google, and convert visitors into genuine client inquiries.',
  },
  {
    question: 'How can I contact you for freelance projects or consultations?',
    answer:
      'You can email me at rohithvijay2205@gmail.com or connect with me on LinkedIn at linkedin.com/in/v-rohith-a06243296. I respond within 24 hours to schedule an introductory call and discuss your project.',
  },
];

export const projects: Project[] = [
  {
    id: 'school-management',
    name: 'School Management System',
    tagline: 'A unified platform for students, teachers, and administration.',
    year: '2026',
    overview:
      'An end-to-end full-stack school management platform unifying attendance tracking, examination grading, class timetables, and multi-channel communication across students, teachers, and administrators.',
    problem:
      'Educational institutions frequently rely on fragmented spreadsheets and manual workflows, leading to reporting discrepancies, slow attendance logging, and delayed parent communications.',
    solution:
      'Engineered a centralized, role-based MERN stack dashboard with real-time attendance management, automated GPA/grade calculations, and instant notification alerts.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    challenges:
      'Architecting granular role-based access control (RBAC) across three distinct user roles without sacrificing UI simplicity required clean modular state design and secure route guards.',
    impact:
      'Streamlined academic administration, reduced paper overhead by an estimated 40%, and established a single source of truth for student records.',
    accent: '#3B82F6',
    backgroundImage: '',
    video: 'smsvideo.mp4',
    githubUrl: 'https://github.com/RohithKhan/SMS.git',
  },
  {
    id: 'jit-permigo',
    name: 'JIT Permigo',
    tagline: 'Just-in-time permission orchestration for modern teams.',
    year: '2026',
    overview:
      'A just-in-time access control platform that grants scoped, time-bound permissions on demand with automated expiration, approval workflows, and immutable audit logs.',
    problem:
      'Persistent standing admin privileges introduce serious security vulnerabilities. Organizations needed a lightweight way to grant elevated access only for the exact duration of a task.',
    solution:
      'Built an approval workflow interface with real-time countdown timers, granular access scopes, and an immutable activity audit log wrapped in a focused dark-mode UI.',
    stack: ['React', 'Vite', 'TypeScript', 'Node.js', 'REST APIs', 'Tailwind CSS'],
    challenges:
      'Maintaining zero-latency state synchronization for live expiration countdowns while ensuring strict security verification at every approval stage.',
    impact:
      'Reduced standing privileged access to near zero while preserving rapid developer velocity across operational tasks.',
    accent: '#22C55E',
    backgroundImage: '/permigoss.png',
    liveUrl: 'https://www.jit.college/',
  },
  {
    id: 'jit-digital-notice-board',
    name: 'JIT Digital Notice Board',
    tagline: 'A smarter way to publish, discover, and access campus notices.',
    year: '2026',
    overview:
      'A digital circular and notice management platform built for Jeppiaar Institute of Technology, enabling administrators to publish department-specific notices while giving students instant access through dedicated digital notice boards and QR codes.',
    problem:
      'Traditional college notice boards make it difficult for students to access important announcements quickly, while physical notices are limited by location, visibility, and manual distribution across departments.',
    solution:
      'Built a centralized digital notice system where administrators can create and manage circulars, while each department has its own dedicated notice board that students can access digitally through QR codes placed around the campus.',
    stack: ['React', 'Vite', 'TypeScript', 'React Router', 'CSS3', 'REST API'],
    challenges:
      'Designing a scalable notice distribution workflow that separates administrative management from student-facing department boards, while keeping the experience fast, mobile-first, easy to navigate, and suitable for QR-based campus access.',
    impact:
      'Created a scalable digital notice infrastructure for JIT that currently supports department-wise notice distribution and provides students with a faster, more accessible alternative to traditional physical notice boards.',
    accent: '#60A5FA',
    backgroundImage: '/noticeboard.png',
    liveUrl: 'https://notice.jit.college',
    githubUrl: 'https://github.com/mohanraj221210/jit-qr.git',
    underDevelopment: false,
  },
  {
    id: 'jarvis-ai',
    name: 'Jarvis AI Assistant',
    tagline: 'A voice-first assistant powered by lightweight language models.',
    year: '2025',
    overview:
      'A personal AI voice assistant powered by a Small Language Model (SLM), designed to understand natural-language commands and assist with everyday tasks through an interactive conversational interface.',
    problem:
      'General-purpose AI assistants often require heavy external cloud dependencies and latency-inducing APIs, making lightweight on-device control difficult.',
    solution:
      'Built a voice assistant around an SLM pipeline combining real-time speech recognition, tokenization, contextual memory storage, and natural voice synthesis.',
    stack: ['Python', 'PyTorch', 'SLM', 'Speech Recognition', 'NLP'],
    challenges:
      'Designing the end-to-end pipeline from acoustic voice input to low-latency model inference and audio synthesis while preserving conversational context.',
    impact:
      'Demonstrated practical on-device integration of lightweight language models for responsive voice assistance workflows.',
    accent: '#60A5FA',
    backgroundImage: '',
    underDevelopment: true,
  },
  {
    id: 'vr-agriculture',
    name: 'VR Agriculture Simulation',
    tagline: 'Immersive training for sustainable crop cultivation.',
    year: '2025',
    overview:
      'A virtual reality farming simulator designed to educate students and trainees on sustainable crop management, soil health, and precision irrigation in an interactive 3D environment.',
    problem:
      'Traditional agricultural education lacks accessible, zero-risk environments for trainees to experiment with water management and seasonal crop decisions.',
    solution:
      'Constructed a 3D virtual farm with real-time weather simulation, soil moisture parameters, and a scoring system evaluating environmental sustainability.',
    stack: ['Blender', 'Unreal Engine', 'Virtual Reality', 'C++'],
    challenges:
      'Translating agronomic physics into realistic 3D game mechanics while maintaining stable frame rates necessary to avoid VR motion sickness.',
    impact:
      'Demonstrated in academic workshops to introduce students to sustainable farming practices in an immersive virtual setting.',
    accent: '#22C55E',
    backgroundImage: '',
    video: '/agriculture.mp4',
    underDevelopment: true,
  },
  {
    id: 'alumni-portal',
    name: 'Alumni Engagement Portal',
    tagline: 'Connecting graduates and fostering collegiate networking.',
    year: '2024',
    overview:
      'A full-stack networking platform for college alumni to discover former peers, share career opportunities, coordinate mentorship, and stay connected with their alma mater.',
    problem:
      'Graduates frequently lose touch with institutional networks due to fragmented messaging channels and lack of a centralized directory.',
    solution:
      'Developed a responsive web platform featuring searchable alumni directories, an employment opportunity board, and event RSVP management.',
    stack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'REST APIs'],
    challenges:
      'Implementing low-latency search and filtering across multi-field user profiles while preventing unnecessary database roundtrips.',
    impact:
      'Facilitated alumni networking and served as the central platform for university reunion coordination.',
    accent: '#8B5CF6',
    backgroundImage: '/alumni.png',
    liveUrl: 'https://aluminifrontend-six.vercel.app/',
    githubUrl: 'https://github.com/RohithKhan/Aluminifrontend.git',
  },
  {
    id: 'ar-targeting',
    name: 'AR Ground & Mid-Air Targeting',
    tagline: 'Augmented reality surface detection and spatial interaction.',
    year: '2025',
    overview:
      'An augmented reality application built with Unity and Vuforia exploring ground plane detection and mid-air spatial targeting for virtual 3D object manipulation.',
    problem:
      'Interacting with 3D models on flat 2D screens lacks physical spatial awareness and realistic environmental scaling.',
    solution:
      'Implemented computer vision plane detection algorithms to map real-world surfaces and anchor interactive 3D assets with stable coordinate tracking.',
    stack: ['Unity', 'Vuforia Engine', 'C#', 'Augmented Reality'],
    challenges:
      'Maintaining tracking stability under varying ambient lighting conditions and irregular reflective surfaces.',
    impact:
      'Delivered hands-on insights into spatial computing, AR raycasting, and real-world virtual object anchoring.',
    accent: '#0e98dd',
    backgroundImage: '',
    video: 'arvid.mp4',
  },
];

export const experiences: Experience[] = [
  {
    role: 'Freelance Web Developer & SEO Consultant',
    org: 'Independent / Freelance — Chennai, India',
    period: '2025 — Present',
    summary:
      'Engineering high-performing web applications, MERN stack solutions, and SEO-optimized business websites for clients with a focus on speed, organic visibility, and conversion.',
    highlights: [
      'Shipped production web applications with 95+ Google Lighthouse scores across Performance, SEO, and Accessibility',
      'Implemented advanced technical SEO architectures, Schema.org JSON-LD structured data, and keyword strategies targeting Chennai and global markets',
      'Delivered responsive frontend interfaces using React, TypeScript, Tailwind CSS, Framer Motion, and Node.js backends',
      'Managed complete client lifecycle from initial architecture and UX design to Vercel deployment and search console indexing',
    ],
  },
  {
    role: 'Frontend & Web Applications Developer',
    org: 'Institutional & Project Teams — Chennai',
    period: '2024 — 2025',
    summary:
      'Collaborated on core enterprise interfaces for academic and operational tools, bridging backend APIs and modern frontend design.',
    highlights: [
      'Engineered frontend architectures for the JIT Digital Notice Board, School Management System, and Alumni Portal',
      'Developed reusable UI component systems and data-fetching patterns in React and TypeScript',
      'Partnered closely with backend engineers to integrate RESTful API endpoints and secure authentication flows',
    ],
  },
  {
    role: 'Student Software & Spatial Developer',
    org: 'Foundational Engineering — Chennai',
    period: '2023 — 2024',
    summary:
      'Explored software engineering, modern web technologies, and spatial computing, building hands-on projects across web and 3D domains.',
    highlights: [
      'Mastered core web fundamentals including semantic HTML5, CSS3, JavaScript (ES6+), and modern React',
      'Built interactive AR/VR prototypes with Unity, Unreal Engine, and Vuforia computer vision',
      'Participated in regional technical competitions and hackathons focused on software and interactive media',
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: 'Frontend Web Development Certification',
    issuer: 'Jeppiaar Institute of Technology',
    year: '2026',
  },
  {
    title: 'Game Development Competition',
    prize: '2nd Prize',
    issuer: 'Kalasalingam University',
    year: '2025',
  },
  {
    title: 'UI/UX Design Fundamentals',
    issuer: 'ScholarPeak',
    year: '2025',
  },
  {
    title: 'Python for Everybody Specialization',
    issuer: 'Infosys Springboard',
    year: '2024',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];
