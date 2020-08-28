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

    @ReactMethod
    public void onScheduler(){
        System.out.println("시작");
        System.out.println("==============================================");
        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");


        System.out.println("===============================================");

        System.out.println("===============================================");

        System.out.println("===============================================");

        AlarmSchedulerManager.start(applicationContext);
    }

    @ReactMethod
    public void offScheduler(){
        AlarmSchedulerManager.start(applicationContext);
    }
}
