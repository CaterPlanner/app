import DetailPlanWriteStore from './DetailPlanWriteStore'
import PurposeWriteStore from './PurposeWriteStore';
import AuthStore from './AuthStore';
import AppStore from './AppStore';


export default class RootStore {
    constructor(){
        this.detailPlanWriteStore = new DetailPlanWriteStore(this);
        this.purposeWriteStore = new PurposeWriteStore(this);
        this.authStore = new AuthStore(this);
        this.appStore = new AppStore(this);
    }
}