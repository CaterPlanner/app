import {observable, action, computed} from 'mobx';
import CaterPlannerDetailPlanMaker from '../../native/CaterPlannerDetailPlanMaker'


export default class DetailPlanMakerStore{

    @observable actionLevel;
    @observable goalViewData;

    @action
    start(purpose){
        this.actionLevel = 0;
        this.goalViewData = [];        
        this.purpose = purpose;
    }

    @action 
    build = (detailPlans) => {
        CaterPlannerDetailPlanMaker.build(detailPlans)
    }

    @action 
    create = async () => {
        await CaterPlannerDetailPlanTree.create();
    }

    @action
    insertGoal = (level, goal) => {
        CaterPlannerDetailPlanMaker.insertGoal(level, goal)
        .then(() => {
            this.goalViewData = CaterPlannerDetailPlanMaker.goalViewData();
        });
    }

    @action
    insertPerform = (goalId, perform) => {
        CaterPlannerDetailPlanMaker.insertPerform(goalId, perform)
        .then(() => {
            this.goalViewData = CaterPlannerDetailPlanMaker.goalViewData();
        });
    }

    @action
    getGoal = (goalId) => {
        return CaterPlannerDetailPlanMaker.getGoal(goalId);
    }

    @action
    getPerform = (performId) => {
        return CaterPlannerDetailPlanMaker.getPerform(performId);
    }

    @action
    modifyGoal = (goalId, goal) => {
        CaterPlannerDetailPlanMaker.modifyGoal(goalId, goal)
        .then(() => {
            this.goalViewData = CaterPlannerDetailPlanMaker.goalViewData();
        });
    }

    @action
    modifyPerform = (performId, perform) => {
        CaterPlannerDetailPlanMaker.modifyPerform(performId, perform)
        .then(() => {
            this.goalViewData = CaterPlannerDetailPlanMaker.goalViewData();
        })
    }

    @action
    deleteGoal = (goalId) => {
        CaterPlannerDetailPlanMaker.deleteGoal(goalId)
        .then(() => {
            this.goalViewData = CaterPlannerDetailPlanMaker.goalViewData();
        })
    }

    @action
    deletePerform = (performId) => {
        CaterPlannerDetailPlanMaker.deletePerform(performId)
        .then(() => {
            this.goalViewData = CaterPlannerDetailPlanMaker.goalViewData();
        })
    }

    @action
    build = (detailPlans) => {
        CaterPlannerDetailPlanMaker.build(detailPlans);
    }

    @action
    chagneActionLevel = (actionLevel) => {
        this.actionLevel = actionLevel;
    }

    get currentGoalBottmData(){
        return goalViewData[activeLevel];
    }

    get entry(){
        return CaterPlannerDetailPlanMaker.entry();
    }

}