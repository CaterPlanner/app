package com.downfall.caterplanner.detailplanmaker;

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
    public WritableMap get(Integer key){
        try{
            return service.getGoal(key);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
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
    public void insert(Integer goalKey, ReadableMap r_perform, Promise promise) {
        try {
            service.insertPerform(goalKey, r_perform);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("TREE ERROR" , e);
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap mapGoalTopViewData(){
        try{
            return service.mapGoalTopViewData();
        }catch (Exception e){
           e.printStackTrace();
        }
        return null;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap mapGoalBottomViewData(){
        try {
            return service.mapGoalBottomViewData();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @ReactMethod
    public void modifyGoal(Integer goalKey, ReadableMap r_goal, Promise promise){
        try{
            service.modifyGoal(goalKey, r_goal);
            promise.resolve(null);
        }catch (Exception e){
            promise.reject("TREE ERROR" ,e);
        }
    }


    @ReactMethod(isBlockingSynchronousMethod = true)
    public void build(ReadableArray param){
        try {
            service.build(param);
        }catch(Exception e){
            e.printStackTrace();
        }
    }


    @ReactMethod
    public void deleteGoal(Integer goalKey, Promise promise){
        try {
            service.deleteGoal(goalKey);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("TREE ERROR" ,e);
        }
    }

    @ReactMethod
    public void successor(Integer goalKey, ReadableMap r_goal, Promise promise){
        try {
            service.insertGoal(goalKey, r_goal);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("TREE ERROR" ,e);
        }
    }

}
