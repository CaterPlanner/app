import PushNotification from 'react-native-push-notification'

export default {
  configure: () => {
    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();

    PushNotification.configure({
      onRegister: function (token) {

      },

      onNotification: function (notification) {


      },

      onAction: function (notification) {


        // process the action
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  },
  briefingAlarmShow: async (purposes) => {

    if(!purposes)
      purposes = await PurposeService.getInstance().findActivePurposes();
    

    if(!purposes)
      return;

    let goalCount = 0;

    let title;
    let message = '\n';

    purposes.forEach((purpose, index) => {
      const briefingList = purpose.detailPlans.filter(g => g.isNowBriefing)

      if(briefingList.length == 0)
        return;
        
      goalCount += briefingList.length;
      message += `${purpose.name} - ${briefingList.length}개` + (index != purposes.length - 1 || true ? '\n' : '');
    })
    
    if(goalCount == 0)
        return;

    title = `오늘 수행목표가 ${goalCount}개 있습니다.`

    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();

    PushNotification.localNotification({
      id: 0,
      visibility: 'public', //잠금화면도 보임
      importance: 'hight',
      playSound: false,
      title: title,
      message: message,
      vibrate: false
        })
  }
}