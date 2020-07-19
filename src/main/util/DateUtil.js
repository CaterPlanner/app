


const DateUtil = 
{
    DAY_TIME : (1000 * 3600 * 24),
    betweenDayCount : (date1, date2) => {
        return Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / DateUtil.DAY_TIME))
    },
    betweenMonthCount : (date1, date2) => {
        const a = date1 > date2 ? date1 : date2;
        const b = date1 < date2 ? date1 : date2;

        return (b.getYear() - a.getYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
    }
}

export default DateUtil;