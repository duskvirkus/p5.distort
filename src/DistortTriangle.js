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