package com.downfall.caterplanner.scheduler;


import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CaterPlannerSchedulerModule extends ReactContextBaseJavaModule {


    public CaterPlannerSchedulerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CaterPlannerScheduler";
    }

    @ReactMethod
    public void onScheduler(){

    }

    @ReactMethod
    public void offScheduler(){

    }

}
