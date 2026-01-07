
import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { PROJECTS_CONFIG } from '../../config/projects';
import { ProjectCategory } from '../../config/types';
import ProjectList from './ProjectList';
import { AnimatePresence, motion } from 'framer-motion';

const VIBRANT_ACCENTS: ('indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange')[] = ['purple', 'orange', 'indigo', 'emerald', 'rose', 'amber'];

const CATEGORIES = ['All', ...Object.values(ProjectCategory)];

const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS_CONFIG;
    return PROJECTS_CONFIG.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Close details if the active project is filtered out
  useEffect(() => {
    if (openProjectId && !filteredProjects.find(p => p.id === openProjectId)) {
      setOpenProjectId(null);
    }
  }, [selectedCategory, filteredProjects, openProjectId]);

  const handleToggleProject = (id: string) => {
    setOpenProjectId(prev => prev === id ? null : id);
  };

  return (
    <section id="projects-section" className="mb-[40rem] scroll-mt-32 print:hidden">
      <ScrollReveal className="flex flex-col items-center mb-16 text-center">
         <h2 className="text-7xl lg:text-[10rem] font-black font-display text-t-fg uppercase tracking-tighter leading-none text-balance">
           Selected <br /> Software Projects.
         </h2>
         
         {/* Filtering UI */}
         <div className="mt-16 flex flex-wrap justify-center gap-4 lg:gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenProjectId(null); // Reset open project on category change for better UX
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

      <div className="flex flex-col gap-12 lg:gap-20 transition-all duration-700">
        {/* 1. PROJECT TILES (Navigator) with Integrated Details */}
        {filteredProjects.length > 0 ? (
          <ProjectList 
            projects={filteredProjects} 
            activeProjectId={openProjectId}
            onToggleProject={handleToggleProject}
            accents={VIBRANT_ACCENTS}
          />
        ) : (
          <div className="py-40 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000 border border-dashed border-t-border rounded-[40px] opacity-60">
             <p className="text-[10px] font-black uppercase tracking-[1em] text-t-fg-m opacity-60">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
