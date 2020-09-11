import NotificationManager from '../util/NotificationManager';
import PurposeService from '../rest/service/PurposeService'


module.exports = async () => {
    try{
        console.log('BRIEFING ALARAM!!!!!!!!!!!')
        const purposes= await PurposeService.getInstance().refresh();
        NotificationManager.briefingAlarmShow(purposes);
    }catch(e){
        console.log(e);
    }
}