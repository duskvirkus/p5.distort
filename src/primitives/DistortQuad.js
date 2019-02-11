/**
 * @module elements
 * @submodule elements-primitives
 * @class DistortQuad
 */
class DistortQuad extends DistortPolygon {

  /**
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {p5.Vector} point0
   * @param {p5.Vector} point1
   * @param {p5.Vector} point2
   * @param {p5.Vector} point3
   * @param {Number} detail 
   */
  constructor(controller, position, point0, point1, point2, point3, detail) {
    if (detail < 8) {
      throw new Error("DistortQuad requires a minimum of 8 for the detail value");
    }
    super(controller, position, [point0, point1, point2, point3], detail);
  }

}