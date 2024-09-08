import React, { useState } from 'react';
import './ResizableIframe.css';

interface ResizableIframeProps {
  src: string;
  title: string;
  onClose: () => void;
}

export function ResizableIframe({ src, title, onClose }: ResizableIframeProps) {
  const [size, setSize] = useState({ width: 800, height: 600 });

  const handleResize = (e: React.MouseEvent, direction: string) => {
    // Implement resizing logic
  };

  return (
    <div className="window resizable-iframe" style={{ width: size.width, height: size.height }}>
      <div className="window-header">
        <span>{title}</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe src={src} title={title} width="100%" height="100%"></iframe>
      </div>
      <div className="resize-handle" onMouseDown={(e) => handleResize(e, 'se')}></div>
    </div>
  );
}