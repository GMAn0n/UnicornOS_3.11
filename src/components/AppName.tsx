import React from 'react';
import ResizableWindow from './ResizableWindow';
import './AppName.css';

interface AppNameProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

const AppName: React.FC<AppNameProps> = ({ onClose, className, style, isIframeApp }) => {
  return (
    <ResizableWindow
      title="App Title"
      onClose={onClose}
      appName="appname"
      initialWidth={400}
      initialHeight={500}
      className={className}
      style={style}
      isIframeApp={isIframeApp}
    >
      {/* Add your app content here */}
      <div>Your app content goes here</div>
    </ResizableWindow>
  );
};

export default AppName;