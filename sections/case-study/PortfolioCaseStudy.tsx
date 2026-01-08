
import React from 'react';
import { GlassButton } from '../../components/ui/GlassUI';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { CASE_STUDY_DATA } from './CaseStudyData';
import { CaseStudyChapterView } from './CaseStudyChapterView';

interface PortfolioCaseStudyProps {
  onBack: () => void;
}

const PortfolioCaseStudy: React.FC<PortfolioCaseStudyProps> = ({ onBack }) => {
  return (
    <div className="relative pt-32 pb-64 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <section className="space-y-16 mb-32">
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
            <ScrollReveal key={chapter.id}>
              <CaseStudyChapterView chapter={chapter} index={idx} />
            </ScrollReveal>
          ))}
        </div>

        {/* FOOTER CTA */}
        <section className="flex flex-col items-center py-48 text-center space-y-12">
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
