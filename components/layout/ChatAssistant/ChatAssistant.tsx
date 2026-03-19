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
      '08-architecture': [
        { label: "System Design", query: "How is this portfolio built?" },
        { label: "Performance", query: "What makes this site so fast?" },
        { label: "Tech stack", query: "What technologies power this architecture?" },
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
          relative w-16 h-16 rounded-[24px] bg-t-bg-el/90 backdrop-blur-2xl border flex items-center justify-center shadow-xl transition-all duration-500
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
            className="fixed inset-0 md:inset-auto md:bottom-28 md:right-0 w-full md:w-[380px] h-full md:h-[580px] max-h-screen md:max-h-[75vh] z-[210] p-4"
          >
            <GlassCard className="w-full h-full flex flex-col overflow-hidden border-t-accent/30 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] !rounded-[40px] bg-t-bg-el/98 backdrop-blur-3xl" accent="theme">
              {/* Header - Architectural Swiss Style */}
              <div className="p-6 border-b border-t-border flex items-center justify-between bg-t-bg-el/40 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="w-12 h-12 rounded-xl bg-t-accent/10 flex items-center justify-center text-t-accent shadow-inner border border-t-accent/20 transition-all group-hover:bg-t-accent/20">
                      <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.456-2.455L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.455z" />
                      </svg>
                    </div>
                    {/* Glowing status */}
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-t-bg-el flex items-center justify-center border border-t-border">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-black uppercase tracking-[0.3em] text-t-fg font-['Archivo'] leading-none">VAMSHI AI</h3>
                    <div className="flex items-center gap-2 mt-1.5 opacity-50">
                      <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-[0.2em] font-['Space_Grotesk']">
                        {currentChapter
                          ? `Context: ${getChapterById(currentChapter)?.title || 'Neural Logic'}`
                          : 'Online'
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
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
              >
                {/* Visual Menu (Always accessible when no active follow-ups or no messages) */}
                {(!activeCategory || messages.length === 0) && (
                  <div className="space-y-6 mb-8">
                    {messages.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-t-bg-el/40 border border-t-border p-6 rounded-[28px] rounded-tl-none relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-t-accent/5 rounded-full -mr-12 -mt-12 blur-2xl" />
                        <p className="text-xs font-medium text-t-fg-m leading-relaxed italic relative z-10 font-['Space_Grotesk']">
                          Neural connection established. I am Vamshi's digital twin. How shall we begin?
                        </p>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Summary", query: "Summarize Vamshi's profile for a recruiter.", icon: "󱐋", key: 'summary' },
                        { label: "Skills", query: "What are Vamshi's core technical strengths?", icon: "󱓞", key: 'skills' },
                        { label: "Experience", query: "Tell me about his experience at CVS Health and Citadel.", icon: "󱇬", key: 'career' },
                        { label: "Projects", query: "Tell me about your top 3 software projects.", icon: "󱐉", key: 'projects' }
                      ].map((item, idx) => {
                        const icons = {
                          summary: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />,
                          skills: <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />,
                          career: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H4.875a2.25 2.25 0 00-2.25 2.25m16.5 0V5.25A2.25 2.25 0 0018 3H6a2.25 2.25 0 00-2.25 2.25v8.9m11.25-4.5h.008v.008h-.008V7.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
                          projects: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8a3.501 3.501 0 001.07-6.864 1.5 1.5 0 01.12-2.749 6 6 0 017.203 7.828c.379.053.758.109 1.136.168a3.94 3.94 0 013.298 3.344 3.94 3.94 0 01-2.023 3.654 3.94 3.94 0 01-4.966-7.961z" />
                        };
                        return (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 + 0.2 }}
                            onClick={() => handleSend(item.query, item.key)}
                            className={`flex flex-col items-start p-5 rounded-[24px] transition-all group border text-left relative overflow-hidden
                              ${activeCategory === item.key 
                                ? 'bg-t-accent/10 border-t-accent shadow-lg scale-[1.02]' 
                                : 'bg-t-bg-el border-t-border hover:border-t-accent/40 hover:bg-t-accent/5'
                              }
                            `}
                          >
                            <svg className="w-5 h-5 mb-3 transition-transform group-hover:-translate-y-1 text-t-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                              {icons[item.key as keyof typeof icons]}
                            </svg>
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] font-['Archivo'] leading-tight transition-colors ${activeCategory === item.key ? 'text-t-accent' : 'text-t-fg-m'}`}>{item.label}</span>
                            {activeCategory !== item.key && (
                              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4 text-t-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                                </svg>
                              </div>
                            )}
                          </motion.button>
                        );
                      })}
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
                    <div className={`max-w-[88%] p-4 rounded-[20px] text-xs leading-relaxed shadow-sm
                      ${m.role === 'user'
                        ? 'bg-t-accent text-t-bg rounded-tr-none font-bold'
                        : 'bg-t-bg-el border border-t-border text-t-fg rounded-tl-none font-medium'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="text-xs font-medium leading-relaxed font-['Space_Grotesk']">
                          {m.text.split(/(\[GO_CHAPTER: \d+\]|\[OPEN_LINK: [^\]]+\]|https?:\/\/[^\s]+)/g).map((part, index) => {
                            if (part.match(/^https?:\/\//)) {
                              return (
                                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-t-accent underline decoration-t-accent/30 underline-offset-4 hover:decoration-t-accent transition-all break-all">
                                  {part}
                                </a>
                              );
                            }
                            if (part.startsWith('[GO_CHAPTER:') || part.startsWith('[OPEN_LINK:')) {
                              return null;
                            }
                            return part;
                          })}
                        </div>

                        {(m.text.includes('[GO_CHAPTER:') || m.text.includes('[OPEN_LINK:') || /Chapter \d+/i.test(m.text)) && (
                          <div className="flex flex-wrap gap-2 pt-1 border-t border-t-border/10">
                            {/* Chapter Navigation Buttons - Regex Match + Fail-safe for "Chapter X" mentions */}
                            {(() => {
                              const tags = Array.from(m.text.matchAll(/\[GO_CHAPTER:\s*(\d+)\]/gi));
                              const seenChapters = new Set(tags.map(match => parseInt(match[1])));
                              
                              // Fail-safe: Find mentions of "Chapter 4", "Chapter 3", etc. if not already tagged
                              const textMentions = Array.from(m.text.matchAll(/Chapter\s*(\d+)/gi));
                              textMentions.forEach(match => {
                                const num = parseInt(match[1]);
                                if (num >= 1 && num <= 7 && !seenChapters.has(num)) {
                                  tags.push([`[GO_CHAPTER: ${num}]`, num.toString()] as any);
                                  seenChapters.add(num);
                                }
                              });

                              return tags.map((match, idx) => {
                                const num = parseInt(match[1]);
                                const chapter = CHAPTERS.find(c => c.number === num);
                                if (!chapter) return null;
                                return (
                                  <button
                                    key={`chap-${idx}`}
                                    onClick={() => window.location.hash = chapter.hash}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-t-accent text-t-bg rounded-full text-[9px] font-black uppercase tracking-[0.15em] font-['Archivo'] hover:scale-105 transition-all shadow-lg active:scale-95 border-b-2 border-t-bg/50"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8a3.501 3.501 0 001.07-6.864 1.5 1.5 0 01.12-2.749 6 6 0 017.203 7.828c.379.053.758.109 1.136.168a3.94 3.94 0 013.298 3.344 3.94 3.94 0 01-2.023 3.654 3.94 3.94 0 01-4.966-7.961z" />
                                    </svg>
                                    Jump to {chapter.title}
                                  </button>
                                );
                              });
                            })()}
                            
                            {/* Link Buttons - Robust Regex + De-duplication */}
                            {(() => {
                              const linkTags = Array.from(m.text.matchAll(/\[OPEN_LINK:\s*([^\]]+)\]/gi));
                              const seenUrls = new Set<string>();
                              
                              return linkTags.map((match, idx) => {
                                const name = match[1].trim();
                                let url = '';
                                let icon = '🔗';
                                const lowerName = name.toLowerCase();
                                
                                if (lowerName.includes('linkedin')) { url = LINKEDIN_URL; icon = '👤'; }
                                else if (lowerName.includes('github')) { url = GITHUB_URL; icon = '🐙'; }
                                else if (lowerName.includes('resume')) { url = '#04-journey'; icon = '📄'; }
                                else if (lowerName.includes('contact')) { url = '#07-connection'; icon = '✉️'; }
                                else {
                                  const project = PROJECTS_CONFIG.find(p => 
                                    p.title.toLowerCase() === lowerName || 
                                    p.id.toLowerCase() === lowerName.replace(/\s+/g, '-') ||
                                    lowerName.includes(p.title.toLowerCase())
                                  );
                                  if (project && project.repoUrl) { url = project.repoUrl; icon = '📁'; }
                                }

                                if (!url || seenUrls.has(url)) return null;
                                seenUrls.add(url);

                                return (
                                  <a
                                    key={`link-${idx}`}
                                    href={url}
                                    target={url.startsWith('http') ? "_blank" : "_self"}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-1.5 bg-t-bg-el border border-t-accent/40 text-t-fg-m rounded-full text-[9px] font-black uppercase tracking-[0.15em] font-['Archivo'] hover:bg-t-accent/10 hover:border-t-accent hover:text-t-accent transition-all shadow-sm active:scale-95"
                                  >
                                    <span className="text-sm leading-none translate-y-[0.5px]">{icon}</span> {url.includes('github.com') ? `Code: ${name}` : name}
                                  </a>
                                );
                              });
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-t-bg-el border border-t-border px-4 py-3 rounded-[20px] rounded-tl-none flex gap-1.5">
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
              <div className="p-6 bg-t-bg-el/60 border-t border-t-border space-y-5">
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ y: -2, borderColor: 'var(--color-accent)', backgroundColor: 'rgba(var(--color-accent-rgb), 0.05)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(s.query, (s as any).key)}
                      className="px-4 py-2 bg-t-bg border border-t-border rounded-xl text-[8px] font-black uppercase tracking-[0.2em] text-t-fg-m font-['Archivo'] hover:text-t-accent transition-all shadow-sm"
                    >
                      {s.label}
                    </motion.button>
                  ))}
                </div>

                <div className="relative flex items-center gap-2.5">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Neural prompt..."
                    className="w-full bg-t-bg border border-t-border rounded-xl px-5 py-3.5 text-xs font-medium font-['Space_Grotesk'] focus:ring-4 focus:ring-t-accent/5 focus:border-t-accent outline-none transition-all placeholder:text-t-fg/20 shadow-inner"
                  />
                  <motion.button
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-t-accent text-t-bg flex items-center justify-center flex-shrink-0 disabled:opacity-30 transition-all shadow-xl border-b-4 border-t-bg/40 active:border-b-0"
                    aria-label="Submit query"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 12h14" />
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
