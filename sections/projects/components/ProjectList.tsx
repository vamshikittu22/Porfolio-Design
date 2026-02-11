
import React, { useRef, useEffect } from 'react';
import { Project } from '../../../config/types';
import { ProjectCard } from './ProjectCard';
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

  // Effect to handle centering the card when it is closed
  useEffect(() => {
    if (activeProjectId === null) {
      // Logic for when any project is closed - we could track which one was just closed, 
      // but for simplicity, we assume we want to stay near where we were.
      // If we specifically want to center the one that was just closed, we'd need a "lastActiveId" state.
    }
  }, [activeProjectId]);

  const handleClose = (id: string) => {
    onToggleProject(id);
    // Scroll back to the card and center it
    setTimeout(() => {
      cardRefs.current[id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full items-start">
      {projects.map((project, idx) => {
        const accent = accents[idx % accents.length];
        const isActive = activeProjectId === project.id;
        const isInactive = activeProjectId !== null && !isActive;

        return (
          <React.Fragment key={project.id}>
            <motion.div
              // Fix: Added block braces to avoid returning the assigned element to the ref callback
              ref={el => { cardRefs.current[project.id] = el; }}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="h-full"
            >
              <ProjectCard
                project={project}
                index={idx}
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
  );
};
