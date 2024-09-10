import React, { useRef, useEffect, useState } from 'react';
import ResizableWindow from './ResizableWindow';
import './Paint.css';

interface PaintProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

const Paint: React.FC<PaintProps> = ({ onClose, className, style, isIframeApp }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;

    // Load saved canvas state
    const savedCanvas = localStorage.getItem('paintCanvas');
    if (savedCanvas) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
      img.src = savedCanvas;
    }
  }, [color, brushSize]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      localStorage.setItem('paintCanvas', canvas.toDataURL());
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
    }
  };

  return (
    <ResizableWindow
      title="Paint"
      onClose={onClose}
      appName="paint"
      initialWidth={800}
      initialHeight={600}
      className={className}
      style={style}
      isIframeApp={isIframeApp}
    >
      <div className="paint">
        <div className="paint-controls">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
          <button onClick={clearCanvas}>Clear</button>
        </div>
        <canvas
          ref={canvasRef}
          width={800}
          height={550}
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
};

export default Paint;