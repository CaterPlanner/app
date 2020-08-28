import BriefingNotificationManager from '../util/BriefingNotificationManager';



module.exports = async () => {
    console.log('BRIEFING ALARM!!!');
    BriefingNotificationManager.show();
}