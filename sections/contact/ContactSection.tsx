import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassCard } from '../../components/ui/GlassUI';
import { GeminiService } from '../../services/geminiService';
import { ContactHero } from './components/ContactHero';
import { ContactQuickLinks } from './components/ContactQuickLinks';
import { ContactForm } from './components/ContactForm';

type ContactTab = 'contact' | 'schedule';

export const ContactSection: React.FC = () => {
  const [isBlasted, setIsBlasted] = useState(false);
  const [activeTab, setActiveTab] = useState<ContactTab>('contact');
  const [greeting, setGreeting] = useState("Open for professional collaboration.");
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const gemini = GeminiService.getInstance();
        const msg = await gemini.getNeuralGreeting();
        setGreeting(msg);
      } catch { /* Fallback handled */ }
    };
    fetchGreeting();
  }, []);

  const handleToggle = useCallback(() => setIsBlasted(prev => !prev), []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleDownloadResumeFile = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/assets/downloads/Vamshi_Krishna_Resume.pdf';
    link.download = 'Vamshi_Krishna_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const submissionData = new FormData();
      submissionData.append("access_key", "b3cbc30f-4913-4d50-9c2c-1816e0dca271");
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("message", formData.message);
      submissionData.append("subject", `New Inquiry from ${formData.name}`);
      submissionData.append("from_name", "Portfolio Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="contact-section" className="mb-24 scroll-mt-32 print:hidden relative flex items-center justify-center overflow-visible px-4">
      <ScrollReveal className="w-full flex items-center justify-center">
        {!isBlasted ? (
          <ContactHero onToggle={handleToggle} />
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-[800px] z-50">
            <GlassCard className="p-0 overflow-hidden border-white/40 shadow-2xl bg-t-bg-el/95 backdrop-blur-[100px]" accent="secondary">

              {/* HEADER */}
              <div className="px-6 py-4 flex justify-between items-center bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-t-accent-2 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-t-fg-m opacity-60">Reach Out</span>
                </div>
                <button onClick={handleToggle} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all text-t-fg bg-white/5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* TABS */}
              <div className="px-8 pt-8 flex justify-center">
                <div className="flex bg-white/[0.04] p-1 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'contact' ? 'bg-t-accent-2 text-t-bg shadow-lg' : 'text-t-fg-m hover:text-t-fg hover:bg-white/5'}`}
                  >
                    Quick Links
                  </button>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'schedule' ? 'bg-t-accent-2 text-t-bg shadow-lg' : 'text-t-fg-m hover:text-t-fg hover:bg-white/5'}`}
                  >
                    Direct Message
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-8 lg:p-12">
                <div className="grid md:grid-cols-[0.4fr_0.6fr] gap-12 items-start">

                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-black font-display text-t-fg uppercase tracking-tighter leading-[0.85] mb-1">VAMSHI KRISHNA</h2>
                      <h2 className="text-3xl lg:text-4xl font-black font-display text-t-accent uppercase tracking-tighter leading-[0.85]">PULLAIAHGARI</h2>
                      <div className="mt-4 flex flex-col gap-1 text-[9px] font-bold text-t-fg-m opacity-50 uppercase tracking-widest">
                        <p>Software Engineer</p>
                        <p>F-1 OPT Student with OPT EAD Work Authorization</p>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl border-l-2 border-t-accent-2/30 bg-white/[0.02]">
                      <p className="text-[11px] font-bold text-t-fg-m opacity-70 tracking-wide leading-relaxed italic">
                        “{greeting}”
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 lg:p-8 min-h-[320px] flex flex-col">
                    <AnimatePresence mode="wait">
                      {activeTab === 'contact' ? (
                        <ContactQuickLinks
                          onDownloadResume={handleDownloadResumeFile}
                        />
                      ) : (
                        <ContactForm
                          status={status}
                          formData={formData}
                          onInputChange={handleInputChange}
                          onSubmit={handleSubmit}
                          onRetry={() => setStatus('idle')}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-white/5 border-t border-white/10 text-center">
                <p className="text-[7px] font-black uppercase tracking-[1em] text-t-fg-m opacity-30">Vamshi Krishna Pullaiahgari</p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </ScrollReveal>
    </section>
  );
};

export default ContactSection;