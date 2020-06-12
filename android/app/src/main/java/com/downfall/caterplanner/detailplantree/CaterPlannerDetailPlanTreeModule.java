package com.downfall.caterplanner.detailplantree;


import com.downfall.caterplanner.detailplantree.service.MPOrderRelationTreeService;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;


public class CaterPlannerDetailPlanTreeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private MPOrderRelationTreeService service;


    public CaterPlannerDetailPlanTreeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.service = new MPOrderRelationTreeService();
    }

    @Override
    public String getName() {
        return "CaterPlannerDetailPlanTree";
    }

    @ReactMethod
    public void create() {
        service.create();
    }

    @ReactMethod
    public void insert(String parentKey, ReadableMap data, Callback success, Callback fail) {
        try {
            service.insert(parentKey, data, success);
        } catch (Exception e) {
            e.printStackTrace();
            fail.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void pass(String key, Callback fail){
        try{
            service.pass(key);
        }catch (Exception e){
            fail.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void findChildren(String parentKey, Callback success, Callback fail){
        try{
            success.invoke(service.findChildren(parentKey));
        }catch(Exception e){
            fail.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void build(ReadableArray param, Callback fail){
        try {
            service.build(param);
        }catch(Exception e){
            fail.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void schedules(Callback success, Callback fail){
        try {
            success.invoke(service.schedules(success));
        } catch (Exception e) {
            fail.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void delete(String key, Callback fail){
        try {
            service.delete(key);
        } catch (Exception e) {
            fail.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void successor(String previousKey, ReadableMap data, Callback success, Callback fail){
        try {
            service.next(previousKey, data, success);
        } catch (Exception e) {
            fail.invoke(e.getMessage());
        }
    }
}
