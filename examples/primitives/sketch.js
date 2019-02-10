let distort;

let ellipsePrimitive;

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(30);
  distort = new Distort(32, 30);

  ellipsePrimitive = new DistortEllipse(distort, createVector(width / 2, height / 2), height, height / 2, 1024);
  ellipsePrimitive.setTransformPoint(PERLIN_NOISE);
}

function draw() {
  background(255);
  distort.update();
  distort.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ellipsePrimitive.setPosition(createVector(width / 2, height / 2));
}