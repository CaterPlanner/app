import 'react-native-gesture-handler';
import 'mobx-react-lite/batchingForReactNative'
import React, {Component} from 'react'
import {ToastAndroid, BackHandler} from 'react-native'
import { NavigationContainer} from '@react-navigation/native';
import RootStore from './src/main/mobX/store/RootStore';
import {Provider} from 'mobx-react'
import NavController from './src/main/component/page/navigation/NavController';
import SQLite from 'react-native-sqlite-storage';


export default class App extends Component{
    constructor(props){
      super(props);

      // SQLite.DEBUG(true);
      SQLite.enablePromise(false);

      this.root = new RootStore();

    }

    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount(){
      this.exitApp = false;
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
      // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
      if (this.exitApp == undefined || !this.exitApp) {
          ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
          this.exitApp = true;

          this.timeout = setTimeout(
              () => {
                  this.exitApp = false;
              },
              2000    // 2초
          );
      } else {
          clearTimeout(this.timeout);

          BackHandler.exitApp();  // 앱 종료
      }
      return true;
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

