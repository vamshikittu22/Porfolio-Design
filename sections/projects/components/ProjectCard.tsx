import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../../../components/ui/GlassUI';
import { Project } from '../../../config/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  isInactive: boolean;
  onToggle: () => void;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isActive, isInactive, onToggle, accent }) => {
  const getOptimizedUrl = (url: string) =>
    url.includes('unsplash.com') ? `${url}&fm=webp&q=75` : url;

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      aria-pressed={isActive}
      aria-label={`${isActive ? 'Hide' : 'View'} details for ${project.title}`}
      className={`
        group relative w-full text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none cursor-pointer
        focus-visible:ring-4 focus-visible:ring-t-accent focus-visible:ring-offset-4 focus-visible:ring-offset-t-bg focus-visible:rounded-[32px] focus-visible:z-20
        ${isActive ? 'scale-[1.02] z-10' : ''}
        ${isInactive ? 'opacity-60 hover:opacity-100' : 'hover:scale-[1.01]'}
      `}
    >
      <GlassCard
        accent={accent}
        className={`
          relative overflow-hidden p-0 flex flex-col min-h-[340px]
          transition-all duration-700
          ${isActive
            ? 'bg-t-bg-el border-t-accent shadow-[0_40px_80px_-20px_rgba(var(--color-accent-rgb),0.3)]'
            : 'hover:bg-t-bg-el/90 bg-t-bg-el/50'}
        `}
      >
        {/* Thumbnail Image */}
        <div className="relative h-[160px] overflow-hidden">
          <img
            src={getOptimizedUrl(project.secondaryImageUrl)}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 blur-sm"
            onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
            alt={`${project.title} preview`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-t-bg-el via-t-bg-el/30 to-transparent" />

          {/* Index number */}
          <span className="absolute top-4 right-5 text-[40px] font-black font-display text-white/10 leading-none select-none">
            {index < 9 ? `0${index + 1}` : index + 1}
          </span>

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 rounded-full text-[7px] font-black uppercase tracking-wider bg-t-bg/70 backdrop-blur-md text-t-fg-m border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1 p-6 gap-3">
          {/* Title */}
          <h3 className={`text-lg lg:text-xl font-black font-display uppercase tracking-tight transition-colors leading-tight ${isActive ? 'text-t-fg' : 'text-t-fg/80 group-hover:text-t-fg'}`}>
            {project.title}
          </h3>

          {/* Tagline */}
          <p className="text-[11px] text-t-fg-m/60 leading-snug line-clamp-2">
            {project.tagline}
          </p>

          {/* Impact line - first role highlight, truncated */}
          <p className={`text-[10px] font-bold text-t-accent/70 leading-snug line-clamp-1 italic transition-opacity ${isActive || isInactive ? '' : 'opacity-0 group-hover:opacity-100'}`}>
            "{project.roleHighlights[0]}"
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom row: tech + CTAs */}
          <div className="flex items-end justify-between gap-3 pt-3 border-t border-t-border/30">
            {/* Tech pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t} className="text-[7px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-t-fg-m/50 group-hover:text-t-fg-m/70 group-hover:border-white/20 transition-colors">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-[7px] font-mono text-t-fg-m/30">+{project.tech.length - 3}</span>
              )}
            </div>

            {/* View details indicator */}
            <span className={`text-[8px] font-black uppercase tracking-wider shrink-0 transition-colors ${isActive ? 'text-t-accent' : 'text-t-fg-m/30 group-hover:text-t-accent'}`}>
              {isActive ? 'Close ↑' : 'Details →'}
            </span>
          </div>
        </div>
      </GlassCard>
    </button>
  );
};