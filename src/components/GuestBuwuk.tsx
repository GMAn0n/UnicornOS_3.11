import React, { useState } from 'react';
import ResizableWindow from './ResizableWindow';
import './GuestBuwuk.css';

interface GuestBuwukProps {
  onClose: () => void;
  className?: string;
  style?: React.CSSProperties;
  isIframeApp?: boolean;
}

const GuestBuwuk: React.FC<GuestBuwukProps> = ({ onClose, className, style, isIframeApp }) => {
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle guest book submission
    console.log(`Guest: ${guestName}, Message: ${message}`);
    setGuestName('');
    setMessage('');
  };

  return (
    <ResizableWindow
      title="Guest Buwuk"
      onClose={onClose}
      appName="guestbuwuk"
      initialWidth={400}
      initialHeight={500}
      className={className}
      style={style}
      isIframeApp={isIframeApp}
    >
      <div className="guest-buwuk">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message"
            required
          />
          <button type="submit">Submit</button>
        </form>
        {/* Display guest book entries here */}
      </div>
    </ResizableWindow>
  );
};

export default GuestBuwuk;