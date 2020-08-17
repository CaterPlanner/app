import {observable, action, computed} from 'mobx';
import EasyDate from '../../util/EasyDate';


export default class DetailPlanWriteStore{

    @observable
    goals;

    entryStartDate;
    entryEndDate;


    @action
    init = (entryStartDate, entryEndDate, goals) => {
        this.entryStartDate = entryStartDate;
        this.entryEndDate = entryEndDate;

        this.goals = goals ? goals : [];
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

    }

    @action
    delete = (id) => {
        this.goals.splice(id, id);
        this.goals = this.goals.slice();
        this.goals.forEach((goal , index) => {
            goal.id = index;
        })
    }

    getGoal = (id) => {
        return this.goals[id];
    }

    //경고 메시지 주어야함... endDate가 entryEnddate와 일치하지 않는 문재
    _valid(){
        if(this.goals[0].id != 0)
            throw '시스템 오류';

        let minStartDate = this.entryEndDate;
        let maxEndDate = this.entryStartDate;

        for(let i = 1; i < this.goals.length; i++){
            if(!this.goals[i]){
                throw '시스템 오류';
            }else if(!(this.goals[i - 1].id < this.goals[i].id)){
                throw '시스템 오류';
            }else if(!this.goals[i].startDate || !this.goals[i].endDate || !this.goals[i].cycle){ //insertGoal에서 유효성 처리르 할것이기 때문에 따로 경고메시지를 주지 않음
                throw '시스템 오류';
            }

            if(this.goals[i].startDate.isAfter(minStartDate)){
                minStartDate = this.goals[i].startDate;
            }

            if(this.goals[i].endDate.isBefore(maxEndDate)){
                maxEndDate = this.goals[i].endDate;
            }
        }

        if(!minStartDate.equalsDate(this.entryStartDate))
            throw '최소 하나 이상의 목표 시작날짜는 목적의 시작날짜와 같아야 합니다.'
        if(!maxEndDate.equalsDate(this.entryEndDate))
            throw '최소 하나 이상의 목표 종료날짜는 목적의 종료날짜와 같아야 합니다.'
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

        console.log(data);

        return data;
    }
}