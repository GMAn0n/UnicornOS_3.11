const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 700;
const GRAVITY = 0.2;
const MAX_BALL_SPEED = 15;

class Vector2D {
  constructor(public x: number, public y: number) {}

  add(v: Vector2D): Vector2D {
    return new Vector2D(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2D): Vector2D {
    return new Vector2D(this.x - v.x, this.y - v.y);
  }

  multiply(scalar: number): Vector2D {
    return new Vector2D(this.x * scalar, this.y * scalar);
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2D {
    const mag = this.magnitude();
    return mag > 0 ? this.multiply(1 / mag) : new Vector2D(0, 0);
  }

  reflect(normal: Vector2D): Vector2D {
    const dot = this.x * normal.x + this.y * normal.y;
    return new Vector2D(
      this.x - 2 * dot * normal.x,
      this.y - 2 * dot * normal.y
    );
  }

  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }
}

class Ball {
  velocity: Vector2D = new Vector2D(0, 0);
  inPlay: boolean = false;

  constructor(public position: Vector2D, public radius: number) {}

  update(deltaTime: number) {
    if (this.inPlay) {
      this.velocity = this.velocity.add(new Vector2D(0, GRAVITY * deltaTime));
      this.velocity = this.velocity.multiply(0.99); // Add slight friction
      if (this.velocity.magnitude() > MAX_BALL_SPEED) {
        this.velocity = this.velocity.normalize().multiply(MAX_BALL_SPEED);
      }
      this.position = this.position.add(this.velocity);
    }
  }
}

class Flipper {
  angle: number;
  angularVelocity: number = 0;

  constructor(
    public position: Vector2D,
    public length: number,
    public width: number,
    public isLeft: boolean
  ) {
    // Adjust the initial angle to face inward with a downward slant
    this.angle = isLeft ? Math.PI / 3 : 2 * Math.PI / 3;
  }

  update(deltaTime: number) {
    this.angle += this.angularVelocity * deltaTime;
    // Adjust the max and min angles for a more realistic flipper movement
    const maxAngle = this.isLeft ? Math.PI / 2 : Math.PI / 2;
    const minAngle = this.isLeft ? Math.PI / 6 : 5 * Math.PI / 6;
    this.angle = Math.max(Math.min(this.angle, maxAngle), minAngle);
    this.angularVelocity *= 0.9;
  }

  flip() {
    // Adjust flip speed for better gameplay
    this.angularVelocity = this.isLeft ? 20 : -20;
  }

  release() {
    // Adjust release speed for better gameplay
    this.angularVelocity = this.isLeft ? -10 : 10;
  }

  checkCollision(ball: Ball): boolean {
    const flipperEnd = new Vector2D(
      this.position.x + Math.cos(this.angle) * this.length,
      this.position.y + Math.sin(this.angle) * this.length
    );
    const closestPoint = this.getClosestPointOnLine(ball.position, this.position, flipperEnd);
    const distance = ball.position.subtract(closestPoint).magnitude();
    return distance <= ball.radius + this.width / 2;
  }

  getClosestPointOnLine(p: Vector2D, a: Vector2D, b: Vector2D): Vector2D {
    const ap = p.subtract(a);
    const ab = b.subtract(a);
    const t = ap.dot(ab) / ab.dot(ab);
    return a.add(ab.multiply(Math.max(0, Math.min(1, t))));
  }

  getNormalAtPoint(point: Vector2D): Vector2D {
    const flipperVector = new Vector2D(Math.cos(this.angle), Math.sin(this.angle));
    return new Vector2D(-flipperVector.y, flipperVector.x).normalize();
  }
}

class Bumper {
  constructor(public position: Vector2D, public radius: number) {}

  checkCollision(ball: Ball): boolean {
    return ball.position.subtract(this.position).magnitude() <= ball.radius + this.radius;
  }
}

class Target {
  constructor(public position: Vector2D, public width: number, public height: number) {}

  checkCollision(ball: Ball): boolean {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const distX = Math.abs(ball.position.x - this.position.x);
    const distY = Math.abs(ball.position.y - this.position.y);

    if (distX > halfWidth + ball.radius || distY > halfHeight + ball.radius) return false;
    if (distX <= halfWidth || distY <= halfHeight) return true;

    const cornerDistSq = Math.pow(distX - halfWidth, 2) + Math.pow(distY - halfHeight, 2);
    return cornerDistSq <= Math.pow(ball.radius, 2);
  }
}

class Launcher {
  power: number = 0;
  maxPower: number = 100;

  constructor(public position: Vector2D, public width: number, public height: number) {}

  charge() {
    this.power = Math.min(this.power + 2, this.maxPower);
  }

  launch(): Vector2D {
    const launchVelocity = new Vector2D(-1, -this.power / 5);
    this.power = 0;
    return launchVelocity;
  }
}

export class PinballGame {
  private ball: Ball;
  private leftFlipper: Flipper;
  private rightFlipper: Flipper;
  private launcher: Launcher;
  private bumpers: Bumper[];
  private targets: Target[];
  
  private score: number = 0;
  private lives: number = 3;
  private isGameOver: boolean = false;
  
