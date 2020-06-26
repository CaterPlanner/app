import {observable, action} from 'mobx';
import CaterPlannerDetailPlanTree from '../../native/CaterPlannerDetailPlanTree'
import {autobind} from 'core-decorators';

@autobind
export default class DetailPlanStore{

    @observable activeParentKey;
    @observable activeShowKey;

    @observable topViewData;
    @observable bottomViewData;

    _start(){
        this.activeParentKey = 0;
        this.activeShowKey = 0;
    }

    @autobind
    @action async create(){
        this._start();
        await CaterPlannerDetailPlanTree.create();
    }
    
    @action insertDetailPlan(parentKey, detailPlan){

        CaterPlannerDetailPlanTree.insert(parentKey, detailPlan)
        .then(() => {
            this._updateViewData();
        }) 
        .catch((error) => {
           console.log(error.message);
        })

    }

    @action modifyDetailPlan(key, copy){

        CaterPlannerDetailPlanTree.modify(key, copy)
        .catch((error) => {
            console.log(error.message);
        })

    }

    @action deleteDetailPlan(key){

        CaterPlannerDetailPlanTree.delete(key)
        .then(() => {
            this._updateViewData();
        })
        .catch((error) => {
            console.log(error.message);
        })

    }

    _updateViewData(){
        CaterPlannerDetailPlanTree.mapTopViewData(this.activeParentKey)
        .then((data) => {
            console.log(data);
            this.topViewData = data;
        });

        CaterPlannerDetailPlanTree.mapBottomViewData(this.activeParentKey)
        .then((data) => {
            console.log(data);
            this.bottomViewData = data;
        })
    }

    @action buildTree(detailPlans){

        this._start();

        CaterPlannerDetailPlanTree.build(detailPlans)
        .then(() => {
            this._updateViewData();
        })
        .catch((error) => {
            console.log(error.message);
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