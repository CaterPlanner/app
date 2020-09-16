export default class EasyDate extends Date{

    static YEAR_TIME = (1000 * 3600 * 24 * 365);
    static MONTH_TIME = (1000 * 3600 * 24 * 7 * 4);
    static WEEK_TIME = (1000 * 3600 * 24 * 7)
    static DAY_TIME =  (1000 * 3600 * 24);
    static HOUR_TIME = (1000 * 3600);
    static MiNUTE_TIME = (1000 * 60);

    static now = () =>{
        return new EasyDate(Date.now());
    }

    static between = (date1, date2) => {
        date1 = EasyDate.trim(date1);
        date2 = EasyDate.trim(date2);

        return {
            day: Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / EasyDate.DAY_TIME))
        }
    }

    static trim = (date) => {
        return new EasyDate(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static waitingDayOfWeekCount (date, hopeDayOfWeek){
        return hopeDayOfWeek > date.getDay() ? hopeDayOfWeek - date.getDay() : (7 - this.now.getDay()) + hopeDayOfWeek;
    }

    isAfter = (date) => {
        const a = EasyDate.trim(this);
        const b = EasyDate.trim(date);
        return a.getTime() < b.getTime();
    }

    isBefore = (date) => {
        const a = EasyDate.trim(this);
        const b = EasyDate.trim(date);
        return a.getTime() > b.getTime();
    }

    minusDays = (days) => {
        return new EasyDate(this.getTime() - (days * EasyDate.DAY_TIME));
    }

    plusDays = (days) => {
        return new EasyDate(this.getTime() + (days * EasyDate.DAY_TIME));
    }

    equalsDate = (days) => {
        return this.getFullYear() == days.getFullYear() && this.getMonth() == days.getMonth() && this.getDate() == days.getDate();
    }

    toString = () => {
        let text = this.getFullYear() + "-"
        text += (this.getMonth() + 1 < 10 ? '0' : '') + (this.getMonth() + 1) + "-";
        text += (this.getDate() < 10 ? '0' : '') + this.getDate();
        return text;
    }

    toStringFormat = (seperator) => {
        let text = this.getFullYear() + seperator
        text += (this.getMonth() + 1 < 10 ? '0' : '') + (this.getMonth() + 1) + seperator;
        text += (this.getDate() < 10 ? '0' : '') + this.getDate();
        return text;
    }

    toStringDateByView = () => {
        let text = this.getFullYear() + "년 "
        text += (this.getMonth() + 1 < 10 ? '0' : '') + (this.getMonth() + 1) + "월 ";
        text += (this.getDate() < 10 ? '0' : '') + this.getDate() + "일"
        return text;
    }

}