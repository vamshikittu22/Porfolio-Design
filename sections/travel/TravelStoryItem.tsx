import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../../components/ui/ScrollReveal';
import { GlassButton } from '../../components/ui/GlassUI';
import { BlogPost, AccentColor } from '../../config/types';
import { GeminiService } from '../../services/geminiService';

interface TravelStoryItemProps {
  post: BlogPost;
  index: number;
  accent: AccentColor;
}

export const TravelStoryItem: React.FC<TravelStoryItemProps> = ({ post, index, accent }) => {
  const isEven = index % 2 === 0;
  const [illustration, setIllustration] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showIsland, setShowIsland] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateIllustration = async () => {
    setLoading(true);
    setError(null);
    try {
      const gemini = GeminiService.getInstance();
      let specificPrompt = `Panoramic high-fidelity watercolor illustration of ${post.title}. Professional Swiss minimalist art style. Aspect ratio 16:9.`;
      if (post.id === 'rishikesh-story') {
        specificPrompt = "Panoramic hand-drawn watercolor illustration in a monochrome indigo palette. Depict the sacred Ganges river, the Ram Jhula suspension bridge, white water rafting boats, and symbolic yoga icons. Overlapping artistic elements, Swiss minimalist style, clean compositions.";
      } else if (post.id === 'coorg-story') {
        specificPrompt = "Panoramic hand-drawn watercolor illustration. Depict lush emerald coffee plantations, majestic elephants, and misty rolling hills of Coorg. Overlapping artistic elements, soft atmospheric lighting, Swiss minimalist style, serene nature.";
      }
      const img = await gemini.generateImage(specificPrompt, undefined, "16:9");
      setIllustration(img);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const paletteMap: Record<AccentColor, { bg: string, text: string, accent: string, border: string }> = {
    purple: { bg: 'bg-purple-600', text: 'text-white', accent: 'bg-purple-400', border: 'border-purple-300' },
    orange: { bg: 'bg-orange-500', text: 'text-white', accent: 'bg-orange-300', border: 'border-orange-200' },
    indigo: { bg: 'bg-indigo-600', text: 'text-white', accent: 'bg-indigo-400', border: 'border-indigo-300' },
    emerald: { bg: 'bg-emerald-600', text: 'text-white', accent: 'bg-emerald-400', border: 'border-emerald-300' },
    rose: { bg: 'bg-rose-500', text: 'text-white', accent: 'bg-rose-300', border: 'border-rose-200' },
    amber: { bg: 'bg-amber-500', text: 'text-white', accent: 'bg-amber-300', border: 'border-amber-200' }
  };

  const style = paletteMap[accent];

  return (
    <ScrollReveal className="relative w-full py-48 lg:py-64 flex items-center transition-all duration-1000 border-b border-t-border print:hidden overflow-hidden">
      {illustration && (
        <div className="absolute inset-0 z-0 animate-in fade-in duration-1000 pointer-events-none">
          <img 
            src={illustration} 
            loading="lazy"
            className="w-full h-full object-cover opacity-20 dark:opacity-10 scale-110 blur-sm transition-all duration-1000" 
            onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
            alt="" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-t-bg via-transparent to-t-bg" />
        </div>
      )}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-t-border z-[1]" />
      <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border border-t-bg z-10 ${style.bg}`} />
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 w-full items-center relative z-10 px-6 max-w-[1440px] mx-auto ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        <div className={`flex ${isEven ? 'lg:justify-end' : 'lg:order-2'}`}>
          <div className="max-w-2xl w-full">
            <div 
              onMouseEnter={() => setShowIsland(true)} 
              onMouseLeave={() => setShowIsland(false)} 
              className={`relative p-12 lg:p-16 rounded-[120px_40px_120px_40px] lg:rounded-[180px_60px_180px_60px] border shadow-2xl transition-all duration-700 cursor-pointer hover:scale-[1.02] ${style.bg} ${style.text} ${style.border}`}
            >
               <div className="flex items-center gap-6 mb-8">
                  <span className="px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.4em] bg-white/20 text-white border border-white/10">{post.date}</span>
                  <span className="text-[8px] font-black text-white/50 uppercase tracking-widest">{post.tag}</span>
               </div>
               <h3 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.75]">{post.title}.</h3>
               <p className="text-lg lg:text-xl text-white/80 font-medium leading-relaxed italic mb-12">"{post.summary}"</p>
               <GlassButton accent="white" onClick={() => window.open(post.url, '_blank')} className="w-fit">Open Journal</GlassButton>
               <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/10 blur-2xl pointer-events-none" />
               <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-black/5 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
        <div className={`flex ${isEven ? 'lg:order-2' : 'lg:justify-end'}`}>
          <div className="relative group w-full max-w-2xl aspect-[16/9] rounded-[40px_100px_40px_100px] overflow-hidden border border-t-border bg-t-bg-el/80 backdrop-blur-md shadow-2xl flex items-center justify-center">
             {!illustration && !loading && !error && (
               <div className="flex flex-col items-center gap-4 px-6 text-center">
                 <p className="text-[7px] lg:text-[8px] font-black text-t-fg-m uppercase tracking-[0.2em] opacity-40 leading-relaxed max-w-xs">Generate an AI illustration of this trip.</p>
                 <button onClick={generateIllustration} className="flex flex-col items-center gap-4 group/gen">
                   <motion.div 
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-t-border flex items-center justify-center hover:text-t-bg transition-all hover:${style.bg} shadow-lg`}
                   >
                      <motion.svg 
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </motion.svg>
                   </motion.div>
                   <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.3em] text-t-fg-m">Render AI Postcard</span>
                 </button>
               </div>
             )}
             {loading && (
               <div className="flex flex-col items-center gap-4 text-center p-8">
                 <div className={`w-10 h-10 border-4 border-t-transparent rounded-full animate-spin border-t-accent-2 mb-2`} />
                 <p className="text-[10px] font-black text-t-fg-m uppercase tracking-widest leading-loose">Processing Image...</p>
               </div>
             )}
             {illustration && (
               <>
                 <img 
                    src={illustration} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-[2000ms] group-hover:scale-110 saturate-[1.2] blur-sm" 
                    onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                    alt={post.title} 
                 />
                 {showIsland && (
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-8 lg:p-20 text-center animate-in fade-in duration-500">
                     <div className="bg-t-bg-el/95 backdrop-blur-3xl px-8 py-6 lg:px-12 lg:py-10 rounded-[48px_16px_48px_16px] border border-t-border shadow-2xl max-md:max-w-xs">
                        <p className={`text-[7px] lg:text-[8px] font-black text-t-accent-2 uppercase tracking-[0.5em] mb-4`}>Story Context</p>
                        <p className="text-sm lg:text-lg font-bold text-t-fg leading-relaxed italic line-clamp-4">"{post.summary}"</p>
                     </div>
                   </div>
                 )}
               </>
             )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

export default TravelStoryItem;