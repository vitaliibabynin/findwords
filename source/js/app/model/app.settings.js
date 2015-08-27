
var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

var AppSettings = Object.assign({}, AbstractEventEmitter, {

    settings: require("./../game.data"),


    setSettings: function(data){
        this.settings = data;

        window.appAd.setSettings(this.getAdSettings());

        this.emitChange();
    },


    getSettingsValue: function(key, defaultValue){
        if(!this.settings || !this.settings.hasOwnProperty(key)){
            return defaultValue;
        }

        return this.settings[key];
    },

    getAppPlatforms: function(){
        return this.getSettingsValue('appplatforms', {});
    },

    getAdSettings: function(){
        return this.getSettingsValue('ad_settings', {});
    },

    getShareBonus: function(){
        return this.getSettingsValue('share_bonus', 10);
    },

    getShareAppLink: function(){
        return this.getSettingsValue('share_applink', false);
    },

    getRoundsBundle: function(){
        return this.getSettingsValue('roundsBundle', []);
    }

});

module.exports = AppSettings;



