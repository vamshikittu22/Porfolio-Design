
import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, BubbleTag } from '../../components/ui/GlassUI';
import { SKILLS_RESUME } from '../../config/constants';

export const AboutSection: React.FC = () => (
  <section id="about-section" className="py-40 grid lg:grid-cols-2 gap-20 items-start">
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-[9px] font-black uppercase tracking-[1em] text-t-accent">Context</h2>
        <h3 className="text-6xl font-black font-display uppercase tracking-tighter leading-none">Mapping the<br />Tech Stack.</h3>
      </div>
      <p className="text-xl text-t-fg-m leading-relaxed italic border-l-4 border-t-accent pl-8">
        "I specialize in architecting full-stack ecosystems using .NET and React, bridging the gap between performance and user experience."
      </p>
    </div>

    <GlassCard className="p-12 space-y-16">
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-t-accent opacity-60">Languages</h4>
          <div className="flex flex-wrap gap-2">
            {SKILLS_RESUME.languages.map(l => <BubbleTag key={l}>{l}</BubbleTag>)}
          </div>
        </div>
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-t-accent opacity-60">Frameworks</h4>
          <div className="flex flex-wrap gap-2">
            {SKILLS_RESUME.frameworks.map(f => <BubbleTag key={f}>{f}</BubbleTag>)}
          </div>
        </div>
      </div>
      <div className="pt-10 border-t border-t-border">
         <p className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-30">Charlotte, NC // STEM OPT Verified</p>
      </div>
    </GlassCard>
  </section>
);

export default AboutSection;
