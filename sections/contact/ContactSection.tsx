import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassCard, GlassButton } from '../../components/ui/GlassUI';
import { FULL_NAME, EMAIL, LINKEDIN_URL, GITHUB_USERNAME } from '../../config/constants';
import { GeminiService } from '../../services/geminiService';

export const ContactSection: React.FC = () => {
  const [greeting, setGreeting] = useState("Connecting to portfolio...");
  const [isBlasted, setIsBlasted] = useState(false);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const gemini = GeminiService.getInstance();
        const msg = await gemini.getNeuralGreeting();
        setGreeting(msg);
      } catch {
        setGreeting("Connection established. Open for collaboration and opportunities.");
      }
    };
    fetchGreeting();
  }, []);

  const handleToggle = () => setIsBlasted(!isBlasted);

  return (
    <section id="contact-section" className="mb-24 scroll-mt-32 print:hidden relative min-h-[600px] flex items-center justify-center overflow-visible px-6">
      <ScrollReveal className="w-full flex items-center justify-center">
        {!isBlasted ? (
          <div 
            onClick={handleToggle}
            onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
            role="button"
            tabIndex={0}
            className="group cursor-pointer relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-t-accent-2 rounded-full"
            aria-label="Open contact information"
          >
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full border border-white/80 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-12px_rgba(255,255,255,0.03)] animate-pulse hover:scale-105 transition-all duration-700 flex items-center justify-center bg-white/40 dark:bg-white/10 backdrop-blur-[80px] group-hover:border-t-accent-2">
               <div className="absolute inset-[15px] rounded-full border border-white/20 pointer-events-none" />
               <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                 <div className="w-14 h-14 rounded-full bg-t-accent-2/10 border border-t-accent-2/40 text-t-accent-2 flex items-center justify-center shadow-sm transition-all group-hover:bg-t-accent-2 group-hover:text-t-bg">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                   </svg>
                 </div>
                 <div className="space-y-0.5">
                   <span className="text-[14px] font-black uppercase tracking-[0.6em] block text-t-fg pl-[0.6em]">Contact</span>
                 </div>
               </div>
               <div className="absolute inset-[-40px] border-[2.5px] border-black/80 dark:border-t-accent-2/50 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute inset-[-80px] border-[1.5px] border-black/50 dark:border-t-accent-2/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
               <div className="absolute inset-[-120px] border-[1px] border-black/30 dark:border-t-accent-2/15 rounded-full animate-[spin_45s_linear_infinite]" />
            </div>
            <p className="mt-32 text-[9px] font-black uppercase tracking-[1.5em] text-t-fg opacity-40 dark:opacity-70 group-hover:opacity-100 transition-opacity animate-bounce pl-[1.5em]">
              Contact / Send Message
            </p>
          </div>
        ) : (
          <div className="w-full max-w-[840px] animate-in zoom-in-95 fade-in duration-700 ease-out">
            <GlassCard className="p-10 lg:p-16 overflow-hidden border-white/60 relative shadow-[0_40px_120px_-20px_rgba(0,0,0,0.1)] bg-white/40 dark:bg-white/5 backdrop-blur-[64px]" accent="secondary">
              <div className="absolute top-0 right-0 p-8">
                <button 
                  onClick={handleToggle} 
                  className="w-12 h-12 rounded-full border border-t-border flex items-center justify-center hover:bg-t-accent hover:text-t-bg transition-all text-t-fg outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
                  aria-label="Close contact card"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[1em] text-t-accent-2">Contact Information</p>
                    <h2 className="text-4xl lg:text-6xl font-black font-display text-t-fg uppercase tracking-tighter leading-none">{FULL_NAME}</h2>
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-t-accent">Software Engineer</p>
                  </div>
                  <div className="space-y-2 border-l-2 border-t-accent-2/20 pl-6">
                    <p className="text-sm font-bold text-t-fg flex items-center gap-2">
                      <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      Charlotte, NC // Work Authorized
                    </p>
                    <p className="text-sm font-medium text-t-fg-m italic leading-relaxed max-w-xl">
                      "{greeting}"
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-10 pt-4">
                    <div className="space-y-2">
                      <p className="text-9px font-black uppercase tracking-[0.5em] text-t-fg opacity-40">Direct Email</p>
                      <a href={`mailto:${EMAIL}`} className="text-xl lg:text-2xl font-black text-t-fg hover:text-t-accent-2 transition-colors underline decoration-t-accent-2/30 underline-offset-8 decoration-2">{EMAIL}</a>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                   <GlassButton primary accent="secondary" className="w-full !py-6 !text-[10px]" onClick={() => window.open(LINKEDIN_URL, '_blank')}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn Profile
                   </GlassButton>
                   <GlassButton accent="secondary" className="w-full !py-6 !text-[10px]" onClick={() => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank')}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                    GitHub Portfolio
                   </GlassButton>
                   <GlassButton accent="secondary" className="w-full !py-6 !text-[10px]" onClick={() => window.print()}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download Resume
                   </GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>
        )}
      </ScrollReveal>
    </section>
  );
};

export default ContactSection;