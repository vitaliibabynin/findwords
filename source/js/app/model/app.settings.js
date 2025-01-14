var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

var AppSettings = Object.assign({}, AbstractEventEmitter, {

    settings: window.gameData,

    setSettings: function (data) {
        this.settings = data;

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

    getGameId: function () {
        return this.getSettingsValue('gameId', "");
    },

    getAppPlatforms: function () {
        return this.getSettingsValue('marketAppId', {});
    },

    //getAdSettings: function () {
    //    return this.getSettingsValue('ad_settings', {});
    //},

    getShareBonus: function () {
        return this.getSettingsValue('share_bonus', 10);
    },

    getShareAppLink: function () {
        var shareLink = this.getSettingsValue('shareAppLink', false);
        if (!shareLink) {
            shareLink = Utils.getPlatformUrl(CONST.CURRENT_PLATFORM);
        }

        return shareLink;
    },

    getInviteAppUrl: function () {
        return this.getSettingsValue('inviteAppLink', false);
    },

    getAppInviteImgUrl: function () {
        var inviteUrl = this.getSettingsValue('inviteImgUrl', false)
        return inviteUrl ? inviteUrl[router.getLanguage()] : ''
    },

    getFacebookId: function () {
        var fbId = this.getSettingsValue('facebookId', "");
        return fbId[CONST.ENV];
    },

    getAdSettings: function () {
        var adSettings = this.getSettingsValue("adSettings", {});
        return adSettings.hasOwnProperty(CONST.CURRENT_PLATFORM) ? adSettings[CONST.CURRENT_PLATFORM] : {};
    },

    getRoundsBundles: function () {
        var roundsBundles = this.getSettingsValue('roundsBundles', []);
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
        var practiceRound = this.getSettingsValue('practiceRound', []);
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

    getRoundsTotal: function () {
        var totalRounds = 0;
        var roundsBundles = this.getRoundsBundles();
        if (!roundsBundles) {
            return totalRounds;
        }

        for (var k in roundsBundles) {
            if (!roundsBundles.hasOwnProperty(k)) {
                continue;
            }
            if (!roundsBundles[k].rounds) {
                continue;
            }
            totalRounds += roundsBundles[k].rounds.length;
        }

        return totalRounds;
    },

    getBonusCoins: function () {
        var safeDailyBonusCoins = this.getSettingsValue('dailyBonusCoins', {});

        for (var k in safeDailyBonusCoins) {
            if (!safeDailyBonusCoins.hasOwnProperty(k)) {
                continue;
            }
            safeDailyBonusCoins[k] = parseInt(safeDailyBonusCoins[k]);
        }

        return safeDailyBonusCoins;
    },

    getDialogs: function () {
        var safeDialogs = this.getSettingsValue('dialogs', {});

        for (var k in safeDialogs) {
            if (!safeDialogs.hasOwnProperty(k)) {
                continue;
            }
            safeDialogs[k] = parseInt(safeDialogs[k]);
        }

        return safeDialogs;
    },

    getPurchases: function () {
        var coins = this.getShopValue('coins', {});
        var safeCoins = coins[CONST.CURRENT_PLATFORM];

        if (typeof(safeCoins) == "undefined") {
            return {}
        }

        for (var k in safeCoins) {
            if (!safeCoins.hasOwnProperty(k)) {
                continue;
            }
            safeCoins[k].purchaseCoins = parseInt(safeCoins[k].purchaseCoins);
        }

        return safeCoins;
    },

    getFreeCoins: function () {
        var safeFreeCoins = this.getShopValue('freecoins', {});

        for (var k in safeFreeCoins) {
            if (!safeFreeCoins.hasOwnProperty(k)) {
                continue;
            }
            safeFreeCoins[k] = parseInt(safeFreeCoins[k]);
        }

        return safeFreeCoins;
    },

    getSlideSoon: function () {
        return this.getSettingsValue('slideSoon', {});
    },

    getChipsCoinsCost: function () {
        var safeChipsCoinsCost = this.getSettingsValue('chipsCoinsCost', {});

        for (var k in safeChipsCoinsCost) {
            if (!safeChipsCoinsCost.hasOwnProperty(k)) {
                continue;
            }
            safeChipsCoinsCost[k] = parseInt(safeChipsCoinsCost[k]);
        }

        return safeChipsCoinsCost;
    },

    getInitialCoins: function () {
        var safeInitialCoins = this.getSettingsValue('initialCoins', 0);

        safeInitialCoins = parseInt(safeInitialCoins);

        return safeInitialCoins;
    },

    getSocialUrls: function () {
        return this.getSettingsValue('social', {});
    },

    getTimer: function () {
        return this.getSettingsValue('timer', {});
    },
    getTimerValue: function (key, defaultValue) {
        var timer = this.getTimer();
        if (!timer || !timer.hasOwnProperty(key)) {
            return defaultValue;
        }
        return timer[key];
    },
    getTimerEnabled: function () {
        return this.getTimerValue('enabled', false);
    },
    getTimerUserChangeAllow: function () {
        return this.getTimerValue('userChangeAllow', false);
    }

});

module.exports = AppSettings;



