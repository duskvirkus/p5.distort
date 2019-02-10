let distort;
let pcd;

let font;

function preload() {
  font = loadFont('./assets/Roboto-Black.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(30);
  distort = new Distort(5, 60);

  pcd = new DistortString(distort, createVector(width / 2, height / 2), 100, font, "Processing Community Day");
  pcd.setTransformPoint((element, point) => {
    let progress = element.calculateProgress(point);
    let noiseValue = map(noise(progress), 0, 1, - element.size / element.controller.distortFactor, element.size / element.controller.distortFactor);
    let angle = map(noise(frameCount * 0.01, 1000), 0, 1, 0, TWO_PI * 4);
    return createVector(point.x + (noiseValue * sin(angle + PI)), point.y + (noiseValue * sin(angle)));
  })
}

function draw() {
  background(255);
  distort.update();
  distort.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pcd.setPosition(createVector(width / 2, height / 2));
}