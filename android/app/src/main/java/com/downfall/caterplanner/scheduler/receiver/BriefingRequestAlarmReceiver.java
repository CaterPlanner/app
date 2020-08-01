package com.downfall.caterplanner.scheduler.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.downfall.caterplanner.SingletonContainer;
import com.downfall.caterplanner.rest.service.DetailPlansService;

public class BriefingRequestAlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        SingletonContainer.Helper.init(context);
        DetailPlansService detailPlansService = SingletonContainer.get(DetailPlansService.class);

    }
}
