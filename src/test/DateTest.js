let DateUtil = {
    DAY_TIME : (1000 * 3600 * 24),
    betweenDayCount : (date1, date2) => {
        return Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / DateUtil.DAY_TIME))
    },
    betweenWeekCount : (date1, date2) => {
        
    }
}

function findDayCountInTerm(startd, end, piece, start){
    let count = 0;

    for(let i = start; i < piece.length; i++){
        if(startd.getDay() < end.getDay()){
            if(piece[i] >= startd.getDay() && piece[i] <= end.getDay())
                count++;
        }else{
            if(piece[i] >= startd.getDay() || piece[i] <= end.getDay())
                count++;
        }
    }

    return count;
}

function a(type, startDate, endDate, piece){
	
        const diffDay = DateUtil.betweenDayCount(startDate, endDate);
        maxTime = 0;

        switch (type) {
            case "A":
                maxTime = diffDay;
                break;
            case "W":
                maxTime = diffDay < 7 ? 
                findDayCountInTerm(startDate, endDate, piece, 1) : 
                (
                    (Math.floor(diffDay / 7)) * (piece.length) + findDayCountInTerm(new Date(endDate.getTime() - (diffDay % 7) * DateUtil.DAY_TIME) , endDate, piece, 0)
                );
                break;
            case "M":
                
                break;
        }
	
	return maxTime;

} 

console.log(a("W", new Date("2020-07-19"), new Date("2020-07-27"), [0,1]));