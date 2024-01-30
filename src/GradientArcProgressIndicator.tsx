// Libraries
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';

// Utils and Constants
import {
  OUTER_CIRCLE_WIDTH,
  INNER_CIRCLE_WIDTH,
  ColorConfig,
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
  const { currentProgress } = props;

  return (
    <View style={styles.container}>
      <Svg style={styles.svgContainer}></Svg>

      <View style={styles.centerCircle}>
        <Text style={styles.progressText}>{currentProgress ?? '—'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: OUTER_CIRCLE_WIDTH,
    width: OUTER_CIRCLE_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 100,
    borderColor: ColorConfig.borderColor,
  },
  svgContainer: {
    width: '101%',
    height: '101%',
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
});

export default GradientArcProgressIndicator;
