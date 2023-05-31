class Spring {
  constructor(a, b, k) {
    this.a = a;
    this.b = b;
    this.k = k;
    this.preferredLength = dist(
      a.position.x,
      a.position.y,
      b.position.x,
      b.position.y
    );
  }

  update() {
    let force = p5.Vector.sub(this.b.position, this.a.position);
    //displacement
    let x = force.mag() - this.preferredLength;
    //planck law thing idk
    force.normalize();
    force.mult(this.k * -1 * x);
    //appply forces
    this.b.applyForce(force);
    this.a.applyForce(force.mult(-1));
  }

  show() {
    stroke(0, 255, 255);
    strokeWeight(4);
    line(
      this.a.position.x,
      this.a.position.y,
      this.b.position.x,
      this.b.position.y
    );
  }
}
