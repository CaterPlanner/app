package com.downfall.caterplanner.scheduler.receiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
import com.downfall.caterplanner.rest.repository.GoalRepository;
import com.downfall.caterplanner.rest.repository.PerformRepository;
import com.downfall.caterplanner.rest.repository.PurposeRepository;
import com.downfall.caterplanner.rest.service.DetailPlansService;
import com.downfall.caterplanner.rest.service.PurposeService;

public class StatisticsReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        SQLiteHelper helper = new SQLiteHelper(context, 0);

        GoalRepository goalRepository = new GoalRepository(helper);
        PerformRepository performRepository = new PerformRepository(helper);
        BriefingRepository briefingRepository = new BriefingRepository(helper);
        DetailPlanHeaderRepository detailPlanHeaderRepository = new DetailPlanHeaderRepository(helper);

        DetailPlansService detailPlanService = new DetailPlansService(
                helper,
                goalRepository,
                performRepository,
                briefingRepository,
                detailPlanHeaderRepository
        );

        PurposeService purposeService = new PurposeService(
                helper,
                new PurposeRepository(helper),
                detailPlanService,
                briefingRepository,
                goalRepository
        );


    }
}
