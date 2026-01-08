import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassButton, GlassCard } from '../../components/ui/GlassUI';
import { 
  FULL_NAME, 
  EMAIL, 
  PHONE, 
  EDUCATION, 
  EXPERIENCE, 
  PERSONAL_PROJECTS, 
  SKILLS_RESUME, 
  AWARDS 
} from '../../config/constants';

const ResumeSection: React.FC = () => {
  const handleDownload = () => {
    window.print();
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="resume-section" className="mb-[15rem] lg:mb-[20rem] scroll-mt-32">
      <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-20">
        <GlassCard 
          className="max-w-4xl lg:max-w-5xl mx-auto px-6 lg:px-16 py-10 lg:py-20 rounded-[32px] bg-t-bg-el/80 border border-t-border shadow-2xl print:shadow-none print:border-0 print:bg-white print:max-w-none print:px-0 print:py-0 print:text-black"
          accent="theme"
        >
          {/* Official Document Style Print Overrides */}
          <style>{`
            @media print {
              body * { visibility: hidden; }
              #resume-section, #resume-section * { visibility: visible; }
              #resume-section { position: absolute; left: 0; top: 0; width: 100%; }
              .print-document { 
                font-family: 'Inter', sans-serif !important; 
                color: black !important; 
                line-height: 1.4 !important;
              }
              .section-title {
                border-bottom: 2px solid black !important;
                padding-bottom: 4px !important;
                margin-bottom: 12px !important;
                font-size: 11pt !important;
                font-weight: 800 !important;
                text-transform: uppercase !important;
                letter-spacing: 0.1em !important;
              }
              .item-header {
                font-size: 10.5pt !important;
                font-weight: 700 !important;
              }
              .item-body {
                font-size: 10pt !important;
                font-weight: 400 !important;
              }
              .page-number-footer {
                display: block !important;
                position: fixed;
                bottom: 0;
                width: 100%;
                text-align: center;
                font-size: 8pt;
                color: #666;
              }
            }
          `}</style>

          <div className="print-document">
            {/* Header: Name and Contact Info */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-t-border pb-10 print:border-black print:mb-6 print:pb-4">
              <div className="space-y-4 print:space-y-1">
                <h2 className="text-4xl lg:text-6xl font-black font-display tracking-tight text-t-fg print:text-[28pt] print:font-extrabold print:leading-none">
                  {FULL_NAME}
                </h2>
                <div className="hidden print:block text-[11pt] font-bold text-black uppercase tracking-widest">
                   Software Engineer // STEM OPT
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 text-right space-y-1 text-xs lg:text-sm font-bold text-t-fg-m print:text-black print:font-medium print:text-[9pt] print:mt-0">
                <p className="flex items-center md:justify-end gap-2">
                  <span className="print:font-bold">Phone:</span>
                  <span>{PHONE}</span>
                </p>
                <p className="flex items-center md:justify-end gap-2">
                  <span className="print:font-bold">Email:</span>
                  <span>{EMAIL}</span>
                </p>
                <p className="print:block"><span className="print:font-bold">GitHub:</span> github.com/vamshikittu22</p>
                <p className="print:block"><span className="print:font-bold">LinkedIn:</span> linkedin.com/in/vamshi-krishna-pullaiahgari/</p>
                <div className="pt-4 print:hidden">
                  <GlassButton 
                    primary 
                    accent="theme" 
                    className="!px-6 !py-3 !text-[10px] !bg-t-accent !text-black !rounded-full"
                    onClick={handleDownload}
                  >
                    Download PDF
                  </GlassButton>
                </div>
              </div>
            </header>

            <div className="space-y-10 print:space-y-6">
              {/* EXPERIENCE */}
              <section className="print-break-inside-avoid">
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:section-title">
                  Professional Experience
                </h3>
                <div className="space-y-8 print:space-y-4">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="space-y-3 print:space-y-1 print-break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:item-header">{exp.subtitle}</h4>
                        <span className="text-[10px] font-bold text-t-accent print:text-[9pt] print:text-black italic">{exp.location}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm italic text-t-fg-m print:text-[10pt] print:text-black font-semibold">{exp.title}</p>
                        <span className="text-[10px] font-medium opacity-60 print:text-[9pt] print:text-black print:opacity-100">{exp.period}</span>
                      </div>
                      <ul className="mt-3 space-y-2 list-none print:mt-1 print:space-y-1">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-3 print:item-body print:leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-t-accent mt-2 flex-shrink-0 print:hidden" />
                            <span className="hidden print:inline-block font-bold pr-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* PERSONAL PROJECTS */}
              <section className="print-break-inside-avoid">
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:section-title">
                  Selected Engineering Projects
                </h3>
                <div className="space-y-8 print:space-y-4">
                  {PERSONAL_PROJECTS.map((proj, idx) => (
                    <div key={idx} className="space-y-2 print:space-y-1 print-break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:item-header">{proj.title}</h4>
                        <span className="text-[10px] font-bold text-t-accent print:text-[9pt] print:text-black italic">{proj.period}</span>
                      </div>
                      <p className="text-sm italic text-t-fg-m print:text-[10pt] print:text-black font-semibold">{proj.subtitle}</p>
                      <ul className="mt-2 space-y-2 list-none print:mt-1 print:space-y-1">
                        {proj.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-3 print:item-body print:leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-t-accent mt-2 flex-shrink-0 print:hidden" />
                            <span className="hidden print:inline-block font-bold pr-1">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* TECHNICAL SKILLS AND INTERESTS */}
              <section className="print:print-break-before">
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:section-title">
                  Technical Infrastructure
                </h3>
                <div className="space-y-3 print:space-y-2 text-sm print:text-[10pt] print:leading-relaxed">
                  <p className="print:item-body"><span className="font-bold print:uppercase print:text-[9pt]">Languages:</span> {SKILLS_RESUME.languages.join(', ')}.</p>
                  <p className="print:item-body"><span className="font-bold print:uppercase print:text-[9pt]">Frameworks:</span> {SKILLS_RESUME.frameworks.join(', ')}.</p>
                  <p className="print:item-body"><span className="font-bold print:uppercase print:text-[9pt]">Cloud/Databases:</span> {SKILLS_RESUME.cloud_db.join(', ')}.</p>
                  <p className="print:item-body"><span className="font-bold print:uppercase print:text-[9pt]">Dev Tools:</span> {SKILLS_RESUME.tools.join(', ')}.</p>
                  <p className="print:item-body"><span className="font-bold print:uppercase print:text-[9pt]">Coursework:</span> {SKILLS_RESUME.coursework.join(', ')}.</p>
                </div>
              </section>

              {/* EDUCATION */}
              <section className="print-break-inside-avoid">
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:section-title">
                  Academic Credentials
                </h3>
                <div className="space-y-6 print:space-y-2">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="flex flex-col gap-1 print-break-inside-avoid">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:item-header">{edu.title}</h4>
                        <span className="text-[10px] font-bold text-t-accent print:text-[9pt] print:text-black italic">{edu.period}</span>
                      </div>
                      <p className="text-sm italic text-t-fg-m print:text-[10pt] print:text-black">{edu.subtitle}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* AWARDS & CERTIFICATIONS */}
              <section className="print-break-inside-avoid">
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:section-title">
                  Honors & Certifications
                </h3>
                <div className="space-y-3 print:space-y-1">
                  {AWARDS.map((award, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-sm print:text-[10pt] print-break-inside-avoid">
                      <p className="print:item-body"><span className="font-bold">{award.title}</span> – {award.subtitle}</p>
                      <span className="text-[10px] italic print:text-[9pt] font-medium">{award.period}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Print Footer Page Number */}
              <div className="hidden print:block page-number-footer">
                Vamshi Krishna Pullaiahgari — Engineering Portfolio Document
              </div>

              {/* Web Only Bottom Area */}
              <footer className="pt-12 border-t border-t-border print:hidden">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                  <p className="text-xs font-bold text-t-fg-m uppercase tracking-widest opacity-60">
                    Professional Record // End of Document
                  </p>
                  <div className="flex gap-4">
                    <GlassButton 
                      accent="theme" 
                      className="!px-8 !py-3 !text-[10px] !rounded-full"
                      onClick={handleDownload}
                    >
                      Export to PDF
                    </GlassButton>
                    <GlassButton 
                      primary 
                      accent="secondary" 
                      className="!px-8 !py-3 !text-[10px] !bg-t-accent-2 !text-black !border-none !rounded-full"
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