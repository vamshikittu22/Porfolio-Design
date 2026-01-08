
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, BubbleTag } from '../../components/ui/GlassUI';
import { CaseStudyChapter } from './types';
import { PerformanceMetrics } from './PerformanceMetrics';
import { ParallaxPhysics } from './ParallaxPhysics';
import { DataPipeline } from './DataPipeline';
import { MinimaxLogic } from './MinimaxLogic';
import { ContextInjection } from './ContextInjection';

interface ChapterViewProps {
  chapter: CaseStudyChapter;
  index: number;
}

export const CaseStudyChapterView: React.FC<ChapterViewProps> = ({ chapter, index }) => {
  const [activeCode, setActiveCode] = useState(false);
  const isEven = index % 2 === 0;

  const renderVisuals = () => {
    switch(chapter.id) {
      case 'system-architecture': return <PerformanceMetrics />;
      case 'hero-kernel': return <ParallaxPhysics />;
      case 'github-intelligence': return <DataPipeline />;
      case 'game-engine': return <MinimaxLogic />;
      case 'neural-chat': return <ContextInjection />;
      default: return null;
    }
  };

  return (
    <div className="py-24 lg:py-32 border-b border-t-border last:border-0 relative overflow-hidden">
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1/2 h-full bg-${chapter.color}-500/5 blur-[120px] pointer-events-none`} />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 relative z-10">
        <div className={`space-y-12 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className={`text-[10px] font-black uppercase tracking-[0.6em] text-${chapter.color}-500`}>Module 0{index + 1}</span>
              <div className={`h-px w-12 bg-${chapter.color}-500/30`} />
            </div>
            <h3 className="text-5xl lg:text-7xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">{chapter.title}.</h3>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-t-fg-m opacity-60">{chapter.subtitle}</p>
          </div>

          <div className="prose-lg text-t-fg-m leading-relaxed font-medium space-y-6">
            <p className="pl-6 border-l-2 border-t-accent/20">{chapter.content.purpose}</p>
            <p className="text-base opacity-80">{chapter.content.visualDescription}</p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Core Logic</h4>
            <div className="p-6 rounded-2xl bg-t-bg-el border border-t-border shadow-inner">
              <p className="text-sm font-mono text-t-accent-2 leading-relaxed whitespace-pre-wrap">{chapter.content.coreLogic}</p>
            </div>
          </div>

          {renderVisuals()}

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Engineering Challenges</h4>
            <div className="grid gap-4">
              {chapter.content.challenges.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-t-bg/50 border border-t-border hover:border-t-accent/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-t-fg">{c.problem}</span>
                  </div>
                  <p className="text-xs text-t-fg-m mb-1 pl-4">{c.solution}</p>
                  <p className="text-[9px] font-bold text-emerald-500 pl-4 uppercase">{c.outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`space-y-12 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <GlassCard accent={chapter.color} className="p-8 lg:p-12 space-y-12 shadow-2xl">
            <div className="text-[8px] font-mono opacity-30 uppercase tracking-widest">{chapter.visualId} // Architecture</div>
            <div className="flex flex-wrap gap-2">
              {chapter.content.techStack.map((t) => (
                <BubbleTag key={t.name} accent={chapter.color} className="!text-[8px]">{t.name}</BubbleTag>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {chapter.content.metrics.map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-t-bg-el/30 border border-t-border text-center">
                  <div className="text-xl font-black text-t-fg">{m.value}</div>
                  <div className="text-[7px] font-black uppercase opacity-50">{m.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="relative">
            <button onClick={() => setActiveCode(!activeCode)} className={`w-full p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between group ${activeCode ? 'bg-t-bg-el border-t-accent' : 'bg-t-bg/20 border-t-border hover:border-t-accent/30'}`}>
              <div className="flex items-center gap-4 text-left">
                <span className="text-[9px] font-black uppercase tracking-widest text-t-fg block">Code Snippet</span>
                <span className="text-xs font-bold text-t-fg-m opacity-60">{chapter.content.code.title}</span>
              </div>
              <span className={`text-xl transition-transform ${activeCode ? 'rotate-180' : ''}`}>↓</span>
            </button>
            <AnimatePresence>
              {activeCode && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 overflow-hidden">
                  <div className="p-6 rounded-2xl bg-[#0d1117] border border-white/10 text-gray-300 font-mono text-xs overflow-x-auto">
                    <pre>{chapter.content.code.code}</pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
