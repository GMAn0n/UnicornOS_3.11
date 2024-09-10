import React from 'react';
import './BlackMarketBeta.css';

interface BlackMarketBetaProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const BlackMarketBeta: React.FC<BlackMarketBetaProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`black-market-beta ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://uwublkmktalphatestpreviewhos.uwu-direct.pages.dev/"
        title="Black Market Beta"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default BlackMarketBeta;