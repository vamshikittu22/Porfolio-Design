
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChatService, ChatMessage } from '../../../services/chatService';
import { GlassCard } from '../../ui/GlassUI';

// --- MINIMALIST LIVING AI CORE ---
const LivingAICore = ({ isHovered, isOpen }: { isHovered: boolean; isOpen: boolean }) => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div 
            key="launcher-visual"
            className="relative w-full h-full flex items-center justify-center"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          >
            {/* Soft Neural Breathing Core */}
            <motion.div 
              className="absolute w-4 h-4 bg-t-accent rounded-full z-10 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.5)]"
              animate={{ 
                scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1],
                opacity: isHovered ? [0.8, 1, 0.8] : [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Single Minimal Orbital Ring */}
            <motion.div
              className="absolute inset-0 border border-t-accent/20 rounded-full"
              animate={{ 
                rotate: 360,
                borderColor: isHovered ? 'rgba(var(--color-accent-rgb), 0.4)' : 'rgba(var(--color-accent-rgb), 0.1)'
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                borderColor: { duration: 0.5 }
              }}
            />

            {/* Hover-only secondary ring */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  className="absolute inset-0 border border-t-accent/30 rounded-full"
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="close-visual"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            className="text-t-accent"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();
  const reducedMotion = useReducedMotion();

  const SUGGESTIONS = [
    { label: "Summarize profile", query: "Summarize Vamshi's profile for a recruiter." },
    { label: "Top 3 projects", query: "Tell me about your top 3 software projects." },
    { label: "Backend experience", query: "What is your experience with backend development and .NET?" },
    { label: "Work auth", query: "What is your current work authorization status?" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (query?: string) => {
    const textToSend = query || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const reply = await chatService.sendMessage(textToSend);
    const botMsg: ChatMessage = { role: 'model', text: reply };
    
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200] print:hidden">
      {/* Launcher Button - Minimal Swiss Style */}
      <motion.button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-20 h-20 rounded-[28px] bg-t-bg-el/90 backdrop-blur-2xl border flex items-center justify-center shadow-xl transition-all duration-500
          ${isOpen ? 'border-t-accent-2/30 shadow-t-accent-2/10' : 'border-t-border/50 hover:border-t-accent/40'}
        `}
        aria-label={isOpen ? "Close assistant" : "Open portfolio assistant"}
      >
        <LivingAICore isHovered={isHovered && !reducedMotion} isOpen={isOpen} />

        {/* Subtle Online Pulse */}
        {!isOpen && (
          <div className="absolute top-2 right-2">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-t-bg-el relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40" />
            </div>
          </div>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 md:inset-auto md:bottom-32 md:right-0 w-full md:w-[440px] h-full md:h-[680px] max-h-screen md:max-h-[80vh] z-[210] p-4"
          >
            <GlassCard className="w-full h-full flex flex-col overflow-hidden border-t-accent/20 shadow-2xl !rounded-[40px] bg-t-bg-el/98" accent="theme">
              {/* Header */}
              <div className="p-8 border-b border-t-border flex items-center justify-between bg-t-bg-el/40">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-t-accent/10 flex items-center justify-center text-t-accent shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-[0.2em] text-t-fg">VK Neural</h3>
                    <div className="flex items-center gap-1.5 mt-0.5 opacity-60">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest">Active Intelligence</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat History Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide"
              >
                {messages.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-t-bg/50 border border-t-border p-6 rounded-[28px] rounded-tl-none"
                  >
                    <p className="text-sm font-medium text-t-fg-m leading-relaxed italic">
                      Initializing connection... How can I assist with your review of Vamshi's engineering credentials?
                    </p>
                  </motion.div>
                )}

                {messages.map((m, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-5 rounded-[24px] text-sm leading-relaxed shadow-sm
                      ${m.role === 'user' 
                        ? 'bg-t-accent text-t-bg rounded-tr-none font-bold' 
                        : 'bg-t-bg-el border border-t-border text-t-fg rounded-tl-none font-medium'
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-t-bg-el border border-t-border px-5 py-4 rounded-[24px] rounded-tl-none flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div 
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-t-accent/40" 
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Bar & Quick Chips */}
              <div className="p-8 bg-t-bg-el/60 border-t border-t-border space-y-6">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05, borderColor: 'var(--color-accent)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSend(s.query)}
                      className="px-4 py-2 bg-t-bg border border-t-border rounded-full text-[8px] font-black uppercase tracking-widest text-t-fg-m hover:text-t-accent transition-all"
                    >
                      {s.label}
                    </motion.button>
                  ))}
                </div>

                <div className="relative flex items-center gap-3">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type an inquiry..."
                    className="w-full bg-t-bg border border-t-border rounded-2xl px-6 py-4 text-xs font-medium focus:ring-4 focus:ring-t-accent/5 focus:border-t-accent outline-none transition-all placeholder:text-t-fg/30"
                  />
                  <motion.button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl bg-t-accent text-t-bg flex items-center justify-center flex-shrink-0 disabled:opacity-20 transition-all shadow-lg"
                    aria-label="Send message"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path d="M14 5l7 7-7 7M5 12h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatAssistant;
