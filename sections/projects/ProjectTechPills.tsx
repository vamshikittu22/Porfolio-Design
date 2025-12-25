import React from 'react';
import { BubbleTag } from '../../components/ui/GlassUI';

interface ProjectTechPillsProps {
  tech: string[];
  accent: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';
}

const ProjectTechPills: React.FC<ProjectTechPillsProps> = ({ tech, accent }) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {tech.map((t) => (
        <BubbleTag key={t} accent={accent}>
          {t}
        </BubbleTag>
      ))}
    </div>
  );
};

export default ProjectTechPills;