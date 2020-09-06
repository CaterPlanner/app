import NotificationManager from '../util/NotificationManager';
import PurposeService from '../rest/service/PurposeService'


module.exports = async () => {
    console.log('BRIEFING ALAARM!!!!!!!!!!!!!');
    try{
        const purposes= await PurposeService.getInstance().refresh();
        NotificationManager.briefingAlarmShow(purposes);
    }catch(e){
        console.log('errrrrrer');
        console.log(e);
    }
}