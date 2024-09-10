import React from 'react';
import './UwUScape.css';

interface UwUScapeProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const UwUScape: React.FC<UwUScapeProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`uwuscape ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://uwu.direct"
        title="UwUScape"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default UwUScape;