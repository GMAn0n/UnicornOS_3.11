import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './PurityFinance.css';

interface PurityFinanceProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function PurityFinance({ onClose, className, style, isIframeApp }: PurityFinanceProps) {
  return (
    <ResizableWindow
      title="Purity Finance"
      onClose={onClose}
      appName="purityfinance"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="purity-finance-container">
        <iframe
          src="https://purity.finance"
          title="Purity Finance"
          className="purity-finance-iframe"
        />
      </div>
    </ResizableWindow>
  );
}