import React, { useRef, useState, useEffect } from 'react';
import { GlassCard } from '../../components/ui/GlassUI';
import { Project } from '../../config/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isExpanded, onToggle, accent }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { 
      if (entry.isIntersecting) setIsVisible(true); 
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      onClick={(e) => { e.stopPropagation(); onToggle(); }} 
      className={`group cursor-pointer relative w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015] project-glow ${isExpanded ? 'mb-10' : 'h-24 lg:h-28'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <GlassCard accent={accent} className={`h-full px-8 lg:px-14 flex items-center gap-10 ${isExpanded ? `bg-t-bg border-t-accent border-[1px]` : 'border-t-border'}`}>
        <div className="relative w-12 h-12 lg:w-14 lg:h-14 flex-shrink-0">
           <img 
             src={project.thumbnailUrl} 
             className={`w-full h-full object-cover rounded-full border border-t-border transition-all duration-1000 shadow-sm ${isVisible ? 'grayscale-0 saturate-150 scale-100' : 'grayscale saturate-50 scale-95 opacity-50'}`} 
             alt="" 
           />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-t-accent opacity-70 mb-1 block">Project // 0{index + 1}</span>
          <h3 className="text-2xl lg:text-3xl font-black text-t-fg uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-2">{project.title}.</h3>
        </div>
        <div className={`hidden md:flex w-10 h-10 rounded-full border border-t-border items-center justify-center transition-all duration-300 hover:rotate-90 hover:bg-white/10 group-hover:bg-t-accent group-hover:text-t-bg ${isExpanded ? `rotate-45 bg-t-accent text-t-bg` : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProjectCard;