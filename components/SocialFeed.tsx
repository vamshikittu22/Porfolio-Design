
import React, { useState, useEffect } from 'react';
import { GlassCard, BubbleTag } from './GlassUI';
import { SOCIAL_POSTS } from '../constants';

const SocialFeed: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay for Instagram and X
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative group">
      <div className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x px-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <GlassCard key={i} className="flex-shrink-0 w-80 snap-center p-6 space-y-4 animate-pulse">
              <div className="aspect-square bg-slate-100 rounded-xl" />
              <div className="h-4 bg-slate-100 rounded w-1/2" />
              <div className="h-3 bg-slate-100 rounded w-full" />
              <div className="h-3 bg-slate-100 rounded w-2/3" />
            </GlassCard>
          ))
        ) : (
          SOCIAL_POSTS.map((post) => (
            <GlassCard 
              key={post.id} 
              className="flex-shrink-0 w-80 snap-center overflow-hidden flex flex-col"
              accent={post.platform === 'instagram' ? 'red' : 'blue'}
            >
              {post.imageUrl && (
                <div className="aspect-square w-full overflow-hidden">
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
                    <BubbleTag accent={post.platform === 'instagram' ? 'red' : 'blue'}>
                      {post.platform === 'instagram' ? 'Instagram' : 'X'}
                    </BubbleTag>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{post.date}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {post.content}
                </p>
                <div className="pt-4 border-t border-slate-50">
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-black text-slate-900 flex items-center justify-between hover:translate-x-1 transition-transform"
                  >
                    View Original {post.platform === 'instagram' ? 'Post' : 'Tweet'}
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
      
      {/* Decorative Gradient Shadows for Horizontal Scroll */}
      <div className="absolute left-0 top-0 bottom-12 w-20 bg-gradient-to-r from-[#fcfcfc] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-[#fcfcfc] to-transparent pointer-events-none" />
    </div>
  );
};

export default SocialFeed;
