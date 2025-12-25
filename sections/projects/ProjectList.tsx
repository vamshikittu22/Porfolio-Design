import React from 'react';
import { Project } from '../../types';
import ProjectCard from './ProjectCard';
import ProjectDetails from './ProjectDetails';

interface ProjectListProps {
  projects: Project[];
  expandedProjectId: string | null;
  onToggleProject: (id: string) => void;
  accents: ('indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange')[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, expandedProjectId, onToggleProject, accents }) => {
  return (
    <div className="flex flex-col gap-8">
      {projects.map((project, i) => {
        const isExpanded = expandedProjectId === project.id;
        const accent = accents[i % accents.length];
        const slideClass = i % 2 === 0 ? 'animate-slide-dock-right' : 'animate-slide-dock-left';

        return (
          <div key={project.id} className="w-full relative z-10 print:hidden">
            <ProjectCard 
              project={project} 
              index={i} 
              isExpanded={isExpanded} 
              onToggle={() => onToggleProject(project.id)} 
              accent={accent}
            />

            {isExpanded && (
              <div className={`w-full overflow-hidden ${slideClass} mb-20`}>
                <ProjectDetails project={project} accent={accent} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;