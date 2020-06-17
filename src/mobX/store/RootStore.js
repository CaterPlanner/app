import MainGoalStore from './MainGoalStore'
import DetailPlanStore from './DetailPlanStore'

export default class RootStore {
    constructor(){
        this.mainGoal = new MainGoalStore(this);
        this.detailPlanStore = new DetailPlanStore(this);
    }
}