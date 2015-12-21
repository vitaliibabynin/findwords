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

    getShopValue: function (key, defaultValue) {
        if (!this.settings || !this.settings.hasOwnProperty("shop")) {
            return defaultValue;
        }

        if (!this.settings.shop || !this.settings.shop.hasOwnProperty(key)) {
            return defaultValue;
        }

        return this.settings.shop[key];
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

    getAdSettings: function () {
        return this.getSettingsValue("adSettings", {});
    },

    getRoundsBundles: function () {
        var defaultValue = [];
        var roundsBundles = this.getSettingsValue('roundsBundles', defaultValue);

        if (typeof roundsBundles == "undefined") {
            return defaultValue;
        }

        return roundsBundles[router.getLanguage()];
    },

    getPracticeRound: function () {
        var defaultValue = [];
        var practiceRound = this.getSettingsValue('practiceRound', defaultValue);

        if (typeof practiceRound == "undefined") {
            return defaultValue;
        }

        return practiceRound[router.getLanguage()];
    },

    getBonusCoins: function () {
        return this.getSettingsValue('dailyBonusCoins', {});
    },

    getDialogs: function () {
        return this.getSettingsValue('dialogs', {});
    },

    getPurchases: function () {
        return this.getShopValue('coins', {});
    },

    getFreeCoins: function () {
        return this.getShopValue('freecoins', {});
    },

    getSlideSoon: function () {
        return this.getSettingsValue('slideSoon', {});
    },

    getChipsCoinsCost: function () {
        return this.getSettingsValue('chipsCoinsCost', {});
    },

    getInitialCoins: function () {
        return this.getSettingsValue('initialCoins', 0);
    }

});

module.exports = AppSettings;



