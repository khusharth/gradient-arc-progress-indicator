import { getArcCoordinates, degreesToRadians } from './commonUtils';

type GetArcData = {
  outerCircleWidth: number;
  arcStrokeWidth: number;
  arcStartAngleInDeg: number;
  arcEndAngleInDeg: number;
};

const getArcData = (params: GetArcData) => {
  const {
    arcStrokeWidth,
    outerCircleWidth,
    arcStartAngleInDeg,
    arcEndAngleInDeg,
  } = params;

  // diameter of the circle = size - strokeWidth
  const arcDiameter = outerCircleWidth - arcStrokeWidth;
  const arcRadius = arcDiameter / 2;

  // x and y coordinated of the center
  const circleCenterX = outerCircleWidth / 2;
  const circleCenterY = outerCircleWidth / 2;

  // convert them to radians for easier calculation
  const arcStartAngle = degreesToRadians(arcStartAngleInDeg);
  const arcEndAngle = degreesToRadians(arcEndAngleInDeg);

  // get start coordinates for the starting point of the arc
  const [arcStartX, arcStartY] = getArcCoordinates({
    angle: arcStartAngle,
    radius: arcRadius,
    circleCenterX: circleCenterX,
    circleCenterY: circleCenterY,
  });

  // get start coordinates for the ending point of the arc
  const [arcEndX, arcEndY] = getArcCoordinates({
    angle: arcEndAngle,
    radius: arcRadius,
    circleCenterX: circleCenterX,
    circleCenterY: circleCenterY,
  });

  /** Create arc using the coordinated calculated above */
  const largeArcFlag = 1; // create the major arc
  const sweepFlag = 1; // drawn arc counterclockwise (positive direction).
  const bgArcPath = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}`;

  return {
    pathsData: {
      bgArcPath,
    },
  };
};

export { getArcData };
