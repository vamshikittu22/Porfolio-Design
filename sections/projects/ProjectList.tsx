
import React from 'react';
import { Project } from '../../config/types';
import ProjectCard from './ProjectCard';
import { AnimatePresence, motion } from 'framer-motion';

interface ProjectListProps {
  projects: Project[];
  activeProjectId: string | null;
  onToggleProject: (id: string) => void;
  accents: ('indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange')[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, activeProjectId, onToggleProject, accents }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full items-start">
      {projects.map((project, idx) => {
        const accent = accents[idx % accents.length];
        const isActive = activeProjectId === project.id;
        // If a project is open, others are "inactive" (dimmed)
        const isInactive = activeProjectId !== null && !isActive;

        return (
          <motion.div 
            layout 
            key={project.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
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
        );
      })}
    </div>
  );
};

export default ProjectList;
