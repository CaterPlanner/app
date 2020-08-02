package com.downfall.caterplanner.scheduler;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import com.downfall.caterplanner.scheduler.receiver.BriefingRequestNoticeReceiver;
import com.downfall.caterplanner.scheduler.receiver.StatisticsReceiver;

import java.util.Calendar;

//boot에도 실행 시킬수 있어야함
public class SchedulerManager {

    private static final int BRIEFING_REQUEST_NOTICE_CODE = 100;
    private static final int STATISTICS_CODE = 101;

    public static Config getConfig(Context context){
        return new Config(context);
    }


    public static void start(Context context){
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Config config = getConfig(context);

        Intent briefingRequestNoticeIntent = new Intent(context.getApplicationContext(), BriefingRequestNoticeReceiver.class);
        Intent statisticsIntent = new Intent(context.getApplicationContext(), StatisticsReceiver.class);

        PendingIntent briefingRequestNoticePendingIntent = PendingIntent.getBroadcast(context, BRIEFING_REQUEST_NOTICE_CODE, briefingRequestNoticeIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        PendingIntent statisticsPendingIntent = PendingIntent.getBroadcast(context, STATISTICS_CODE, statisticsIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        alarmManager.cancel(briefingRequestNoticePendingIntent);
        alarmManager.cancel(statisticsPendingIntent);

        Calendar briefingRequestNoticeTime = Calendar.getInstance();
        briefingRequestNoticeTime.setTimeInMillis(System.currentTimeMillis());
        briefingRequestNoticeTime.set(Calendar.HOUR_OF_DAY, config.getBriefingRequestNoticeTime());

        Calendar statisticsTime = Calendar.getInstance();
        statisticsTime.setTimeInMillis(System.currentTimeMillis());
        statisticsTime.set(Calendar.HOUR_OF_DAY, 0);

        alarmManager.setInexactRepeating
                (AlarmManager.RTC_WAKEUP,  briefingRequestNoticeTime.getTimeInMillis(), AlarmManager.INTERVAL_DAY,
                        briefingRequestNoticePendingIntent);
        alarmManager.setInexactRepeating(
                AlarmManager.RTC_WAKEUP, statisticsTime.getTimeInMillis(), AlarmManager.INTERVAL_DAY,
                statisticsPendingIntent);

    }

    public static void stop(Context context){
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent briefingRequestNoticeIntent = new Intent(context.getApplicationContext(), BriefingRequestNoticeReceiver.class);
        PendingIntent briefingRequestNoticePendingIntent = PendingIntent.getBroadcast(context, BRIEFING_REQUEST_NOTICE_CODE, briefingRequestNoticeIntent, PendingIntent.FLAG_UPDATE_CURRENT);
        alarmManager.cancel(briefingRequestNoticePendingIntent);
    }

    public static class Config{

        private final String SHARED_PREFERENCES_NAME = "schedulerConfig";

        private final String BRIEFING_REQUEST_NOTICE_TIME_KEY = "a";

        private final int DEFAULT_BRIEFING_REQUEST_NOTICE_HOUR_OF_DAY = 12;

        private SharedPreferences schedulerConfig;

        public Config(Context context) {
            schedulerConfig = context.getSharedPreferences(SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE);
        }

        public int getBriefingRequestNoticeTime(){
            return schedulerConfig.getInt(BRIEFING_REQUEST_NOTICE_TIME_KEY, DEFAULT_BRIEFING_REQUEST_NOTICE_HOUR_OF_DAY);
        }

        public void setBriefingRequestNoticeTIme(int hourOfDay){
            schedulerConfig.edit().putInt(BRIEFING_REQUEST_NOTICE_TIME_KEY, hourOfDay);
        }
    }

}
