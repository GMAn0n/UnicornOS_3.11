import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Terminal.css';

interface TerminalProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function Terminal({ onClose, className, style, isIframeApp }: TerminalProps) {
  return (
    <ResizableWindow
      title="Terminal"
      onClose={onClose}
      appName="terminal"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="terminal-container">
        <iframe
          src="https://unicornterminal.meme"
          title="UnicornOS Terminal"
          className="terminal-iframe"
        />
      </div>
    </ResizableWindow>
  );
}