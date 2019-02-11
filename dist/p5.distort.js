/**
 * Creates a Distort controller. Keeps track of frames and the distort factor.
 * Also provides a streamlined way to render all elements associated with the controller.
 * 
 * @module controller
 * @class Distort
 */
class Distort {

  /**
   * @constructor 
   * @param {Number} distortFactor 
   * @param {Number} framesPerCycle 
   */
  constructor(distortFactor, framesPerCycle) {
    this.distortFactor = distortFactor;
    this.framesPerCycle = framesPerCycle;
    this.currentFrame = 0;
    this.elements = [];
  }

  /**
   * Returns a float value between 0 and 1 that represents the current location in the frameCycle.
   * 
   * @method currentTime
   */
  currentTime() {
    return map(this.currentFrame, 0, this.framesPerCycle, 0, 1);
  }

  /**
   * Adds an element to the controller. Calling this method directly may result in problems.
   * This will be done automatically when a DistortElement is created.
   * If an Element is already been created it's controller should be changed using the changeController() method in DistortElement.
   * 
   * @method addElement
   * @param {DistortElement} element 
   */
  addElement(element) {
    this.elements.push(element);
  }

  /**
   * Will update frame and all DistortElements under the controller.
   * 
   * @method update
   */
  update() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].update();
    }
    this.currentFrame++;
  }

  /**
   * Renders all DistortElements under this controller.
   * 
   * @method render
   */
  render() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].render();
    }
  }

  /**
   * Scales a value to account for the distortFactor.
   * 
   * @param {Number} value 
   */
  scaleValue(value) {
    return value - 2 * (value / this.distortFactor);
  }

}
/**
 * Creates a distort element. This constructor is not meant to be called directly.
 * Should be called as super() by a class that extends DistortElement.
 * 
 * @module elements
 * @submodule elements-abstract
 * @class DistortElement
 */
class DistortElement {

  /**
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {Number} size 
   */
  constructor(controller, position) {
    this.setController(controller);
    this.position = position;

    this.controller;
    this.pointGroups = [];
    this.bounds = [];
  }

  /**
   * Will set the controller for this element while adding the element to the array of elements within the controller.
   * 
   * @method setController
   * @param {Distort} controller 
   */
  setController(controller) {
    this.controller = controller;
    this.controller.addElement(this);
  }

  /**
   * Used to change the controller after an element is created.
   * The same as setController() just removes the element from the current controller to avoid unexpected behavior.
   * 
   * @method changeController
   * @param {Distort} controller 
   */
  changeController(controller) {
    for (let i = 0; i < this.controller.elements.length; i++) {
      if (this.controller.elements[i] == this) {
        this.controller.elements.splice(i, 1);
      }
    }
    this.setController(controller);
  }

  /**
   * Method that will update all variables necessary to advance the frame.
   * 
   * @method update
   */
  update() {

  }

  /**
   * In it's current state this will render an element to a p5 canvas transforming the points to distort the shape.
   * 
   * @method render
   */
  render() {
    this.drawingTraits();
    beginShape();
    for (let i = 0; i < this.pointGroups.length; i++) {
      if (i != 0) {
        beginContour();
      }
      for (let j = 0; j < this.pointGroups[i].length; j++) {
        let p = this.pointGroups[i][j];
        if (!(typeof this.transformPoint === 'undefined')) {
          p = this.transformPoint(this, p);
        }
        vertex(p.x, p.y);
      }
      if (i != 0) {
        endContour();
      }
    }
    endShape(CLOSE);
  }

  /**
   * The default black and white drawing traits for all elements. Can be overridden using the setDrawingTraits() method.
   * 
   * @method drawingTraits
   */
  drawingTraits() {
    noStroke();
    fill(0);
  }

  /**
   * Takes one function as a parameter. The passed function should have no parameters and use set the stroke and fill.
   * It will be called at the beginning of the render() method.
   * 
   * @method setDrawingTraits 
   * @param {function} drawingTraitsFunction 
   */
  setDrawingTraits(drawingTraitsFunction) {
    this.drawingTraits = drawingTraitsFunction;
  }

  /**
   * Will override how a point is transformed. Pass in a function that receives a p5.Vector and return a different p5.Vector.
   * 
   * @method setTransformPoint
   * @param {function} transformPointFunction 
   */
  setTransformPoint(transformPointFunction) {
    this.transformPoint = transformPointFunction;
  }

  /**
   * Will change the position of an element that has already been created.
   * 
   * @method setPosition
   * @param {p5.Vector} position 
   */
  setPosition(position) {
    let difference = createVector(this.position.x - position.x, this.position.y - position.y);
    let newPointGroups = [];
    for (let i = 0; i < this.pointGroups.length; i++) {
      let points = [];
      for (let j = 0; j < this.pointGroups[i].length; j++) {
        points.push(createVector(this.pointGroups[i][j].x - difference.x, this.pointGroups[i][j].y - difference.y));
      }
      newPointGroups.push(points);
    }
    this.pointGroups = newPointGroups;
    this.position = position;
  }

