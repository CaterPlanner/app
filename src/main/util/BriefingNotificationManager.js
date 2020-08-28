import PushNotification from 'react-native-push-notification'
import PurposeService from '../rest/service/PurposeService'

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
  show: async (purposes) => {

    if(!purposes)
      purposes = await PurposeService.getInstance().findPurposeForBrifingList();
    
      let goalCount = 0;

    let title;
    let message;

    purposes.forEach((purpose, index) => {
      goalCount += purpose.detailPlans.length;
      message += `${purpose.name} - ${purpose.detailPlans.length}개` + (index != purposes.length - 1 ? '\n' : '');
    })
    
    if(goalCount == 0)
        return;

    title = `오늘 수행해야할 목표가 ${goalCount}개 있습니다.`

    PushNotification.localNotification({
      id: 0,
      visibility: 'public', //잠금화면도 보임
      importance: 'hight',
      showWhen: false,
      playSound: false,
      title: title,
      message: message,
      vibrate: false,
      ongoing: true,
    })
  }
}