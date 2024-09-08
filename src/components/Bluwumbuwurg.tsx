import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Bluwumbuwurg.css';

interface BluwumbuwurgProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function Bluwumbuwurg({ onClose, className, style, isIframeApp }: BluwumbuwurgProps) {
  return (
    <ResizableWindow
      title="Bluwumbuwurg"
      onClose={onClose}
      appName="bluwumbuwurg"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="bluwumbuwurg-container">
        <iframe
          src="https://uwu.pro"
          title="Bluwumbuwurg"
          className="bluwumbuwurg-iframe"
        />
      </div>
    </ResizableWindow>
  );
}