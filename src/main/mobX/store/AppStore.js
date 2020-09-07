import AsyncStorage from '@react-native-community/async-storage'
import { observable, action } from 'mobx';
import CaterPlannerScheduler from '../../native/CaterPlannerScheduler';
import NotificationManager from '../../util/NotificationManager';

export default class AppStore {

    @observable
    isBegin = null;

    @observable
    offlineMode = false;

    userOptions;

    options;

    constructor() {
        NotificationManager.configure();
    }

    boot = () => {
        return new Promise(async (resolve, reject) => {
            const asyncBegin = await AsyncStorage.getItem('IS_BEGIN');
            this.isBegin = asyncBegin == null || Boolean(asyncBegin) ? true : false


            if (this.isBegin) {
                //초기 세팅
                await AsyncStorage.setItem('IS_BEGIN', 'false');
                this.onScheduler();
                console.log('dddd')
            } 
            resolve();

        })
    }

    @action
    setIsBegin = async (isBegin) => {
        await AsyncStorage.setItem('IS_BEGIN', isBegin.toString());
        this.isBegin = isBegin;
    }

    onScheduler = async () => {
        if(!CaterPlannerScheduler.isScheduling()){
            console.log('on');
            CaterPlannerScheduler.onScheduler();
        }
    }

    offScheduler = async () => {
        if(CaterPlannerScheduler.isScheduling()){
            console.log('off');
            CaterPlannerScheduler.offScheduler();
        }
    }

    get isScheduling(){
        return CaterPlannerScheduler.isScheduling();
    }

}