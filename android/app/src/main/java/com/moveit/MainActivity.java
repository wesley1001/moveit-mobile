package com.moveit;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;

import com.microsoft.codepush.react.CodePush;
import com.eguma.vibration.Vibration;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import me.nucleartux.date.ReactDatePackage;
import android.support.v4.app.FragmentActivity;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.tiagojdferreira.RNGeolocationPackage;
import com.remobile.splashscreen.*;
import co.apptailor.googlesignin.RNGoogleSigninModule;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.inprogress.ReactOrientationController.ReactOrientationController;

public class MainActivity extends FragmentActivity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);
        CodePush codePush = new CodePush("0YwAyM6WFlDZ9xMO-_Is4MqOW9FMEJ2MkzFBg", this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setJSBundleFile(codePush.getBundleUrl("index.android.bundle"))
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new RCTSplashScreenPackage(this))
                .addPackage(new ReactDatePackage(this))
                .addPackage(new ReactMaterialKitPackage())
                .addPackage(new RNGeolocationPackage())
                .addPackage(new Vibration())
                .addPackage(new ReactOrientationController(this))
                .addPackage(codePush.getReactPackage())
                .addPackage(new RNGoogleSigninPackage(this))
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "MoveIt", null);

        setContentView(mReactRootView);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, android.content.Intent data) {
      if (requestCode == RNGoogleSigninModule.RC_SIGN_IN) {
          RNGoogleSigninModule.onActivityResult(data);
      }
      super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
      if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
      } else {
        super.onBackPressed();
      }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
      super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this, this);
        }
    }
}
