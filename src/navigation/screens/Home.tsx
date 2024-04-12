import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../common/enums';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Navigate"
        onPress={() => navigation.navigate(RouteNames.DETAILS as never)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
