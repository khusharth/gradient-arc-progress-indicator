import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Abc from './abc';

const GradientArcProgressIndicator = () => {
  return (
    <View style={styles.container}>
      <Text>Gradient Arc Progress Indicator</Text>
      <Abc />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GradientArcProgressIndicator;
