import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../common/enums';

const Stack = createNativeStackNavigator();
const LazyDetailsScreen = React.lazy(() => import('../screens/Details'));

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteNames.DETAILS}>
        {() => (
          <React.Suspense fallback={null}>
            <LazyDetailsScreen />
          </React.Suspense>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
