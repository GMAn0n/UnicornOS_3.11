import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import ResizableWindow from './ResizableWindow';
import './FileExplorer.css';

interface FileExplorerProps {
  onClose: () => void;
  onAppClick: (appName: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ onClose, onAppClick }) => {
  const apps = [
    'Calcuwulator', 'Calendar', 'Notepad', 'Stickies', 'Terminal', 'Paint',
    'Virtual Unicorn', 'Memoji Minesweeper', 'Bluwumbuwurg', 'UwUScape',
    'Black Market Beta', 'Black Market V2', 'Black Market V3',
    'Black Market Liquidity', 'Purity Finance', 'Buwut Camp'
  ];

  return (
    <ResizableWindow
      title="File Explorer"
      onClose={onClose}
      appName="fileexplorer"
      initialWidth={400}
      initialHeight={500}
      isFullscreenOnMobile={true}
    >
      <div className="file-explorer-content">
        {apps.map(app => (
          <div key={app} className="file-explorer-item" onClick={() => onAppClick(app)}>
            <FontAwesomeIcon icon={faFile} />
            <span>{app}</span>
          </div>
        ))}
      </div>
    </ResizableWindow>
  );
};

export default FileExplorer;