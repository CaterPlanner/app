export default class Goal {

    constructor(id, purposeId, name, startDate, endDate, color, stat) {
    }

    setPerforms = (performs) => {
        this.performs = performs;
    }
    
    get maxTime(){
        let maxTime = 0;
        for(p in this.performs){
            maxTime += p.getMaxTime();
        }
        return maxTime;
    }

   get currentPerfectTime() {
        let currentPerfectTime = 0;
        for(p in this.performs){
            currentPerfectTime += p.currentPerfectTime();
        }
        return currentPerfectTime;
    }

    get briefingCount(){
        if(this.achieve == 100)
            return this.maxTime;
        
        let currentBriefingCount = 0;
        for(p in this.performs){
            currentBriefingCount += p.currentBriefingCount();
        }
        return currentBriefingCount;
    }

    get achieve(){
        return this.stat == S
    }

    get performsBreifingCount() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.');

        let value = 0;

        this.performs.forEach((perform) => {
            value += perform.briefingCount;
        });

        return value;
    }

    get progress() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.');

        return Math.round(this.performsCurrentPerfectTime / this.performsMaxTime).toFixed(2);
    }

    get achieve() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.');

        return Math.round(this.performsBreifingCount / this.maxTimperformsMaxTimee).toFixed(2);
    }
}