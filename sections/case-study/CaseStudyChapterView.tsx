
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
import { InsightCard } from './InsightCard';
import { MobileDesignDecisions } from './MobileDesignDecisions';

interface CaseStudyChapterViewProps {
  chapter: CaseStudyChapter;
  index: number;
}

export const CaseStudyChapterView: React.FC<CaseStudyChapterViewProps> = ({ chapter, index }) => {
  const [activeCode, setActiveCode] = useState(false);
  const isEven = index % 2 === 0;

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
      case 'system-architecture': return <PerformanceMetricsDashboard />;
      case 'hero-kernel': return <div className="space-y-12"><ParallaxPhysicsBreakdown /><EvolutionComparison type="hero" accentColor={currentAccentHex} /></div>;
      case 'mobile-first-design': return <MobileDesignDecisions />;
      case 'skills-matrix': return <div className="space-y-12"><InteractionStateMachine /><EvolutionComparison type="skills" accentColor={currentAccentHex} /></div>;
      case 'github-intelligence': return <div className="space-y-12"><DataPipelineArchitecture /><EvolutionComparison type="github" accentColor={currentAccentHex} /></div>;
      case 'game-engine': return <MinimaxDecisionTree />;
      case 'neural-chat': return <div className="space-y-12"><ContextInjectionPipeline /><EvolutionComparison type="chat" accentColor={currentAccentHex} /></div>;
      case 'qa-framework': return <QualityAssuranceFramework />;
      case 'security-implementation': return <SecurityImplementation />;
      case 'production-deployment': return <ProductionDeploymentArchitecture />;
      default: return null;
    }
  };

  const getCoreLogicTitle = () => {
    switch (chapter.id) {
      case 'system-architecture': return 'How It Works: Scroll-Based Routing Without Full Page Reload';
      case 'hero-kernel': return 'Algorithm Breakdown: How 550 Keywords Get Generated & Animated';
      case 'mobile-first-design': return 'Strategy: Start with HTML, Add CSS, Layer JavaScript';
      case 'skills-matrix': return 'State Logic: How the Interactive Node Cluster Manages Displacement';
      case 'github-intelligence': return 'Smart Fetching: One GraphQL Query Instead of Three REST Calls';
      case 'game-engine': return 'The Algorithm: How the AI Thinks Ahead';
      case 'neural-chat': return 'How It Works: Resume Data → AI Context → Accurate Answers';
      case 'qa-framework': return 'The Testing Strategy: Preventing Bugs Before Production';
      default: return 'Architectural Core Logic';
    }
  };

  const getVisualStageLabel = () => {
    switch (chapter.id) {
      case 'system-architecture': return 'Performance Metrics Dashboard';
      case 'hero-kernel': return 'Performance Dashboard: Animation & Memory Usage';
      case 'mobile-first-design': return 'Network Performance Metrics';
      case 'skills-matrix': return 'Interaction Flow & Magnetic Displacement Map';
      case 'github-intelligence': return 'Data Source & Caching Strategy';
      case 'game-engine': return 'Algorithm Performance Dashboard';
      case 'neural-chat': return 'AI Model & Performance Metrics';
      case 'qa-framework': return 'Testing & Accessibility Metrics';
      case 'security-implementation': return 'Security Defense Layers';
      default: return `Visualization Stage // ${chapter.visualId}`;
    }
  };

  return (
    <div className="py-32 lg:py-48 border-b border-t-border last:border-0 relative overflow-visible">
      {/* Background Section Ambient Glow */}
      <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-2/3 h-full bg-${chapter.color}-500/[0.03] blur-[160px] pointer-events-none -z-10`} />

      <div className="max-w-6xl mx-auto">
        {/* CHAPTER HEADER - Full Width */}
        <div className="mb-24 space-y-6">
          <div className="flex items-center gap-6">
            <span className={`text-[10px] font-black uppercase tracking-[0.8em] text-${chapter.color}-500`}>{chapter.introLabel}</span>
            <div className={`h-px flex-1 bg-${chapter.color}-500/20`} />
          </div>
          <h3 className="text-6xl lg:text-9xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.8]">
            {chapter.title}.
          </h3>
          <p className="text-sm lg:text-base font-bold uppercase tracking-[0.4em] text-t-fg-m opacity-50">{chapter.subtitle}</p>
        </div>

        {/* CONTENT GRID - 12 Column Editorial System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 items-start">
          
          {/* NARRATIVE SECTION */}
          <div className="lg:col-span-7 space-y-12">
            <div className="prose-xl text-t-fg-m leading-relaxed font-medium space-y-8">
              <div className="text-2xl lg:text-3xl text-t-fg leading-tight border-l-4 pl-8" style={{ borderColor: currentAccentHex }}>
                {chapter.content.purpose}
              </div>
              <p className="text-lg opacity-70 italic">
                {chapter.content.visualDescription}
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">{getCoreLogicTitle()}</h4>
              <div className="p-8 rounded-[40px] bg-t-bg-el border border-t-border shadow-inner">
                <p className="text-sm font-mono text-t-accent-2 leading-relaxed whitespace-pre-wrap">{chapter.content.coreLogic}</p>
              </div>
            </div>
          </div>

          {/* ASIDE / INSIGHTS SECTION - Margin Callouts */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-t-fg-m opacity-30">Engineering Notes</span>
              <div className="h-px flex-1 bg-t-border/50" />
            </div>
            
            {chapter.content.insights?.map((insight, i) => (
              <InsightCard 
                key={i} 
                type={insight.type} 
                title={insight.title} 
                description={insight.description} 
                accent={chapter.color} 
              />
            ))}

            {/* Micro Metrics in margin */}
            <div className="grid grid-cols-1 gap-3 pt-6">
              {chapter.content.metrics.map((m, i) => (
                <div key={i} className="px-6 py-4 rounded-2xl bg-t-bg-el/30 border border-t-border flex justify-between items-center group hover:border-t-accent transition-all">
                  <span className="text-[8px] font-black uppercase tracking-widest text-t-fg-m opacity-50">{m.label}</span>
                  <span className="text-lg font-black text-t-fg">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LARGE VISUAL BREAK - Full Width Rendering Stage */}
          <div className="lg:col-span-12 py-16">
            <div className="relative group">
              <GlassCard accent={chapter.color} className="p-0 overflow-hidden shadow-2xl">
                 <div className="p-12 lg:p-24 bg-black/[0.01] dark:bg-black/20 flex flex-col justify-center min-h-[500px]">
                    <div className="mb-12 flex justify-between items-center">
                       <div className="flex flex-col gap-1">
                          <div className={`w-8 h-1 bg-${chapter.color}-500 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.5)]`} />
                          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">
                            {getVisualStageLabel()}
                          </span>
                       </div>
                       <div className="flex gap-2">
                         <div className="w-2.5 h-2.5 rounded-full bg-rose-500/20" />
                         <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
                         <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                       </div>
                    </div>
                    {renderVisuals()}
                 </div>
              </GlassCard>
            </div>
          </div>

          {/* TECHNOLOGICAL IMPLEMENTATION */}
          <div className="lg:col-span-12 pt-16 pb-24 space-y-12">
            <div className="flex items-center gap-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-t-fg opacity-40">Technological Implementation</h4>
              <div className="h-px flex-1 bg-t-border/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chapter.content.techStack.map((t, i) => (
                <motion.div 
                  key={t.name}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[40px] bg-t-bg-el border border-t-border shadow-sm hover:shadow-xl hover:border-t-accent/30 transition-all duration-500 group/techitem flex flex-col justify-between h-full"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className={`w-10 h-10 rounded-2xl bg-${chapter.color}-500/10 flex items-center justify-center text-${chapter.color}-500 group-hover/techitem:bg-${chapter.color}-500 group-hover/techitem:text-t-bg transition-colors duration-500`}>
                        <span className="text-[10px] font-black">0{i + 1}</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full bg-${chapter.color}-500/30 group-hover/techitem:animate-ping`} />
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="text-lg font-black text-t-fg uppercase tracking-tight">{t.name}</h5>
                      <p className="text-[11px] font-medium text-t-fg-m leading-relaxed opacity-70 italic group-hover/techitem:opacity-100 transition-opacity">
                        {t.reason}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-t-border/50 flex justify-between items-center">
                    <span className="text-[7px] font-black uppercase tracking-widest opacity-30 group-hover/techitem:opacity-100 transition-opacity">Module Spec</span>
                    <svg className={`w-3 h-3 text-${chapter.color}-500 opacity-0 group-hover/techitem:opacity-100 transition-all transform translate-x-[-10px] group-hover/techitem:translate-x-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CHALLENGES & SOURCE CODE */}
          <div className="lg:col-span-6 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Development Constraints</h4>
            <div className="grid gap-6">
              {chapter.content.challenges.map((c, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-t-bg-el/30 border border-t-border hover:border-t-accent/20 transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-t-fg">{c.problem}</span>
                  </div>
                  <p className="text-sm text-t-fg-m mb-6 pl-6 border-l-2 border-t-border/50 leading-relaxed italic">{c.solution}</p>
                  <div className="flex items-center gap-3 pl-6">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">Outcome: {c.outcome}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-t-fg opacity-40">Interactive Source</h4>
            <button 
              onClick={() => setActiveCode(!activeCode)}
              className={`w-full p-8 rounded-[32px] border transition-all duration-700 flex items-center justify-between group overflow-hidden relative
                ${activeCode ? 'bg-t-bg-el border-t-accent shadow-xl' : 'bg-t-bg-el/20 border-t-border hover:border-t-accent/40'}
              `}
            >
              <div className="flex items-center gap-6 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                  ${activeCode ? 'bg-t-accent text-t-bg' : 'bg-t-fg/5 text-t-fg'}
                `}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-t-fg block mb-1">
                    {chapter.id === 'system-architecture' ? 'Deep Dive: Module Hydration Pattern' : 'Logic Explorer'}
                  </span>
                  <span className="text-sm font-bold text-t-fg-m opacity-60">{chapter.content.code.title}</span>
                </div>
              </div>
              <div className={`text-2xl transition-all duration-700 ${activeCode ? 'rotate-180 translate-y-[-2px]' : 'translate-y-[2px]'}`}>↓</div>
            </button>

            <AnimatePresence>
              {activeCode && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
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
