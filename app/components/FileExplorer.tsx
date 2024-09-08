import React from 'react';
import unicornPinballIcon from '../assets/unicorn-pinball-icon.png';
import { useAppContext } from '../context/AppContext';

const FileExplorer: React.FC = () => {
  const { launchApp } = useAppContext();

  const apps = [
    // ... existing apps ...
    {
      name: 'Unicorn Pinball',
      icon: unicornPinballIcon,
      onClick: () => launchApp('UnicornPinball')
    }
  ];

  return (
    <div className="file-explorer">
      {apps.map((app, index) => (
        <div key={index} className="app-icon" onClick={app.onClick}>
          <img src={app.icon} alt={app.name} />
          <span>{app.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FileExplorer;