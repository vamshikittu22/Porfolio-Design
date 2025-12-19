
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
  const status = winner ? `Result: ${winner === 'O' ? 'User_Win' : 'CPU_Win'}` : isDraw ? "State: Draw" : isCpuThinking ? "Syncing..." : "Your Turn";

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(false);
    setHint(null);
  };

  return (
    <GlassCard className="p-10 max-w-sm mx-auto shadow-2xl border-purple-300 bg-purple-50/80" accent="purple">
      <div className="space-y-8">
        <div className="flex justify-between items-end border-b border-purple-200 pb-6">
          <div className="space-y-1">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-purple-700">GAME_UNIT_01</h4>
            <p className="text-2xl font-bold text-purple-950 uppercase tracking-tighter leading-none">Tic-Tac-Toe.</p>
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${winner || isDraw ? 'text-orange-600' : 'text-purple-400'}`}>
            {status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 bg-purple-200 p-2 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-xl">
          {board.map((square, i) => (
            <button
              key={i}
              onClick={() => handleUserClick(i)}
              className={`aspect-square flex items-center justify-center text-4xl font-bold transition-all duration-500 rounded-xl
                ${hint?.index === i ? 'bg-purple-100 ring-2 ring-purple-600 ring-inset' : 'bg-white/90'}
                ${square === 'O' ? 'text-purple-700' : 'text-orange-600'}
                ${!square && !xIsNext && !isCpuThinking ? 'hover:bg-purple-50 active:scale-95' : ''}
                ${xIsNext || isCpuThinking ? 'cursor-wait opacity-50' : 'cursor-pointer'}
              `}
            >
              {square}
            </button>
          ))}
        </div>

        {hint && (
          <div className="bg-purple-600/10 p-5 rounded-2xl border border-purple-300 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div className="flex items-center gap-2 mb-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
               <p className="text-[9px] text-purple-800 font-bold uppercase tracking-widest leading-none">Neural Assist</p>
            </div>
            <p className="text-[11px] text-purple-950 font-medium leading-relaxed italic">"{hint.reason}"</p>
          </div>
        )}

        <div className="flex flex-col gap-4 pt-2">
          <GlassButton 
            accent="purple" 
            primary 
            className="w-full py-5" 
            onClick={getAiHint} 
            disabled={loadingHint || !!winner || isDraw || xIsNext}
          >
            {loadingHint ? 'Logic Mapping...' : 'Request AI Strategy'}
          </GlassButton>
          <button 
            onClick={reset}
            className="text-[9px] font-bold uppercase text-purple-400 hover:text-purple-900 transition-all tracking-[0.6em] py-2"
          >
            Reset_Board
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
