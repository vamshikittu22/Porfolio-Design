
import React from 'react';
import { GlassCard } from '../../components/ui/GlassUI';
import { Project } from '../../config/types';
import ProjectTechPills from './ProjectTechPills';
import ProjectActions from './ProjectActions';

interface ProjectDetailsProps {
  project: Project;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';
  onClose: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, accent, onClose }) => {
  return (
    <div className="w-full pt-8 pb-4">
      <GlassCard accent={accent} className="relative w-full overflow-hidden flex flex-col shadow-2xl border-t-border bg-t-bg-el/95 backdrop-blur-3xl">
        <div className="absolute inset-0 bg-t-accent/5 pointer-events-none" />
        
        {/* Floating Close Button */}
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-50">
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 px-5 py-2.5 lg:px-6 lg:py-3 rounded-full bg-t-bg/80 backdrop-blur-md border border-t-border hover:border-t-accent transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
            aria-label="Close project details"
          >
            <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.2em] text-t-fg-m group-hover:text-t-accent transition-colors">Close View</span>
            <div className="w-6 h-6 rounded-full bg-t-fg/5 flex items-center justify-center group-hover:bg-t-accent group-hover:text-t-bg transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
          </button>
        </div>

        <div className="p-8 lg:p-20 space-y-20 relative z-10">
          
          {/* Top Section: Hero & Overview */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 lg:gap-24 items-start">
            <div className="space-y-12">
               {/* Hero Image */}
               <div className="relative aspect-[16/9] rounded-[40px] border border-white/40 bg-white/30 dark:bg-white/5 backdrop-blur-3xl overflow-hidden p-10 flex flex-col justify-between shadow-lg group/card">
                  <div className="absolute inset-0 z-[-1]">
                     <img 
                       src={project.secondaryImageUrl} 
                       className="w-full h-full object-cover opacity-90 mix-blend-overlay transition-transform duration-[3000ms] group-hover/card:scale-105" 
                       alt="Project Background" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-t-bg-el/90 via-t-bg-el/20 to-transparent" />
                  </div>

                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl border border-white/50 bg-white/20 flex items-center justify-center shadow-lg backdrop-blur-md">
                      <img src={project.thumbnailUrl} className="w-8 h-8 object-cover rounded-full" alt="Logo" />
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-4 relative z-10">
                    <h4 className="text-4xl lg:text-6xl font-black text-t-fg uppercase tracking-tighter leading-none">{project.title}.</h4>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-t-accent">{project.tagline}</p>
                  </div>
               </div>

               <div className="space-y-8 px-2">
                  <p className="text-xl lg:text-2xl text-t-fg font-medium leading-relaxed italic border-l-4 border-t-accent pl-8">
                    "{project.overview}"
                  </p>
                  <p className="text-base text-t-fg-m leading-relaxed opacity-90">
                    {project.description}
                  </p>
               </div>

               <div className="pt-8">
                 <ProjectActions liveUrl={project.liveUrl} repoUrl={project.repoUrl} />
               </div>
            </div>

            {/* Right Column: Features & Tech */}
            <div className="space-y-12">
               {/* Features List */}
               <div className="space-y-6">
                  <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-fg-m opacity-50">Core Features</h5>
                  <div className="space-y-4">
                    {project.useCases.map((use, idx) => (
                      <div key={idx} className="flex gap-4 items-start group/feat">
                        <span className="text-t-accent font-black text-xs mt-1">0{idx + 1}</span>
                        <p className="text-t-fg font-bold text-sm leading-snug transition-transform group-hover/feat:translate-x-1">{use}</p>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Tech Stack */}
               <div className="p-8 rounded-[32px] bg-t-fg/[0.02] border border-t-border">
                  <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-fg-m opacity-50 mb-6">Architecture Stack</h5>
                  <ProjectTechPills tech={project.tech} accent={accent} />
               </div>

               {/* Architecture & Role */}
               <div className="space-y-8">
                  <div>
                    <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-accent-2 mb-3">System Architecture</h5>
                    <p className="text-sm font-medium text-t-fg-m leading-relaxed">
                      {project.architecture}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-accent-2 mb-3">Role & Impact</h5>
                    <ul className="space-y-2">
                      {project.roleHighlights.map((hl, i) => (
                        <li key={i} className="text-sm font-medium text-t-fg-m flex gap-2">
                          <span className="text-t-accent">•</span> {hl}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProjectDetails;
