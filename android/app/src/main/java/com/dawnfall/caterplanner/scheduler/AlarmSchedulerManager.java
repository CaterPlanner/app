package com.dawnfall.caterplanner.scheduler;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.telecom.Call;

import com.dawnfall.caterplanner.scheduler.receiver.BriefingAlarmReceiver;
import com.dawnfall.caterplanner.scheduler.service.BriefingAlarmService;

import java.util.Calendar;

public class AlarmSchedulerManager {

    private static final int BRIEFING_ALARM_CODE = 100;
    private static final String BRIEFING_ALARAM_CYCLE_KEY = "a";
    private static final int DEFAULT_BRIEFING_ALARM_CYCLE_HOUR_INTERVAL = 5;

    public static Config getConfig(Context context){
        return new Config(context);
    }

    public static boolean isScheduling(Context context){
        Intent briefingAlaramIntent = new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class);
        PendingIntent sender = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, briefingAlaramIntent, PendingIntent.FLAG_NO_CREATE);
        return sender != null;
    }

    public static void setAlarmCycle(Context context, int intevalHour){
       getConfig(context).setBriefingAlarmCycleHour(intevalHour);
    }

    public static void show(Context context){
        Intent serviceIntent = new Intent(context, BriefingAlarmService.class);
        Bundle bundle = new Bundle();

        serviceIntent.putExtras(bundle);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(serviceIntent);
        } else {
            context.startService(serviceIntent);
        }
    }

    public static void start(Context context){
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Intent briefingAlaramIntent = new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class);

        PendingIntent sender = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, briefingAlaramIntent, PendingIntent.FLAG_NO_CREATE);

        int intervalHour = getConfig(context).getBriefingAlarmCycleHour();

        if(sender == null) {

             sender = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class), PendingIntent.FLAG_CANCEL_CURRENT);

            Calendar statisticsTime = Calendar.getInstance();
            int currentHour = statisticsTime.get(Calendar.HOUR_OF_DAY);
            int nextHour = currentHour % 6 == 0 ? currentHour + 6 : currentHour + 6 - (currentHour % 6);

            statisticsTime.set(Calendar.HOUR_OF_DAY, nextHour);
            statisticsTime.set(Calendar.MINUTE, 0);
            statisticsTime.set(Calendar.SECOND, 0);
            statisticsTime.set(Calendar.MILLISECOND, 0);

            alarmManager.setInexactRepeating(
                AlarmManager.RTC_WAKEUP, statisticsTime.getTimeInMillis(), 1000 * 60 * 60 * 6,
                    sender);
        }


    }

    public static void stop(Context context){
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent briefingRequestNoticeIntent = new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class);
        PendingIntent sender = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, briefingRequestNoticeIntent, PendingIntent.FLAG_NO_CREATE);
        
        if(sender != null){
        alarmManager.cancel(sender);
        sender.cancel();
                    System.out.println("종료!!!!!!!!!!!!!!!!!!!!");
        }
    }

    private static class Config{

        private final String SHARED_PREFERENCES_NAME = "schedulerConfig";

        private final String BRIEFING_ALARAM_CYCLE_KEY = "a";

        private final int DEFAULT_BRIEFING_ALARM_CYCLE_HOUR_INTERVAL = 6;

        private SharedPreferences schedulerConfig;

        public Config(Context context) {
            schedulerConfig = context.getSharedPreferences(SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE);
        }

        public int getBriefingAlarmCycleHour(){
            return schedulerConfig.getInt(BRIEFING_ALARAM_CYCLE_KEY, DEFAULT_BRIEFING_ALARM_CYCLE_HOUR_INTERVAL);
        }

        public void setBriefingAlarmCycleHour(int hour){
            schedulerConfig.edit().putInt(BRIEFING_ALARAM_CYCLE_KEY, hour);
        }
    }

}
