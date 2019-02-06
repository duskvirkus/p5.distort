let distort;
let helloWorld;

let font;

function preload() {
  font = loadFont('./assets/Roboto-BlackItalic.ttf');
}

function setup() {
  createCanvas(400, 400);

  frameRate(30);
  distort = new Distort(32, 30);

  helloWorld = new DistortString(distort, createVector(width / 2, height / 2), 50, font, "Hello World");
}

function draw() {
  background(255);
  helloWorld.setPosition(createVector(mouseX, mouseY));
  distort.update();
  distort.render();
}