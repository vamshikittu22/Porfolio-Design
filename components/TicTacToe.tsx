
import React, { useState } from 'react';
import { GlassCard, GlassButton } from './GlassUI';

type Player = 'X' | 'O' | null;

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

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

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) return;
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner ? `Winner: ${winner}` : isDraw ? "Draw!" : `Next: ${xIsNext ? 'X' : 'O'}`;

  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <GlassCard className="p-8 max-w-sm mx-auto" accent="blue">
      <div className="space-y-6">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Playlab_01</h4>
            <p className="text-xl font-black text-slate-900 uppercase tracking-tighter">Tic Tac Toe.</p>
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${winner || isDraw ? 'text-blue-600' : 'text-slate-300'}`}>
            {status}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 aspect-square">
          {board.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className="w-full h-full bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl font-black text-slate-900 hover:bg-white transition-colors"
            >
              {square}
            </button>
          ))}
        </div>

        <GlassButton accent="blue" className="w-full" onClick={reset}>
          System_Reset
        </GlassButton>
      </div>
    </GlassCard>
  );
};
