package com.downfall.caterplanner.scheduler;


import android.app.AlarmManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CaterPlannerSchedulerModule extends ReactContextBaseJavaModule {

    private SchedulerManager schedulerManager;
    private ReactApplicationContext reactApplicationContext;

    public CaterPlannerSchedulerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactApplicationContext = reactContext;
    }

    @Override
    public String getName() {
        return "CaterPlannerScheduler";
    }

    @ReactMethod
    public void onScheduler(int setBriefingRequestNoticehourOfDay){
        SchedulerManager.Config config = SchedulerManager.getConfig(reactApplicationContext);
        config.setBriefingRequestNoticeTIme(setBriefingRequestNoticehourOfDay);

        SchedulerManager.start(reactApplicationContext);
    }

    @ReactMethod
    public void offScheduler(){
        SchedulerManager.stop(reactApplicationContext);
    }

}
