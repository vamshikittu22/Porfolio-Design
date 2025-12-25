import React, { useState } from 'react';
import { ScrollReveal } from '../../App';
import { PROJECTS_CONFIG } from '../../config/projects';
import ProjectList from './ProjectList';

const VIBRANT_ACCENTS: ('indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange')[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];

const ProjectsSection: React.FC = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setExpandedProjectId(prev => prev === id ? null : id);
  };

  return (
    <section id="projects-section" className="mb-[40rem] scroll-mt-32 print:hidden">
      <style>{`
        @keyframes slideDockRight { 
          from { transform: translateX(50%); opacity: 0; } 
          to { transform: translateX(0); opacity: 1; } 
        }
        @keyframes slideDockLeft { 
          from { transform: translateX(-50%); opacity: 0; } 
          to { transform: translateX(0); opacity: 1; } 
        }
        .animate-slide-dock-right { animation: slideDockRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-dock-left { animation: slideDockLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .project-glow:hover {
          box-shadow: 0 0 30px rgba(159, 134, 255, 0.3);
        }
      `}</style>

      <ScrollReveal className="flex flex-col items-center mb-48 text-center">
         <h2 className="text-7xl lg:text-[10rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none text-balance">
           Selected <br /> Software Projects.
         </h2>
         <div className="w-48 h-px bg-t-accent-2 mt-20 opacity-30 shadow-[0_0_20px_rgba(var(--color-accent-secondary-rgb),0.5)]" />
      </ScrollReveal>

      <ProjectList 
        projects={PROJECTS_CONFIG} 
        expandedProjectId={expandedProjectId} 
        onToggleProject={toggleProject} 
        accents={VIBRANT_ACCENTS}
      />
    </section>
  );
};

export default ProjectsSection;