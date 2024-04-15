import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../shared/Colors';

export default function Loader() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color={colors.focused} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
