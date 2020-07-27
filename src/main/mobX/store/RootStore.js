import DetailPlanTreeStore from './DetailPlanTreeStore'


export default class RootStore {
    constructor(){
        this.detailPlanTreeStore = new DetailPlanTreeStore(this);
    }
}