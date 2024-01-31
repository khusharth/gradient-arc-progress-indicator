/**
 * converts degree to radians unit
 */
const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

type GetArcCoordinatesParams = {
  /** radius of the arc */
  radius: number;
  /** angle at which the coordinates needs to be plotted */
  angle: number;
  /** x coordinate for origin (default = 0) */
  circleCenterX?: number;
  /** y coordinate for origin (default = 0) */
  circleCenterY?: number;
};
/**
 * gets arcs start and end positions on the x,y plane
 * x = r * cos(theta)
 * y = r * sin(theta)
 *
 * svg plane is present in the 4th Quadrant where cos is +ve and sin is -ve
 * and adding cx and cy to the points to make them start from circle center
 * and not (0,0) which is start of the svg plane
 */
const getArcCoordinates = ({
  radius,
  angle,
  circleCenterX = 0,
  circleCenterY = 0,
}: GetArcCoordinatesParams): [number, number] => {
  const x = circleCenterX + radius * Math.cos(angle);
  /** -ve as sin is -ve in the 4th Quadrant */
  const y = circleCenterY - radius * Math.sin(angle);
  return [x, y];
};

export { getArcCoordinates, degreesToRadians };
