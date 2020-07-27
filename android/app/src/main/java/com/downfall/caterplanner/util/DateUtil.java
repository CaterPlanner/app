package com.downfall.caterplanner.util;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.text.ParseException;
import java.time.Duration;

public class DateUtil {

    private static DateTimeFormatter dateFormat = DateTimeFormat.forPattern("yyyy-MM-dd");
    private static DateTimeFormatter dateTimeFormat = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss");

    public static LocalDate parseToDate(String dateText) throws ParseException {
        return LocalDate.parse(dateText, dateFormat);
    }

    public static LocalDateTime parseToDateTime(String dateText) throws ParseException{
        return LocalDateTime.parse(dateText, dateTimeFormat);
    }

    public static String formatFromDate(LocalDate date){
        return dateFormat.print(date);
    }

    public static String formatFromDateTime(LocalDateTime date){
        return dateTimeFormat.print(date);
    }

    private static int currentMonthFinalDay(LocalDate date){
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
        return hopeDayOfWeek > now.getDayOfWeek() ? hopeDayOfWeek - now.getDayOfWeek() : (7 - now.getDayOfWeek()) + hopeDayOfWeek;
    }

    public static int waitingDayCountDay(LocalDate now, int hopeDay){
        return hopeDay > now.getDayOfMonth() ? hopeDay - now.getDayOfMonth() : (currentMonthFinalDay(now) - now.getDayOfMonth()) + hopeDay;
    }
}
