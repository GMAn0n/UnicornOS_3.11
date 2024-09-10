import { useState, useEffect } from 'react';

export const usePlayerNumber = () => {
  const [playerNumber, setPlayerNumber] = useState<number | null>(null);

  useEffect(() => {
    const storedPlayerNumber = localStorage.getItem('playerNumber');
    if (storedPlayerNumber) {
      setPlayerNumber(parseInt(storedPlayerNumber, 10));
    }
  }, []);

  return playerNumber;
};