import {observable, action, computed} from 'mobx';
import CaterPlannerDetailPlanTree from '../../native/CaterPlannerDetailPlanTree'


export default class DetailPlanStore{

    @observable activeParentKey;
    @observable activeShowKey;

    @observable topViewData;
    @observable bottomViewData;

    _start(){
        this.activeParentKey = 0;
        this.activeShowKey = 0;

        this.bottomViewData = [];
        this.topViewData = [];
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
        this.topViewData = CaterPlannerDetailPlanTree.mapTopViewData(this.activeParentKey);
        this.bottomViewData = CaterPlannerDetailPlanTree.mapBottomViewData(this.activeParentKey);
    }

    @action 
    buildTree = (detailPlans) => {
        this._start();
        CaterPlannerDetailPlanTree.build(detailPlans)
        this._updateViewData();
    }

    @action 
    changeParentKey = (parentKey) => {
        this.activeParentKey = parentKey;
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
        return this.bottomViewData.length == 0 ? this.bottomViewData :  
        this.bottomViewData.brotherGroups[this.bottomViewData.path[this.activeShowKey]];
    }

    get currentTopViewData(){
        return this.topViewData;
    }

    get currentConstructorState(){
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