import State from '../State';

export default class Goal {

    constructor(id, purposeId, name, startDate, endDate, color, stat) {
        this.id = id;
        this.purposeId = purposeId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.color = color;
        this.stat = stat;
    }

    setPerforms = (performs) => {
        this.performs = performs;
    }
    
    get maxTime(){
        let maxTime = 0;

        this.performs.forEach((p) => {
            maxTime += p.maxTime;
        })

        return maxTime;
    }

   get currentPerfectTime() {
        let currentPerfectTime = 0;

        this.performs.forEach((p) => {
            currentPerfectTime += p.currentPerfectTime;
        })

        return currentPerfectTime;
    }

    get currentBriefingCount(){
        if(this.stat == State.SUCCEES)
            return this.maxTime;
        
        let currentBriefingCount = 0;

        this.performs.forEach((p) => {
            currentBriefingCount += p.currentBriefingCount;
        })

        return currentBriefingCount;
    }

    get achieve(){
        if(!this.performs)
            return null;

        return this.stat == State.SUCCEES ? 100 : Math.round((this.currentBriefingCount / this.maxTime) * 100);
    }

    get progress(){
        if(!this.performs)
            return null;

        return Math.round((this.currentPerfectTime / this.maxTime) * 100);
    }


}