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