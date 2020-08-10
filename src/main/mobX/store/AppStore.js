import {AsyncStorage} from 'react-native'
import {observable, action} from 'mobx';


export default class AppStore {

    @observable
    isBegin;

    userOptions;

    boot = async () => {
        this.isBegin = await AsyncStorage.getItem('IS_BEGIN');
        
        if(this.isBegin == null){
            //초기 세팅
            AsyncStorage.setItem('IS_BEGIN', 'false');
            AsyncStorage.setItem('USER_OPTIONS', JSON.parse(
                {init : 5} //default 값
            ));

            this.isBegin = false;
        }

        this.userOptions = await AsyncStorage.getItem('USER_OPTIONS');
    }

    @action
    setIsBegin = (isBegin) => {
        this.isBegin = isBegin;
        AsyncStorage.setItem('IS_BEGIN', isBegin.toString());
    }



}