import React from 'react';
import ResponsiveWindow from './ResponsiveWindow';
import AppletIframe from './AppletIframe';

interface AppletLauncherProps {
  appletSrc: string;
  appletTitle: string;
  isMobile: boolean;
}

const AppletLauncher: React.FC<AppletLauncherProps> = ({ appletSrc, appletTitle, isMobile }) => {
  return (
    <ResponsiveWindow isMobile={isMobile}>
      <AppletIframe src={appletSrc} title={appletTitle} />
    </ResponsiveWindow>
  );
};

export default AppletLauncher;