import { updatePhysics } from './physics';
import { drawBoard, drawBall } from './renderer';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let ballPosition = { x: 0, y: 0 };
let ballVelocity = { x: 0, y: 0 };

export function initializeGame(
  gameCanvas: HTMLCanvasElement,
  gameCtx: CanvasRenderingContext2D
) {
  canvas = gameCanvas;
  ctx = gameCtx;
  // Initialize game state, load assets, etc.
}

export function updateGame() {
  updatePhysics(ballPosition, ballVelocity);
  // Update game state, check collisions, update score, etc.
}

export function renderGame(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard(ctx);
  drawBall(ctx, ballPosition);
}

// Add functions for left bumper, right bumper, and launch ball