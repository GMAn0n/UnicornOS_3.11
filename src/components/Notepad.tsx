import React, { useState, useEffect } from 'react';
import './Notepad.css';

interface NotepadProps {
  onClose: () => void;
  className: string;
  style: React.CSSProperties;
  isIframeApp: boolean;
  onFocus: () => void;
}

const Notepad: React.FC<NotepadProps> = ({ className, style, onFocus }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem('notepadText');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    localStorage.setItem('notepadText', newText);
  };

  return (
    <div className={`notepad ${className}`} style={style} onClick={onFocus}>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Start typing..."
        className="notepad-textarea"
      />
    </div>
  );
};

export default Notepad;