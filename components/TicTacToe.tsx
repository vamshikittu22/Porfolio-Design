
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

  const calculateWinner = (squares: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
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
    if (xIsNext && !calculateWinner(board) && board.some(s => s === null)) {
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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, board]);

  const handleUserClick = (i: number) => {
    if (calculateWinner(board) || board[i] || xIsNext || isCpuThinking) return;
    const nextBoard = board.slice();
    nextBoard[i] = 'O';
    setBoard(nextBoard);
    setXIsNext(true);
    setHint(null);
  };

  const getAiHint = async () => {
    setLoadingHint(true);
    try {
      const gemini = GeminiService.getInstance();
      const result = await gemini.getTicTacToeHint(board);
      setHint({ index: result.recommendedIndex, reason: result.reason });
    } catch (err) {
      console.error("Hint failed", err);
    } finally {
      setLoadingHint(false);
    }
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner ? `Winner: ${winner === 'O' ? 'You!' : 'AI'}` : isDraw ? "Game Tied" : isCpuThinking ? "AI is thinking..." : "Your Turn";

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(false);
    setHint(null);
  };

  return (
    <GlassCard className="p-6 w-full max-w-2xl mx-auto shadow-2xl border-2 border-purple-400 bg-white overflow-hidden" accent="purple">
      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-purple-100 pb-3">
          <div className="space-y-1">
            <h4 className="text-[8px] font-bold uppercase tracking-[0.4em] text-purple-400">Level 1</h4>
            <p className="text-lg font-bold text-slate-900 uppercase tracking-tighter leading-none">Tic-Tac-Toe.</p>
          </div>
          <span className={`text-[8px] font-bold uppercase tracking-[0.2em] ${winner || isDraw ? 'text-orange-500' : 'text-purple-400'}`}>
            {status}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Column: Board */}
          <div className="w-full md:w-[240px] flex-shrink-0 mx-auto md:mx-0">
            <div className="grid grid-cols-3 gap-1.5 bg-purple-50 p-1.5 rounded-xl overflow-hidden border border-purple-100 shadow-inner w-full aspect-square">
              {board.map((square, i) => (
                <button
                  key={i}
                  onClick={() => handleUserClick(i)}
                  className={`aspect-square flex items-center justify-center text-3xl font-bold transition-all duration-300 rounded-lg
                    ${hint?.index === i ? 'bg-purple-100 ring-2 ring-purple-600 ring-inset' : 'bg-white'}
                    ${square === 'O' ? 'text-purple-600' : 'text-orange-500'}
                    ${!square && !xIsNext && !isCpuThinking ? 'hover:bg-purple-50' : ''}
                    ${xIsNext || isCpuThinking ? 'cursor-wait' : 'cursor-pointer'}
                    shadow-sm
                  `}
                >
                  {square}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: AI Hint Panel */}
          <div className="flex-1 w-full min-w-0 flex flex-col justify-between self-stretch gap-4">
            <div className="space-y-3 flex-1">
              <label className="text-[7px] font-bold text-purple-300 uppercase tracking-[0.4em] block border-b border-purple-50 pb-1">AI Hint System</label>
              
              <div className="min-h-[100px] flex items-center w-full">
                {hint ? (
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 animate-in fade-in slide-in-from-right-2 duration-500 w-full overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse flex-shrink-0" />
                       <p className="text-[8px] text-purple-600 font-extrabold uppercase tracking-widest leading-none truncate">Strategy Advice</p>
                    </div>
                    <p className="text-[10px] text-slate-700 font-medium leading-relaxed italic break-words">"{hint.reason}"</p>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-purple-100 rounded-xl p-3 text-center">
                     <p className="text-[8px] font-bold text-purple-200 uppercase tracking-[0.2em] mb-0.5">AI Standby</p>
                     <p className="text-[9px] text-purple-200 font-medium italic">Ask for a hint to see the best move</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <GlassButton 
                accent="purple" 
                primary 
                className="w-full py-2.5 rounded-lg shadow-md text-[9px]" 
                onClick={getAiHint} 
                disabled={loadingHint || !!winner || isDraw || xIsNext}
              >
                {loadingHint ? 'Thinking...' : 'Get AI Hint'}
              </GlassButton>
              <button 
                onClick={reset}
                className="text-[8px] font-bold uppercase text-purple-300 hover:text-purple-600 transition-all tracking-[0.5em] py-1"
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-2 border-t border-purple-50 flex justify-between items-center opacity-30">
           <span className="text-[6px] font-bold text-purple-300 uppercase tracking-widest leading-none truncate">System Status: Online</span>
           <div className="flex gap-1 flex-shrink-0">
              <div className="w-0.5 h-0.5 rounded-full bg-purple-300" />
              <div className="w-0.5 h-0.5 rounded-full bg-purple-300" />
              <div className="w-0.5 h-0.5 rounded-full bg-purple-300" />
           </div>
        </div>
      </div>
    </GlassCard>
  );
};
