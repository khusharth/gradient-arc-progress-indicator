// Libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Utils and Constants
import { getArcData } from './utils';
import {
  OUTER_CIRCLE_WIDTH,
  OUTER_CIRCLE_BORDER_WIDTH,
  OUTER_CIRCLE_BORDER_SPACE_DIA,
  INNER_CIRCLE_WIDTH,
  ColorConfig,
  ARC_STROKE_WIDTH,
  ARC_START_ANGLE,
  ARC_END_ANGLE,
} from './constants';

type GradientArcProgressIndicatorProps = {
  /** current progress of the user */
  currentProgress?: number;
  /** maximum progress possible, default 100 */
  maxProgress?: number;
  /** minimum progress possible, default 0 */
  minProgress?: number;
};

/**
. Create a base circle container
 */
const GradientArcProgressIndicator = (
  props: GradientArcProgressIndicatorProps,
) => {
  const { currentProgress, minProgress, maxProgress } = props;
  const { pathsData } = getArcData({
    outerCircleWidth: OUTER_CIRCLE_WIDTH,
    arcStrokeWidth: ARC_STROKE_WIDTH,
    arcStartAngleInDeg: ARC_START_ANGLE,
    arcEndAngleInDeg: ARC_END_ANGLE,
  });

  return (
    <View style={styles.container}>
      <Svg style={styles.svgContainer}>
        {/** background arc shown below the animated gradient arc */}
        <Path
          stroke={ColorConfig.gradientStart}
          fill="none"
          d={pathsData.bgArcPath}
          strokeWidth={ARC_STROKE_WIDTH}
        />
      </Svg>

      <View style={styles.centerCircle}>
        <Text style={styles.progressText}>{currentProgress ?? '—'}</Text>
      </View>

      {/** Min/Max Progress display */}
      <View style={styles.minMaxProgressContainer}>
        <View style={styles.minProgressTextContainer}>
          <Text>{minProgress}</Text>
        </View>
        <View style={styles.maxProgressTextContainer}>
          <Text>{maxProgress}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: OUTER_CIRCLE_WIDTH + OUTER_CIRCLE_BORDER_SPACE_DIA,
    width: OUTER_CIRCLE_WIDTH + OUTER_CIRCLE_BORDER_SPACE_DIA,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: OUTER_CIRCLE_BORDER_WIDTH,
    borderRadius: 100,
    borderColor: ColorConfig.borderColor,
  },
  svgContainer: {
    width: '100%',
    height: '100%',
  },
  centerCircle: {
    position: 'absolute',
    height: INNER_CIRCLE_WIDTH,
    width: INNER_CIRCLE_WIDTH,
    borderRadius: 100,
    backgroundColor: ColorConfig.centerCircleBg,
    borderWidth: 5,
    borderColor: ColorConfig.borderWhite,
    justifyContent: 'center',
    alignItems: 'center',

    // shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowColor: ColorConfig.shadowColor,
    // shadow on android
    elevation: 2,
  },
  progressText: {
    fontSize: 24,
    fontWeight: '500',
  },
  minMaxProgressContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minProgressTextContainer: {
    left: 28,
  },
  maxProgressTextContainer: {
    right: 15,
  },
});

export default GradientArcProgressIndicator;
