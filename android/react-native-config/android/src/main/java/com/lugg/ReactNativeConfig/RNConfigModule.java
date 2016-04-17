package com.lugg.RNConfig;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.location.LocationManager;
import android.util.Log;

import com.facebook.react.common.ReactConstants;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.lang.ClassNotFoundException;
import java.lang.IllegalAccessException;
import java.lang.reflect.Field;
import java.util.Map;
import java.util.HashMap;

public class RNConfigModule extends ReactContextBaseJavaModule {

  private String packageName;

  public RNConfigModule(ReactApplicationContext reactContext, String packageName) {
    super(reactContext);
    this.packageName = packageName;
  }

  @Override
  public String getName() {
    return "RNConfig";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();

    try {
      Class clazz = Class.forName(packageName + ".BuildConfig");
      Field[] fields = clazz.getDeclaredFields();
      for(Field f: fields) {
        try {
          constants.put(f.getName(), f.get(null));
        }
        catch (IllegalAccessException e) {
          Log.d("ReactNative", "RNConfig: Could not access BuildConfig field " + f.getName());
        }
      }
    }
    catch (ClassNotFoundException e) {
      Log.d("ReactNative", "RNConfig: Could not find BuildConfig class");
    }

    return constants;
  }
}
