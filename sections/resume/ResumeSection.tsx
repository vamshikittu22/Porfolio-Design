import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassButton, GlassCard } from '../../components/ui/GlassUI';
import { RESUME_CONTENT } from './ResumeData';

const ResumeSection: React.FC = () => {
  const handleDownload = () => {
    // The print engine handles PDF conversion for the user
    // We provide a high-fidelity @media print stylesheet for the correct layout
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
          {/* Professional Resume Print Overrides - 1:1 match with provided screenshots */}
          <style>{`
            @media print {
              @page { margin: 0.5in; }
              body * { visibility: hidden; }
              #resume-section, #resume-section * { visibility: visible; }
              #resume-section { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
              .print-document { 
                font-family: 'Times New Roman', serif !important; 
                color: black !important; 
                line-height: 1.15 !important;
                background: white !important;
              }
              .section-title {
                border-bottom: 1px solid #333 !important;
                padding-bottom: 2px !important;
                margin-top: 12px !important;
                margin-bottom: 6px !important;
                font-size: 11pt !important;
                font-family: sans-serif !important;
                font-weight: 800 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.05em !important;
              }
              .item-header {
                font-family: sans-serif !important;
                font-size: 10.5pt !important;
                font-weight: 700 !important;
              }
              .item-body {
                font-size: 10pt !important;
                font-weight: 400 !important;
              }
              .skill-label {
                font-weight: 700 !important;
                font-family: sans-serif !important;
                font-size: 9.5pt !important;
              }
              .page-number-footer { display: none; }
              .print-hide { display: none !important; }
            }
          `}</style>

          <div className="print-document">
            {/* Header: Centered layout matching screenshots */}
            <header className="flex flex-col items-center mb-6 text-center print:mb-4">
              <h2 className="text-4xl lg:text-5xl font-black font-display tracking-tight text-t-fg print:text-[20pt] print:font-extrabold print:leading-none print:mb-1">
                {RESUME_CONTENT.name}
              </h2>
              <div className="text-sm font-bold text-t-fg print:text-[10pt] print:font-medium uppercase tracking-widest">
                {RESUME_CONTENT.role} | Overland Park, KS
              </div>
              <div className="mt-2 text-xs lg:text-sm font-medium text-t-fg-m print:text-black print:text-[9pt] print:mt-1 font-mono flex flex-wrap justify-center gap-2 lg:gap-4">
                <span>{RESUME_CONTENT.contact.phone}</span>
                <span className="hidden print:inline">|</span>
                <span className="font-bold underline underline-offset-2">{RESUME_CONTENT.contact.email}</span>
                <span className="hidden lg:inline print:inline">|</span>
                <span className="print:inline">LinkedIn</span>
                <span className="hidden print:inline">|</span>
                <span className="print:inline">GitHub</span>
                <span className="hidden print:inline">|</span>
                <span className="print:inline">Portfolio</span>
              </div>
              
              <div className="mt-6 print-hide">
                <GlassButton 
                  primary 
                  accent="theme" 
                  className="!px-6 !py-3 !text-[10px]"
                  onClick={handleDownload}
                >
                  Download PDF
                </GlassButton>
              </div>
            </header>

            <div className="space-y-6 print:space-y-4">
              {/* PROFESSIONAL SUMMARY */}
              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-2 print:section-title">
                  Professional Summary
                </h3>
                <p className="text-sm lg:text-base text-t-fg leading-relaxed print:text-[10pt] print:leading-tight">
                  {RESUME_CONTENT.summary}
                </p>
              </section>

              {/* TECHNICAL SKILLS */}
              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-2 print:section-title">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 gap-1 text-sm print:text-[9pt] print:leading-normal">
                  <p><span className="skill-label">Languages:</span> {RESUME_CONTENT.technicalInfrastructure.languages.join(', ')}</p>
                  <p><span className="skill-label">Frontend:</span> {RESUME_CONTENT.technicalInfrastructure.frontend.join(', ')}</p>
                  <p><span className="skill-label">Backend:</span> {RESUME_CONTENT.technicalInfrastructure.backend.join(', ')}</p>
                  <p><span className="skill-label">AI/Data:</span> {RESUME_CONTENT.technicalInfrastructure.ai_data.join(', ')}</p>
                  <p><span className="skill-label">Databases:</span> {RESUME_CONTENT.technicalInfrastructure.databases.join(', ')}</p>
                  <p><span className="skill-label">Cloud:</span> {RESUME_CONTENT.technicalInfrastructure.cloud.join(', ')}</p>
                  <p><span className="skill-label">DevOps:</span> {RESUME_CONTENT.technicalInfrastructure.devops.join(', ')}</p>
                  <p><span className="skill-label">Testing:</span> {RESUME_CONTENT.technicalInfrastructure.testing.join(', ')}</p>
                </div>
              </section>

              {/* PROFESSIONAL EXPERIENCE */}
              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-title">
                  Professional Experience
                </h3>
                <div className="space-y-6 print:space-y-3">
                  {RESUME_CONTENT.experience.map((exp, idx) => (
                    <div key={idx} className="print-break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-black text-t-fg print:item-header">{exp.subtitle} | <span className="font-medium italic">{exp.title}</span></h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9pt] font-mono">{exp.period} | {exp.location}</span>
                      </div>
                      <ul className="space-y-1 list-none">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-2 print:text-[9.5pt] print:leading-tight">
                            <span className="text-t-accent print:text-black font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECTS */}
              <section className="print-break-before">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-title">
                  Projects
                </h3>
                <div className="space-y-6 print:space-y-3">
                  {RESUME_CONTENT.projects.map((proj, idx) => (
                    <div key={idx} className="print-break-inside-avoid">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-base font-black text-t-fg print:item-header">{proj.title}</h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9pt] font-mono">{proj.period}</span>
                      </div>
                      <p className="text-[10px] font-bold uppercase text-t-accent-2 print:text-[8pt] print:mb-1">{proj.subtitle}</p>
                      <ul className="space-y-1 list-none">
                        {proj.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-2 print:text-[9.5pt] print:leading-tight">
                            <span className="text-t-accent print:text-black font-bold">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-title">
                  Education
                </h3>
                <div className="space-y-4 print:space-y-2">
                  {RESUME_CONTENT.education.map((edu, idx) => (
                    <div key={idx} className="print-break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:item-header">{edu.title}, <span className="font-medium">{edu.subtitle}</span></h4>
                        <span className="text-[10px] font-bold text-t-fg print:text-[9pt] font-mono">{edu.period}</span>
                      </div>
                      {edu.description && edu.description.length > 0 && (
                        <p className="text-sm text-t-fg-m mt-1 print:text-[9pt] print:leading-tight opacity-70 italic">{edu.description[0]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Web Only Bottom Area */}
              <footer className="pt-12 border-t border-t-border print-hide">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                  <p className="text-xs font-bold text-t-fg-m font-mono uppercase tracking-widest opacity-60">
                    Technical Record // Optimized for Export
                  </p>
                  <div className="flex gap-4">
                    <GlassButton 
                      accent="theme" 
                      className="!px-8 !py-3 !text-[10px]"
                      onClick={handleDownload}
                    >
                      Export to PDF
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