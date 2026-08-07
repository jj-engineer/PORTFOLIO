import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  image: string;
}

const projects: Project[] = [
  {
    id: '01',
    number: '01 / ARCHIVE',
    title: 'Autonomous Multi-Agent Orchestrator',
    category: 'AI ENGINEERING // DISTRIBUTED SYSTEMS',
    description: 'Enterprise-grade LLM workflow automation pipeline with dynamic task decomposition and fault-tolerant agent handoffs.',
    metrics: 'LATENCY: 38ms // THROUGHPUT: 2.4k REQ/S',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '02',
    number: '02 / ARCHIVE',
    title: 'Real-Time Neural RAG Pipeline',
    category: 'VECTOR ARCHITECTURE // SEARCH',
    description: 'Sub-50ms vector retrieval engine utilizing hybrid dense-sparse indexing and contextual re-ranking layers.',
    metrics: 'LATENCY: 45ms // PRECISION: 99.4%',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '03',
    number: '03 / ARCHIVE',
    title: 'Edge LLM Inference Engine',
    category: 'HARDWARE ACCELERATION // OPTIMIZATION',
    description: 'Quantized on-device model runner optimized for local memory footprint and high token generation speed.',
    metrics: 'FOOTPRINT: 1.2GB // TOKENS: 112 T/S',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
  },
];

export const Projects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="projects" 
      className="relative px-6 md:px-16 py-32 border-b border-noir max-w-[1440px] mx-auto"
      onMouseMove={handleMouseMove}
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-noir">
        <div>
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#2E5BFF] block mb-2">
            // SELECTED WORKS
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-normal text-stark-white uppercase tracking-tight">
            Engineered <span className="italic text-primary">Artifacts.</span>
          </h2>
        </div>
        <p className="font-mono-tech text-xs text-muted-slate uppercase tracking-wider mt-4 md:mt-0">
          [HOVER FOR TELEMETRY PREVIEW]
        </p>
      </div>

      {/* Projects List */}
      <div className="flex flex-col">
        {projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            className="group relative py-10 border-t border-noir flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-colors duration-300 hover:bg-[#1b1c1c] px-4"
          >
            <div className="flex items-start md:items-center gap-6 md:gap-12">
              <span className="font-mono-tech text-xs text-muted-slate uppercase tracking-widest">
                {project.number}
              </span>
              <div>
                <h3 className="font-display text-3xl md:text-5xl font-medium text-stark-white group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="font-mono-tech text-xs text-muted-slate uppercase tracking-wider mt-2">
                  {project.category}
                </p>
              </div>
            </div>

            <div className="mt-6 md:mt-0 flex items-center gap-8">
              <span className="hidden lg:block font-mono-tech text-xs text-primary uppercase tracking-wider">
                {project.metrics}
              </span>
              <div className="sharp-edge p-4 border border-noir group-hover:border-stark-white group-hover:bg-stark-white group-hover:text-surface transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Image Preview on Hover (Digital Fashion Editorial Style) */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-50 w-72 h-96 border border-stark-white overflow-hidden hidden lg:block sharp-edge shadow-2xl"
            style={{
              top: mousePosition.y - 200,
              left: mousePosition.x + 30,
            }}
          >
            <img 
              src={hoveredProject.image} 
              alt={hoveredProject.title} 
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="absolute inset-0 bg-[#0A0A0A]/40 flex flex-col justify-end p-4">
              <span className="font-mono-tech text-[10px] text-stark-white uppercase tracking-widest bg-[#0A0A0A] px-2 py-1 w-max mb-1">
                {hoveredProject.metrics}
              </span>
              <p className="font-mono-tech text-xs text-stark-white line-clamp-2">
                {hoveredProject.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};