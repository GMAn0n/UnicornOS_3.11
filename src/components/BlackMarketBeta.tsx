import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './BlackMarketBeta.css';

interface BlackMarketBetaProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function BlackMarketBeta({ onClose, className, style, isIframeApp }: BlackMarketBetaProps) {
  return (
    <ResizableWindow
      title="Black Market Beta"
      onClose={onClose}
      appName="blackmarketbeta"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="black-market-beta-container">
        <iframe
          src="https://uwublkmktalphatestpreviewhos.uwu-direct.pages.dev/"
          title="Black Market Beta"
          className="black-market-beta-iframe"
        />
      </div>
    </ResizableWindow>
  );
}