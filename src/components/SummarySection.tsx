import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import globalStyles, {FontSizes} from '../shared/GlobalStyles';
import colors from '../shared/Colors';
import {textFormatter} from '../utils';

const THRESHOLD = 150;

export default function SummarySection({text}: {text: string}) {
  const [collapsed, setCollapsed] = useState<boolean>(true); // Start collapsed
  const formattedText = textFormatter(text);

  const toggleCollapse = useCallback(() => {
    setCollapsed((prevCollapsed: boolean) => !prevCollapsed);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={globalStyles.paragraph}>
        {collapsed
          ? formattedText.slice(0, THRESHOLD) +
            (text.length > THRESHOLD ? '...' : '')
          : formattedText}
      </Text>
      {text.length > THRESHOLD && (
        <Pressable onPress={toggleCollapse}>
          <Text style={styles.showMore}>
            {collapsed ? 'Show more' : 'Show less'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  showMore: {
    fontSize: FontSizes.S,
    color: colors.text,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  container: {
    marginTop: 10,
  },
});
