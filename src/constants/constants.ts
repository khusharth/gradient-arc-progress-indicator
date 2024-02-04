export const OUTER_CIRCLE_WIDTH = 200;
export const OUTER_CIRCLE_BORDER_WIDTH = 0.5;
export const OUTER_CIRCLE_BORDER_SPACE_DIA = OUTER_CIRCLE_BORDER_WIDTH * 2;

// percentage of the outerCircleWidth we want our stroke width to be
const ARC_STOKE_WIDTH_PERCENTAGE = 0.275;
// distance b/w the outer circle and inner circle
export const ARC_STROKE_WIDTH = OUTER_CIRCLE_WIDTH * ARC_STOKE_WIDTH_PERCENTAGE;
export const INNER_CIRCLE_WIDTH = OUTER_CIRCLE_WIDTH - 2 * ARC_STROKE_WIDTH;
export const BORDER_ARC_STROKE_WIDTH = 6;

// Start and end arc angles in degree
export const ARC_START_ANGLE = 232;
export const ARC_END_ANGLE = 308;

// needle related
export const NEEDLE_STROKE_WIDTH = 5;
export const NEEDLE_TOP_CIRCLE_WIDTH = 2.4;

// divider related
export const DividerConfig = {
  COUNT: 20,
  // divider length in terms of circle radius
  DIVIDER_TO_RADIUS_RATIO: 0.5,
  WIDTH: 2,
  TOP_CIRCLE_RADIUS: 0.7,
};
export const ANGLE_BETWEEN_TWO_DIVIDERS = (2 * Math.PI) / DividerConfig.COUNT;
