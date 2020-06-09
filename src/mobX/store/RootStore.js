import MainGoalStore from './MainGoalStore'
import DetailPlansStore from './DetailPlansStore'

export default class RootStore {
    constructor(){
        this.mainGoal = new MainGoalStore(this);
        this.detailPlanStore = new DetailPlansStore(this);
    }
}