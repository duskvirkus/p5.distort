/**
 * @module elements
 * @submodule elements-primitives
 * @class DistortLine
 */
class DistortLine extends DistortPolygon {

  /**
   * @constructor
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {p5.Vector} point0
   * @param {p5.Vector} point1
   * @param {Number} detail 
   */
  constructor(controller, position, point0, point1, detail) {
    if (detail < 2) {
      throw new Error("Distort Line requires a minimum of 2 for the detail value");
    }
    super(controller, position, [point0, point1], detail);
  }

  /**
   * Overrides the default DistortElement endTrait so the line shape doesn't get closed.
   * 
   * @method endTrait
   */
  endTrait() {
    return;
  }

  /**
   * Overrides the default DistortElement drawingTraits so stroke will be active.
   * 
   * @method drawingTraits
   */
  drawingTraits() {
    noFill();
    stroke(0);
    strokeWeight(1);
  }

}