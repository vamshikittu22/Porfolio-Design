import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { PROJECTS_CONFIG } from '../../config/projects';
import { ProjectCategory } from '../../config/types';
import { ProjectList } from './components/ProjectList';
import { ProjectFilter } from './components/ProjectFilter';
import { VIBRANT_ACCENTS } from '../../config/constants';

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
        <h2 className="text-6xl lg:text-8xl font-black font-display text-t-fg uppercase tracking-tighter leading-none text-balance">
          Technical <br /> Showcase.
        </h2>

        <ProjectFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            setOpenProjectId(null);
          }}
        />

        <div className="w-48 h-px bg-t-accent-2 mt-16 opacity-30 shadow-[0_0_20px_rgba(var(--color-accent-secondary-rgb),0.5)]" />
      </ScrollReveal>

      <div className="flex flex-col gap-12 lg:gap-20 transition-all duration-700">
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
