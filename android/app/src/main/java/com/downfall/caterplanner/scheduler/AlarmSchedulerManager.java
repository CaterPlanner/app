package com.downfall.caterplanner.scheduler;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import com.downfall.caterplanner.scheduler.receiver.BriefingAlarmReceiver;
import com.downfall.caterplanner.scheduler.service.BriefingAlarmService;

import java.util.Calendar;

public class AlarmSchedulerManager {

    private static final int BRIEFING_ALARM_CODE = 100;


    public static boolean isScheduling(Context context){
        Intent briefingAlaramIntent = new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class);
        PendingIntent sender = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, briefingAlaramIntent, PendingIntent.FLAG_NO_CREATE);
        return sender != null;
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

        System.out.println("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        System.out.println("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        System.out.println("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        System.out.println("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        System.out.println("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
        System.out.println("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");

    }

    public static void start(Context context){
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Intent briefingAlaramIntent = new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class);

        PendingIntent sender = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, briefingAlaramIntent, PendingIntent.FLAG_NO_CREATE);

        if(sender == null) {

            System.out.println("실행!!!!!!!!!!!!!!!!!!!!");
             sender = PendingIntent.getBroadcast(context, BRIEFING_ALARM_CODE, new Intent(context.getApplicationContext(), BriefingAlarmReceiver.class), PendingIntent.FLAG_CANCEL_CURRENT);

            Calendar statisticsTime = Calendar.getInstance();
            statisticsTime.set(Calendar.HOUR_OF_DAY, 0);
            statisticsTime.set(Calendar.MINUTE, 0);
            statisticsTime.set(Calendar.SECOND, 0);
            statisticsTime.set(Calendar.MILLISECOND, 0);


            alarmManager.setInexactRepeating(
                AlarmManager.RTC, statisticsTime.getTimeInMillis(), AlarmManager.INTERVAL_DAY,
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

}
