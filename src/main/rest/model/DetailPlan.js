import DateUtil from '../../util/DateUtil'

//P와 G 구분 필요
export class DetailPlan {

    //다음 브리핑까진 남은 데이 필요
    constructor(key, headerId, constructorKey, constructorRelationType, name, type, startDate, endDate, hopeAchievement, color, cycle, stat) {

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


    }

    /**
    * 진행치
    * 시간에 따른 %
    */
    get progress() {
        throw new Error('must be overriding');
    }
    /**
     * 수행치
     * 수행에 따른 %
     */
    get achieve() {
        throw new Error('must be overriding');
    }

}


export class Goal extends DetailPlan{

    constructor(key, headerId, constructorKey, constructorRelationType, name, startDate, endDate, hopeAchievement, color, cycle, stat) {
        super(key, headerId, constructorKey, constructorRelationType, name, 'G', startDate, endDate, hopeAchievement, color, cycle, stat);
        
        this.isSpecific = false;
    }

    setPerforms = (performs) => {
        this.performs = performs;

        this.performsMaxTime=0;

        this.performs.forEach((perform) => {
            this.performsMaxTime += perform.maxTime;
        })

        this.isSpecific = true;
    }

    get performsCurrentPerfectTime() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.');

        let value = 0;

        this.performs.forEach((perform) => {
            value += perform.currentPerfectTime;
        });
        return value;
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


//P와 G 구분 필요
export class Perform extends DetailPlan {

    //다음 브리핑까진 남은 데이 필요
    constructor(key, headerId, constructorKey, constructorRelationType, name, startDate, endDate, hopeAchievement, color, cycle, stat) {
        super(key, headerId, constructorKey, constructorRelationType, name, 'P', startDate, endDate, hopeAchievement, color, cycle, stat);

        const cyclePiece = this.cycle.split(' ');

        this.cycle = {
            type: cyclePiece[0],
            params: cyclePiece.slice(1, cyclePiece.length)
        }

        this.maxTime = maxTime = getBetweenMaxBriefing(startDate, endDate, this.cycle.type, this.cycle.params);

        this.isSpecific = false;
    }

    get currentPerfectTime(){
        return getBetweenMaxBriefing(startDate, new Date(), this.cycle.type, this.cycle.params);
    }

    get progress() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.');

        return Math.round(this.currentPerfectTime / this.maxTime).toFixed(2);
    }

    get achieve() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.');

        return Math.round(this.briefingCount / this.maxTime).toFixed(2);
    }

    get lastBriefingDay() {
        return this.briefings[this.briefingCount - 1].createAt;
    }


    get nextLeftDay() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.');
            
        switch(this.cycle.type){
            case "A":
                
                break;
            case "W":
                break;
            case "M":

                break;
        }


        return
    }

    get briefingCount() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.')
        return this.briefings.length;
    }

    //최근의 날짜도 구할것
    setBriefings = (briefings) => {
        this.briefings = briefings;
        this.isSpecific = true;
    }

    addBriefing = (briefings) => {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.')
        this.briefings.push(briefings);
    }

    isNowBriefing = () => {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.')

        const today = Date.now();
        switch(this.cycle.type){
            case "A":
                return this.lastBriefingDay != today ? true : false;
            case "W":
                for (const param in this.cycle.params) {
                    if (param == today.getDay()) {
                        return true;
                    }
                }
                return false;
            case "M":
                for (const param in this.cycle.params) {
                    if (param == today.getDate()) {
                        return true;
                    }
                }
                return false;
        }
    }


}

const getBetweenMaxBriefing = (startDate, endDate, cycleType, piece) => {

    const diffDay = DateUtil.betweenDayCount(startDate, endDate);
    let maxTime = 0;

    switch (cycleType) {
        case "A":
            maxTime = diffDay;

            break;
        case "W":

            const findDayCountInTerm = (startDate, endDate, piece) => {
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
