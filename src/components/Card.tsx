import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import globalStyles from '../shared/GlobalStyles';

type CardProps = {
  image: {
    medium?: string;
    original?: string;
  };
  name: string;
  id: number;
  onCallbackFn: (args?: any) => void;
  language?: string;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Card({image, name, language, onCallbackFn}: CardProps) {
  return (
    <Pressable onPress={onCallbackFn}>
      <View style={styles.container}>
        <Image source={{uri: image.medium}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={globalStyles.subtitle}>
            {name}
          </Text>
          <Text style={globalStyles.details}>{language}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 3,
    width: windowWidth * 0.45,
    height: windowHeight * 0.38,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 4,
    marginBottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25 )',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
});
