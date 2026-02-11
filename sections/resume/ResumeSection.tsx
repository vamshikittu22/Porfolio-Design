import React from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassCard } from '../../components/ui/GlassUI';
import { RESUME_CONTENT } from './data/ResumeData';
import { ResumeHeader } from './components/ResumeHeader';
import { ResumeSkills } from './components/ResumeSkills';
import { ResumeExperience } from './components/ResumeExperience';
import { ResumeProjects } from './components/ResumeProjects';
import { ResumeEducation } from './components/ResumeEducation';
import { ResumeFooter } from './components/ResumeFooter';

const ResumeSection: React.FC = () => {
  const RESUME_FILE_PATH = '/assets/downloads/Vamshi_Krishna_Resume.pdf';

  const handleDownloadFile = () => {
    const link = document.createElement('a');
    link.href = RESUME_FILE_PATH;
    link.download = 'Vamshi_Krishna_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintSnapshot = () => {
    window.print();
  };

  return (
    <section id="resume-section" className="mb-[15rem] lg:mb-[20rem] scroll-mt-32">
      <ScrollReveal className="max-w-7xl mx-auto px-6 lg:px-20">
        <GlassCard
          className="max-w-4xl lg:max-w-5xl mx-auto px-8 lg:px-20 py-12 lg:py-24 rounded-[40px] bg-t-bg-el/90 border border-t-border shadow-2xl print:shadow-none print:border-0 print:bg-white print:max-w-none print:px-0 print:py-0 print:text-black"
          accent="theme"
        >
          {/* Print specific CSS overrides */}
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
            <ResumeHeader
              onDownload={handleDownloadFile}
              onPrint={handlePrintSnapshot}
            />

            <div className="space-y-8 print:space-y-2">
              <section className="break-avoid">
                <h3 className="text-sm font-black tracking-[0.2em] text-t-fg uppercase mb-3 print:section-hdr">Professional Summary</h3>
                <p className="text-base text-t-fg leading-relaxed print:txt-body">{RESUME_CONTENT.summary}</p>
              </section>

              <ResumeSkills />
              <ResumeExperience />
              <ResumeProjects />
              <ResumeEducation />
              <ResumeFooter onDownload={handleDownloadFile} />
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>
    </section>
  );
};

export default ResumeSection;
