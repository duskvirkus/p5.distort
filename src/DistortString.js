class DistortString extends DistortElement {

  constructor(controller, position, size, font, string) {
    super(controller, position, size);
    this.font = font;
    this.string = string;

    this.distanceThreshold = 3;

    this.generateBounds();
    this.generatePoints();

    this.setPosition(createVector(position.x, position.y)); // TODO make this more elegant
  }

  generatePoints() {
    let p5Points = this.font.textToPoints(
      this.string,
      (this.position.x - this.bounds.w / 2) - this.bounds.advance,
      this.position.y + this.bounds.h / 2,
      this.scaledSize(),
      {
        sampleFactor: 1,
        simplifyThreshold: 0,
      }
    );
    let points = [];
    if (p5Points.length > 0) {
      points.push(p5Points[0]);
    }
    for (let i = 1; i < p5Points.length; i++) {
      if (this.differentShape(p5Points, i)) {
        this.pointGroups.push(points);
        points = [];
      }
      points.push(p5Points[i]);
    }
    this.pointGroups.push(points);
  }

  distanceLog(logAll) {
    for (let i = 1; i < this.points.length; i++) {
      let distance = dist(this.points[i - 1].x, this.points[i - 1].y, this.points[i].x, this.points[i].y);
      if (logAll || distance > this.distanceThreshold) {
        console.log(distance);
      }
    }
  }

  differentShape(points, pointIndex) {
    if (pointIndex <= 0 || pointIndex > points.length - 1) {
      return false;
    } else {
      let distance = dist(points[pointIndex - 1].x, points[pointIndex - 1].y, points[pointIndex].x, points[pointIndex].y);
      return distance > this.distanceThreshold;
    }
  }

  generateBounds() {
    this.bounds = this.font.textBounds(this.string, this.position.x, this.position.y, this.scaledSize());
    this.position = createVector(this.position.x - ((this.bounds.x) / 2), this.position.y - (this.bounds.y / 2));
  }

}