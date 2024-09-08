import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './BlackMarketLiquidity.css';

interface BlackMarketLiquidityProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function BlackMarketLiquidity({ onClose, className, style, isIframeApp }: BlackMarketLiquidityProps) {
  return (
    <ResizableWindow
      title="Black Market Liquidity"
      onClose={onClose}
      appName="blackmarketliquidity"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="black-market-liquidity-container">
        <iframe
          src="https://unity-lp.uwu-direct.pages.dev/"
          title="Black Market Liquidity"
          className="black-market-liquidity-iframe"
        />
      </div>
    </ResizableWindow>
  );
}