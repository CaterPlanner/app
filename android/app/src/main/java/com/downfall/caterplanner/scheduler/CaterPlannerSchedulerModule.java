package com.downfall.caterplanner.scheduler;


import com.downfall.caterplanner.detailplantree.service.GPRelationTreeService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

public class CaterPlannerSchedulerModule extends ReactContextBaseJavaModule {

    public CaterPlannerSchedulerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @Override
    public String getName() {
        return "CaterPlannerScheduler";
    }
}
