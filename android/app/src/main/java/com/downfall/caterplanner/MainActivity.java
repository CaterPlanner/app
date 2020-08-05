package com.downfall.caterplanner;

import android.os.Bundle;
import android.os.PersistableBundle;
import androidx.annotation.Nullable;
import org.devio.rn.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */



  @Override
  protected String getMainComponentName() {
    return "caterplanner";
  }
}
