import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import './ResizableWindow.css';

interface ResizableWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  appName: string;
  initialWidth: string | number;
  initialHeight: string | number;
  isFullscreenOnMobile?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
  onFocus?: () => void;
}

export function ResizableWindow({
  title,
  onClose,
  children,
  appName,
  initialWidth,
  initialHeight,
  isFullscreenOnMobile = true,
  className,
  style,
  isIframeApp = false,
  onFocus
}: ResizableWindowProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [windowSize, setWindowSize] = useState({ width: initialWidth, height: initialHeight });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const windowStyle = isMobile && isFullscreenOnMobile
    ? { width: '100%', height: 'calc(100% - 40px)', position: 'fixed' as const, top: 40, left: 0 }
    : windowSize;

  const desktopOffset = !isMobile ? 40 : 0; // 40px offset for desktop to account for menu bar
  const mobileOffset = isMobile ? 40 : 0;

  const windowClassName = `window ${appName} ${isMobile && isFullscreenOnMobile ? 'fullscreen-mobile' : ''} ${isIframeApp ? 'iframe-app' : ''} ${className || ''}`;

  return (
    <Draggable handle=".window-header" disabled={isMobile && isFullscreenOnMobile}>
      <Resizable
        size={windowStyle}
        onResizeStop={(e, direction, ref, d) => {
          setWindowSize(prevSize => ({
            width: typeof prevSize.width === 'number' ? prevSize.width + d.width : prevSize.width,
            height: typeof prevSize.height === 'number' ? prevSize.height + d.height : prevSize.height
          }));
        }}
        minWidth={200}
        minHeight={100}
        bounds="window"
        enable={{
          top: !isMobile,
          right: !isMobile,
          bottom: !isMobile,
          left: !isMobile,
          topRight: !isMobile,
          bottomRight: !isMobile,
          bottomLeft: !isMobile,
          topLeft: !isMobile
        }}
      >
        <div 
          className={windowClassName}
          style={{...style, zIndex: 1200, marginTop: isMobile ? mobileOffset : desktopOffset}}
          onMouseDown={onFocus}
          onTouchStart={onFocus}
        >
          <div className="window-header">
            <span>{title}</span>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          <div className="window-content">
            {children}
          </div>
          <div className="resize-handle"></div>
        </div>
      </Resizable>
    </Draggable>
  );
}