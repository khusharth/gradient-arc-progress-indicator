import { getArcCoordinates, degreesToRadians } from './commonUtils';

type CheckIsCurrentProgressValidParams = {
  currentProgress?: number;
  maxProgress: number;
  minProgress: number;
};

const checkIsCurrentProgressValid = ({
  currentProgress,
  maxProgress,
  minProgress,
}: CheckIsCurrentProgressValidParams) => {
  if (typeof currentProgress !== 'number') {
    return false;
  }

  // if current progress is outside the range of min to max progress
  if (currentProgress < minProgress || currentProgress > maxProgress) {
    return false;
  }

  return true;
};

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

  const arcAngleInDeg = 360 - (arcEndAngleInDeg - arcStartAngleInDeg);
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
  const indicatorArcPath = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${arcEndX} ${arcEndY}`;
  const borderArcPath = `M ${borderArcStartX} ${borderArcStartY} A ${borderArcRadius} ${borderArcRadius} 0 ${largeArcFlag} ${sweepFlag} ${borderArcEndX} ${borderArcEndY}`;
  const dividerCoverArcPath = `M ${arcEndX} ${arcEndY} A ${arcRadius} ${arcRadius} 0 0 ${sweepFlag} ${arcStartX} ${arcStartY}`;

  // Gradient X1 and X2 values to make it more prominent
  const midProgressValue = (maxProgress - minProgress) / 2 + minProgress;
  const gradientY1 = currentProgress <= midProgressValue ? '100%' : '0';
  const gradientX2 = currentProgress <= midProgressValue ? '0' : '100%';

  // Needle related data
  // from arcStartAngleInDeg, how much angle has been completed for rotating the needle
  const needleRotationAngle = arcAngleInDeg * progressCompletedRatio;

  // needle starting position for needle end points, origin is 0 as the svg group needle
  // is in is already at circleCenterX, circleCenterY
  const [needleInitialEndX, needleInitialEndY] = getArcCoordinates({
    angle: arcStartAngle,
    radius: arcRadius,
    // set to 0 as we will be handling this in the svg group
    // (moving both the line and circle to the center)
    circleCenterX: 0,
    circleCenterY: 0,
  });

  return {
    needleData: {
      initialX2: needleInitialEndX,
      initialY2: needleInitialEndY,
      rotationAngle: needleRotationAngle,
    },
    pathsData: {
      borderArcPath,
      indicatorArcPath,
      dividerCoverArcPath,
    },
    linerGradientData: {
      y1: gradientY1,
      x2: gradientX2,
    },
    arcCircumference,
    arcStokeDashOffset,
    circleCenterX,
    circleCenterY,
  };
};

export { getArcData, checkIsCurrentProgressValid };
