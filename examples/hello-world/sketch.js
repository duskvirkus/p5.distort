let distort;
let helloWorld;

let font;

function preload() {
  font = loadFont('./assets/Roboto-Black.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(60);
  distort = new Distort(32, 1200);

  helloWorld = new DistortString(distort, createVector(width / 2, height / 2), font, "Hello World", height / 3);
  helloWorld.setTransformPoint(PERLIN_NOISE);
}

function draw() {
  background(255);
  distort.update();
  distort.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  helloWorld.setPosition(createVector(width / 2, height / 2));
}