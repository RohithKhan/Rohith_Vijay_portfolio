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
  SiGit,
  SiGithub,
  SiFramer,
  SiUnity,
  SiUnrealengine,
  SiCursor,
  SiGooglegemini,
  SiBlender,
  SiClaude,
  SiFigma,
} from 'react-icons/si';
import { TbApi, TbPalette, TbSparkles } from 'react-icons/tb';

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
  group: 'Frontend' | 'Backend' | 'AI Tools' | 'UI Design' | 'AR/VR';
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
  prize?:string;
  year: string;
};

export const profile = {
  name: 'Rohith Vijay',
  role: 'Engineer',
  subtitle:
    'Building immersive digital experiences with modern web technologies.',
  email: 'rohithvijay2205@gmail.com',
  github: 'https://github.com/rohithkhan',
  linkedin: 'https://www.linkedin.com/in/v-rohith-a06243296/',
  resume: '/Rohith_Resume.docx',
  location: 'Chennai, Tamil Nadu, India',
};

export const stats = [
  { label: 'Years Learning', value: 4, suffix: '+' },
  { label: 'Projects Built', value: 4, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Late Nights', value: 999, suffix: '', display: '∞' },
];

export const skills: Skill[] = [
  { name: 'React', icon: SiReact, level: 95, group: 'Frontend' },
  { name: 'TypeScript', icon: SiTypescript, level: 90, group: 'Frontend' },
  { name: 'JavaScript', icon: SiJavascript, level: 92, group: 'Frontend' },
  { name: 'Next.js', icon: SiNextdotjs, level: 80, group: 'Frontend' },
  { name: 'Vite', icon: SiVite, level: 88, group: 'Frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, level: 93, group: 'Frontend' },
  { name: 'Framer Motion', icon: SiFramer, level: 85, group: 'Frontend' },
  { name: 'GSAP', icon: TbSparkles, level: 78, group: 'Frontend' },
  { name: 'Node.js', icon: SiNodedotjs, level: 75, group: 'Backend' },
  { name: 'MongoDB', icon: SiMongodb, level: 70, group: 'Backend' },
  { name: 'Python', icon: SiPython, level: 40, group: 'Backend' },
  { name: 'REST APIs', icon: TbApi, level: 82, group: 'Backend' },
  { name: 'Git', icon: SiGit, level: 88, group: 'Backend' },
  { name: 'GitHub', icon: SiGithub, level: 90, group: 'Backend' },
  { name: 'UI / UX', icon: TbPalette, level: 84, group: 'UI Design' },
  { name: 'Figma', icon: SiFigma, level: 84, group: 'UI Design' },
  { name: 'Claude', icon: SiClaude, level: 85, group: 'AI Tools' },
  { name: 'Cursor', icon: SiCursor, level: 95, group: 'AI Tools' },
  { name: 'Gemini', icon: SiGooglegemini, level: 84, group: 'AI Tools' },
  { name: 'Unity', icon: SiUnity, level: 78, group: 'AR/VR' },
  { name: 'Unreal Engine', icon: SiUnrealengine, level: 85, group: 'AR/VR' },
  { name: 'Blender', icon: SiBlender, level: 80, group: 'AR/VR' },
];

export const skillGroups: { name: Skill['group']; blurb: string }[] = [
  { name: 'Frontend', blurb: 'Crafting interfaces that feel alive.' },
  { name: 'Backend', blurb: 'Wiring data, APIs, and infrastructure.' },
  { name: 'AI Tools', blurb: 'Shipping intelligent, assistive features.' },
  { name: 'UI Design', blurb: 'Designing with taste and intention.' },
  { name: 'AR/VR', blurb: 'Creating immersive, interactive experiences.' },
];

export const projects: Project[] = [
  {
    id: 'school-management',
    name: 'School Management System',
    tagline: 'A unified platform for students, teachers, and administration.',
    year: '2026',
    overview:
      'An end-to-end school management platform unifying attendance, grades, timetables, and communication across students, teachers, and administrators.',
    problem:
      'Schools relied on fragmented spreadsheets and manual processes that made attendance, grading, and parent communication slow and error-prone.',
    solution:
      'Designed a role-based dashboard with real-time attendance, automated grade calculations, and a notification engine that keeps every stakeholder in sync.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind'],
    challenges:
      'Modeling granular role permissions without bloating the UI required a layered authorization system and careful state design.',
    impact:
      'Reduced administrative overhead by an estimated 40% and gave staff a single source of truth for student data.',
    accent: '#3B82F6',
    backgroundImage: '',
    video: 'smsvideo.mp4',
    // liveUrl: '#',
    githubUrl: 'https://github.com/RohithKhan/SMS.git',
  },
  {
    id: 'jit-permigo',
    name: 'JIT Permigo',
    tagline: 'Just-in-time permission orchestration for modern teams.',
    year: '2026',
    overview:
      'A just-in-time access system that grants scoped, time-bound permissions on demand — with full audit trails and automatic revocation.',
    problem:
      'Standing access created security risk; teams needed a way to request elevated permissions only for the moment they needed them.',
    solution:
      'Built a request-and-approve flow with live countdowns, scoped scopes, and an immutable audit log — all wrapped in a calm, focused interface.',
    stack: ['React-Vite', 'TypeScript', 'Node.js', 'REST APIs', 'Tailwind'],
    challenges:
      'Balancing strict security with a frictionless UX meant designing flows that feel instant while never skipping a verification step.',
    impact:
      'Cut standing privileged access to near zero while keeping developer velocity high.',
    accent: '#22C55E',
    backgroundImage: '/permigoss.png',
    liveUrl: 'https://www.jit.college/',
    // githubUrl: '#',
  },
  {
    id: 'jarvis-ai',
    name: 'Jarvis AI Assistant',
    tagline: 'A voice-first assistant that actually feels helpful.',
    year: '2025',
    overview:
      'A personal AI voice assistant powered by a Small Language Model (SLM), designed to understand natural-language commands and assist with everyday tasks through an interactive JARVIS-style interface.',
    problem:
      'General-purpose AI assistants can be resource-intensive and overly dependent on large external models, making it difficult to create a lightweight, personalized assistant with control over its behavior and memory.',
    solution:
      'Built a JARVIS-inspired voice assistant around an SLM architecture, combining speech recognition, tokenization, language-model inference, contextual memory, and voice responses into a unified conversational workflow.',
    stack: ['SLM', 'Python', 'PyTorch', 'AI', 'Speech Recognition', 'NLP'],
    challenges:
      'Designing the complete AI pipeline—from converting voice into text and tokenizing user input to generating contextual responses and converting them back into speech—while keeping the interaction responsive and natural.',
    impact:
      'Created a functional personal AI assistant that demonstrates how lightweight language models can be integrated with voice interaction, contextual memory, and real-world assistant workflows.',
    accent: '#60A5FA',
    backgroundImage: '',
    // liveUrl: '',
    // githubUrl: '',
    underDevelopment: true,
  },
  {
    id: 'vr-agriculture',
    name: 'VR Agriculture Simulation',
    tagline: 'Immersive training for the next generation of farmers.',
    year: '2025',
    overview:
      'A virtual reality farming simulator that teaches crop management, irrigation, and sustainability through hands-on scenarios.',
    problem:
      'Agricultural training lacked accessible, repeatable, low-risk environments for students to practice decision-making.',
    solution:
      'Created an interactive 3D farm with dynamic weather, soil, and crop systems, plus a scoring layer that rewards sustainable choices.',
    stack: ['Blender', 'Unreal Engine', 'Virtual Reality', 'UI/UX'],
    challenges:
      'Translating real agronomy into believable, performant 3D systems required tight collaboration between domain and dev.',
    impact:
      'Used in workshops to introduce students to sustainable farming decisions.',
    accent: '#22C55E',
    backgroundImage: '',
    video: '/agriculture.mp4',
    // liveUrl: '#',
    // githubUrl: '#',
    underDevelopment: true,
  },
  {
    id: 'alumni-portal',
    name: 'Alumni Portal',
    tagline: 'Reconnecting graduates with their community.',
    year: '2024',
    overview:
      'A networking portal for alumni to discover peers, share opportunities, and stay connected with their institution.',
    problem:
      'Graduates lost touch with their network after leaving; there was no central place to find and reconnect with peers.',
    solution:
      'Built searchable profiles, an opportunity board, and event RSVPs with a warm, nostalgic design language.',
    stack: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'REST APIs'],
    challenges:
      'Designing a search experience that felt fast across thousands of profiles required thoughtful indexing and debouncing.',
    impact:
      'Reignited alumni engagement and became the go-to place for class reunions.',
    accent: '#3B82F6',
    backgroundImage: '/alumni.png',
    liveUrl: 'https://aluminifrontend-six.vercel.app/',
    githubUrl: 'https://github.com/RohithKhan/Aluminifrontend.git',
  },
  {
  id: 'ar-targeting',
  name: 'AR Ground & Mid-Air Targeting',
  tagline: 'Real-world interaction through augmented reality.',
  year: '2025',
  overview:
    'An augmented reality project built with Unity and Vuforia, exploring ground targeting and mid-air targeting for placing and interacting with virtual 3D objects in real-world environments.',
  problem:
    'Traditional 3D experiences are limited to screens, making it difficult to visualize and interact with virtual objects in a real-world context.',
  solution:
    'Implemented AR targeting techniques using Vuforia and Unity to detect target surfaces and enable virtual object placement and interaction within the physical environment.',
  stack: ['Unity', 'Vuforia Engine', 'C#', 'Augmented Reality'],
  challenges:
    'Achieving reliable target detection and consistent virtual object placement while maintaining smooth AR tracking across different real-world environments.',
  impact:
    'Gained hands-on experience in AR development, spatial tracking, target detection, and real-world 3D object interaction.',
  accent: '#8B5CF6',
  backgroundImage: '',
  video:'arvid.mp4',
  // liveUrl: '#',
  // githubUrl: '#',
},
];

