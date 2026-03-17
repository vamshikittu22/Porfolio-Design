import React, { useMemo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChatService, ChatMessage } from '../../../services/chatService';
import { getChapterById, CHAPTERS } from '../../../data/chapters';
import { PROJECTS_CONFIG } from '../../../config/projects';
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from '../../../config/constants';
import { ChapterId } from '../../../types/chapters';
import { useNavigation } from '../../../contexts/NavigationContext';
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
  const { currentChapter } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatService = ChatService.getInstance();
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    const history = chatService.getHistory();
    setMessages(history);
  }, []);

  // Follow-up questions mapping
  const FOLLOW_UPS: Record<string, Array<{ label: string; query: string }>> = {
    'summary': [
      { label: "Check Core Bio", query: "Give me a brief introduction to Vamshi." },
      { label: "Current Focus", query: "What is Vamshi currently working on?" },
      { label: "Recruiter Summary", query: "Summarize Vamshi's profile for a recruiter." }
    ],
    'skills': [
      { label: "Backend Stack", query: "Tell me more about the Java/Spring Boot stack." },
      { label: "Cloud Expertise", query: "What AWS and Azure services does he use?" },
      { label: "AI Tools", query: "Which AI models has he integrated?" }
    ],
    'career': [
      { label: "CVS Health Details", query: "Tell me about his experience at CVS Health." },
      { label: "Citadel Role", query: "What exactly did he do at Citadel?" },
      { label: "Previous Roles", query: "Tell me about his time at Mphasis and Covantech." }
    ],
    'projects': [
      { label: "Source Code?", query: "Where can I find the source code for his projects?" },
      { label: "Future Job Fit", query: "Tell me more about the AI Resume platform." },
      { label: "Travel Platform", query: "Details on WanderlustTrails travel app." }
    ]
  };

  // Dynamic suggestions based on chapter
  const SUGGESTIONS = useMemo(() => {
    const baseSuggestions = [
      { label: "Bio Summary", query: "Give me a brief introduction to Vamshi.", key: 'summary' },
      { label: "Tech Stack", query: "What are Vamshi's core technical strengths?", key: 'skills' },
      { label: "Career Path", query: "Tell me about his experience at CVS Health and Citadel.", key: 'career' },
      { label: "Top Projects", query: "Tell me about your top 3 software projects.", key: 'projects' }
    ];

    const chapterSuggestions: Record<ChapterId, Array<{ label: string; query: string }>> = {
      '01-introduction': [
        { label: "Who is Vamshi?", query: "Give me a brief introduction to Vamshi." },
        { label: "What's next?", query: "What chapters should I explore next?" },
        { label: "Core strengths", query: "What are Vamshi's core technical strengths?" },
      ],
      '02-learner': [
        { label: "Certifications", query: "What certifications does Vamshi hold?" },
        { label: "Technical skills", query: "What are Vamshi's technical skills?" },
        { label: "Agent Skills", query: "Tell me about his recent Anthropic AI certifications." },
      ],
      '03-builder': [
        { label: "Top 3 projects", query: "Tell me about your top 3 software projects." },
        { label: "Related chapters", query: "Which other chapters relate to technical work?" },
        { label: "Tech stack", query: "What technologies does Vamshi work with?" },
      ],
      '04-journey': [
        { label: "Career path", query: "Walk me through Vamshi's career journey." },
        { label: "Explore more", query: "What else can I learn about Vamshi?" },
        { label: "Work auth", query: "What is Vamshi's current work authorization status?" },
      ],
      '05-explorer': [
        { label: "Travel stories", query: "Tell me about Vamshi's travel experiences." },
        { label: "More chapters", query: "What other chapters are available?" },
      ],
      '06-thinker': [
        { label: "AI expertise", query: "What AI technologies does Vamshi work with?" },
        { label: "Claude Code", query: "How does he use Claude Code and Agent Skills?" },
        { label: "Navigation help", query: "How do I navigate between chapters?" },
      ],
      '07-connection': [
        { label: "How to contact", query: "How can I get in touch with Vamshi?" },
        { label: "Start over", query: "Take me back to the beginning." },
      ],
    };

    if (activeCategory && FOLLOW_UPS[activeCategory]) {
      return FOLLOW_UPS[activeCategory];
    }

    if (!currentChapter) {
      return baseSuggestions;
    }

    return chapterSuggestions[currentChapter] || baseSuggestions;
  }, [currentChapter, activeCategory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (query?: string, categoryKey?: string) => {
    const textToSend = query || input;
    if (!textToSend.trim() || isLoading) return;

    if (categoryKey) {
      setActiveCategory(categoryKey);
    } else if (!query) {
      // If typing manually, we might want to clear category if it's a new topic
      // For now, let's keep it sticky unless they reset
    }

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const reply = await chatService.sendMessage(textToSend, currentChapter);
    const botMsg: ChatMessage = { role: 'model', text: reply };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div
      className="fixed bottom-8 right-8 z-[200] print:hidden"
      data-chapter={currentChapter || undefined} // Apply chapter context
    >
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
                      <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest">
                        {currentChapter
                          ? `Chapter ${getChapterById(currentChapter)?.number || ''} Context`
                          : 'Landing Page'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Clear & Menu Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setActiveCategory(null);
                    }}
                    className={`p-2 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest
                      ${!activeCategory ? 'bg-t-accent text-t-bg' : 'bg-t-bg-el border border-t-border text-t-fg-m hover:text-t-accent'}
                    `}
                    title="Back to Main Menu"
                  >
                    Menu
                  </button>
                  {messages.length > 0 && (
                    <button 
                      onClick={() => {
                        chatService.clearHistory();
                        setMessages([]);
                        setActiveCategory(null);
                      }}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-t-fg-m hover:text-red-500 transition-all text-[10px] font-bold uppercase tracking-widest"
                      title="Clear Chat History"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Chat History Area */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide"
              >
                {/* Visual Menu (Always accessible when no active follow-ups or no messages) */}
                {(!activeCategory || messages.length === 0) && (
                  <div className="space-y-6 mb-8">
                    {messages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-t-bg/50 border border-t-border p-6 rounded-[28px] rounded-tl-none"
                      >
                        <p className="text-sm font-medium text-t-fg-m leading-relaxed italic">
                          Initializing connection... Select a core module to begin your review.
                        </p>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Executive Summary", query: "Summarize Vamshi's profile for a recruiter.", icon: "📋", key: 'summary' },
                        { label: "Technical Skills", query: "What are Vamshi's core technical strengths?", icon: "💻", key: 'skills' },
                        { label: "Career Journey", query: "Tell me about his experience at CVS Health and Citadel.", icon: "💼", key: 'career' },
                        { label: "Top Projects", query: "Tell me about your top 3 software projects.", icon: "🚀", key: 'projects' }
                      ].map((item, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          onClick={() => handleSend(item.query, item.key)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all group border
                            ${activeCategory === item.key 
                              ? 'bg-t-accent/10 border-t-accent border-2 shadow-lg' 
                              : 'bg-t-bg-el/50 border-t-border hover:border-t-accent/50 hover:bg-t-accent/5'
                            }
                          `}
                        >
                          <span className="text-xl mb-2">{item.icon}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-t-fg-m group-hover:text-t-accent text-center">{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
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
                      {/* Message Content with Linkification and Action Tokens */}
                      <div className="space-y-4">
                        <div className="text-sm font-medium leading-relaxed">
                          {m.text.split(/(\[GO_CHAPTER: \d+\]|\[OPEN_LINK: [^\]]+\]|https?:\/\/[^\s]+)/g).map((part, index) => {
                            if (part.match(/^https?:\/\//)) {
                              return (
                                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="underline decoration-2 underline-offset-4 hover:text-t-accent transition-colors break-all">
                                  {part}
                                </a>
                              );
                            }
                            if (part.startsWith('[GO_CHAPTER:')) {
                              return null; // Rendered as buttons below
                            }
                            if (part.startsWith('[OPEN_LINK:')) {
                              return null; // Rendered as buttons below
                            }
                            return part;
                          })}
                        </div>

                        {/* Action Buttons Row */}
                        {(m.text.includes('[GO_CHAPTER:') || m.text.includes('[OPEN_LINK:')) && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {/* Chapter Navigation Buttons */}
                            {Array.from(m.text.matchAll(/\[GO_CHAPTER: (\d+)\]/g)).map((match, idx) => {
                              const num = parseInt(match[1]);
                              const chapter = CHAPTERS.find(c => c.number === num);
                              if (!chapter) return null;
                              return (
                                <button
                                  key={`chap-${idx}`}
                                  onClick={() => window.location.hash = chapter.hash}
                                  className="flex items-center gap-2 px-3 py-1.5 bg-t-accent text-t-bg rounded-full text-[9px] font-black uppercase tracking-wider hover:scale-105 transition-transform"
                                >
                                  <span>🚀</span> Go to Chapter {num}
                                </button>
                              );
                            })}
                            
                            {/* External Link Buttons */}
                            {Array.from(m.text.matchAll(/\[OPEN_LINK: ([^\]]+)\]/g)).map((match, idx) => {
                              const name = match[1];
                              let url = '';
                              let icon = '🔗';
                              
                              const lowerName = name.toLowerCase();
                              if (lowerName.includes('linkedin')) { url = LINKEDIN_URL; icon = '👤'; }
                              else if (lowerName.includes('github')) { url = GITHUB_URL; icon = '🐙'; }
                              else if (lowerName.includes('resume')) { 
                                url = '#04-journey'; // Map resume button specifically to Chapter 4 anchor
                                icon = '📄'; 
                              }
                              else if (lowerName.includes('contact')) { url = '#07-connection'; icon = '✉️'; }
                              else {
                                // Try to find a specific project repository URL
                                const project = PROJECTS_CONFIG.find(p => 
                                  p.title.toLowerCase() === lowerName || 
                                  p.id.toLowerCase() === lowerName.replace(/\s+/g, '-') ||
                                  lowerName.includes(p.title.toLowerCase())
                                );
                                if (project && project.repoUrl) {
                                  url = project.repoUrl;
                                  icon = '📁';
                                }
                              }

                              if (!url) return null;
                              return (
                                <a
                                  key={`link-${idx}`}
                                  href={url}
                                  target={url.startsWith('http') ? "_blank" : "_self"}
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-3 py-1.5 bg-t-bg/40 border border-t-accent/30 text-t-accent rounded-full text-[9px] font-black uppercase tracking-wider hover:bg-t-accent/10 transition-colors"
                                >
                                  <span>{icon}</span> {url.includes('github.com') ? 'Source Code' : name}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
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
                      onClick={() => handleSend(s.query, (s as any).key)}
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
