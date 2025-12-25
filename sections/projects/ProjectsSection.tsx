import React, { useState, useMemo } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { PROJECTS_CONFIG } from '../../config/projects';
import { ProjectCategory } from '../../config/types';
import ProjectList from './ProjectList';

const VIBRANT_ACCENTS: ('indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange')[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];

const CATEGORIES = ['All', ...Object.values(ProjectCategory)];

const ProjectsSection: React.FC = () => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS_CONFIG;
    return PROJECTS_CONFIG.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

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

      <ScrollReveal className="flex flex-col items-center mb-24 text-center">
         <h2 className="text-7xl lg:text-[10rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none text-balance">
           Selected <br /> Software Projects.
         </h2>
         
         {/* Filtering UI */}
         <div className="mt-20 flex flex-wrap justify-center gap-4 lg:gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedProjectId(null); // Collapse when filtering
                }}
                className={`
                  px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-500 border
                  ${selectedCategory === cat 
                    ? 'bg-t-accent text-t-bg border-t-accent shadow-[0_10px_30px_-10px_rgba(var(--color-accent-rgb),0.5)]' 
                    : 'bg-transparent text-t-fg-m border-t-border hover:border-t-accent hover:text-t-fg'
                  }
                `}
              >
                {cat}
              </button>
            ))}
         </div>
         
         <div className="w-48 h-px bg-t-accent-2 mt-20 opacity-30 shadow-[0_0_20px_rgba(var(--color-accent-secondary-rgb),0.5)]" />
      </ScrollReveal>

      <div className="transition-all duration-700">
        {filteredProjects.length > 0 ? (
          <ProjectList 
            projects={filteredProjects} 
            expandedProjectId={expandedProjectId} 
            onToggleProject={toggleProject} 
            accents={VIBRANT_ACCENTS}
          />
        ) : (
          <div className="py-40 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
             <p className="text-[10px] font-black uppercase tracking-[1em] text-t-fg-m opacity-40">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;