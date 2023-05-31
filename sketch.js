const particles = [];
let anchor;
const springs = [];
let maxVelocity = 100;
let grabbedParticle = null;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  let r = max(width / 5, height / 5);
  for (let a = 0; a < TWO_PI; a += 0.1) {
    x = cos(a) * r;
    y = sin(a) * r;
    particles.push(new Particle(x, y));
  }
  let offset = floor(particles.length / 2);
  for (let i = 1; i < particles.length; i++) {
    springs.push(new Spring(particles[i - 1], particles[i], 0.2));
    springs.push(
      new Spring(
        particles[i - 1],
        particles[(i + offset) % particles.length],
        0.75
      )
    );
  }
  springs.push(new Spring(particles[0], particles[particles.length - 1], 0.2));
}

function draw() {
  translate(width / 2, height / 2);
  background(0);
  beginShape();
  particles[0].show();
  particles.forEach((p) => {
    p.update();
    p.bounds();
    p.show();
  });
  particles[particles.length - 1].show();
  particles[0].show();
  particles[1].show();
  endShape();
  springs.forEach((s) => {
    s.update();
    // s.show();
  });
  //move
  if (grabbedParticle) {
    grabbedParticle.position.x = mouseX - width / 2;
    grabbedParticle.position.y = mouseY - height / 2;
    grabbedParticle.velocity = createVector();
  }
}

function explode() {
  springs.forEach((s) => {
    s.k += 0.5;
    maxVelocity *= 1.01;
  });
}
function keyPressed(k) {
  if (k.key == " ") {
    explode();
  }
}

function getClosestParticle(array) {
  let closestParticle = null;
  let closestDistance = Infinity;
  for (const p of array) {
    d = dist(
      p.position.x,
      p.position.y,
      mouseX - width / 2,
      mouseY - height / 2
    );
    if (d < closestDistance) {
      closestParticle = p;
      closestDistance = d;
    }
  }
  return closestParticle;
}

function mousePressed() {
  grabbedParticle = getClosestParticle(particles);
}

function mouseReleased() {
  grabbedParticle = null;
}
