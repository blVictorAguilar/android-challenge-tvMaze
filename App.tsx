/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import store, {persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import BottomTabNavigator from './src/navigation/routing/BottomNavigator';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
