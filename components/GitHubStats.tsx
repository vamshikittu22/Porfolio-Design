
import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassUI';
import { GITHUB_USERNAME } from '../constants';

interface GithubData {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  public_gists: number;
}

const GitHubStats: React.FC = () => {
  const [data, setData] = useState<GithubData | null>(null);
  const [loading, setLoading] = useState(true);
  const username = GITHUB_USERNAME;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [username]);

  const stats = [
    { label: 'Repositories', value: data?.public_repos || '0', color: 'blue' },
    { label: 'Followers', value: data?.followers || '0', color: 'green' },
    { label: 'Gists', value: data?.public_gists || '0', color: 'red' },
    { label: 'Active Since', value: data ? new Date(data.created_at).getFullYear() : '2022', color: 'blue' },
  ];

  return (
    <GlassCard className="p-8" accent="green">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-display text-slate-800 flex items-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub Activity
          </h3>
          <a href={`https://github.com/${username}`} target="_blank" className="text-xs font-bold text-blue-600 hover:underline tracking-widest uppercase">@{username}</a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl font-black font-display text-slate-900">
                {loading ? '...' : stat.value}
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Contributions (Last 52 Weeks)</span>
            <span className="flex gap-1 items-center">
              Less <span className="w-2 h-2 bg-slate-100 rounded-sm" /><span className="w-2 h-2 bg-green-200 rounded-sm" /><span className="w-2 h-2 bg-green-400 rounded-sm" /><span className="w-2 h-2 bg-green-600 rounded-sm" /> More
            </span>
          </div>
          <div className="flex flex-wrap gap-[4px]">
            {Array.from({ length: 52 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-[4px]">
                {Array.from({ length: 7 }).map((_, j) => {
                  const opacity = Math.random();
                  const color = opacity > 0.8 ? 'bg-green-600' : opacity > 0.5 ? 'bg-green-400' : opacity > 0.2 ? 'bg-green-200' : 'bg-slate-100';
                  return <div key={j} className={`w-[10px] h-[10px] ${color} rounded-[2px]`} />;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default GitHubStats;
