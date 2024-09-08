import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ResizableWindow } from './ResizableWindow';
import { ref, push, onValue, set, DataSnapshot, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../firebaseConfig';
import './Tetris.css';

interface TetrisProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

interface Tetromino {
  type: TetrominoType;
  shape: number[][];
  position: { x: number; y: number };
}

const TETROMINOES: { [key in TetrominoType]: number[][] } = {
  'I': [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
  'O': [[1, 1], [1, 1]],
  'T': [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
  'S': [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
  'Z': [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
  'J': [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
  'L': [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
};

const COLORS: { [key in TetrominoType]: string } = {
  'I': 'cyan',
  'O': 'yellow',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange'
};

export default function Tetris({ onClose, className, style, isIframeApp }: TetrisProps): JSX.Element {
  const [board, setBoard] = useState<(TetrominoType | null)[][]>(
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
  );
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScores, setHighScores] = useState<{ name: string; score: number }[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [level, setLevel] = useState(1);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [vanityNumber, setVanityNumber] = useState<number | null>(null);
  const [usedVanityNumbers, setUsedVanityNumbers] = useState<number[]>([]);
  const [showPlayerNumberSelector, setShowPlayerNumberSelector] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 400, height: 600 });
  const [showGameOver, setShowGameOver] = useState(false);
  const [userHighScore, setUserHighScore] = useState(0);
  const [linesCleared, setLinesCleared] = useState(0);
  const [tempVanityNumber, setTempVanityNumber] = useState<string>('');
  const [firstGameOver, setFirstGameOver] = useState(true);

  const createNewPiece = useCallback(() => {
    const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      type,
      shape: TETROMINOES[type],
      position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }
    };
  }, []);

  useEffect(() => {
    if (!currentPiece && !gameOver && gameStarted) {
      setCurrentPiece(createNewPiece());
    }
  }, [currentPiece, gameOver, gameStarted, createNewPiece]);

  useEffect(() => {
    const savedVanityNumber = localStorage.getItem('tetrisVanityNumber');
    if (savedVanityNumber) {
      setVanityNumber(parseInt(savedVanityNumber));
    }
    const savedHighScore = localStorage.getItem('tetrisHighScore');
    if (savedHighScore) {
      setUserHighScore(parseInt(savedHighScore));
    }

    const highScoresRef = query(ref(database, 'tetrisHighScores'), orderByChild('score'), limitToLast(15));
    const usedVanityNumbersRef = ref(database, 'usedVanityNumbers');

    const unsubscribe = onValue(highScoresRef, (snapshot: DataSnapshot) => {
      const scores = snapshot.val();
      if (scores) {
        const sortedScores = Object.entries(scores)
          .map(([key, value]: [string, any]) => ({
            id: key,
            ...value
          }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 15);
        setHighScores(sortedScores);
      }
    });

    onValue(usedVanityNumbersRef, (snapshot: DataSnapshot) => {
      const usedNumbers = snapshot.val();
      if (usedNumbers) {
        setUsedVanityNumbers(usedNumbers);
      }
    });

    // Initialize dropTime
    setDropTime(1000);

    return () => unsubscribe();
  }, []);

  const movePiece = (dx: number, dy: number) => {
    if (!currentPiece || gameOver) return;
    const newPosition = { x: currentPiece.position.x + dx, y: currentPiece.position.y + dy };
    if (isValidMove(currentPiece.shape, newPosition)) {
      setCurrentPiece({ ...currentPiece, position: newPosition });
    } else if (dy > 0) {
      placePiece();
    }
  };

  const rotatePiece = () => {
    if (!currentPiece || gameOver) return;
    const rotatedShape = currentPiece.shape[0].map((_, index) =>
      currentPiece.shape.map(row => row[index]).reverse()
    );
    if (isValidMove(rotatedShape, currentPiece.position)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
    }
  };

  const isValidMove = (shape: number[][], position: { x: number; y: number }) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = position.x + x;
          const newY = position.y + y;
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT || (newY >= 0 && board[newY][newX])) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = () => {
    if (!currentPiece) return;
    const newBoard = [...board];
    let gameOverTriggered = false;

    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const newY = currentPiece.position.y + y;
          const newX = currentPiece.position.x + x;
          
          if (newY < 0) {
            gameOverTriggered = true;
            break;
          }
          
          newBoard[newY][newX] = currentPiece.type;
        }
      }
      if (gameOverTriggered) break;
    }

    if (gameOverTriggered || checkGameOver(newBoard)) {
      endGame();
      return;
    }

    setBoard(newBoard);
    clearLines(newBoard);
    setCurrentPiece(createNewPiece());
    setDropTime(1000 / (level + 1));
  };

  const checkGameOver = (board: (TetrominoType | null)[][]) => {
    // Check if any cell in the top row is filled
    return board[0].some(cell => cell !== null);
  };

  const endGame = () => {
    setGameOver(true);
    setDropTime(null);
    setShowGameOver(true);
    if (!vanityNumber && score >= 500) {
      setShowPlayerNumberSelector(true);
    } else {
      submitScore();
    }
    setFirstGameOver(false);
  };

  const startNewGame = () => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)));
    setScore(0);
    setLevel(1);
    setGameOver(false);
    setShowGameOver(false);
    setCurrentPiece(createNewPiece());
    setDropTime(1000);
    setLinesCleared(0);
  };

  const updateScore = (newScore: number, newLinesCleared: number) => {
    setScore(newScore);
    setLinesCleared(newLinesCleared);
    if (newScore > userHighScore) {
      setUserHighScore(newScore);
      localStorage.setItem('tetrisHighScore', newScore.toString());
    }
  };

  const submitScore = useCallback(() => {
    if (!vanityNumber) {
      console.log('Vanity number not set, score not submitted');
      return;
    }

    const playerName = `Player ${vanityNumber}`;
    const newScoreRef = push(ref(database, 'tetrisHighScores'));
    set(newScoreRef, {
      name: playerName,
      score: score
    }).then(() => {
      console.log('Score submitted successfully');
    }).catch((error) => {
      console.error('Error submitting score:', error);
    });
  }, [vanityNumber, score]);

  const setVanityNumberHandler = useCallback((number: number) => {
    if (!usedVanityNumbers.includes(number)) {
      setVanityNumber(number);
      localStorage.setItem('tetrisVanityNumber', number.toString());
      setShowPlayerNumberSelector(false);
      setUsedVanityNumbers(prev => [...prev, number]);
      set(ref(database, 'usedVanityNumbers'), [...usedVanityNumbers, number])
        .then(() => {
          // Submit the score after the vanity number is set
          const playerName = `Player ${number}`;
          const newScoreRef = push(ref(database, 'tetrisHighScores'));
          return set(newScoreRef, {
            name: playerName,
            score: score
          });
        })
        .then(() => {
          console.log('Vanity number set and score submitted successfully');
        })
        .catch((error) => {
          console.error('Error setting vanity number or submitting score:', error);
        });
    } else {
      alert('This player number is already taken. Please choose another one.');
    }
  }, [usedVanityNumbers, score]);

  const handleVanityNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 9999)) {
      setTempVanityNumber(value);
    }
  };

  const handleVanityNumberSubmit = () => {
    const num = parseInt(tempVanityNumber);
    if (num >= 0 && num <= 9999 && ![69, 420, 187, 1738].includes(num)) {
      setVanityNumberHandler(num);
    } else {
      alert('Invalid player number. Please choose a number between 0 and 9999, excluding 69, 420, 187, and 1738.');
    }
  };

  const clearLines = (board: (TetrominoType | null)[][]) => {
    let newLinesCleared = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell !== null)) {
        newLinesCleared++;
        return false;
      }
      return true;
    });
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
    }
    setBoard(newBoard);
    const newScore = score + newLinesCleared * 100 * level;
    const totalLinesCleared = linesCleared + newLinesCleared;
    updateScore(newScore, totalLinesCleared);
  };

  const startGame = (startLevel: number = 1) => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLevel(startLevel);
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)));
    setCurrentPiece(createNewPiece());
    setDropTime(1000 / (startLevel + 1));
    setLinesCleared(0);
  };

  const drop = useCallback(() => {
    if (!currentPiece) return;
    if (isValidMove(currentPiece.shape, { x: currentPiece.position.x, y: currentPiece.position.y + 1 })) {
      setCurrentPiece(prevPiece => ({
        ...prevPiece!,
        position: { ...prevPiece!.position, y: prevPiece!.position.y + 1 }
      }));
    } else {
      placePiece();
    }
  }, [currentPiece, isValidMove, placePiece]);

  const dropPiece = useCallback(() => {
    setDropTime(50); // Increase speed temporarily
  }, []);

  const releasePiece = useCallback(() => {
    setDropTime(1000 / (level + 1)); // Reset to normal speed
  }, [level]);

  useEffect(() => {
    if (gameStarted && !gameOver && dropTime !== null) {
      const dropTimer = setInterval(() => {
        drop();
      }, dropTime);
      return () => clearInterval(dropTimer);
    }
  }, [gameStarted, gameOver, dropTime, drop]);

  useEffect(() => {
    if (score > level * 1000) {
      setLevel(prev => prev + 1);
      setDropTime(prev => (prev ? prev * 0.9 : null));
    }
  }, [score, level]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!gameStarted || gameOver) return;

    switch (event.key) {
      case 'ArrowLeft':
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        dropPiece();
        break;
      case 'ArrowUp':
        rotatePiece();
        break;
    }
  }, [gameStarted, gameOver, movePiece, dropPiece, rotatePiece]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setWindowSize({ 
          width: window.innerWidth, 
          height: window.innerHeight // Remove the subtraction
        });
      } else {
        setWindowSize({ width: 400, height: 600 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCell = (cell: TetrominoType | null, x: number, y: number) => (
    <div key={`${x}-${y}`} className={`tetris-cell ${cell || ''}`} />
  );

  const renderPiece = (piece: Tetromino) => {
    return (
      <div
        className={`tetris-piece ${piece.type}`}
        style={{
          top: `${piece.position.y * (100 / BOARD_HEIGHT)}%`,
          left: `${piece.position.x * (100 / BOARD_WIDTH)}%`,
          width: `${(100 / BOARD_WIDTH) * piece.shape[0].length}%`,
          height: `${(100 / BOARD_HEIGHT) * piece.shape.length}%`,
        }}
      >
        {piece.shape.map((row, y) => (
          row.map((cell, x) => (
            cell ? (
              <div
                key={`${x}-${y}`}
                className="tetris-piece-cell filled"
                style={{
                  top: `${(y / piece.shape.length) * 100}%`,
                  left: `${(x / piece.shape[0].length) * 100}%`,
                  width: `${(1 / piece.shape[0].length) * 100}%`,
                  height: `${(1 / piece.shape.length) * 100}%`,
                }}
              />
            ) : null
          ))
        ))}
      </div>
    );
  };

  return (
    <ResizableWindow
      title={`Tetris - Score: ${score} | Level: ${level} | Lines: ${linesCleared} | Player #${vanityNumber || '???'}`}
      onClose={onClose}
      appName="tetris"
      className={`${className} tetris-window`}
      style={style}
      initialWidth={windowSize.width}
      initialHeight={windowSize.height}
      isIframeApp={isIframeApp}
    >
      <div className="tetris">
        <div className="tetris-content">
          <div className="tetris-board-container">
            <div className="tetris-board">
              {board.map((row, y) =>
                row.map((cell, x) => renderCell(cell, x, y))
              )}
              {currentPiece && renderPiece(currentPiece)}
            </div>
          </div>
          <div className="tetris-controls">
            {!gameStarted && !gameOver ? (
              <div className="start-buttons">
                <button onClick={() => startGame(1)} className="start-button">Level 1</button>
                <button onClick={() => startGame(10)} className="start-button">Level 10</button>
              </div>
            ) : gameStarted && !gameOver ? (
              <>
                <button onClick={() => movePiece(-1, 0)}>←</button>
                <button onMouseDown={dropPiece} onMouseUp={releasePiece} onMouseLeave={releasePiece} onTouchStart={dropPiece} onTouchEnd={releasePiece}>↓</button>
                <button onClick={() => movePiece(1, 0)}>→</button>
                <button onClick={rotatePiece}>↻</button>
              </>
            ) : (
              <button onClick={startNewGame} className="start-button">New Game</button>
            )}
          </div>
          <button onClick={() => setShowLeaderboard(!showLeaderboard)} className="show-leaderboard-button">
            {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
          </button>
        </div>
        {showGameOver && (
          <div className="game-over-overlay">
            <div className="game-over-message">
              <h3>Game Over!</h3>
              <p>Your score: {score}</p>
              {showPlayerNumberSelector ? (
                <div className="vanity-number-selector">
                  <h4>You've scored 500 or more points! Set Your Player Number</h4>
                  <input 
                    type="number" 
                    min="0" 
                    max="9999" 
                    value={tempVanityNumber}
                    onChange={handleVanityNumberChange}
                  />
                  <button onClick={handleVanityNumberSubmit}>Set Player Number</button>
                  <button onClick={() => setVanityNumberHandler(Math.floor(Math.random() * 10000))}>
                    Set Random Player Number
                  </button>
                </div>
              ) : (
                <button onClick={startNewGame} className="start-button">New Game</button>
              )}
            </div>
          </div>
        )}
        {showLeaderboard && (
          <div className="leaderboard-overlay">
            <div className="leaderboard">
              <h3>Leaderboard (Top 15)</h3>
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {highScores.map((score, index) => (
                    <tr key={index} className={score.name === `Player ${vanityNumber}` ? 'highlighted' : ''}>
                      <td>{index + 1}</td>
                      <td>{score.name}</td>
                      <td>{score.score}</td>
                    </tr>
                  ))}
                  {!highScores.some(score => score.name === `Player ${vanityNumber}`) && (
                    <tr className="highlighted">
                      <td>-</td>
                      <td>Your Best</td>
                      <td>{userHighScore}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button onClick={() => setShowLeaderboard(false)} className="close-leaderboard-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </ResizableWindow>
  );
}