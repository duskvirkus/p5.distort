let distort;

let linePrimitive;
let ellipsePrimitive;
let rectanglePrimitive;
let trianglePrimitive;
let quadPrimitive;

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(60);
  distort = new Distort(20, 1200);

  let primitiveScale = height * 7 / 8;

  linePrimitive = new DistortLine(
    distort,
    createVector(width * 1 / 6, height / 2),
    createVector(primitiveScale * 1 / 3, primitiveScale * 1 / 3),
    createVector(-primitiveScale * 1 / 3, -primitiveScale * 1 / 3),
    1024
  );
  linePrimitive.setTransformPoint(PERLIN_NOISE);

  ellipsePrimitive = new DistortEllipse(
    distort,
    createVector(width * 2 / 6, height / 2),
    primitiveScale,
    primitiveScale * 2 / 3,
    1024
  );
  ellipsePrimitive.setTransformPoint(PERLIN_NOISE);

  rectanglePrimitive = new DistortRectangle(
    distort,
    createVector(width * 3 / 6, height / 2),
    primitiveScale,
    primitiveScale * 2 / 3,
    1024
  );
  rectanglePrimitive.setTransformPoint(PERLIN_NOISE);

  trianglePrimitive = new DistortTriangle(
    distort,
    createVector(width * 4 / 6, height / 2),
    createVector(primitiveScale * 1 / 2, -primitiveScale * 1 / 4),
    createVector(-primitiveScale * 1 / 2, -primitiveScale * 1 / 2),
    createVector(0, primitiveScale * 1 / 2),
    1024
  );
  trianglePrimitive.setTransformPoint(PERLIN_NOISE);

  quadPrimitive = new DistortQuad(
    distort,
    createVector(width * 5 / 6, height / 2),
    createVector(0, - primitiveScale * 1 / 2),
    createVector(primitiveScale * 1 / 2, 0),
    createVector(0, primitiveScale * 1 / 2),
    createVector(-primitiveScale * 1 / 2, 0),
    1024
  );
  quadPrimitive.setTransformPoint(PERLIN_NOISE);
}

function draw() {
  background(255);
  distort.update();
  distort.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  linePrimitive.setPosition(createVector(width * 1 / 6, height / 2));
  ellipsePrimitive.setPosition(createVector(width * 2 / 6, height / 2));
  rectanglePrimitive.setPosition(createVector(width * 3 / 6, height / 2));
  trianglePrimitive.setPosition(createVector(width * 4 / 6, height / 2));
  quadPrimitive.setPosition(createVector(width * 5 / 6, height / 2));
}