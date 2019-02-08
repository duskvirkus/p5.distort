class DistortCircle extends DistortElement {

  /**
   * Constructor
   * 
   * @param {Distort} controller 
   * @param {p5.Vector} position 
   * @param {Number} size 
   * @param {Number} detail 
   */
  constructor(controller, position, size, detail) {
    super(controller, position, size);
    this.generatePoints(detail);
  }

  /**
   * Generate Points
   * 
   * Will generate points for this element in a circle shape. Detail defines how many points are generated.
   * 
   * @param {Number} detail 
   */
  generatePoints(detail) {
    let points = [];
    for (let i = 0; i < detail; i++) {
      let angle = map(i, 0, detail, 0, TWO_PI);
      let x = this.radius() * cos(angle);
      let y = this.radius() * sin(angle);
      points.push(createVector(x + this.position.x, y + this.position.y));
    }
    this.pointGroups.push(points);
  }

  /**
   * Radius
   * 
   * Returns the radius of the circle.
   */
  radius() {
    return this.scaledSize() / 2;
  }

}