package com.downfall.caterplanner.scheduler.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import com.downfall.caterplanner.scheduler.AlarmSchedulerManager;
import com.downfall.caterplanner.scheduler.service.BriefingAlarmService;

public class BriefingAlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        AlarmSchedulerManager.show(context);
    }
}
