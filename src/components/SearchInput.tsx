import {StyleSheet, TextInput, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../shared/Colors';

type SearchInputProps = {
  placeholder?: string;
  onSubmitCallback: (arg: string) => void;
};

type ImperativeHandleActionTypes = {
  clear: () => void;
};
const SearchInput = forwardRef<any, SearchInputProps>((props, ref) => {
  const {placeholder, onSubmitCallback} = props;
  const [value, setValue] = useState<string>('');

  useImperativeHandle(
    ref,
    (): ImperativeHandleActionTypes => ({
      clear: () => {
        setValue('');
      },
    }),
  );

  return (
    <View style={styles.inputContainer}>
      <Icon
        name="search"
        size={24}
        color={colors.secondary}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        onSubmitEditing={() => onSubmitCallback(value)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: colors.secondary,
    fontWeight: '500',
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default SearchInput;
