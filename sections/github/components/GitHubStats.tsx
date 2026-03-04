import React, { useState, useEffect } from 'react';
import { GlassCard } from '../../../components/ui/GlassUI';
import { GITHUB_USERNAME } from '../../../config/constants';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
interface GithubUser {
  avatar_url: string;
  created_at: string;
  public_repos: number;
  followers: number;
  login: string;
}

interface YearStats {
  year: number;
  count: number;
}

// --- CONFIGURATION ---
const YEAR_LABELS: Record<number, string> = {
  2026: "Planning next-gen AI architectures and Gemini 3.0 experiments.",
  2025: "228 contributions across 5 repositories — most active year.",
  2024: "Academic focus: Master's degree + Event Node Pro.",
  2023: "Enterprise backend services at Mphasis."
};

const FALLBACK_STATS: YearStats[] = [
  { year: 2026, count: 32 },
  { year: 2025, count: 228 },
  { year: 2024, count: 14 }
];

const GitHubStats: React.FC = () => {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [yearlyStats, setYearlyStats] = useState<YearStats[]>([]);
  const [latestActivityDate, setLatestActivityDate] = useState<string>("Syncing...");
  const [loading, setLoading] = useState(true);
  const [usingLiveData, setUsingLiveData] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(2025);

  const username = GITHUB_USERNAME;

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = process.env.GITHUB_TOKEN ||
          process.env.VITE_GITHUB_TOKEN ||
          process.env.REACT_APP_GITHUB_TOKEN;

        const headers: HeadersInit = { 'Accept': 'application/vnd.github.v3+json' };
        if (token) {
          headers['Authorization'] = `bearer ${token}`;
        } else {
          throw new Error("No Token");
        }

        const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userRes.ok) throw new Error('GitHub API Error');
        const userData = await userRes.json();
        setUser(userData);

        const query = {
          query: `
            query {
              user(login: "${username}") {
                y2026: contributionsCollection(from: "2026-01-01T00:00:00Z", to: "2026-12-31T23:59:59Z") {
                  contributionCalendar { totalContributions }
                }
                y2025: contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
                  contributionCalendar { totalContributions }
                }
                y2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
                  contributionCalendar { totalContributions }
                }
              }
            }
          `
        };

        const graphRes = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify(query),
        });

        if (!graphRes.ok) throw new Error("GraphQL Error");
        const graphData = await graphRes.json();
        const userStats = graphData.data?.user;

        if (userStats) {
          setYearlyStats([
            { year: 2026, count: userStats.y2026.contributionCalendar.totalContributions },
            { year: 2025, count: userStats.y2025.contributionCalendar.totalContributions },
            { year: 2024, count: userStats.y2024.contributionCalendar.totalContributions },
          ]);
          setUsingLiveData(true);
        } else {
          throw new Error("Invalid GraphQL Data");
        }

        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`, { headers });
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          const lastPush = events.find((e: any) => e.type === 'PushEvent');
          setLatestActivityDate(lastPush
            ? new Date(lastPush.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
            : "Mar 2026"
          );
        }
      } catch {
        setUser({
          avatar_url: `https://github.com/${username}.png`,
          login: username,
          public_repos: 23,
          followers: 12,
          created_at: "2019-01-01T00:00:00Z"
        });
        setYearlyStats(FALLBACK_STATS);
        setLatestActivityDate("Mar 2026");
        setUsingLiveData(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const maxCount = Math.max(...yearlyStats.map(s => s.count), 1);

  return (
    <section id="github-section" className="mb-32 scroll-mt-32 print:hidden">
      <GlassCard className="p-0 overflow-hidden border-t-border bg-t-bg-el/40 backdrop-blur-3xl shadow-xl" accent="theme">

        {/* HEADER ROW */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-5 border-b border-t-border/50 bg-t-bg/40 gap-4">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group/avatar">
              <div className="absolute -inset-1 rounded-xl bg-t-accent opacity-0 group-hover/avatar:opacity-30 transition-opacity blur-md" />
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-t-border shadow-sm bg-t-bg">
                <img
                  src={user?.avatar_url}
                  loading="lazy"
                  className="w-full h-full object-cover transition-all duration-700 blur-sm"
                  onLoad={(e) => e.currentTarget.classList.remove('blur-sm')}
                  alt="GitHub Avatar"
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-t-bg-el animate-pulse ${usingLiveData ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-t-fg tracking-tight">@{user?.login || username}</h3>
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase border ${usingLiveData ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                  {usingLiveData ? 'Live' : 'Cached'}
                </span>
              </div>
              <p className="text-[9px] font-bold text-t-fg-m uppercase tracking-widest opacity-60">Open Source Profile</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
            {[
              { label: 'Repos', value: user?.public_repos || 0 },
              { label: 'Joined', value: new Date(user?.created_at || Date.now()).getFullYear() },
              { label: 'Latest', value: latestActivityDate },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-end">
                <span className="text-[7px] font-bold uppercase tracking-wider text-t-fg-m opacity-60">{stat.label}</span>
                <span className="text-xs font-black text-t-fg">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTRIBUTION BARS — Real Data */}
        <div className="px-6 py-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-t-accent animate-ping" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-t-accent">Yearly Contributions</span>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => <div key={i} className="h-8 bg-t-fg/5 rounded-lg animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-3">
              {yearlyStats.map((stat) => {
                const barWidth = Math.max(5, (stat.count / maxCount) * 100);
                const isSelected = selectedYear === stat.year;

                return (
                  <button
                    key={stat.year}
                    onClick={() => setSelectedYear(stat.year)}
                    className={`w-full flex items-center gap-4 group/bar cursor-pointer py-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                  >
                    <span className="text-[10px] font-black text-t-fg w-10 shrink-0">{stat.year}</span>
                    <div className="flex-1 h-6 bg-t-fg/5 rounded-md overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className={`h-full rounded-md ${isSelected ? 'bg-t-accent shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.3)]' : 'bg-t-fg/15'}`}
                      />
                    </div>
                    <span className="text-xs font-black text-t-fg w-10 text-right shrink-0">{stat.count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Year narrative */}
          <AnimatePresence mode="wait">
            <motion.p
              key={selectedYear}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-[10px] font-bold text-t-fg-m uppercase tracking-wider text-center mt-4 opacity-50"
            >
              {YEAR_LABELS[selectedYear] || ""}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA ROW */}
        <div className="border-t border-t-border/50">
          <button
            onClick={() => window.open(`https://github.com/${username}`, '_blank')}
            className="group w-full p-5 hover:bg-t-bg-el/60 transition-colors flex items-center justify-center gap-3 cursor-pointer"
          >
            <span className="text-sm font-black font-display text-t-fg uppercase tracking-wider">View Full GitHub Profile</span>
            <svg className="w-4 h-4 text-t-fg group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7M5 12h16" />
            </svg>
          </button>
        </div>

      </GlassCard>
    </section>
  );
};

export default GitHubStats;