  /**
   * Returns the distance between the center of the element and a point.
   * 
   * @method distanceFromCenter
   * @param {p5.Vector} point 
   */
  distanceFromCenter(point) {
    return dist(point.x, point.y, this.position.x, this.position.y);
  }

  /**
   * Returns the distance between the center of the element and a point. Only accounting for the X dimension.
   * 
   * @method distanceFromCenterX
   * @param {p5.Vector} point 
   */
  distanceFromCenterX(point) {
    return point.x - this.position.x;
  }

  /**
   * Returns the distance between the center of the element and a point. Only accounting for the Y dimension.
   * 
   * @method distanceFromCenterY
   * @param {p5.Vector} point 
   */
  distanceFromCenterY(point) {
    return point.y - this.position.x;
  }

}
/**
 * @module elements
 * @submodule elements-primitives
 * @class DistortEllipse
 */
class DistortEllipse extends DistortElement {

  /**
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {Number} width
   * @param {Number} height
   * @param {Number} detail 
   */
  constructor(controller, position, width, height, detail) {
    super(controller, position);
    this.width = width;
    this.height = height;
    this.generatePoints(detail);
  }

  /**
   * Will generate points for this element in a circle shape. Detail defines how many points are generated.
   * 
   * @method generatePoints
   * @param {Number} detail 
   */
  generatePoints(detail) {
    let points = [];
    for (let i = 0; i < detail; i++) {
      let angle = map(i, 0, detail, 0, TWO_PI);
      let x = this.getWidth() / 2 * cos(angle);
      let y = this.getHeight() / 2 * sin(angle);
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    this.pointGroups.push(points);
  }

  /**
   * Returns width accounting for distortFactor.
   * 
   * @method getWidth
   */
  getWidth() {
    return this.controller.scaleValue(this.width);
  }

  /**
   * Returns width accounting for distortFactor.
   * 
   * @method getHeight
   */
  getHeight() {
    return this.controller.scaleValue(this.height);
  }

}
/**
 * @module elements
 * @submodule elements-primitives
 * @class DistortRectangle
 */
class DistortRectangle extends DistortElement {

  /**
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {Number} width
   * @param {Number} height
   * @param {Number} detail 
   */
  constructor(controller, position, width, height, detail) {
    super(controller, position);
    this.width = width;
    this.height = height;
    this.generatePoints(detail);
  }

