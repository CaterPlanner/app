class DetailPlan {

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


export class Goal extends DetailPlan {

    constructor(key, headerId, constructorKey, constructorRelationType, name, startDate, endDate, hopeAchievement, color, cycle, stat) {
        super(key, headerId, constructorKey, constructorRelationType, name, 'G', startDate, endDate, hopeAchievement, color, cycle, stat);

        this.isSpecific = false;
    }

    setPerforms = (performs) => {
        this.performs = performs;

        this.performsMaxTime = 0;

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


export class Perform extends DetailPlan {

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

    get currentPerfectTime() {
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

        const today = Date.now();
        let nextDay;

        if (this.isNowBriefing()) {
            nextDay = today;
        } else {
            switch (this.cycle.type) {
                case "A":
                    nextDay = new Date(today.getTime() + 1 * DateUtil.DAY_TIME);
                    break;
                case "W":
                    nextDay = new Date(
                        today.getTime() +
                        DateUtil.waitingDayCount(today, this.cycle.params[0]) * DateUtil.DAY_TIME
                    );
                    for (let i = 1; i < params.length; i++){
                        if(params[i] > today.getDay()){
                            nextDay = new Date(today.getTime() + DateUtil.waitingDayCount(today, this.cycle.params[i]) * DateUtil.DAY_TIME);
                            break;
                        }
                    }
                    break;
                case "M":
                    nextDay = new Date(
                        today.getTime() +
                        DateUtil.waitingDateCount(tody, this.cycle.params[0]) * DateUtil.DAY_TIME
                    );
                    for (let i = 1; i < params.length; i++){
                        if(params[i] > today.getDate()){
                            nextDay = new Date(today.getTime() + DateUtil.waitingDateCount(today, this.cycle.params[i]) * DateUtil.DAY_TIME);
                            break;
                        }
                    }
                    break;
            }
        }

        return nextDay;
    }

    get briefingCount() {
        if (!this.isSpecific)
            throw Error('Must add a briefing first.')
        return this.briefings.length;
    }

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

        switch (this.cycle.type) {
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

/**
 * 
 * @param {Date} startDate 시작날짜
 * @param {Date} endDate  종료날짜
 * @param {String} cycleType 주기타입
 * @param {Array} piece 주기 값들
 * 
 * startDate와 endDate 사이의 주기가 총 몇번 일어나는지 구하는 함수
 * 주기타입(매일, 월, 일)에 맞추어 사용함
 * 
 * 매일 - startDate와 endDate 사잇일이 바로 주기 갯수 (매일 일어나므로)
 * 주 - 주는 요일을 이용하여 계산하는데 요일은 완전한 주기이므로 startDate, endDate의 사잇 주 개수를 곱하고 나머지 일수는
 * 반복문으로 직접 돌아가며 셈
 * 월 - startDate 달에 브리핑 개수 + endDate 달에 브리핑 개수 + startDate, endDate 사이의 달 개수 * (달당 브리핑 개수)
 * 
 * 
 */
const getBetweenMaxBriefing = (startDate, endDate, cycleType, piece) => {

    const diffDay = DateUtil.betweenDateCount(startDate, endDate);
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