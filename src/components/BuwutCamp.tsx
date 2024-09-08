import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './BuwutCamp.css';

interface BuwutCampProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function BuwutCamp({ onClose, className, style, isIframeApp }: BuwutCampProps) {
  return (
    <ResizableWindow
      title="Buwut Camp"
      onClose={onClose}
      appName="buwutcamp"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="buwut-camp-container">
        <iframe
          src="https://uwublack.market/?trademode=true"
          title="Buwut Camp"
          className="buwut-camp-iframe"
        />
      </div>
    </ResizableWindow>
  );
}