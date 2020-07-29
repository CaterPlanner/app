package com.downfall.caterplanner;

import android.app.Application;
import android.content.Context;

import com.downfall.caterplanner.rest.db.SQLiteHelper;
import com.downfall.caterplanner.rest.repository.BriefingRepository;
import com.downfall.caterplanner.rest.repository.DetailPlanHeaderRepository;
import com.downfall.caterplanner.rest.repository.PurposeRepository;
import com.downfall.caterplanner.rest.service.DetailPlanService;
import com.downfall.caterplanner.rest.service.PurposeService;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new ReactNativeCaterPlannerPackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

      SQLiteHelper sqLiteHelper = new SQLiteHelper(getApplicationContext(), 0);
      BriefingRepository briefingRepository = new BriefingRepository(sqLiteHelper);
      DetailPlanHeaderRepository detailPlanHeaderRepository = new DetailPlanHeaderRepository(sqLiteHelper);
      DetailPlanRepository detailPlanRepository = new DetailPlanRepository(sqLiteHelper);
      PurposeRepository purposeRepository = new PurposeRepository(sqLiteHelper);

      DetailPlanService detailPlanService = new DetailPlanService(sqLiteHelper, detailPlanRepository, detailPlanHeaderRepository, briefingRepository);
      PurposeService purposeService = new PurposeService(sqLiteHelper, purposeRepository, detailPlanService);

      SingletonContainer.register(SQLiteHelper.class, sqLiteHelper);
      SingletonContainer.register(BriefingRepository.class, briefingRepository);
      SingletonContainer.register(DetailPlanHeaderRepository.class, detailPlanHeaderRepository);
      SingletonContainer.register(DetailPlanRepository.class, detailPlanRepository);
      SingletonContainer.register(PurposeRepository.class, purposeRepository);

      SingletonContainer.register(DetailPlanService.class, detailPlanService);
      SingletonContainer.register(PurposeService.class, purposeService);

    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.downfall.caterplanner.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
