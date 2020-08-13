export default class DetailPlans {
 
    constructor(entryData){
        this.entryData = entryData;
    }

    static valueOf = (purposeId, goals, performs, briefings) => {
        for(perform in performs){
            perform.purposeId = purposeId;
            let goal = goals[performs.goalId];
            goal.performs.push(goal);
        }

        if(briefings){
            for(briefing in briefings){
                briefing.purposeId = purposeId;
                performs[briefing.performId].briefings.push(briefing);
            }
        }

        for(goal in goalse){
            goal.purposeId = purposeId;
        }

        return new DetailPlans(goals);
    }

    get achieve(){
        if(!this.entryData)
            return null;
        
        return Math.round((this.currentBriefingCount / this.maxTime) * 100);
    }

    get progress(){
        if(!this.entryData)
            return null;

        return Math.round((this.currentPerfectTime / this.maxTime) * 100);
    }

    get maxTime() {
        let maxTime = 0;

        this.entryData.forEach((g) => {
            maxTime += g.maxTime();
        })

        return maxTime;
    }

    get currentPerfectTime() {
        let currentPerfectTime = 0;

        this.entryData.forEach((g) => {
            currentPerfectTime += g.currentPerfectTime;
        })

        return currentPerfectTime;
    }

    get currentBriefingCount() {
        let currentBriefingCount = 0;

        this.entryData.forEach((g) => {
            currentBriefingCount += g.currentBriefingCount;
        })

    
        return currentBriefingCount;
    }
}