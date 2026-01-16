import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassUI';
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

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  accentColor: string;
  icon?: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  subtitle, 
  children, 
  isOpen, 
  onToggle, 
  accentColor,
  icon 
}) => {
  return (
    <div className="w-full border-t border-t-border/50 first:border-t-0">
      <button 
        onClick={onToggle}
        className="w-full py-8 lg:py-10 flex items-center justify-between group outline-none focus-visible:bg-t-bg-el/50 transition-colors"
      >
        <div className="flex items-center gap-6 lg:gap-8">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm"
            style={{ 
              backgroundColor: isOpen ? accentColor : 'rgba(var(--color-fg-muted-rgb), 0.05)',
              color: isOpen ? 'var(--color-bg)' : 'var(--color-fg)'
            }}
          >
            {icon || <span className="text-[10px] font-black uppercase tracking-widest font-technical">LOG</span>}
          </div>
          <div className="text-left space-y-1">
            <h4 className="text-lg lg:text-xl font-black font-display text-t-fg uppercase tracking-tight group-hover:text-t-accent transition-colors">
              {title}
            </h4>
            {subtitle && (
              <p className="text-[10px] font-bold font-technical text-t-fg-m uppercase tracking-[0.2em] opacity-50">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className={`text-2xl transition-transform duration-700 font-display ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-16 lg:pb-24 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface CaseStudyChapterViewProps {
  chapter: CaseStudyChapter;
  index: number;
}

export const CaseStudyChapterView: React.FC<CaseStudyChapterViewProps> = ({ chapter, index }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true, // First section open by default
    analysis: false,
    visuals: false,
    implementation: false,
    record: false
  });

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

  return (
    <div className="py-24 lg:py-32 border-b border-t-border last:border-0 relative overflow-visible">
      {/* Background Section Ambient Glow */}
      <div className={`absolute top-0 right-0 w-2/3 h-full bg-${chapter.color}-500/[0.03] blur-[160px] pointer-events-none -z-10`} />

      <div className="max-w-6xl mx-auto px-6">
        {/* CHAPTER HEADER - Fixed Identity Block */}
        <div className="mb-20 space-y-6">
          <div className="flex items-center gap-6">
            <span className={`text-[10px] font-black font-technical uppercase tracking-[0.8em] text-${chapter.color}-500`}>{chapter.introLabel}</span>
            <div className={`h-px flex-1 bg-${chapter.color}-500/20`} />
          </div>
          <h3 className="text-6xl lg:text-[8rem] font-black font-display text-t-fg uppercase tracking-tighter leading-[0.8]">
            {chapter.title}.
          </h3>
          <p className="text-sm lg:text-base font-bold font-emphasis uppercase tracking-[0.4em] text-t-fg-m opacity-50">{chapter.subtitle}</p>
        </div>

        {/* MODULAR SECTIONS */}
        <div className="space-y-0">
          
          {/* SECTION 1: OVERVIEW */}
          <CollapsibleSection
            title="Structural Overview"
            subtitle="Core Purpose & Architecture Logic"
            isOpen={openSections.overview}
            onToggle={() => toggleSection('overview')}
            accentColor={currentAccentHex}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" /></svg>}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-8 space-y-10">
                <div className="text-xl lg:text-2xl font-sans text-t-fg leading-relaxed border-l-4 pl-8" style={{ borderColor: currentAccentHex }}>
                  {chapter.content.purpose}
                </div>
                <div className="space-y-4">
                   <h5 className="text-[10px] font-black font-technical uppercase tracking-widest text-t-fg opacity-40">System Logic Breakdown</h5>
                   <div className="p-8 rounded-[40px] bg-t-bg-el border border-t-border shadow-inner">
                      <p className="text-sm lg:text-base font-mono text-t-accent-2 leading-relaxed whitespace-pre-wrap">{chapter.content.coreLogic}</p>
                   </div>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-end pb-2">
                <p className="text-base font-sans font-medium text-t-fg-m leading-relaxed italic opacity-70">
                  {chapter.content.visualDescription}
                </p>
              </div>
            </div>
          </CollapsibleSection>

          {/* SECTION 2: ENGINEERING ANALYSIS */}
          <CollapsibleSection
            title="Engineering Analysis"
            subtitle="Quantitative Metrics & Field Notes"
            isOpen={openSections.analysis}
            onToggle={() => toggleSection('analysis')}
            accentColor={currentAccentHex}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4 space-y-6">
                 <h5 className="text-[10px] font-black font-technical uppercase tracking-widest text-t-fg opacity-40 mb-8">Performance Targets</h5>
                 <div className="grid grid-cols-1 gap-4">
                  {chapter.content.metrics.map((m, i) => (
                    <div key={i} className="px-8 py-6 rounded-3xl bg-t-bg-el border border-t-border flex justify-between items-center group hover:border-t-accent transition-all shadow-sm">
                      <span className="text-[9px] font-black font-technical uppercase tracking-widest text-t-fg-m opacity-50">{m.label}</span>
                      <span className="text-xl font-black font-display text-t-fg">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <h5 className="text-[10px] font-black font-technical uppercase tracking-widest text-t-fg opacity-40 mb-8">Architecture Insights</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {chapter.content.insights?.map((insight, i) => (
                    <InsightCard 
                      key={i} 
                      type={insight.type} 
                      title={insight.title} 
                      description={insight.description} 
                      accent={chapter.color} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* SECTION 3: VISUALIZATION STAGE */}
          <CollapsibleSection
            title="Visualization Stage"
            subtitle="Interactive Telemetry & Component Logic"
            isOpen={openSections.visuals}
            onToggle={() => toggleSection('visuals')}
            accentColor={currentAccentHex}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
          >
            <div className="relative group">
              <GlassCard accent={chapter.color} className="p-0 overflow-hidden shadow-2xl bg-t-bg-el/40 backdrop-blur-3xl">
                 <div className="p-8 lg:p-16 flex flex-col justify-center min-h-[500px]">
                    <div className="mb-12 flex justify-between items-center border-b border-t-border pb-6">
                       <div className="flex flex-col gap-1">
                          <div className={`w-12 h-1.5 bg-${chapter.color}-500 shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.5)] rounded-full`} />
                          <span className="text-[10px] font-black font-technical uppercase tracking-[0.4em] text-t-fg opacity-40">
                             LIVE_RENDER_VIEW // {chapter.visualId}
                          </span>
                       </div>
                       <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-rose-500/20" />
                         <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                         <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
                       </div>
                    </div>
                    {renderVisuals()}
                 </div>
              </GlassCard>
            </div>
          </CollapsibleSection>

          {/* SECTION 4: TECHNICAL IMPLEMENTATION */}
          <CollapsibleSection
            title="Technical Implementation"
            subtitle="Stack Decisions & Module Schematics"
            isOpen={openSections.implementation}
            onToggle={() => toggleSection('implementation')}
            accentColor={currentAccentHex}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chapter.content.techStack.map((t, i) => (
                <motion.div 
                  key={t.name}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-8 rounded-[48px] bg-t-bg-el border border-t-border shadow-sm hover:shadow-2xl hover:border-t-accent transition-all duration-500 group/techitem flex flex-col justify-between h-full"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-2xl bg-${chapter.color}-500/10 flex items-center justify-center text-${chapter.color}-500 group-hover/techitem:bg-${chapter.color}-500 group-hover/techitem:text-t-bg transition-colors duration-500`}>
                        <span className="text-xs font-black font-technical">0{i + 1}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full bg-${chapter.color}-500/30 group-hover/techitem:animate-ping`} />
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="text-xl font-black font-display text-t-fg uppercase tracking-tight">{t.name}</h5>
                      <p className="text-[12px] font-sans font-medium text-t-fg-m leading-relaxed opacity-70 italic group-hover/techitem:opacity-100 transition-opacity">
                        {t.reason}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-t-border/50 flex justify-between items-center">
                    <span className="text-[8px] font-black font-technical uppercase tracking-widest opacity-30 group-hover/techitem:opacity-100 transition-opacity">Component Protocol</span>
                    <svg className={`w-4 h-4 text-${chapter.color}-500 opacity-0 group-hover/techitem:opacity-100 transition-all transform translate-x-[-10px] group-hover/techitem:translate-x-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </CollapsibleSection>

          {/* SECTION 5: DEVELOPMENT RECORD */}
          <CollapsibleSection
            title="Development Record"
            subtitle="Constraint Resolution & Source Explorer"
            isOpen={openSections.record}
            onToggle={() => toggleSection('record')}
            accentColor={currentAccentHex}
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5 space-y-8">
                <h5 className="text-[10px] font-black font-technical uppercase tracking-widest text-t-fg opacity-40 mb-8">Problem Solvability Matrix</h5>
                <div className="grid gap-6">
                  {chapter.content.challenges.map((c, i) => (
                    <div key={i} className="p-8 rounded-[40px] bg-t-bg-el border border-t-border hover:border-t-accent transition-all shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
                        <span className="text-[10px] font-black font-technical uppercase tracking-widest text-t-fg">{c.problem}</span>
                      </div>
                      <p className="text-sm font-sans text-t-fg-m mb-6 pl-6 border-l-2 border-t-border/50 leading-relaxed italic">{c.solution}</p>
                      <div className="flex items-center gap-3 pl-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-black font-technical text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">SUCCESS_OUTCOME: {c.outcome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <h5 className="text-[10px] font-black font-technical uppercase tracking-widest text-t-fg opacity-40 mb-8">Logic Explorer</h5>
                <CodePlayground 
                  code={chapter.content.code.code}
                  lang={chapter.content.code.lang}
                  filename={chapter.content.code.filename}
                  highlightLines={chapter.content.code.highlightLines}
                  sandboxUrl={chapter.content.code.sandboxUrl}
                  accent={currentAccentHex}
                />
              </div>
            </div>
          </CollapsibleSection>

        </div>
      </div>
    </div>
  );
};