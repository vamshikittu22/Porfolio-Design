import React, { useState, useMemo, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { PROJECTS_CONFIG } from '../../config/projects';
import { ProjectCategory } from '../../config/types';
import { ProjectList } from './components/ProjectList';
import { ProjectFilter } from './components/ProjectFilter';
import { VIBRANT_ACCENTS } from '../../config/constants';
import '../../src/styles/glass-morphism.css';

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

  // Stats for the header
  const totalProjects = PROJECTS_CONFIG.length;
  const liveDemos = PROJECTS_CONFIG.filter(p => p.liveUrl).length;
  const uniqueTech = new Set(PROJECTS_CONFIG.flatMap(p => p.tech)).size;
  const aiProjects = PROJECTS_CONFIG.filter(p => p.category === ProjectCategory.AI).length;

  return (
    <section id="projects-section" className="py-12 md:py-16 mb-32 scroll-mt-32 print:hidden">
      <ScrollReveal className="flex flex-col items-center mb-16 text-center">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-[2px] bg-t-accent" />
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-t-accent">What I Build</span>
          <div className="w-12 h-[2px] bg-t-accent" />
        </div>

        {/* Section title */}
        <h2 className="heading-lg text-t-fg uppercase tracking-tighter leading-none text-balance">
          Technical <br /> Showcase.
        </h2>

        {/* Stats strip */}
        <div className="flex items-center gap-6 mt-8 flex-wrap justify-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-t-fg-m/60">
            {totalProjects} Projects
          </span>
          <span className="w-1 h-1 rounded-full bg-t-accent/40" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-t-fg-m/60">
            {liveDemos} Live Demos
          </span>
          <span className="w-1 h-1 rounded-full bg-t-accent/40" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-t-fg-m/60">
            {uniqueTech}+ Technologies
          </span>
          {aiProjects > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-t-accent/40" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-t-fg-m/60">
                {aiProjects} AI-Native Apps
              </span>
            </>
          )}
        </div>

        <ProjectFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategorySelect={(cat) => {
            setSelectedCategory(cat);
            setOpenProjectId(null);
          }}
        />

        <div className="w-48 h-px bg-t-accent-2 mt-12 opacity-30 shadow-[0_0_20px_rgba(var(--color-accent-secondary-rgb),0.5)]" />
      </ScrollReveal>

      <div className="transition-all duration-700">
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
