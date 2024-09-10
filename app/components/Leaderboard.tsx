import React, { useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';

interface Score {
  playerID: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    // Fetch scores from Firebase
    const fetchScores = async () => {
      // ... fetch logic
      const fetchedScores: DocumentData[] = []; // Replace with actual fetched data
      setScores(fetchedScores.map(doc => ({
        playerID: doc.playerID,
        score: doc.score
      })));
    };
    fetchScores();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Top Scores</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.playerID}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;