import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './BlackMarketV2.css';

interface BlackMarketV2Props {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function BlackMarketV2({ onClose, className, style, isIframeApp }: BlackMarketV2Props) {
  return (
    <ResizableWindow
      title="Black Market V2"
      onClose={onClose}
      appName="blackmarketv2"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="black-market-v2-container">
        <iframe
          src="https://unity-uwu.uwublk-market.pages.dev/"
          title="Black Market V2"
          className="black-market-v2-iframe"
        />
      </div>
    </ResizableWindow>
  );
}