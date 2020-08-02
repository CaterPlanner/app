import DetailPlanMakerStore from './DetailPlanMakerStore'
import PurposeWriteStore from './PurposeWriteStore';


export default class RootStore {
    constructor(){
        this.detailPlanMakerStore = new DetailPlanMakerStore(this);
        this.purposeWriteStore = new PurposeWriteStore(this);
    }
}