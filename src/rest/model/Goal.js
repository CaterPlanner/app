import DateUtil from '../../util/DeteUtil'


export default class Goal {

    constructor(key, headerId, constructorKey, constructorRelationType, name, type, startDate, endDate, color, cycle, stat, briefingCount) {
        this.key = key;
        this.headerId = headerId;
        this.constructorKey = constructorKey;
        this.constructorRelationType = constructorRelationType;
        this.name = name;
        this.startDate = Date.parse(startDate);
        this.endDate = Date.parse(endDate);
        this.color = color;
        this.cycle = cycle;
        this.stat = stat;
        this.briefingCount = briefingCount;

        const cyclePiece = cycle.split(' ');
        const dateDiff = DateUtil.betweenDayCount(startDate, endDate);
  
        this.maxTime = 0;


        switch (cyclePiece[0]) {
            case "A":
                this.maxTime = dateDiff;
                break;
            case "W":
                if(dateDiff < 7){
                    for(let i = 1; i < cyclePiece.length; i++){ //요일 같은 경우엔 완벽한 cycle이므로 차로 간단히 구하기 가능
                        if(this.startDate.getDay() <= dateDiff[i] && this.endDate.getDay() >= dateDiff[i]){
                            this.maxTime++;
                        }
                    }
                }else{
                    this.maxTime = (dateDiff / 7) * (cyclePiece.length - 1);
                }
                break;
            case "O":
                break;
            case "M":
                break;
            case "C":
                this.maxTime = cyclePiece[1];
                break;
        }

    }

    get isNew(){
        return this.briefingCount == null;
    }

    get progress() {

    }

    get achieve() {

    }

}