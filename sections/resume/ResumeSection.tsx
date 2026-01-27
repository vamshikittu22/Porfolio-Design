import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassButton, GlassCard } from '../../components/ui/GlassUI';
import { RESUME_CONTENT } from './ResumeData';

const ResumeSection: React.FC = () => {
  const RESUME_FILE_PATH = '/assets/downloads/Vamshi_Krishna_Resume.pdf';

  const handleDownloadFile = () => {
    // This looks for the physical file you upload to the /public/assets/downloads/ folder
    const link = document.createElement('a');
    link.href = RESUME_FILE_PATH;
    link.download = 'Vamshi_Krishna_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintSnapshot = () => {
    // Triggers the high-fidelity print engine for live data
    window.print();
  };

  return (
    <section id="resume-section" className="mb-[15rem] lg:mb-[20rem] scroll-mt-32">
      <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-20">
        <GlassCard 
          className="max-w-4xl lg:max-w-5xl mx-auto px-8 lg:px-20 py-12 lg:py-24 rounded-[40px] bg-t-bg-el/90 border border-t-border shadow-2xl print:shadow-none print:border-0 print:bg-white print:max-w-none print:px-0 print:py-0 print:text-black"
          accent="theme"
        >
          {/* 
            DYNAMIC PRINT ENGINE v7.0
            - Optimized for 1-2 page executive output
            - Activated only during window.print()
          */}
          <style>{`
            @media print {
              @page { size: letter; margin: 0.4in; }
              body * { visibility: hidden; }
              #resume-section, #resume-section * { visibility: visible; }
              #resume-section { 
                position: absolute; left: 0; top: 0; width: 100%; 
                margin: 0 !important; padding: 0 !important; background: white !important;
              }
              .print-doc { color: black !important; font-family: "Times New Roman", serif !important; line-height: 1.3 !important; }
              .print-hide { display: none !important; }
              .section-hdr {
                font-family: Arial, sans-serif !important; font-size: 11pt !important; font-weight: 800 !important;
                text-transform: uppercase !important; border-bottom: 1.5pt solid #000 !important;
                margin-top: 14pt !important; margin-bottom: 8pt !important; padding-bottom: 2pt !important;
              }
              .item-hdr { font-family: Arial, sans-serif !important; font-size: 10.5pt !important; font-weight: 700 !important; }
              .txt-body { font-size: 10pt !important; color: black !important; }
              .bullet { margin-bottom: 3pt !important; }
              .break-avoid { break-inside: avoid; page-break-inside: avoid; }
            }
          `}</style>

          <div className="print-doc">
            <header className="flex flex-col items-center mb-8 text-center print:mb-6">
              <h2 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-t-fg print:text-[24pt] print:font-extrabold print:mb-1">
                {RESUME_CONTENT.name}
              </h2>
              <div className="text-sm font-bold text-t-fg print:text-[12pt] print:font-bold uppercase tracking-widest">
                {RESUME_CONTENT.role} | {RESUME_CONTENT.contact.location}
              </div>
              <div className="mt-4 text-xs lg:text-sm font-medium text-t-fg-m print:text-black print:text-[10pt] print:mt-2 font-mono flex flex-wrap justify-center gap-4">
                <span>{RESUME_CONTENT.contact.phone}</span>
                <span className="opacity-30 print:inline">|</span>
                <span className="font-bold underline">{RESUME_CONTENT.contact.email}</span>
                <span className="opacity-30 print:inline">|</span>
                <span>LinkedIn</span>
                <span className="opacity-30 print:inline">|</span>
                <span>GitHub</span>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 print:hidden">
                <GlassButton primary accent="theme" onClick={handleDownloadFile} className="!px-10 !py-5 !text-[10px] shadow-xl">
                  Download Official PDF
                </GlassButton>
                <GlassButton accent="theme" onClick={handlePrintSnapshot} className="!px-10 !py-5 !text-[10px]">
                  Print Live Snapshot
                </GlassButton>
              </div>
              
              <p className="mt-4 text-[9px] font-bold text-t-fg-m uppercase tracking-widest opacity-40 print:hidden">
                The "Official PDF" button downloads your uploaded resume file.
              </p>
            </header>

            <div className="space-y-8 print:space-y-2">
              <section className="break-avoid">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-hdr">Professional Summary</h3>
                <p className="text-base text-t-fg leading-relaxed print:txt-body">{RESUME_CONTENT.summary}</p>
              </section>

              <section className="break-avoid">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-hdr">Technical Skills</h3>
                <div className="grid grid-cols-1 gap-1 print:txt-body">
                  <p><strong>Languages:</strong> {RESUME_CONTENT.technicalSkills.languages.join(', ')}</p>
                  <p><strong>Frontend:</strong> {RESUME_CONTENT.technicalSkills.frontend.join(', ')}</p>
                  <p><strong>Backend:</strong> {RESUME_CONTENT.technicalSkills.backend.join(', ')}</p>
                  <p><strong>Databases:</strong> {RESUME_CONTENT.technicalSkills.databases.join(', ')}</p>
                  <p><strong>Cloud/DevOps:</strong> {RESUME_CONTENT.technicalSkills.cloud.join(', ')}, {RESUME_CONTENT.technicalSkills.devops.join(', ')}</p>
                  <p><strong>AI & Tools:</strong> {RESUME_CONTENT.technicalSkills.ai.join(', ')}, {RESUME_CONTENT.technicalSkills.tools.join(', ')}</p>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-4 print:section-hdr">Professional Experience</h3>
                <div className="space-y-8 print:space-y-5">
                  {RESUME_CONTENT.experience.map((exp, idx) => (
                    <div key={idx} className="break-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-lg font-black text-t-fg print:item-hdr">{exp.subtitle} | <span className="italic font-medium">{exp.title}</span></h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9.5pt] font-mono">{exp.period}</span>
                      </div>
                      <ul className="space-y-1.5 print:list-disc print:ml-6">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm lg:text-base text-t-fg leading-relaxed flex items-start gap-2 print:txt-body print:bullet">
                            <span className="text-t-accent print:hidden mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-4 print:section-hdr">Key Projects</h3>
                <div className="space-y-6 print:space-y-4">
                  {RESUME_CONTENT.projects.map((proj, idx) => (
                    <div key={idx} className="break-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-lg font-black text-t-fg print:item-hdr">{proj.title}</h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9.5pt] font-mono">{proj.period}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase text-t-accent-2 mb-2 print:text-[9pt] print:mb-1 print:italic">{proj.subtitle}</p>
                      <ul className="space-y-1 print:list-disc print:ml-6">
                        {proj.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-2 print:txt-body">
                            <span className="text-t-accent print:hidden mt-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="break-avoid">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-4 print:section-hdr">Education</h3>
                <div className="space-y-4 print:space-y-2">
                  {RESUME_CONTENT.education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-baseline">
                      <h4 className="text-base font-black text-t-fg print:item-hdr">{edu.title}, <span className="font-medium">{edu.subtitle}</span></h4>
                      <span className="text-[10px] font-bold text-t-fg print:text-[9.5pt] font-mono">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </section>

              <footer className="pt-24 border-t border-t-border print:hidden">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                  <p className="text-[10px] font-black text-t-fg-m font-mono uppercase tracking-[0.4em] opacity-40">
                    Neural Export Ref: VKP-2025-v7.0
                  </p>
                  <div className="flex gap-4">
                    <GlassButton accent="theme" onClick={handleDownloadFile}>Get Official CV</GlassButton>
                    <GlassButton primary accent="secondary" onClick={() => document.getElementById('contact-section-anchor')?.scrollIntoView({ behavior: 'smooth' })}>
                      Hire Vamshi
                    </GlassButton>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>
    </section>
  );
};

export default ResumeSection;