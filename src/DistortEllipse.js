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