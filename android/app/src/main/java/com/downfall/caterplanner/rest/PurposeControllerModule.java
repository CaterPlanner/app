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
    public void createWithDetailPlans(ReadableMap purpose, ReadableArray readableDetailPlans, Promise promise){
        try{
            promise.resolve(purposeService.createByReact(purpose, readableDetailPlans));
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void createWithDetailPlansByOther(ReadableMap purpose, ReadableArray readableDetailPlans, Integer baseId, Promise promise){
        try{
            promise.resolve(purposeService.createByReact(purpose, readableDetailPlans, baseId));
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void read(Integer id, Promise promise){
        try{
            promise.resolve(purposeService.readByReact(id));
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void readAll(Promise promise){
        try{
            promise.resolve(purposeService.readAllByReact());
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void update(Integer id, ReadableMap purpose, Promise promise){
        try{
            purposeService.updateByReact(id, purpose);
        }catch (Exception e){
            promise.reject(e);
        }
    }

    @ReactMethod
    public void delete(Integer id, Promise promise){
        try{
            purposeService.deleteByReact(id);
        }catch (Exception e){
            promise.reject(e);
        }
    }
}
