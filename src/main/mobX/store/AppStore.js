import AsyncStorage from '@react-native-community/async-storage'
import { observable, action } from 'mobx';
import CaterPlannerScheduler from '../../native/CaterPlannerScheduler';
import NotificationManager from '../../util/NotificationManager';

export default class AppStore {

    @observable
    isBegin;

    @observable
    offlineMode = false;

    userOptions;

    constructor() {
        NotificationManager.configure();
    }

    boot = async () => {
        this.isBegin = await AsyncStorage.getItem('IS_BEGIN');

        if (this.isBegin == null) {
            //초기 세팅
            AsyncStorage.setItem('IS_BEGIN', 'false');
            AsyncStorage.setItem('USER_OPTIONS', JSON.parse(
                { init: 5 } //default 값
            ));

            this.isBegin = false;
        }

        this.userOptions = await AsyncStorage.getItem('USER_OPTIONS');
        // console.log('start SCHEDULEERR~!!!!!!!!!!!!!!')
        // this.onScheduler();
    }

    @action
    setIsBegin = (isBegin) => {
        this.isBegin = isBegin;
        AsyncStorage.setItem('IS_BEGIN', isBegin.toString());
    }

    onScheduler = async () => {
        const isScheduling = await AsyncStorage.getItem("IS_SCHEDULING");

        if (!isScheduling){
            CaterPlannerScheduler.onScheduler();
        }
    }

    offScheduler = async () => {
        const isScheduling = await AsyncStorage.getItem("IS_SCHEDULING");

        if (isScheduling)
            CaterPlannerScheduler.offScheduler();

    }



}