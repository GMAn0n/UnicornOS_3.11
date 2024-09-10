import React, { useState, useCallback } from 'react';
import MenuBar from './components/MenuBar';
import FileExplorer from './components/FileExplorer';
import ResizableWindow from './components/ResizableWindow';
import Tetris from './components/Tetris';
import MemojiMinesweeper from './components/MemojiMinesweeper';
import Paint from './components/Paint';
import GuestBuwuk from './components/GuestBuwuk';
// Import other components as needed
import './App.css';

const App: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isStickiesOpen, setIsStickiesOpen] = useState(false);

  const handleAppClick = useCallback((appName: string) => {
    setOpenApps(prev => [...prev, appName]);
  }, []);

  const handleAppClose = useCallback((appName: string) => {
    setOpenApps(prev => prev.filter(app => app !== appName));
  }, []);

  const handleFileExplorerClick = useCallback(() => {
    setIsFileExplorerOpen(prev => !prev);
  }, []);

  const handleWalletToggle = useCallback(() => {
    setIsWalletConnected(prev => !prev);
  }, []);

  const handleNewStickyClick = useCallback(() => {
    setIsStickiesOpen(true);
  }, []);

  const renderApp = (appName: string) => {
    switch (appName) {
      case 'Tetris':
        return (
          <ResizableWindow
            key={appName}
            title="Tetris"
            onClose={() => handleAppClose(appName)}
            appName="tetris"
            initialWidth={300}
            initialHeight={600}
          >
            <Tetris onClose={() => handleAppClose(appName)} onFocus={() => {}} />
          </ResizableWindow>
        );
      case 'MemojiMinesweeper':
        return (
          <ResizableWindow
            key={appName}
            title="Memoji Minesweeper"
            onClose={() => handleAppClose(appName)}
            appName="memojiminesweeper"
            initialWidth={800}
            initialHeight={800}
          >
            <MemojiMinesweeper onClose={() => handleAppClose(appName)} />
          </ResizableWindow>
        );
      case 'Paint':
        return (
          <ResizableWindow
            key={appName}
            title="Paint"
            onClose={() => handleAppClose(appName)}
            appName="paint"
            initialWidth={800}
            initialHeight={600}
          >
            <Paint onClose={() => handleAppClose(appName)} />
          </ResizableWindow>
        );
      case 'GuestBuwuk':
        return (
          <ResizableWindow
            key={appName}
            title="Guest Buwuk"
            onClose={() => handleAppClose(appName)}
            appName="guestbuwuk"
            initialWidth={400}
            initialHeight={500}
          >
            <GuestBuwuk onClose={() => handleAppClose(appName)} />
          </ResizableWindow>
        );
      // Add cases for other apps
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <MenuBar 
        onFileExplorerClick={handleFileExplorerClick}
        isWalletConnected={isWalletConnected}
        onWalletToggle={handleWalletToggle}
        isStickiesOpen={isStickiesOpen}
        onNewStickyClick={handleNewStickyClick}
        version="3.11"
      />
      <div className="desktop">
        <button className="hard-disk-icon" onClick={handleFileExplorerClick}>
          <span role="img" aria-label="Hard Drive">💾</span>
          <span>Hard Drive</span>
        </button>
        {isFileExplorerOpen && (
          <FileExplorer 
            onClose={() => setIsFileExplorerOpen(false)}
            onAppClick={handleAppClick}
          />
        )}
        {openApps.map(renderApp)}
      </div>
    </div>
  );
};

export default App;