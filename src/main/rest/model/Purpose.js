import EasyDate from "../../util/EasyDate";
import Goal from "./Goal";
import { State } from "../../AppEnum";

export default class Purpose {

    static clone = (purpose) => {
        const detailPlans = purpose.detailPlans.map((goal) => {
            return Goal.clone(goal);
        })

        purpose = new Purpose(purpose.id, purpose.name, purpose.description, purpose.photoUrl, purpose.disclosureScope, purpose.startDate, purpose.endDate, purpose.stat);
        purpose.setDetailPlans(detailPlans);
        return purpose;
    }

    constructor(id, name, description, photoUrl, disclosureScope, startDate, endDate, stat){
        this.id = id;
        this.name = name;
        this.description = description;
        this.photoUrl = photoUrl;
        this.disclosureScope = disclosureScope;
        this.startDate = new EasyDate(startDate);
        this.endDate = new EasyDate(endDate);
        this.stat = stat; 

        this.detailPlans = [];
    }

    setDetailPlans = (detailPlans) => {
        this.detailPlans = detailPlans;
    }

    get isFinish(){
        return this.stat == State.SUCCEES || this.stat == State.FAIL || this.isProcceedEnd
    }

    get isProcceedEnd(){
        return this.stat == State.PROCEED && (this.achieve == 100 || this.endDate.isAfter(EasyDate.now()));
    }

    get isSucceeseProceed(){
        return this.isProcceedEnd && this.achieve >= 80
    }

    get isFailProceed(){
        return this.isProcceedEnd && this.achieve < 80
    }

    get leftDay(){
        return EasyDate.between(EasyDate.now(), this.endDate).day;
    }

    get progress() {
        let entryMaxTime = 0;
        let entryCurrentPerfectTime = 0;

        this.detailPlans.forEach((goal) =>{
            entryMaxTime += goal.maxTime;
            entryCurrentPerfectTime += goal.currentPerfectTime;
        })

        return Math.round((entryCurrentPerfectTime / entryMaxTime) * 100);
    }

    get achieve() {
        let entryMaxTime = 0;
        let entryCrrentBriefingCount = 0;

        this.detailPlans.forEach((goal) =>{
            entryMaxTime += goal.maxTime;
            entryCrrentBriefingCount += goal.currentBriefingCount;
        })

        return Math.round((entryCrrentBriefingCount / entryMaxTime) * 100);
    }


}