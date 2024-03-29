// Libraries
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  G,
  Line,
  Circle,
} from 'react-native-svg';

// Components
import { CountUpAnimatorText, ProgressDividers } from './components';

// Utils and Constants
import { getArcData, checkIsCurrentProgressValid } from './utils';
import {
  OUTER_CIRCLE_WIDTH,
  OUTER_CIRCLE_BORDER_WIDTH,
  OUTER_CIRCLE_BORDER_SPACE_DIA,
  BORDER_ARC_STROKE_WIDTH,
  NEEDLE_TOP_CIRCLE_WIDTH,
  NEEDLE_STROKE_WIDTH,
  INNER_CIRCLE_WIDTH,
  ANIMATION_DURATION,
  ARC_STROKE_WIDTH,
  ARC_START_ANGLE,
  ARC_END_ANGLE,
  ColorConfig,
} from './constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedG = Animated.createAnimatedComponent(G);

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
  const { currentProgress, minProgress = 0, maxProgress = 100 } = props;
  const isCurrentProgressValid = checkIsCurrentProgressValid({
    minProgress,
    maxProgress,
    currentProgress,
  });

  const {
    pathsData,
    needleData,
    circleCenterX,
    circleCenterY,
    arcCircumference,
    linerGradientData,
    arcStokeDashOffset,
  } = getArcData({
    minProgress,
    maxProgress,
    currentProgress: isCurrentProgressValid ? currentProgress : 0,
    outerCircleWidth: OUTER_CIRCLE_WIDTH,
    arcStrokeWidth: ARC_STROKE_WIDTH,
    arcStartAngleInDeg: ARC_START_ANGLE,
    arcEndAngleInDeg: ARC_END_ANGLE,
    borderArcStrokeWidth: BORDER_ARC_STROKE_WIDTH,
  });

  const progressAnimationRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progressAnimationRef.current, {
      easing: Easing.inOut(Easing.cubic),
      duration: ANIMATION_DURATION,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStrokeDashoffset = progressAnimationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [arcCircumference, arcStokeDashOffset],
  });

  const animatedNeedleRotationAngle = progressAnimationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${needleData.rotationAngle}deg`],
  });

  return (
    <View style={styles.container}>
      <Svg style={styles.svgContainer}>
        {/** background arc shown below the animated gradient arc */}
        <Path
          stroke={ColorConfig.gradientStart}
          fill="none"
          d={pathsData.indicatorArcPath}
          strokeWidth={ARC_STROKE_WIDTH}
        />

        {/** gradient arc */}
        <Defs>
          <LinearGradient
            id="grad"
            x1="0"
            y1={linerGradientData.y1}
            x2={linerGradientData.x2}
            y2="0"
          >
            <Stop offset="0%" stopColor={ColorConfig.gradientStart} />
            <Stop offset="100%" stopColor={ColorConfig.gradientEnd} />
          </LinearGradient>
        </Defs>

        <AnimatedPath
          stroke="url(#grad)"
          fill="none"
          d={pathsData.indicatorArcPath}
          strokeWidth={ARC_STROKE_WIDTH}
          strokeDashoffset={animatedStrokeDashoffset}
          strokeDasharray={arcCircumference}
        />

        {/** transparent border arc */}
        <Path
          stroke={ColorConfig.transparent}
          fill="none"
          d={pathsData.borderArcPath}
          strokeWidth={BORDER_ARC_STROKE_WIDTH}
        />

        <ProgressDividers
          circleCenterX={circleCenterX}
          circleCenterY={circleCenterY}
          circleWidth={OUTER_CIRCLE_WIDTH}
        />

        {/** arc to cover extra dividers */}
        <Path
          stroke="white"
          fill="none"
          d={pathsData.dividerCoverArcPath}
          strokeWidth={ARC_STROKE_WIDTH}
        />

        {/* Needle */}
        <AnimatedG
          x={circleCenterX}
          y={circleCenterY}
          style={{
            transform: [{ rotateZ: animatedNeedleRotationAngle }],
          }}
        >
          <Line
            x1={0}
            y1={0}
            x2={needleData.initialX2}
            y2={needleData.initialY2}
            stroke={ColorConfig.needleColor}
            strokeWidth={NEEDLE_STROKE_WIDTH}
          />
          <Circle
            fill={ColorConfig.needleColor}
            r={NEEDLE_TOP_CIRCLE_WIDTH}
            cx={needleData.initialX2}
            cy={needleData.initialY2}
          />
        </AnimatedG>
      </Svg>

      <View style={styles.centerCircle}>
        {isCurrentProgressValid ? (
          <CountUpAnimatorText
            duration={ANIMATION_DURATION}
            countFrom={minProgress}
            countTo={currentProgress ?? minProgress}
          />
        ) : (
          <Text style={styles.progressText}>—</Text>
        )}
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
    borderColor: 'white',
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
