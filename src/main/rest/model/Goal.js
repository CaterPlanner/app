import EasyDate from "../../util/EasyDate";


export function getBetweenMaxBriefing(startDate, endDate, cycleType, cycleParams){
    const diffDay = EasyDate.between(startDate, endDate).day;

    let maxTime = 0;

    switch (cycleType) {
        case "A":
            maxTime = diffDay + 1;
            break;
        case "W":
            const getDayBriefingCountInTerm = (startDate, endDate, piece) => {
                let count = 0;

                if(startDate.getDay() < endDate.getDay()){
                    for(let i = 0; i < piece.length; i++){
                        if(piece[i] >= startDate.getDay() && piece[i] <= endDate.getDay())
                            count++;
                    }
                }else{
                    for(let i = 0; i < piece.length; i++){
                        if(piece[i] >= startDate.getDay() || piece[i] <= endDate.getDay())
                            count++;
                    }
                }

                return count;
            }
            
            maxTime = diffDay < 7 ? getDayBriefingCountInTerm(startDate, endDate, cycleParams) :
                (Math.floor(diffDay / 7) * cycleParams.length) + getDayBriefingCountInTerm(endDate.minusDays((diffDay % 7)) , endDate, cycleParams);

            break;
    }

    return maxTime;
}

export default class Goal {

    static clone = (goal) => {
        return new Goal(goal.id, goal.purposeId, goal.name, goal.description, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate);
    }

    constructor(id, purposeId, name, description, startDate, endDate, color, cycle, briefingCount, lastBriefingDate) {
        this.id = id;
        this.purposeId = purposeId;
        this.name = name;
        this.description = description;
        this.startDate = startDate  ? (startDate.constructor == EasyDate ? startDate : new EasyDate(startDate)) : null;
        this.endDate = endDate  ? (endDate.constructor == EasyDate ? endDate : new EasyDate(endDate)) : null;
        this.color = color;
        this.cycle = cycle;
        this.briefingCount = briefingCount;
        this.lastBriefingDate = lastBriefingDate != null ? (lastBriefingDate.constructor == EasyDate ? lastBriefingDate : new EasyDate(lastBriefingDate)) : null;
        // this.stat = stat;
        
    }

    modify = (copy) => {
        this.name  = copy.name;
        this.startDate = copy.startDate;
        this.endDate = copy.endDate;
        this.color = copy.color;
        this.cycle = copy.cycle;
    } 

    get cycleType(){
        return this.cycle[0];
    }

    get cycleParams(){
        const cylcPiece = this.cycle.split(' ');
        return cylcPiece.slice(1, cylcPiece.length);
    }
    
    get maxTime(){
        return getBetweenMaxBriefing(this.startDate, this.endDate, this.cycleType, this.cycleParams);
    }

    get currentPerfectTime(){
        return getBetweenMaxBriefing(EasyDate.now(), this.endDate, this.cycleType, this.cycleParams);
    }

    get currentBriefingCount(){
        return this.briefingCount;
    }

    get achieve(){
        return Math.round((this.currentBriefingCount / this.maxTime) * 100);
    }

    get progress(){
        return Math.round((this.currentPerfectTime / this.maxTime) * 100);
    }

    get isActive(){
        let today = EasyDate.now();
        return today.isAfter(this.startDate) && today.isBefore(this.endDate);
    }

    get nextLeftDayCount(){
        return EasyDate.between(Date.now(), this.nextLeftDay).day;
    }

    get nextLeftDay(){
        let today = EasyDate.now();
        let nextDay = null;

        if(this.isNowBriefing){
            nextDay = today;
        }else{
            switch(this.cycleType){
                case 'A':
                    nextDay = new Date(today.getDate() + 1);
                    break;
                case 'W':
                    const cycleParams = this.cycleParams;
                    nextDay = today.plusDays(EasyDate.waitingDayOfWeekCount(today, cycleParams[0]));
                    for(let i = 1; i < cycleParams.length; i++){
                        if(cycleParams[i] > today.getDay()) {
                            nextDay = today.plusDays(EasyDate.waitingDayOfWeekCount(today, cycleParams[i]));
                            break;
                        }
                    }
                    break;
            }
        }

        return nextDay;
    }

    get isNowBriefing(){
        let today = EasyDate.now();
        let cycleParams = this.cycleParams;

        if(!this.lastBriefingDate || !this.lastBriefingDate.equalsDate(today)){
            switch(this.cycleType){
                case 'A':
                    return true;
                case 'W':
                    for(param in cycleParams){
                        if(param == today.getDay()){
                            return true;
                        }
                    }
                    return false;
            }
        }else{
            return false;
        }
    }



}