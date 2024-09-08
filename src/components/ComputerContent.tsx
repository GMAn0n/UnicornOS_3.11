import React from 'react';
import './ComputerContent.css';

interface ComputerContentProps {
  onAppClick: (app: string) => void;
  onClose: () => void;
}

export function ComputerContent({ onAppClick, onClose }: ComputerContentProps) {
  const apps = [
    { name: 'Calculator', icon: '🧮' },
    { name: 'Calendar', icon: '📅' },
    { name: 'Notepad', icon: '📝' },
    { name: 'Stickies', icon: '🗒️' },
    { name: 'Terminal', icon: '💻' },
    { name: 'Bluwumbuwurg', icon: '📈' },
    { name: 'UwUScape', icon: '🌐' },
    { name: 'Virtual Unicorn', icon: '🦄' },
  ];

  return (
    <div className="window hard-disk-window">
      <div className="window-header">
        <span>Hard Disk</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <div className="icon-grid">
          {apps.map((app) => (
            <button
              key={app.name}
              className="app-icon"
              onClick={() => onAppClick(app.name.toLowerCase().replace(' ', ''))}
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