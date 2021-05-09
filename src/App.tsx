import 'react-native-gesture-handler';

import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

const App = () => (
  <NavigationContainer>
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
