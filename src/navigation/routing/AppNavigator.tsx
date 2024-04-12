import React from 'react';
import {Home, Details} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../common/enums';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.HOME}>
      <Stack.Screen name={RouteNames.HOME} component={Home} />
      <Stack.Screen name={RouteNames.DETAILS} component={Details} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
