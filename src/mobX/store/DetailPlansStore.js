import {observable, action} from 'mobx';
import CaterPlannerTree from 'react-native-caterplanner-detailplantree'

export default class DetailPlanStore{

    @observable detailPlans;

    constructor(){
        this.reset();
    }

    @action reset(){
        this.detailPlans = new Map()
        CaterPlannerTree.create()
    }

    @action insertDetailPlan(parentKey, detailPlan){
        CaterPlannerTree.insert(
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
        CaterPlannerTree.delete(
            key,
            (msg) => {console.log(msg)}
        )
    }

    @action getDetailPlan(key){
        return this.detailPlans.get(key)
    }

    @action build(detailPlans){
        CaterPlannerTree.build(
            detailPlans,
            (msg) => {console.log(msg)}
        )        
    }    
}