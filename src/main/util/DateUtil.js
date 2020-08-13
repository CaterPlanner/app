


const DateUtil =
{
    DAY_TIME: (1000 * 3600 * 24),
    monthForFinalDay: (date) => {
      switch(date.getMonth()){
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            return 31;
          case 4:
          case 6:
          case 9:
          case 11:
            return 30;
          case 2:
             return date.getYear() % 4 == 0 && date.getYear() % 100 != 0 || date.getYear() % 400 == 0 ? 29 : 28;
      }         
    },
    between : (date1, date2) => {
        return {
            day: Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / DateUtil.DAY_TIME))
        }
    },
    betweenMonthCount: (date1, date2) => {
        const a = date1 > date2 ? date1 : date2;
        const b = date1 < date2 ? date1 : date2;

        return (b.getYear() - a.getYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
    },
    waitingDayCount: (now, hope) => {

        if (hope.constructor == Date) {
            hope = hope.getDay();
        } else if (hope < 0 || hope > 7) {
            throw 'Invaild Day value';
        }

        return hope > now.getDay() ? hope - now.getDay() :
            (7 - now.getDay()) + hope;

    },
    waitingDateCount: (now, hope) => {

        if (hope.constructor == Date) {
            hope = hope.getDate();
        } else if (hope < 0 || hope > 28) {
            throw 'Invalid Date value';
        }

        return hope.getDate() > now.getDate() ? hope - now.getDate() :
            (DateUtil.monthForFinalDay(now) - now.getDate()) + hope;

    }
}

export default DateUtil;