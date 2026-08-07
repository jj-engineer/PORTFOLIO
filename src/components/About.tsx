import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from "lucide-react";

export const About: React.FC = () => {
  return (
    <section id="about" className="px-6 md:px-16 py-32 border-b border-noir max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-noir">
        <div>
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#2E5BFF] block mb-2">
            // PROFILE & DOSSIER
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-normal text-stark-white uppercase tracking-tight">
            JJ // <span className="italic text-primary">AI Engineer.</span>
          </h2>
        </div>
        <p className="font-mono-tech text-xs text-muted-slate uppercase tracking-wider mt-4 md:mt-0">
          [LOCATION: CAMBODIA // GLOBAL]
        </p>
      </div>

      {/* Main Grid: Photo Frame + Bio Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        
        {/* Left: Editorial Photo / ID Box (Matching the aesthetic of your sample image) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 border border-noir bg-[#0e0e0e] sharp-edge p-6 relative group"
        >
          <div className="absolute top-4 right-4 z-10 bg-[#131313] border border-noir px-3 py-1 font-mono-tech text-[10px] uppercase text-[#2E5BFF]">
            ID_VERIFIED // 2026
          </div>
          
          <div className="w-full h-[450px] overflow-hidden sharp-edge border border-noir mb-6">
            {/* High-fashion grayscale architectural portrait placeholder or your image */}
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
              alt="JJ - AI Engineer" 
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-3 font-mono-tech text-xs">
            <div className="flex justify-between border-b border-noir pb-2">
              <span className="text-muted-slate">DESIGNATION:</span>
              <span className="text-stark-white uppercase">AI / Software Engineer</span>
            </div>
            <div className="flex justify-between border-b border-noir pb-2">
              <span className="text-muted-slate">CORE FOCUS:</span>
              <span className="text-stark-white uppercase">LLMs & Intelligent Systems</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-slate">MISSION:</span>
              <span className="text-stark-white uppercase">Build High-Impact Tech</span>
            </div>
          </div>
        </motion.div>

        {/* Right: YAML Developer Spec & Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 border border-noir bg-[#0e0e0e] sharp-edge p-8 font-mono-tech"
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-noir">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#2E5BFF]" />
              <span className="text-xs uppercase tracking-widest text-primary">developer_spec.yaml</span>
            </div>
            <span className="text-[10px] text-muted-slate">READ_ONLY</span>
          </div>

          <pre className="text-xs md:text-sm text-on-surface leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`Developer:
  name: JJ
  location: Cambodia
  status: Active // Building Intelligent Systems

Education & Research:
  field: AI Engineering & Software Architecture

Specialization:
  - Artificial Intelligence & Machine Learning Systems
  - Full Stack Architecture (React, Node.js, TypeScript)
  - Large Language Models & Vector Infrastructures

Engineering Approach:
  - Clean Architecture & 0px Precision Layouts
  - Scalable Distributed Backend Systems
  - Research-Driven Development & Continuous Iteration`}
          </pre>

          <div className="mt-8 pt-6 border-t border-noir flex flex-wrap gap-4">
            <a 
              href="https://github.com/jj-engineer" 
              target="_blank" 
              rel="noreferrer"
              className="sharp-edge bg-stark-white text-surface px-6 py-3 text-xs uppercase font-semibold tracking-wider hover:bg-primary transition-colors flex items-center gap-2"
            >
              GitHub Profile
            </a>
            <a 
              href="mailto:choeurntekchass@gmail.com" 
              className="sharp-edge border border-stark-white text-stark-white px-6 py-3 text-xs uppercase font-semibold tracking-wider hover:bg-[#393939] transition-colors flex items-center gap-2"
            >
              Direct Email
            </a>
          </div>
        </motion.div>

      </div>

      {/* Technology Stack Grid */}
      <div className="mb-24">
        <h3 className="font-display text-3xl md:text-4xl text-stark-white uppercase mb-8">
          // Technology <span className="italic text-primary">Arsenal</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-noir bg-[#0e0e0e] p-6 sharp-edge">
            <span className="font-mono-tech text-xs text-[#2E5BFF] uppercase tracking-widest block mb-4">
              [01 // LANGUAGES & AI]
            </span>
            <p className="text-sm font-mono-tech text-on-surface leading-relaxed">
              Python, TypeScript, JavaScript, C++, Java, PyTorch, TensorFlow, LLM Fine-Tuning, RAG Pipelines.
            </p>
          </div>

          <div className="border border-noir bg-[#0e0e0e] p-6 sharp-edge">
            <span className="font-mono-tech text-xs text-[#2E5BFF] uppercase tracking-widest block mb-4">
              [02 // FULL-STACK & DB]
            </span>
            <p className="text-sm font-mono-tech text-on-surface leading-relaxed">
              React, Next.js, Vite, Tailwind CSS, Node.js, Express, PostgreSQL, Supabase, REST & GraphQL APIs.
            </p>
          </div>

          <div className="border border-noir bg-[#0e0e0e] p-6 sharp-edge">
            <span className="font-mono-tech text-xs text-[#2E5BFF] uppercase tracking-widest block mb-4">
              [03 // INFRA & TOOLS]
            </span>
            <p className="text-sm font-mono-tech text-on-surface leading-relaxed">
              Linux, Docker, Git, GitHub Actions, VS Code, Architectural Clean Code Design Patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Timeline Section */}
      <div>
        <h3 className="font-display text-3xl md:text-4xl text-stark-white uppercase mb-8">
          // Engineering <span className="italic text-primary">Timeline</span>
        </h3>

        <div className="border border-noir bg-[#0e0e0e] p-8 sharp-edge space-y-8 font-mono-tech text-xs md:text-sm">
          <div className="border-b border-noir pb-6">
            <span className="text-[#2E5BFF] font-semibold block mb-1">2024 // FOUNDATION</span>
            <p className="text-on-surface">Core Programming Fundamentals, Algorithm Design, and Web Development initiation.</p>
          </div>
          <div className="border-b border-noir pb-6">
            <span className="text-[#2E5BFF] font-semibold block mb-1">2025 // FULL-STACK EXPANSION</span>
            <p className="text-on-surface">Full-Stack Engineering mastery, relational database design, and early AI integration experiments.</p>
          </div>
          <div className="border-b border-noir pb-6">
            <span className="text-[#2E5BFF] font-semibold block mb-1">2026 // AI ENGINEERING & SYSTEMS</span>
            <p className="text-on-surface">Specialized AI Engineering, Machine Learning pipelines, autonomous multi-agent systems, and production software architecture.</p>
          </div>
          <div>
            <span className="text-muted-slate font-semibold block mb-1">FUTURE // HORIZON</span>
            <p className="text-muted-slate">Advanced AI Research, scalable distributed intelligence, and high-impact real-world technology deployment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};