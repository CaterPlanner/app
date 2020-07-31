package com.downfall.caterplanner.scheduler.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.model.DetailPlans;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PerformRepository;
import com.downfall.caterplanner.rest.service.DetailPlansService;

public class BriefingRequestAlarmReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        SQLiteHelper helper = new SQLiteHelper(context, 0);
        DetailPlansService detailPlanService = new DetailPlansService(
                helper,
                new GoalRepository(helper),
                new PerformRepository(helper),
                new BriefingRepository(helper),
                new DetailPlanHeaderRepository(helper)
        );

        DetailPlans[] acitveDetailPlans = detailPlanService.readInActive();
    }
}
