package com.downfall.caterplanner.detailplantree;

import com.downfall.caterplanner.detailplantree.service.GPRelationTreeService;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


public class CaterPlannerDetailPlanTreeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private GPRelationTreeService service;


    public CaterPlannerDetailPlanTreeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.service = new GPRelationTreeService();
    }

    @Override
    public String getName() {
        return "CaterPlannerDetailPlanTree";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void create() {
        service.create();
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap get(Integer key){
        try{
            return service.get(key);
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
    public void insert(Integer parentKey, ReadableMap data, Promise promise) {
        try {
            service.insert(parentKey, data);
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("TREE ERROR" , e);
        }
    }

    @Deprecated
    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap mapGoalTopViewData(){
        try{
            return service.mapGoalTopViewData();
        }catch (Exception e){
           e.printStackTrace();
        }
        return null;
    }

    @Deprecated
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
    public void modify(Integer key, ReadableMap param, Promise promise){
        try{
            service.modify(key, param);
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

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableArray schedules(){
        try {
           return service.schedules();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
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
