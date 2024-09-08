import React from 'react';
import './Games.css';

interface GamesProps {
  onClose: () => void;
}

export default function Games({ onClose }: GamesProps) {
  return (
    <div className="window games">
      <div className="window-header">
        <span>Games</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://unicornio.meme/" 
          title="Games"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}