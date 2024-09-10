import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function saveScore(score: number) {
  const playerID = localStorage.getItem('playerID') || 'anonymous';
  
  try {
    await addDoc(collection(db, 'scores'), {
      playerID,
      score,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error saving score:', error);
  }
}

export async function getTopScores(limitCount = 10) {
  const scoresRef = collection(db, 'scores');
  const q = query(scoresRef, orderBy('score', 'desc'), limit(limitCount));
  
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      const score = parseFloat(data.score);
      return { playerID: data.playerID, score };
    });
  } catch (error) {
    console.error('Error fetching top scores:', error);
    return [];
  }
}