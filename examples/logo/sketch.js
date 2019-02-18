let distort;

let size;
let starOffset;

let logo;
let star;

let font;

function preload() {
  font = loadFont('./assets/Roboto-Black.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(60);
  distort = new Distort(20, 1200);

  size = width * 3 / 16;

  logo = new DistortString(distort, createVector(width / 2, height / 2), font, "p5 distort", size);
  logo.setTransformPoint(PERLIN_NOISE);
  logo.setDrawingTraits(() => {
    strokeWeight(0);
    noStroke();
    fill(237, 34, 93);
  });

  starOffset = createVector(-size * 7 / 8, size * 3 / 4);
  star = new DistortString(distort, createVector(logo.position.x + starOffset.x, logo.position.y + starOffset.y), font, "*", size * 5 / 4);
  star.setTransformPoint(PERLIN_NOISE);
  star.setDrawingTraits(() => {
    strokeWeight(2);
    stroke(255);
    fill(237, 34, 93);
  });
}

function draw() {
  background(255);
  distort.update();
  distort.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  logo.setPosition(createVector(width / 2, height / 2));
}