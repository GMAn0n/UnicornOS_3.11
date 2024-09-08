import React, { useState, useEffect } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './Notepad.css';

interface NotepadProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function Notepad({ onClose, className, style, isIframeApp }: NotepadProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Load content from localStorage when the component mounts
    const savedContent = localStorage.getItem('notepadContent');
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    // Save content to localStorage whenever it changes
    localStorage.setItem('notepadContent', newContent);
  };

  return (
    <ResizableWindow
      title="Notepad"
      onClose={onClose}
      appName="notepad"
      className={className}
      style={style}
      initialWidth={400}
      initialHeight={500}
      isIframeApp={isIframeApp}
    >
      <div className="notepad">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Type your notes here..."
          className="notepad-textarea"
        />
      </div>
    </ResizableWindow>
  );
}