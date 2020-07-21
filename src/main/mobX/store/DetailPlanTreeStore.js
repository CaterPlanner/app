import {observable, action, computed} from 'mobx';
import CaterPlannerDetailPlanTree from '../../native/CaterPlannerDetailPlanTree'


export default class DetailPlanTreeStore{

    @observable activeShowKey;

    @observable goalTopViewData;
    @observable goalBottomViewData;

    _start(){
        this.activeShowKey = 0;

        this.goalBottomViewData = [];
        this.goalTopViewData = [];
    }

    @action 
    create = async () => {
        this._start();
        await CaterPlannerDetailPlanTree.create();
    }
    
    @action 
    insertDetailPlan = (parentKey, detailPlan) => {
       
        CaterPlannerDetailPlanTree.insert(parentKey, detailPlan)
        .then(() => {
            if(this.activeShowKey == 0)
                this.activeShowKey = 1;

            this._updateViewData();
        }) 
        .catch((error) => {
           console.log(error.message);
        })

    }

    @action 
    successorDetailPlan = (parentKey, detailPlan) => {
        CaterPlannerDetailPlanTree.successor(parentKey, detailPlan)
        .then(() => {
            this._updateViewData();
        }) 
        .catch((error) => {
           console.log(error.message);
        })
    }
    
    @action 
    modifyDetailPlan = (key, copy) => {

        CaterPlannerDetailPlanTree.modify(key, copy)
        .catch((error) => {
            console.log(error.message);
        })

    }

    @action 
    deleteDetailPlan = (key) => {

        CaterPlannerDetailPlanTree.delete(key)
        .then(() => {
            this._updateViewData();
        })
        .catch((error) => {
            console.log(error.message);
        })

    }

    _updateViewData = () => {
        this.goalTopViewData = CaterPlannerDetailPlanTree.mapGoalTopViewData();
        this.goalBottomViewData = CaterPlannerDetailPlanTree.mapGoalBottomViewData();
    }

    @action 
    buildTree = (detailPlans) => {
        this._start();
        CaterPlannerDetailPlanTree.build(detailPlans)
        this._updateViewData();
    }


    @action 
    changeActiveShowKey = (showKey) => {
        this.activeShowKey = showKey;
    }

    @computed
    get entry(){
        return CaterPlannerDetailPlanTree.entry();
    }

    get currentbottomViewData() {
        return this.goalBottomViewData.length == 0 ? this.goalBottomViewData :  
        this.goalBottomViewData.brotherGroups[this.goalBottomViewData.path[this.activeShowKey]];
    }

    get currentTopViewData(){
        return this.goalTopViewData;
    }

    get currentActiveConstructorState(){
        let key = 0;
        let relationType = 0;

        if(this.activeShowKey != 0){
            const activeShowDetailPlan = CaterPlannerDetailPlanTree.get(this.activeShowKey);
            key = activeShowDetailPlan.constructorKey;
            relationType = activeShowDetailPlan.constructorRelationType;
        }

        return {
            key : key,
            relationType : relationType
        };
    }

    getDetailPlan = (key) => {
        return CaterPlannerDetailPlanTree.get(key);
    }

}