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
              .print-only-resume { font-family: 'Times New Roman', Times, serif !important; color: black !important; }
              .section-line { border-bottom: 1.5px solid black !important; margin-bottom: 8px !important; }
              .resume-bullet { list-style-type: none !important; }
              .resume-bullet li::before { content: "– "; font-weight: bold; }
            }
          `}</style>

          <div className="print-only-resume">
            {/* Header: Name and Contact Info */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-t-border pb-10 print:border-black print:mb-6">
              <div className="space-y-4 print:space-y-1">
                <h2 className="text-4xl lg:text-6xl font-black font-display tracking-tight text-t-fg print:text-3xl print:font-bold">
                  {FULL_NAME}
                </h2>
                <div className="hidden print:block text-sm">
                   Master of Science<br/>
                   University of Central Missouri
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 text-right space-y-1 text-xs lg:text-sm font-bold text-t-fg-m print:text-black print:font-normal print:text-[11px] print:mt-0">
                <p className="flex items-center md:justify-end gap-2">
                  <span>{PHONE}</span>
                  <svg className="w-3.5 h-3.5 opacity-50 print:hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </p>
                <p className="flex items-center md:justify-end gap-2">
                  <span>{EMAIL}</span>
                  <svg className="w-3.5 h-3.5 opacity-50 print:hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </p>
                <p className="print:block">GitHub Profile</p>
                <p className="print:block">LinkedIn Profile</p>
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

            <div className="space-y-10 print:space-y-4">
              {/* EDUCATION */}
              <section>
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:text-sm print:font-bold print:tracking-normal print:mb-1">
                  Education
                </h3>
                <div className="print:section-line border-b border-t-border mb-6" />
                <div className="space-y-6 print:space-y-2">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:text-[12px] print:font-bold">• {edu.title}</h4>
                        <span className="text-[10px] font-bold text-t-accent print:text-[11px] print:text-black italic">{edu.period}</span>
                      </div>
                      <p className="text-sm italic text-t-fg-m print:text-[11px] print:text-black">{edu.subtitle}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* EXPERIENCE */}
              <section>
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:text-sm print:font-bold print:tracking-normal print:mb-1">
                  Experience
                </h3>
                <div className="print:section-line border-b border-t-border mb-6" />
                <div className="space-y-8 print:space-y-4">
                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="space-y-3 print:space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:text-[12px] print:font-bold">• {exp.subtitle}</h4>
                        <span className="text-[10px] font-bold text-t-accent print:text-[11px] print:text-black italic">{exp.location}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm italic text-t-fg-m print:text-[11px] print:text-black">{exp.title}</p>
                        <span className="text-[10px] font-medium opacity-60 print:text-[11px] print:text-black print:opacity-100">{exp.period}</span>
                      </div>
                      <ul className="mt-3 space-y-2 list-none print:mt-1 print:space-y-0.5 resume-bullet">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-3 print:text-[11px] print:leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-t-accent mt-2 flex-shrink-0 print:hidden" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* PERSONAL PROJECTS */}
              <section>
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:text-sm print:font-bold print:tracking-normal print:mb-1">
                  Personal Projects
                </h3>
                <div className="print:section-line border-b border-t-border mb-6" />
                <div className="space-y-8 print:space-y-4">
                  {PERSONAL_PROJECTS.map((proj, idx) => (
                    <div key={idx} className="space-y-2 print:space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-base font-black text-t-fg print:text-[12px] print:font-bold">• {proj.title}</h4>
                        <span className="text-[10px] font-bold text-t-accent print:text-[11px] print:text-black italic">{proj.period}</span>
                      </div>
                      <p className="text-sm italic text-t-fg-m print:text-[11px] print:text-black">{proj.subtitle}</p>
                      <ul className="mt-2 space-y-2 list-none print:mt-1 print:space-y-0.5 resume-bullet">
                        {proj.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-t-fg leading-relaxed flex items-start gap-3 print:text-[11px] print:leading-tight">
                            <span className="w-1.5 h-1.5 rounded-full bg-t-accent mt-2 flex-shrink-0 print:hidden" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* TECHNICAL SKILLS AND INTERESTS */}
              <section className="print:break-before-page">
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:text-sm print:font-bold print:tracking-normal print:mb-1">
                  Technical Skills and Interests
                </h3>
                <div className="print:section-line border-b border-t-border mb-6" />
                <div className="space-y-3 print:space-y-0.5 text-sm print:text-[11px]">
                  <p><span className="font-bold">Languages:</span> {SKILLS_RESUME.languages.join(', ')}.</p>
                  <p><span className="font-bold">Frameworks:</span> {SKILLS_RESUME.frameworks.join(', ')}.</p>
                  <p><span className="font-bold">Cloud/Databases:</span> {SKILLS_RESUME.cloud_db.join(', ')}.</p>
                  <p><span className="font-bold">Development Tools / Environment:</span> {SKILLS_RESUME.tools.join(', ')}.</p>
                  <p><span className="font-bold">Relevant Coursework:</span> {SKILLS_RESUME.coursework.join(', ')}.</p>
                  <p><span className="font-bold">Areas of Interest:</span> {SKILLS_RESUME.interests.join(', ')}.</p>
                  <p><span className="font-bold">Soft Skills:</span> {SKILLS_RESUME.soft_skills.join(', ')}.</p>
                </div>
              </section>

              {/* AWARDS & CERTIFICATIONS */}
              <section>
                <h3 className="text-sm font-black tracking-[0.3em] text-t-fg-m uppercase mb-3 print:text-sm print:font-bold print:tracking-normal print:mb-1">
                  Awards & Certifications
                </h3>
                <div className="print:section-line border-b border-t-border mb-6" />
                <div className="space-y-3 print:space-y-1">
                  {AWARDS.map((award, idx) => (
                    <div key={idx} className="flex justify-between items-baseline text-sm print:text-[11px]">
                      <p>• <span className="font-bold">{award.title}</span> {award.subtitle}</p>
                      <span className="text-[10px] italic print:text-[11px]">{award.period}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom Footer Area */}
              <footer className="pt-12 border-t border-t-border print:hidden">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                  <p className="text-xs font-bold text-t-fg-m uppercase tracking-widest opacity-60">
                    Professional Record
                  </p>
                  <div className="flex gap-4">
                    <GlassButton 
                      accent="theme" 
                      className="!px-8 !py-3 !text-[10px] !rounded-full"
                      onClick={handleDownload}
                    >
                      Download PDF
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
