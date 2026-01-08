
import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../components/ui/GlassUI';
import { Project } from '../../config/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  isInactive: boolean;
  onToggle: () => void;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isActive, isInactive, onToggle, accent }) => {
  const accentColors = {
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    rose: 'text-rose-400',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400',
  };

  const activeColor = accentColors[accent] || 'text-t-accent';

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className={`
        group relative w-full text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none
        ${isActive ? 'scale-[1.03] z-10' : ''}
        ${isInactive ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : 'hover:scale-[1.01]'}
      `}
    >
      <GlassCard
        accent={accent}
        className={`
          relative overflow-hidden p-8 lg:p-10 flex items-center justify-between min-h-[120px]
          transition-all duration-700
          ${isActive 
            ? 'bg-t-bg-el border-t-accent shadow-[0_40px_80px_-20px_rgba(var(--color-accent-rgb),0.3)]' 
            : 'hover:bg-t-bg-el/90 bg-t-bg-el/50'}
        `}
      >
        <div className="flex items-center gap-8 lg:gap-12">
          <span className={`text-xs font-black uppercase tracking-[0.4em] transition-colors ${isActive ? activeColor : 'text-t-fg-m opacity-30'}`}>
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>

          <div className="flex flex-col gap-2">
            <h3 className={`text-xl lg:text-2xl font-black font-display uppercase tracking-tight transition-colors ${isActive ? 'text-t-fg' : 'text-t-fg/70 group-hover:text-t-fg'}`}>
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-t-accent animate-pulse' : 'bg-t-fg/20'}`} />
              <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isActive ? activeColor : 'text-t-fg-m opacity-50'}`}>
                {project.category}
              </span>
            </div>
          </div>
        </div>

        {/* Morphing Toggle Icon */}
        <motion.div 
          animate={{ 
            rotate: isActive ? 180 : 0,
            scale: isActive ? 1.2 : 1,
            backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(var(--color-fg-muted-rgb), 0.05)',
            borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border-subtle)'
          }}
          whileHover={{ scale: 1.1, rotate: isActive ? 180 : 90 }}
          className={`
            w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 shadow-lg
            ${isActive ? 'text-t-bg shadow-t-accent/40' : 'text-t-fg-m opacity-40 group-hover:opacity-100 group-hover:border-t-accent group-hover:text-t-accent'}
          `}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isActive ? (
               <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" 
               />
            ) : (
               <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" 
               />
            )}
          </svg>
        </motion.div>
      </GlassCard>
    </button>
  );
};

export default ProjectCard;