export const experiences: Experience[] = [
  {
    role: 'Student Developer',
    org: 'Self-taught',
    period: '2023 — 2024',
    summary:
      'Exploring software development across immersive technologies and modern web applications, turning ideas into hands-on projects.',
    highlights: [
      'Built interactive AR/VR experiences using Unity, Unreal Engine, and Vuforia',
      'Mastered React, TypeScript, and the modern frontend toolchain',
      
    ],
  },
  {
    role: 'Frontend Developer',
    org: 'Project Teams',
    period: '2024 — 2025',
    summary:
      'Built core interfaces for academic and internal tools, collaborating across design and backend.',
    highlights: [
      'Led frontend development for the JIT Permigo / Student Management System and Alumni Portal',
      'Introduced reusable component libraries to speed delivery',
    ],
  },
  {
    role: 'Freelance Frontend Developer',
    org: 'Independent',
    period: '2025 — Present',
    summary:
      'Designing and building premium web experiences for clients, with a focus on motion, performance, and polish.',
    highlights: [
      'Shipped 6+ production interfaces with Lighthouse scores above 95',
      'Specialized in animation systems with Framer Motion and GSAP',
      'Owned design-to-deploy workflow for each engagement',
    ],
  },
];

export const achievements: Achievement[] = [
  { title: 'Frontend Web Development', issuer: 'Jeppiaar Institute of Technology', year: '2026' },
  { title: 'Game Development', prize:'2nd prize', issuer: 'Kalasalingam University', year: '2025' },
  { title: 'UI/UX Design Fundamentals', issuer: 'ScholarPeak', year: '2025' },
  { title: 'Python for Everybody', issuer: 'Infosys Springboard', year: '2024' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
