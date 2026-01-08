
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, BubbleTag } from '../../components/ui/GlassUI';
import { CaseStudyChapter } from './types';
import { ProductionDeploymentArchitecture } from './ProductionDeploymentArchitecture';
import { QualityAssuranceFramework } from './QualityAssuranceFramework';
import { ContextInjectionPipeline } from './ContextInjectionPipeline';
import { MinimaxDecisionTree } from './MinimaxDecisionTree';
import { DataPipelineArchitecture } from './DataPipelineArchitecture';
import { InteractionStateMachine } from './InteractionStateMachine';
import { PerformanceMetricsDashboard } from './PerformanceMetricsDashboard';
import { ParallaxPhysicsBreakdown } from './ParallaxPhysicsBreakdown';
import { SecurityImplementation } from './SecurityImplementation';
import { EvolutionComparison } from './EvolutionComparison';
import { CodePlayground } from '../../components/ui/CodePlayground';

interface CaseStudyChapterViewProps {
  chapter: CaseStudyChapter;
  index: number;
}

export const CaseStudyChapterView: React.FC<CaseStudyChapterViewProps> = ({ chapter, index }) => {
  const [activeCode, setActiveCode] = useState(false);
  const isEven = index % 2 === 0;

  // Map tailwind color names to hex codes for the comparison component
  const accentHexMap: Record<string, string> = {
    indigo: '#6366f1',
    emerald: '#10b981',
    rose: '#f43f5e',
    amber: '#f59e0b',
    purple: '#a855f7',
    cyan: '#06b2d2',
  };

  const currentAccentHex = accentHexMap[chapter.color] || '#6366f1';

  const renderVisuals = () => {
    switch (chapter.id) {
      case 'system-architecture':
        return <PerformanceMetricsDashboard />;
      case 'hero-kernel':
        return (
          <div className="space-y-12">
            <ParallaxPhysicsBreakdown />
            <EvolutionComparison type="hero" accentColor={currentAccentHex} />
          </div>
        );
      case 'skills-matrix':
        return (
          <div className="space-y-12">
            <InteractionStateMachine />
            <EvolutionComparison type="skills" accentColor={currentAccentHex} />
          </div>
        );
      case 'github-intelligence':
        return (
          <div className="space-y-12">
            <DataPipelineArchitecture />
            <EvolutionComparison type="github" accentColor={currentAccentHex} />
          </div>
        );
      case 'game-engine':
        return <MinimaxDecisionTree />;
      case 'neural-chat':
        return (
          <div className="space-y-12">
            <ContextInjectionPipeline />
            <EvolutionComparison type="chat" accentColor={currentAccentHex} />
          </div>
        );
      case 'qa-framework':
        return <QualityAssuranceFramework />;
      case 'security-implementation':
        return <SecurityImplementation />;
      case 'production-deployment':
        return <ProductionDeploymentArchitecture />;
      default:
        return null;
    }
  };

  return (
    <div className="py-24 lg:py-32 border-b border-t-border last:border-0 relative overflow-hidden">
      {/* Background Ambience */}
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-1/2 h-full bg-${chapter.color}-500/5 blur-[120px] pointer-events-none`} />

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 relative z-10">
        
        {/* LEFT COLUMN: Narrative & Logic */}
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
            <p className="text base opacity-80">{chapter.content.visualDescription}</p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Core Logic</h4>
            <div className="p-6 rounded-2xl bg-t-bg-el border border-t-border shadow-inner">
              <p className="text-sm font-mono text-t-accent-2 leading-relaxed whitespace-pre-wrap">{chapter.content.coreLogic}</p>
            </div>
          </div>

          {/* Render Sub-component Visuals */}
          {renderVisuals()}

          {/* CHALLENGES */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Engineering Challenges</h4>
            <div className="grid gap-4">
              {chapter.content.challenges.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl bg-t-bg/50 border border-t-border hover:border-t-accent/30 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-t-fg">{c.problem}</span>
                  </div>
                  <p className="text-xs text-t-fg-m mb-3 pl-4 border-l border-t-border/50">{c.solution}</p>
                  <div className="flex items-center gap-2 pl-4">
                    <div className="w-1 h-1 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">{c.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visuals, Stack, Code */}
        <div className={`space-y-12 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          
          {/* Visual Architecture Block */}
          <GlassCard accent={chapter.color} className="relative overflow-hidden group min-h-[300px] flex flex-col">
            <div className="absolute top-4 right-4 text-[8px] font-mono opacity-30 uppercase tracking-widest">
              {chapter.visualId} // Architecture
            </div>
            
            <div className="flex-1 p-8 flex items-center justify-center bg-black/5 dark:bg-black/20">
              <pre className="text-[8px] lg:text-[10px] font-mono text-t-fg/70 leading-tight whitespace-pre select-none pointer-events-none">
                {chapter.content.architecture}
              </pre>
            </div>

            <div className="p-6 border-t border-t-border bg-t-bg-el/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-t-fg-m">Technology Stack</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {chapter.content.techStack.map((t) => (
                  <div key={t.name} className="group/tech relative cursor-help">
                    <BubbleTag accent={chapter.color} className="!text-[8px] !px-3 !py-1">{t.name}</BubbleTag>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-t-bg-el border border-t-border shadow-xl opacity-0 group-hover/tech:opacity-100 transition-opacity pointer-events-none z-50 text-center">
                      <p className="text-9px text-t-fg font-medium leading-tight">{t.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            {chapter.content.metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-t-bg-el/30 border border-t-border flex flex-col items-center justify-center text-center">
                <span className="text-xl lg:text-2xl font-black text-t-fg mb-1">{m.value}</span>
                <span className="text-[7px] font-black uppercase tracking-widest text-t-fg-m opacity-50">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Code Snippet Toggle */}
          <div className="relative">
            <button 
              onClick={() => setActiveCode(!activeCode)}
              className={`w-full p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between group
                ${activeCode ? 'bg-t-bg-el border-t-accent' : 'bg-t-bg/20 border-t-border hover:border-t-accent/30'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-t-fg/5 flex items-center justify-center text-t-fg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-t-fg block mb-0.5">Interactive Source</span>
                  <span className="text-xs font-bold text-t-fg-m opacity-60 group-hover:opacity-100 transition-opacity">{chapter.content.code.title}</span>
                </div>
              </div>
              <span className={`text-xl transition-transform duration-500 ${activeCode ? 'rotate-180' : ''}`}>↓</span>
            </button>

            <AnimatePresence>
              {activeCode && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <CodePlayground 
                    code={chapter.content.code.code}
                    lang={chapter.content.code.lang}
                    filename={chapter.content.code.filename}
                    highlightLines={chapter.content.code.highlightLines}
                    sandboxUrl={chapter.content.code.sandboxUrl}
                    accent={currentAccentHex}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
