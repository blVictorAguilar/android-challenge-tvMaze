import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteNames} from '../common/enums';
import colors from '../../shared/Colors';
import {Search} from '../screens';

const LazyHomeScreen = React.lazy(() => import('../screens/Home'));
const LazyFavoritesScreen = React.lazy(() => import('../screens/Favorites'));

const Tab = createBottomTabNavigator();

const bottomIcons: {[key in RouteNames]: string} = {
  [RouteNames.FAVORITES]: 'favorite-outline',
  [RouteNames.HOME]: 'window',
  [RouteNames.SEARCH]: 'search',
  [RouteNames.PROFILE]: 'account-circle',
};

function getIconByRouteName(routeName: string): string {
  return bottomIcons[routeName as RouteNames];
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.HOME}
      screenOptions={({route}) => ({
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        },
        tabBarIcon: ({color, focused}) => {
          return (
            <Icon
              name={getIconByRouteName(route.name)}
              size={focused ? 29 : 25}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#FF9752',
        tabBarInactiveTintColor: colors.highlight,
      })}>
      <Tab.Screen name={RouteNames.HOME} options={{headerShown: false}}>
        {() => (
          <React.Suspense fallback={null}>
            <LazyHomeScreen />
          </React.Suspense>
        )}
      </Tab.Screen>
      <Tab.Screen name={RouteNames.FAVORITES} options={{headerShown: false}}>
        {() => (
          <React.Suspense fallback={null}>
            <LazyFavoritesScreen />
          </React.Suspense>
        )}
      </Tab.Screen>
      <Tab.Screen
        name={RouteNames.SEARCH}
        options={{headerShown: false}}
        component={Search}></Tab.Screen>
      <Tab.Screen
        name={RouteNames.PROFILE}
        options={{headerShown: false}}
        component={Search}></Tab.Screen>
    </Tab.Navigator>
  );
}
