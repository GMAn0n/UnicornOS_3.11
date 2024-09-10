import React from 'react';
import './Terminal.css';

interface TerminalProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`terminal ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://unicornterminal.meme"
        title="Terminal"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default Terminal;