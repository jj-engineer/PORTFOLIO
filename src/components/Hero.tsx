import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative px-6 md:px-16 pt-12 pb-24 border-b border-noir max-w-[1440px] mx-auto overflow-hidden bg-[#0c0c0c]">
      
      {/* Top Banner Tags */}
      <div className="flex justify-between items-center mb-8 font-mono-tech text-xs tracking-widest uppercase text-muted-slate">
        <span className="text-red-500 font-semibold">// AI ENGINEERING & SYSTEMS ARCHITECTURE</span>
        <span className="flex items-center gap-2 text-stark-white">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          AVAILABLE FOR COLLABORATION
        </span>
      </div>

      {/* Main Hero Wrapper with Giant Typography Behind Photo */}
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[600px]">
        
        {/* Giant Background Typography Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden opacity-25">
          <span className="font-display text-[18vw] font-black uppercase tracking-tighter text-red-600/30 leading-none">
            PORTFOLIO
          </span>
        </div>

        {/* Left Content: Name & Intro Bio */}
        <div className="lg:col-span-4 z-10 space-y-6">
          <span className="font-mono-tech text-red-500 text-sm tracking-widest uppercase block">
            Hello, I'm
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-black text-stark-white uppercase tracking-tight leading-[0.9]">
            JJ <br />
            <span className="text-red-600">AI ENG</span>
          </h1>
          <p className="font-mono-tech text-xs uppercase tracking-widest text-stark-white font-semibold">
            AI Engineering Student & Developer
          </p>
          <p className="font-mono-tech text-xs text-on-surface leading-relaxed">
            Building intelligent systems, machine learning architectures, and scalable full-stack applications with clean code and rigorous research-driven methodologies.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <a 
              href="#dossier-archive" 
              className="sharp-edge bg-red-600 text-stark-white px-8 py-4 font-mono-tech text-xs font-semibold uppercase tracking-wider hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-900/30"
            >
              <span>Explore Works</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Center: High-End Cutout Photo Frame */}
        <div className="lg:col-span-4 z-10 flex justify-center relative">
          <div className="relative w-full max-w-sm h-[520px] rounded-2xl overflow-hidden border border-red-900/40 bg-gradient-to-b from-red-950/20 to-[#121212] shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent z-10 opacity-80"></div>
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop" 
              alt="JJ - AI Engineer" 
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 object-top"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/60 backdrop-blur-md p-4 border border-red-900/30">
              <p className="font-mono-tech text-[10px] text-red-400 uppercase tracking-widest">
                Build intelligent systems that create real-world impact.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed YAML Developer Spec Box */}
        <div className="lg:col-span-4 z-10 border border-red-950 bg-[#0e0e0e] p-6 sharp-edge font-mono-tech shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-noir">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-red-500" />
              <span className="text-xs uppercase tracking-widest text-red-500">developer_spec.yaml</span>
            </div>
            <span className="text-[10px] text-muted-slate">ACTIVE</span>
          </div>

          <pre className="text-[11px] text-on-surface leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`Developer:
  name: JJ
  location: Cambodia

Education:
  field: AI Engineering

Specialization:
  - Artificial Intelligence
  - Full Stack Development
  - Machine Learning Systems
  - Large Language Models
  - Software Architecture

Engineering Approach:
  - Clean Architecture
  - Scalable Systems
  - Research Driven Dev

Current Mission:
  Build intelligent systems 
  that create real impact.`}
          </pre>
        </div>

      </div>
    </section>
  );
};