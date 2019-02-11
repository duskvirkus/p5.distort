let distort;

let ellipsePrimitive;
let rectanglePrimitive;
let trianglePrimitive;

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(60);
  distort = new Distort(32, 1200);

  let primitiveScale = height * 1 / 2;

  ellipsePrimitive = new DistortEllipse(
    distort,
    createVector(width * 1 / 4, height / 2),
    primitiveScale,
    primitiveScale * 2 / 3,
    1024
  );
  ellipsePrimitive.setTransformPoint(PERLIN_NOISE);

  rectanglePrimitive = new DistortRectangle(
    distort,
    createVector(width * 2 / 4, height / 2),
    primitiveScale,
    primitiveScale * 2 / 3,
    1024
  );
  rectanglePrimitive.setTransformPoint(PERLIN_NOISE);

  trianglePrimitive = new DistortTriangle(
    distort,
    createVector(width * 3 / 4, height / 2),
    createVector(primitiveScale * 2 / 3, -primitiveScale * 1 / 2),
    createVector(-primitiveScale * 2 / 3, -primitiveScale * 1 / 2),
    createVector(0, primitiveScale * 1 / 2),
    1024
  );
  trianglePrimitive.setTransformPoint(PERLIN_NOISE);
}

function draw() {
  background(255);
  distort.update();
  distort.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ellipsePrimitive.setPosition(createVector(width * 1 / 4, height / 2));
  rectanglePrimitive.setPosition(createVector(width * 2 / 4, height / 2));
  trianglePrimitive.setPosition(createVector(width * 3 / 4, height / 2));
}