  constructor() {
    const flipperLength = CANVAS_WIDTH * 0.3; // Adjust flipper length as needed
    const flipperWidth = 15;
    const leftFlipperY = CANVAS_HEIGHT - 80; // Raise the left flipper
    const rightFlipperY = CANVAS_HEIGHT - 60;

    this.launcher = new Launcher(new Vector2D(CANVAS_WIDTH - 30, CANVAS_HEIGHT - 100), 20, 100);
    this.ball = new Ball(new Vector2D(this.launcher.position.x + 10, this.launcher.position.y - 10), 8);
    
    // Adjust flipper positions
    this.leftFlipper = new Flipper(new Vector2D(CANVAS_WIDTH * 0.3, leftFlipperY), flipperLength, flipperWidth, true);
    this.rightFlipper = new Flipper(new Vector2D(CANVAS_WIDTH * 0.7, rightFlipperY), flipperLength, flipperWidth, false);
    
    this.bumpers = [
      new Bumper(new Vector2D(100, 150), 25),
      new Bumper(new Vector2D(200, 100), 25),
      new Bumper(new Vector2D(300, 150), 25),
    ];
    
    this.targets = [
      new Target(new Vector2D(80, 250), 40, 10),
      new Target(new Vector2D(180, 250), 40, 10),
      new Target(new Vector2D(280, 250), 40, 10),
    ];
  }

  update(deltaTime: number) {
    if (this.isGameOver) return;

    this.ball.update(deltaTime);
    this.leftFlipper.update(deltaTime);
    this.rightFlipper.update(deltaTime);
    
    this.checkCollisions();
    this.checkBoundaries();
  }

  private checkCollisions() {
    if (this.leftFlipper.checkCollision(this.ball)) {
      this.handleFlipperCollision(this.leftFlipper);
    }
    if (this.rightFlipper.checkCollision(this.ball)) {
      this.handleFlipperCollision(this.rightFlipper);
    }

    this.bumpers.forEach((bumper, index) => {
      if (bumper.checkCollision(this.ball)) {
        this.handleBumperCollision(bumper, index);
      }
    });

    this.targets.forEach((target, index) => {
      if (target.checkCollision(this.ball)) {
        this.handleTargetCollision(target, index);
      }
    });
  }

  private handleFlipperCollision(flipper: Flipper) {
    const normal = flipper.getNormalAtPoint(this.ball.position);
    this.ball.velocity = this.ball.velocity.reflect(normal).multiply(1.5);
    this.score += 10;
  }

  private handleBumperCollision(bumper: Bumper, index: number) {
    const normal = this.ball.position.subtract(bumper.position).normalize();
    this.ball.velocity = this.ball.velocity.reflect(normal).multiply(1.2);
    this.score += 50;
  }

  private handleTargetCollision(target: Target, index: number) {
    const normal = new Vector2D(0, -1);
    this.ball.velocity = this.ball.velocity.reflect(normal).multiply(1.1);
    this.score += 30;
  }

  private checkBoundaries() {
    if (this.ball.position.y > CANVAS_HEIGHT) {
      this.lives--;
      if (this.lives <= 0) {
        this.isGameOver = true;
      } else {
        this.resetBall();
      }
    }

    if (this.ball.position.x < this.ball.radius) {
      this.ball.position.x = this.ball.radius;
      this.ball.velocity.x *= -0.8;
    }
    if (this.ball.position.x > CANVAS_WIDTH - this.ball.radius) {
      this.ball.position.x = CANVAS_WIDTH - this.ball.radius;
      this.ball.velocity.x *= -0.8;
    }
    if (this.ball.position.y < this.ball.radius) {
      this.ball.position.y = this.ball.radius;
      this.ball.velocity.y *= -0.8;
    }
  }

  private resetBall() {
    this.ball = new Ball(new Vector2D(this.launcher.position.x + 10, this.launcher.position.y - 10), 8);
    this.ball.inPlay = false;
  }

  flipLeftFlipper() {
    this.leftFlipper.flip();
  }

  flipRightFlipper() {
    this.rightFlipper.flip();
  }

  releaseFlippers() {
    this.leftFlipper.release();
    this.rightFlipper.release();
  }

  chargeLauncher() {
    this.launcher.charge();
  }

  launchBall() {
    if (!this.ball.inPlay) {
      this.ball.velocity = this.launcher.launch();
      this.ball.inPlay = true;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw background
    ctx.fillStyle = '#240046';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw launcher case
    ctx.fillStyle = '#4a0e78';
    ctx.fillRect(CANVAS_WIDTH - 40, CANVAS_HEIGHT - 200, 40, 200);
    
    // Draw bumpers
    ctx.fillStyle = '#ff6d00';
    this.bumpers.forEach(bumper => {
      ctx.beginPath();
      ctx.arc(bumper.position.x, bumper.position.y, bumper.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw targets
    ctx.fillStyle = '#1de9b6';
    this.targets.forEach(target => {
      ctx.fillRect(target.position.x - target.width / 2, target.position.y - target.height / 2, target.width, target.height);
    });
    
    // Draw flippers
    ctx.fillStyle = '#03dac6';
    [this.leftFlipper, this.rightFlipper].forEach(flipper => {
      ctx.save();
      ctx.translate(flipper.position.x, flipper.position.y);
      ctx.rotate(flipper.angle);
      ctx.fillRect(-flipper.width / 2, 0, flipper.length, flipper.width);
      ctx.restore();
    });
    
    // Draw ball
    ctx.fillStyle = '#e1bee7';
    ctx.beginPath();
    ctx.arc(this.ball.position.x, this.ball.position.y, this.ball.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw launcher
    ctx.fillStyle = '#ff6d00';
    ctx.fillRect(
      this.launcher.position.x,
      this.launcher.position.y - this.launcher.height + this.launcher.power,
      this.launcher.width,
      this.launcher.height
    );
    
    // Draw score and lives
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${this.score}`, 10, 30);
    ctx.fillText(`Lives: ${this.lives}`, 10, 60);
  }

  getScore(): number {
    return this.score;
  }

  getLives(): number {
    return this.lives;
  }

  isOver(): boolean {
    return this.isGameOver;
  }

  restartGame() {
    this.resetBall();
    this.score = 0;
    this.lives = 3;
    this.isGameOver = false;
  }
}