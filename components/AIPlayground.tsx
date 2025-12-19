
import React, { useState, useRef } from 'react';
import { GlassCard, GlassButton } from './GlassUI';
import { GeminiService } from '../services/geminiService';

const AIPlayground: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const gemini = GeminiService.getInstance();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setStatus('AI is processing your image request...');
    try {
      const result = await gemini.generateImage(prompt, image || undefined);
      setImage(result);
    } catch (err) {
      console.error(err);
      setStatus('Failed to generate image.');
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const handleAnimate = async () => {
    setLoading(true);
    setStatus('Veo is generating your video (this can take up to 2 minutes)...');
    try {
      const result = await gemini.generateVideo(prompt || "abstract motion, smooth loop, high quality", image || undefined);
      setVideo(result);
    } catch (err) {
      console.error(err);
      setStatus('Failed to generate video.');
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  return (
    <GlassCard className="p-12 max-w-5xl mx-auto shadow-2xl border-purple-50" accent="purple">
      <div className="flex flex-col gap-12">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-bold font-display text-slate-900 uppercase tracking-tighter">AI Studio.</h3>
          <p className="text-slate-500 font-medium tracking-tight uppercase text-xs border-t border-slate-50 pt-4 inline-block">Generate Images & Videos with Google AI</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-[32px] bg-slate-50 overflow-hidden flex items-center justify-center border border-slate-100 group shadow-inner">
              {video ? (
                <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
              ) : image ? (
                <img src={image} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center">
                    <span className="text-slate-300 text-2xl font-bold">+</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">No Media Selected</span>
                </div>
              )}
              
              {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-10 h-10 border-2 border-purple-100 border-t-purple-600 rounded-full animate-spin mb-6" />
                  <p className="text-[11px] font-bold text-purple-600 uppercase tracking-widest leading-relaxed">{status}</p>
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
              accent="purple" 
              className="w-full py-4"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Reference Image
            </GlassButton>
          </div>

          <div className="flex flex-col justify-between py-2">
            <div className="space-y-6">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Describe Your Idea</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to see. e.g. 'A futuristic city in Swiss minimalist style' or 'Cinematic mountain landscape with purple sunset'"
                className="w-full h-48 p-6 rounded-[24px] bg-slate-50 border border-slate-100 text-slate-700 font-medium text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all shadow-inner placeholder:text-slate-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <GlassButton 
                accent="purple" 
                primary 
                onClick={handleEditImage} 
                disabled={loading || !prompt}
              >
                Create Image
              </GlassButton>
              <GlassButton 
                accent="orange" 
                primary 
                onClick={handleAnimate} 
                disabled={loading}
              >
                Create Video
              </GlassButton>
            </div>
            <p className="text-[9px] font-bold text-slate-200 uppercase tracking-[0.8em] text-center mt-10">
              Powered by Google Gemini & Veo
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default AIPlayground;
