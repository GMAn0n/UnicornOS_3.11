import React from 'react';
import './BlackMarketLiquidity.css';

interface BlackMarketLiquidityProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const BlackMarketLiquidity: React.FC<BlackMarketLiquidityProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`black-market-liquidity ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://unity-lp.uwu-direct.pages.dev/"
        title="Black Market Liquidity"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default BlackMarketLiquidity;