
import React, { useState, useEffect } from 'react';
import { GlassCard, GlassButton } from './GlassUI';
import { GeminiService } from '../services/geminiService';

type Player = 'X' | 'O' | null;

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(false); 
  const [hint, setHint] = useState<{ index: number; reason: string } | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [isCpuThinking, setIsCpuThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const calculateWinner = (squares: Player[]): { player: Player; line: number[] | null } => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: [a, b, c] };
      }
    }
    return { player: null, line: null };
  };

  const getBestCpuMove = (squares: Player[]): number => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      const line = [squares[a], squares[b], squares[c]];
      if (line.filter(s => s === 'X').length === 2 && line.filter(s => s === null).length === 1) {
        return [a, b, c][line.indexOf(null)];
      }
    }
    for (const [a, b, c] of lines) {
      const line = [squares[a], squares[b], squares[c]];
      if (line.filter(s => s === 'O').length === 2 && line.filter(s => s === null).length === 1) {
        return [a, b, c][line.indexOf(null)];
      }
    }
    if (squares[4] === null) return 4;
    const corners = [0, 2, 6, 8].filter(i => squares[i] === null);
    if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    const sides = [1, 3, 5, 7].filter(i => squares[i] === null);
    if (sides.length > 0) return sides[Math.floor(Math.random() * sides.length)];
    return -1;
  };

  useEffect(() => {
    const { player, line } = calculateWinner(board);
    if (player) {
      setWinningLine(line);
      return;
    }

    if (xIsNext && board.some(s => s === null)) {
      setIsCpuThinking(true);
      const timer = setTimeout(() => {
        const move = getBestCpuMove(board);
        if (move !== -1) {
          const nextBoard = board.slice();
          nextBoard[move] = 'X';
          setBoard(nextBoard);
          setXIsNext(false);
        }
        setIsCpuThinking(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, board]);

  const handleUserClick = (i: number) => {
    if (calculateWinner(board).player || board[i] || xIsNext || isCpuThinking) return;
    const nextBoard = board.slice();
    nextBoard[i] = 'O';
    setBoard(nextBoard);
    setXIsNext(true);
    setHint(null);
    setError(null);
  };

  const getAiHint = async () => {
    setLoadingHint(true);
    setError(null);
    try {
      const gemini = GeminiService.getInstance();
      const result = await gemini.getTicTacToeHint(board);
      setHint({ index: result.recommendedIndex, reason: result.reason });
    } catch (err: any) {
      console.error("Hint failed", err);
      setError(err.message);
    } finally {
      setLoadingHint(false);
    }
  };

  const { player: winner } = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner 
    ? (winner === 'O' ? 'You Won!' : 'AI Won!') 
    : isDraw ? "Game Tied" 
    : isCpuThinking ? "AI is thinking..." 
    : "Your Turn";

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(false);
    setHint(null);
    setError(null);
    setWinningLine(null);
  };

  return (
    <div className="w-full max-w-[540px] mx-auto group perspective-1000">
      <style>{`
        @keyframes soft-glow {
          0%, 100% { box-shadow: 0 0 15px -5px var(--color-accent); }
          50% { box-shadow: 0 0 25px -2px var(--color-accent); }
        }
        .animate-soft-glow { animation: soft-glow 3s infinite ease-in-out; }
        .win-glow { box-shadow: 0 0 40px -10px var(--color-accent) !important; border-color: var(--color-accent) !important; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
      
      <GlassCard className={`p-10 lg:p-14 overflow-hidden border-t-accent/30 transition-all duration-700 animate-soft-glow ${winner ? 'scale-[1.02] win-glow' : ''}`} accent="theme">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="flex justify-between items-start border-b border-t-border pb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${winner || isDraw ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} />
                <h4 className="text-[10px] font-black uppercase tracking-[1em] text-t-accent">Match Progress</h4>
              </div>
              <p className={`text-2xl font-black text-t-fg tracking-tighter uppercase leading-tight ${winner === 'X' ? 'text-rose-500' : winner === 'O' ? 'text-t-accent' : ''}`}>
                {status}
              </p>
            </div>
            <button 
              onClick={reset} 
              className="w-12 h-12 rounded-full border border-t-border flex items-center justify-center hover:bg-t-accent hover:text-t-bg hover:border-t-accent transition-all group/btn shadow-lg"
              title="Restart Game"
            >
              <svg className="w-5 h-5 group-hover/btn:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m0 0H15" /></svg>
            </button>
          </div>

          {/* Game Board with Monochrome Effect and Visible Borders */}
          <div className="grid grid-cols-3 gap-0 bg-t-accent/40 rounded-2xl overflow-hidden shadow-inner backdrop-blur-sm border border-t-accent/30">
            {board.map((square, i) => {
              const isWinningSquare = winningLine?.includes(i);
              const isHinted = hint?.index === i;
              
              return (
                <button
                  key={i}
                  onClick={() => handleUserClick(i)}
                  className={`
                    relative aspect-square flex items-center justify-center transition-all duration-500
                    bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-white/5
                    border border-t-accent/20
                    ${square === 'O' ? 'bg-t-accent/10' : ''}
                    ${square === 'X' ? 'bg-t-accent/5' : ''}
                    ${isWinningSquare ? 'bg-t-accent/20 z-10' : ''}
                    ${isHinted && !square ? 'bg-t-accent/20 animate-pulse' : ''}
                    ${!square && !xIsNext && !isCpuThinking && !winner ? 'cursor-pointer group/tile' : 'cursor-default'}
                  `}
                >
                  {/* Subtle Border Glow for Individual Tiles on Hover */}
                  <div className={`absolute inset-0 border border-transparent transition-colors duration-300 ${!square && !winner ? 'group-hover/tile:border-t-accent/50' : ''} ${isWinningSquare ? 'border-t-accent animate-pulse' : ''}`} />

                  {square && (
                    <div className={`
                      text-4xl lg:text-5xl font-black font-display tracking-tighter transition-all duration-700
                      ${square === 'O' ? 'text-t-accent drop-shadow-[0_0_8px_var(--color-accent)]' : 'text-t-fg/30'}
                      ${isWinningSquare ? 'scale-125' : 'scale-100'}
                      animate-in fade-in zoom-in-75
                    `}>
                      {square}
                    </div>
                  )}
                  
                  {/* Local Coordinates (Subtle UI Decor) */}
                  <span className="absolute bottom-1 right-2 text-[6px] font-black text-t-accent opacity-10 uppercase select-none">
                    {Math.floor(i / 3)}:{i % 3}
                  </span>
                </button>
              );
            })}
          </div>

          {/* AI Advisor & Interaction Section */}
          <div className="space-y-6">
            {error && (
              <div className="bg-rose-500/10 p-8 rounded-3xl border border-rose-500/20 animate-in fade-in slide-in-from-top-4 duration-500">
                 <div className="flex items-center gap-4 mb-3">
                   <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                   <p className="text-[9px] font-black text-rose-500 uppercase tracking-[0.5em]">AI Link Interrupted</p>
                 </div>
                 <p className="text-sm font-bold text-t-fg-m leading-snug">{error}</p>
              </div>
            )}

            {hint && !error && (
              <div className="bg-t-accent/5 p-8 rounded-[32px] border border-t-accent/10 animate-in slide-in-from-bottom-4 duration-700 relative overflow-hidden group/hint shadow-inner">
                 <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg className="w-12 h-12 text-t-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" /></svg>
                 </div>
                 <div className="flex items-center gap-4 mb-4">
                   <div className="w-2 h-2 rounded-full bg-t-accent animate-pulse" />
                   <p className="text-[9px] font-black text-t-accent uppercase tracking-[0.8em]">AI Move Suggestion</p>
                 </div>
                 <p className="text-sm font-medium text-t-fg-m leading-relaxed italic pr-10">"{hint.reason}"</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <GlassButton 
                accent="theme" 
                primary 
                className="w-full !py-6 text-[10px] shadow-[0_0_20px_-10px_var(--color-accent)] hover:shadow-[0_0_25px_-5px_var(--color-accent)]"
                onClick={getAiHint} 
                disabled={loadingHint || !!winner || isDraw || xIsNext}
              >
                {loadingHint ? (
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v2m0 12v2m8-8h-2M6 12H4m15.364 4.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" /></svg>
                    Syncing...
                  </span>
                ) : 'Ask AI Hint'}
              </GlassButton>
              
              <GlassButton 
                accent="theme" 
                className="w-full !py-6 text-[10px]"
                onClick={reset}
              >
                Reset Match
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassCard>
      
      {/* Footer Info */}
      <div className="mt-8 px-10 flex justify-between items-center opacity-30">
        <div className="flex gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-t-accent" />
          <div className="w-1.5 h-1.5 rounded-full bg-t-accent/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-t-accent/20" />
        </div>
        <span className="text-[8px] font-black uppercase tracking-[1em] text-t-fg">Interactive Logic Session // 0xAF</span>
      </div>
    </div>
  );
};
