package com.downfall.caterplanner.util;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    private static int monthForFinalDay(LocalDate date){
        switch (date.getDayOfMonth()){
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
        throw new RuntimeException();
    }

    public static int waitingDayOfWeekCountDay (LocalDate now, int hopeDayOfWeek){
        return hopeDayOfWeek > now.getDayOfWeek().getValue() ? hopeDayOfWeek - now.getDayOfWeek().getValue() : (7 - now.getDayOfWeek().getValue()) + hopeDayOfWeek;
    }

    public static int waitingDayCountDay(LocalDate now, int hopeDay){
        return hopeDay > now.getDayOfMonth() ? hopeDay - now.getDayOfMonth() : (monthForFinalDay(now) - now.getDayOfMonth()) + hopeDay;
    }
}
