let distort;
let helloWorld;

let font;

function preload() {
  font = loadFont('./assets/Roboto-Black.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(30);
  distort = new Distort(32, 30);

  helloWorld = new DistortString(distort, createVector(width / 2, height / 2), 50, font, "Hello World");
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