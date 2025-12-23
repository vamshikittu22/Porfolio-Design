import React, { useState, useEffect } from 'react';
import { GlassCard, BubbleTag } from './GlassUI';
import { SOCIAL_POSTS, INSTAGRAM_HANDLE, X_HANDLE } from '../constants';
import { SocialPost } from '../types';
import { SocialService } from '../services/socialService';

const SocialFeed: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const socialService = SocialService.getInstance();
  const isLive = socialService.hasKeysConfigured();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (isLive) {
          // Attempt real fetches if keys are set
          const ig = await socialService.fetchInstagramPosts();
          const x = await socialService.fetchXPosts();
          setPosts([...ig, ...x]);
        } else {
          // Fallback to high-fidelity simulation
          await new Promise(resolve => setTimeout(resolve, 1500));
          setPosts(SOCIAL_POSTS);
        }
      } catch (err) {
        console.error("Social load failed, falling back to mock:", err);
        setPosts(SOCIAL_POSTS);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [isLive]);

  return (
    <div className="relative group">
      {/* API Key Status Info Bar */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col items-center gap-4">
        <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 border ${isLive ? 'bg-green-50 border-green-100 text-green-600' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${isLive ? 'bg-green-400' : 'bg-blue-400'}`} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            {isLive ? 'Live API Connection Active' : 'Simulation Mode: No API Keys Detected'}
          </span>
        </div>
        
        {!isLive && (
          <p className="text-[11px] text-slate-400 max-w-md text-center leading-relaxed font-medium">
            To enable real-time fetching, configure your <span className="text-slate-600 font-bold">Client Secrets</span> in a secure backend environment. Direct browser-to-API calls are often blocked by CORS policies.
          </p>
        )}
      </div>

      <div className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x px-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <GlassCard key={i} className="flex-shrink-0 w-80 snap-center p-6 space-y-4 animate-pulse">
              <div className="aspect-square bg-slate-100 rounded-xl" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </GlassCard>
          ))
        ) : (
          posts.map((post) => (
            // Fix: Replaced invalid 'red' and 'blue' accents with valid 'rose' and 'indigo'
            <GlassCard 
              key={post.id} 
              className="flex-shrink-0 w-80 snap-center overflow-hidden flex flex-col"
              accent={post.platform === 'instagram' ? 'rose' : 'indigo'}
            >
              {post.imageUrl && (
                <div className="aspect-square w-full overflow-hidden relative">
                   <div className="absolute top-3 left-3 z-10">
                     <div className={`p-1.5 rounded-lg backdrop-blur-md border border-white/20 ${post.platform === 'instagram' ? 'bg-red-500/80' : 'bg-blue-400/80'}`}>
                        {post.platform === 'instagram' ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        )}
                     </div>
                   </div>
                  <img 
                    src={post.imageUrl} 
                    alt="Social post" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${post.platform === 'instagram' ? 'bg-red-500' : 'bg-blue-400'}`} />
                    {/* Fix: Replaced invalid 'red' and 'blue' accents with valid 'rose' and 'indigo' */}
                    <BubbleTag accent={post.platform === 'instagram' ? 'rose' : 'indigo'}>
                      @{post.platform === 'instagram' ? INSTAGRAM_HANDLE : X_HANDLE}
                    </BubbleTag>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{post.date}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 italic">
                  "{post.content}"
                </p>
                <div className="pt-4 border-t border-slate-50">
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-black text-slate-900 flex items-center justify-between hover:translate-x-1 transition-transform"
                  >
                    {post.platform === 'instagram' ? 'View Original' : 'Read on X'}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
      
      {/* Decorative Gradient Shadows */}
      <div className="absolute left-0 top-0 bottom-12 w-20 bg-gradient-to-r from-[#fcfcfc] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-[#fcfcfc] to-transparent pointer-events-none" />
    </div>
  );
};

export default SocialFeed;