import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteNames} from '../common/enums';
import colors from '../../shared/Colors';
import {Search, Account, Home} from '../screens';
import globalStyles from '../../shared/GlobalStyles';

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

function iconToRender(route, focused, color) {
  return (
    <Icon
      name={getIconByRouteName(route.name)}
      size={focused ? 29 : 25}
      color={color}
    />
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.HOME}
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        },
        headerTintColor: colors.text,
        headerTitleStyle: globalStyles.headerTitle,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
        },
        tabBarIcon: ({color, focused}) => iconToRender(route, focused, color),
        tabBarActiveTintColor: colors.focused,
        tabBarInactiveTintColor: colors.highlight,
      })}>
      <Tab.Screen
        name={RouteNames.HOME}
        options={{headerShown: false}}
        component={Home}></Tab.Screen>
      <Tab.Screen name={RouteNames.FAVORITES} options={{headerShown: true}}>
        {() => (
          <React.Suspense fallback={null}>
            <LazyFavoritesScreen />
          </React.Suspense>
        )}
      </Tab.Screen>
      <Tab.Screen
        name={RouteNames.SEARCH}
        options={{headerShown: true}}
        component={Search}></Tab.Screen>
      <Tab.Screen
        name={RouteNames.PROFILE}
        options={{headerShown: true}}
        component={Account}></Tab.Screen>
    </Tab.Navigator>
  );
}
