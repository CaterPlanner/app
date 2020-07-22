import DateUtil from '../../util/DateUtil'



getBetweenMaxBriefing = (startDate, endDate, cycleType, piece) => {

    const diffDay = DateUtil.betweenDayCount(startDate, endDate);
    let maxTime = 0;

    switch (cycleType) {
        case "A":
            maxTime = diffDay;

            break;
        case "W":

            findDayCountInTerm = (startDate, endDate, piece) => {
                let count = 0;

                for (let i = 0; i < piece.length; i++) {
                    if (startDate.getDay() < endDate.getDay()) {
                        if (piece[i] >= startDate.getDay() && piece[i] <= endDate.getDay())
                            count++;
                    } else {
                        if (piece[i] >= startDate.getDay() || piece[i] <= endDate.getDay())
                            count++;
                    }
                }

                return count;
            }


            maxTime = diffDay < 7 ?
                findDayCountInTerm(startDate, endDate, piece) :
                (
                    (Math.floor(diffDay / 7)) * (piece.length) + findDayCountInTerm(new Date(endDate.getTime() - (diffDay % 7) * DateUtil.DAY_TIME), endDate, piece)
                );
            break;

        case "M":
            const diffMonth = DateUtil.betweenMonthCount(startDate, endDate);
            if (diffMonth == 0) {
                for (let i = 0; i < piece.length; i++) {
                    if (piece[i] >= startDate.getDate() && piece[i] <= endDate.getDate())
                        this.maxTime++;
                }
            } else {
                if (diffMonth > 2)
                    this.maxTime = (piece.length) * (diffMonth - 2); // startDate Month < middle Month < endDate Month => middle Month count
                for (let i = 0; i < piece.length; i++) { //startDate Month count
                    if (piece[i] >= startDate.getDate()) {
                        this.maxTime += piece.length + 1;
                        break;
                    }
                }
                for (let i = piece.length - 1; i >= 0; i--) { //endDate Month count
                    if (piece[i] <= endDate.getDate()) {
                        this.maxTime += i;
                        break;
                    }
                }

            }
    }

    return maxTime;

}


export default class DetailPlan {


    constructor(key, headerId, constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, cycle, stat, briefingCount) {

        this.key = key;
        this.headerId = headerId;
        this.constructorKey = constructorKey;
        this.constructorRelationType = constructorRelationType;
        this.name = name;
        this.type = type; //G - goal P - performGoal
        this.startDate = Date.parse(startDate);
        this.endDate = Date.parse(endDate);
        this.hopeAchievement = hopeAchievement;
        this.color = color;
        this.cycle = cycle;
        this.stat = stat;
        //schema Data

        this.isSpecific = true;

        if (briefingCount) {
            const cyclePiece = cycle.split(' ');
            const cycleType = cyclePiece[0];
            const cycleParam = cyclePiece.slice(1, cyclePiece.length);
    
            this.maxTime = getBetweenMaxBriefing(startDate, endDate, cycleType, cycleParam);
    
            this.briefingCount = briefingCount;
            this.currentPerfectTime = getBetweenMaxBriefing(startDate, new Date(), cycleType, cycleParam);            
            this.isSpecific = false;
        }


    }
    /**
     * 진행치
     * 시간에 따른 %
     */
    get progress() {
        return this.isSpecific ? Math.round(this.currentPerfectTime / this.maxTime).toFixed(2) : null;
    }
    /**
     * 수행치
     * 수행에 따른 %
     */
    get achieve() {
        return this.isSpecific ? Math.round(this.briefingCount / this.maxTime).toFixed(2) : null;
    }

}