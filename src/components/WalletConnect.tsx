import React from 'react';

interface WalletConnectProps {
  onConnect: (wallet: 'keplr' | 'leap') => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const connectKeplr = async () => {
    if (window.keplr) {
      await window.keplr.enable('cosmoshub-4');
      onConnect('keplr');
    } else {
      alert('Keplr wallet not found');
    }
  };

  const connectLeap = async () => {
    if (window.leap) {
      await window.leap.enable('cosmoshub-4');
      onConnect('leap');
    } else {
      alert('Leap wallet not found');
    }
  };

  return (
    <div>
      <button onClick={connectKeplr}>Connect Keplr</button>
      <button onClick={connectLeap}>Connect Leap</button>
    </div>
  );
}