import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { BubbleTag } from '../../components/ui/GlassUI';
import { SKILLS_RESUME } from '../../config/constants';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="mb-[40rem] scroll-mt-32 relative">
      <ScrollReveal className="grid lg:grid-cols-[1fr_1.5fr] gap-20 lg:gap-32 items-start">
        <div className="space-y-12">
          <div className="flex flex-col gap-4">
            <div className="h-px w-20 bg-t-accent" />
            <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent">About Me</span>
            <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">
              Professional <br /> Summary.
            </h2>
          </div>
          
          <div className="space-y-8 border-l-4 border-t-accent/20 pl-10 py-4">
            <p className="text-xl lg:text-2xl text-t-fg font-medium leading-relaxed italic">
              "I am a results-driven Software Engineer dedicated to architecting high-performance digital ecosystems that bridge the gap between enterprise-grade stability and fluid user experiences."
            </p>
            <p className="text-base lg:text-lg text-t-fg-m leading-relaxed opacity-90">
              With a foundation in Computer Science and a Master's in Information Systems, I specialize in full-stack development using C#, .NET, and React. My approach prioritizes clean architecture, scalability, and the strategic integration of Generative AI to solve complex business challenges. Currently, I am focused on building modular CRM and billing systems that empower enterprises through precision engineering.
            </p>
          </div>
        </div>

        <div className="bg-t-bg-el/40 rounded-[60px] p-10 lg:p-16 border border-t-border shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.05] transition-opacity">
            <span className="text-[12rem] font-black tracking-tighter uppercase leading-none">Stack</span>
          </div>

          <div className="relative z-10 space-y-16">
            <div className="flex justify-between items-end">
              <h3 className="text-[10px] font-black uppercase tracking-[1em] text-t-fg-m opacity-50">Technical Expertise</h3>
              <span className="text-[8px] font-mono text-t-accent uppercase">Open for Full-Time Roles</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-t-fg flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-t-accent" />
                  Programming Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_RESUME.languages.map(lang => (
                    <BubbleTag key={lang} accent="indigo" className="!px-4 !py-1.5 !text-[8px]">{lang}</BubbleTag>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-t-fg flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-t-accent-2" />
                  Frontend & System Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_RESUME.frameworks.map(fw => (
                    <BubbleTag key={fw} accent="emerald" className="!px-4 !py-1.5 !text-[8px]">{fw}</BubbleTag>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-t-fg flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Cloud & Infrastructure
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_RESUME.cloud_db.map(db => (
                    <BubbleTag key={db} accent="rose" className="!px-4 !py-1.5 !text-[8px]">{db}</BubbleTag>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-t-fg flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  AI & Productivity Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_RESUME.tools.map(tool => (
                    <BubbleTag key={tool} accent="amber" className="!px-4 !py-1.5 !text-[8px]">{tool}</BubbleTag>
                  ))}
                  <BubbleTag accent="purple" className="!px-4 !py-1.5 !text-[8px]">Gemini AI</BubbleTag>
                  <BubbleTag accent="purple" className="!px-4 !py-1.5 !text-[8px]">Prompt Engineering</BubbleTag>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;