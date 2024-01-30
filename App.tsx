import React from 'react';
import { StyleSheet, View } from 'react-native';
import GradientArcProgressIndicator from './src';

const App = () => {
  return (
    <View style={styles.container}>
      <GradientArcProgressIndicator
        currentProgress={100}
        minProgress={0}
        maxProgress={100}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
