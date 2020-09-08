import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative'
import React, {Component} from 'react'
import {ToastAndroid, BackHandler} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import RootStore from './src/mains/mobX/store/RootStore';
import {Provider} from 'mobx-react'
import NavController from './src/mains/component/page/navigation/NavController';

import SQLite from 'react-native-sqlite-storage';
import NotificationManager from './src/mains/util/NotificationManager';
import CaterPlannerScheduler from './src/mains/native/CaterPlannerScheduler';


export default class App extends Component{
    constructor(props){
      super(props);

      SQLite.DEBUG(true);
      SQLite.enablePromise(false);

      this.root = new RootStore();

    }

    componentWillUnmount(){
      CaterPlannerScheduler.show();
    }

    render(){
      return(
        <Provider {...this.root}>
        <NavigationContainer>
          <NavController/>
        </NavigationContainer>
      </Provider>
      )
    }
}

