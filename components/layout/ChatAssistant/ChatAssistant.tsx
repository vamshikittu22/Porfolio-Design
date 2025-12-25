import React, { useState, useEffect, useRef } from 'react';
import { ChatService, ChatMessage } from '../../../services/chatService';
import { GlassCard } from '../../ui/GlassUI';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();

  const SUGGESTIONS = [
    { label: "Summarize profile", query: "Summarize Vamshi's profile for a recruiter." },
    { label: "Top 3 projects", query: "Tell me about your top 3 software projects." },
    { label: "Backend experience", query: "What is your experience with backend development and .NET?" },
    { label: "Work authorization", query: "What is your current work authorization status?" },
    { label: "Download resume", query: "How can I download your resume?" },
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

  const handleClose = () => setIsOpen(false);

  return (
    <div className="fixed bottom-8 right-8 z-[200] print:hidden">
      {/* Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-t-bg-el/90 backdrop-blur-xl border border-t-accent/40 shadow-2xl flex items-center justify-center text-t-accent hover:scale-110 active:scale-95 transition-all duration-500 group animate-in fade-in zoom-in"
          aria-label="Open portfolio assistant"
        >
          <div className="absolute inset-0 rounded-full bg-t-accent/10 group-hover:bg-t-accent/20 transition-colors" />
          <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-t-accent rounded-full border-2 border-t-bg animate-pulse" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 w-full md:w-[420px] h-full md:h-[650px] max-h-screen md:max-h-[85vh] animate-in slide-in-from-right duration-500 ease-out z-[210]">
          <GlassCard className="w-full h-full flex flex-col overflow-hidden border-t-accent/30 shadow-2xl !rounded-none md:!rounded-[40px]" accent="theme">
            {/* Header */}
            <div className="p-6 border-b border-t-border flex items-center justify-between bg-t-bg-el/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-t-accent/20 border border-t-accent/40 flex items-center justify-center text-t-accent shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-t-fg">Portfolio Assistant</h3>
                  <p className="text-[10px] font-bold text-t-fg-m uppercase tracking-widest opacity-60">Ask about projects, skills, or experience.</p>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="w-10 h-10 rounded-full hover:bg-t-fg/5 flex items-center justify-center text-t-fg/40 hover:text-t-fg transition-all"
                aria-label="Close assistant"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat History Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-t-bg/5"
            >
              {messages.length === 0 && (
                <div className="space-y-6 animate-in fade-in duration-700">
                  <div className="bg-t-bg-el/80 border border-t-border p-5 rounded-3xl rounded-tl-none shadow-sm">
                    <p className="text-sm font-medium text-t-fg leading-relaxed">
                      Hi! I'm Vamshi's AI Assistant. How can I help you understand his profile today?
                    </p>
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm
                    ${m.role === 'user' 
                      ? 'bg-t-accent text-t-bg rounded-tr-none' 
                      : 'bg-t-bg-el border border-t-border text-t-fg rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-t-bg-el border border-t-border p-4 rounded-3xl rounded-tl-none flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-t-accent" />
                    <div className="w-1.5 h-1.5 rounded-full bg-t-accent opacity-60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-t-accent opacity-30" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar & Quick Chips */}
            <div className="p-6 bg-t-bg-el/50 border-t border-t-border space-y-4">
              {/* Chips Area */}
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.query)}
                    className="flex-shrink-0 px-4 py-2 bg-t-bg border border-t-border rounded-full text-[9px] font-black uppercase tracking-widest text-t-fg-m hover:border-t-accent hover:text-t-accent hover:bg-t-accent/5 transition-all active:scale-95"
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center gap-3">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="w-full bg-t-bg border border-t-border rounded-full px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-t-accent outline-none transition-all placeholder:text-t-fg/20"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 rounded-full bg-t-accent text-t-bg flex items-center justify-center flex-shrink-0 disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-lg"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7M5 12h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Privacy Disclosure */}
            <div className="px-6 py-3 border-t border-t-border bg-t-bg-el/80">
              <p className="text-[8px] font-bold text-t-fg/40 uppercase tracking-[0.2em] text-center leading-normal">
                This assistant uses AI to answer questions about my work. <br />
                Please avoid sharing confidential information.
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
