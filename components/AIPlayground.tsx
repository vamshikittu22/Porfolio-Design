
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
    setStatus('Asking Nano Banana to refine your vision...');
    try {
      const result = await gemini.generateImage(prompt, image || undefined);
      setImage(result);
    } catch (err) {
      console.error(err);
      setStatus('Failed to edit image.');
    } finally {
      setLoading(false);
      setStatus('');
    }
  };

  const handleAnimate = async () => {
    setLoading(true);
    setStatus('Veo is crafting your masterpiece (this may take 1-2 mins)...');
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
    <GlassCard className="p-8 max-w-4xl mx-auto" accent="red">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold font-display text-slate-800">AI Media Lab</h3>
          <p className="text-slate-500 mt-1">Transform your images into loops with Nano Banana & Veo</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-200 group">
              {video ? (
                <video src={video} autoPlay loop muted className="w-full h-full object-cover" />
              ) : image ? (
                <img src={image} className="w-full h-full object-cover" />
              ) : (
                <span className="text-slate-400">No media selected</span>
              )}
              
              {loading && (
                <div className="absolute inset-0 bg-white/60 glass-blur flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm font-medium text-center text-red-600">{status}</p>
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
              accent="red" 
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Initial Photo
            </GlassButton>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Prompt (Nano Banana / Veo)</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. 'Add a retro cinematic filter' or 'Make the ocean waves move softly'"
                className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <GlassButton 
                accent="red" 
                primary 
                onClick={handleEditImage} 
                disabled={loading || !prompt}
              >
                Edit Image
              </GlassButton>
              <GlassButton 
                accent="red" 
                primary 
                onClick={handleAnimate} 
                disabled={loading}
              >
                Animate (Veo)
              </GlassButton>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center">
              Powered by Gemini 2.5 Flash Image & Veo-3.1
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default AIPlayground;
