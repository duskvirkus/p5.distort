/**
 * @module elements
 * @submodule elements-primitives
 * @class DistortPolygon
 */
class DistortPolygon extends DistortElement {

  /**
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {p5.Vector} corners
   * @param {Number} detail 
   */
  constructor(controller, position, corners, detail) {
    super(controller, position);
    this.corners = corners;
    this.generatePoints(int(detail));
  }

  /**
   * Will generate points for this element in a triangle shape. Detail defines how many points are generated.
   * 
   * @method generatePoints
   * @param {Number} detail 
   */
  generatePoints(detail) {
    let points = [];
    let numberOfSidePoints = [];
    for (let i = 0; i < this.corners.length; i++) {
      numberOfSidePoints.push(int((this.getSide(i) / this.getPerimeter()) * detail));
    }
    for (let i = 0; i < numberOfSidePoints.length; i++) {
      let k = i + 1;
      if (k >= this.corners.length) {
        k = 0;
      }
      for (let j = 0; j < numberOfSidePoints[i]; j++) {
        let x = lerp(this.corners[i].x, this.corners[k].x, j / float(numberOfSidePoints[i]));
        let y = lerp(this.corners[i].y, this.corners[k].y, j / float(numberOfSidePoints[i]));
        points.push(createVector(x + this.position.x, y + this.position.y));
      }
    }
    this.pointGroups.push(points);
  }

  /**
   * Returns a side length of the polygon.
   * 
   * @method getSide
   * @param {Number} sideIndex 
   */
  getSide(sideIndex) {
    return this.calculateSide(sideIndex);
  }

  /**
   * Returns the length of a polygon side.
   * 
   * @method calculateSide
   * @param {Number} sideIndex 
   */
  calculateSide(sideIndex) {
    sideIndex = int(sideIndex);
    if (sideIndex >= this.corners.length && sideIndex >= 0) {
      throw new Error("calculateSide() expects a number between 0 and " + this.corners.length - 1 + ". It was given " + sideIndex + ".");
    }
    let endPoint = sideIndex < this.corners.length - 1 ? sideIndex + 1 : 0;
    return dist(this.corners[sideIndex].x, this.corners[sideIndex].y, this.corners[endPoint].x, this.corners[endPoint].y);
  }

  /**
   * Gets all scaled side lengths added together.
   * 
   * @method getPerimeter
   */
  getPerimeter() {
    let perimeter = 0;
    for (let i = 0; i < this.corners.length; i++) {
      perimeter += this.getSide(i);
    }
    return perimeter;
  }

}