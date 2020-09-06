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
