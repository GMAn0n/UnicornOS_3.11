import React from 'react';

interface AppletIframeProps {
  src: string;
  title: string;
}

const AppletIframe: React.FC<AppletIframeProps> = ({ src, title }) => {
  return (
    <div className="iframe-container">
      <iframe
        src={src}
        title={title}
        className="responsive-iframe"
        allowFullScreen
      />
    </div>
  );
};

export default AppletIframe;