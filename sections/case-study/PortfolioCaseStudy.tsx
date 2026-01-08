
import React, { useState, useEffect } from 'react';
import { GlassButton } from '../../components/ui/GlassUI';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { CASE_STUDY_DATA } from './CaseStudyData';
import { CaseStudyChapterView } from './CaseStudyChapterView';
import { CaseStudyNav } from './CaseStudyNav';

interface PortfolioCaseStudyProps {
  onBack: () => void;
}

const PortfolioCaseStudy: React.FC<PortfolioCaseStudyProps> = ({ onBack }) => {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

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

  const handleNavigate = (id: string) => {
    const element = document.getElementById(`chapter-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative pt-32 pb-64 min-h-screen">
      {/* Fixed Vertical Navigation */}
      <CaseStudyNav 
        chapters={CASE_STUDY_DATA} 
        activeId={activeChapterId} 
        onNavigate={handleNavigate} 
      />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <section id="blueprint-header" className="space-y-16 mb-32">
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-[2.5px] bg-t-accent" />
              <span className="text-[11px] font-black uppercase tracking-[1em] text-t-accent">Technical Architecture Specification</span>
            </div>
            <h1 className="text-7xl lg:text-[11rem] font-black font-display text-t-fg uppercase tracking-tighter leading-[0.75]">Engineering <br /> Blueprint.</h1>
            <p className="text-xl lg:text-3xl text-t-fg-m font-medium leading-tight tracking-tight max-w-4xl text-balance">
              This portfolio is not just a website; it is a full-stack, <span className="text-t-accent font-black">AI-Native Application</span> designed to demonstrate production-grade architecture, performance optimization, and complex state management.
            </p>
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
