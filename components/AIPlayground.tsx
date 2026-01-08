
import React, { useState, useRef, useEffect } from 'react';
import { GlassCard, GlassButton } from './GlassUI';
import { GeminiService } from '../services/geminiService';
import { PHYSICAL_FALLBACKS } from '../config/constants';

const AIPlayground: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const gemini = GeminiService.getInstance();

  useEffect(() => {
    let timer: number;
    if (cooldown > 0) {
      timer = window.setInterval(() => {
        setCooldown(prev => Math.max(0, prev - 1));
      }, 1000);
    } else if (gemini.isQuotaLocked()) {
      setCooldown(gemini.getLockTimeRemaining());
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = async () => {
    if (!prompt || cooldown > 0) return;
    setLoading(true);
    setError(null);
    setStatus('Generating your image study...');
    try {
      const result = await gemini.generateImage(prompt, image || undefined, "16:9", PHYSICAL_FALLBACKS.AI_LAB_GENERIC);
      setImage(result);
      setStatus('');
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("QUOTA_EXCEEDED")) {
        setCooldown(gemini.getLockTimeRemaining() || 60);
      }
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const handleAnimate = async () => {
    if (cooldown > 0) return;
    setLoading(true);
    setError(null);
    setStatus('Generating cinematic video (approx. 2 mins)...');
    try {
      const result = await gemini.generateVideo(prompt || "abstract motion, smooth loop, high quality", image || undefined);
      setVideo(result);
      setStatus('');
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("QUOTA_EXCEEDED")) {
        setCooldown(gemini.getLockTimeRemaining() || 120);
      }
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  const isQuotaError = error?.includes("QUOTA_EXCEEDED") || cooldown > 0;

  return (
    <GlassCard className="p-10 max-w-5xl mx-auto shadow-2xl border-t-accent-2/20" accent="secondary">
      <div className="flex flex-col gap-10">
        <div className="text-center space-y-3">
          <h3 className="text-4xl font-black font-display text-t-fg uppercase tracking-tighter">AI Lab.</h3>
          <p className="text-t-fg-m font-bold tracking-[0.4em] uppercase text-[9px] border-t border-t-border pt-4 inline-block">Generative Design Experiments</p>
        </div>

        {error && (
          <div className={`p-6 rounded-2xl border ${error.includes("QUOTA_EXCEEDED") ? 'bg-amber-500/10 border-amber-500/30' : 'bg-rose-500/10 border-rose-500/30'} animate-in fade-in slide-in-from-top-4 duration-500`}>
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${error.includes("QUOTA_EXCEEDED") ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-t-fg mb-1">
                  {error.includes("QUOTA_EXCEEDED") ? 'System Cooling Down' : 'Connection Error'}
                </p>
                <p className="text-sm font-bold text-t-fg-m leading-relaxed">{error.replace("QUOTA_EXCEEDED: ", "")}</p>
              </div>
              <button onClick={() => setError(null)} className="text-t-fg-m hover:text-t-fg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <div className="relative aspect-video rounded-[40px] bg-t-bg-el overflow-hidden flex items-center justify-center border border-t-border group shadow-inner">
              {video ? (
                <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
              ) : image ? (
                <img src={image} className="w-full h-full object-cover" alt="AI Generated Study" />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-dashed border-t-accent-2/20 flex items-center justify-center">
                    <span className="text-t-accent-2/40 text-2xl font-bold">+</span>
                  </div>
                  <span className="text-[10px] font-black text-t-fg-m uppercase tracking-[0.4em] opacity-40">Ready for Input</span>
                </div>
              )}
              
              {loading && (
                <div className="absolute inset-0 bg-t-bg-el/90 backdrop-blur-3xl flex flex-col items-center justify-center p-10 text-center z-20">
                  <div className="w-12 h-12 border-4 border-t-accent-2-s border-t-t-accent-2 rounded-full animate-spin mb-6" />
                  <p className="text-xs font-black text-t-accent-2 uppercase tracking-[0.4em] leading-relaxed">{status}</p>
                </div>
              )}

              {cooldown > 0 && !loading && (
                <div className="absolute inset-0 bg-t-bg-el/40 backdrop-blur-sm flex flex-col items-center justify-center p-10 text-center z-10">
                   <div className="bg-amber-500/90 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Limit Reached: {cooldown}s
                   </div>
                </div>
              )}
            </div>

            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
            />
            <GlassButton 
              accent="secondary" 
              className="w-full py-3"
              onClick={() => fileInputRef.current?.click()}
              disabled={cooldown > 0}
            >
              Upload Reference Image
            </GlassButton>
          </div>

          <div className="flex flex-col justify-between py-2">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-t-fg-m uppercase tracking-[0.4em]">Describe your Vision</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={cooldown > 0}
                placeholder={cooldown > 0 ? "System is cooling down..." : "Describe what you want to generate... e.g. 'A futuristic sustainable city in high resolution'"}
                className="w-full h-48 p-6 rounded-3xl bg-t-bg-el border border-t-border text-t-fg font-bold text-sm focus:ring-4 focus:ring-t-accent-2/20 focus:border-t-accent-2 outline-none resize-none transition-all shadow-inner disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <GlassButton 
                accent="secondary" 
                primary 
                onClick={handleEditImage} 
                disabled={loading || !prompt || cooldown > 0}
              >
                {cooldown > 0 ? `Backoff ${cooldown}s` : 'Generate Image'}
              </GlassButton>
              <GlassButton 
                accent="secondary" 
                primary 
                onClick={handleAnimate} 
                disabled={loading || cooldown > 0}
              >
                {cooldown > 0 ? `Backoff ${cooldown}s` : 'Generate Video'}
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default AIPlayground;
