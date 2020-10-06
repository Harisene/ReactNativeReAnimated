import React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/screens/Home';
import Basics from './src/screens/Basics';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerTitle: 'React Native ReAnimated'}} component={Home} />
        <Stack.Screen name="Basics" component={Basics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
