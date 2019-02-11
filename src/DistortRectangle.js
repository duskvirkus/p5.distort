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