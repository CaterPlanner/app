package com.downfall.caterplanner.detailplantree;

import com.downfall.caterplanner.detailplantree.service.MPRelationTreeService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;


public class CaterPlannerDetailPlanTreeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private MPRelationTreeService service;


    public CaterPlannerDetailPlanTreeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.service = new MPRelationTreeService();
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
    public void get(Integer key, Promise promise){
        try{
            promise.resolve(service.get(key));
        }catch (Exception e){
            promise.reject("TREE ERROR", e);
        }
    }

    @ReactMethod
    public void entry(Promise promise){
        try{
            promise.resolve(service.entry());
        } catch (Exception e){
            promise.reject("TREE ERROR", e);
        }
    }

    @ReactMethod
    public void insert(Integer parentKey, ReadableMap data, Promise promise) {
        try {
            service.insert(parentKey, data);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("TREE ERROR" , e);
        }
    }

    @ReactMethod
    public void mapTopViewData(Integer activeParentKey, Promise promise){
        try{
            promise.resolve(service.mapTopViewData(activeParentKey));
        }catch (Exception e){
            promise.reject("TREE ERROR", e);
        }
    }

    @ReactMethod
    public void mapBottomViewData(Integer activeParentKey, Promise promise){
        try{
            promise.resolve(service.mapBottomViewData(activeParentKey));
        }catch(Exception e){
            promise.reject("TREE ERROR" , e);
        }
    }

    @ReactMethod
    public void modify(Integer key, ReadableMap param, Promise promise){
        try{
            service.modify(key, param);
            promise.resolve(null);
        }catch (Exception e){
            promise.reject("TREE ERROR" ,e);
        }
    }


    @ReactMethod
    public void build(ReadableArray param, Promise promise){
        try {
            service.build(param);
            promise.resolve(null);
        }catch(Exception e){
            promise.reject("TREE ERROR" ,e);
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void schedules(Promise promise){
        try {
            promise.resolve(service.schedules());
        } catch (Exception e) {
            promise.reject("TREE ERROR" ,e);
        }
    }

    @ReactMethod
    public void delete(Integer key, Promise promise){
        try {
            service.delete(key);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("TREE ERROR" ,e);
        }
    }

    @ReactMethod
    public void successor(Integer previousKey, ReadableMap data, Promise promise){
        try {
            service.successor(previousKey, data);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("TREE ERROR" ,e);
        }
    }

}
