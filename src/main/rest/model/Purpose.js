import EasyDate from "../../util/EasyDate";

export default class Purpose {

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