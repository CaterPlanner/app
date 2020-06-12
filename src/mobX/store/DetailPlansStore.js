import {observable, action} from 'mobx';
import CaterPlannerDetailPlanTree from '../../util/CaterPlannerDetailPlanTree'

export default class DetailPlanStore{

    @observable detailPlans;

    constructor(){
        this.reset();
    }

    @action reset(){
        this.detailPlans = new Map()
        CaterPlannerDetailPlanTree.create()
    }

    @action insertDetailPlan(parentKey, detailPlan){
        CaterPlannerDetailPlanTree.insert(
            parentKey,
            {
                key: null,
                type: detailPlan.type,
                isClear: false
            },
            (key) => {
                detailPlan.key = key
                this.detailPlans.set(key, detailPlan);
            },
            (msg) => {console.log(msg)}
        )
    }

    @action removeDetailPlan(key){
        CaterPlannerDetailPlanTree.delete(
            key,
            (msg) => {console.log(msg)}
        )
    }

    @action getDetailPlan(key){
        return this.detailPlans.get(key)
    }

    @action getChildren(key){
        return null;
    }

    @action build(detailPlans){
        CaterPlannerTree.build(
            detailPlans,
            (msg) => {console.log(msg)}
        )        
    }    
}