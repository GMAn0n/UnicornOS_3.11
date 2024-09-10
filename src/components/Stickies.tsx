import React, { useState, useEffect } from 'react';
import './Stickies.css';

interface StickiesProps {
  onClose: () => void;
  onNewSticky: (callback: () => void) => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
  onFocus?: () => void;
}

interface Sticky {
  id: number;
  content: string;
  position: { x: number; y: number };
}

const Stickies: React.FC<StickiesProps> = ({ 
  onClose, 
  onNewSticky, 
  className = '', 
  style = {}, 
  isIframeApp = false, 
  onFocus = () => {} 
}) => {
  const [stickies, setStickies] = useState<Sticky[]>([]);

  useEffect(() => {
    const savedStickies = JSON.parse(localStorage.getItem('stickies') || '[]');
    setStickies(savedStickies);
  }, []);

  const addSticky = () => {
    const newSticky: Sticky = {
      id: Date.now(),
      content: '',
      position: { x: Math.random() * 300, y: Math.random() * 300 },
    };
    const updatedStickies = [...stickies, newSticky];
    setStickies(updatedStickies);
    saveStickies(updatedStickies);
  };

  useEffect(() => {
    onNewSticky(addSticky);
  }, [onNewSticky]);

  const saveStickies = (updatedStickies: Sticky[]) => {
    localStorage.setItem('stickies', JSON.stringify(updatedStickies));
  };

  const updateStickyContent = (id: number, content: string) => {
    const updatedStickies = stickies.map(sticky =>
      sticky.id === id ? { ...sticky, content } : sticky
    );
    setStickies(updatedStickies);
    saveStickies(updatedStickies);
  };

  const updateStickyPosition = (id: number, position: { x: number; y: number }) => {
    const updatedStickies = stickies.map(sticky =>
      sticky.id === id ? { ...sticky, position } : sticky
    );
    setStickies(updatedStickies);
    saveStickies(updatedStickies);
  };

  return (
    <>
      {stickies.map(sticky => (
        <div
          key={sticky.id}
          className={`sticky ${className}`}
          style={{ left: sticky.position.x, top: sticky.position.y, ...style }}
          draggable
          onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
            const { clientX, clientY } = e;
            updateStickyPosition(sticky.id, { x: clientX, y: clientY });
          }}
        >
          <textarea
            value={sticky.content}
            onChange={(e) => updateStickyContent(sticky.id, e.target.value)}
            className="sticky-textarea"
          />
        </div>
      ))}
    </>
  );
};

export default Stickies;