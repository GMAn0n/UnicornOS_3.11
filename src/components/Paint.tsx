import React, { useRef, useEffect, useState } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Paint.css';

interface PaintProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function Paint({ onClose, className, style, isIframeApp }: PaintProps) {
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(5);
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const updateSize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight - 100 });
      } else {
        setWindowSize({ width: 800, height: 600 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    // Load saved canvas state
    const savedCanvas = localStorage.getItem('paintCanvas');
    if (savedCanvas) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
        saveState();
      };
      img.src = savedCanvas;
    } else {
      saveState();
    }
  }, [color, lineWidth]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.beginPath(); // Start a new path
      }
      localStorage.setItem('paintCanvas', canvas.toDataURL());
      saveState();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let x, y;
    if ('touches' in e) {
      x = (e.touches[0].clientX - rect.left) * scaleX;
      y = (e.touches[0].clientY - rect.top) * scaleY;
    } else {
      x = (e.clientX - rect.left) * scaleX;
      y = (e.clientY - rect.top) * scaleY;
    }

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      localStorage.removeItem('paintCanvas');
      saveState();
    }
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prevHistory => [...prevHistory, imageData]);
    }
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context && history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove the current state
      const previousState = newHistory[newHistory.length - 1];
      context.putImageData(previousState, 0, 0);
      setHistory(newHistory);
      localStorage.setItem('paintCanvas', canvas.toDataURL());
    }
  };

  return (
    <ResizableWindow
      title="Paint"
      onClose={onClose}
      appName="paint"
      className={className}
      style={style}
      initialWidth={windowSize.width}
      initialHeight={windowSize.height}
      isIframeApp={isIframeApp}
    >
      <div className="paint">
        <div className="paint-controls">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(parseInt(e.target.value))}
          />
          <button onClick={clearCanvas}>Clear</button>
          <button onClick={undo} disabled={history.length <= 1}>Undo</button>
        </div>
        <canvas
          ref={canvasRef}
          width={windowSize.width}
          height={windowSize.height - 50} // Subtract height of controls
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </ResizableWindow>
  );
}