import React, { useState } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './GuestBuwuk.css';

interface GuestBuwukProps {
  onClose: () => void;
}

export default function GuestBuwuk({ onClose }: GuestBuwukProps) {
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [entries, setEntries] = useState<{ name: string; message: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestName && guestMessage) {
      setEntries([...entries, { name: guestName, message: guestMessage }]);
      setGuestName('');
      setGuestMessage('');
    }
  };

  return (
    <ResizableWindow 
      title="Guest Buwuk" 
      onClose={onClose} 
      appName="guestbuwuk"
      initialWidth={500}
      initialHeight={600}
    >
      <div className="guest-buwuk">
        <h2>Guest Buwuk</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            value={guestMessage}
            onChange={(e) => setGuestMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
        <div className="entries">
          {entries.map((entry, index) => (
            <div key={index} className="entry">
              <h3>{entry.name}</h3>
              <p>{entry.message}</p>
            </div>
          ))}
        </div>
      </div>
    </ResizableWindow>
  );
}