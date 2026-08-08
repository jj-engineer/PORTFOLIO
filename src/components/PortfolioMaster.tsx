import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { 
  Terminal, Send, CheckCircle2, AlertCircle, Bot, User, Cpu, GitCommit, Power, 
  ExternalLink, Menu, X, ChevronRight, Mail, 
  Globe, Layers3, FileUser, GraduationCap, ArrowRight, Activity, Check, ShieldCheck,
  ShoppingBag, Server, Monitor, Brain, Zap, ArrowUpRight, Sparkles, Code, Database, Layout, Scan
} from 'lucide-react';
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiTailwindcss,
  SiSupabase,
  SiDocker,
  SiVercel,
  SiRailway,
  SiGit,
  SiGithub,
  SiKalilinux
} from 'react-icons/si';
import * as THREE from 'three';

/* -------------------------------------------------------------------------- */
/*                               PROJECT DATA                                 */
/* -------------------------------------------------------------------------- */

interface Project {
  id: string;
  number: string;
  title: string;
  displayTitle: string;
  category: string;
  description: string;
  longDescription: string;
  problem: string;
  built: string[];
  techStack: string[];
  role: string;
  image?: string;
  status: 'ACTIVE_DEPLOY' | 'UNDER_MAINTENANCE';
  url?: string;
  icon?: React.ReactNode;
}

const projects: Project[] = [
  {
    id: '01',
    number: 'PROJECT_01',
    title: 'Smart-System-BACII-Education-Platform',
    displayTitle: 'Smart BAC II Education Platform',
    category: 'EDUCATION / AI / FULL-STACK',
    description: 'An AI-powered learning platform designed to help Cambodian Grade 12 students study, practice, and prepare for the BAC II examination.',
    longDescription: 'Smart BAC II Education Platform is a comprehensive digital learning solution designed specifically for Cambodian high school students preparing for their national grade 12 examinations.',
    problem: 'Grade 12 students face limited access to real-time tutoring, structured Cambodian curriculum study materials, and automated practice exam feedback.',
    built: [
      'Interactive subject practice modules tailored to Grade 12 curriculum',
      'AI assistant providing step-by-step problem explanations',
      'Student performance tracking and weak-area diagnostic dashboard',
      'Responsive, low-latency interface engineered for mobile and web'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'FastAPI', 'Supabase'],
    role: 'AI Engineering + Full-Stack Architect',
    image: '/learning.jpg', 
    status: 'ACTIVE_DEPLOY',
    url: 'https://bakdub.vercel.app/'
  },
  {
    id: '02',
    number: 'PROJECT_02',
    title: 'AI-Math-Learning-System',
    displayTitle: 'AI Math Learning System',
    category: 'EDUCATION / AI / MATH',
    description: 'An interactive mathematics learning platform that helps students practice problems, understand concepts, and improve performance through AI-assisted feedback.',
    longDescription: 'An intelligent mathematics workspace that transforms static problem sets into interactive, adaptive learning experiences with immediate feedback loops.',
    problem: 'Traditional math tools show answers without breaking down logical steps, leaving students stuck when solving complex equations independently.',
    built: [
      'Step-by-step mathematical reasoning pipeline',
      'Dynamic quiz generator based on individual student accuracy',
      'Fast vector retrieval for instant formula and concept lookup',
      'Clean formula rendering and interactive scratchpad workspace'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Vector Search'],
    role: 'Full-Stack Developer + AI Integration',
    image: '/Math.jpg', 
    status: 'ACTIVE_DEPLOY',
    url: 'https://math-quiz-khmer.vercel.app/'
  },
  {
    id: '03',
    number: 'PROJECT_03',
    title: 'PureAxis-UI-Framework',
    displayTitle: 'PureAxis UI Framework',
    category: 'UI SYSTEM / FRONTEND',
    description: 'A reusable interface system focused on building consistent, modern, high-performance web experiences.',
    longDescription: 'A modular design system and React component library engineered for dark-mode, high-density dashboard and engineering interfaces.',
    problem: 'Building bespoke engineering UI components repeatedly creates code duplication, inconsistent styling, and slow product execution.',
    built: [
      'Accessible, highly customizable core UI primitives',
      'Performance-optimized motion primitives utilizing Framer Motion',
      'Strict TypeScript design token architecture',
      'Interactive design tokens documentation'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    role: 'Frontend Architect',
    status: 'UNDER_MAINTENANCE',
    icon: <Layers3 className="w-10 h-10 text-red-500" />
  },
  {
    id: '04',
    number: 'PROJECT_04',
    title: 'CV-Generator-System',
    displayTitle: 'CV Generator System',
    category: 'PRODUCTIVITY / AI / DOCUMENTS',
    description: 'A web-based CV creation system designed to help users build professional resumes through a guided and structured workflow.',
    longDescription: 'An automated document generator that translates user input into clean, ATS-compliant professional resumes and portfolio metadata.',
    problem: 'Job seekers struggle with formatting, phrasing achievements effectively, and generating modern print-ready portfolio resumes.',
    built: [
      'Real-time live document preview engine',
      'AI content polishing and phrase optimization assistant',
      'Structured PDF compilation pipeline',
      'Customizable dark/light aesthetic export templates'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'PDF Kit'],
    role: 'Full-Stack Developer',
    status: 'UNDER_MAINTENANCE',
    icon: <FileUser className="w-10 h-10 text-red-500" />
  },
  {
    id: '05',
    number: 'PROJECT_05',
    title: 'E-Learning-Program',
    displayTitle: 'E-Learning Platform',
    category: 'EDUCATION / LEARNING',
    description: 'A digital learning environment designed to make online education more accessible, structured, and engaging.',
    longDescription: 'A flexible, modern learning management environment built to deliver structured courses, video lessons, and interactive assessments.',
    problem: 'Conventional learning platforms are often cluttered, slow on mobile connections, and lack real-time progress indicators.',
    built: [
      'Streamlined course navigation and lesson playback environment',
      'Real-time student progress tracking and quiz scoring',
      'Secure enrollment and user management backend',
      'Mobile-first responsive interface design'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    role: 'Full-Stack Developer',
    status: 'UNDER_MAINTENANCE',
    icon: <GraduationCap className="w-10 h-10 text-red-500" />
  }
];

/* -------------------------------------------------------------------------- */
/*                         CAPABILITIES / SERVICES DATA                       */
/* -------------------------------------------------------------------------- */

interface CapabilityService {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  tags: string[];
  icon: React.ReactNode;
  problem: string;
  solution: string;
  deliverables: string[];
  techStack: { name: string; category: string }[];
  clientValue: string;
  engineeringImpl: string;
  useCases: string[];
}

const capabilityServices: CapabilityService[] = [
  {
    id: 'websites',
    number: '01',
    title: 'Professional Websites',
    shortDesc: 'Modern, fast, responsive websites built around your brand, customers, and business goals.',
    tags: ['BUSINESS', 'BRANDING', 'RESPONSIVE', 'FULL-STACK'],
    icon: <Globe className="w-6 h-6 text-red-500" />,
    problem: 'Your business may have a great product or service, but without a fast, professional online presence, potential customers struggle to understand what you offer, trust your brand, or contact you.',
    solution: 'I design and build high-performance, modern websites that present your business clearly, build instant trust, and give clients a smooth way to discover, inquire, and interact with you on any device.',
    deliverables: [
      'Modern, custom user interface & brand styling',
      'Mobile + tablet + desktop fully responsive design',
      'Backend API & database integration when required',
      'Admin functionality & content management options',
      'Contact & inquiry forms with direct notifications',
      'SEO optimization & edge production deployment'
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Supabase', category: 'Database & Auth' },
      { name: 'Vercel', category: 'Global Hosting' }
    ],
    clientValue: 'More professional online presence → Easier customer discovery → Stronger brand trust → Higher lead conversion.',
    engineeringImpl: 'Built with React component architecture, Tailwind styling tokens, serverless backend handlers, and automated CI/CD deployment.',
    useCases: [
      'Company & Corporate Websites',
      'Professional Business Profiles',
      'Personal Brand & Portfolio Sites',
      'High-Converting Landing Pages',
      'Service Provider Websites',
      'Custom Portals with Backend Logic'
    ]
  },
  {
    id: 'ecommerce',
    number: '02',
    title: 'E-Commerce & Payments',
    shortDesc: 'Sell products online with a complete shopping experience, order management, and payment integration.',
    tags: ['ONLINE STORE', 'PAYMENTS', 'ORDERS', 'AUTOMATION'],
    icon: <ShoppingBag className="w-6 h-6 text-red-500" />,
    problem: 'Selling through manual social media messages and spreadsheets is slow, prone to missed orders, difficult to manage as inventory grows, and frustrating for buyers.',
    solution: 'A complete custom online store that presents your catalog clearly, manages real-time carts, automates checkout flows, and handles payment processing structured for your target market.',
    deliverables: [
      'Interactive product catalog with category filters & search',
      'Shopping cart & seamless multi-step checkout workflow',
      'Customer accounts & order history portal',
      'Admin dashboard for products, stock, and status updates',
      'ABA / KHQR / payment provider integration (subject to API availability)',
      'Automated email/message order receipts and alerts'
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'Tailwind CSS', category: 'Styling' },
      { name: 'Supabase', category: 'Database & Security' },
      { name: 'Payment APIs', category: 'Checkout' },
      { name: 'Vercel', category: 'Cloud' }
    ],
    clientValue: 'More products visible online → Faster checkout process → Automated order tracking → Centralized inventory control.',
    engineeringImpl: 'Relational database schema for orders and items, atomic checkout state management, encrypted tokenized transaction callbacks.',
    useCases: [
      'Retail & Fashion Online Stores',
      'Digital Product Sales Platforms',
      'Subscription & Service Checkout',
      'Local Business Online Ordering',
      'Custom Shopping Web Apps'
    ]
  },
  {
    id: 'business-systems',
    number: '03',
    title: 'Custom Business Systems',
    shortDesc: 'If your business relies on manual work, spreadsheets, messages, or repetitive processes, I can turn that workflow into a custom system.',
    tags: ['CUSTOM SYSTEM', 'WORKFLOW', 'MANAGEMENT', 'AUTOMATION'],
    icon: <Server className="w-6 h-6 text-red-500" />,
    problem: 'Businesses waste dozens of hours each week handling staff schedules, customer bookings, inventory counts, and invoices across disconnected spreadsheets and chat groups.',
    solution: 'I translate your messy paper or spreadsheet operations into a single, secure digital system built around how your business actually runs, eliminating repetitive administrative stress.',
    deliverables: [
      'Centralized management dashboard with real-time stats',
      'Role-based permissions (Admin, Manager, Staff)',
      'Customer, staff, and booking tracking databases',
      'Automated workflow triggers and task assignments',
      'Document management and PDF export generators',
      'Secure authentication and activity audit logging'
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'FastAPI', category: 'Backend Engine' },
      { name: 'Supabase', category: 'PostgreSQL DB' },
      { name: 'Docker', category: 'Containerization' },
      { name: 'Railway', category: 'Backend Hosting' }
    ],
    clientValue: 'Less manual administrative work → Fewer operational errors → Centralized business data → Effortless team management.',
    engineeringImpl: 'RESTful API architecture using FastAPI, relational PostgreSQL constraints, JWT-based role authorization, and scalable server instances.',
    useCases: [
      'Employee & Attendance Systems',
      'Client Management & Booking Portals',
      'Internal Operations Dashboards',
      'Document & Billing Management Systems',
      'Custom Industry Administrative Tools'
    ]
  },
  {
    id: 'pos',
    number: '04',
    title: 'POS Systems',
    shortDesc: 'Point-of-sale systems designed to make selling, inventory, reporting, and daily operations easier.',
    tags: ['POS', 'INVENTORY', 'SALES', 'REPORTING'],
    icon: <Monitor className="w-6 h-6 text-red-500" />,
    problem: 'Retail stores and food outlets suffer from long customer lines, untracked inventory leaks, inaccurate end-of-day counts, and complex legacy software.',
    solution: 'A fast, intuitive Point-of-Sale interface engineered for high-speed counter operations, real-time stock deduction, quick receipts, and clear daily management reporting.',
    deliverables: [
      'High-speed touch-friendly sales counter interface',
      'Product catalog, variations, and barcode lookup',
      'Real-time inventory deduction and stock level warnings',
      'Customer records, loyalty tracking, and receipt generation',
      'Daily, weekly, and monthly revenue analytics dashboards',
      'Multi-staff login with manager permissions and cash audit'
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Language' },
      { name: 'FastAPI', category: 'Backend API' },
      { name: 'Supabase', category: 'Database' },
      { name: 'Railway', category: 'Cloud Server' }
    ],
    clientValue: 'Faster checkout queues → Accurate inventory visibility → Instant sales analytics → Zero end-of-day math headaches.',
    engineeringImpl: 'Optimized local UI cache for zero latency checkout, transactional database commits for stock consistency, aggregated reporting queries.',
    useCases: [
      'Restaurants & Coffee Shops',
      'Retail Stores & Boutiques',
      'Supermarkets & Convenience Stores',
      'Service Counters & Salons',
      'Multi-Branch Sales Operations'
    ]
  },
  {
    id: 'ai-analytics',
    number: '05',
    title: 'AI Analytics & Intelligence',
    shortDesc: 'Turn your business data and documents into useful insights, analysis, recommendations, and intelligent workflows.',
    tags: ['AI', 'ANALYTICS', 'INSIGHTS', 'DECISION SUPPORT'],
    icon: <Brain className="w-6 h-6 text-red-500" />,
    problem: 'Businesses sit on piles of customer records, sales reports, and operational PDFs, but lack the time or tools to extract meaningful insights to guide decisions.',
    solution: 'I embed specialized AI models and intelligence pipelines directly into your software, allowing you to converse with your data, summarize complex documents, and spot operational trends automatically.',
    deliverables: [
      'AI-powered business analytics & insight generators',
      'Document analysis pipelines (PDFs, reports, contracts)',
      'Custom internal AI assistant tuned to your operations',
      'Automated weekly intelligence and trend summaries',
      'Smart customer query routing and automated categorization',
      'Interactive executive decision support dashboards'
    ],
    techStack: [
      { name: 'React', category: 'Frontend' },
      { name: 'Python', category: 'AI Core' },
      { name: 'FastAPI', category: 'Microservices' },
      { name: 'Supabase', category: 'Vector Store' },
      { name: 'LLM / AI APIs', category: 'Intelligence' }
    ],
    clientValue: 'More useful business insights → Faster data analysis → Smarter operational decisions → Reduced reporting overhead.',
    engineeringImpl: 'Vector embeddings retrieval (RAG pipeline), structured prompt engineering, asynchronous microservice processing in Python FastAPI.',
    useCases: [
      'Business Performance Analytics',
      'Automated Document Processing',
      'Internal Customer Support AI Agents',
      'Executive Intelligence Dashboards',
      'AI Recommendation Engines'
    ]
  },
  {
    id: 'automation',
    number: '06',
    title: 'Automation & Remote Systems',
    shortDesc: 'Automate repetitive work and connect your tools so your business can operate with less manual effort.',
    tags: ['AUTOMATION', 'REMOTE', 'INTEGRATION', 'WORKFLOW'],
    icon: <Zap className="w-6 h-6 text-red-500" />,
    problem: 'Staff members spend hours copying numbers from one tool to another, sending manual reminder messages, and triggering daily routines manually.',
    solution: 'I build automated background pipelines that bridge your existing tools, automatically transfer data, send instant alerts, and run scheduled tasks while you sleep.',
    deliverables: [
      'Custom API integrations between distinct software systems',
      'Automated Telegram / Email / WhatsApp notifications',
      'Scheduled background syncs and nightly batch processing',
      'Remote system status and monitoring control panels',
      'AI-driven workflow triggers and automated data cleanup',
      'Error logging and automatic failure recovery hooks'
    ],
    techStack: [
      { name: 'Python', category: 'Core Scripting' },
      { name: 'FastAPI', category: 'Webhook Server' },
      { name: 'APIs & Webhooks', category: 'Integration' },
      { name: 'Docker', category: 'Execution Environment' },
      { name: 'Railway', category: 'Background Hosting' }
    ],
    clientValue: 'Less repetitive manual labor → Elimination of human copy-paste errors → Faster execution → Focus on core business growth.',
    engineeringImpl: 'Asynchronous event listeners, cron job schedules, webhook handlers, fault-tolerant retry queues with alert notifications.',
    useCases: [
      'Cross-Platform Data Synchronization',
      'Automated Customer Alerts & Reminders',
      'Scheduled Data Backups & Exports',
      'Remote Operations Monitoring',
      'Automated Invoice & Email Workflows'
    ]
  }
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/* -------------------------------------------------------------------------- */
/*                         GLOBAL MOTION PRIMITIVES                           */
/* -------------------------------------------------------------------------- */

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: PREMIUM_EASE } 
  }
};

