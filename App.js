import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative'
import React from './src/main/component/page/screen/common/node_modules/react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/main/component/page/navigation/AppNavigation';
import RootStore from './src/main/mobX/store/RootStore';
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