import {observable, action, computed} from 'mobx';
import CaterPlannerDetailPlanTree from '../../native/CaterPlannerDetailPlanTree'
import {autobind} from 'core-decorators';

@autobind
export default class DetailPlanStore{

    @observable activeParentKey;
    @observable activeShowKey;

    @observable topViewData;
    @observable bottomViewData;

    _start(){
        this.activeParentKey = null;
        this.activeShowKey = null;
    }

    @action async create(){
        this._start();
        await CaterPlannerDetailPlanTree.create();
    }
    
    @action insertDetailPlan(parentKey, detailPlan){

        CaterPlannerDetailPlanTree.insert(parentKey, detailPlan)
        .then(() => {
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
        .then(() => {
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
        this._start();
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
        return this.bottomViewData.brotherGroups[this.bottomViewData.path[this.activeShowKey]];
    }

    get currentTopViewData(){
        return this.topViewData;
    }

    async getDetailPlan(key){
        return await CaterPlannerDetailPlanTree.get(key);
    }

}