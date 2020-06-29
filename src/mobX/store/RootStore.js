import DetailPlanStore from './DetailPlanStore'

export default class RootStore {
    constructor(){
        this.detailPlanStore = new DetailPlanStore(this);
    }
}