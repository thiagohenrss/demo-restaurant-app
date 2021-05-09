import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import Stores from '../screens/Stores';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <>
    <StatusBar
      barStyle="light-content"
      hidden={false}
      translucent
      backgroundColor="transparent"
    />
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#db2929',
        },
      }}
    >
      <App.Screen name="Welcome" component={ Welcome } />
      <App.Screen name="Home" component={ Home } />
      <App.Screen name="Stores" component={ Stores } />
    </App.Navigator>
  </>
);

export default AppRoutes;
