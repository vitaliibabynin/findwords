package com.portnou.cordova.plugin.preferences;


import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;


/**
 * This class echoes a string called from JavaScript.
 */
public class Preferences extends CordovaPlugin {
    protected static Context context = null;
    private  static final String MyPREFERENCES = "AppPrefs" ;
    private SharedPreferences sharedpreferences;

    @Override
    public void initialize (CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        context = super.cordova.getActivity().getApplicationContext();
        sharedpreferences = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
    }
    
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("getValue")) {
            String key = args.getString(0);
            this.get(key, callbackContext);
            return true;
        }
        else if (action.equals("setValue")) {
            String key = args.getString(0);
            String value = args.getString(1);
            this.put(key, value, callbackContext);
            return true;
        }
        
        return false;
    }

    private void get(String key, CallbackContext callbackContext) {
        if (key != null && key.length() > 0) {
            String value = sharedpreferences.getString(key, "");
            callbackContext.success(value);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }

    private void put(String key, String value, CallbackContext callbackContext) {
        if (key != null && key.length() > 0 && value != null && value.length() > 0) {
            SharedPreferences.Editor editor = sharedpreferences.edit();
            editor.putString(key, value);
            editor.commit();
            callbackContext.success();
        } else {
            callbackContext.error("Expected two non-empty string arguments.");
        }
    }
}
