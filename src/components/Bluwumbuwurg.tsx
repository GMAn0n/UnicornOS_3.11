import React from 'react';
import './Bluwumbuwurg.css';

interface BluwumbuwurgProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const Bluwumbuwurg: React.FC<BluwumbuwurgProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`bluwumbuwurg ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://uwu.pro"
        title="Bluwumbuwurg"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default Bluwumbuwurg;