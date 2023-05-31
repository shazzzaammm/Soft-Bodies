class Particle {
  constructor(x, y, isLocked) {
    this.position = createVector(x, y);
    this.isLocked = isLocked;
    this.velocity = createVector();
  }
  update() {
    if (this.isLocked) {
      return;
    }
    this.velocity.limit(maxVelocity);
    this.position.add(this.velocity);
    this.velocity.mult(0.99);
  }

  show() {
    fill(100, 0, 255);
    // noFill();
    // noStroke();
    stroke(255);
    strokeWeight(8);
    // ellipse(this.position.x, this.position.y, 16);
    curveVertex(this.position.x, this.position.y);
  }

  bounds() {
    if (this.position.x > width / 2) {
      this.applyForce(createVector(-10, 0));
    }
    if (this.position.x < -width / 2) {
      this.applyForce(createVector(10, 0));
    }
    if (this.position.y > height / 2) {
      this.applyForce(createVector(0, -10));
    }
    if (this.position.y < -height / 2) {
      this.applyForce(createVector(0, 10));
    }
  }

  applyForce(force) {
    this.velocity.add(force);
  }
}
