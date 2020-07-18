const TIME_DAY = (1000 * 3600 * 24);


const DateUtil = 
{
    betweenDayCount : (date1, date2) => {
        return Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / TIME_DAY))
    },
    betweenWeekCount : (date1, date2) => {
        
    }
}

export default DateUtil;