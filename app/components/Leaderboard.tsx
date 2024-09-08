import React, { useEffect, useState } from 'react';
import { getTopScores } from '../utils/leaderboard';

interface Score {
  playerID: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const topScores = await getTopScores();
      setScores(topScores);
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