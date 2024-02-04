import React from 'react';
import { Circle, Line } from 'react-native-svg';

import {
  DividerConfig,
  ANGLE_BETWEEN_TWO_DIVIDERS,
  ColorConfig,
} from '../constants';
import { getArcCoordinates } from '../utils/commonUtils';

type GetSvgScoreDividers = {
  /** center x coordinate */
  circleCenterX: number;
  /** center y coordinate */
  circleCenterY: number;
  /** width of the circle */
  circleWidth: number;
};

/**
 * returns dividers svg path
 */
const ProgressDividers = ({
  circleCenterX,
  circleCenterY,
  circleWidth,
}: GetSvgScoreDividers): JSX.Element[] => {
  const dividers = [];
  const circleRadius = circleWidth / 2;
  const dividerLength = circleRadius * DividerConfig.DIVIDER_TO_RADIUS_RATIO;

  for (
    let dividerNumber = 0;
    dividerNumber < DividerConfig.COUNT;
    dividerNumber++
  ) {
    const currentSectionAngle = dividerNumber * ANGLE_BETWEEN_TWO_DIVIDERS;
    const [dividerEndX, dividerEndY] = getArcCoordinates({
      angle: currentSectionAngle,
      radius: dividerLength,
      circleCenterX,
      circleCenterY,
    });

    dividers.push(
      <React.Fragment key={`score-divider-${dividerNumber}`}>
        <Line
          x1={circleCenterX}
          y1={circleCenterY}
          x2={dividerEndX}
          y2={dividerEndY}
          stroke={`${ColorConfig.shadowColor}1a`}
          strokeWidth={DividerConfig.WIDTH}
        />
        <Circle
          fill={`${ColorConfig.shadowColor}0d`}
          r={DividerConfig.TOP_CIRCLE_RADIUS}
          cx={dividerEndX}
          cy={dividerEndY}
        />
      </React.Fragment>,
    );
  }

  return dividers;
};

export default ProgressDividers;
