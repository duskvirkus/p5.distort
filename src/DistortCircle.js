class DistortCircle extends DistortElement {

  /**
   * 
   * @param {p5.Vector} position 
   * @param {number} size 
   * @param {number:int} detail 
   */
  constructor(controller, position, size, detail) {
    super(controller, position, size);
    this.generatePoints(detail);
  }

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

  radius() {
    return this.scaledSize() / 2;
  }

}