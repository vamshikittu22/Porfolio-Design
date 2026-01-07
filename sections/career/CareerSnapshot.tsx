
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassUI';
import { EXPERIENCE, EDUCATION, ResumeItem } from '../../config/constants';
import { ScrollReveal } from '../../components/ui/ScrollReveal';

interface CareerItem extends ResumeItem {
  id: string;
  type: 'work' | 'education';
  year: string;
}

const CareerSnapshot: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // --- DATA PROCESSING ---
  const combinedData = useMemo(() => {
    const combined: CareerItem[] = [
      ...EXPERIENCE.map((item, idx) => {
        const years = item.period.match(/\d{4}/g);
        const yearStr = years ? years[0] : '2025';
        return { 
          ...item, 
          id: `work-${idx}`,
          type: 'work' as const, 
          year: yearStr,
        };
      }),
      ...EDUCATION.map((item, idx) => {
        const years = item.period.match(/\d{4}/g);
        const yearStr = years ? years[0] : '2024';
        return { 
          ...item, 
          id: `edu-${idx}`,
          type: 'education' as const, 
          year: yearStr,
        };
      })
    ];

    // Sort descending by start year
    return combined.sort((a, b) => {
      const yearA = parseInt(a.period.match(/\d{4}/)?.[0] || '0');
      const yearB = parseInt(b.period.match(/\d{4}/)?.[0] || '0');
      return yearB - yearA;
    });
  }, []);

  // --- INTERNAL SCROLL TRACKING ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleInternalScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(containerCenter - itemCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    container.addEventListener('scroll', handleInternalScroll);
    handleInternalScroll();
    
    return () => container.removeEventListener('scroll', handleInternalScroll);
  }, [activeIndex]);

  const activeItem = combinedData[activeIndex];

  return (
    <section id="career-snapshot-section" className="mb-[20rem] scroll-mt-32 max-w-7xl mx-auto px-6">
      <ScrollReveal>
        <GlassCard className="p-8 lg:p-12 overflow-hidden bg-t-bg-el/60 border-t-accent/10" accent="theme">
          
          {/* 1) HEADER AREA */}
          <div className="flex flex-col gap-8 mb-12">
            <div>
              <h2 className="text-4xl lg:text-6xl font-black font-display text-t-fg uppercase tracking-tighter leading-none mb-3">
                Work & <br /> <span className="text-t-accent">Education.</span>
              </h2>
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-t-fg-m opacity-50">
                A timeline of my professional experience
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { val: "5+", label: "Years Exp", accent: "purple" },
                { val: "3", label: "Companies", accent: "orange" },
                { val: "2", label: "Degrees", accent: "indigo" },
                { val: "10+", label: "Tech Stack", accent: "emerald" }
              ].map((stat, i) => (
                <GlassCard key={i} className="p-4 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1" accent={stat.accent as any}>
                  <span className="text-2xl font-black text-t-accent mb-0.5">{stat.val}</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-t-fg-m opacity-60">{stat.label}</span>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* 2) VIEWPORT AREA */}
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-stretch h-[500px] lg:h-[600px] overflow-hidden border-t border-t-border/20 pt-8">
            
            {/* LEFT COLUMN: STICKY YEAR */}
            <div className="flex flex-col items-center justify-center text-center relative z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center gap-4"
                >
                  <h3 className="text-7xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">
                    {activeItem.year}
                  </h3>
                  <div className={`
                    px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border
                    ${activeItem.type === 'work' 
                      ? 'bg-purple-500/10 text-purple-500 border-purple-500/30' 
                      : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30'}
                  `}>
                    {activeItem.type === 'work' ? 'Experience' : 'Academic'}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-12 w-px bg-gradient-to-t from-t-accent/40 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 h-12 w-px bg-gradient-to-b from-t-accent/40 to-transparent" />
            </div>

            {/* RIGHT COLUMN: SCROLLABLE LIST */}
            <div 
              ref={scrollContainerRef}
              className="w-full overflow-y-auto pr-4 scrollbar-hide space-y-8 snap-y snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="h-[200px] flex-shrink-0" />
              
              {combinedData.map((item, idx) => {
                const isActive = activeIndex === idx;
                
                return (
                  <div 
                    key={item.id} 
                    ref={el => itemRefs.current[idx] = el}
                    className="snap-center py-4"
                  >
                    <motion.div
                      animate={{ 
                        scale: isActive ? 1 : 0.9,
                        opacity: isActive ? 1 : 0.3,
                        filter: isActive ? 'blur(0px)' : 'blur(1px)'
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <GlassCard 
                        className={`
                          p-8 lg:p-10 border-l-8 transition-all duration-500
                          ${item.type === 'work' ? 'border-l-purple-500 bg-purple-500/[0.03]' : 'border-l-indigo-500 bg-indigo-500/[0.03]'}
                          ${isActive ? 'shadow-xl ring-1 ring-white/5' : ''}
                        `}
                      >
                        <div className="flex flex-col gap-6">
                          <div className="flex justify-between items-start">
                             <span className="text-[10px] font-bold text-t-accent-2 tracking-tight">{item.period}</span>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="text-2xl lg:text-3xl font-black text-t-fg uppercase tracking-tighter leading-tight">
                              {item.title}
                            </h4>
                            <p className="text-sm font-bold text-t-fg opacity-80 uppercase tracking-wide">
                              {item.subtitle}
                            </p>
                            <p className="text-[9px] font-black text-t-fg-m opacity-40 uppercase tracking-widest">
                              {item.location}
                            </p>
                          </div>

                          <div className="h-px w-full bg-t-border/20" />

                          <ul className="space-y-3">
                            {item.description.slice(0, 3).map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-3 items-start">
                                <div className="w-1 h-1 rounded-full bg-t-accent mt-1.5 flex-shrink-0" />
                                <p className="text-xs lg:text-sm font-medium text-t-fg-m leading-relaxed italic">
                                  {bullet}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </GlassCard>
                    </motion.div>
                  </div>
                );
              })}
              
              <div className="h-[200px] flex-shrink-0" />
            </div>
          </div>

          <div className="absolute top-1/2 left-0 w-48 h-48 bg-t-accent/5 blur-[100px] rounded-full pointer-events-none" />
        </GlassCard>
      </ScrollReveal>
    </section>
  );
};

export default CareerSnapshot;
