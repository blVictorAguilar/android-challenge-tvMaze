import {StyleSheet, View} from 'react-native';
import React from 'react';
import colors from '../shared/Colors';

export default function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.secondary,
  },
});
