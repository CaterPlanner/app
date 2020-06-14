import {observable, action, computed} from 'mobx';
import CaterPlannerDetailPlanTree from '../../native/CaterPlannerDetailPlanTree'

export default class DetailPlanStore{

    @observable detailPlans;
    @observable activeParentKey;
    @observable activeShowKey;

    @observable topViewData;
    @observable bottomViewData;

    constructor(){
        this.start();
    }

    @action start(){
        CaterPlannerDetailPlanTree.create();
        this.activeParentKey = null;
        this.activeShowKey = null;
    }
    
    @action insertDetailPlan(parentKey, detailPlan){

        CaterPlannerDetailPlanTree.insert(parentKey, detailPlan)
        .then((key) => {
            this.detailPlans.key = key;
            this.detailPlans = [
                ...this.detailPlans,
                detailPlan
            ]
            this._updateViewDatas();
        }) 
        .error((msg) => {
           console.log(msg);
        })
    }

    @action modifyDetailPlan(key, copy){
        CaterPlannerDetailPlanTree.modify(key, copy)
        .error((msg) => {
            console.log(msg);
        })
    }

    @action deleteDetailPlan(key){

        CaterPlannerDetailPlanTree.delete(key)
        .then((data) => {
            this.detailPlans = data;
            this._updateViewDatas();
        })
        .error((msg) => {
            console.log(msg);
        })

    }

    _updateViewDatas(){
        CaterPlannerDetailPlanTree.mapTopViewData(this.activeParentKey)
        .then((data) => {
            this.topViewData = data;
        });
        CaterPlannerDetailPlanTree.mapBottomViewData(this.activeParentKey)
        .then((data) => {
            this.bottomViewData = data;
        })
    }

    @action buildTree(detailPlans){
        
        CaterPlannerDetailPlanTree.build(detailPlans)
        .then(() => {
            this.detailPlans = detailPlans;
            this._updateViewDatas();
        })
        .error((msg) => {
            console.log(msg);
        })

    }

    @action changeParentKey(parentKey){
        this.activeParentKey = parentKey;
    }

    @action changeActiveShowKey(showKey){
        this.activeShowKey = showKey;
    }

    get currentbottomViewData() {
        return this.currentbottomViewData.brotherGroups[this.currentTopViewData.path[this.activeShowKey]];
    }

    get currentTopViewData(){
        return this.topViewData;
    }

    getDetailPlan(key){
        return this.detailPlans.get(key);
    }

}