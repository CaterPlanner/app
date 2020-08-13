export default class EasyDate extends Date{

    static DAY_TIME =  (1000 * 3600 * 24);

    static now = () =>{
        return new EasyDate(Date.now());
    }

    static between = (date1, date2) => {
        return {
            day: Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / EasyDate.DAY_TIME))
        }
    }

    static waitingDayOfWeekCount (date, hopeDayOfWeek){
        return hopeDayOfWeek > date.getDay() ? hopeDayOfWeek - date.getDay() : (7 - this.now.getDay()) + hopeDayOfWeek;
    }

    isAfter = (date) => {
        return this.getDate() < date.getDate();
    }

    isBefore = (date) => {
        return this.getDate() > date.getDate();
    }

    minusDays = (days) => {
        return new EasyDate(this.getTime() - (days * EasyDate.DAY_TIME));
    }

    plusDays = (days) => {
        return new EasyDate(this.getTime() + (days * EasyDate.DAY_TIME));
    }

    equalsDate = (days) => {
        this.getFullYear() === days.getFullYear() && this.getMonth() === days.getMonth() && this.getDate() === days.getDate();
    }

    trim = (date) => {
        this.date.setHour
    }

}