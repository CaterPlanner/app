package com.dawnfall.caterplanner.scheduler.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.dawnfall.caterplanner.R;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import lombok.val;

public class BriefingAlarmService extends HeadlessJsTaskService {

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        final String CHANNEL_ID = "com.dawnfall.caterplanner";
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID, "dummy service channel",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            manager.createNotificationChannel(channel);
        }
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID).setPriority(NotificationCompat.PRIORITY_MIN).build();

        startForeground(10, notification);
        stopForeground(true);
        stopSelf();
        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "CallBriefingAlarmer",
                Arguments.fromBundle(extras),
                5000,
                true
        );
    }
}
