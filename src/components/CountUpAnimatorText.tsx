import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, StyleSheet, Easing } from 'react-native';

import { ColorConfig } from '../constants';

type CountUpAnimatorTextProps = {
  /** duration for the animation */
  duration: number;
  /** number to start the count from */
  countFrom: number;
  /** number at which the count will stop */
  countTo: number;
};

const CountUpAnimatorText = ({
  duration,
  countFrom,
  countTo,
}: CountUpAnimatorTextProps) => {
  const animatedValue = useRef(new Animated.Value(countFrom)).current;
  const [animatedCount, setAnimatedCount] = useState(countFrom.toString());

  useEffect(() => {
    Animated.timing(animatedValue, {
      easing: Easing.inOut(Easing.cubic),
      toValue: countTo,
      duration: duration,
      useNativeDriver: true,
    }).start();

    animatedValue.addListener((value) => {
      setAnimatedCount(Math.round(value.value).toString());
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, [countTo, animatedValue, duration]);

  return <Text style={style.count}>{animatedCount}</Text>;
};

const style = StyleSheet.create({
  count: {
    fontSize: 24,
    fontWeight: '500',
    color: ColorConfig.gradientEnd,
  },
});

export default CountUpAnimatorText;
