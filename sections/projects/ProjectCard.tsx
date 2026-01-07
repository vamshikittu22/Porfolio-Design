
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
        group relative w-full text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none
        ${isActive ? 'scale-[1.02] z-10' : ''}
        ${isInactive ? 'opacity-60 hover:opacity-100 hover:scale-[1.01]' : 'hover:scale-[1.02]'}
      `}
    >
      <GlassCard
        accent={accent}
        className={`
          relative overflow-hidden p-6 lg:p-8 flex items-center justify-between min-h-[100px]
          transition-all duration-500
          ${isActive 
            ? 'bg-t-bg-el border-t-accent shadow-[0_0_40px_-10px_rgba(var(--color-accent-rgb),0.4)]' 
            : 'hover:bg-t-bg-el/80 bg-t-bg-el/40'}
        `}
      >
        <div className="flex items-center gap-6 lg:gap-8">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${isActive ? activeColor : 'text-t-fg-m opacity-50'}`}>
            0{index + 1}
          </span>

          <div className="flex flex-col gap-1">
            <h3 className={`text-lg lg:text-xl font-black font-display uppercase tracking-tight transition-colors ${isActive ? 'text-t-fg' : 'text-t-fg/80 group-hover:text-t-fg'}`}>
              {project.title}
            </h3>
            <span className={`text-[8px] font-bold uppercase tracking-widest ${isActive ? activeColor : 'text-t-fg-m opacity-60'}`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Morphing Toggle Icon */}
        <motion.div 
          animate={{ 
            rotate: isActive ? 180 : 0,
            backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(0,0,0,0)',
            borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border-subtle)'
          }}
          className={`
            w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500
            ${isActive ? 'text-t-bg' : 'text-t-fg-m opacity-40 group-hover:opacity-100 group-hover:border-t-accent group-hover:text-t-accent'}
          `}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
