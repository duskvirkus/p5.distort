/**
 * @module tranform-point-functions
 * @class built-in-transform-point-functions
 */
// TODO rework this yui comment

/**
 * Will transform a point based on perlin noise in both the x and y direction.
 * 
 * @property PERLIN_NOISE
 * @final
 * @param {DistortElement} element 
 * @param {p5.Vector} point
 * @return {p5.Vector} a point transformed with some perlin noise
 */
const PERLIN_NOISE = (element, point) => {
  //console.log(element);
  let noiseScale = 0.01;
  let xDisplacement = element.distanceFromCenterX(point);
  let yDisplacement = element.distanceFromCenterY(point);
  return createVector(
    point.x + map(
      noise(xDisplacement * noiseScale, element.controller.currentFrame * noiseScale),
      0,
      1,
      -element.controller.distortFactor,
      element.controller.distortFactor
    ),
    point.y + map(
      noise(yDisplacement * noiseScale, element.controller.currentFrame * noiseScale),
      0,
      1,
      -element.controller.distortFactor,
      element.controller.distortFactor
    )
  );
}