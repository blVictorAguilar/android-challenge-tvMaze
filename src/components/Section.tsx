import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyles from '../shared/GlobalStyles';

type SectionProps = {
  title: string;
  content: string;
};

export default function Section({title, content}: SectionProps) {
  return (
    <View style={styles.infoContainer}>
      <Text style={globalStyles.sectionTitle}>{title}</Text>
      <Text style={globalStyles.paragraph}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 10,
  },
});
