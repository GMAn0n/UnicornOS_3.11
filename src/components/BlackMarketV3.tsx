import React from 'react';
import './BlackMarketV3.css';

interface BlackMarketV3Props {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const BlackMarketV3: React.FC<BlackMarketV3Props> = ({ className, style, onFocus }) => {
  return (
    <div className={`black-market-v3 ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://unity-bug-fixes.uwublk-market.pages.dev/"
        title="Black Market V3"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default BlackMarketV3;