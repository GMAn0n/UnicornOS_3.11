export class Vector2D {
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

  rotate(angle: number): Vector2D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Vector2D(
      this.x * cos - this.y * sin,
      this.x * sin + this.y * cos
    );
  }

  dot(v: Vector2D): number {
    return this.x * v.x + this.y * v.y;
  }

  reflect(normal: Vector2D): Vector2D {
    const dot = this.dot(normal);
    return this.subtract(normal.multiply(2 * dot));
  }
}

export class Ball {
  velocity: Vector2D;
  inPlay: boolean;

  constructor(public position: Vector2D, public radius: number) {
    this.velocity = new Vector2D(0, 0);
    this.inPlay = false;
  }

  update(deltaTime: number) {
    if (this.inPlay) {
      this.position = this.position.add(this.velocity.multiply(deltaTime));
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Flipper {
  angle: number;
  angularVelocity: number;

  constructor(public position: Vector2D, public length: number, public isLeft: boolean) {
    this.angle = isLeft ? Math.PI / 4 : 3 * Math.PI / 4;
    this.angularVelocity = 0;
  }

  update(deltaTime: number) {
    this.angle += this.angularVelocity * deltaTime;
    const maxAngle = this.isLeft ? Math.PI / 3 : 2 * Math.PI / 3;
    const minAngle = this.isLeft ? Math.PI / 6 : 5 * Math.PI / 6;
    this.angle = Math.max(Math.min(this.angle, maxAngle), minAngle);
    this.angularVelocity *= 0.9;
  }

  flip() {
    this.angularVelocity = this.isLeft ? -15 : 15;
  }

  release() {
    this.angularVelocity = this.isLeft ? 7 : -7;
  }

  getEndPoint(): Vector2D {
    const endX = this.position.x + Math.cos(this.angle) * this.length;
    const endY = this.position.y + Math.sin(this.angle) * this.length;
    return new Vector2D(endX, endY);
  }

  checkCollision(ball: Ball): boolean {
    const ballToFlipper = ball.position.subtract(this.position);
    const flipperVector = this.getEndPoint().subtract(this.position);
    const projection = ballToFlipper.dot(flipperVector) / flipperVector.magnitude();
    
    if (projection > 0 && projection < this.length) {
      const closestPoint = this.position.add(flipperVector.normalize().multiply(projection));
      const distance = ball.position.subtract(closestPoint).magnitude();
      return distance < ball.radius;
    }
    
    return false;
  }

  getNormalAtPoint(point: Vector2D): Vector2D {
    const flipperVector = this.getEndPoint().subtract(this.position);
    const normal = new Vector2D(-flipperVector.y, flipperVector.x).normalize();
    return this.isLeft ? normal : normal.multiply(-1);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FF0000';
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.isLeft ? this.angle : Math.PI - this.angle);
    ctx.fillRect(0, -5, this.length, 10);
    ctx.restore();
  }
}

export class Launcher {
  power: number;
  maxPower: number;

  constructor(public position: Vector2D, public width: number, public height: number) {
    this.power = 0;
    this.maxPower = 20;
  }

  charge() {
    this.power = Math.min(this.power + 0.5, this.maxPower);
  }

  launch(): Vector2D {
    const launchVelocity = new Vector2D(0, -this.power * 2);
    this.power = 0;
    return launchVelocity;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(this.position.x, this.position.y - this.height + this.power * 5, this.width, this.height);
  }
}

export class Bumper {
  constructor(public position: Vector2D, public radius: number) {}

  checkCollision(ball: Ball): boolean {
    const distance = ball.position.subtract(this.position).magnitude();
    return distance < this.radius + ball.radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export class Target {
  isHit: boolean;

  constructor(public position: Vector2D, public width: number, public height: number) {
    this.isHit = false;
  }

  checkCollision(ball: Ball): boolean {
    if (this.isHit) return false;
    // Implement collision detection
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.isHit ? '#888888' : '#00FFFF';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export class Ramp {
  constructor(public start: Vector2D, public end: Vector2D, public width: number) {}

  checkCollision(ball: Ball): boolean {
    // Implement collision detection
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#FF00FF';
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }
}

export class Slingshot {
  constructor(public position: Vector2D, public width: number, public height: number, public isLeft: boolean) {}

  checkCollision(ball: Ball): boolean {
    // Implement collision detection
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    if (this.isLeft) {
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.position.x + this.width, this.position.y);
      ctx.lineTo(this.position.x, this.position.y + this.height);
    } else {
      ctx.moveTo(this.position.x, this.position.y);
      ctx.lineTo(this.position.x - this.width, this.position.y);
      ctx.lineTo(this.position.x, this.position.y + this.height);
    }
    ctx.fill();
  }
}