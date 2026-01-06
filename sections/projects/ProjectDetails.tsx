
import React from 'react';
import { GlassCard } from '../../components/ui/GlassUI';
import { Project } from '../../config/types';
import ProjectTechPills from './ProjectTechPills';
import ProjectActions from './ProjectActions';

interface ProjectDetailsProps {
  project: Project;
  accent: 'indigo' | 'emerald' | 'rose' | 'amber' | 'purple' | 'orange';
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, accent }) => {
  return (
    <GlassCard accent={accent} className="relative w-full overflow-hidden flex flex-col shadow-sm border-t-border bg-t-accent-s/5 backdrop-blur-3xl">
      <div className="absolute inset-0 bg-t-accent/5 pointer-events-none" />
      
      <div className="max-h-[85vh] overflow-y-auto scrollbar-hide p-8 lg:p-20 space-y-32 relative z-10">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-20 lg:gap-32 items-start">
          <div className="space-y-16">
             {/* Header Card with Background Image 1 */}
             <div className="relative aspect-[21/9] rounded-[40px] border border-white/40 bg-white/30 dark:bg-white/5 backdrop-blur-3xl overflow-hidden p-10 flex flex-col justify-between shadow-sm group/card">
                {/* Background Image Fix */}
                <div className="absolute inset-0 z-[-1]">
                   <img 
                     src={project.secondaryImageUrl} 
                     className="w-full h-full object-cover opacity-80 mix-blend-overlay transition-transform duration-[2000ms] group-hover/card:scale-105" 
                     alt="Project Background" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-t-bg-el/90 via-t-bg-el/40 to-transparent" />
                </div>

                <div className={`absolute top-10 left-10 w-12 h-12 rounded-full border border-white/50 bg-white/20 flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-1000`}>
                  <img src={project.thumbnailUrl} className="w-8 h-8 object-cover rounded-full saturate-150" alt="Logo" />
                </div>
                <div className="absolute top-10 right-10 flex flex-col items-end">
                  <span className="text-[8px] font-black uppercase tracking-widest text-t-accent opacity-50">TM</span>
                  <h4 className="text-xl font-black text-t-fg uppercase tracking-tighter leading-none">{project.title}.</h4>
                </div>
                <div className="mt-auto space-y-2 relative z-10">
                  <p className="text-[9px] font-black uppercase tracking-[0.8em] text-t-accent">Project Case Study</p>
                </div>
             </div>

             <div className="space-y-8 px-2">
                <p className="text-xl lg:text-2xl text-t-fg-m font-medium leading-relaxed max-w-2xl italic">"{project.tagline}"</p>
                <p className="text-base text-t-fg leading-relaxed opacity-80">{project.overview}</p>
                
                {/* Image 2: Small Detail Square */}
                <div className="w-32 h-32 rounded-3xl overflow-hidden border border-t-border mt-4 shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img src={project.tertiaryImageUrl || project.secondaryImageUrl} className="w-full h-full object-cover saturate-125 hover:scale-110 transition-transform duration-700" alt="Detail View" />
                </div>
             </div>
             
             <div className="space-y-6">
                <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-fg-m opacity-50 px-2">Technology Stack</h5>
                <ProjectTechPills tech={project.tech} accent={accent} />
             </div>
             
             <div className="pt-16 border-t border-t-border space-y-12 px-2">
                <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-fg-m opacity-50">Core Features</h5>
                <div className="grid sm:grid-cols-2 gap-10">
                  {project.useCases.map((use, idx) => (
                    <div key={idx} className="space-y-3 group/use">
                      <span className="text-t-accent-2 font-black text-[10px] tracking-widest">Feature 0{idx + 1}</span>
                      <p className="text-t-fg font-bold uppercase text-xs leading-snug transition-transform group-hover/use:translate-x-1">{use}</p>
                    </div>
                  ))}
                </div>
             </div>

             <ProjectActions liveUrl={project.liveUrl} repoUrl={project.repoUrl} />
          </div>
          
          <div className="w-full flex flex-col gap-12 relative">
             {/* Right Column Image 1 */}
             <div className="relative rounded-[40px] overflow-hidden border border-t-border bg-t-bg-el/60 aspect-[4/5] shadow-sm group/image">
                <img src={project.secondaryImageUrl} className="w-full h-full object-cover opacity-90 saturate-125 transition-transform duration-[2000ms] group-hover/image:scale-105" alt="Main View" />
                <div className="absolute bottom-10 left-10 right-10 z-20">
                   <div className="bg-t-bg-el/95 backdrop-blur-xl px-10 py-8 rounded-[24px] border border-t-border shadow-sm">
                      <p className="text-[8px] font-black text-t-accent uppercase tracking-[0.6em] mb-3">Technology Overview</p>
                      <p className="text-sm font-bold text-t-fg leading-relaxed">{project.description}</p>
                      <div className="mt-8 rounded-2xl overflow-hidden border border-t-border/50 aspect-video group/inner">
                         <img src={project.thumbnailUrl} className="w-full h-full object-cover grayscale-0 saturate-125 transition-transform duration-700 group-hover/inner:scale-110" alt="Detail Node" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-10 rounded-[40px] bg-t-bg-el/80 border border-t-border shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-4 mb-4"><div className="w-1.5 h-1.5 rounded-full bg-t-accent-2" /><p className="text-[9px] font-black text-t-accent-2 uppercase tracking-[0.5em]">Technical Approach</p></div>
                <p className="text-sm font-medium text-t-fg-m leading-relaxed italic mb-8">"{project.architecture}"</p>
             </div>

             <div className="p-10 rounded-[40px] bg-t-bg-el/80 border border-t-border shadow-sm backdrop-blur-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-t-accent-2" />
                  <h5 className="text-[9px] font-black uppercase tracking-[0.6em] text-t-accent-2">Role & Impact</h5>
                </div>
                <div className="space-y-4">
                   {project.roleHighlights.map((hl, i) => (
                     <div key={i} className="flex gap-4 items-start text-sm text-t-fg-m font-medium leading-relaxed">
                        <span className="text-t-accent-2 font-black select-none">•</span>
                        <p>{hl}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectDetails;
