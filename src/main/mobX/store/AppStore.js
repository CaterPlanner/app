import { AsyncStorage } from 'react-native'
import { observable, action } from 'mobx';
import CaterPlannerScheduler from '../../native/CaterPlannerScheduler';
import BriefingNotificationManager from '../../util/BriefingNotificationManager';
import PurposeService from '../../rest/service/PurposeService';

export default class AppStore {

    @observable
    isBegin;

    @observable
    offlineMode = false;

    userOptions;

    constructor() {
        BriefingNotificationManager.configure();
    
        // (async () => {
        //     const purposes = await PurposeService.getInstance().findPurposeForBrifingList();
        //     const goalCount = 0;

        //     let title;
        //     let message;

        //     purposes.forEach((purpose, index) => {
        //         goalCount += purpose.detailPlans.length;
        //         message += `${purpose.name} - ${purpose.detailPlans.length}개` + (index != purposes.length - 1 ? '\n' : '');
        //     })

        //     title = `오늘 수행해야할 목표가 ${goalCount}개 있습니다.`

        //     BriefingNotificationManager.show(title, message);
        //     PushNotification.setApplicationIconBadgeNumber(0);
        // })();


        // BriefingNotificationManager.show('title', 'content')
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