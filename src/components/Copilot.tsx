import React, { useState } from 'react';

import { Terminal, Send, Cpu, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const Copilot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'SYS_AGENT v2.5 initialized. Ask me anything about my neural architectures, RAG pipelines, or LLM optimization stack.'
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsProcessing(true);

    // Simulate real-time streaming response from AI engineering backend
    setTimeout(() => {
      let responseContent = "Analyzing request through distributed transformer clusters...";
      if (userMessage.toLowerCase().includes('rag') || userMessage.toLowerCase().includes('vector')) {
        responseContent = "The RAG pipeline utilizes hybrid dense-sparse indexing with sub-50ms vector retrieval and contextual re-ranking layers.";
      } else if (userMessage.toLowerCase().includes('stack') || userMessage.toLowerCase().includes('tech')) {
        responseContent = "Core stack: React, TypeScript, Vite, Tailwind CSS, Node.js, Express, PostgreSQL / Supabase, and custom Gemini API bindings.";
      } else {
        responseContent = `Processed query "${userMessage}" successfully with zero token loss and 38ms inference latency.`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: responseContent }]);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <section id="copilot" className="px-6 md:px-16 py-32 border-b border-noir max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-noir">
        <div>
          <span className="font-mono-tech text-xs tracking-widest uppercase text-[#2E5BFF] block mb-2">
            // INTERACTIVE COPILOT SANDBOX
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-normal text-stark-white uppercase tracking-tight">
            Query The <span className="italic text-primary">Agent.</span>
          </h2>
        </div>
        <p className="font-mono-tech text-xs text-muted-slate uppercase tracking-wider mt-4 md:mt-0">
          [LIVE GEMINI 2.5 INTEGRATION]
        </p>
      </div>

      <div className="border border-noir bg-[#0e0e0e] sharp-edge overflow-hidden max-w-4xl mx-auto shadow-2xl">
        {/* Terminal Top Bar */}
        <div className="bg-[#1b1c1c] px-6 py-4 border-b border-noir flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-[#2E5BFF]" />
            <span className="font-mono-tech text-xs uppercase tracking-widest text-primary">
              agent-terminal@architectural-noir:~
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-500/80 sharp-edge"></span>
            <span className="w-2.5 h-2.5 bg-yellow-500/80 sharp-edge"></span>
            <span className="w-2.5 h-2.5 bg-green-500/80 sharp-edge"></span>
          </div>
        </div>

        {/* Chat History View */}
        <div className="p-6 md:p-8 h-96 overflow-y-auto flex flex-col space-y-6 font-mono-tech text-sm">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="p-2 bg-[#2a2a2a] sharp-edge text-[#2E5BFF]">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div 
                className={`p-4 max-w-xl sharp-edge leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-stark-white text-surface font-semibold' 
                    : 'bg-[#1b1c1c] text-on-surface border border-noir'
                }`}
              >
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div className="p-2 bg-primary sharp-edge text-surface">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-3 text-muted-slate font-mono-tech text-xs animate-pulse">
              <Cpu className="w-4 h-4 text-[#2E5BFF] animate-spin" />
              <span>COMPUTING INFERENCE STREAM...</span>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="border-t border-noir p-4 bg-[#131313] flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my AI architectures, tech stack, or engineering models..."
            className="flex-1 bg-transparent border border-noir px-4 py-3 font-mono-tech text-xs text-stark-white placeholder-muted-slate sharp-edge focus:outline-none focus:border-stark-white transition-colors"
          />
          <button
            type="submit"
            disabled={isProcessing}
            className="sharp-edge bg-stark-white text-surface px-6 py-3 font-mono-tech text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-primary transition-colors disabled:opacity-50"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </section>
  );
};