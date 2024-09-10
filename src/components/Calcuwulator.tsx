import React, { useState } from 'react';
import './Calcuwulator.css';

interface CalcuwulatorProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const Calcuwulator: React.FC<CalcuwulatorProps> = ({ className, style, onFocus }) => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const handleNumberClick = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperatorClick = (op: string) => {
    setPrevValue(parseFloat(display));
    setOperator(op);
    setDisplay('0');
  };

  const handleEqualsClick = () => {
    if (prevValue !== null && operator) {
      const currentValue = parseFloat(display);
      let result: number;
      switch (operator) {
        case '+':
          result = prevValue + currentValue;
          break;
        case '-':
          result = prevValue - currentValue;
          break;
        case '*':
          result = prevValue * currentValue;
          break;
        case '/':
          result = prevValue / currentValue;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setPrevValue(null);
      setOperator(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
  };

  return (
    <div className={`calcuwulator ${className}`} style={style} onClick={onFocus}>
      <div className="display">{display}</div>
      <div className="keypad">
        {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/'].map(key => (
          <button
            key={key}
            onClick={() => {
              if (key === '=') handleEqualsClick();
              else if (['+', '-', '*', '/'].includes(key)) handleOperatorClick(key);
              else handleNumberClick(key);
            }}
          >
            {key}
          </button>
        ))}
        <button onClick={handleClear}>C</button>
      </div>
    </div>
  );
};

export default Calcuwulator;