class Distort {

  /**
   * Constructor
   * 
   * Creates a Distort controller. Keeps track of frames and the distort factor.
   * Also provides a streamlined way to render all elements associated with the controller.
   * 
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
   * Add Element
   * 
   * Adds an element to the controller. Calling this method directly may result in problems.
   * This will be done automatically when a DistortElement is created.
   * If an Element is already been created it's controller should be changed using the changeController() method in DistortElement.
   * 
   * @param {DistortElement} element 
   */
  addElement(element) {
    this.elements.push(element);
  }

  /**
   * Update
   * 
   * Will update frame and all DistortElements under the controller.
   */
  update() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].update();
    }
    this.currentFrame++;
  }

  /**
   * Render
   * 
   * Renders all DistortElements under this controller.
   */
  render() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].render();
    }
  }

}