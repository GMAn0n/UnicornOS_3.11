import React, { useState } from 'react';
import './MenuBar.css';

interface MenuBarProps {
  onFileExplorerClick: () => void;
  isWalletConnected: boolean;
  onWalletToggle: () => void;
  isStickiesOpen: boolean;
  onNewStickyClick: () => void;
  version: string;
}

export const MenuBar: React.FC<MenuBarProps> = ({ 
  onFileExplorerClick, 
  isWalletConnected, 
  onWalletToggle, 
  isStickiesOpen,
  onNewStickyClick,
  version
}) => {
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);

  return (
    <div className="menu-bar">
      <div className="menu-item">
        <button onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}>🍊 File</button>
        {isFileMenuOpen && (
          <div className="dropdown-menu">
            <button onClick={onFileExplorerClick}>📁 File Explorer</button>
            <button onClick={onWalletToggle}>
              {isWalletConnected ? '🔓 Disconnect Wallet' : '🔒 Connect Wallet'}
            </button>
            {/* Add more file-related options here */}
          </div>
        )}
      </div>
      {isStickiesOpen && (
        <button onClick={onNewStickyClick}>📝 New Sticky</button>
      )}
      <span className="version">UnicornOS {version}</span>
    </div>
  );
};