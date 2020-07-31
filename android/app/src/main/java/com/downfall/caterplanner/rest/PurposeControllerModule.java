package com.downfall.caterplanner.rest;

import androidx.annotation.NonNull;

import com.downfall.caterplanner.SingletonContainer;
import com.downfall.caterplanner.rest.service.PurposeService;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

public class PurposeControllerModule extends ReactContextBaseJavaModule {

    private PurposeService purposeService;

    public PurposeControllerModule(ReactApplicationContext reactContext){
        super(reactContext);
        purposeService = SingletonContainer.get(PurposeService.class);
    }

    @NonNull
    @Override
    public String getName() {
        return "PurposeController";
    }

    @ReactMethod
    public void create(ReadableMap purpose, Promise promise){
        try{
            promise.resolve(purposeService.createByReact(purpose));
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void createWithDetailPlans(ReadableMap r_purpose, ReadableArray r_detailPlans, Promise promise){
        try{
            promise.resolve(purposeService.createByReact(r_purpose, r_detailPlans));
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void createWithDetailPlansByOther(ReadableMap r_purpose, ReadableArray r_detailPlans, Integer baseId, Promise promise){
        try{
            promise.resolve(purposeService.createByReact(r_purpose, r_detailPlans, baseId.longValue()));
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void read(Integer id, Promise promise){
        try{
            promise.resolve(purposeService.readForCard(id));
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void readAll(Promise promise){
        try{
            promise.resolve(purposeService.readAllForCard());
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void updateShort(Integer id, ReadableMap r_purpose, Promise promise){
        try{
            purposeService.updateShort(id, r_purpose);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void update(Integer id, ReadableMap r_purpose, ReadableArray r_detailPlans, Promise promise){
        try{
            purposeService.update(id, r_purpose, r_detailPlans);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void delete(Integer id, Promise promise){
        try{
            purposeService.delete(id);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void addBriefing(Integer id, Integer goalId, Integer performId, Promise promise){
        try{
            purposeService.addBriefing(id, goalId, performId);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void startSchedule(Integer id, Promise promise){
        try{
            purposeService.startSchedule(id);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void stopSchedule(Integer id, Promise promise){
        try{
            purposeService.startSchedule(id);
        }catch (Exception e){
            promise.reject(e);
        }
    }

}
