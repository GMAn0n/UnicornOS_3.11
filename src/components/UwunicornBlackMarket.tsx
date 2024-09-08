import React from 'react';
import './UwunicornBlackMarket.css';

interface UwunicornBlackMarketProps {
  onClose: () => void;
}

export default function UwunicornBlackMarket({ onClose }: UwunicornBlackMarketProps) {
  return (
    <div className="window uwunicorn-black-market">
      <div className="window-header">
        <span>Uwunicorn Black Market</span>
        <button onClick={onClose}>×</button>
      </div>
      <div className="window-content">
        <iframe 
          src="https://uwublack.market/" 
          title="Uwunicorn Black Market"
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}