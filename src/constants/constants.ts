export const OUTER_CIRCLE_WIDTH = 200;
export const OUTER_CIRCLE_BORDER_WIDTH = 0.5;
export const OUTER_CIRCLE_BORDER_SPACE_DIA = OUTER_CIRCLE_BORDER_WIDTH * 2;

// percentage of the outerCircleWidth we want our stroke width to be
const ARC_STOKE_WIDTH_PERCENTAGE = 0.275;
// distance b/w the outer circle and inner circle
export const ARC_STROKE_WIDTH = OUTER_CIRCLE_WIDTH * ARC_STOKE_WIDTH_PERCENTAGE;
export const INNER_CIRCLE_WIDTH = OUTER_CIRCLE_WIDTH - 2 * ARC_STROKE_WIDTH;

// Start and end arc angles in degree
export const ARC_START_ANGLE = 234;
export const ARC_END_ANGLE = 306;