const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const staggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(2px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: PREMIUM_EASE } 
  }
};

/* -------------------------------------------------------------------------- */
/*                       BOOT SEQUENCE THREE.JS SYSTEM CORE                  */
/* -------------------------------------------------------------------------- */

const BootSystemCoreCanvas: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    currentMount.appendChild(renderer.domElement);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Glowing Red Central Core
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(coreMesh);

    // Inner Glowing Core Solid
    const innerGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Thin Circular Orbital Rings
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xdc2626, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.5, 0.01, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    // Particles
    const particlesCount = isMobile ? 25 : 55;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 0.05,
      transparent: true,
      opacity: 0.7
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      coreGroup.rotation.y = elapsedTime * 0.4;
      coreGroup.rotation.x = elapsedTime * 0.25;

      ring1.rotation.z = elapsedTime * 0.5;
      ring2.rotation.z = -elapsedTime * 0.3;

      const pulse = 1 + Math.sin(elapsedTime * 3) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);

      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  return <div ref={mountRef} className="w-full h-full" />;
};

/* -------------------------------------------------------------------------- */
/*                          DESKTOP SPECIFIC HELPERS                          */
/* -------------------------------------------------------------------------- */

const TypewriterHeading: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "// Information\nAbout Me";
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (isInView) {
      setDisplayText('');
      let i = 0;
      const timer = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 45);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="min-h-[110px]">
      <span className="text-xs tracking-widest uppercase text-red-500 block mb-2 whitespace-pre-line font-mono">
        {displayText.split('\n')[0]}
      </span>
      <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight mb-6">
        {displayText.split('\n')[1] ? (
          <>
            {displayText.split('\n')[1].split(' - ')[0]} - <span className="italic text-red-600">{displayText.split('\n')[1].split(' - ')[1]}</span>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-2.5 h-7 bg-red-600 ml-1.5 align-middle shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        />
      </h2>
    </div>
  );
};

