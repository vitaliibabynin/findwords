var exec = require('cordova/exec');
var cordova = require('cordova');

var Preferences = exports;

Preferences.put = function(key, value, success, error) {
    value = JSON.stringify(value);
    exec(success, error, "Preferences", "setValue", [key, value]);
};

Preferences.get = function(key, success, error) {
    exec(success, error, "Preferences", "getValue", [key]);
};
