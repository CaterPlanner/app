package com.downfall.caterplanner;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;


import com.downfall.caterplanner.scheduler.CaterPlannerSchedulerMoudle;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

public class ReactNativeCaterPlannerPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.asList(
                new CaterPlannerSchedulerMoudle(reactContext)
               );
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
