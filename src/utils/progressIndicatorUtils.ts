import { getArcCoordinates, degreesToRadians } from './commonUtils';

type GetArcData = {
  currentProgress?: number;
  maxProgress: number;
  minProgress: number;
  outerCircleWidth: number;
  arcStrokeWidth: number;
  arcStartAngleInDeg: number;
  arcEndAngleInDeg: number;
  borderArcStrokeWidth: number;
};

const getArcData = (params: GetArcData) => {
  const {
    currentProgress = 0,
    maxProgress,
    minProgress,
    arcStrokeWidth,
    outerCircleWidth,
    arcStartAngleInDeg,
    arcEndAngleInDeg,
    borderArcStrokeWidth,
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

  const arcAngleInDeg = 360 - (arcEndAngleInDeg - arcStartAngleInDeg); // TODO: changed
  const arcAngle = degreesToRadians(arcAngleInDeg);

  const arcCurrentProgress = currentProgress - minProgress;
  const arcMaxProgress = maxProgress - minProgress;
  const progressCompletedRatio = arcCurrentProgress / arcMaxProgress;
  const remainingProgressRatio = 1 - progressCompletedRatio;
  // length of an arc circle
  const arcCircumference = arcRadius * arcAngle;
  // using remainingScoreRatio to fill arc from right to left
  const arcStokeDashOffset = arcCircumference * remainingProgressRatio;

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

  // ------- BORDER ARC ------- //
  const distanceFromInnerToOuterArc = outerCircleWidth / 2 - arcRadius;
  const borderArcRadius =
    arcRadius + distanceFromInnerToOuterArc - borderArcStrokeWidth / 2;

  /** broker arcs start and end positions on the x,y plane */
  const [borderArcStartX, borderArcStartY] = getArcCoordinates({
    angle: arcStartAngle,
    radius: borderArcRadius,
    circleCenterX: circleCenterX,
    circleCenterY: circleCenterY,
  });
  const [borderArcEndX, borderArcEndY] = getArcCoordinates({
    angle: arcEndAngle,
    radius: borderArcRadius,
    circleCenterX: circleCenterX,
    circleCenterY: circleCenterY,
  });

  /** Create arc using the coordinated calculated above */
  const largeArcFlag = 1; // create the major arc
  const sweepFlag = 1; // drawn arc counterclockwise (positive direction).
  const bgArcPath = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}`;
  const gradientArcPath = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}`;
  const borderArcPath = `M ${borderArcStartX} ${borderArcStartY} A ${borderArcRadius} ${borderArcRadius} 0 ${largeArcFlag} ${sweepFlag} ${borderArcEndX} ${borderArcEndY}`;

  // Gradient X1 and X2 values to make it more prominent
  const midProgressValue = (maxProgress - minProgress) / 2 + minProgress;
  const gradientY1 = currentProgress <= midProgressValue ? '100%' : '0';
  const gradientX2 = currentProgress <= midProgressValue ? '0' : '100%';

  return {
    pathsData: {
      bgArcPath,
      borderArcPath,
      gradientArcPath,
    },
    linerGradientData: {
      y1: gradientY1,
      x2: gradientX2,
    },
    arcCircumference,
    arcStokeDashOffset,
  };
};

export { getArcData };
