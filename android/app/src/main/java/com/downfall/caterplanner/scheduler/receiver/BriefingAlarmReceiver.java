package com.downfall.caterplanner.scheduler.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import com.downfall.caterplanner.scheduler.service.BriefingAlarmService;

public class BriefingAlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {

        Intent serviceIntent = new Intent(context, BriefingAlarmService.class);
        Bundle bundle = new Bundle();

        serviceIntent.putExtras(bundle);

        context.startService(serviceIntent);
    }
}
