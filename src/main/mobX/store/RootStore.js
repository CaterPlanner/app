import DetailPlanMakerStore from './DetailPlanMakerStore'


export default class RootStore {
    constructor(){
        this.detailPlanMakerStore = new DetailPlanMakerStore(this);
    }
}