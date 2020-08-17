import State from '../State';
import EasyDate from "../../util/EasyDate";


export function getBetweenMaxBriefing(startDate, endDate, cycleType, cycleParams){
    const diffDay = EasyDate.between(startDate, endDate).day;

    let maxTime = 0;

    switch (cycleType) {
        case "A":
            maxTime = diffDay;
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

    constructor(id, purposeId, name, description, startDate, endDate, color, cycle, stat) {
        this.id = id;
        this.purposeId = purposeId;
        this.name = name;
        this.description = description;
        this.startDate = startDate.constructor == EasyDate ? startDate : new EasyDate(startDate);
        this.endDate = endDate.constructor == EasyDate ? endDate : new EasyDate(endDate);
        this.color = color;
        this.cycle = cycle;
        this.stat = stat;
        
        this.briefings = [];
    }

    setBriefings = (briefings) => {
        this.briefings = briefings;
    }

    modify = (copy) => {
        this.name  = copy.name;
        this.startDate = copy.startDate;
        this.endDate = copy.endDate;
        this.color = copy.color;
        this.cycle = copy.cycle;
        this.stat = copy.stat;
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
        return stat == State.SUCCEES ? this.maxTime : this.briefings.length;
    }

    get achieve(){
        if(!this.briefings)
            return null;

        return this.stat == State.SUCCEES ? 100 : Math.round((this.currentBriefingCount / this.maxTime) * 100);
    }

    get progress(){
        if(!this.briefings)
            return null;


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

        if(!lastBriefingDay.equalsDate(today)){
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

    get lastBriefingDay(){
        return this.briefings[this.briefings.length - 1].createAt;
    }


}