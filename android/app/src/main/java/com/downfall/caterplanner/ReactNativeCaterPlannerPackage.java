package com.downfall.caterplanner;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.downfall.caterplanner.detailplantree.CaterPlannerDetailPlanTreeModule;
import com.downfall.caterplanner.rest.DetailPlansControllerModule;
import com.downfall.caterplanner.rest.PurposeControllerModule;
import com.downfall.caterplanner.scheduler.CaterPlannerSchedulerModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class ReactNativeCaterPlannerPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new CaterPlannerDetailPlanTreeModule(reactContext),
                new DetailPlansControllerModule(reactContext),
                new PurposeControllerModule(reactContext),
                new CaterPlannerSchedulerModule(reactContext));
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
