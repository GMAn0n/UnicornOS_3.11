import React from 'react';
import './PurityFinance.css';

interface PurityFinanceProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const PurityFinance: React.FC<PurityFinanceProps> = ({ className, style, onFocus }) => {
  return (
    <div className={`purity-finance ${className}`} style={style} onClick={onFocus}>
      <iframe
        src="https://www.purity.finance/"
        title="Purity Finance"
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default PurityFinance;