var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { ResizableWindow } from './ResizableWindow';
import './MemojiMinesweeper.css';
import { ref, onValue, set, push } from 'firebase/database';
import { database } from '../firebaseConfig';
var GRID_SIZE = 18;
var MINE_COUNT = 40;
var EMOJIS = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'];
export default function MemojiMinesweeper(_a) {
    var onClose = _a.onClose;
    var _b = useState([]), grid = _b[0], setGrid = _b[1];
    var _c = useState([]), players = _c[0], setPlayers = _c[1];
    var _d = useState(null), playerId = _d[0], setPlayerId = _d[1];
    var _e = useState(null), error = _e[0], setError = _e[1];
    var _f = useState(false), gameOver = _f[0], setGameOver = _f[1];
    var _g = useState(false), isMobile = _g[0], setIsMobile = _g[1];
    var _h = useState({ width: 800, height: 800 }), windowSize = _h[0], setWindowSize = _h[1];
    var _j = useState(false), gameWon = _j[0], setGameWon = _j[1];
    var calculateWindowSize = useCallback(function () {
        var cellSize = 30;
        var padding = 150; // Increased padding for controls and header
        var width = GRID_SIZE * cellSize + padding;
        var height = 800; // Set a static height of 800px
        return { width: width, height: height };
    }, []);
    useEffect(function () {
        setWindowSize(calculateWindowSize());
    }, [calculateWindowSize]);
    useEffect(function () {
        var checkMobile = function () {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return function () { return window.removeEventListener('resize', checkMobile); };
    }, []);
    var createInitialGrid = useCallback(function () {
        var newGrid = Array(GRID_SIZE).fill(null).map(function () {
            return Array(GRID_SIZE).fill(null).map(function () { return ({
                isMine: false,
                isRevealed: false,
                neighborMines: 0,
                emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
                playerId: null,
            }); });
        });
        var minesPlaced = 0;
        while (minesPlaced < MINE_COUNT) {
            var row = Math.floor(Math.random() * GRID_SIZE);
            var col = Math.floor(Math.random() * GRID_SIZE);
            if (!newGrid[row][col].isMine) {
                newGrid[row][col].isMine = true;
                minesPlaced++;
            }
        }
        for (var row = 0; row < GRID_SIZE; row++) {
            for (var col = 0; col < GRID_SIZE; col++) {
                if (!newGrid[row][col].isMine) {
                    newGrid[row][col].neighborMines = countNeighborMines(newGrid, row, col);
                }
            }
        }
        return newGrid;
    }, []);
    useEffect(function () {
        console.log('MemojiMinesweeper component mounted');
        var gameRef = ref(database, 'memojiMinesweeper');
        console.log('Database reference created:', gameRef);
        var unsubscribe = onValue(gameRef, function (snapshot) {
            console.log('Received data from Firebase:', snapshot.val());
            var data = snapshot.val();
            if (data) {
                if (data.grid && Array.isArray(data.grid)) {
                    console.log('Setting grid:', data.grid);
                    setGrid(data.grid);
                    setError(null);
                }
                else {
                    console.log('Grid data is missing or invalid. Initializing new grid.');
                    var newGrid_1 = createInitialGrid();
                    set(ref(database, 'memojiMinesweeper/grid'), newGrid_1)
                        .then(function () {
                        console.log('New grid set in database');
                        setGrid(newGrid_1);
                    })
                        .catch(function (error) { return console.error('Error setting new grid:', error); });
                }
                if (data.players && typeof data.players === 'object') {
                    console.log('Setting players:', Object.values(data.players));
                    setPlayers(Object.values(data.players));
                    setError(null);
                }
                else {
                    console.log('Players data is missing or invalid. Initializing empty players object.');
                    set(ref(database, 'memojiMinesweeper/players'), {})
                        .then(function () { return console.log('Empty players object set in database'); })
                        .catch(function (error) { return console.error('Error setting empty players object:', error); });
                }
                setGameOver(data.gameOver || false);
                setGameWon(data.gameWon || false);
            }
            else {
                console.log('No data received from Firebase. Initializing new game state.');
                var initialState_1 = {
                    grid: createInitialGrid(),
                    players: {},
                    gameOver: false,
                    gameWon: false
                };
                set(ref(database, 'memojiMinesweeper'), initialState_1)
                    .then(function () {
                    console.log('Initial state set in database');
                    setGrid(initialState_1.grid);
                })
                    .catch(function (error) { return console.error('Error setting initial state:', error); });
            }
        }, function (error) {
            console.error('Firebase error:', error);
            setError("Firebase error: ".concat(error.message));
        });
        // Initialize player
        var newPlayerId = push(ref(database, 'memojiMinesweeper/players')).key;
        setPlayerId(newPlayerId);
        if (newPlayerId) {
            set(ref(database, "memojiMinesweeper/players/".concat(newPlayerId)), {
                id: newPlayerId,
                color: "#".concat(Math.floor(Math.random() * 16777215).toString(16)),
            });
        }
        return function () {
            unsubscribe();
            // Remove player when component unmounts
            if (newPlayerId) {
                set(ref(database, "memojiMinesweeper/players/".concat(newPlayerId)), null);
            }
        };
    }, [createInitialGrid]);
    var handleCellClick = useCallback(function (row, col) {
        if (gameOver || gameWon)
            return;
        var updatedGrid = __spreadArray([], grid, true);
        var cell = updatedGrid[row][col];
        if (!cell.isRevealed) {
            cell.isRevealed = true;
            cell.playerId = playerId;
            if (cell.isMine) {
                // Game over logic
                setGameOver(true);
                set(ref(database, 'memojiMinesweeper/gameOver'), true);
            }
            else if (cell.neighborMines === 0) {
                // Reveal neighbors
                revealNeighbors(updatedGrid, row, col);
            }
            set(ref(database, 'memojiMinesweeper/grid'), updatedGrid);
            // Check for win condition
            var revealedCells = updatedGrid.flat().filter(function (cell) { return cell.isRevealed; }).length;
            var totalSafeCells = GRID_SIZE * GRID_SIZE - MINE_COUNT;
            if (revealedCells === totalSafeCells) {
                setGameWon(true);
                set(ref(database, 'memojiMinesweeper/gameWon'), true);
            }
        }
    }, [grid, playerId, gameOver, gameWon]);
    var revealNeighbors = function (grid, row, col) {
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var newRow = row + i;
                var newCol = col + j;
                if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
                    var cell = grid[newRow][newCol];
                    if (!cell.isRevealed && !cell.isMine) {
                        cell.isRevealed = true;
                        cell.playerId = playerId;
                        if (cell.neighborMines === 0) {
                            revealNeighbors(grid, newRow, newCol);
                        }
                    }
                }
            }
        }
    };
    var startNewGame = function () {
        var newGrid = createInitialGrid();
        set(ref(database, 'memojiMinesweeper'), {
            grid: newGrid,
            players: {},
            gameOver: false,
            gameWon: false
        }).then(function () {
            console.log('New game started');
            setGrid(newGrid);
            setGameOver(false);
            setGameWon(false);
        }).catch(function (error) { return console.error('Error starting new game:', error); });
    };
    return (_jsx(ResizableWindow, __assign({ title: "Multiplayer Memoji Minesweeper", onClose: onClose, appName: "memojiminesweeper", initialWidth: windowSize.width, initialHeight: 800, resizable: false }, { children: _jsxs("div", __assign({ className: "memoji-minesweeper" }, { children: [error && _jsx("div", __assign({ className: "error-message" }, { children: error })), _jsxs("div", __assign({ className: "game-controls" }, { children: [_jsx("div", __assign({ className: "players" }, { children: players.map(function (player) { return (_jsxs("div", __assign({ className: "player", style: { color: player.color } }, { children: ["Player ", player.id === playerId ? '(You)' : ''] }), player.id)); }) })), gameOver && _jsx("div", __assign({ className: "game-over" }, { children: "Game Over! \uD83D\uDCA3" })), gameWon && _jsx("div", __assign({ className: "game-won" }, { children: "You Win! \uD83C\uDF89" })), _jsx("button", __assign({ onClick: startNewGame, className: "new-game-button" }, { children: "New Game" }))] })), grid.length > 0 ? (_jsx("div", __assign({ className: "grid-container" }, { children: _jsx("div", __assign({ className: "grid" }, { children: grid.map(function (row, rowIndex) { return (row.map(function (cell, colIndex) {
                            var _a;
                            return (_jsx("button", __assign({ className: "cell ".concat(cell.isRevealed ? 'revealed' : '', " ").concat(gameOver && cell.isMine ? 'mine' : ''), onClick: function () { return handleCellClick(rowIndex, colIndex); }, style: { backgroundColor: cell.playerId ? (_a = players.find(function (p) { return p.id === cell.playerId; })) === null || _a === void 0 ? void 0 : _a.color : '' }, disabled: gameOver || gameWon }, { children: cell.isRevealed
                                    ? cell.isMine
                                        ? '💣'
                                        : cell.neighborMines > 0
                                            ? cell.neighborMines
                                            : cell.emoji
                                    : '' }), "".concat(rowIndex, "-").concat(colIndex)));
                        })); }) })) }))) : (_jsx("div", { children: "Loading game board..." }))] })) })));
}
function countNeighborMines(grid, row, col) {
    var count = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            var newRow = row + i;
            var newCol = col + j;
            if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
                if (grid[newRow][newCol].isMine) {
                    count++;
                }
            }
        }
    }
    return count;
}
