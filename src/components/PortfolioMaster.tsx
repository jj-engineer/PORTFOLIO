import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';
import { 
  Terminal, Send, CheckCircle2, AlertCircle, Bot, User, Cpu, GitCommit, Power, 
  ExternalLink, Menu, X, ChevronRight, ChevronDown, Mail, 
  Globe, Code2, Database, CpuIcon, Search, Compass, TerminalSquare
} from 'lucide-react';
import * as THREE from 'three';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
  price?: string;
  stats?: string;
  url?: string;
  isMaintenance?: boolean;
}

const projects: Project[] = [
  {
    id: '01',
    number: 'PROJECT_01',
    title: 'Smart-System-BACII-Education-Platform',
    category: 'AI ENGINEERING // FULL-STACK',
    description: 'Enterprise-grade LLM workflow automation pipeline with dynamic task decomposition and fault-tolerant agent handoffs.',
    image: '/learning.jpg', 
    status: 'ACTIVE_DEPLOY',
    url: 'https://bakdub.vercel.app/',
    isMaintenance: false,
    price: '3.45 ETH',
    stats: '50k'
  },
  {
    id: '02',
    number: 'PROJECT_02',
    title: 'AI-Math-Learning-System',
    category: 'MATH // SYSTEM',
    description: 'Sub-50ms vector retrieval pipeline utilizing hybrid dense-sparse indexing and contextual re-ranking layers.',
    image: '/Math.jpg', 
    status: 'ACTIVE_DEPLOY',
    url: 'https://math-quiz-khmer.vercel.app/',
    isMaintenance: false,
    price: '2.10 ETH',
    stats: '42k'
  },
  {
    id: '03',
    number: 'PROJECT_03',
    title: 'PureAxis-UI-Framework',
    category: 'E-Commerce // OPTIMIZATION',
    description: 'Quantized on-device model runner optimized for local memory footprint and high token generation speed.',
    image: '/e-c.jpg', 
    status: 'UNDER_MAINTENANCE',
    isMaintenance: true,
    price: '4.80 ETH',
    stats: '89k'
  },
  {
    id: '04',
    number: 'PROJECT_04',
    title: 'CV-Generator-System',
    category: 'INTERFACE // LLM TOOLING',
    description: 'Canvas-style interactive environment designed for fluid prompt chaining, context sharing, and real-time output rendering.',
    image: '/CV.jpg', 
    status: 'UNDER_MAINTENANCE',
    isMaintenance: true,
    price: '1.95 ETH',
    stats: '34k'
  },
  {
    id: '05',
    number: 'PROJECT_05',
    title: 'E-Learning-Program',
    category: 'DEEP LEARNING // EMBEDDINGS',
    description: 'Advanced tensor representation framework built for cross-modal retrieval and semantic clustering.',
    image: '/e-learning.jpg', 
    status: 'UNDER_MAINTENANCE',
    isMaintenance: true,
    price: '5.20 ETH',
    stats: '112k'
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

      // System Heartbeat Modulation
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
  // Mobile / Desktop detection
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);
    return () => window.removeEventListener('resize', handleCheckMobile);
  }, []);

  // Shared / Universal States
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const [formData, setFormData] = useState({ sender_name: '', sender_email: '', project_scope: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'SYS_AGENT v2.5 initialized. Ask me anything about my AI engineering stack, models, or development philosophy.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeTechModal, setActiveTechModal] = useState<{
    name: string;
    category: string;
    desc: string;
    projectsUsed: string;
    reason: string;
  } | null>(null);

  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // Desktop Coverflow Carousel State
  const [activeIndex, setActiveIndex] = useState(2);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Mobile Navigation Sheet State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile Accordion State for Capabilities
  const [expandedCapability, setExpandedCapability] = useState<number | null>(null);

  // Mobile Roadmap Toggle State
  const [showRoadmapMobile, setShowRoadmapMobile] = useState(false);

  useEffect(() => {
    if (isCarouselHovered || isMobileDevice) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 2500);
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

  // Bypass loading modal on mobile if tap/click is used
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
        responseContent = "I build production-ready AI applications, automated LLM workflows, full-stack enterprise portals, real-time database architectures, and custom developer tools.";
      } else if (query.toLowerCase().includes('stack') || query.toLowerCase().includes('ai')) {
        responseContent = "My AI engineering stack consists of LLM prompt orchestration (Gemini 2.5, GPT-4, Claude), Python, FastAPI, vector search, React, TypeScript, Supabase, and Vercel/Railway cloud deployments.";
      } else if (query.toLowerCase().includes('projects') || query.toLowerCase().includes('tell me about')) {
        responseContent = "Selected deployed projects include Smart-System-BACII Education Platform (active LLM workflow engine) and AI-Math Learning System (sub-50ms vector retrieval pipeline).";
      } else if (query.toLowerCase().includes('approach')) {
        responseContent = "My approach is research-driven: analyze requirements, design clean multi-agent or system architectures, write modular type-safe code, and iterate rapidly until high performance is achieved.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      setIsProcessing(false);
    }, 800);
  };

  const capabilitiesData = [
    {
      title: "AI Engineering",
      icon: <Bot className="w-5 h-5 text-red-500" />,
      desc: "Integrating state-of-the-art LLMs (Claude, GPT, Gemini, DeepSeek) into production workflows with structured prompt engineering and vector memory layers.",
      tech: "ChatGPT, Claude, Gemini, Codex, Qwen, Prompt Engineering, LLM Integration",
      expect: "Autonomous multi-agent pipelines, intelligent copilot interfaces, and low-latency inference setups."
    },
    {
      title: "Full Stack Development",
      icon: <Globe className="w-5 h-5 text-red-500" />,
      desc: "Building end-to-end web applications with modern component architectures, fluid motion design, and high-performance frontend interfaces.",
      tech: "React, TypeScript, JavaScript, Tailwind CSS, HTML, CSS, Component Architecture",
      expect: "Clean responsive web applications with smooth Framer Motion interactions and immaculate typography."
    },
    {
      title: "Backend Architecture",
      icon: <Code2 className="w-5 h-5 text-red-500" />,
      desc: "Designing robust server-side logic, secure RESTful APIs, authentication pipelines, and high-throughput business logic.",
      tech: "Python, FastAPI, REST APIs, Auth, Business Logic, Security, Performance Optimization",
      expect: "Scalable backend services engineered for reliability, speed, and strict security standards."
    },
    {
      title: "Database & Storage",
      icon: <Database className="w-5 h-5 text-red-500" />,
      desc: "Structuring performant relational databases with real-time subscriptions, secure auth storage, and optimized queries.",
      tech: "SQL, Supabase, Relational Design, Real-Time Features, Storage Management",
      expect: "Secure, structured data layers capable of handling dynamic real-time application states."
    },
    {
      title: "Deployment & DevOps",
      icon: <CpuIcon className="w-5 h-5 text-red-500" />,
      desc: "Managing version control workflows and deploying containerized full-stack applications to modern cloud infrastructure.",
      tech: "Git, GitHub, Vercel, Railway, Docker, Environment Variables, Cloud Deployment",
      expect: "Zero-downtime continuous deployment pipelines and robust version-controlled codebases."
    },
    {
      title: "Research & Problem Solving",
      icon: <Search className="w-5 h-5 text-red-500" />,
      desc: "Rapidly breaking down unfamiliar technical obstacles, digesting official documentation, and iterating until a stable solution is achieved.",
      tech: "Documentation Analysis, Kali Linux, Terminal, Debugging, Quick Adaptation",
      expect: "Resilient troubleshooting and rapid mastery of new frameworks or developer tools on demand."
    }
  ];

  const techWallData = [
    { name: "React", category: "Frontend", desc: "Component-based UI library for building scalable, responsive web applications.", projectsUsed: "Portfolio, Multi-Agent Co-pilot Workspace", reason: "Chosen for component modularity and vast ecosystem support." },
    { name: "TypeScript", category: "Language", desc: "Typed superset of JavaScript ensuring robust type safety and maintainability.", projectsUsed: "Autonomous Agent Orchestrator, All Core Apps", reason: "Eliminates runtime errors and provides pristine IDE autocomplete." },
    { name: "Python", category: "Backend / AI", desc: "Core language for backend server architectures and AI model integration scripts.", projectsUsed: "Neural RAG Search Engine, API Pipelines", reason: "Industry standard for AI, machine learning, and rapid scripting." },
    { name: "FastAPI", category: "Backend", desc: "High-performance Python web framework for building fast RESTful APIs.", projectsUsed: "Backend Data Services & Agent APIs", reason: "Blazing speed, automatic Swagger docs, and native async support." },
    { name: "Tailwind CSS", category: "Styling", desc: "Utility-first CSS framework for crafting bespoke editorial dark luxury interfaces.", projectsUsed: "All Web Applications & Portfolios", reason: "Unmatched styling speed and pristine design consistency." },
    { name: "Supabase", category: "Database", desc: "Open-source Firebase alternative with PostgreSQL, Auth, and Realtime features.", projectsUsed: "User Management & Data Storage Pipelines", reason: "Provides instant database scaffolding with robust security policies." },
    { name: "Docker", category: "DevOps", desc: "Containerization tool for packaging applications and dependencies reliably.", projectsUsed: "Local Development & Server Deployment", reason: "Ensures identical environments across development and production." },
    { name: "Vercel", category: "Cloud", desc: "Cloud platform for static sites and serverless frontend deployments.", projectsUsed: "Portfolio & Frontend Apps", reason: "Instant global deployments, SSL, and optimal edge performance." },
    { name: "Railway", category: "Cloud", desc: "Infrastructure platform for deploying backend services, databases, and APIs.", projectsUsed: "FastAPI Backend & Agent Services", reason: "Effortless server management and seamless environment variable sync." },
    { name: "Git & GitHub", category: "Versioning", desc: "Version control system and collaboration platform for source code management.", projectsUsed: "All Projects & Repositories", reason: "Essential for tracking code history and collaborative deployment." },
    { name: "VS Code", category: "Environment", desc: "Extensible source code editor tailored with custom AI extensions.", projectsUsed: "Primary Development Environment", reason: "Unrivaled extension ecosystem and deep terminal integration." },
    { name: "Kali Linux", category: "Security", desc: "Linux distribution focused on advanced penetration testing and security auditing.", projectsUsed: "Network Analysis & Security Testing", reason: "Essential toolkit for understanding cybersecurity and system hardening." }
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#e4e2e1] selection:bg-red-600 selection:text-white font-mono-tech relative overflow-x-hidden">
      
      {/* Dynamic Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-red-600 z-[100] origin-left shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        style={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
      />

      {/* -------------------------------------------------------------------- */}
      {/*                        SHARED BOOT LOADING SCREEN                    */}
      {/* -------------------------------------------------------------------- */}
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
                
                {/* Subtle Glow Scanner Pass */}
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

      {/* -------------------------------------------------------------------- */}
      {/*                       DESKTOP HEADER (< 768px hidden)                */}
      {/* -------------------------------------------------------------------- */}
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

      {/* -------------------------------------------------------------------- */}
      {/*                        MOBILE HEADER (< 768px)                      */}
      {/* -------------------------------------------------------------------- */}
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

      {/* MOBILE FULL-SCREEN / BOTTOM-SHEET NAV MENU */}
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
                { name: 'Skills', href: '#skills', num: '02' },
                { name: 'Projects', href: '#projects', num: '03' },
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
        
        {/* =================================================----------------- */}
        {/* HERO SECTION — DESKTOP VIEW (>= 768px)                             */}
        {/* =================================================----------------- */}
        <section className="hidden md:block relative px-6 md:px-16 pt-12 pb-24 border-b border-[#222] max-w-[1440px] mx-auto overflow-hidden">
          <div className="flex justify-between items-center mb-8 text-xs tracking-widest uppercase text-zinc-500 relative z-10 font-mono">
            <span className="text-red-500 font-semibold">// AI ENGINEERING & FULL-STACK</span>
            <span className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
              AVAILABLE FOR COLLABORATION
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
            {/* Background Parallax Typography */}
            <motion.div 
              animate={{ x: [0, -15, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-15"
            >
              <span className="font-display text-[22vw] md:text-[25vw] font-black uppercase tracking-tighter text-red-600/30 leading-none whitespace-nowrap">
                PORTFOLIO
              </span>
            </motion.div>

            {/* Hero Left Content Sequence */}
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

            {/* Profile Image Entrance & Interactive Hover */}
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

            {/* Identity Blocks Sequence */}
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

        {/* =================================================----------------- */}
        {/* HERO SECTION — MOBILE DEDICATED VIEW (< 768px)                     */}
        {/* =================================================----------------- */}
        <section className="md:hidden px-5 pt-6 pb-12 border-b border-[#222] space-y-6">
          {/* 01 Identity */}
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

          {/* 02 Profile Card */}
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

          {/* 03 Compact Identity Cards */}
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

          {/* Hero CTAs */}
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

        {/* =================================================----------------- */}
        {/* ABOUT ME SECTION — SHARED LAYOUT WITH MOBILE TOUCH ADAPTATIONS    */}
        {/* =================================================----------------- */}
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
                {/* Desktop typewriter */}
                <div className="hidden md:block">
                  <TypewriterHeading />
                </div>
                
                {/* Mobile clean header */}
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

              {/* Technical Arsenal Chips */}
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

            {/* Profile Image & Evolution Roadmap */}
            <div className="lg:col-span-5 flex justify-center">
              {/* DESKTOP HOVER CARD */}
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

              {/* MOBILE TAP-TO-REVEAL EVOLUTION CARD */}
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

        {/* =================================================----------------- */}
        {/* CAPABILITIES SECTION — DESKTOP + MOBILE EXPANDABLE LIST            */}
        {/* =================================================----------------- */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="skills" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#dc2626 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="relative z-10 space-y-12 md:space-y-24">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4 md:space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-red-500 font-semibold">
                  <span className="w-2 h-2 bg-red-600 animate-ping rounded-full"></span>
                  <span>// ENGINEERING CAPABILITIES</span>
                </div>
                <h2 className="font-display text-3xl md:text-7xl text-white uppercase tracking-tight">
                  WHAT I CAN <span className="italic text-red-600">BUILD.</span>
                </h2>
                <p className="text-xs text-zinc-400 font-sans">
                  From AI-powered products to production-ready full-stack systems.
                </p>
              </div>

              <div className="lg:col-span-5 w-full">
                <SystemEngineeringModelCanvas isMobile={isMobileDevice} />
              </div>
            </div>

            {/* CAPABILITY CARDS */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">// 6 CORE DOMAINS</h3>
              </div>

              {/* Desktop 3-column Grid */}
              <motion.div 
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {capabilitiesData.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    variants={staggerItemVariant}
                    whileHover={{ y: -6, borderColor: "rgba(220, 38, 38, 0.8)" }}
                    transition={{ duration: 0.25, ease: PREMIUM_EASE }}
                    className="border border-[#222] bg-[#121212] p-6 rounded-xl flex flex-col justify-between group shadow-xl relative overflow-hidden"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-lg bg-red-950/30 border border-red-900/40 flex items-center justify-center group-hover:border-red-600/60 transition-colors">
                          {card.icon}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">MODULE_0{idx + 1}</span>
                      </div>
                      <h4 className="font-display text-xl text-white uppercase tracking-tight group-hover:text-red-500 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{card.desc}</p>
                      <div className="pt-3 border-t border-[#222]/80 space-y-1">
                        <p className="text-[10px] text-red-400 uppercase tracking-widest font-bold font-mono">Tech Stack:</p>
                        <p className="text-[11px] text-zinc-300 font-mono">{card.tech}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Vertical Accordion / Expandable List */}
              <div className="md:hidden space-y-3">
                {capabilitiesData.map((card, idx) => {
                  const isExpanded = expandedCapability === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-[#222] bg-[#121212] rounded-xl overflow-hidden transition-colors active:border-red-600"
                    >
                      <button
                        onClick={() => setExpandedCapability(isExpanded ? null : idx)}
                        className="w-full p-4 flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-red-950/40 border border-red-900/40 flex items-center justify-center shrink-0">
                            {card.icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white uppercase">{card.title}</h4>
                            <p className="text-[10px] text-zinc-400 line-clamp-1">{card.desc}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-red-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: PREMIUM_EASE }}
                            className="px-4 pb-4 pt-1 border-t border-[#222] space-y-3 bg-black/40 text-xs overflow-hidden"
                          >
                            <p className="text-zinc-300 font-sans leading-relaxed pt-2">{card.desc}</p>
                            <div>
                              <span className="text-[10px] font-mono text-red-400 font-bold block uppercase">Tech Stack:</span>
                              <span className="text-[11px] font-mono text-zinc-400">{card.tech}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-red-400 font-bold block uppercase">Client Expectation:</span>
                              <span className="text-[11px] font-sans text-zinc-300">{card.expect}</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WHAT I CAN BUILD (2-Column Grid on Mobile) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">// DELIVERABLE SOLUTIONS</h3>
              </div>
              <motion.div 
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs"
              >
                {[
                  "AI Applications",
                  "Business Management Systems",
                  "E-Commerce Platforms",
                  "Attendance Systems",
                  "Learning Platforms",
                  "Portfolio Websites",
                  "Automation Tools",
                  "Dashboard Systems"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    variants={staggerItemVariant}
                    whileHover={{ scale: 1.03, borderColor: '#dc2626' }}
                    className="border border-[#222] bg-[#121212] p-3.5 rounded-xl text-center font-bold text-white uppercase text-[11px] flex items-center justify-center gap-2 shadow cursor-default"
                  >
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ENGINEERING WORKFLOW (Vertical Timeline on Mobile) */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">// ENGINEERING WORKFLOW</h3>
              </div>
              
              {/* Desktop 7-Column */}
              <motion.div 
                variants={staggerContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="hidden md:grid grid-cols-7 gap-4"
              >
                {[
                  { step: "01", name: "Research", desc: "Requirements & docs" },
                  { step: "02", name: "Planning", desc: "DB schemas & UI" },
                  { step: "03", name: "Architecture", desc: "Full-stack design" },
                  { step: "04", name: "Development", desc: "Clean React & Python" },
                  { step: "05", name: "Testing", desc: "Debug & optimize" },
                  { step: "06", name: "Deployment", desc: "Vercel / Railway" },
                  { step: "07", name: "Iteration", desc: "Continuous improvements" }
                ].map((wf, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={staggerItemVariant}
                    whileHover={{ y: -3, borderColor: '#dc2626' }}
                    className="border border-[#222] bg-[#121212] p-4 rounded-lg transition-colors"
                  >
                    <span className="text-red-600 font-mono text-xs font-bold block mb-1">{wf.step}</span>
                    <h4 className="text-white uppercase font-bold text-xs mb-1 font-mono">{wf.name}</h4>
                    <p className="text-[10px] text-zinc-400 font-sans">{wf.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Vertical List */}
              <div className="md:hidden space-y-2.5">
                {[
                  { step: "01", name: "RESEARCH", desc: "Understand the problem and requirements." },
                  { step: "02", name: "PLANNING", desc: "Structure the product and architecture." },
                  { step: "03", name: "ARCHITECTURE", desc: "Design the full-stack system." },
                  { step: "04", name: "DEVELOPMENT", desc: "Build clean, performant code." },
                  { step: "05", name: "TESTING", desc: "Debug errors and optimize performance." },
                  { step: "06", name: "DEPLOYMENT", desc: "Ship containerized builds to production." },
                  { step: "07", name: "ITERATION", desc: "Refine and improve continuously." }
                ].map((wf) => (
                  <div key={wf.step} className="border border-[#222] bg-[#121212] p-3.5 rounded-xl flex items-start gap-3">
                    <span className="text-xs font-mono text-red-500 font-bold pt-0.5">{wf.step}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase font-mono">{wf.name}</h4>
                      <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{wf.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TECHNOLOGY WALL */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#222] pb-3">
                <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-red-500">// TECHNOLOGY WALL</h3>
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
                    className="border border-[#222] bg-[#121212] p-3.5 rounded-xl cursor-pointer active:border-red-600 transition-colors"
                  >
                    <span className="text-[10px] text-red-500 uppercase font-mono block mb-0.5">{tech.category}</span>
                    <h4 className="text-white font-bold uppercase text-xs font-mono">{tech.name}</h4>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* RESEARCH / PROBLEM SOLVING */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[#222] bg-[#121212] p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-xs text-red-500 font-bold font-mono">
                  <Compass className="w-4 h-4 text-red-500" />
                  <span>// HOW I LEARN & ADAPT</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300 font-sans">
                  <p>• Learn unfamiliar technologies rapidly on project demand.</p>
                  <p>• Break complex problems into testable components.</p>
                  <p>• Study official documentation & technical papers deeply.</p>
                  <p>• Experiment in local sandboxes and debug systematically.</p>
                </div>
              </div>

              <div className="border border-[#222] bg-[#121212] p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-xs text-red-500 font-bold font-mono">
                  <TerminalSquare className="w-4 h-4 text-red-500" />
                  <span>// HOW I SOLVE PROBLEMS</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] rounded">Challenge</span>
                  <span>→</span>
                  <span className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] rounded">Research</span>
                  <span>→</span>
                  <span className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] rounded">Prototype</span>
                  <span>→</span>
                  <span className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] rounded">Debug</span>
                  <span>→</span>
                  <span className="px-2.5 py-1 bg-[#1a1a1a] border border-[#333] rounded">Optimize</span>
                  <span>→</span>
                  <span className="px-2.5 py-1 bg-red-950/60 border border-red-700 text-red-400 rounded font-bold">Deliver</span>
                </div>
              </div>
            </div>

          </div>
        </motion.section>

        {/* =================================================----------------- */}
        {/* PROJECTS SECTION — DESKTOP COVERFLOW vs MOBILE VERTICAL CARDS      */}
        {/* =================================================----------------- */}
        <motion.section 
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="projects" 
          className="px-5 md:px-16 py-16 md:py-28 border-b border-[#222] max-w-[1440px] mx-auto overflow-hidden"
        >
          <div className="text-center mb-10 md:mb-16">
            <span className="text-xs font-mono tracking-widest uppercase text-red-500 block mb-2">// WORKSPACE</span>
            <h2 className="font-display text-3xl md:text-6xl text-white uppercase tracking-tight">
              SELECTED <span className="italic text-red-600">PROJECTS.</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-2 font-sans">
              A selection of systems, applications, and products I've designed and deployed.
            </p>
          </div>

          {/* DESKTOP 3D COVERFLOW (>= 768px) */}
          <div 
            className="hidden md:flex relative w-full h-[520px] md:h-[580px] items-center justify-center cursor-pointer select-none"
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

                let translateX = offset * 240;
                let scale = 1 - absOffset * 0.15;
                let rotateY = offset * -25;
                let zIndex = 50 - absOffset * 10;
                let opacity = 1 - absOffset * 0.35;

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
                    className={`absolute w-[320px] h-[480px] rounded-2xl p-5 flex flex-col justify-between border transition-colors shadow-2xl overflow-hidden group ${
                      isActive 
                        ? 'bg-gradient-to-b from-[#1c1824] via-[#14121b] to-[#0a0a0f] border-red-500/80 shadow-[0_0_50px_rgba(220,38,38,0.3)] ring-2 ring-red-600/40' 
                        : 'bg-gradient-to-b from-[#141414] to-[#0a0a0a] border-zinc-800/80 opacity-70'
                    }`}
                  >
                    <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-zinc-400 border-b border-white/10 pb-3">
                      <span className="text-red-400 font-bold">{proj.number}</span>
                      <span className={`uppercase font-bold ${proj.isMaintenance ? 'text-zinc-500' : 'text-green-500'}`}>{proj.status}</span>
                    </div>

                    <div className="relative z-10 w-full h-[220px] rounded-xl overflow-hidden bg-black/40 border border-white/10">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>

                    <div className="relative z-10 space-y-3 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                      <h4 className="font-display text-base text-white uppercase truncate">{proj.title}</h4>
                      <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                        <span className="text-red-400 font-mono font-bold">{proj.price || '3.45 ETH'}</span>
                        <span className="text-zinc-400 font-mono">{proj.stats || '50k'}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* MOBILE DEDICATED VERTICAL PROJECT CARDS (< 768px) */}
          <div className="md:hidden space-y-6">
            {projects.map((proj) => (
              <motion.div 
                key={proj.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveProjectModal(proj)}
                className="border border-red-900/40 bg-[#121212] rounded-2xl overflow-hidden shadow-xl p-4 space-y-4 active:border-red-600 transition-colors"
              >
                <div className="flex justify-between items-center border-b border-[#222] pb-2 text-[10px] font-mono">
                  <span className="text-red-500 font-bold">{proj.number}</span>
                  <span className={`px-2 py-0.5 rounded font-bold ${proj.isMaintenance ? 'bg-zinc-800 text-zinc-400' : 'bg-green-950 text-green-400'}`}>
                    {proj.status}
                  </span>
                </div>

                <div className="w-full h-48 rounded-xl overflow-hidden bg-black relative">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover filter contrast-110" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">{proj.category}</span>
                  <h3 className="font-display text-xl text-white uppercase tracking-tight">{proj.title}</h3>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">{proj.description}</p>
                </div>

                <button className="w-full h-11 bg-red-600/90 text-white font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 font-mono">
                  <span>VIEW DETAILS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =================================================----------------- */}
        {/* COPILOT SECTION — NATIVE AI ASSISTANT CHAT                          */}
        {/* =================================================----------------- */}
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
              <h2 className="font-display text-3xl md:text-5xl text-white uppercase">ASK ANYTHING</h2>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                Ask about my engineering skills, projects, tools, or development approach.
              </p>
            </div>

            {/* Quick Prompt Chips */}
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

        {/* =================================================----------------- */}
        {/* CONTACT SECTION — CLEAN, TOUCH-FRIENDLY TRANSMISSION FORM         */}
        {/* =================================================----------------- */}
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
                <h2 className="font-display text-4xl md:text-7xl text-white uppercase tracking-tight leading-none">
                  LET'S BUILD <br /><span className="italic text-red-600">SOMETHING.</span>
                </h2>
                <p className="text-xs text-zinc-400 font-sans mt-3">
                  Have a project, idea, or technical challenge? Let's talk.
                </p>
              </div>

              {/* Direct Social Channels */}
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

            {/* TRANSMISSION FORM */}
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
                      placeholder="e.g. alex@enterprise.com" 
                      className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-xs text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-red-600 font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 uppercase block mb-1.5">PROJECT SCOPE & GOALS *</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.project_scope}
                      onChange={(e) => setFormData({ ...formData, project_scope: e.target.value })}
                      placeholder="Describe your project, timeline, or requirements..." 
                      className="w-full bg-[#0a0a0a] border border-[#333] px-4 py-3 text-xs text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-red-600 font-mono transition-colors resize-none"
                    ></textarea>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-xs font-mono bg-red-950/30 border border-red-900/50 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage || 'Transmission failed. Try direct email.'}</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-400 text-xs font-mono bg-green-950/30 border border-green-900/50 p-3 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>TRANSMISSION SENT SUCCESSFULLY. I WILL RESPOND SHORTLY.</span>
                  </div>
                )}

                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full min-h-[52px] bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl active:bg-red-700 font-mono flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(220,38,38,0.25)]"
                >
                  {status === 'loading' ? (
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>TRANSMITTING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>DISPATCH TRANSMISSION</span>
                    </div>
                  )}
                </motion.button>
              </form>
            </div>

          </div>
        </motion.section>

      </motion.main>

      {/* FOOTER */}
      <footer className="border-t border-[#222] bg-[#080808] py-8 px-5 md:px-16 text-center text-xs text-zinc-500 font-mono">
        <p>© 2026 JJ // AI ENGINEER & FULL-STACK ARCHITECT. ALL RIGHTS RESERVED.</p>
      </footer>

      {/* -------------------------------------------------------------------- */}
      {/* TECH WALL MODAL                                                      */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {activeTechModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTechModal(null)}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-5"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-red-900/50 w-full max-w-md p-6 rounded-2xl space-y-4 relative shadow-2xl font-mono"
            >
              <button 
                onClick={() => setActiveTechModal(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-[#1a1a1a] rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-xs text-red-500 uppercase font-bold">{activeTechModal.category}</span>
                <h3 className="text-2xl font-bold text-white uppercase">{activeTechModal.name}</h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 font-sans border-t border-[#222] pt-3">
                <p><strong className="text-white font-mono uppercase">Overview:</strong> {activeTechModal.desc}</p>
                <p><strong className="text-white font-mono uppercase">Projects Used:</strong> {activeTechModal.projectsUsed}</p>
                <p><strong className="text-white font-mono uppercase">Selection Reason:</strong> {activeTechModal.reason}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------- */}
      {/* PROJECT MODAL                                                        */}
      {/* -------------------------------------------------------------------- */}
      <AnimatePresence>
        {activeProjectModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProjectModal(null)}
            className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex items-center justify-center p-5 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-red-900/50 w-full max-w-xl p-6 md:p-8 rounded-2xl space-y-6 relative shadow-2xl my-auto"
            >
              <button 
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white bg-[#1a1a1a] rounded-full z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold">
                  <span>{activeProjectModal.number}</span>
                  <span>•</span>
                  <span>{activeProjectModal.category}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white uppercase">{activeProjectModal.title}</h3>
              </div>

              <div className="w-full h-56 rounded-xl overflow-hidden bg-black border border-[#222]">
                <img src={activeProjectModal.image} alt={activeProjectModal.title} className="w-full h-full object-cover" />
              </div>

              <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                {activeProjectModal.description}
              </p>

              <div className="flex gap-3 pt-2">
                {activeProjectModal.url && (
                  <a 
                    href={activeProjectModal.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 min-h-[48px] bg-red-600 text-white font-bold text-xs font-mono uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 active:bg-red-700"
                  >
                    <span>VISIT LIVE DEMO</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button 
                  onClick={() => setActiveProjectModal(null)} 
                  className="min-h-[48px] px-6 border border-[#333] bg-[#1a1a1a] text-white font-bold text-xs font-mono uppercase tracking-widest rounded-xl"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};