package com.hiccsu;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends SplashActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    protected String getMainComponentName() {
        return "hiccsu";
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
    }

}
