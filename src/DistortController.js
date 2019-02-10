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

}