import PushNotification from 'react-native-push-notification'

export default {
  configure: () => {
    PushNotification.setApplicationIconBadgeNumber(0);
    PushNotification.cancelAllLocalNotifications();

    PushNotification.configure({
      onRegister: function (token) {
        console.log('onRegister')
        console.log("TOKEN:", token);
      },

      onNotification: function (notification) {
        console.log('onNotification')
        console.log("NOTIFICATION:", notification);

      },

      onAction: function (notification) {
        console.log('onAction')
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  },
  briefingAlarmShow: (purposes) => {

    // if(!purposes)
    //   purposes = await PurposeService.getInstance().findActivePurposes();
    

    if(!purposes)
      return;

    let goalCount = 0;

    let title;
    let message = '';

    purposes.forEach((purpose, index) => {
      const briefingList = purpose.detailPlans.filter(g => g.isNowBriefing)

      if(briefingList.length == 0)
        return;
        
      goalCount += briefingList.length;
      message += `${purpose.name} - ${briefingList.length}개` + (index != purposes.length - 1 || true ? '\n' : '');
    })
    
    if(goalCount == 0)
        return;

    title = `오늘 수행해야할 목표가 ${goalCount}개 있습니다.`

    PushNotification.localNotification({
      id: 0,
      visibility: 'public', //잠금화면도 보임
      importance: 'hight',
      playSound: false,
      title: title,
      message: message,
      vibrate: false,
      ongoing: true,
    })
  }
}