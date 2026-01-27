import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassButton, GlassCard } from '../../components/ui/GlassUI';
import { RESUME_CONTENT } from './ResumeData';
import { RESUME_PDF_URL } from '../../config/constants';

const ResumeSection: React.FC = () => {
  const handleDownload = () => {
    // Attempt direct download from the provided path
    const link = document.createElement('a');
    link.href = RESUME_PDF_URL;
    link.download = 'Vamshi_Krishna_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section-anchor');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="resume-section" className="mb-[15rem] lg:mb-[20rem] scroll-mt-32">
      <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-20">
        <GlassCard 
          className="max-w-4xl lg:max-w-5xl mx-auto px-6 lg:px-16 py-10 lg:py-20 rounded-[32px] bg-t-bg-el/80 border border-t-border shadow-2xl print:shadow-none print:border-0 print:bg-white print:max-w-none print:px-0 print:py-0 print:text-black"
          accent="theme"
        >
          {/* 
            EXECUTIVE PRINT ENGINE v4.0 
            - Resolves "Empty Page" bug by isolating visibility
            - Forces content to fit on exactly 2 pages
            - Uses high-readability Serif typography
          */}
          <style>{`
            @media print {
              @page { 
                size: letter; 
                margin: 0.4in; 
              }
              
              /* Isolation logic to prevent empty pages */
              body * { visibility: hidden; }
              #resume-section, #resume-section * { visibility: visible; }
              #resume-section { 
                position: absolute; 
                left: 0; 
                top: 0; 
                width: 100%; 
                margin: 0 !important; 
                padding: 0 !important;
                background: white !important;
                overflow: visible !important;
              }
              
              .print-doc { 
                color: black !important; 
                font-family: "Times New Roman", serif !important;
                line-height: 1.15 !important;
                background: white !important;
                width: 100% !important;
              }

              .print-hide { display: none !important; }
              
              .section-hdr {
                font-family: Arial, sans-serif !important;
                font-size: 11.5pt !important;
                font-weight: 800 !important;
                text-transform: uppercase !important;
                border-bottom: 1pt solid #000 !important;
                margin-top: 10pt !important;
                margin-bottom: 6pt !important;
                padding-bottom: 1.5pt !important;
                letter-spacing: 0.05em !important;
              }

              .item-hdr {
                font-family: Arial, sans-serif !important;
                font-size: 10.5pt !important;
                font-weight: 700 !important;
              }

              .txt-body {
                font-size: 9.5pt !important;
                color: black !important;
              }

              .bullet { margin-bottom: 1.5pt !important; }
              .break-avoid { break-inside: avoid; page-break-inside: avoid; }
            }
          `}</style>

          <div className="print-doc">
            {/* Executive Header */}
            <header className="flex flex-col items-center mb-8 text-center print:mb-4">
              <h2 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-t-fg print:text-[22pt] print:font-extrabold print:mb-1">
                {RESUME_CONTENT.name}
              </h2>
              <div className="text-sm font-bold text-t-fg print:text-[11pt] print:font-bold uppercase tracking-[0.2em]">
                {RESUME_CONTENT.role} | Overland Park, KS
              </div>
              <div className="mt-2 text-xs lg:text-sm font-medium text-t-fg-m print:text-black print:text-[9.5pt] print:mt-1 font-mono flex flex-wrap justify-center gap-2 lg:gap-4">
                <span>{RESUME_CONTENT.contact.phone}</span>
                <span className="hidden print:inline">|</span>
                <span className="font-bold underline underline-offset-2">{RESUME_CONTENT.contact.email}</span>
                <span className="hidden lg:inline print:inline">|</span>
                <span className="print:inline">LinkedIn</span>
                <span className="hidden lg:inline print:inline">|</span>
                <span className="print:inline">GitHub</span>
                <span className="hidden lg:inline print:inline">|</span>
                <span className="print:inline">Portfolio</span>
              </div>
              
              <div className="mt-8 flex gap-4 print-hide">
                <GlassButton 
                  primary 
                  accent="theme" 
                  className="!px-8 !py-3 !text-[10px]"
                  onClick={handleDownload}
                >
                  Download Original PDF
                </GlassButton>
                <GlassButton 
                  accent="theme" 
                  className="!px-8 !py-3 !text-[10px]"
                  onClick={handlePrint}
                >
                  Print View
                </GlassButton>
              </div>
            </header>

            <div className="space-y-6 print:space-y-1">
              {/* Summary */}
              <section className="break-avoid">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-2 print:section-hdr">
                  Professional Summary
                </h3>
                <p className="text-sm lg:text-base text-t-fg leading-relaxed print:txt-body">
                  {RESUME_CONTENT.summary}
                </p>
              </section>

              {/* Skills */}
              <section className="break-avoid">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-2 print:section-hdr">
                  Technical Proficiency
                </h3>
                <div className="grid grid-cols-1 gap-1 print:txt-body">
                  <p><strong>Languages:</strong> {RESUME_CONTENT.technicalInfrastructure.languages.join(', ')}</p>
                  <p><strong>Frontend:</strong> {RESUME_CONTENT.technicalInfrastructure.frontend.join(', ')}</p>
                  <p><strong>Backend:</strong> {RESUME_CONTENT.technicalInfrastructure.backend.join(', ')}</p>
                  <p><strong>Cloud & DevOps:</strong> {RESUME_CONTENT.technicalInfrastructure.cloud.join(', ')}, {RESUME_CONTENT.technicalInfrastructure.devops.join(', ')}</p>
                  <p><strong>Databases & AI:</strong> {RESUME_CONTENT.technicalInfrastructure.databases.join(', ')}, {RESUME_CONTENT.technicalInfrastructure.ai_data.join(', ')}</p>
                </div>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-hdr">
                  Professional Experience
                </h3>
                <div className="space-y-6 print:space-y-4">
                  {RESUME_CONTENT.experience.map((exp, idx) => (
                    <div key={idx} className="break-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-black text-t-fg print:item-hdr">{exp.subtitle} | <span className="italic font-medium">{exp.title}</span></h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9pt] font-mono">{exp.period}</span>
                      </div>
                      <ul className="space-y-1 print:list-disc print:ml-5">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-2 print:txt-body print:bullet">
                            <span className="text-t-accent print:hidden font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Projects */}
              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-hdr">
                  Selected Technical Projects
                </h3>
                <div className="space-y-4 print:space-y-3">
                  {RESUME_CONTENT.projects.map((proj, idx) => (
                    <div key={idx} className="break-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-black text-t-fg print:item-hdr">{proj.title}</h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9pt] font-mono">{proj.period}</span>
                      </div>
                      <p className="text-[10px] font-black uppercase text-t-accent-2 print:text-[8pt] print:mb-1">{proj.subtitle}</p>
                      <ul className="space-y-1 print:list-disc print:ml-5">
                        {proj.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-2 print:txt-body">
                            <span className="text-t-accent print:hidden font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section className="break-avoid">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-hdr">
                  Education
                </h3>
                <div className="space-y-4 print:space-y-2">
                  {RESUME_CONTENT.education.map((edu, idx) => (
                    <div key={idx} className="break-avoid">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:item-hdr">{edu.title}, <span className="font-medium">{edu.subtitle}</span></h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9pt] font-mono">{edu.period}</span>
                      </div>
                      {edu.description && edu.description.length > 0 && (
                        <p className="text-sm text-t-fg-m mt-1 print:text-[9pt] italic opacity-70">{edu.description[0]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Web Actions Footer */}
              <footer className="pt-12 border-t border-t-border print-hide">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                  <p className="text-xs font-bold text-t-fg-m font-mono uppercase tracking-widest opacity-60">
                    Official Technical Record // Q1 2025
                  </p>
                  <div className="flex gap-4">
                    <GlassButton 
                      accent="theme" 
                      className="!px-8 !py-3 !text-[10px]"
                      onClick={handleDownload}
                    >
                      Download CV
                    </GlassButton>
                    <GlassButton 
                      primary 
                      accent="secondary" 
                      className="!px-8 !py-3 !text-[10px]"
                      onClick={scrollToContact}
                    >
                      Contact Me →
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