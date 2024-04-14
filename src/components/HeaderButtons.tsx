import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../shared/Colors';

type HeaderButtonsProps = {
  name: string;
  onPressFn?: () => void;
  focused?: boolean;
};

type Orientation = 'left' | 'right';
type Direction = 'row' | 'row-reverse';

const HeaderButtons = React.memo(
  ({
    elements,
    orientation = 'left',
  }: {
    elements: HeaderButtonsProps[];
    orientation?: Orientation;
  }) => {
    const direction: Record<Orientation, Direction> = {
      left: 'row',
      right: 'row-reverse',
    };

    const default_icon_size = 30;
    return (
      <View style={[styles.overlay, {flexDirection: direction[orientation]}]}>
        {elements &&
          elements.map(({name, onPressFn, focused = false}) => (
            <Pressable key={name} onPress={onPressFn} style={styles.iconButton}>
              <Icon
                name={name}
                size={default_icon_size}
                color={focused ? colors.focused : colors.highlight}
              />
            </Pressable>
          ))}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  iconButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    borderRadius: 40,
    marginLeft: 5,
  },
});

export default HeaderButtons;
