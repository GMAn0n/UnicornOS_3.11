import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PinballGame } from '../game/PinballEngine';
import './UnicornPinball.css';

interface UnicornPinballProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const UnicornPinball: React.FC<UnicornPinballProps> = ({ onClose, className, style, isIframeApp, onFocus }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<PinballGame | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);

  const initGame = useCallback(() => {
    if (canvasRef.current) {
      gameRef.current = new PinballGame();
    }
  }, []);

  const updateGame = useCallback((deltaTime: number) => {
    if (gameRef.current) {
      gameRef.current.update(deltaTime);
      setScore(gameRef.current.getScore());
      setLives(gameRef.current.getLives());
      setIsGameOver(gameRef.current.isOver());
    }
  }, []);

  const renderGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas && gameRef.current) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        gameRef.current.render(ctx);
      }
    }
  }, []);

  useEffect(() => {
    initGame();
    let lastTime = 0;
    const gameLoop = (timestamp: number) => {
      const deltaTime = (timestamp - lastTime) / 1000;
      updateGame(deltaTime);
      renderGame();
      lastTime = timestamp;
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }, [initGame, updateGame, renderGame]);

  const handleLeftFlipperDown = useCallback(() => gameRef.current?.flipLeftFlipper(), []);
  const handleRightFlipperDown = useCallback(() => gameRef.current?.flipRightFlipper(), []);
  const handleFlippersUp = useCallback(() => gameRef.current?.releaseFlippers(), []);
  const handleLaunchStart = useCallback(() => {
    const chargeLauncher = () => {
      if (gameRef.current) {
        gameRef.current.chargeLauncher();
        requestAnimationFrame(chargeLauncher);
      }
    };
    chargeLauncher();
  }, []);
  const handleLaunchEnd = useCallback(() => gameRef.current?.launchBall(), []);

  const handleRestartGame = useCallback(() => {
    if (gameRef.current) {
      gameRef.current.restartGame();
      setIsGameOver(false);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleLeftFlipperDown();
      if (e.key === 'ArrowRight') handleRightFlipperDown();
      if (e.key === ' ') handleLaunchStart();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') handleFlippersUp();
      if (e.key === ' ') handleLaunchEnd();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleLeftFlipperDown, handleRightFlipperDown, handleFlippersUp, handleLaunchStart, handleLaunchEnd]);

  return (
    <div className={`unicorn-pinball ${className}`} style={style} onClick={onFocus}>
      <div className="window-header">
        <span>Unicorn Pinball</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="game-container">
        <canvas ref={canvasRef} width={400} height={700} />
        {isGameOver && (
          <div className="game-over-overlay">
            <h2>Game Over</h2>
            <p>Final Score: {score}</p>
            <button onClick={handleRestartGame}>New Game</button>
          </div>
        )}
      </div>
      <div className="controls">
        <button
          className="flipper-button left"
          onMouseDown={handleLeftFlipperDown}
          onMouseUp={handleFlippersUp}
          onTouchStart={handleLeftFlipperDown}
          onTouchEnd={handleFlippersUp}
        >
          Left Flipper
        </button>
        <button
          className="launch-button"
          onMouseDown={handleLaunchStart}
          onMouseUp={handleLaunchEnd}
          onTouchStart={handleLaunchStart}
          onTouchEnd={handleLaunchEnd}
        >
          Launch
        </button>
        <button
          className="flipper-button right"
          onMouseDown={handleRightFlipperDown}
          onMouseUp={handleFlippersUp}
          onTouchStart={handleRightFlipperDown}
          onTouchEnd={handleFlippersUp}
        >
          Right Flipper
        </button>
      </div>
    </div>
  );
};

export default UnicornPinball;