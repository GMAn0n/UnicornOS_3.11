import React from 'react';
import './BuwutCamp.css';

interface BuwutCampProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const BuwutCamp: React.FC<BuwutCampProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`buwut-camp ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://buwutcamp.com"
        title="Buwut Camp"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default BuwutCamp;