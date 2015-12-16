var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

var AppSettings = Object.assign({}, AbstractEventEmitter, {

    settings: require("./../game.data"),


    setSettings: function (data) {
        this.settings = data;

        window.appAd.setSettings(this.getAdSettings());

        this.emitChange();
    },


    getSettingsValue: function (key, defaultValue) {
        if (!this.settings || !this.settings.hasOwnProperty(key)) {
            return defaultValue;
        }

        return this.settings[key];
    },

    getAppPlatforms: function () {
        return this.getSettingsValue('appplatforms', {});
    },

    //getAdSettings: function () {
    //    return this.getSettingsValue('ad_settings', {});
    //},

    getShareBonus: function () {
        return this.getSettingsValue('share_bonus', 10);
    },

    getShareAppLink: function () {
        return this.getSettingsValue('share_applink', false);
    },

    getFacebookId: function () {
        var fbId = this.getSettingsValue('facebookId', "");
        return fbId[CONST.ENV];
    },

    getAdSettings: function() {
        return this.getSettingsValue("adSettings", {});
    },

    getRoundsBundles: function () {
        var defaultValue = [];
        var roundsBundles = this.getSettingsValue('roundsBundles', defaultValue);

        if (typeof roundsBundles == "undefined") {
            return defaultValue;
        }

        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return roundsBundles.en;
                break;
            case CONST.LANGUAGE_RU:
                return roundsBundles.ru;
                break;
            default:
                return defaultValue;
        }
    },

    getPracticeRound: function () {
        return this.getSettingsValue('practiceRound', {});
    },

    getBonusCoins: function () {
        return this.getSettingsValue('bonusCoins', {});
    },

    getDialogs: function () {
        return this.getSettingsValue('dialogs', {});
    },

    getPurchases: function () {
        return this.getSettingsValue('purchases', {});
    },

    getFreeCoins: function () {
        return this.getSettingsValue('freeCoins', {});
    }

});

module.exports = AppSettings;



