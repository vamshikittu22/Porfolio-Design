
import React, { useRef } from 'react';
import { Project } from '../../../config/types';
import { ProjectCard } from './ProjectCard';
import { FeaturedProjectCard } from './FeaturedProjectCard';
import { ProjectDetails } from './ProjectDetails';
import { AnimatePresence, motion } from 'framer-motion';

interface ProjectListProps {
  projects: Project[];
  activeProjectId: string | null;
  onToggleProject: (id: string) => void;
  accents: ('indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange')[];
}

export const ProjectList: React.FC<ProjectListProps> = ({ projects, activeProjectId, onToggleProject, accents }) => {
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleClose = (id: string) => {
    onToggleProject(id);
    setTimeout(() => {
      cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Separate featured project from the rest
  const featuredProject = projects.find(p => p.featured);
  const remainingProjects = featuredProject
    ? projects.filter(p => p.id !== featuredProject.id)
    : projects;

  return (
    <div className="space-y-8">
      {/* Featured Project — Full-Width Hero */}
      {featuredProject && (
        <>
          <div ref={el => { cardRefs.current[featuredProject.id] = el; }}>
            <FeaturedProjectCard
              project={featuredProject}
              onViewDetails={() => onToggleProject(featuredProject.id)}
            />
          </div>

          {/* Featured project details panel */}
          <AnimatePresence mode="wait">
            {activeProjectId === featuredProject.id && (
              <motion.div
                key={`details-${featuredProject.id}`}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden z-20"
              >
                <ProjectDetails
                  project={featuredProject}
                  accent={accents[0]}
                  onClose={() => handleClose(featuredProject.id)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Remaining Projects — 2-Column Grid */}
      {remainingProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full items-start">
          {remainingProjects.map((project, idx) => {
            const accentIdx = featuredProject ? idx + 1 : idx;
            const accent = accents[accentIdx % accents.length];
            const isActive = activeProjectId === project.id;
            const isInactive = activeProjectId !== null && !isActive;

            return (
              <React.Fragment key={project.id}>
                <motion.div
                  ref={el => { cardRefs.current[project.id] = el; }}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    index={featuredProject ? idx + 1 : idx}
                    isActive={isActive}
                    isInactive={isInactive}
                    onToggle={() => onToggleProject(project.id)}
                    accent={accent}
                  />
                </motion.div>

                {/* Inline Details Panel */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`details-${project.id}`}
                      layout
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="col-span-full overflow-hidden z-20"
                    >
                      <ProjectDetails
                        project={project}
                        accent={accent}
                        onClose={() => handleClose(project.id)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};
