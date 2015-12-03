Cordova Preferences plugin v 1.0.0
=============

This plugin enables your app to store small pieces of data like app settings and preferences in device's persistent storage in a key-value manner.
On iOS plugin uses NSUserDefaults, on Android - SharedPreferences features.
All values are stored as a JSON strings on save and converted back to their respective types upon loading.

Usage
-------

Plugin becomes available after DeviceReady event is fired.

To store a key-value pair call:
```JavaScript
Preferences.put(myKey, myAwesomeValue);

Preferences.put(myKey, myAwesomeValue, success, fail);
```

To load a value for a key call:
```JavaScript
Preferences.get(myKey, function(value) {}, error);
```

INSTALLATION
-------------

	cordova plugin add https://github.com/alexportnoy/cordova-prefs-plugin


SUPPORTED PLATFORMS
-------------------

- iOS
- Android

CHANGELOG
---------

v1.0.0:
- First version of plugin
