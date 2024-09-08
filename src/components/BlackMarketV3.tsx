import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './BlackMarketV3.css';

interface BlackMarketV3Props {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function BlackMarketV3({ onClose, className, style, isIframeApp }: BlackMarketV3Props) {
  return (
    <ResizableWindow
      title="Black Market V3"
      onClose={onClose}
      appName="blackmarketv3"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="black-market-v3-container">
        <iframe
          src="https://unity-bug-fixes.uwublk-market.pages.dev/"
          title="Black Market V3"
          className="black-market-v3-iframe"
        />
      </div>
    </ResizableWindow>
  );
}