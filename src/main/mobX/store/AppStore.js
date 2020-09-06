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

    options;

    constructor() {
        NotificationManager.configure();
    }

    boot = async () => {
        this.isBegin = await AsyncStorage.getItem('IS_BEGIN');


        if (this.isBegin == null) {
            //초기 세팅
            await AsyncStorage.setItem('IS_BEGIN', 'false');
            await AsyncStorage.setItem('USER_OPTIONS', JSON.parse(
                { init: 5 } //default 값
            ));
            await AsyncStorage.setItem('IS_SCHEDULING', "true");

            this.isBegin = false;
        }

        this.options = {
            allowScheduling : Boolean(await AsyncStorage.getItem("IS_SCHEDULING")) == true
        }

        // this.userOptions = await AsyncStorage.getItem('USER_OPTIONS');
        // console.log('start SCHEDULEERR~!!!!!!!!!!!!!!')
        // this.onScheduler();
    }

    @action
    setIsBegin = (isBegin) => {
        this.isBegin = isBegin;
        AsyncStorage.setItem('IS_BEGIN', isBegin.toString());
    }

    onScheduler = async () => {
        if (!this.options.allowScheduling){
            console.log('on');
            CaterPlannerScheduler.onScheduler();
            await AsyncStorage.setItem("IS_SCHEDULING", "true")
            this.options.allowScheduling = true;
        }
    }

    offScheduler = async () => {
        if (this.options.allowScheduling){
            console.log('off');
            CaterPlannerScheduler.offScheduler();
            await AsyncStorage.setItem("IS_SCHEDULING", "false");
            this.options.allowScheduling = false;
        }
    }

    get isScheduling(){

    }

}