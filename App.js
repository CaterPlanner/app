import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/component/page/navigation/AppNavigation';
import RootStore from './src/mobX/store/RootStore';
import {Provider} from 'mobx-react'

const root = new RootStore();

const App = () => {

  return(
    <Provider {...root}>
      <NavigationContainer>
        <AppNavigation/>
      </NavigationContainer>
    </Provider>
  );

}

export default App;