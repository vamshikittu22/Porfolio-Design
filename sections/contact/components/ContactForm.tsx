import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassButton } from '../../../components/ui/GlassUI';

interface ContactFormProps {
    status: 'idle' | 'submitting' | 'success' | 'error';
    formData: { name: string; email: string; message: string };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onRetry: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
    status,
    formData,
    onInputChange,
    onSubmit,
    onRetry
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col h-full"
        >
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/40">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-t-fg">Request Sent</p>
                        <p className="text-[8px] text-t-fg-m opacity-60">I will review and respond shortly.</p>
                    </motion.div>
                ) : status === 'error' ? (
                    <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center border border-rose-500/40">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6" /></svg>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Service Interrupted</p>
                        <button type="button" onClick={onRetry} className="text-[8px] font-bold uppercase tracking-widest underline opacity-60 hover:opacity-100">Try Again</button>
                    </motion.div>
                ) : (
                    <form key="form" onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-widest text-t-accent ml-1">Identity</label>
                            <input required name="name" placeholder="Name or Organization" value={formData.name} onChange={onInputChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-t-fg text-xs focus:border-t-accent-2 outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-widest text-t-accent ml-1">Callback Path</label>
                            <input required type="email" name="email" placeholder="Email Address" value={formData.email} onChange={onInputChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-t-fg text-xs focus:border-t-accent-2 outline-none transition-all" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-widest text-t-accent ml-1">Inquiry Specs</label>
                            <textarea required name="message" rows={2} placeholder="Message body..." value={formData.message} onChange={onInputChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-t-fg text-xs focus:border-t-accent-2 outline-none transition-all resize-none" />
                        </div>
                        <GlassButton primary accent="secondary" className="w-full !py-3 !rounded-xl !text-[10px]" disabled={status === 'submitting'}>
                            {status === 'submitting' ? 'SENDING...' : 'SUBMIT REQUEST'}
                        </GlassButton>
                    </form>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
