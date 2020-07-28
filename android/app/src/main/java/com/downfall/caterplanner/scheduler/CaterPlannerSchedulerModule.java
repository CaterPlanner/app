package com.downfall.caterplanner.scheduler;


import android.app.AlarmManager;

import com.downfall.caterplanner.SingletonContainer;
import com.downfall.caterplanner.detailplantree.service.GPRelationTreeService;
import com.downfall.caterplanner.rest.model.Task;
import com.downfall.caterplanner.rest.service.TaskService;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

public class CaterPlannerSchedulerModule extends ReactContextBaseJavaModule {

    private TaskService taskService;

    public CaterPlannerSchedulerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.taskService = SingletonContainer.get(TaskService.class);
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

    @ReactMethod
    public void addScehdule(Integer detailPlanHeaderId, ReadableArray r_task, Promise promise){
        try{
            taskService.createByReact(detailPlanHeaderId, r_task);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void removeSchedule(Integer detailPlanHeaderId){

    }
}
