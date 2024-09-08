import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Stickies.css';

interface StickiesProps {
  onClose: () => void;
  onNewSticky: (callback: () => void) => void;
}

interface Sticky {
  id: number;
  content: string;
  color: string;
  position: { x: number; y: number };
}

export default function Stickies({ onClose, onNewSticky }: StickiesProps) {
  const [stickies, setStickies] = useState<Sticky[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [draggedStickyId, setDraggedStickyId] = useState<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const loadStickies = useCallback(() => {
    const savedStickies = localStorage.getItem('stickies');
    if (savedStickies) {
      setStickies(JSON.parse(savedStickies));
    } else {
      addSticky();
    }
  }, []);

  useEffect(() => {
    loadStickies();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loadStickies]);

  useEffect(() => {
    onNewSticky(addSticky);
  }, [onNewSticky]);

  const saveStickiesToLocalStorage = useCallback((updatedStickies: Sticky[]) => {
    localStorage.setItem('stickies', JSON.stringify(updatedStickies));
  }, []);

  const getRandomPosition = (): { x: number; y: number } => {
    const menuBarHeight = 40;
    const maxWidth = isMobile ? window.innerWidth - 150 : window.innerWidth - 200;
    const maxHeight = isMobile ? window.innerHeight - 150 - menuBarHeight : window.innerHeight - 200 - menuBarHeight;
    const x = Math.random() * maxWidth;
    const y = Math.random() * maxHeight + menuBarHeight;
    return { x, y };
  };

  const getRandomPastelColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 70 + Math.random() * 10;
    const lightness = 80 + Math.random() * 10;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const addSticky = useCallback(() => {
    const newSticky: Sticky = {
      id: Date.now(),
      content: '',
      color: getRandomPastelColor(),
      position: getRandomPosition(),
    };
    setStickies(prevStickies => {
      const updatedStickies = [...prevStickies, newSticky];
      saveStickiesToLocalStorage(updatedStickies);
      return updatedStickies;
    });
  }, [saveStickiesToLocalStorage]);

  const updateSticky = useCallback((id: number, content: string) => {
    setStickies(prevStickies => {
      const updatedStickies = prevStickies.map(sticky => 
        sticky.id === id ? { ...sticky, content } : sticky
      );
      saveStickiesToLocalStorage(updatedStickies);
      return updatedStickies;
    });
  }, [saveStickiesToLocalStorage]);

  const moveSticky = useCallback((id: number, position: { x: number; y: number }) => {
    setStickies(prevStickies => {
      const updatedStickies = prevStickies.map(sticky => 
        sticky.id === id ? { ...sticky, position } : sticky
      );
      saveStickiesToLocalStorage(updatedStickies);
      return updatedStickies;
    });
  }, [saveStickiesToLocalStorage]);

  const deleteSticky = useCallback((id: number) => {
    setStickies(prevStickies => {
      const updatedStickies = prevStickies.filter(sticky => sticky.id !== id);
      saveStickiesToLocalStorage(updatedStickies);
      if (updatedStickies.length === 0) {
        setTimeout(() => onClose(), 0);
      }
      return updatedStickies;
    });
  }, [saveStickiesToLocalStorage, onClose]);

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    if (isMobile) return;
    const sticky = stickies.find(s => s.id === id);
    if (sticky) {
      setDraggedStickyId(id);
      const stickyElement = e.currentTarget as HTMLDivElement;
      const rect = stickyElement.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (draggedStickyId !== null) {
      const maxX = isMobile ? window.innerWidth - 150 : window.innerWidth - 200;
      const maxY = isMobile ? window.innerHeight - 150 : window.innerHeight - 200;
      const newX = Math.min(Math.max(e.clientX - dragOffset.current.x, 0), maxX);
      const newY = Math.min(Math.max(e.clientY - dragOffset.current.y, 40), maxY);
      moveSticky(draggedStickyId, { x: newX, y: newY });
    }
  }, [draggedStickyId, isMobile, moveSticky]);

  const handleMouseUp = useCallback(() => {
    setDraggedStickyId(null);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isMobile, handleMouseMove, handleMouseUp]);

  return (
    <>
      {stickies.map(sticky => (
        <div
          key={sticky.id}
          className="sticky"
          style={{
            backgroundColor: sticky.color,
            left: sticky.position.x,
            top: sticky.position.y,
          }}
          onMouseDown={(e) => handleMouseDown(e, sticky.id)}
        >
          <div className="sticky-header">
            <button 
              type="button"
              className="close-sticky" 
              onClick={(e) => {
                e.stopPropagation();
                deleteSticky(sticky.id);
              }}
            >
              ×
            </button>
          </div>
          <textarea
            value={sticky.content}
            onChange={(e) => updateSticky(sticky.id, e.target.value)}
            placeholder="Type your note here..."
          />
        </div>
      ))}
    </>
  );
}