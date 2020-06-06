import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/component/page/navigation/AppNavigation';

const App = () => {

  return(
    <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
  );

}

export default App;