
import React, { useState, useEffect, useCallback } from 'react';
import { GlassCard, GlassButton } from './GlassUI';

type Player = 'X' | 'O' | null;
type Difficulty = 'Easy' | 'Medium' | 'Hard';

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [scores, setScores] = useState({ user: 0, system: 0 });
  const [hintIndex, setHintIndex] = useState<number | null>(null);
  const [isCpuThinking, setIsCpuThinking] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'draw'>('playing');

  // Win patterns
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  const calculateWinner = useCallback((squares: Player[]): { player: Player; line: number[] | null } => {
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: [a, b, c] };
      }
    }
    return { player: null, line: null };
  }, [lines]);

  // Difficulty Logic: Easy
  const getEasyMove = (squares: Player[]): number => {
    const available = squares.map((s, i) => (s === null ? i : null)).filter(val => val !== null) as number[];
    return available[Math.floor(Math.random() * available.length)];
  };

  // Difficulty Logic: Medium
  const getMediumMove = (squares: Player[]): number => {
    // 1. Can System win?
    for (const [a, b, c] of lines) {
      const line = [squares[a], squares[b], squares[c]];
      if (line.filter(s => s === 'X').length === 2 && line.filter(s => s === null).length === 1) {
        return [a, b, c][line.indexOf(null)];
      }
    }
    // 2. Must System block?
    for (const [a, b, c] of lines) {
      const line = [squares[a], squares[b], squares[c]];
      if (line.filter(s => s === 'O').length === 2 && line.filter(s => s === null).length === 1) {
        return [a, b, c][line.indexOf(null)];
      }
    }
    // 3. Random
    return getEasyMove(squares);
  };

  // Difficulty Logic: Hard (Minimax)
  const getHardMove = (squares: Player[]): number => {
    const minimax = (tempBoard: Player[], depth: number, isMaximizing: boolean): number => {
      const winner = calculateWinner(tempBoard).player;
      if (winner === 'X') return 10 - depth;
      if (winner === 'O') return depth - 10;
      if (tempBoard.every(s => s !== null)) return 0;

      if (isMaximizing) {
        let bestScore = -Infinity;
        tempBoard.forEach((s, i) => {
          if (s === null) {
            tempBoard[i] = 'X';
            const score = minimax(tempBoard, depth + 1, false);
            tempBoard[i] = null;
            bestScore = Math.max(score, bestScore);
          }
        });
        return bestScore;
      } else {
        let bestScore = Infinity;
        tempBoard.forEach((s, i) => {
          if (s === null) {
            tempBoard[i] = 'O';
            const score = minimax(tempBoard, depth + 1, true);
            tempBoard[i] = null;
            bestScore = Math.min(score, bestScore);
          }
        });
        return bestScore;
      }
    };

    let bestMove = -1;
    let bestScore = -Infinity;
    squares.forEach((s, i) => {
      if (s === null) {
        squares[i] = 'X';
        const score = minimax(squares, 0, false);
        squares[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    });
    return bestMove;
  };

  const showHint = () => {
    if (gameStatus !== 'playing' || xIsNext) return;
    const move = getHardMove([...board]);
    if (move !== -1) {
      setHintIndex(move);
      setTimeout(() => setHintIndex(null), 800);
    }
  };

  useEffect(() => {
    const { player, line } = calculateWinner(board);
    if (player) {
      setWinningLine(line);
      setGameStatus('won');
      if (player === 'O') setScores(s => ({ ...s, user: s.user + 1 }));
      else setScores(s => ({ ...s, system: s.system + 1 }));
      return;
    }

    if (board.every(s => s !== null)) {
      setGameStatus('draw');
      return;
    }

    if (xIsNext && gameStatus === 'playing') {
      setIsCpuThinking(true);
      const timer = setTimeout(() => {
        let move: number;
        switch (difficulty) {
          case 'Easy': move = getEasyMove(board); break;
          case 'Medium': move = getMediumMove(board); break;
          case 'Hard': move = getHardMove([...board]); break;
          default: move = getMediumMove(board);
        }

        if (move !== -1) {
          const nextBoard = board.slice();
          nextBoard[move] = 'X';
          setBoard(nextBoard);
          setXIsNext(false);
        }
        setIsCpuThinking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, board, difficulty, calculateWinner, gameStatus]);

  const handleUserClick = (i: number) => {
    if (gameStatus !== 'playing' || board[i] || xIsNext || isCpuThinking) return;
    const nextBoard = board.slice();
    nextBoard[i] = 'O';
    setBoard(nextBoard);
    setXIsNext(true);
    setHintIndex(null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(false);
    setGameStatus('playing');
    setWinningLine(null);
    setHintIndex(null);
  };

  const resetScores = () => {
    setScores({ user: 0, system: 0 });
    resetGame();
  };

  return (
    <div className="w-full max-w-[540px] mx-auto group">
      <style>{`
        @keyframes win-pulse {
          0%, 100% { background-color: rgba(var(--color-accent-rgb, 0, 105, 137), 0.1); }
          50% { background-color: rgba(var(--color-accent-rgb, 0, 105, 137), 0.4); transform: scale(1.05); }
        }
        .animate-win { animation: win-pulse 1.5s infinite ease-in-out; }
        .tile-hover:hover { transform: scale(1.03); background-color: rgba(var(--color-accent-rgb, 0, 105, 137), 0.05); }
      `}</style>
      
      <GlassCard className="p-8 lg:p-12 border-t-accent/20 transition-all duration-700 shadow-2xl" accent="theme">
        <div className="space-y-10">
          
          {/* Score Bar */}
          <div className="flex justify-between items-center px-4 py-3 rounded-2xl bg-t-accent/5 border border-t-accent/10">
            <div className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-widest text-t-fg-m">You (O)</span>
              <span className="text-xl font-black text-t-accent">{scores.user}</span>
            </div>
            <div className="w-px h-6 bg-t-border" />
            <div className="flex items-center gap-4">
              <span className="text-xl font-black text-t-fg opacity-40">{scores.system}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-t-fg-m">System (X)</span>
            </div>
          </div>

          {/* Difficulty Selector */}
          <div className="flex justify-center gap-2">
            {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => { setDifficulty(d); resetGame(); }}
                className={`px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  difficulty === d 
                  ? 'bg-t-accent text-t-bg border-t-accent' 
                  : 'bg-white/5 border-t-border text-t-fg-m hover:border-t-accent/40'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-3 gap-3">
            {board.map((square, i) => {
              const isWinning = winningLine?.includes(i);
              const isHint = hintIndex === i;
              const isEmpty = square === null;
              const canHover = isEmpty && gameStatus === 'playing' && !xIsNext;

              return (
                <button
                  key={i}
                  onClick={() => handleUserClick(i)}
                  className={`
                    relative aspect-square flex items-center justify-center rounded-2xl transition-all duration-300
                    bg-white/5 dark:bg-black/10 border border-t-accent/10
                    ${isWinning ? 'animate-win z-10 border-t-accent shadow-lg' : ''}
                    ${isHint ? 'bg-t-accent/20 border-t-accent' : ''}
                    ${canHover ? 'tile-hover cursor-pointer' : 'cursor-default'}
                  `}
                >
                  {square && (
                    <span className={`
                      text-4xl lg:text-5xl font-black font-display tracking-tighter transition-all duration-500
                      ${square === 'O' ? 'text-t-accent drop-shadow-sm' : 'text-t-fg/30'}
                      ${isWinning ? 'scale-110' : ''}
                      animate-in fade-in zoom-in-75
                    `}>
                      {square}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Game Status & Controls */}
          <div className="space-y-6 pt-4 border-t border-t-border">
            <div className="flex justify-between items-center h-12">
              <p className="text-sm font-black text-t-fg uppercase tracking-widest">
                {gameStatus === 'won' ? (calculateWinner(board).player === 'O' ? 'You Victory' : 'System Defeat') : 
                 gameStatus === 'draw' ? 'Stalemate' : 
                 isCpuThinking ? 'Syncing...' : 'Your Input Required'}
              </p>
              
              <div className="flex gap-4">
                <GlassButton 
                  accent="theme" 
                  className="!px-6 !py-3 !text-[8px]" 
                  onClick={showHint}
                  disabled={gameStatus !== 'playing' || xIsNext}
                >
                  Hint
                </GlassButton>
                <GlassButton 
                  accent="theme" 
                  primary 
                  className="!px-8 !py-3 !text-[8px]" 
                  onClick={resetGame}
                >
                  New Round
                </GlassButton>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={resetScores}
                className="text-[7px] font-black uppercase tracking-[0.5em] text-t-fg-m hover:text-t-accent transition-colors"
              >
                Reset Session & Scores
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
      
      {/* Footer Info */}
      <div className="mt-8 px-10 flex justify-between items-center opacity-30">
        <div className="flex gap-4">
          <div className={`w-1.5 h-1.5 rounded-full ${difficulty === 'Hard' ? 'bg-t-accent' : 'bg-t-accent/40'}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${difficulty === 'Medium' ? 'bg-t-accent' : 'bg-t-accent/40'}`} />
          <div className={`w-1.5 h-1.5 rounded-full ${difficulty === 'Easy' ? 'bg-t-accent' : 'bg-t-accent/40'}`} />
        </div>
        <span className="text-[8px] font-black uppercase tracking-[1em] text-t-fg">System Complexity: {difficulty}</span>
      </div>
    </div>
  );
};
