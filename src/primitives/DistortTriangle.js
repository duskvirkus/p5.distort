/**
 * @module elements
 * @submodule elements-primitives
 * @class DistortTriangle
 */
class DistortTriangle extends DistortPolygon {

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
    if (detail < 6) {
      throw new Error("Distort Triangle requires a minimum of 6 for the detail value");
    }
    super(controller, position, [point0, point1, point2], detail);
  }

}