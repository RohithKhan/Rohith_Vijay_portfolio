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
  liveUrl: string;
  githubUrl: string;
};

export type Skill = {
  name: string;
  icon: IconType;
  level: number;
  group: 'Frontend' | 'Backend' | 'AI Tools' | 'UI Design' | 'Performance';
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
  year: string;
};

export const profile = {
  name: 'Rohith Vijay',
  role: 'Frontend Developer',
  subtitle:
    'Building immersive digital experiences with modern web technologies.',
  email: 'rohith.khan.dev@gmail.com',
  github: 'https://github.com/rohithkhan',
  linkedin: 'https://www.linkedin.com/in/rohithkhan',
  resume: '/resume.pdf',
  location: 'India',
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
  { name: 'Python', icon: SiPython, level: 72, group: 'Backend' },
  { name: 'REST APIs', icon: TbApi, level: 82, group: 'Backend' },
  { name: 'Git', icon: SiGit, level: 88, group: 'Backend' },
  { name: 'GitHub', icon: SiGithub, level: 90, group: 'Backend' },
  { name: 'UI / UX', icon: TbPalette, level: 84, group: 'UI Design' },
];

export const skillGroups: { name: Skill['group']; blurb: string }[] = [
  { name: 'Frontend', blurb: 'Crafting interfaces that feel alive.' },
  { name: 'Backend', blurb: 'Wiring data, APIs, and infrastructure.' },
  { name: 'AI Tools', blurb: 'Shipping intelligent, assistive features.' },
  { name: 'UI Design', blurb: 'Designing with taste and intention.' },
  { name: 'Performance', blurb: 'Obsessing over every millisecond.' },
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
    liveUrl: '#',
    githubUrl: '#',
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
    stack: ['Next.js', 'TypeScript', 'Node.js', 'REST APIs', 'Tailwind'],
    challenges:
      'Balancing strict security with a frictionless UX meant designing flows that feel instant while never skipping a verification step.',
    impact:
      'Cut standing privileged access to near zero while keeping developer velocity high.',
    accent: '#22C55E',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'jarvis-ai',
    name: 'Jarvis AI Assistant',
    tagline: 'A voice-first assistant that actually feels helpful.',
    year: '2025',
    overview:
      'A conversational AI assistant with voice input, contextual memory, and a sleek heads-up display for daily workflows.',
    problem:
      'Most assistants felt like chatbots bolted onto a text box — no presence, no personality, no real utility.',
    solution:
      'Built a voice-first interface with streaming responses, a memory layer, and quick-action cards for common tasks like summaries and scheduling.',
    stack: ['React', 'Python', 'REST APIs', 'Framer Motion', 'Vite'],
    challenges:
      'Making streaming responses feel instant and natural required careful orchestration of latency, typing, and animation.',
    impact:
      'Became a daily driver for quick research, summaries, and reminders.',
    accent: '#60A5FA',
    liveUrl: '#',
    githubUrl: '#',
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
    stack: ['JavaScript', 'Python', 'REST APIs', 'UI/UX'],
    challenges:
      'Translating real agronomy into believable, performant 3D systems required tight collaboration between domain and dev.',
    impact:
      'Used in workshops to introduce students to sustainable farming decisions.',
    accent: '#22C55E',
    liveUrl: '#',
    githubUrl: '#',
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
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const experiences: Experience[] = [
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
  {
    role: 'Frontend Developer',
    org: 'Project Teams',
    period: '2024 — 2025',
    summary:
      'Built core interfaces for academic and internal tools, collaborating across design and backend.',
    highlights: [
      'Led frontend for the School Management System and Alumni Portal',
      'Introduced reusable component libraries to speed delivery',
    ],
  },
  {
    role: 'Student Developer',
    org: 'Self-taught',
    period: '2023 — 2024',
    summary:
      'Began the journey — learning the web from the ground up and shipping first projects.',
    highlights: [
      'Mastered React, TypeScript, and the modern frontend toolchain',
      'Built and broke dozens of projects to learn the craft',
    ],
  },
];

export const achievements: Achievement[] = [
  { title: 'Frontend Web Development', issuer: 'Coursera', year: '2026' },
  { title: 'Advanced React Patterns', issuer: 'Meta', year: '2025' },
  { title: 'UI/UX Design Fundamentals', issuer: 'Google', year: '2025' },
  { title: 'Python for Everybody', issuer: 'University of Michigan', year: '2024' },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Journey', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
