import React from 'react';
import './FileExplorer.css';
import Tetris from './Tetris';

interface FileExplorerProps {
  onAppClick: (app: string) => void;
  onClose: () => void;
  isFullscreenOnMobile?: boolean;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ onAppClick, onClose, isFullscreenOnMobile = true }) => {
  const apps = [
    { name: 'Calcuwulator', icon: '🧮' },
    { name: 'Calendar', icon: '📅' },
    { name: 'Notepad', icon: '📝' },
    { name: 'Paint', icon: '🎨' },
    { name: 'Memoji Minesweeper', icon: '💣' },
    { name: 'Bluwumbuwurg', icon: '💹' },
    { name: 'UwUScape', icon: '🌐' },
    { name: 'Virtual Unicorn', icon: '🦄' },
    { name: 'Black Market Beta', icon: '💀' },
    { name: 'Black Market V2', icon: '🕵️' },
    { name: 'Black Market V3', icon: '🎭' },
    { name: 'Black Market Liquidity', icon: '💧' },
    { name: 'Purity Finance', icon: '💰' },
    { name: 'Buwut Camp', icon: '🏪' },
    { name: 'Terminal', icon: '💻' },
    { name: 'Stickies', icon: '🗒️' },
    { name: 'Tetris', icon: '🧱' },
    { name: 'Unicorn Pinball', icon: '🎰' }, // Changed to slot machine emoji
  ];

  return (
    <div className={`file-explorer ${isFullscreenOnMobile ? 'fullscreen-mobile' : ''}`}>
      <div className="file-explorer-header">
        <span>File Explorer</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="file-explorer-content">
        <div className="icon-grid">
          {apps.map((app) => (
            <button
              key={app.name}
              className="app-icon"
              onClick={() => onAppClick(app.name)}
            >
              <span className="icon">{app.icon}</span>
              <span className="name">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}