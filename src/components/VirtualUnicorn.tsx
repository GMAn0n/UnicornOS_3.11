import React from 'react';
import { ResizableWindow } from './ResizableWindow';
import './VirtualUnicorn.css';

interface VirtualUnicornProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

export default function VirtualUnicorn({ onClose, className, style, isIframeApp }: VirtualUnicornProps) {
  return (
    <ResizableWindow
      title="Virtual Unicorn"
      onClose={onClose}
      appName="virtualunicorn"
      className={className}
      style={style}
      initialWidth="80%"
      initialHeight="80%"
      isIframeApp={isIframeApp}
    >
      <div className="virtual-unicorn-container">
        <iframe
          src="https://unicorn.meme"
          title="Virtual Unicorn"
          className="virtual-unicorn-iframe"
        />
      </div>
    </ResizableWindow>
  );
}