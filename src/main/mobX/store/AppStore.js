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

            this.isBegin = asyncBegin == null || asyncBegin == true ? true : false


            if (this.isBegin) {
                //초기 세팅
                await AsyncStorage.setItem('IS_BEGIN', 'false');
                this.offScheduler();
                this.onScheduler();
            }

            resolve();

        })
    }

    @action
    setIsBegin = (isBegin) => {
        return new Promise(async (resolve, reject) => {
            await AsyncStorage.setItem('IS_BEGIN', isBegin.toString());
            this.isBegin = isBegin;
            resolve();
        })
    }

    onScheduler = async () => {
        if(!CaterPlannerScheduler.isScheduling()){
            CaterPlannerScheduler.onScheduler();
        }
    }

    offScheduler = async () => {
        if(CaterPlannerScheduler.isScheduling()){
            CaterPlannerScheduler.offScheduler();
        }
    }

    get isScheduling(){
        return CaterPlannerScheduler.isScheduling();
    }

}