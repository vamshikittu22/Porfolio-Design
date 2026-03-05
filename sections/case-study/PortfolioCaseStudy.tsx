import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '../../components/ui/GlassUI';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { CASE_STUDY_DATA } from './CaseStudyData';
import { CaseStudyChapterView } from './CaseStudyChapterView';
import { CaseStudyNav } from './CaseStudyNav';

interface PortfolioCaseStudyProps {
  onBack: () => void;
}

/** Hex color map for chapter accents */
const HEX_MAP: Record<string, string> = {
  indigo: '#6366f1', emerald: '#10b981', rose: '#f43f5e',
  amber: '#f59e0b', purple: '#a855f7', cyan: '#06b2d2',
};

const PortfolioCaseStudy: React.FC<PortfolioCaseStudyProps> = ({ onBack }) => {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapterId(entry.target.id.replace('chapter-', ''));
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20% 0px -60% 0px' }
    );

    CASE_STUDY_DATA.forEach((chapter) => {
      const el = document.getElementById(`chapter-${chapter.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(`chapter-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative pt-32 pb-64 min-h-screen">
      {/* ─── Scroll progress bar ─── */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[500] bg-t-border/20">
        <motion.div
          className="h-full bg-t-accent"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.05 }}
        />
      </div>

      {/* Fixed Vertical Navigation */}
      <CaseStudyNav
        chapters={CASE_STUDY_DATA}
        activeId={activeChapterId}
        onNavigate={handleNavigate}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <section id="blueprint-header" className="space-y-16 mb-16">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-[2.5px] bg-t-accent" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[1em] text-t-accent">Technical Architecture Specification</span>
            </div>
            <h1 className="text-7xl lg:text-[11rem] font-black font-display text-t-fg uppercase tracking-tighter leading-[0.75]">Engineering <br /> Blueprint.</h1>
            <p className="text-xl lg:text-3xl text-t-fg-m font-medium font-sans leading-tight tracking-tight max-w-4xl text-balance">
              This portfolio is not just a website; it is a full-stack, <span className="text-t-accent font-black">AI-Native Application</span> designed to demonstrate production-grade architecture, performance optimization, and complex state management.
            </p>
          </div>
        </section>

        {/* ─── CHAPTER INDEX / QUICK NAV ─── */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[8px] font-mono font-bold uppercase tracking-[0.35em] text-t-fg-m/40">
              {CASE_STUDY_DATA.length} Modules
            </span>
            <div className="h-px flex-1 bg-t-border/30" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CASE_STUDY_DATA.map((chapter, idx) => {
              const hex = HEX_MAP[chapter.color] || '#6366f1';
              const isActive = activeChapterId === chapter.id;
              return (
                <motion.button
                  key={chapter.id}
                  onClick={() => handleNavigate(chapter.id)}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative text-left p-5 rounded-2xl border transition-all duration-300 outline-none cursor-pointer"
                  style={{
                    borderColor: isActive ? hex : 'var(--color-border-subtle)',
                    backgroundColor: isActive ? `${hex}0D` : 'transparent',
                  }}
                >
                  {/* Index number */}
                  <span
                    className="text-sm font-mono font-black uppercase tracking-[0.2em] block mb-2 transition-colors duration-300"
                    style={{ color: isActive ? hex : 'var(--color-fg-muted)' }}
                  >
                    0{idx + 1}
                  </span>
                  {/* Title */}
                  <span className="text-sm font-black uppercase tracking-tight text-t-fg leading-tight block group-hover:text-t-accent transition-colors duration-300">
                    {chapter.title}
                  </span>
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="toc-dot"
                      className="absolute top-3 right-3 w-2 h-2 rounded-full"
                      style={{ backgroundColor: hex }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* CHAPTERS */}
        <div className="space-y-0">
          {CASE_STUDY_DATA.map((chapter, idx) => (
            <div key={chapter.id} id={`chapter-${chapter.id}`} className="scroll-mt-32">
              <ScrollReveal>
                <CaseStudyChapterView chapter={chapter} index={idx} />
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* FOOTER CTA */}
        <section id="blueprint-footer" className="flex flex-col items-center py-48 text-center space-y-12">
          <div className="w-px h-24 bg-t-accent/30" />
          <h2 className="text-5xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.8]">Ready for <br /> Digital Deployment?</h2>
          <GlassButton primary accent="theme" onClick={onBack} className="!px-16 !py-6 !text-[12px] shadow-2xl">
            Return to Portfolio Interface
          </GlassButton>
        </section>
      </div>
    </div>
  );
};

export default PortfolioCaseStudy;