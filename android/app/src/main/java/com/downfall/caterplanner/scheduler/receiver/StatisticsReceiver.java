package com.downfall.caterplanner.scheduler.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.downfall.caterplanner.SingletonContainer;
import com.downfall.caterplanner.rest.service.PurposeService;

public class StatisticsReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        SingletonContainer.Helper.init(context);
        PurposeService purposeService = SingletonContainer.get(PurposeService.class);

        try {
            purposeService.refresh();
        } catch (Exception e) {
            e.printStackTrace();
            //에러 발생 알림 메시지
        }
    }
}
