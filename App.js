import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative'
import React, {useEffect} from 'react'
import { NavigationContainer} from '@react-navigation/native';
import RootStore from './src/main/mobX/store/RootStore';
import {Provider} from 'mobx-react'
import NavController from './src/main/component/page/navigation/NavController';

import SQLite from 'react-native-sqlite-storage';


const root = new RootStore();

const App = () => {

  SQLite.DEBUG(true);
  SQLite.enablePromise(false);


  return(
    <Provider {...root}>
      <NavigationContainer>
        <NavController/>
      </NavigationContainer>
    </Provider>
  );

}

export default App;