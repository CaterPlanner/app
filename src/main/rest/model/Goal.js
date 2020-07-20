import DateUtil from '../../util/DateUtil'


function findDayCountInTerm(startDate, endDate, piece, pieceStartIndex){
    let count = 0;

    for(let i = pieceStartIndex; i < piece.length; i++){
        if(startDate.getDay() < endDate.getDay()){
            if(piece[i] >= startDate.getDay() && piece[i] <= endDate.getDay())
                count++;
        }else{
            if(piece[i] >= startDate.getDay() || piece[i] <= endDate.getDay())
                count++;
        }
    }

    return count;
}

export default class Goal {


    constructor(key, headerId, constructorKey, constructorRelationType, name, type, startDate, endDate, color, cycle, stat, briefingCount) {
        this.key = key;
        this.headerId = headerId;
        this.constructorKey = constructorKey;
        this.constructorRelationType = constructorRelationType;
        this.name = name;
        this.type = type;
        this.startDate = Date.parse(startDate);
        this.endDate = Date.parse(endDate);
        this.color = color;
        this.cycle = cycle;
        this.stat = stat;
        this.briefingCount = briefingCount;

        const cyclePiece = cycle.split(' ');
        const diffDay = DateUtil.betweenDayCount(startDate, endDate);
        this.maxTime = 0;


        switch (cyclePiece[0]) {
            case "A":
                this.maxTime = diffDay;
                break;
            case "W":
                maxTime = diffDay < 7 ? 
                findDayCountInTerm(startDate, endDate, piece, 1) : 
                (
                    (Math.floor(diffDay / 7)) * (piece.length - 1) + findDayCountInTerm(new Date(endDate.getTime() - (diffDay % 7) * DateUtil.DAY_TIME) , endDate, piece, 1)
                );
                break;
            case "M":
                const diffMonth = DateUtil.betweenMonthCount(startDate, endDate);
                if(diffMonth == 0){
                    for(let i = 1; i < piece.length; i++){
                        if(piece[i] >= startDate.getDate() && piece[i] <= endDate.getDate())
                            this.maxTime++;
                    }
                }else{
                    if(diffMonth > 2)
                        this.maxTime = (piece.length - 1) * (diffMonth - 2);
                    for(let i = 1; i < piece.length; i++){ //startDate
                        if(piece[i] >= startDate.getDate()){
                            this.maxTime += piece.length - i + 1;
                            break;
                        }
                    }
                    for(let i = piece.length - 1; i > 0; i--){ //endDate
                        if(piece[i] <= endDate.getDate()){
                            this.maxTime += i;
                            break;
                        }
                    }
                    
                }
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