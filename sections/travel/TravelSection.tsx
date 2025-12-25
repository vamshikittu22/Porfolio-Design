import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { BLOG_POSTS } from '../../constants';
import TravelStoryItem from './TravelStoryItem';

const VIBRANT_ACCENTS: ('indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange')[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];

export const TravelSection: React.FC = () => {
  return (
    <section id="travel-section" className="mb-[40rem] scroll-mt-32 overflow-hidden rounded-[120px] bg-t-bg-el/40 border border-t-border print:hidden">
      <ScrollReveal className="flex flex-col items-center py-64 text-center space-y-12 bg-t-accent-s/5 border-b border-t-border">
         <div className="px-16 py-6 rounded-full bg-t-accent-2 text-t-bg font-black uppercase tracking-[2em] text-[9px] shadow-lg">Personal Adventures</div>
         <div className="space-y-10 px-6">
           <h2 className="text-8xl lg:text-[12rem] font-black text-t-fg uppercase tracking-tighter leading-none text-center">Life in <br /> Perspective.</h2>
           <p className="max-w-3xl mx-auto px-6 text-[7px] lg:text-[9px] font-black text-t-fg-m uppercase tracking-[0.3em] leading-relaxed opacity-60">
             Long-form travel stories and AI-generated visuals that inspired my Wanderlust Trails platform — 
             built from a genuine love for traveling and storytelling.
           </p>
         </div>
      </ScrollReveal>
      <div className="relative">
         <div className="space-y-0">
           {BLOG_POSTS.map((post, i) => {
             let accent: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange' = 'indigo';
             if (post.id === 'rishikesh-story') accent = 'purple';
             else if (post.id === 'coorg-story') accent = 'emerald';
             else accent = VIBRANT_ACCENTS[(i + 3) % VIBRANT_ACCENTS.length];
             return <TravelStoryItem key={post.id} post={post} index={i} accent={accent} />;
           })}
         </div>
      </div>
    </section>
  );
};

export default TravelSection;