  /**
   * Will generate points for this element in a rectangular shape. Detail defines how many points are generated.
   * 
   * @method generatePoints
   * @param {Number} detail 
   */
  generatePoints(detail) {
    let points = [];
    let horizontalPoints = int((this.getWidth() / (this.getWidth() + this.getHeight())) * detail) / 2;
    let verticalPoints = (detail - (horizontalPoints * 2)) / 2;
    for (let i = 0; i < horizontalPoints; i++) {
      let x = map(i, 0, horizontalPoints, - this.getWidth() / 2, this.getWidth() / 2);
      let y = - this.getHeight() / 2;
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    for (let i = 0; i < verticalPoints; i++) {
      let x = this.getWidth() / 2;
      let y = map(i, 0, verticalPoints, - this.getHeight() / 2, this.getHeight() / 2);
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    for (let i = 0; i < horizontalPoints; i++) {
      let x = map(i, 0, horizontalPoints, this.getWidth() / 2, - this.getWidth() / 2);
      let y = this.getHeight() / 2;
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    for (let i = 0; i < verticalPoints; i++) {
      let x = - this.getWidth() / 2;
      let y = map(i, 0, verticalPoints, this.getHeight() / 2, - this.getHeight() / 2);
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    this.pointGroups.push(points);
  }

  /**
   * Returns width accounting for distortFactor.
   * 
   * @method getWidth
   */
  getWidth() {
    return this.controller.scaleValue(this.width);
  }

  /**
   * Returns width accounting for distortFactor.
   * 
   * @method getHeight
   */
  getHeight() {
    return this.controller.scaleValue(this.height);
  }

}
/**
 * Creates a DistortElement from a string of text.
 * 
 * @module elements
 * @submodule elements-text
 * @class DistortString
 */
class DistortString extends DistortElement {

  /** 
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {Number} size 
   * @param {p5.Font} font 
   * @param {String} string 
   */
  constructor(controller, position, font, string, size) {
    super(controller, position, size);
    this.font = font;
    this.string = string;
    this.size = size;

    this.distanceThreshold = 3;

    this.generateBounds();
    this.generatePoints();

    this.setPosition(createVector(position.x, position.y)); // TODO make this more elegant
  }

  /**
   * Will generate points from the string and separates the different shapes required to draw text.
   * 
   * @method generatePoints
   */
  generatePoints() {
    let p5Points = this.font.textToPoints(
      this.string,
      (this.position.x - this.bounds.w / 2) - this.bounds.advance,
      this.position.y + this.bounds.h / 2,
      this.getSize(),
      {
        sampleFactor: 1,
        simplifyThreshold: 0,
      }
    );
    let points = [];
    if (p5Points.length > 0) {
      points.push(p5Points[0]);
    }
    for (let i = 1; i < p5Points.length; i++) {
      if (this.differentShape(p5Points, i)) {
        this.pointGroups.push(points);
        points = [];
      }
      points.push(p5Points[i]);
    }
    this.pointGroups.push(points);
  }


  // TODO change name
  // TODO improve distanceThreshold
  /**
   * Helper method that returns a boolean if point at an index should be in a different shape.
   * 
   * @method differentShape
   * @param {p5.Vector[]} points 
   * @param {Number} pointIndex 
   */
  differentShape(points, pointIndex) {
    if (pointIndex <= 0 || pointIndex > points.length - 1) {
      return false;
    } else {
      let distance = dist(points[pointIndex - 1].x, points[pointIndex - 1].y, points[pointIndex].x, points[pointIndex].y);
      return distance > this.distanceThreshold;
    }
  }

  /**
   * A method that will generate text bounds for use in positioning text correctly.
   * 
   * @method generateBounds
   */
  generateBounds() {
    this.bounds = this.font.textBounds(this.string, this.position.x, this.position.y, this.getSize());
    this.position = createVector(this.position.x - ((this.bounds.x) / 2), this.position.y - (this.bounds.y / 2));
  }

  /**
   * 
   */
  getSize() {
    return this.controller.scaleValue(this.size);
  }

}
/**
 * @module elements
 * @submodule elements-primitives
 * @class DistortTriangle
 */
class DistortTriangle extends DistortElement {

  // TODO add check to see if detail is greater that 3
  /**
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {p5.Vector} point0
   * @param {p5.Vector} point1
   * @param {p5.Vector} point2
   * @param {Number} detail 
   */
  constructor(controller, position, point0, point1, point2, detail) {
    super(controller, position);
    this.point0 = point0;
    this.point1 = point1;
    this.point2 = point2;
    this.generatePoints(detail);
  }

  /**
   * Will generate points for this element in a triangle shape. Detail defines how many points are generated.
   * 
   * @method generatePoints
   * @param {Number} detail 
   */
  generatePoints(detail) {
    let points = [];
    let side0Points = int((this.getSide(0) / (this.getSide(0) + this.getSide(1) + this.getSide(2))) * detail);
    let side1Points = int((this.getSide(1) / (this.getSide(0) + this.getSide(1) + this.getSide(2))) * detail);
    let side2Points = detail - (side0Points + side1Points);
    for (let i = 0; i < side0Points; i++) {
      let x = lerp(this.point0.x, this.point1.x, i / float(side0Points));
      let y = lerp(this.point0.y, this.point1.y, i / float(side0Points));
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    // TODO refactor into double for loop
    for (let i = 0; i < side1Points; i++) {
      let x = lerp(this.point1.x, this.point2.x, i / float(side1Points));
      let y = lerp(this.point1.y, this.point2.y, i / float(side1Points));
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    for (let i = 0; i < side2Points; i++) {
      let x = lerp(this.point2.x, this.point0.x, i / float(side2Points));
      let y = lerp(this.point2.y, this.point0.y, i / float(side2Points));
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    this.pointGroups.push(points);
  }

  /**
   * Returns a side length of the triangle accounting for the distortFactor. Expects a side index between 0 and 2.
   * 
   * @method getSide
   * @param {Number} sideIndex 
   */
  getSide(sideIndex) {
    return this.controller.scaleValue(this.calculateSide(sideIndex));
  }

  /**
   * Returns the length of a triangle side. Expects an index between 0 and 2.
   * 
   * @method calculateSide
   * @param {Number} sideIndex 
   */
  calculateSide(sideIndex) {
    sideIndex = int(sideIndex);
    switch (sideIndex) {
      case 0:
        return dist(this.point0.x, this.point0.y, this.point1.x, this.point1.y);
      case 1:
        return dist(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
      case 2:
        return dist(this.point2.x, this.point2.y, this.point0.x, this.point0.y);
      default:
        throw new Error("calculateSide() expects a number between 0 and 2. It was given " + sideIndex + ".");
    }
  }

}
/**
 * @module tranform-point-functions
 * @class built-in-transform-point-functions
 */
// TODO rework this yui comment

/**
 * Will transform a point based on perlin noise in both the x and y direction.
 * 
 * @property PERLIN_NOISE
 * @final
 * @param {DistortElement} element 
 * @param {p5.Vector} point
 * @return {p5.Vector} a point transformed with some perlin noise
 */
const PERLIN_NOISE = (element, point) => {
  //console.log(element);
  let noiseScale = 0.01;
  let xDisplacement = element.distanceFromCenterX(point);
  let yDisplacement = element.distanceFromCenterY(point);
  return createVector(
    point.x + map(
      noise(xDisplacement * noiseScale, element.controller.currentFrame * noiseScale),
      0,
      1,
      -element.controller.distortFactor,
      element.controller.distortFactor
    ),
    point.y + map(
      noise(yDisplacement * noiseScale, element.controller.currentFrame * noiseScale),
      0,
      1,
      -element.controller.distortFactor,
      element.controller.distortFactor
    )
  );
}