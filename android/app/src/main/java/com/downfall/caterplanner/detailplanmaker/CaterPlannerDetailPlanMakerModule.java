package com.downfall.caterplanner.detailplanmaker;

import android.content.Intent;

import com.downfall.caterplanner.detailplanmaker.service.CaterPlannerDetailPlanMakerService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


public class CaterPlannerDetailPlanMakerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private CaterPlannerDetailPlanMakerService service;


    public CaterPlannerDetailPlanMakerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.service = new CaterPlannerDetailPlanMakerService();
    }

    @Override
    public String getName() {
        return "CaterPlannerDetailPlanMaker";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void create() {
        service.create();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray entry(){
        try{
            return service.entry();
        } catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @ReactMethod
    public void insertGoal(Integer level, ReadableMap r_goal, Promise promise){
        try{
            service.insertGoal(level, r_goal);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void insertPerform(Integer goalId, ReadableMap r_perform, Promise promise){
        try{
            service.insertPerform(goalId, r_perform);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getGoal(int id){
        try{
            return service.getGoal(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getPerform(int id){
        try{
            return service.getPerform(id);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @ReactMethod
    public void modifyGoal(Integer goalId, ReadableMap r_goal, Promise promise){
        try{
            service.modifyGoal(goalId, r_goal);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void modifyPerform(Integer id, ReadableMap r_perform, Promise promise){
        try{
            service.modifyPerform(id, r_perform);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void deleteGoal(Integer goalId, Promise promise){
        try{
            service.deleteGoal(goalId);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void deletePerform(Integer performId, Promise promise){
        try{
            service.deletePerform(performId);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray goalViewData(){
        try{
            return service.goalViewData();
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void build(ReadableArray r_detailPlans){
        try {
            service.build(r_detailPlans);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
