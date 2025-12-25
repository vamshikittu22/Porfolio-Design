import React, { useState } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassButton } from '../../components/GlassUI';
import { FULL_NAME, EDUCATION, EXPERIENCE, AWARDS } from '../../constants';
import TimelineNode from './TimelineNode';
import SkillProgress from './SkillProgress';

const ResumeSection: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<string[]>(['exp-0']);
  const toggleId = (id: string) => {
    setExpandedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const skillsWithProgress = {
    languages: [
      { name: 'C# / .NET', p: 95 },
      { name: 'JavaScript / TypeScript', p: 92 },
      { name: 'Python', p: 85 },
      { name: 'PHP', p: 88 },
      { name: 'SQL', p: 90 },
    ],
    frameworks: [
      { name: 'React', p: 95 },
      { name: 'Node.js', p: 88 },
      { name: 'ASP.NET Core', p: 92 },
    ]
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="resume-section" className="mb-[20rem] scroll-mt-32 print:block print:m-0 print:p-0">
      <ScrollReveal className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-12">
        <div className="relative aspect-[21/9] rounded-[40px] border border-white/40 bg-white/30 dark:bg-white/5 backdrop-blur-3xl overflow-hidden p-10 lg:p-14 flex flex-col justify-end shadow-sm group">
            <div className="absolute top-10 right-10 flex gap-4 print:hidden">
              <GlassButton accent="theme" className="!px-6 !py-3 !text-[8px]" onClick={scrollToContact}>
                Contact Me
              </GlassButton>
              <GlassButton primary accent="theme" className="!px-6 !py-3 !text-[8px]" onClick={() => window.print()}>
                Download
              </GlassButton>
            </div>
            
            <div className="space-y-3">
              <p className="text-[9px] font-black uppercase tracking-[1em] text-t-accent opacity-80">Professional Credentials</p>
              <h2 className="text-7xl lg:text-[9rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none">Resume.</h2>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 border-t border-t-border/50 pt-4 max-w-4xl">
                <p className="text-[10px] lg:text-sm font-bold text-t-fg-m uppercase tracking-[0.3em] opacity-80">
                  Full‑stack Software Engineer · C# / .NET · React · AI‑driven systems
                </p>
              </div>
            </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-20 min-h-[600px] print:grid-cols-1">
          <aside className="space-y-16 sticky top-32 h-fit print:relative print:top-0">
            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">Identity.</h3>
                <div className="space-y-1">
                  <h4 className="text-3xl font-black text-t-fg uppercase tracking-tighter leading-none">{FULL_NAME}</h4>
                  <p className="text-[10px] font-bold text-t-fg-m uppercase tracking-[0.2em]">Engineer / Developer</p>
                </div>
              </div>

              <div className="space-y-12 pt-12 border-t border-t-border">
                <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">Matrix.</h3>
                <div className="space-y-8">
                   <div className="space-y-5">
                      <p className="text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] opacity-50">Languages</p>
                      <div className="space-y-4">
                        {skillsWithProgress.languages.map(s => <SkillProgress key={s.name} label={s.name} percentage={s.p} />)}
                      </div>
                   </div>
                   <div className="space-y-5">
                      <p className="text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] opacity-50">Frameworks</p>
                      <div className="space-y-4">
                        {skillsWithProgress.frameworks.map(s => <SkillProgress key={s.name} label={s.name} percentage={s.p} />)}
                      </div>
                   </div>
                </div>
              </div>

              <div className="space-y-10 pt-12 border-t border-t-border">
                <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">Recognition.</h3>
                <div className="space-y-8">
                  {AWARDS.map((award, idx) => (
                    <div key={idx} className="group/award space-y-2 p-6 border border-t-border rounded-2xl hover:border-t-accent transition-all bg-t-bg-el/20">
                      <p className="text-[8px] font-black text-t-accent uppercase tracking-widest">{award.period}</p>
                      <h4 className="text-lg font-black text-t-fg leading-tight uppercase tracking-tight group-hover/award:text-t-accent transition-colors">{award.title}</h4>
                      <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest opacity-60">{award.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <main className="space-y-20">
            <div className="space-y-8 border-b border-t-border pb-12">
               <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">01 // Profile Summary.</h3>
               <p className="text-xl lg:text-2xl font-medium text-t-fg leading-relaxed italic max-w-3xl">
                 "Architecting robust enterprise solutions with a focus on scalable design and intelligent automation. Committed to high-integrity engineering across the C# and React ecosystems."
               </p>
            </div>

            <div className="space-y-10">
              <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">02 // Experience.</h3>
              <div className="space-y-4">
                {EXPERIENCE.map((exp, idx) => (
                  <TimelineNode 
                    key={`exp-${idx}`} 
                    item={exp} 
                    index={idx} 
                    type="exp"
                    isExpanded={expandedIds.includes(`exp-${idx}`)} 
                    onToggle={() => toggleId(`exp-${idx}`)} 
                  />
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h3 className="text-t-accent font-black text-[10px] uppercase tracking-[1em] opacity-40">03 // Education.</h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, idx) => (
                  <TimelineNode 
                    key={`edu-${idx}`} 
                    item={edu} 
                    index={idx} 
                    type="edu"
                    isExpanded={expandedIds.includes(`edu-${idx}`)} 
                    onToggle={() => toggleId(`edu-${idx}`)} 
                  />
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-t-border flex justify-between items-center opacity-40">
               <div className="flex gap-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-t-accent" />
                 <p className="text-[8px] font-black text-t-fg uppercase tracking-widest">Document version 2.5</p>
               </div>
               <span className="text-[8px] font-black uppercase tracking-[0.5em] text-t-fg italic">Synchronized Portfolio Ledger</span>
            </div>
          </main>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ResumeSection;