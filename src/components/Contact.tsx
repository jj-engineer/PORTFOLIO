import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    project_scope: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      // Connects to your Express/Supabase backend endpoint
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || (data.errors ? data.errors[0].message : 'Transmission failed.'));
      }

      setStatus('success');
      setFormData({ sender_name: '', sender_email: '', project_scope: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Server connection error.');
    }
  };

  return (
    <section id="contact" className="px-6 md:px-16 py-32 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Editorial Heading */}
        <div className="lg:col-span-5">
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#2E5BFF] block mb-2">
            // INITIATE COLLABORATION
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-normal text-stark-white uppercase tracking-tight mb-6">
            Let's Build <br />
            <span className="italic text-primary">Together.</span>
          </h2>
          <p className="text-lg text-on-surface leading-relaxed mb-8">
            Currently available for select high-end AI engineering roles, custom agent architectures, and autonomous infrastructure projects.
          </p>

          <div className="space-y-4 font-mono-tech text-xs text-muted-slate uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#2E5BFF] sharp-edge"></span>
              <span>EMAIL: contact@architectural-noir.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-primary sharp-edge"></span>
              <span>LOCATION: GLOBAL // REMOTE</span>
            </div>
          </div>
        </div>

        {/* Right Column: Minimalist Form */}
        <div className="lg:col-span-7 border border-noir bg-[#0e0e0e] p-8 md:p-12 sharp-edge shadow-2xl">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-16 text-center flex flex-col items-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-[#2E5BFF]" />
              <h3 className="font-display text-3xl text-stark-white">Transmission Confirmed</h3>
              <p className="font-mono-tech text-xs text-primary max-w-md">
                Your message has been securely ingested into the pipeline. Architectural review in progress.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 sharp-edge border border-stark-white px-6 py-3 font-mono-tech text-xs text-stark-white hover:bg-stark-white hover:text-surface transition-colors uppercase tracking-wider"
              >
                Send Another Transmission
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {status === 'error' && (
                <div className="p-4 bg-red-950/40 border border-red-500/50 sharp-edge flex items-center gap-3 text-red-200 font-mono-tech text-xs">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block font-mono-tech text-xs uppercase tracking-widest text-primary mb-2">
                  // YOUR NAME
                </label>
                <input
                  type="text"
                  name="sender_name"
                  required
                  value={formData.sender_name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Vance"
                  className="w-full bg-transparent border-b border-noir pb-3 font-mono-tech text-sm text-stark-white placeholder-muted-slate focus:outline-none focus:border-stark-white transition-colors sharp-edge"
                />
              </div>

              <div>
                <label className="block font-mono-tech text-xs uppercase tracking-widest text-primary mb-2">
                  // EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="sender_email"
                  required
                  value={formData.sender_email}
                  onChange={handleChange}
                  placeholder="e.g. alex@enterprise.ai"
                  className="w-full bg-transparent border-b border-noir pb-3 font-mono-tech text-sm text-stark-white placeholder-muted-slate focus:outline-none focus:border-stark-white transition-colors sharp-edge"
                />
              </div>

              <div>
                <label className="block font-mono-tech text-xs uppercase tracking-widest text-primary mb-2">
                  // PROJECT SCOPE & OBJECTIVES
                </label>
                <textarea
                  name="project_scope"
                  required
                  rows={4}
                  value={formData.project_scope}
                  onChange={handleChange}
                  placeholder="Describe your AI engineering requirements or system architecture goals..."
                  className="w-full bg-transparent border-b border-noir pb-3 font-mono-tech text-sm text-stark-white placeholder-muted-slate focus:outline-none focus:border-stark-white transition-colors sharp-edge resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sharp-edge bg-stark-white text-surface py-4 font-mono-tech text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-primary transition-colors disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'Encrypting & Transmitting...' : 'Transmit Message'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};