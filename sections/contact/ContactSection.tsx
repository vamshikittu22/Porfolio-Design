
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassCard, GlassButton } from '../../components/ui/GlassUI';
import { EMAIL, LINKEDIN_URL } from '../../config/constants';
import { GeminiService } from '../../services/geminiService';

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

  const handleToggle = () => setIsBlasted(!isBlasted);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
        // Return to idle after 5 seconds to allow fresh submission if needed
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

  // Fix: Explicitly typed the easing array as any to satisfy Framer Motion Variants type inference
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
          <div 
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            className="group cursor-pointer relative flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-t-accent-2 rounded-full"
            aria-label="Open contact information"
          >
            <div className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full border border-white/80 shadow-xl animate-pulse hover:scale-105 transition-all duration-700 flex items-center justify-center bg-white/40 dark:bg-white/10 backdrop-blur-[80px] group-hover:border-t-accent-2">
               <div className="absolute inset-[15px] rounded-full border border-white/20 pointer-events-none" />
               <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                 <div className="w-14 h-14 rounded-full bg-t-accent-2/10 border border-t-accent-2/40 text-t-accent-2 flex items-center justify-center shadow-sm transition-all group-hover:bg-t-accent-2 group-hover:text-t-bg">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                 </div>
                 <span className="text-[14px] font-black uppercase tracking-[0.6em] block text-t-fg pl-[0.6em]">Contact</span>
               </div>
               <div className="absolute inset-[-40px] border-[2.5px] border-black/80 dark:border-t-accent-2/50 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute inset-[-80px] border-[1.5px] border-black/50 dark:border-t-accent-2/30 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
               <div className="absolute inset-[-120px] border-[1px] border-black/30 dark:border-t-accent-2/15 rounded-full animate-[spin_45s_linear_infinite]" />
            </div>
            {/* Minimalistic CTA instead of redundant version text */}
            <p className="mt-32 text-[9px] font-black uppercase tracking-[1.5em] text-t-fg opacity-40 group-hover:opacity-100 transition-opacity animate-bounce pl-[1.5em]">Click to Engage</p>
          </div>
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
                        <p>Charlotte, NC · STEM OPT</p>
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
                        <motion.div 
                          key="contact"
                          initial={{ opacity: 0, x: 10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          exit={{ opacity: 0, x: -10 }}
                          className="space-y-4"
                        >
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-t-accent-2 mb-4">Channels</p>
                          <ContactNode 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>}
                            label="Email"
                            value={EMAIL}
                            onClick={() => window.open(`mailto:${EMAIL}`)}
                          />
                          <ContactNode 
                            icon={<svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
                            label="LinkedIn"
                            value="Professional Network"
                            onClick={() => window.open(LINKEDIN_URL, '_blank')}
                          />
                          <ContactNode 
                            icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>}
                            label="Resume"
                            value="Download PDF"
                            onClick={() => window.print()}
                          />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="schedule"
                          initial={{ opacity: 0, x: 10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          exit={{ opacity: 0, x: -10 }}
                          className="flex flex-col h-full"
                        >
                          <AnimatePresence mode="wait">
                            {status === 'success' ? (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/40">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-t-fg">Request Sent</p>
                                <p className="text-[8px] text-t-fg-m opacity-60">I will review and respond shortly.</p>
                              </motion.div>
                            ) : status === 'error' ? (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center border border-rose-500/40">
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6" /></svg>
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Service Interrupted</p>
                                <button onClick={() => setStatus('idle')} className="text-[8px] font-bold uppercase tracking-widest underline opacity-60 hover:opacity-100">Try Again</button>
                              </motion.div>
                            ) : (
                              <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black uppercase tracking-widest text-t-accent ml-1">Identity</label>
                                  <input required name="name" placeholder="Name or Organization" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-t-fg text-xs focus:border-t-accent-2 outline-none transition-all" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black uppercase tracking-widest text-t-accent ml-1">Callback Path</label>
                                  <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-t-fg text-xs focus:border-t-accent-2 outline-none transition-all" />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[8px] font-black uppercase tracking-widest text-t-accent ml-1">Inquiry Specs</label>
                                  <textarea required name="message" rows={2} placeholder="Message body..." value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-t-fg text-xs focus:border-t-accent-2 outline-none transition-all resize-none" />
                                </div>
                                <GlassButton primary accent="secondary" className="w-full !py-3 !rounded-xl !text-[10px]" disabled={status === 'submitting'}>
                                  {status === 'submitting' ? 'SENDING...' : 'SUBMIT REQUEST'}
                                </GlassButton>
                              </form>
                            )}
                          </AnimatePresence>
                        </motion.div>
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

const ContactNode: React.FC<{ icon: React.ReactNode; label: string; value: string; onClick: () => void }> = ({ icon, label, value, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-t-accent-2 hover:bg-white/[0.08] transition-all text-left group">
    <div className="w-10 h-10 rounded-xl bg-t-accent-2/10 flex items-center justify-center text-t-accent-2 group-hover:bg-t-accent-2 group-hover:text-t-bg transition-all">
      {icon}
    </div>
    <div className="flex flex-col overflow-hidden">
      <span className="text-[8px] font-black uppercase tracking-widest text-t-fg opacity-40 group-hover:opacity-100 transition-opacity">{label}</span>
      <span className="text-xs font-bold text-t-fg truncate">{value}</span>
    </div>
  </button>
);

export default ContactSection;
