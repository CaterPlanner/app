import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative'
import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';

import RootStore from './src/main/mobX/store/RootStore';
import {Provider} from 'mobx-react'
import SplashScreen from 'react-native-splash-screen';
import NavController from './src/main/component/page/navigation/NavController';



const root = new RootStore();

const App = () => {

  const debug_isAuth = false; //하위 컴포넌트도 접근할 수 있는 변수일대 값이 변경에 따라 아랫거도 바뀜



  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  },[]);

  return(
    <Provider {...root}>
      <NavigationContainer>
        <NavController/>
      </NavigationContainer>
    </Provider>
  );

}

export default App;