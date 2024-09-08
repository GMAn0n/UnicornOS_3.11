import { ref, set } from 'firebase/database';
import { database } from './src/firebaseConfig';

const GRID_SIZE = 16;
const MINE_COUNT = 40;
const EMOJIS = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'];

function createInitialGrid() {
  // ... (same as the function in MemojiMinesweeper.tsx)
}

const initialState = {
  grid: createInitialGrid(),
  players: {}
};

set(ref(database, 'memojiMinesweeper'), initialState)
  .then(() => console.log('Game initialized in Firebase Realtime Database'))
  .catch((error) => console.error('Error initializing game:', error));