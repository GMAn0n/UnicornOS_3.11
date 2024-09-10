import React from 'react';
import './BlackMarketV2.css';

interface BlackMarketV2Props {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const BlackMarketV2: React.FC<BlackMarketV2Props> = ({ className, style, onFocus }) => {
  return (
    <div className={`black-market-v2 ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://unity-uwu.uwublk-market.pages.dev/"
        title="Black Market V2"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default BlackMarketV2;