package com.downfall.caterplanner.scheduler;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CaterPlannerSchedulerMoudle extends ReactContextBaseJavaModule {

    private ReactApplicationContext applicationContext;

    public CaterPlannerSchedulerMoudle(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
        this.applicationContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "CaterPlannerScheduler";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void onScheduler(){
        AlarmSchedulerManager.start(applicationContext);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void offScheduler(){
        AlarmSchedulerManager.stop(applicationContext);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isScheduling() {return AlarmSchedulerManager.isScheduling(applicationContext);}
}
