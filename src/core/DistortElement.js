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
  constructor(controller, position) {
    this.setController(controller);
    this.position = position;

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

  /**
   * Method that will update all variables necessary to advance the frame.
   * 
   * @method update
   */
  update() {

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
        if (!(typeof this.transformPoint === 'undefined')) {
          p = this.transformPoint(this, p);
        }
        vertex(p.x, p.y);
      }
      if (i != 0) {
        endContour();
      }
    }
    endShape(CLOSE);
  }

  /**
   * The default black and white drawing traits for all elements. Can be overridden using the setDrawingTraits() method.
   * 
   * @method drawingTraits
   */
  drawingTraits() {
    strokeWeight(0);
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
   * Will override how a point is transformed. Pass in a function that receives a p5.Vector and return a different p5.Vector.
   * 
   * @method setTransformPoint
   * @param {function} transformPointFunction 
   */
  setTransformPoint(transformPointFunction) {
    this.transformPoint = transformPointFunction;
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

  /**
   * Returns the distance between the center of the element and a point.
   * 
   * @method distanceFromCenter
   * @param {p5.Vector} point 
   */
  distanceFromCenter(point) {
    return dist(point.x, point.y, this.position.x, this.position.y);
  }

  /**
   * Returns the distance between the center of the element and a point. Only accounting for the X dimension.
   * 
   * @method distanceFromCenterX
   * @param {p5.Vector} point 
   */
  distanceFromCenterX(point) {
    return point.x - this.position.x;
  }

  /**
   * Returns the distance between the center of the element and a point. Only accounting for the Y dimension.
   * 
   * @method distanceFromCenterY
   * @param {p5.Vector} point 
   */
  distanceFromCenterY(point) {
    return point.y - this.position.x;
  }

  /**
   * Shortcut method for finding index of this element.
   * 
   * @method getIndex
   */
  getIndex() {
    return this.controller.elementIndex(this);
  }

}