import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { TicTacToe } from '../../components/TicTacToe';

export const GameSection: React.FC = () => {
  return (
    <section id="game-section" className="mb-[40rem] rounded-[120px] p-16 lg:p-48 bg-t-bg-el/40 border border-t-border print:hidden scroll-mt-32 relative overflow-hidden group">
       <div className="absolute inset-0 z-[-1] opacity-10 dark:opacity-20 transition-all duration-1000">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-t-accent-2/30 via-transparent to-transparent blur-[160px] scale-125" />
       </div>
       <div className="grid lg:grid-cols-2 gap-48 items-center relative z-10">
         <ScrollReveal className="space-y-16">
           <div className="flex items-center gap-4">
             <div className="w-10 h-[2px] bg-t-accent-2" />
             <span className="text-[10px] font-black uppercase tracking-[1em] text-t-accent-2">Interactive Simulation</span>
           </div>
           <h2 className="text-6xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.75]">Logic <br /> Design.</h2>
           <p className="text-t-fg-m font-medium max-w-lg text-2xl leading-relaxed text-balance">Demonstrating real-time decision-making logic through a classic strategic simulation environment.</p>
           <div className="pt-10 flex items-center gap-6 opacity-40">
             <div className="h-px flex-1 bg-t-border" />
             <span className="text-[8px] font-black uppercase tracking-widest text-t-fg">Decision Making Module</span>
           </div>
         </ScrollReveal>
         <ScrollReveal className="flex justify-center w-full relative group/island" delay={200}>
           <div className="absolute inset-[-40px] bg-t-accent-2/5 blur-[100px] rounded-full scale-0 group-hover/island:scale-100 transition-transform duration-1000 opacity-0 group-hover/island:opacity-100" />
           <div className="relative p-6 rounded-[64px] bg-white/20 dark:bg-white/5 border border-white/40 shadow-2xl backdrop-blur-3xl">
             <div className="mb-8 px-4 text-center">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-accent-2 mb-2">Playlab · Tic Tac Toe</h4>
               <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest leading-relaxed">
                 Tiny UI and game‑logic demo built with TypeScript state management,<br /> difficulty levels, and subtle animations.
               </p>
             </div>
             <TicTacToe />
           </div>
         </ScrollReveal>
       </div>
    </section>
  );
};

export default GameSection;