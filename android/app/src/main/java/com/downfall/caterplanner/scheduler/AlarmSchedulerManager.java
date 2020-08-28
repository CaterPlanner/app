package com.downfall.caterplanner.scheduler;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.downfall.caterplanner.scheduler.receiver.BriefingAlarmReceiver;

import java.util.Calendar;

public class AlarmSchedulerManager {

    private static final int BRIEFING_ALARM_CODE = 100;


    public static void start(Context context){
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Intent briefingAlaramIntent = new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class);

        PendingIntent statisticsPendingIntent = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, briefingAlaramIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        alarmManager.cancel(statisticsPendingIntent);


        Calendar statisticsTime = Calendar.getInstance();
//        statisticsTime.setTimeInMillis(System.currentTimeMillis());
//        statisticsTime.set(Calendar.HOUR_OF_DAY, 0);


//        alarmManager.setInexactRepeating(
//                AlarmManager.RTC_WAKEUP, statisticsTime.getTimeInMillis(), AlarmManager.INTERVAL_DAY,
//                statisticsPendingIntent);

                alarmManager.setInexactRepeating(
                AlarmManager.RTC_WAKEUP, statisticsTime.getTimeInMillis(), 1000 * 10,
                statisticsPendingIntent);

    }

    public static void stop(Context context){
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent briefingRequestNoticeIntent = new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class);
        PendingIntent briefingRequestNoticePendingIntent = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, briefingRequestNoticeIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        alarmManager.cancel(briefingRequestNoticePendingIntent);
    }

}
