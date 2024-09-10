import React from 'react';
import './VirtualUnicorn.css';

interface VirtualUnicornProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const VirtualUnicorn: React.FC<VirtualUnicornProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`virtual-unicorn ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://unicorn.meme"
        title="Virtual Unicorn"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default VirtualUnicorn;