import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../shared/Colors';

type SearchInputProps = {
  placeholder?: string;
  onSubmitCallback: (arg: string) => void;
};

export default function SearchInput({
  placeholder,
  onSubmitCallback,
}: SearchInputProps) {
  const [value, setValue] = useState<string>('');

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
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 20,
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
