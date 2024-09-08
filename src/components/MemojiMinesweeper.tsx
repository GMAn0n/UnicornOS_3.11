import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './MemojiMinesweeper.css';
import { ref, onValue, set, push, DataSnapshot } from 'firebase/database';
import { database } from '../firebaseConfig';

interface MemojiMinesweeperProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  neighborMines: number;
  emoji: string;
  playerId: string | null;
}

interface Player {
  id: string;
  color: string;
}

const GRID_SIZE = 18;
const MINE_COUNT = 40;
const EMOJIS = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'];

export default function MemojiMinesweeper({ onClose, className, style, isIframeApp }: MemojiMinesweeperProps) {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 800 });
  const [gameWon, setGameWon] = useState<boolean>(false);

  const calculateWindowSize = useCallback(() => {
    if (isMobile) {
      return { width: window.innerWidth, height: window.innerHeight - 60 }; // Adjust for mobile
    } else {
      const cellSize = 30;
      const padding = 40;
      const width = GRID_SIZE * cellSize + padding;
      const height = GRID_SIZE * cellSize + padding + 100; // Extra space for controls
      return { width, height };
    }
  }, [isMobile]);

  useEffect(() => {
    setWindowSize(calculateWindowSize());
  }, [calculateWindowSize, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setWindowSize(calculateWindowSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateWindowSize]);

  const createInitialGrid = useCallback(() => {
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        neighborMines: 0,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        playerId: null,
      }))
    );

    let minesPlaced = 0;
    while (minesPlaced < MINE_COUNT) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[row][col].isMine) {
        newGrid[row][col].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (!newGrid[row][col].isMine) {
          newGrid[row][col].neighborMines = countNeighborMines(newGrid, row, col);
        }
      }
    }

    return newGrid;
  }, []);

  useEffect(() => {
    console.log('MemojiMinesweeper component mounted');
    const gameRef = ref(database, 'memojiMinesweeper');
    console.log('Database reference created:', gameRef);
    
    const unsubscribe = onValue(gameRef, (snapshot: DataSnapshot) => {
      console.log('Received data from Firebase:', snapshot.val());
      const data = snapshot.val();
      
      if (data) {
        if (data.grid && Array.isArray(data.grid)) {
          console.log('Setting grid:', data.grid);
          setGrid(data.grid);
          setError(null);
        } else {
          console.log('Grid data is missing or invalid. Initializing new grid.');
          const newGrid = createInitialGrid();
          set(ref(database, 'memojiMinesweeper/grid'), newGrid)
            .then(() => {
              console.log('New grid set in database');
              setGrid(newGrid);
            })
            .catch((error) => console.error('Error setting new grid:', error));
        }
        
        if (data.players && typeof data.players === 'object') {
          console.log('Setting players:', Object.values(data.players));
          setPlayers(Object.values(data.players));
          setError(null);
        } else {
          console.log('Players data is missing or invalid. Initializing empty players object.');
          set(ref(database, 'memojiMinesweeper/players'), {})
            .then(() => console.log('Empty players object set in database'))
            .catch((error) => console.error('Error setting empty players object:', error));
        }

        setGameOver(data.gameOver || false);
        setGameWon(data.gameWon || false);
      } else {
        console.log('No data received from Firebase. Initializing new game state.');
        const initialState = {
          grid: createInitialGrid(),
          players: {},
          gameOver: false,
          gameWon: false
        };
        set(ref(database, 'memojiMinesweeper'), initialState)
          .then(() => {
            console.log('Initial state set in database');
            setGrid(initialState.grid);
          })
          .catch((error) => console.error('Error setting initial state:', error));
      }
    }, (error: any) => {
      console.error('Firebase error:', error);
      setError(`Firebase error: ${error.message}`);
    });

    // Initialize player
    const newPlayerId = push(ref(database, 'memojiMinesweeper/players')).key;
    setPlayerId(newPlayerId);
    if (newPlayerId) {
      set(ref(database, `memojiMinesweeper/players/${newPlayerId}`), {
        id: newPlayerId,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      });
    }

    return () => {
      unsubscribe();
      // Remove player when component unmounts
      if (newPlayerId) {
        set(ref(database, `memojiMinesweeper/players/${newPlayerId}`), null);
      }
    };
  }, [createInitialGrid]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameOver || gameWon) return;

    const updatedGrid = [...grid];
    const cell = updatedGrid[row][col];
    if (!cell.isRevealed) {
      cell.isRevealed = true;
      cell.playerId = playerId;

      if (cell.isMine) {
        // Game over logic
        setGameOver(true);
        set(ref(database, 'memojiMinesweeper/gameOver'), true);
      } else if (cell.neighborMines === 0) {
        // Reveal neighbors
        revealNeighbors(updatedGrid, row, col);
      }

      set(ref(database, 'memojiMinesweeper/grid'), updatedGrid);

      // Check for win condition
      const revealedCells = updatedGrid.flat().filter(cell => cell.isRevealed).length;
      const totalSafeCells = GRID_SIZE * GRID_SIZE - MINE_COUNT;
      if (revealedCells === totalSafeCells) {
        setGameWon(true);
        set(ref(database, 'memojiMinesweeper/gameWon'), true);
      }
    }
  }, [grid, playerId, gameOver, gameWon]);

  const revealNeighbors = (grid: Cell[][], row: number, col: number) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
          const cell = grid[newRow][newCol];
          if (!cell.isRevealed && !cell.isMine) {
            cell.isRevealed = true;
            cell.playerId = playerId;
            if (cell.neighborMines === 0) {
              revealNeighbors(grid, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const startNewGame = () => {
    const newGrid = createInitialGrid();
    set(ref(database, 'memojiMinesweeper'), {
      grid: newGrid,
      players: {},
      gameOver: false,
      gameWon: false
    }).then(() => {
      console.log('New game started');
      setGrid(newGrid);
      setGameOver(false);
      setGameWon(false);
    }).catch((error) => console.error('Error starting new game:', error));
  };

  return (
    <ResizableWindow 
      title="Multiplayer Memoji Minesweeper" 
      onClose={onClose} 
      appName="memojiminesweeper"
      className={`${className} desktop-offset`}
      style={style}
      initialWidth={windowSize.width}
      initialHeight={windowSize.height}
      isIframeApp={isIframeApp}
    >
      <div className="memoji-minesweeper">
        {error && <div className="error-message">{error}</div>}
        <div className="game-controls">
          <div className="players">
            {players.map((player) => (
              <div key={player.id} className="player" style={{ color: player.color }}>
                Player {player.id === playerId ? '(You)' : ''}
              </div>
            ))}
          </div>
          {gameOver && <div className="game-over">Game Over! 💣</div>}
          {gameWon && <div className="game-won">You Win! 🎉</div>}
          <button onClick={startNewGame} className="new-game-button">New Game</button>
        </div>
        {grid.length > 0 ? (
          <div className="grid-container">
            <div className="grid" style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              fontSize: isMobile ? '10px' : '16px'
            }}>
              {grid.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`cell ${cell.isRevealed ? 'revealed' : ''} ${gameOver && cell.isMine ? 'mine' : ''}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    style={{ backgroundColor: cell.playerId ? players.find(p => p.id === cell.playerId)?.color : '' }}
                    disabled={gameOver || gameWon}
                  >
                    {cell.isRevealed
                      ? cell.isMine
                        ? '💣'
                        : cell.neighborMines > 0
                        ? cell.neighborMines
                        : cell.emoji
                      : ''}
                  </button>
                ))
              ))}
            </div>
          </div>
        ) : (
          <div>Loading game board...</div>
        )}
      </div>
    </ResizableWindow>
  );
}

function countNeighborMines(grid: Cell[][], row: number, col: number): number {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
        if (grid[newRow][newCol].isMine) {
          count++;
        }
      }
    }
  }
  return count;
}