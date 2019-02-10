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
  constructor(controller, position, size) {
    this.setController(controller);
    this.position = position;
    this.size = size;
    this.offset = 0;

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

  // TODO change this method
  /**
   * @method sectionSize
   */
  sectionSize() {
    return this.size / 3.0;
  }

  /**
   * Will update the offset to account for the current frame.
   * 
   * @method updateOffset
   */
  updateOffset() {
    this.offset = map(this.controller.currentFrame, 0, this.controller.framesPerCycle, 0, this.sectionSize());
  }

  /**
   * Method that will update all variables necessary to advance the frame.
   * 
   * @method update
   */
  update() {
    this.updateOffset();
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
        p = this.transformPoint(this, p);
        vertex(p.x, p.y);
      }
      if (i != 0) {
        endContour();
      }
    }
    endShape(CLOSE);
  }

  /**
   * Helper method for the transformPoint() method. Separate so it can be overridden or used in an overridden transformPoint() method.
   * 
   * @method calculateProgress
   * @param {p5.Vector} point
   */
  calculateProgress(point) {
    return map(point.x + this.offset % this.sectionSize(), 0, this.sectionSize(), 0, TWO_PI)
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
   * This is a default transform point function but another one can be set using the setTransformPoint() method.
   * Return a new p5.Vector as not to effect the current state of the points being passed as a parameter.
   * 
   * @method transformPoint
   * @param {DistortElement} element
   * @param {p5.Vector} point 
   */
  transformPoint(element, point) {
    let progress = element.calculateProgress(point);
    return createVector(point.x, point.y + map(sin(progress), -1, 1, - element.size / element.controller.distortFactor, element.size / element.controller.distortFactor));
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
   * Will return a size that accounts for the distortFactor.
   * 
   * @method scaledSize
   */
  scaledSize() {
    return this.size - 2 * (this.size / this.controller.distortFactor);
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

}