const SystemEngineeringModelCanvas: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xdc2626, 3, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2, 50);
    cyanLight.position.set(-5, -5, 2);
    scene.add(cyanLight);

    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0xdc2626,
      emissiveIntensity: 0.25,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    systemGroup.add(coreMesh);

    const wireframeGeometry = new THREE.IcosahedronGeometry(1.48, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc2626,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    systemGroup.add(wireframeMesh);

    const ringGroup1 = new THREE.Group();
    const ringGeo1 = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.9 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ringGroup1.add(ring1);
    systemGroup.add(ringGroup1);

    const ringGroup2 = new THREE.Group();
    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.1, metalness: 0.9 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ringGroup2.add(ring2);
    systemGroup.add(ringGroup2);

    const particlesCount = isMobile ? 30 : 75;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xdc2626,
      size: 0.06,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      systemGroup.rotation.y = elapsedTime * 0.2 + targetX * 0.6;
      systemGroup.rotation.x = elapsedTime * 0.15 + targetY * 0.6;

      ringGroup1.rotation.z = elapsedTime * 0.35;
      ringGroup2.rotation.z = -elapsedTime * 0.25;

      coreMesh.rotation.y = -elapsedTime * 0.4;
      wireframeMesh.rotation.y = -elapsedTime * 0.4;

      const heartbeatScale = 1 + Math.sin(elapsedTime * 1.5) * 0.015;
      coreMesh.scale.set(heartbeatScale, heartbeatScale, heartbeatScale);
      wireframeMesh.scale.set(heartbeatScale, heartbeatScale, heartbeatScale);

      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div className={`relative w-full ${isMobile ? 'h-[240px]' : 'h-[320px] md:h-[380px]'} flex items-center justify-center bg-[#0e0e0e]/50 border border-red-900/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.12)] group`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10"></div>
      <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center bg-black/70 backdrop-blur-md px-3 py-2 border border-red-900/40 rounded-lg pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] text-red-400 font-mono uppercase tracking-widest">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          <span>SYSTEM ARCHITECTURE ENGINE</span>
        </div>
        {!isMobile && <span className="text-[10px] text-zinc-500 font-mono">[INTERACTIVE MODEL]</span>}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           MAIN MASTER COMPONENT                            */
/* -------------------------------------------------------------------------- */

export const PortfolioMaster: React.FC = () => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);
    return () => window.removeEventListener('resize', handleCheckMobile);
  }, []);

  // REFACTORED BOOT/LOADING STATE MACHINE
  type BootState = 'booting' | 'ready' | 'authorizing' | 'entered';
  const [bootState, setBootState] = useState<BootState>('booting');
  const [visibleLogIndex, setVisibleLogIndex] = useState<number>(0);

  const bootLogLines = [
    "[01] INITIALIZING CORE SYSTEM............. OK",
    "[02] LOADING AI ARCHITECTURE............. OK",
    "[03] MOUNTING DIGITAL SYSTEMS............ OK",
    "[04] ESTABLISHING SECURE CONNECTION...... OK",
    "[05] LOADING PORTFOLIO ENVIRONMENT....... OK"
  ];

  // 3-SECOND AUTOMATIC TIMELINE
  useEffect(() => {
    if (bootState !== 'booting') return;

    const logTimers = [
      setTimeout(() => setVisibleLogIndex(1), 1000),
      setTimeout(() => setVisibleLogIndex(2), 1400),
      setTimeout(() => setVisibleLogIndex(3), 1800),
      setTimeout(() => setVisibleLogIndex(4), 2200),
      setTimeout(() => setVisibleLogIndex(5), 2600),
      setTimeout(() => setBootState('ready'), 3000)
    ];

    return () => logTimers.forEach(t => clearTimeout(t));
  }, [bootState]);

  const handleAuthorizeClick = () => {
    if (bootState !== 'ready') return;
    setBootState('authorizing');
    setTimeout(() => {
      setBootState('entered');
    }, 800);
  };

  // Roadmap Hover-Follow Motion Values
  const cursorX = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const smoothXPercent = useTransform(smoothX, (v) => `${v}%`);
  const [isRoadmapHovered, setIsRoadmapHovered] = useState(false);
  const roadmapCardRef = useRef<HTMLDivElement>(null);

  const handleRoadmapMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!roadmapCardRef.current) return;
    const rect = roadmapCardRef.current.getBoundingClientRect();
    const xRelative = e.clientX - rect.left;
    const percent = (xRelative / rect.width) * 100;
    const clampedPercent = Math.max(7, Math.min(93, percent));
    cursorX.set(clampedPercent);
  };

  const [formData, setFormData] = useState({ sender_name: '', sender_email: '', project_scope: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'JJ_AGENT v2.5 initialized. Ask me anything about my AI engineering stack, capabilities, or development roadmap.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeTechModal, setActiveTechModal] = useState<{
    name: string;
    category: string;
    desc: string;
    projectsUsed: string;
    reason: string;
    icon?: React.ReactNode;
  } | null>(null);

  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // SELECTED CAPABILITY DETAIL MODAL STATE
  const [activeCapabilityModal, setActiveCapabilityModal] = useState<CapabilityService | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoadmapMobile, setShowRoadmapMobile] = useState(false);
  const [hoveredRoadmapNode, setHoveredRoadmapNode] = useState<number | null>(null);

  // Esc Key support & Body Scroll Locking for Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCapabilityModal(null);
        setActiveProjectModal(null);
        setActiveTechModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (activeCapabilityModal || activeProjectModal || activeTechModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeCapabilityModal, activeProjectModal, activeTechModal]);

  useEffect(() => {
    if (isCarouselHovered || isMobileDevice) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCarouselHovered, isMobileDevice]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Transmission failed.');
      setStatus('success');
      setFormData({ sender_name: '', sender_email: '', project_scope: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Server connection error.');
    }
  };

  const handleCopilotSubmit = (e?: React.FormEvent, promptOverride?: string) => {
    if (e) e.preventDefault();
    const query = promptOverride || input;
    if (!query.trim() || isProcessing) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsProcessing(true);

    setTimeout(() => {
      let responseContent = `Processed query "${query}" successfully with zero token loss and 38ms latency.`;
      if (query.toLowerCase().includes('build') || query.toLowerCase().includes('what can you')) {
        responseContent = "I design and build complete digital products—websites, business management systems, e-commerce stores, POS terminals, AI tools, and custom backend automation pipelines.";
      } else if (query.toLowerCase().includes('stack') || query.toLowerCase().includes('ai')) {
        responseContent = "My production stack includes React, TypeScript, Tailwind CSS, Python, FastAPI, Supabase (PostgreSQL), Docker, Railway, Vercel, and specialized LLM APIs.";
      } else if (query.toLowerCase().includes('projects') || query.toLowerCase().includes('tell me about')) {
        responseContent = "Deployed projects include the Smart BAC II Education Platform and the AI Math Learning System, alongside custom UI systems and automated document engines.";
      } else if (query.toLowerCase().includes('approach')) {
        responseContent = "I follow a continuous 8-stage product development process: Discover → Plan → Design → Build → Integrate → Test → Deploy → Improve.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      setIsProcessing(false);
    }, 800);
  };

  const roadmapNodes = [
    {
      num: "01",
      title: "DISCOVER",
      summary: "Understand your business goals & workflow pain points",
      details: ["Client Consultation", "Requirement Discovery", "User Persona Setup", "Scope Definition"],
      clientValue: "I understand the real business problem before writing any code."
    },
    {
      num: "02",
      title: "PLAN",
      summary: "Define architecture, data models & system blueprints",
      details: ["System Schemas", "Database Modeling", "API Routing Blueprint", "Milestone Roadmap"],
      clientValue: "You get a structured plan of exactly what will be built."
    },
    {
      num: "03",
      title: "DESIGN",
      summary: "Craft clean, modern UI/UX tailored to your brand",
      details: ["Wireframes", "Interactive Prototypes", "Responsive Systems", "Accessibility Standards"],
      clientValue: "Your customers get an intuitive, premium interface."
    },
    {
      num: "04",
      title: "BUILD",
      summary: "Full-stack frontend & backend product engineering",
      details: ["React / TypeScript UI", "FastAPI / Python Logic", "Supabase DB & Auth", "Business Logic"],
      clientValue: "Your idea turns into a fully functioning digital system."
    },
    {
      num: "05",
      title: "INTEGRATE",
      summary: "Connect payments, AI models & third-party APIs",
      details: ["Payment Provider APIs", "LLM & Vector Pipelines", "Automated Webhooks", "Notification Channels"],
      clientValue: "Your software connects seamlessly to payments, AI, and external tools."
    },
    {
      num: "06",
      title: "TEST",
      summary: "Rigorous quality, speed, security & cross-device checks",
      details: ["Security Hardening", "Mobile Usability Check", "Edge Latency Audit", "End-to-End Testing"],
      clientValue: "Your product operates reliably without unexpected bugs or crashes."
    },
    {
      num: "07",
      title: "DEPLOY",
      summary: "Ship production systems to global cloud infrastructure",
      details: ["Vercel Edge & Railway", "Custom Domain Config", "SSL & Env Hardening", "CI/CD Deployment"],
      clientValue: "Your system goes live smoothly for real customers to use."
    },
    {
      num: "08",
      title: "IMPROVE",
      summary: "Monitor performance, squash bugs & add future features",
      details: ["Real-time Telemetry", "User Feedback Refinements", "Performance Tuning", "Ongoing Scalability"],
      clientValue: "Your digital asset continues to evolve as your business grows."
    }
  ];

  const modalBuildSteps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "Understand your business, users, goals, and primary workflow pain points.",
      impl: "Stakeholder alignment, technical requirements document, feature prioritization matrix."
    },
    {
      num: "02",
      title: "PLAN",
      desc: "Define product features, user flows, database structures, and overall system architecture.",
      impl: "ERD database diagramming, REST API schema definition, security policy modeling."
    },
    {
      num: "03",
      title: "DESIGN",
      desc: "Create the interface and interaction structure before full-scale software development.",
      impl: "Tailwind design tokens, modular React component hierarchy, desktop/mobile wireframes."
    },
    {
      num: "04",
      title: "BUILD",
      desc: "Develop the frontend views, backend logic, database tables, authentication, and core business rules.",
      impl: "Typed React components, FastAPI route handlers, Supabase row-level security constraints."
    },
    {
      num: "05",
      title: "INTEGRATE",
      desc: "Connect payments, AI capabilities, external APIs, messaging notifications, or required integrations.",
      impl: "Third-party payment gateways, OpenAI/Anthropic/Gemini APIs, automated webhook handlers."
    },
    {
      num: "06",
      title: "TEST",
      desc: "Test system functionality, mobile responsiveness, operational security, and real-world user flows.",
      impl: "End-to-end integration tests, mobile viewport validation, API latency stress testing."
    },
    {
      num: "07",
      title: "DEPLOY",
      desc: "Launch the system online with secure domains, edge servers, and production environment settings.",
      impl: "Vercel edge hosting, Railway container instances, SSL certificates, environment variables."
    },
    {
      num: "08",
      title: "IMPROVE",
      desc: "Monitor live operations, fix emerging issues, optimize loading speeds, and scale new features over time.",
      impl: "Error telemetry, performance query optimization, continuous feature iteration pipelines."
    }
  ];

  const techWallData = [
    { 
      name: "React", 
      category: "Frontend", 
      desc: "Component-based UI library for building scalable, responsive web applications.", 
      projectsUsed: "Portfolio, BAC II Platform, Math Learning System", 
      reason: "Chosen for component modularity and vast ecosystem support.",
      icon: <SiReact className="w-5 h-5 text-zinc-400 group-hover:text-[#61DAFB] transition-colors" aria-hidden="true" /> 
    },
    { 
      name: "TypeScript", 
      category: "Language", 
      desc: "Typed superset of JavaScript ensuring robust type safety and maintainability.", 
      projectsUsed: "All Core Web Products", 
      reason: "Eliminates runtime errors and provides pristine IDE autocomplete.",
      icon: <SiTypescript className="w-5 h-5 text-zinc-400 group-hover:text-[#3178C6] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Python", 
      category: "Backend / AI", 
      desc: "Core language for backend server architectures and AI model integration scripts.", 
      projectsUsed: "BAC II AI Backend, Fast Vector Pipeline", 
      reason: "Industry standard for AI, machine learning, and rapid scripting.",
      icon: <SiPython className="w-5 h-5 text-zinc-400 group-hover:text-[#3776AB] transition-colors" aria-hidden="true" />
    },
    { 
      name: "FastAPI", 
      category: "Backend", 
      desc: "High-performance Python web framework for building fast RESTful APIs.", 
      projectsUsed: "AI Microservices & Math Engine API", 
      reason: "Blazing speed, automatic Swagger docs, and native async support.",
      icon: <SiFastapi className="w-5 h-5 text-zinc-400 group-hover:text-[#009688] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Tailwind CSS", 
      category: "Styling", 
      desc: "Utility-first CSS framework for crafting bespoke dark editorial interfaces.", 
      projectsUsed: "All Web Interfaces", 
      reason: "Unmatched styling speed and pristine design consistency.",
      icon: <SiTailwindcss className="w-5 h-5 text-zinc-400 group-hover:text-[#06B6D4] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Supabase", 
      category: "Database", 
      desc: "Open-source Firebase alternative with PostgreSQL, Auth, and Realtime features.", 
      projectsUsed: "BAC II Platform & User Storage", 
      reason: "Provides instant database scaffolding with robust security policies.",
      icon: <SiSupabase className="w-5 h-5 text-zinc-400 group-hover:text-[#3ECF8E] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Docker", 
      category: "DevOps", 
      desc: "Containerization tool for packaging applications and dependencies reliably.", 
      projectsUsed: "Local Development & Backend Services", 
      reason: "Ensures identical environments across development and production.",
      icon: <SiDocker className="w-5 h-5 text-zinc-400 group-hover:text-[#2496ED] transition-colors" aria-hidden="true" />
    },
    { 
      name: "Vercel", 
      category: "Cloud", 
      desc: "Cloud platform for static sites and serverless frontend deployments.", 
      projectsUsed: "Frontend Applications & Demos", 
      reason: "Instant global deployments, SSL, and optimal edge performance.",
      icon: <SiVercel className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" aria-hidden="true" />
    },
    { 
      name: "Railway", 
      category: "Cloud", 
      desc: "Infrastructure platform for deploying backend services, databases, and APIs.", 
      projectsUsed: "FastAPI & Python Pipelines", 
      reason: "Effortless server management and seamless environment variable sync.",
      icon: <SiRailway className="w-5 h-5 text-zinc-400 group-hover:text-[#0B0D0E] dark:group-hover:text-white transition-colors" aria-hidden="true" />
    },
    { 
      name: "Git", 
      category: "Versioning", 
      desc: "Distributed version control system for tracking changes in source code.", 
      projectsUsed: "All Repositories", 
      reason: "Essential for tracking code history and managing code revisions.",
      icon: <SiGit className="w-5 h-5 text-zinc-400 group-hover:text-[#F05032] transition-colors" aria-hidden="true" />
    },
    { 
      name: "GitHub", 
      category: "Versioning", 
      desc: "Cloud platform for git repository hosting, code reviews, and CI/CD automation.", 
      projectsUsed: "All Repositories", 
      reason: "Industry benchmark for project management and remote team collaboration.",
      icon: <SiGithub className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" aria-hidden="true" />
    },
    { 
      name: "VS Code", 
      category: "Environment", 
      desc: "Extensible source code editor tailored with custom AI extensions.", 
      projectsUsed: "Primary Workspace", 
      reason: "Unrivaled extension ecosystem and deep terminal integration.",
      icon: (
        <img
          src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/visual-studio-code.svg"
          alt=""
          aria-hidden="true"
          className="w-5 h-5 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
        />
      )
    },
    { 
      name: "Kali Linux", 
      category: "Security", 
      desc: "Linux distribution focused on security auditing and network testing.", 
      projectsUsed: "Security & System Hardening Audits", 
      reason: "Essential toolkit for understanding cybersecurity and web safety.",
      icon: <SiKalilinux className="w-5 h-5 text-zinc-400 group-hover:text-[#557CDA] transition-colors" aria-hidden="true" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#e4e2e1] selection:bg-red-600 selection:text-white font-mono relative overflow-x-hidden">
      
      {/* Dynamic Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-red-600 z-[100] origin-left shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        style={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
      />

      {/* REACT-POWERED CINEMATIC AI BOOT & AUTHORIZATION OVERLAY */}
      <AnimatePresence>
        {bootState !== 'entered' && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.03, 
              filter: "blur(10px)",
              transition: { duration: 0.8, ease: PREMIUM_EASE } 
            }}
            className="fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col justify-between p-4 sm:p-6 md:p-12 border-b border-red-900/30 overflow-hidden font-mono select-none"
          >
            {/* Background Visual Enhancements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            {/* Subtle Scanning Sweep Line */}
            <motion.div 
              animate={{ y: ['-100%', '1000%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-red-600/5 to-transparent pointer-events-none"
            />

            {/* TOP BAR */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-20 flex justify-between items-center text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 border-b border-zinc-900 pb-3"
            >
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]" />
                <span>● JJ // SYSTEM BOOT</span>
                <span className="text-zinc-600 hidden sm:inline ml-2">PORTFOLIO ENVIRONMENT INITIALIZING</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500 hidden md:inline">[SECURE ENVIRONMENT]</span>
                <span className="text-red-500 font-bold">
                  [{bootState === 'booting' ? 'INITIALIZING...' : 'ONLINE'}]
                </span>
              </div>
            </motion.div>

            {/* CENTER CONTENT */}
            <div className="relative z-20 my-auto flex flex-col items-center justify-center max-w-xl mx-auto w-full py-4">
              <AnimatePresence mode="wait">
                {bootState === 'booting' && (
                  <motion.div 
                    key="booting-phase"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center w-full"
                  >
                    {/* 3D System Architecture Central Core */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: PREMIUM_EASE }}
                      className="w-48 h-48 sm:w-60 sm:h-60 relative flex items-center justify-center my-2"
                    >
                      <BootSystemCoreCanvas isMobile={isMobileDevice} />
                      <div className="absolute inset-0 rounded-full border border-red-600/20 animate-ping pointer-events-none" />
                    </motion.div>

                    {/* Sequential Boot Logs Terminal */}
                    <div className="w-full bg-[#101010]/90 border border-zinc-800/80 p-4 rounded-xl shadow-2xl space-y-2 mt-4 backdrop-blur-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 border-b border-zinc-800/60 mb-2 font-mono">
                        <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-red-500" /> SYSTEM_KERNEL_LOG</span>
                        <span>EXECUTION_MODE: AUTO</span>
                      </div>

                      <div className="space-y-1.5 text-[10px] sm:text-[11px] font-mono min-h-[120px]">
                        {bootLogLines.map((line, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                            animate={visibleLogIndex > idx ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -8, filter: "blur(4px)" }}
                            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                            className={`flex justify-between items-center ${idx === visibleLogIndex - 1 ? 'text-zinc-200' : 'text-zinc-500'}`}
                          >
                            <span>{line.split('.............')[0]}.............</span>
                            <span className="text-red-500 font-bold ml-2">OK</span>
                          </motion.div>
                        ))}

                        {visibleLogIndex >= 5 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="pt-2 border-t border-zinc-800/60 mt-2 space-y-1"
                          >
                            <p className="text-white font-bold tracking-wider flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                              SYSTEM READY.
                            </p>
                            <p className="text-red-400 font-mono text-[10px] flex items-center gap-1">
                              WAITING FOR HUMAN AUTHORIZATION...
                              <span className="inline-block w-1.5 h-3 bg-red-600 animate-pulse" />
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {(bootState === 'ready' || bootState === 'authorizing') && (
                  <motion.div 
                    key="authorization-phase"
                    initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                    transition={{ duration: 0.6, ease: PREMIUM_EASE }}
                    className="w-full max-w-md bg-[#111111] border border-red-900/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(220,38,38,0.18)] relative overflow-hidden text-center backdrop-blur-md"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-900" />
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] text-red-500 font-mono tracking-widest uppercase mb-4">
                      <ShieldCheck className="w-4 h-4 text-red-500 animate-pulse" />
                      <span>// SYSTEM ACCESS CONTROL</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-tight font-black leading-tight">
                      ARE YOU READY <br />
                      <span className="text-red-600">TO ENTER MY PORTFOLIO?</span>
                    </h2>

                    <p className="text-xs text-zinc-400 font-mono mt-3 leading-relaxed max-w-xs mx-auto">
                      The system is initialized. <br />
                      Your access request is ready.
                    </p>

                    <div className="mt-8 space-y-3">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAuthorizeClick}
                        disabled={bootState === 'authorizing'}
                        aria-label="Authorize access and enter portfolio"
                        className="w-full py-4 px-6 bg-[#181818] hover:bg-red-950/40 border border-red-600/80 hover:border-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] flex items-center justify-center gap-3 group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {bootState === 'ready' ? (
                          <>
                            <span>[ ENTER PORTFOLIO → ]</span>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-red-400">
                            <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                            <span>[ AUTHORIZING... ACCESS GRANTED ]</span>
                          </div>
                        )}
                      </motion.button>

                      {bootState === 'ready' && (
                        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                          AUTHENTICATION REQUIRED TO PROCEED
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BOTTOM BAR */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-20 flex justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest border-t border-zinc-900 pt-3"
            >
              <p>JJ // AI ENGINEER & FULL-STACK ARCHITECT</p>
              <p className="hidden sm:inline">CAMBODIA</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP HEADER */}
      <motion.header 
        initial={{ y: -30, opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: PREMIUM_EASE }}
        className="hidden md:flex fixed top-0 left-0 w-full z-50 bg-[#0c0c0c]/85 backdrop-blur-md border-b border-[#222]/80 px-6 md:px-16 py-4 justify-between items-center transition-all duration-300"
      >
        <div className="text-xs tracking-widest uppercase text-white flex items-center gap-2 font-mono">
          <span className="w-2 h-2 bg-red-600 shadow-[0_0_6px_rgba(220,38,38,0.8)]"></span>
          <span>JJ // Portfolio</span>
        </div>
        <nav className="flex items-center gap-8 text-xs tracking-widest uppercase text-red-500 font-mono">
          {[
            { name: '[ABOUT]', href: '#about' },
            { name: '[CAPABILITIES]', href: '#skills' },
            { name: '[PROJECTS]', href: '#projects' },
            { name: '[COPILOT]', href: '#copilot' },
            { name: '[CONTACT]', href: '#contact' }
          ].map((item) => (
            <motion.a 
              key={item.name}
              href={item.href} 
              whileHover={{ x: 2, color: '#ffffff' }}
              transition={{ duration: 0.2 }}
              className="relative py-1 group"
            >
              <span>{item.name}</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-red-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </motion.a>
          ))}
        </nav>
      </motion.header>

      {/* MOBILE HEADER */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 bg-[#0c0c0c]/95 backdrop-blur-md border-b border-[#222] px-5 py-3.5 flex justify-between items-center pt-[calc(0.875rem+env(safe-area-inset-top))]">
        <div className="text-xs tracking-widest uppercase text-white font-bold flex items-center gap-2 font-mono">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          <span>JJ // PORTFOLIO</span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.92 }}
          onClick={() => setMobileMenuOpen(true)} 
          className="p-2 border border-red-900/40 bg-[#141414] rounded-lg text-white active:bg-red-950/40"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-5 h-5 text-red-500" />
        </motion.button>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: PREMIUM_EASE }}
            className="fixed inset-0 z-[120] bg-black/95 flex flex-col justify-between p-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(2rem+env(safe-area-inset-bottom))]"
          >
            <div className="flex justify-between items-center border-b border-[#222] pb-4">
              <div className="text-xs font-mono text-red-500 font-bold tracking-widest">// NAVIGATION MENU</div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 bg-[#1a1a1a] border border-[#333] rounded-full text-white"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <motion.div 
              variants={staggerContainerVariant}
              initial="hidden"
              animate="visible"
              className="space-y-4 my-auto py-6"
            >
              {[
                { name: 'About', href: '#about', num: '01' },
                { name: 'Capabilities', href: '#skills', num: '02' },
                { name: 'Selected Projects', href: '#projects', num: '03' },
                { name: 'AI Copilot', href: '#copilot', num: '04' },
                { name: 'Contact', href: '#contact', num: '05' }
              ].map((item) => (
                <motion.a
                  key={item.num}
                  variants={staggerItemVariant}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-between p-4 bg-[#121212] border border-[#222] active:border-red-600 rounded-xl"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-red-500 font-bold">{item.num}</span>
                    <span className="text-xl font-display uppercase tracking-tight text-white">{item.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-600" />
                </motion.a>
              ))}
            </motion.div>

            <div className="border-t border-[#222] pt-4 text-center">
              <p className="text-[10px] text-zinc-500 font-mono">JJ // AI ENGINEER & FULL-STACK ARCHITECT</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={bootState === 'entered' ? { scale: 1, opacity: 1 } : { scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.9, ease: PREMIUM_EASE }}
        className="pt-16 md:pt-8"
      >
        
        {/* HERO SECTION — DESKTOP */}
        <section className="hidden md:block relative px-6 md:px-16 pt-12 pb-24 border-b border-[#222] max-w-[1440px] mx-auto overflow-hidden">
          <div className="flex justify-between items-center mb-8 text-xs tracking-widest uppercase text-zinc-500 relative z-10 font-mono">
            <span className="text-red-500 font-semibold">// AI ENGINEERING & FULL-STACK</span>
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              AVAILABLE FOR COLLABORATION
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
            <motion.div 
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-15"
            >
              <span className="font-display text-[22vw] md:text-[25vw] font-black uppercase tracking-tighter text-red-600/30 leading-none whitespace-nowrap">
                PORTFOLIO
              </span>
            </motion.div>

            <motion.div 
              variants={staggerContainerVariant}
              initial="hidden"
              animate={bootState === 'entered' ? "visible" : "hidden"}
              className="lg:col-span-4 z-10 flex items-center"
            >
              <div className="space-y-6 w-full">
                <motion.span variants={staggerItemVariant} className="text-red-500 text-sm tracking-widest uppercase block font-sans">
                  Hello, I'm
                </motion.span>
                <motion.h1 variants={staggerItemVariant} className="font-display text-6xl md:text-8xl font-black text-white uppercase tracking-tight leading-[0.9]">
                  JJ <br />
                  <span className="text-red-600">DEV</span>
                </motion.h1>
                <motion.p variants={staggerItemVariant} className="text-xs uppercase tracking-widest text-white font-semibold font-mono">
                  AI ENGINEER & FULL-STACK ARCHITECT
                </motion.p>
                <motion.p variants={staggerItemVariant} className="text-xs text-zinc-400 leading-relaxed font-mono">
                  Based in Cambodia. Building intelligent systems, machine learning architectures, and scalable full-stack applications with clean code and rigorous research-driven methodologies.
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              animate={bootState === 'entered' ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.9, delay: 0.4, ease: PREMIUM_EASE }}
              className="lg:col-span-4 z-10 flex justify-center relative"
            >
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: PREMIUM_EASE }}
                className="relative w-full max-w-[340px] h-[480px] rounded-xl overflow-hidden border border-red-900/40 bg-gradient-to-b from-red-950/20 to-[#121212] shadow-2xl group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent z-10 opacity-70 group-hover:opacity-50 transition-opacity"></div>
                <img 
                  src="/profile.jpg" 
                  alt="JJ - AI Engineer" 
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 object-top"
                />
                <motion.div 
                  whileHover={{ y: -3 }}
                  className="absolute bottom-6 left-6 right-6 z-20 bg-black/70 backdrop-blur-md p-4 border border-red-900/30 transition-colors group-hover:border-red-600/60"
                >
                  <p className="text-[10px] text-red-400 uppercase tracking-widest leading-relaxed font-mono">
                    Build intelligent systems that create real-world impact.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              variants={staggerContainerVariant}
              initial="hidden"
              animate={bootState === 'entered' ? "visible" : "hidden"}
              className="lg:col-span-4 z-10 flex flex-col justify-center lg:pl-12"
            >
              <div className="space-y-8 w-full">
                {[
                  { title: 'CAMBODIA', sub: 'Location // Global Reach' },
                  { title: 'AI ENG', sub: 'Primary Focus & Major' },
                  { title: 'FULL-STACK', sub: 'Systems Architecture' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={staggerItemVariant}
                    whileHover={{ x: 6, borderColor: '#dc2626' }}
                    transition={{ duration: 0.2, ease: PREMIUM_EASE }}
                    className="border-l-2 border-red-600/70 pl-4 cursor-pointer group"
                  >
                    <h3 className="text-4xl md:text-5xl font-bold text-white group-hover:text-red-500 transition-colors">{item.title}</h3>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1 font-mono group-hover:text-zinc-300 transition-colors">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* HERO SECTION — MOBILE */}
        <section className="md:hidden px-5 pt-6 pb-12 border-b border-[#222] space-y-6">
          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase text-red-500 block">
              // AI ENGINEERING & FULL-STACK
            </span>
            <h1 className="font-display text-5xl font-black text-white uppercase tracking-tight leading-none">
              JJ <span className="text-red-600">DEV</span>
            </h1>
            <p className="text-xs font-mono font-bold text-white tracking-wider uppercase">
              AI ENGINEER & FULL-STACK DEVELOPER
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Building intelligent systems, AI-powered applications, and scalable full-stack products.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-red-900/40 bg-[#121212] shadow-xl"
          >
            <img 
              src="/profile.jpg" 
              alt="JJ - AI Engineer" 
              className="w-full h-full object-cover filter grayscale contrast-125 object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 border border-red-900/40 rounded-xl">
              <p className="text-[10px] text-red-400 uppercase tracking-widest font-mono text-center">
                BUILD INTELLIGENT SYSTEMS THAT CREATE REAL-WORLD IMPACT.
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-2.5 pt-2"
          >
            {[
              { num: '01', title: 'CAMBODIA', sub: 'Location / Global Reach' },
              { num: '02', title: 'AI ENGINEERING', sub: 'Primary Focus' },
              { num: '03', title: 'FULL-STACK', sub: 'Systems Architecture' }
            ].map((card) => (
              <motion.div 
                key={card.num} 
                variants={staggerItemVariant}
                whileTap={{ scale: 0.98 }}
                className="border border-[#222] bg-[#121212] p-3.5 rounded-xl flex items-center justify-between active:border-red-600/60"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-red-500 font-bold">{card.num}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{card.title}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">{card.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.a 
              whileTap={{ scale: 0.96 }}
              href="#projects" 
              className="h-12 bg-red-600 text-white text-xs font-bold font-mono uppercase tracking-widest flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] active:bg-red-700"
            >
              VIEW PROJECTS
            </motion.a>
            <motion.a 
              whileTap={{ scale: 0.96 }}
              href="#contact" 
              className="h-12 border border-[#333] bg-[#141414] text-white text-xs font-bold font-mono uppercase tracking-widest flex items-center justify-center rounded-xl active:bg-[#222]"
            >
              CONTACT ME
            </motion.a>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="about" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-8 md:space-y-12">
              <div>
                <div className="hidden md:block">
                  <TypewriterHeading />
                </div>
                
                <div className="md:hidden mb-4">
                  <span className="text-xs font-mono text-red-500 tracking-widest uppercase block mb-1">// INFORMATION</span>
                  <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight">ABOUT ME</h2>
                </div>

                <div className="space-y-4 text-xs md:text-xs text-zinc-300 leading-relaxed font-sans">
                  <p>
                    Hi, I'm <strong className="text-white">JJ</strong>, an 18-year-old aspiring AI Engineer and Full-Stack Developer from Cambodia. I have recently completed my Grade 12 (Baccalaureate) examination and am preparing to begin my first year of college, continuing my deep dive into Artificial Intelligence and Software Engineering.
                  </p>
                  <p>
                    My technical journey started in Grade 9 writing foundational HTML and CSS projects. In 2022, following the public release of ChatGPT, I became obsessed with Artificial Intelligence and how it accelerates software creation. Since then, I’ve spent thousands of hours experimenting with AI tools, building end-to-end systems, and refining development workflows.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">// TECHNICAL ARSENAL & TOOLS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="border border-[#222] bg-[#121212] p-4 md:p-5 rounded-xl">
                    <span className="text-white font-bold uppercase block mb-2 border-b border-[#222] pb-2 font-mono">Frontend & Backend</span>
                    <motion.div 
                      variants={staggerContainerVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-1.5 mt-2"
                    >
                      {['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Python', 'FastAPI', 'REST APIs', 'SQL', 'Supabase'].map((chip) => (
                        <motion.span 
                          key={chip} 
                          variants={staggerItemVariant}
                          whileHover={{ scale: 1.05, borderColor: '#dc2626', color: '#ffffff' }}
                          className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] text-[11px] text-zinc-300 font-mono rounded-md transition-colors cursor-pointer"
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                  <div className="border border-[#222] bg-[#121212] p-4 md:p-5 rounded-xl">
                    <span className="text-white font-bold uppercase block mb-2 border-b border-[#222] pb-2 font-mono">Infrastructure & DevOps</span>
                    <motion.div 
                      variants={staggerContainerVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-1.5 mt-2"
                    >
                      {['Docker', 'Railway', 'Vercel', 'Git', 'GitHub', 'VS Code', 'Kali Linux'].map((chip) => (
                        <motion.span 
                          key={chip} 
                          variants={staggerItemVariant}
                          whileHover={{ scale: 1.05, borderColor: '#dc2626', color: '#ffffff' }}
                          className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] text-[11px] text-zinc-300 font-mono rounded-md transition-colors cursor-pointer"
                        >
                          {chip}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-red-600 bg-red-950/10 p-5 rounded-r-xl">
                <p className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-red-400 font-semibold mb-1">// CORE PHILOSOPHY</p>
                <blockquote className="text-xs md:text-sm text-zinc-100 italic">
                  "Every problem has a solution. With enough research, patience, and persistence, any challenge can be solved."
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="hidden md:block relative w-full max-w-[360px] h-[520px] rounded-xl border border-red-900/40 bg-[#121212] shadow-2xl overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 z-10 pointer-events-none">
                  <img 
                    src="/profile5.jpg" 
                    alt="JJ Profile" 
                    className="w-full h-full object-cover filter grayscale contrast-125 object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 border border-red-900/40 text-center">
                    <p className="text-[10px] text-red-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-2 font-mono">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
                      HOVER TO VIEW EVOLUTION ROADMAP
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-[#0e0e0e] p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform scale-95 group-hover:scale-100 z-20 overflow-y-auto">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-red-600"></div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6 flex items-center gap-2 font-mono">
                      <GitCommit className="w-4 h-4 text-red-500 animate-pulse" />
                      <span>// EVOLUTION ROADMAP</span>
                    </h3>

                    <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-red-600 before:via-red-500 before:to-[#222]">
                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold block font-mono">2021</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">Foundations & First Code</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">Wrote initial HTML & CSS projects.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold block font-mono">2022</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">AI Revolution</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">Deep dive into ChatGPT and LLMs.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-red-400 uppercase tracking-widest font-semibold block font-mono">2026</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">Baccalaureate</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">Graduated Grade 12 in Cambodia.</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 top-1 w-3 h-3 bg-zinc-600 rounded-full border-2 border-[#121212]"></div>
                        <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold block font-mono">PRESENT</span>
                        <h4 className="text-xs font-bold text-white uppercase mt-0.5">AI Engineering</h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">College major in AI Engineering.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden w-full border border-red-900/40 bg-[#121212] rounded-2xl overflow-hidden shadow-xl p-5">
                <AnimatePresence mode="wait">
                  {!showRoadmapMobile ? (
                    <motion.div 
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 text-center"
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-red-900/30">
                        <img src="/profile5.jpg" alt="JJ Profile" className="w-full h-full object-cover filter grayscale contrast-125 object-top" />
                      </div>
                      <motion.button 
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setShowRoadmapMobile(true)}
                        className="w-full h-12 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl active:bg-red-700 flex items-center justify-center gap-2 font-mono"
                      >
                        <GitCommit className="w-4 h-4" />
                        VIEW MY JOURNEY
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="roadmap"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-5"
                    >
                      <div className="flex justify-between items-center border-b border-[#222] pb-3">
                        <span className="text-xs font-mono text-red-500 font-bold uppercase">// EVOLUTION ROADMAP</span>
                        <button 
                          onClick={() => setShowRoadmapMobile(false)}
                          className="text-xs text-zinc-400 border border-[#333] px-3 py-1 rounded-md font-mono"
                        >
                          CLOSE
                        </button>
                      </div>

                      <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-red-600 before:to-[#333]">
                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-red-400 font-bold block">2021</span>
                          <h4 className="text-xs font-bold text-white uppercase">FOUNDATIONS & FIRST CODE</h4>
                          <p className="text-[11px] text-zinc-400">Initial HTML & CSS projects.</p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-red-400 font-bold block">2022</span>
                          <h4 className="text-xs font-bold text-white uppercase">AI REVOLUTION</h4>
                          <p className="text-[11px] text-zinc-400">Deep dive into ChatGPT & LLMs.</p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-red-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-red-400 font-bold block">2026</span>
                          <h4 className="text-xs font-bold text-white uppercase">BACCALAUREATE</h4>
                          <p className="text-[11px] text-zinc-400">Graduated Grade 12 in Cambodia.</p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-6 top-1 w-3 h-3 bg-zinc-600 rounded-full"></div>
                          <span className="text-[10px] font-mono text-zinc-400 font-bold block">PRESENT</span>
                          <h4 className="text-xs font-bold text-white uppercase">AI ENGINEERING</h4>
                          <p className="text-[11px] text-zinc-400">First year college AI major.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

          </div>
        </motion.section>

        {/* CAPABILITIES SECTION (#skills) */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="skills" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto relative overflow-hidden"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="relative z-10 space-y-16 md:space-y-24">
            
            {/* 1. SECTION HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-red-500 font-semibold">
                  <span className="w-2 h-2 bg-red-600 animate-ping rounded-full"></span>
                  <span>// WHAT I CAN BUILD FOR YOU</span>
                </div>
                <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-tight font-black leading-none">
                  TURN YOUR IDEA INTO A <span className="italic text-red-600">WORKING SYSTEM.</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed max-w-2xl">
                  Websites, business systems, e-commerce platforms, POS systems, AI tools, automation, and custom software — designed around what you actually need.
                </p>

                <div className="border-l-2 border-red-600/80 bg-red-950/10 p-3.5 rounded-r-lg max-w-xl">
                  <p className="text-xs font-mono text-zinc-300">
                    <span className="text-red-400 font-bold">// CORE PURPOSE: </span>
                    "Tell me what is making your business or workflow difficult. I can design and build the digital system that makes it easier."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <SystemEngineeringModelCanvas isMobile={isMobileDevice} />
              </div>
            </div>

            {/* 2. PRIMARY CAPABILITY GRID (SIX CORE SERVICES) */}
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-red-500 flex items-center gap-2">
                  // TELL ME WHAT YOU NEED
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">[CLICK ANY CARD FOR BLUEPRINT]</span>
              </div>

              <motion.div 
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {capabilityServices.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={staggerItemVariant}
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCapabilityModal(service)}
                    className="border border-[#222] bg-[#121212] hover:bg-[#161616] hover:border-red-600/80 p-6 rounded-xl space-y-4 shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    {/* Top Glow Accent on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-red-600 group-hover:to-transparent transition-all duration-500"></div>

                    {/* Card Header: Number & Minimal Icon */}
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-red-500 transition-colors">
                        {service.number}
                      </span>
                      <div className="p-2 bg-[#1a1a1a] border border-[#2a2a2a] group-hover:border-red-600/50 rounded-lg group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                    </div>

                    {/* Title & Short Description */}
                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight group-hover:text-red-500 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-3">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono px-2 py-0.5 bg-[#1a1a1a] border border-[#2a2a2a] text-zinc-400 group-hover:border-red-900/50 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Subtle Interactive CTA */}
                    <div className="pt-3 border-t border-[#222] flex justify-between items-center text-[10px] font-mono text-zinc-400 group-hover:text-red-400 transition-colors">
                      <span>EXPLORE SYSTEM</span>
                      <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>VIEW HOW IT WORKS</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* 3. ENGINEERING PROCESS ROADMAP (REPOSITIONED) */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-red-500 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                  // HOW I TURN YOUR IDEA INTO A SYSTEM
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">[END-TO-END DEVELOPMENT PIPELINE]</span>
              </div>

              {/* DESKTOP HORIZONTAL PIPELINE */}
              <div 
                ref={roadmapCardRef}
                onMouseMove={handleRoadmapMouseMove}
                onMouseEnter={() => setIsRoadmapHovered(true)}
                onMouseLeave={() => setIsRoadmapHovered(false)}
                className="hidden md:block relative py-12 px-4 border border-[#222] bg-[#0e0e0e]/90 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10 pointer-events-none"></div>

                <div className="absolute top-[82px] left-[5%] right-[5%] h-[2px] bg-zinc-800">
                  <motion.div 
                    style={{ left: smoothXPercent, x: '-50%' }}
                    animate={{ opacity: isRoadmapHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1/2 -translate-y-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-red-600 shadow-[0_0_12px_#dc2626] pointer-events-none"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#dc2626]"></div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-4 lg:grid-cols-8 gap-2 relative z-10">
                  {roadmapNodes.map((node, idx) => {
                    const isHovered = hoveredRoadmapNode === idx;
                    return (
                      <div 
                        key={node.num}
                        onMouseEnter={() => setHoveredRoadmapNode(idx)}
                        onMouseLeave={() => setHoveredRoadmapNode(null)}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                        <motion.div 
                          animate={isHovered ? { y: -6 } : { y: 0 }}
                          transition={{ duration: 0.2, ease: PREMIUM_EASE }}
                          className={`w-10 h-10 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 relative bg-[#0c0c0c] ${
                            isHovered 
                              ? 'border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] bg-red-950/40 scale-110' 
                              : 'border-zinc-800 text-red-500 group-hover:border-red-600/80'
                          }`}
                        >
                          {node.num}
                        </motion.div>

                        <div className="mt-4 space-y-1.5 px-0.5">
                          <h4 className="font-display text-xs uppercase font-bold text-white group-hover:text-red-500 transition-colors truncate">
                            {node.title}
                          </h4>
                          <p className="text-[10px] text-zinc-400 font-sans leading-tight line-clamp-2">
                            {node.summary}
                          </p>

                          <AnimatePresence>
                            {isHovered && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="mt-2 p-2 bg-black/95 border border-red-600/60 rounded-lg shadow-2xl text-[9px] text-left text-zinc-300 font-mono z-30"
                              >
                                <span className="text-red-400 font-bold block mb-1 uppercase">// CLIENT IMPACT</span>
                                <p className="italic text-white">"{node.clientValue}"</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* MOBILE VERTICAL ROADMAP */}
              <div className="md:hidden relative py-6 px-4 border border-[#222] bg-[#0e0e0e] rounded-2xl shadow-xl overflow-hidden">
                <div className="absolute top-8 bottom-8 left-8 w-[2px] bg-zinc-800"></div>

                <div className="space-y-6 relative z-10 pl-14">
                  {roadmapNodes.map((node) => (
                    <div key={node.num} className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 rounded-full border border-red-600/60 bg-[#0c0c0c] flex items-center justify-center font-mono text-[10px] font-bold text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                        {node.num}
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display text-sm font-bold text-white uppercase">{node.title}</h4>
                        <p className="text-xs text-zinc-300 font-sans font-medium">{node.summary}</p>
                        <p className="text-[10px] font-mono italic text-red-400 pt-0.5">
                          "{node.clientValue}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. TECHNOLOGY WALL */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">// SKILL // TOOL // FRAMWORK</h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">[CLICK FOR SPEC]</span>
              </div>
              <motion.div 
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs"
              >
                {techWallData.map((tech, idx) => (
                  <motion.div 
                    key={idx}
                    variants={staggerItemVariant}
                    whileHover={{ scale: 1.04, borderColor: '#dc2626' }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveTechModal(tech)}
                    className="border border-[#222] bg-[#121212] p-3.5 rounded-xl cursor-pointer hover:border-red-600 transition-colors group flex items-center gap-3"
                  >
                    <div className="shrink-0">
                      {tech.icon}
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[9px] text-red-500 uppercase font-mono block leading-none mb-1">{tech.category}</span>
                      <h4 className="text-white font-bold uppercase text-xs font-mono truncate">{tech.name}</h4>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="projects" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto overflow-hidden"
        >
          <div className="text-center mb-10 md:mb-16 space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-red-500 block">// WORKSPACE</span>
            <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-tight font-black">
              SELECTED <span className="italic text-red-600">PROJECTS.</span>
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-sans max-w-xl mx-auto">
              Real-world software platforms, AI applications, and specialized tools I have designed and engineered.
            </p>
          </div>

          {/* DESKTOP 3D COVERFLOW */}
          <div 
            className="hidden md:flex relative w-full h-[540px] md:h-[600px] items-center justify-center cursor-pointer select-none"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            <div className="relative w-full max-w-6xl h-full flex items-center justify-center perspective-[1200px]">
              {projects.map((proj, index) => {
                const total = projects.length;
                let offset = (index - activeIndex + total) % total;
                if (offset > total / 2) offset -= total;

                const absOffset = Math.abs(offset);
                const isActive = offset === 0;

                let translateX = offset * 260;
                let scale = 1 - absOffset * 0.14;
                let rotateY = offset * -22;
                let zIndex = 50 - absOffset * 10;
                let opacity = 1 - absOffset * 0.3;

                return (
                  <motion.div
                    key={proj.id}
                    onClick={() => {
                      if (isActive) setActiveProjectModal(proj);
                      else setActiveIndex(index);
                    }}
                    animate={{ x: translateX, scale, rotateY, zIndex, opacity }}
                    transition={{ duration: 0.6, ease: PREMIUM_EASE }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className={`absolute w-[340px] h-[500px] rounded-2xl p-6 flex flex-col justify-between border transition-all shadow-2xl overflow-hidden group ${
                      isActive 
                        ? 'bg-gradient-to-b from-[#18141e] via-[#121018] to-[#0a0a0f] border-red-500/80 shadow-[0_0_50px_rgba(220,38,38,0.35)] ring-2 ring-red-600/40' 
                        : 'bg-gradient-to-b from-[#141414] to-[#0a0a0a] border-zinc-800/80 opacity-70'
                    }`}
                  >
                    <div className="relative z-10 flex justify-between items-center text-[10px] font-mono border-b border-white/10 pb-3">
                      <span className="text-red-400 font-bold">{proj.number}</span>
                      <span className="uppercase font-bold px-2 py-0.5 rounded text-white bg-zinc-800">{proj.status}</span>
                    </div>

                    <div className="relative z-10 my-auto space-y-3">
                      <span className="text-[10px] text-red-500 uppercase tracking-widest font-mono block">{proj.category}</span>
                      <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight group-hover:text-red-500 transition-colors">
                        {proj.displayTitle}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-3 font-sans">
                        {proj.description}
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/10 flex justify-between items-center text-xs font-mono text-zinc-400">
                      <span>VIEW BLUEPRINT</span>
                      <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MOBILE PROJECT CARDS */}
          <div className="md:hidden space-y-4">
            {projects.map((proj) => (
              <motion.div 
                key={proj.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveProjectModal(proj)}
                className="bg-[#121212] border border-[#222] active:border-red-600 rounded-2xl p-5 space-y-3 shadow-xl"
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-red-500 font-bold">{proj.number}</span>
                  <span className="text-zinc-500">{proj.category}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase">{proj.displayTitle}</h3>
                <p className="text-xs text-zinc-400 font-sans line-clamp-2">{proj.description}</p>
                <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-red-400 font-bold border-t border-[#222]">
                  <span>INSPECT SYSTEM</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* COPILOT AI INTERACTION SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="copilot" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono tracking-widest uppercase text-red-500 block">// KERNEL AGENT</span>
              <h2 className="font-display text-4xl md:text-6xl text-white uppercase tracking-tight font-black leading-tight">
                JJ_AGENT <br />
                <span className="text-red-600">COPILOT.</span>
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
                Interact with my portfolio telemetry agent. Inquire about architecture standards, deployment pipelines, or specific engineering workflows.
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">// SUGGESTED TELEMETRY PROMPTS:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What can you build for me?",
                    "What is your tech stack?",
                    "Tell me about your AI projects.",
                    "What is your development approach?"
                  ].map((p, i) => (
                    <button 
                      key={i}
                      onClick={() => handleCopilotSubmit(undefined, p)}
                      className="text-[11px] font-mono px-3 py-1.5 bg-[#141414] border border-[#262626] hover:border-red-600/80 text-zinc-300 rounded-lg transition-colors text-left"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0e0e0e] border border-red-900/30 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col h-[420px] relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-red-500" />
                  <span className="text-white font-bold">JJ_AGENT_TERMINAL</span>
                </div>
                <span className="text-[10px] text-red-500 animate-pulse">● LATENCY: 38ms</span>
              </div>

              <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 text-xs font-mono ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-6 h-6 rounded bg-red-950 border border-red-600/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-red-500" />
                      </div>
                    )}
                    <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-red-950/40 border border-red-600/40 text-white' 
                        : 'bg-[#141414] border border-zinc-800 text-zinc-300'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex gap-2 items-center text-xs text-red-500 font-mono italic">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                    Processing query telemetry...
                  </div>
                )}
              </div>

              <form onSubmit={handleCopilotSubmit} className="flex gap-2 pt-2 border-t border-zinc-800">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter system prompt query..."
                  className="flex-1 bg-[#141414] border border-zinc-800 focus:border-red-600 text-white text-xs font-mono px-4 py-3 rounded-xl outline-none"
                />
                <button 
                  type="submit" 
                  aria-label="Send copilot prompt"
                  className="px-5 bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="contact" 
          className="px-5 md:px-16 py-16 md:py-28 max-w-[1440px] mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-mono tracking-widest uppercase text-red-500 block">// HANDSHAKE</span>
              <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-tight font-black leading-tight">
                INITIATE <br />
                <span className="text-red-600">CONTACT.</span>
              </h2>
              <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
                Ready to build your next website, AI engine, or custom business software? Transmit your project details directly to my terminal.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#222]">
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
                  <Mail className="w-4 h-4 text-red-500" />
                  <span>jj.ai.engineer@domain.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-300">
                  <Globe className="w-4 h-4 text-red-500" />
                  <span>Phnom Penh, Cambodia</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#121212] border border-[#222] rounded-2xl p-6 md:p-8 shadow-2xl">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    [01] SENDER NAME
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full bg-[#181818] border border-[#333] focus:border-red-600 text-white text-xs font-mono p-3.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    [02] SENDER EMAIL
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full bg-[#181818] border border-[#333] focus:border-red-600 text-white text-xs font-mono p-3.5 rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    [03] PROJECT SCOPE / REQUIREMENTS
                  </label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.project_scope}
                    onChange={(e) => setFormData({ ...formData, project_scope: e.target.value })}
                    placeholder="Describe system goals, features, or deadlines..."
                    className="w-full bg-[#181818] border border-[#333] focus:border-red-600 text-white text-xs font-mono p-3.5 rounded-xl outline-none resize-none"
                  ></textarea>
                </div>

                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  {status === 'loading' ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                </motion.button>

                {status === 'success' && (
                  <div className="p-3 bg-red-950/40 border border-red-600 text-red-400 text-xs font-mono rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Transmission received. I will reply shortly.</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-3 bg-red-950/60 border border-red-600 text-red-300 text-xs font-mono rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.section>

      </motion.main>

      {/* FOOTER */}
      <footer className="border-t border-[#222] py-8 px-5 md:px-16 max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-500">
        <p>© 2026 JJ PORTFOLIO. ALL RIGHTS RESERVED.</p>
        <p className="text-[10px] text-zinc-600 uppercase">ENGINEERED WITH REACT, TYPESCRIPT, FRAMER MOTION & THREE.JS</p>
      </footer>

      {/* CAPABILITY MODAL */}
      <AnimatePresence>
        {activeCapabilityModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveCapabilityModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0e0e0e] border border-red-900/40 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 relative"
            >
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-red-500 font-bold">// SYSTEM SPECIFICATION #{activeCapabilityModal.number}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase">{activeCapabilityModal.title}</h2>
                </div>
                <button 
                  onClick={() => setActiveCapabilityModal(null)} 
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
                  aria-label="Close capability specification modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans text-zinc-300">
                <div className="bg-[#141414] p-4 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold">// PROBLEM IT SOLVES</span>
                  <p>{activeCapabilityModal.problem}</p>
                </div>

                <div className="bg-[#141414] p-4 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold">// THE SOLUTION</span>
                  <p>{activeCapabilityModal.solution}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">// DELIVERABLES & FEATURES</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeCapabilityModal.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-[#121212] border border-[#222] rounded-lg text-zinc-200">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end">
                <button 
                  onClick={() => setActiveCapabilityModal(null)}
                  className="px-6 py-2.5 bg-red-600 text-white font-mono text-xs font-bold rounded-xl uppercase tracking-widest"
                >
                  CLOSE SPECIFICATION
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT BLUEPRINT MODAL */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setActiveProjectModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0e0e0e] border border-red-900/40 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 relative"
            >
              <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-red-500 font-bold">// SYSTEM ARCHITECTURE SPECIFICATION</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase">{activeProjectModal.displayTitle}</h2>
                  <p className="text-xs font-mono text-zinc-500 mt-1">{activeProjectModal.category}</p>
                </div>
                <button 
                  onClick={() => setActiveProjectModal(null)} 
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
                  aria-label="Close project blueprint modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans text-zinc-300">
                <div className="bg-[#141414] p-4 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold">// SYSTEM OVERVIEW</span>
                  <p>{activeProjectModal.longDescription}</p>
                </div>

                <div className="bg-[#141414] p-4 border border-zinc-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-red-400 uppercase font-bold">// PROBLEM STATEMENT</span>
                  <p>{activeProjectModal.problem}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">// ENGINEERED ARCHITECTURE</span>
                  <div className="space-y-2">
                    {activeProjectModal.built.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#121212] border border-[#222] rounded-lg text-zinc-200">
                        <Check className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">// TECH STACK</span>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-[#1a1a1a] border border-[#333] text-zinc-300 font-mono text-[11px] rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
                {activeProjectModal.url ? (
                  <a 
                    href={activeProjectModal.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold rounded-xl uppercase tracking-widest flex items-center gap-2"
                  >
                    <span>LAUNCH DEPLOYMENT</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-zinc-500">[ DEPLOYMENT UNDER MAINTENANCE ]</span>
                )}
                <button 
                  onClick={() => setActiveProjectModal(null)}
                  className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs rounded-xl"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TECH SPEC MODAL */}
      <AnimatePresence>
        {activeTechModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveTechModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0e0e0e] border border-red-900/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative"
            >
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-3">
                  {activeTechModal.icon}
                  <div>
                    <span className="text-[10px] font-mono text-red-500 uppercase">{activeTechModal.category}</span>
                    <h3 className="font-display text-xl font-bold text-white uppercase">{activeTechModal.name}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveTechModal(null)} 
                  className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg"
                  aria-label="Close tech specification modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs font-mono text-zinc-300">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">// DESCRIPTION</span>
                  <p className="mt-0.5 text-zinc-200">{activeTechModal.desc}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">// REASON FOR SELECTION</span>
                  <p className="mt-0.5 text-zinc-200">{activeTechModal.reason}</p>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block font-bold">// INTEGRATED PROJECTS</span>
                  <p className="mt-0.5 text-red-400">{activeTechModal.projectsUsed}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex justify-end">
                <button 
                  onClick={() => setActiveTechModal(null)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs rounded-lg"
                >
                  CLOSE SPEC
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};