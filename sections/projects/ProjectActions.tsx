import React from 'react';
import { GlassButton } from '../../components/ui/GlassUI';

interface ProjectActionsProps {
  liveUrl?: string;
  repoUrl?: string;
}

const ProjectActions: React.FC<ProjectActionsProps> = ({ liveUrl, repoUrl }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-8">
      {liveUrl && (
        <GlassButton 
          primary 
          accent="theme" 
          className="flex-1" 
          onClick={() => window.open(liveUrl, '_blank')}
        >
          View Live Site
        </GlassButton>
      )}
      {repoUrl && (
        <GlassButton 
          accent="theme" 
          className="flex-1" 
          onClick={() => window.open(repoUrl, '_blank')}
        >
          Source Code
        </GlassButton>
      )}
    </div>
  );
};

export default ProjectActions;