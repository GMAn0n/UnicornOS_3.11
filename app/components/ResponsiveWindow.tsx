import React from 'react';
import { Resizable } from 're-resizable';

interface ResponsiveWindowProps {
  children: React.ReactNode;
  isMobile: boolean;
}

const ResponsiveWindow: React.FC<ResponsiveWindowProps> = ({ children, isMobile }) => {
  const defaultSize = isMobile
    ? { width: '100%', height: '100vh' }
    : { width: '80%', height: '80vh' };

  return (
    <Resizable
      defaultSize={defaultSize}
      minWidth={isMobile ? '100%' : '300px'}
      minHeight={isMobile ? '100vh' : '200px'}
      maxWidth={isMobile ? '100%' : '100vw'}
      maxHeight={isMobile ? '100vh' : '100vh'}
      className="applet-window"
    >
      {children}
    </Resizable>
  );
};

export default ResponsiveWindow;