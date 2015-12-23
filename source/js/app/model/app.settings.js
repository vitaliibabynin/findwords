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

        var safeRoundsBundles = roundsBundles[router.getLanguage()];

        for (var i = 0; i < safeRoundsBundles.length; i++) {
            safeRoundsBundles[i].numberOfRoundsRequired = parseInt(safeRoundsBundles[i].numberOfRoundsRequired);
            for (var j = 0; j < safeRoundsBundles[i].rounds.length; j++) {
                var safeRound = safeRoundsBundles[i].rounds[j];
                safeRound.board.cols = parseInt(safeRound.board.cols);
                safeRound.board.rows = parseInt(safeRound.board.rows);
                safeRound.time = parseInt(safeRound.time);

                for (var k in safeRound.bonus) {
                    if (!safeRound.bonus.hasOwnProperty(k)) {
                        continue;
                    }
                    safeRound.bonus[k].coins = parseInt(safeRound.bonus[k].coins);
                    safeRound.bonus[k].score = parseInt(safeRound.bonus[k].score);
                }

                for (var l = 0; l < safeRound.words.length; l++) {
                    for (var m = 0; m < safeRound.words[l].letters.length; m++) {
                        safeRound.words[l].letters[m].x = parseInt(safeRound.words[l].letters[m].x);
                        safeRound.words[l].letters[m].y = parseInt(safeRound.words[l].letters[m].y);
                    }
                }
            }
        }

        return safeRoundsBundles;
    },

    getPracticeRound: function () {
        var defaultValue = [];
        var practiceRound = this.getSettingsValue('practiceRound', defaultValue);

        if (typeof practiceRound == "undefined") {
            return defaultValue;
        }

        var safePracticeRound = practiceRound[router.getLanguage()];

        safePracticeRound.board.cols = parseInt(safePracticeRound.board.cols);
        safePracticeRound.board.rows = parseInt(safePracticeRound.board.rows);
        safePracticeRound.time = parseInt(safePracticeRound.time);

        for (var k in safePracticeRound.bonus) {
            if (!safePracticeRound.bonus.hasOwnProperty(k)) {
                continue;
            }
            safePracticeRound.bonus[k].coins = parseInt(safePracticeRound.bonus[k].coins);
            safePracticeRound.bonus[k].score = parseInt(safePracticeRound.bonus[k].score);
        }

        for (var i = 0; i < safePracticeRound.words.length; i++) {
            for (var j = 0; j < safePracticeRound.words[i].letters.length; j++) {
                safePracticeRound.words[i].letters[j].x = parseInt(safePracticeRound.words[i].letters[j].x);
                safePracticeRound.words[i].letters[j].y = parseInt(safePracticeRound.words[i].letters[j].y);
            }
        }

        return safePracticeRound;
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



