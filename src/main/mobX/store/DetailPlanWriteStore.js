import {observable, action, computed} from 'mobx';
import EasyDate from '../../util/EasyDate';
import { PurposeWriteType } from '../../AppEnum';


export default class DetailPlanWriteStore{

    @observable
    goals;

    entryStartDate;
    entryEndDate;

    LIMIT = 10;

    @action
    init = (purpose) => {

        this.entryStartDate = purpose.startDate;
        this.entryEndDate = purpose.endDate;
        this.goals = purpose.detailPlans;
        this.isCanSave = false;
    }

    @action
    update = (goal) => {
        if(goal.id == null){
            goal.id = this.goals.length;
            this.goals.push(goal);
        }else{
            this.goals[goal.id].modify(goal);
        }

        this.goals = this.goals.slice();
        
        if(goal.endDate.isBefore(this.entryEndDate)){
            this.entryEndDate = goal.endDate;
        }

    }

    @action
    delete = (id) => {
        this.goals.splice(id, 1);
        this.goals.forEach((goal , index) => {
            goal.id = index;
        })
        console.log(this.goals);
        this.goals = this.goals.slice();
    }

    getGoal = (id) => {
        return this.goals[id];
    }

    get isCanSave() {
        return this.goals.length != 0;
    }

    get isFilled(){
        return this.goals.length == this.LIMIT;
    }

    get graphData(){
        const entryDiff = EasyDate.between(this.entryStartDate, this.entryEndDate).day;


        let data = [];

        this.goals.forEach((goal) => {


            const leftMarginRatio = Math.round(EasyDate.between(this.entryStartDate, goal.startDate).day / entryDiff * 1000) / 1000.0;
            const iconWidthRatio = Math.round(EasyDate.between(goal.startDate, goal.endDate).day / entryDiff * 1000) / 1000.0;
            
            data.push({
                id : goal.id,
                color : goal.color,
                leftMarginRatio : leftMarginRatio,
                iconWidthRatio : iconWidthRatio,
                name : goal.name
            });
        })

        return data;
    }
}