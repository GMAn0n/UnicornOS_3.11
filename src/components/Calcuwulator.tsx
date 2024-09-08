import React, { useState } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Calcuwulator.css';

interface CalcuwulatorProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function Calcuwulator({ onClose, className, style, isIframeApp }: CalcuwulatorProps) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [memory, setMemory] = useState<number>(0);

  const handleNumberClick = (num: string) => {
    setDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleOperationClick = (op: string) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result: number;
      switch (operation) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '*':
          result = previousValue * current;
          break;
        case '/':
          result = previousValue / current;
          break;
        default:
          return;
      }
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  };

  // Financial functions
  const calculateCompoundInterest = () => {
    const [principal, rate, time] = display.split(',').map(Number);
    const result = principal * Math.pow(1 + rate / 100, time);
    setDisplay(result.toFixed(2));
  };

  const calculateLoanPayment = () => {
    const [principal, rate, time] = display.split(',').map(Number);
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = time * 12;
    const result = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    setDisplay(result.toFixed(2));
  };

  // Scientific functions
  const handleSin = () => setDisplay(Math.sin(parseFloat(display)).toString());
  const handleCos = () => setDisplay(Math.cos(parseFloat(display)).toString());
  const handleTan = () => setDisplay(Math.tan(parseFloat(display)).toString());
  const handleLog = () => setDisplay(Math.log10(parseFloat(display)).toString());
  const handleLn = () => setDisplay(Math.log(parseFloat(display)).toString());
  const handleSqrt = () => setDisplay(Math.sqrt(parseFloat(display)).toString());
  const handlePower = () => handleOperationClick('^');

  // Memory functions
  const handleMemoryAdd = () => setMemory(memory + parseFloat(display));
  const handleMemorySubtract = () => setMemory(memory - parseFloat(display));
  const handleMemoryRecall = () => setDisplay(memory.toString());
  const handleMemoryClear = () => setMemory(0);

  return (
    <ResizableWindow
      title="Calcuwulator"
      onClose={onClose}
      appName="calcuwulator"
      className={className}
      style={style}
      initialWidth={400}
      initialHeight={600}
      isIframeApp={isIframeApp}
    >
      <div className="calcuwulator">
        <div className="display">{display}</div>
        <div className="keypad">
          {/* Basic operations */}
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperationClick('+')}>+</button>
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleOperationClick('-')}>-</button>
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleOperationClick('*')}>*</button>
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={handleDecimal}>.</button>
          <button onClick={handleEquals}>=</button>
          <button onClick={() => handleOperationClick('/')}>/</button>
          <button onClick={handleClear}>C</button>

          {/* Financial operations */}
          <button onClick={calculateCompoundInterest}>CI</button>
          <button onClick={calculateLoanPayment}>LP</button>

          {/* Scientific operations */}
          <button onClick={handleSin}>sin</button>
          <button onClick={handleCos}>cos</button>
          <button onClick={handleTan}>tan</button>
          <button onClick={handleLog}>log</button>
          <button onClick={handleLn}>ln</button>
          <button onClick={handleSqrt}>√</button>
          <button onClick={handlePower}>^</button>

          {/* Memory operations */}
          <button onClick={handleMemoryAdd}>M+</button>
          <button onClick={handleMemorySubtract}>M-</button>
          <button onClick={handleMemoryRecall}>MR</button>
          <button onClick={handleMemoryClear}>MC</button>
        </div>
      </div>
    </ResizableWindow>
  );
}