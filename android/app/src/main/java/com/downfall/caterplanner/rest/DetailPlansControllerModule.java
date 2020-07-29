package com.downfall.caterplanner.rest;

import androidx.annotation.NonNull;

import com.downfall.caterplanner.SingletonContainer;
import com.downfall.caterplanner.rest.service.DetailPlanService;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

public class DetailPlansControllerModule extends ReactContextBaseJavaModule {

    private DetailPlanService detailPlanService;

    public DetailPlansControllerModule(ReactApplicationContext reactContext){
        super(reactContext);
        detailPlanService = SingletonContainer.get(DetailPlanService.class);
    }

    @NonNull
    @Override
    public String getName() {
        return "DetailPlansController";
    }


    @ReactMethod
    public void update(Integer purposeId, ReadableArray readableDetailPlans, Promise promise){
        try{
            detailPlanService.updateByReact(purposeId, readableDetailPlans);
        }catch (Exception e){
            promise.reject(e);
        }
    }


    @ReactMethod
    public void delete(Integer purposeId, Promise promise){
        try{
            detailPlanService.deleteByReact(purposeId);
        }catch (Exception e){
            promise.reject(e);
        }
    }

}
