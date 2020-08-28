package com.downfall.caterplanner.scheduler.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import com.downfall.caterplanner.scheduler.AlarmSchedulerManager;
import com.downfall.caterplanner.scheduler.service.BriefingAlarmService;

public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)){
             System.out.println("시작");
        System.out.println("==============================================");
        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");


        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

            AlarmSchedulerManager.start(context);

            Intent serviceIntent = new Intent(context, BriefingAlarmService.class);
            Bundle bundle = new Bundle();

            serviceIntent.putExtras(bundle);

            context.startService(serviceIntent);
    }
}
}
