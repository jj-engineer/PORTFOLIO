import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { 
  Terminal, Send, CheckCircle2, AlertCircle, Bot, User, Cpu, GitCommit, Power, 
  ExternalLink, Menu, X, ChevronRight, Mail, 
  Globe, Layers3, FileUser, GraduationCap, ArrowRight, Activity, Check, ShieldCheck
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
    <div className={`relative w-full ${isMobile ? 'h-[280px]' : 'h-[380px] md:h-[460px]'} flex items-center justify-center bg-[#0e0e0e]/50 border border-red-900/30 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(220,38,38,0.15)] group`}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10"></div>
      <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center bg-black/70 backdrop-blur-md px-3 py-2 border border-red-900/40 rounded-lg pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] text-red-400 font-mono uppercase tracking-widest">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          <span>3D SYSTEM CORE</span>
        </div>
        {!isMobile && <span className="text-[10px] text-zinc-500 font-mono">[INTERACTIVE WEBGL MODEL]</span>}
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

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
    { role: 'assistant', content: 'SYS_AGENT v2.5 initialized. Ask me anything about my AI engineering stack, capabilities, or development roadmap.' }
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoadmapMobile, setShowRoadmapMobile] = useState(false);
  const [hoveredRoadmapNode, setHoveredRoadmapNode] = useState<number | null>(null);

  useEffect(() => {
    if (isCarouselHovered || isMobileDevice) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCarouselHovered, isMobileDevice]);

  useEffect(() => {
    let interval: any;
    if (isHovering && !isLoaded) {
      interval = setInterval(() => {
        setHoverProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoaded(true);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
    } else if (!isHovering && !isLoaded) {
      interval = setInterval(() => {
        setHoverProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 8;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isHovering, isLoaded]);

  const handleMobileBoot = () => {
    setIsLoaded(true);
  };

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
        responseContent = "I design and build intelligent digital products—from AI-powered applications, document tools, and dashboards to scalable full-stack web platforms.";
      } else if (query.toLowerCase().includes('stack') || query.toLowerCase().includes('ai')) {
        responseContent = "My stack comprises React, TypeScript, Tailwind CSS, Python, FastAPI, Supabase, LLMs (Gemini, Claude, GPT), and continuous deployment pipelines.";
      } else if (query.toLowerCase().includes('projects') || query.toLowerCase().includes('tell me about')) {
        responseContent = "Deployed projects include the Smart BAC II Education Platform and the AI Math Learning System, alongside several specialized platforms under active refinement.";
      } else if (query.toLowerCase().includes('approach')) {
        responseContent = "I follow a continuous 6-stage engineering process: Discover → Design → Build → AI Integration → Deploy → Optimize.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      setIsProcessing(false);
    }, 800);
  };

  const roadmapNodes = [
    {
      num: "01",
      title: "DISCOVER",
      summary: "Understand the problem",
      details: ["Requirements", "Research", "User Goals", "Architecture"],
      clientValue: "He doesn't just start coding. He understands what needs to be built."
    },
    {
      num: "02",
      title: "DESIGN",
      summary: "Turn ideas into usable products",
      details: ["User Flows", "UI Component Tokenization", "Database Structures", "System Schemas"],
      clientValue: "He can turn my idea into an actual product structure."
    },
    {
      num: "03",
      title: "BUILD",
      summary: "Full-stack product development",
      details: ["Responsive React/TS", "FastAPI Endpoints", "Supabase Auth & DB", "Business Logic"],
      clientValue: "He can build the complete application."
    },
    {
      num: "04",
      title: "INTELLIGENCE",
      summary: "Add AI where it matters",
      details: ["LLM Integration", "Vector Search", "Document AI", "Intelligent Workflows"],
      clientValue: "He can integrate AI into my product instead of just building a normal website."
    },
    {
      num: "05",
      title: "DEPLOY",
      summary: "Ship production-ready systems",
      details: ["Vercel Edge & Railway", "Environment Config", "CI/CD Workflows", "Live Monitoring"],
      clientValue: "He can actually take the project live."
    },
    {
      num: "06",
      title: "OPTIMIZE",
      summary: "Improve, monitor, and evolve",
      details: ["Performance Tuning", "UX Refinement", "Bug Squashing", "Continuous Iteration"],
      clientValue: "The project doesn't end when the first version is deployed."
    }
  ];

  const solutionCards = [
    {
      title: "AI-Powered Applications",
      desc: "AI assistants, intelligent workflows, document intelligence, AI automation, and LLM-powered products."
    },
    {
      title: "Business Management Systems",
      desc: "Admin dashboards, management platforms, internal tools, reporting systems, and workflow automation."
    },
    {
      title: "E-Commerce Platforms",
      desc: "Modern online stores with product management, authentication, orders, payments, dashboards, and responsive UX."
    },
    {
      title: "Education Platforms",
      desc: "Learning platforms, quizzes, student dashboards, educational tools, progress tracking, and AI-assisted learning."
    },
    {
      title: "Custom Web Applications",
      desc: "Unique web products designed around specific business requirements instead of generic templates."
    },
    {
      title: "AI Automation Tools",
      desc: "Automate repetitive workflows using AI, APIs, agents, data processing, and intelligent decision systems."
    },
    {
      title: "Portfolio & Professional Websites",
      desc: "High-end personal brands, portfolios, landing pages, and professional websites designed to convert visitors."
    },
    {
      title: "Dashboards & Data Systems",
      desc: "Real-time dashboards, analytics interfaces, data management systems, and operational control panels."
    }
  ];

  const clientValuePoints = [
    "01  Clear product architecture",
    "02  Modern user experience",
    "03  AI integration when valuable",
    "04  Responsive frontend",
    "05  Secure backend & database",
    "06  Production deployment",
    "07  Performance optimization",
    "08  Continued iteration"
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

      {/* BOOT LOADING SCREEN */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              filter: "blur(12px)",
              transition: { duration: 0.8, ease: PREMIUM_EASE } 
            }}
            className="fixed inset-0 z-[100] bg-[#0c0c0c] flex flex-col justify-between p-6 md:p-16 border-b border-red-900/30"
          >
            <div className="flex justify-between items-center text-xs tracking-widest uppercase text-zinc-500">
              <div className="flex items-center gap-2 text-red-500 font-semibold">
                <span className="w-2 h-2 bg-red-600 animate-ping rounded-full"></span>
                <span>SYS_BOOT // SEQUENCE ACTIVE</span>
              </div>
              <span className="text-zinc-600 hidden sm:inline">[SECURE PORTFOLIO ENVIRONMENT]</span>
            </div>

            <div className="max-w-xl mx-auto w-full space-y-6">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: PREMIUM_EASE }}
                className="border border-[#222] bg-[#121212] p-6 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-transparent"></div>
                
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-600/10 to-transparent pointer-events-none"
                />

                <div className="flex items-center gap-2 text-xs text-red-500 mb-4 pb-3 border-b border-[#222]">
                  <Terminal className="w-4 h-4" />
                  <span>jj-systems@kernel:~$ boot_sequence</span>
                </div>

                <motion.div 
                  variants={staggerContainerVariant}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2.5 text-[11px] text-zinc-400 font-mono"
                >
                  <motion.p variants={staggerItemVariant} className="flex justify-between">
                    <span>[INIT] Loading neural architecture weights...</span> 
                    <span className="text-red-500 font-bold">OK</span>
                  </motion.p>
                  <motion.p variants={staggerItemVariant} className="flex justify-between">
                    <span>[INIT] Mounting vector database indices...</span> 
                    <span className="text-red-500 font-bold">OK</span>
                  </motion.p>
                  <motion.p variants={staggerItemVariant} className="flex justify-between">
                    <span>[INIT] Establishing secure handshake...</span> 
                    <span className="text-red-500 font-bold">OK</span>
                  </motion.p>
                  <motion.p variants={staggerItemVariant} className="text-white font-bold pt-3 border-t border-[#222] mt-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span>
                    SYSTEM READY FOR HUMAN INTERACTION.
                  </motion.p>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: PREMIUM_EASE }}
                className="flex flex-col items-center justify-center pt-4"
              >
                <motion.div 
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={handleMobileBoot}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-pointer w-full max-w-sm py-5 px-6 border border-red-600/60 bg-red-950/10 hover:bg-red-950/30 transition-colors text-center overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.15)]"
                >
                  <div 
                    className="absolute inset-0 bg-red-600/25 transition-all duration-75 pointer-events-none"
                    style={{ width: `${hoverProgress}%` }}
                  ></div>

                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Power className={`w-4 h-4 text-red-500 transition-transform duration-300 ${isHovering ? 'scale-125 rotate-90 text-white' : ''}`} />
                    <span className="text-xs font-bold uppercase tracking-widest text-white font-mono">
                      {isMobileDevice 
                        ? 'TAP TO ENTER PORTFOLIO' 
                        : (hoverProgress > 0 ? `INITIALIZING... [${Math.round(hoverProgress)}%]` : 'HOVER MOUSE TO CONTINUE')}
                    </span>
                  </div>
                </motion.div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-3 font-mono">
                  {isMobileDevice ? 'Mobile viewport initialized' : 'Keep cursor steady inside the module to trigger authorization.'}
                </p>
              </motion.div>
            </div>

            <div className="flex justify-between items-center text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
              <p>JJ // AI ENGINEER & FULL-STACK ARCHITECT</p>
              <p>CAMBODIA</p>
            </div>
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
        animate={isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.98, opacity: 0 }}
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
              animate={isLoaded ? "visible" : "hidden"}
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
              animate={isLoaded ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
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
              animate={isLoaded ? "visible" : "hidden"}
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

        {/* CAPABILITIES SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="skills" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="relative z-10 space-y-16 md:space-y-24">
            
            {/* SECTION HEADER */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-red-500 font-semibold">
                  <span className="w-2 h-2 bg-red-600 animate-ping rounded-full"></span>
                  <span>// ENGINEERING CAPABILITIES</span>
                </div>
                <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-tight font-black">
                  WHAT I CAN <span className="italic text-red-600">BUILD.</span>
                </h2>
                <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed max-w-2xl">
                  I design and build intelligent digital products — from AI-powered applications and business systems to scalable full-stack platforms.
                </p>
              </div>

              <div className="lg:col-span-5 w-full">
                <SystemEngineeringModelCanvas isMobile={isMobileDevice} />
              </div>
            </div>

            {/* ROADMAP */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <span className="text-xs font-bold font-mono uppercase tracking-widest text-red-500 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-red-500 animate-pulse" />
                  // CAPABILITY JOURNEY & PIPELINE
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">[LIVE ENGINEERING PIPELINE]</span>
              </div>

              {/* DESKTOP HORIZONTAL ROADMAP */}
              <div 
                ref={roadmapCardRef}
                onMouseMove={handleRoadmapMouseMove}
                onMouseEnter={() => setIsRoadmapHovered(true)}
                onMouseLeave={() => setIsRoadmapHovered(false)}
                className="hidden md:block relative py-12 px-4 border border-[#222] bg-[#0e0e0e]/90 rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 via-transparent to-red-950/10 pointer-events-none"></div>

                <div className="absolute top-[82px] left-[7%] right-[7%] h-[2px] bg-zinc-800">
                  <motion.div 
                    style={{ left: smoothXPercent, x: '-50%' }}
                    animate={{ opacity: isRoadmapHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1/2 -translate-y-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-red-600 shadow-[0_0_12px_#dc2626] pointer-events-none"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#dc2626]"></div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-6 gap-3 relative z-10">
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
                          className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 relative bg-[#0c0c0c] ${
                            isHovered 
                              ? 'border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] bg-red-950/40 scale-110' 
                              : 'border-zinc-800 text-red-500 group-hover:border-red-600/80'
                          }`}
                        >
                          {node.num}
                          <div className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-red-600 ${isHovered ? 'block' : 'hidden'}`}></div>
                        </motion.div>

                        <div className="mt-6 space-y-2 px-1">
                          <h4 className="font-display text-base uppercase font-bold text-white group-hover:text-red-500 transition-colors">
                            {node.title}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-sans leading-tight">
                            {node.summary}
                          </p>

                          <div className="flex flex-wrap justify-center gap-1 pt-2">
                            {node.details.map((detail, dIdx) => (
                              <span key={dIdx} className="text-[9px] font-mono px-1.5 py-0.5 bg-[#161616] border border-[#2a2a2a] text-zinc-400 rounded">
                                {detail}
                              </span>
                            ))}
                          </div>

                          <AnimatePresence>
                            {isHovered && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="mt-3 p-3 bg-black/95 border border-red-600/60 rounded-xl shadow-2xl text-[10px] text-left text-zinc-300 font-mono"
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

                <div className="space-y-8 relative z-10 pl-14">
                  {roadmapNodes.map((node) => (
                    <div key={node.num} className="relative">
                      <div className="absolute -left-14 top-0 w-8 h-8 rounded-full border border-red-600/60 bg-[#0c0c0c] flex items-center justify-center font-mono text-[10px] font-bold text-red-500 shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                        {node.num}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-lg font-bold text-white uppercase">{node.title}</h4>
                        </div>
                        <p className="text-xs text-zinc-300 font-sans font-medium">{node.summary}</p>
                        
                        <div className="flex flex-wrap gap-1 pt-1">
                          {node.details.map((detail, dIdx) => (
                            <span key={dIdx} className="text-[9px] font-mono px-2 py-0.5 bg-[#161616] border border-[#262626] text-zinc-400 rounded">
                              {detail}
                            </span>
                          ))}
                        </div>

                        <p className="text-[10px] font-mono italic text-red-400 pt-1">
                          "{node.clientValue}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SOLUTION CARDS */}
            <div className="space-y-8">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-red-500 font-bold block mb-1">
                  // WHAT I CAN BUILD FOR YOU
                </span>
                <h3 className="font-display text-3xl md:text-5xl text-white uppercase tracking-tight font-black">
                  FROM IDEA → <span className="text-red-600">WORKING PRODUCT.</span>
                </h3>
              </div>

              <motion.div 
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {solutionCards.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    variants={staggerItemVariant}
                    whileHover={{ y: -5, borderColor: '#dc2626' }}
                    className="border border-[#222] bg-[#121212] p-5 rounded-xl space-y-3 shadow-lg group transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-950/30 border border-red-900/40 flex items-center justify-center font-mono text-xs font-bold text-red-500 group-hover:border-red-600">
                      0{idx + 1}
                    </div>
                    <h4 className="font-display text-base font-bold text-white uppercase group-hover:text-red-500 transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      {card.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CLIENT VALUE STRIP */}
            <div className="border border-red-900/40 bg-gradient-to-r from-red-950/20 via-[#121212] to-red-950/20 p-6 md:p-8 rounded-2xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-red-900/30 pb-3">
                <span className="text-xs font-mono text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  // WHAT YOU GET
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">[CLIENT VALUE GUARANTEE]</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs text-zinc-200">
                {clientValuePoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-[#0a0a0a]/80 border border-[#222] rounded-xl hover:border-red-600/50 transition-colors">
                    <Check className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TECHNOLOGY WALL */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">// TECHNOLOGY STACK & TOOLS</h3>
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
                      <span className={`uppercase font-bold px-2 py-0.5 rounded text-[9px] ${
                        proj.status === 'ACTIVE_DEPLOY' 
                          ? 'bg-green-950/80 text-green-400 border border-green-800/50' 
                          : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700/50'
                      }`}>
                        {proj.status === 'ACTIVE_DEPLOY' ? 'ACTIVE DEPLOY' : 'UNDER MAINTENANCE'}
                      </span>
                    </div>

                    <div className="relative z-10 w-full h-[200px] rounded-xl overflow-hidden border border-white/10 bg-black">
                      {proj.status === 'ACTIVE_DEPLOY' && proj.image ? (
                        <div className="w-full h-full relative overflow-hidden group">
                          <img 
                            src={proj.image} 
                            alt={proj.displayTitle} 
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-[#141218] to-[#0a0a0d] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#dc2626_1px,transparent_1px)] [background-size:16px_16px]"></div>
                          <motion.div 
                            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            className="p-3 bg-red-950/30 border border-red-900/40 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.2)] mb-2 z-10"
                          >
                            {proj.icon}
                          </motion.div>
                          <span className="text-[10px] font-mono uppercase text-red-400 tracking-widest font-bold z-10">SYSTEM MAINTENANCE</span>
                          <span className="text-[9px] font-mono text-zinc-500 z-10 mt-0.5">CURRENTLY BEING REFINED</span>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 space-y-2 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">{proj.category}</span>
                      <h4 className="font-display text-base text-white uppercase font-bold truncate">{proj.displayTitle}</h4>
                      <p className="text-xs text-zinc-300 font-sans line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                      
                      <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-red-400 border-t border-white/10">
                        <span>ROLE: {proj.role.split('+')[0]}</span>
                        <span className="flex items-center gap-1 text-white font-bold group-hover:text-red-400 transition-colors">
                          VIEW DETAILS <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MOBILE VERTICAL PROJECT CARDS */}
          <div className="md:hidden space-y-6">
            {projects.map((proj) => (
              <motion.div 
                key={proj.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveProjectModal(proj)}
                className="border border-red-900/40 bg-[#121212] rounded-2xl overflow-hidden shadow-xl p-5 space-y-4 active:border-red-600 transition-colors"
              >
                <div className="flex justify-between items-center border-b border-[#222] pb-3 text-[10px] font-mono">
                  <span className="text-red-500 font-bold">{proj.number}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${
                    proj.status === 'ACTIVE_DEPLOY' ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                  }`}>
                    {proj.status === 'ACTIVE_DEPLOY' ? 'ACTIVE DEPLOY' : 'UNDER MAINTENANCE'}
                  </span>
                </div>

                <div className="w-full h-48 rounded-xl overflow-hidden bg-black relative border border-[#222]">
                  {proj.status === 'ACTIVE_DEPLOY' && proj.image ? (
                    <img src={proj.image} alt={proj.displayTitle} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#121018] flex flex-col items-center justify-center p-4 text-center">
                      <div className="p-3 bg-red-950/30 border border-red-900/40 rounded-2xl mb-2">
                        {proj.icon}
                      </div>
                      <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">SYSTEM BEING REFINED</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{proj.category}</span>
                  <h3 className="font-display text-xl text-white uppercase tracking-tight font-bold">{proj.displayTitle}</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">{proj.description}</p>
                </div>

                <div className="pt-2 border-t border-[#222] flex justify-between items-center text-[10px] font-mono text-zinc-400">
                  <span>ROLE: {proj.role}</span>
                </div>

                <button className="w-full h-11 bg-red-600/90 text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 font-mono shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  <span>VIEW DETAILS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* COPILOT SECTION */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="copilot" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <span className="text-xs font-mono tracking-widest uppercase text-red-500 block mb-1">// AI COPILOT</span>
              <h2 className="font-display text-3xl md:text-5xl text-white uppercase font-bold">ASK ANYTHING</h2>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Ask about my engineering skills, projects, tools, or development approach.
              </p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                "What can you build?",
                "What is your AI stack?",
                "Tell me about your projects",
                "How do you approach a project?"
              ].map((prompt, pIdx) => (
                <motion.button
                  key={pIdx}
                  whileHover={{ scale: 1.02, borderColor: '#dc2626' }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => handleCopilotSubmit(e, prompt)}
                  className="px-3 py-2 bg-[#141414] border border-[#252525] text-zinc-300 text-[11px] font-mono whitespace-nowrap rounded-lg shrink-0 transition-colors"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>

            <div className="border border-[#222] bg-[#121212] rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#1b1c1c] px-4 py-3 border-b border-[#222] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-mono uppercase tracking-widest text-red-500">jj-agent@cambodia:~</span>
                </div>
              </div>

              <div className="p-4 md:p-6 h-80 overflow-y-auto flex flex-col space-y-4 text-xs">
                {messages.map((msg, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                    className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && <div className="p-2 bg-[#222] text-red-500 rounded-lg shrink-0"><Bot className="w-4 h-4" /></div>}
                    <div className={`p-3 max-w-[82%] rounded-xl font-sans ${msg.role === 'user' ? 'bg-red-600 text-white font-medium' : 'bg-[#1b1c1c] text-zinc-200 border border-[#222]'}`}>
                      {msg.content}
                    </div>
                    {msg.role === 'user' && <div className="p-2 bg-[#222] text-white rounded-lg shrink-0"><User className="w-4 h-4" /></div>}
                  </motion.div>
                ))}
                {isProcessing && (
                  <div className="flex items-center gap-2 text-zinc-500 text-xs animate-pulse font-mono">
                    <Cpu className="w-4 h-4 text-red-500 animate-spin" />
                    <span>COMPUTING INFERENCE...</span>
                  </div>
                )}
              </div>

              <form onSubmit={(e) => handleCopilotSubmit(e)} className="border-t border-[#222] p-3 bg-[#151515] flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-[#0a0a0a] border border-[#333] px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 rounded-xl transition-colors font-mono"
                />
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  className="bg-red-600 text-white px-5 min-h-[48px] text-xs font-bold uppercase tracking-wider rounded-xl active:bg-red-700 flex items-center justify-center shrink-0 font-mono"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
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
          className="px-5 md:px-16 py-16 md:py-28 max-w-[1440px] mx-auto relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start relative z-10">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-red-500 block mb-1">// CONTACT</span>
                <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-tight leading-none font-black">
                  LET'S BUILD <br /><span className="italic text-red-600">SOMETHING.</span>
                </h2>
                <p className="text-xs text-zinc-400 font-sans mt-3">
                  Have a project, idea, or technical challenge? Let's talk.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <motion.a 
                  whileHover={{ x: 3, borderColor: '#dc2626' }}
                  whileTap={{ scale: 0.98 }}
                  href="https://www.facebook.com/share/1CH4ULYSe3/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-[#222] bg-[#121212] p-3.5 rounded-xl flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-red-500" />
                    <span className="text-white font-bold uppercase font-mono">Facebook</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                </motion.a>

                <motion.a 
                  whileHover={{ x: 3, borderColor: '#dc2626' }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:limhakheng21@gmail.com" 
                  className="border border-[#222] bg-[#121212] p-3.5 rounded-xl flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-red-500" />
                    <span className="text-white font-bold uppercase font-mono">Email Direct</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="border border-[#222] bg-[#121212] p-6 md:p-8 rounded-2xl space-y-5 shadow-2xl">
                <div className="flex justify-between items-center border-b border-[#222] pb-3 text-xs font-mono">
                  <span className="text-red-500 font-bold">// SECURE TRANSMISSION CHANNEL</span>
                  <span className="text-zinc-500">[256-BIT ENCRYPTION]</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1.5">SENDER NAME *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.sender_name}
                      onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                      placeholder="e.g. Alex Vance" 
                      className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-xs text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-red-600 font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1.5">SENDER EMAIL *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.sender_email}
                      onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                      placeholder="e.g. alex@company.com" 
                      className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-xs text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-red-600 font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1.5">PROJECT SCOPE & REQUIREMENTS *</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.project_scope}
                      onChange={(e) => setFormData({ ...formData, project_scope: e.target.value })}
                      placeholder="Describe what you want to build..." 
                      className="w-full bg-[#0a0a0a] border border-[#333] p-4 text-xs text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-red-600 font-mono transition-colors"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-950/50 border border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-400 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage || 'Transmission failed.'}</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-3 bg-green-950/50 border border-green-800 rounded-xl flex items-center gap-2 text-xs text-green-400 font-mono">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Transmission sent successfully. I will respond shortly.</span>
                  </div>
                )}

                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full py-4 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-700 active:bg-red-800 shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all font-mono flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <span>TRANSMITTING DATA...</span>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>

          </div>
        </motion.section>

      </motion.main>

      {/* FOOTER */}
      <footer className="border-t border-[#222] py-8 px-6 text-center text-xs text-zinc-600 font-mono uppercase tracking-widest">
        <p>© {new Date().getFullYear()} JJ DEV // ALL RIGHTS RESERVED.</p>
      </footer>

      {/* TECHNOLOGY MODAL */}
      <AnimatePresence>
        {activeTechModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTechModal(null)}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="border border-red-600/60 bg-[#121212] p-6 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative"
            >
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <span className="text-xs font-mono text-red-500 font-bold uppercase">// TECH SPECIFICATION</span>
                <button onClick={() => setActiveTechModal(null)} className="text-zinc-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                {activeTechModal.icon}
                <div>
                  <span className="text-[10px] font-mono text-red-400 uppercase">{activeTechModal.category}</span>
                  <h3 className="text-2xl font-display font-bold text-white uppercase">{activeTechModal.name}</h3>
                </div>
              </div>

              <p className="text-xs text-zinc-300 font-sans leading-relaxed">{activeTechModal.desc}</p>

              <div className="space-y-2 pt-2 border-t border-[#222] text-xs font-mono">
                <div>
                  <span className="text-red-400 block uppercase font-bold text-[10px]">PROJECTS APPLIED:</span>
                  <span className="text-zinc-300">{activeTechModal.projectsUsed}</span>
                </div>
                <div>
                  <span className="text-red-400 block uppercase font-bold text-[10px]">WHY THIS TOOL:</span>
                  <span className="text-zinc-300 font-sans">{activeTechModal.reason}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProjectModal(null)}
            className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="border border-red-600/60 bg-[#121212] p-6 md:p-8 rounded-2xl max-w-2xl w-full space-y-6 shadow-2xl relative my-8"
            >
              <div className="flex justify-between items-center border-b border-[#222] pb-4">
                <div>
                  <span className="text-xs font-mono text-red-500 font-bold uppercase">{activeProjectModal.number} // {activeProjectModal.category}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight">{activeProjectModal.displayTitle}</h3>
                </div>
                <button 
                  onClick={() => setActiveProjectModal(null)} 
                  className="p-2 bg-[#1a1a1a] border border-[#333] rounded-full text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close Project Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeProjectModal.image && (
                <div className="w-full h-56 rounded-xl overflow-hidden border border-[#222] bg-black relative">
                  <img src={activeProjectModal.image} alt={activeProjectModal.displayTitle} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="space-y-4 text-xs font-sans text-zinc-300 leading-relaxed">
                <div>
                  <h4 className="font-mono text-xs font-bold text-red-500 uppercase mb-1">// OVERVIEW</h4>
                  <p>{activeProjectModal.longDescription}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-red-500 uppercase mb-1">// PROBLEM SOLVED</h4>
                  <p>{activeProjectModal.problem}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-red-500 uppercase mb-2">// KEY ARCHITECTURE & FEATURES</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-zinc-300">
                    {activeProjectModal.built.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#222]">
                <h4 className="font-mono text-xs font-bold text-white uppercase">// TECH STACK</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] text-[11px] font-mono text-zinc-300 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {activeProjectModal.url && (
                <div className="pt-2">
                  <a 
                    href={activeProjectModal.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full h-12 bg-red-600 text-white font-bold text-xs font-mono uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 active:bg-red-800 transition-colors shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                  >
                    <span>LAUNCH DEPLOYED PLATFORM</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioMaster;