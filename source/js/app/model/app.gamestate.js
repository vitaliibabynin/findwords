var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

var EVENT_CHANGE_ROUNDS_BUNDLES = "eventChangeRoundsBundles";
var EVENT_CHANGE_COINS = "eventChangeCoins";
var EVENT_CHANGE_MUSICANDSFX = "eventChangeMusicAndSFX";
var EVENT_REMOVE_ADS = "eventChageRemoveAds";

var SETTINGS_GAMESTATE = 'game_state';

var GameState = Object.assign({}, AbstractEventEmitter, {

    gameState: {
        coins: appManager.getSettings().getInitialCoins(),
        score: 0,
        showAds: true,
        adPreferences: {
            removeAds: false,
            removeAdsDialogueShown: false
        },
        //bonus: {
        //    lastAccessDate: "",
        //    daysPlayedStreak: 0
        //},
        settings: {
            music: false,
            sound: false
        },
        practiceRound: {
            //complete: false,
            //en: {
            //    board: {},
            //    openedLetters: [],
            //    starsReceived: 3,
            //    secondsRemaining: 0
            //},
            //ru: {
            //    board: {},
            //    openedLetters: [],
            //    starsReceived: 3,
            //    secondsRemaining: 0
            //}
        },
        roundsBundles: {
            //en: {
            //    //0: {
            //    //    bundleScore: 9999,
            //    //    isUnlocked: false,
            //    //    roundsComplete: 0,
            //    //    rounds: {
            //    //        0: {
            //    //            board: {},
            //    //            openedLetters: [],
            //    //            shownWords: [],
            //    //            starsReceived: 3,
            //    //            secondsRemaining: 0
            //    //        },
            //    //        1: {
            //    //            board: {},
            //    //            openedLetters: [],
            //    //            shownWords: [],
            //    //            starsReceived: 3,
            //    //            secondsRemaining: 0
            //    //        },
            //    //        2: {
            //    //            board: {},
            //    //            openedLetters: [],
            //    //            shownWords: [],
            //    //            starsReceived: 3,
            //    //            secondsRemaining: 0
            //    //        },
            //    //        3: {
            //    //            board: {},
            //    //            openedLetters: [],
            //    //            shownWords: [],
            //    //            starsReceived: 3,
            //    //            secondsRemaining: 0
            //    //        }
            //    //    }
            //    //}
            //},
            //ru: {
            //    //0: {
            //        //bundleScore: 0,
            //        //isUnlocked: true,
            //        //roundsComplete: 0,
            //        //rounds: {
            //        //    0: {
            //        //        board: {},
            //        //        openedLetters: [],
            //        //        shownWords: [],
            //        //        starsReceived: 3,
            //        //        secondsRemaining: 0
            //        //    },
            //        //    1: {
            //        //        board: {},
            //        //        openedLetters: [],
            //        //        shownWords: [],
            //        //        starsReceived: 3,
            //        //        secondsRemaining: 0
            //        //    },
            //        //    2: {
            //        //        board: {},
            //        //        openedLetters: [],
            //        //        shownWords: [],
            //        //        starsReceived: 3,
            //        //        secondsRemaining: 0
            //        //    },
            //        //    3: {
            //        //        board: {},
            //        //        openedLetters: [],
            //        //        shownWords: [],
            //        //        starsReceived: 3,
            //        //        secondsRemaining: 0
            //        //    }
            //        //}
            //    //}
        }
    },

    init: function () {
        return new Promise(function (resolve, reject) {
            DB.getSettings().get(SETTINGS_GAMESTATE).then(function (gameState) {
                if (gameState) {
                    this.gameState = gameState;
                }

                return resolve();
            }.bind(this));

        }.bind(this));
    },

    saveGameState: function () {
        DB.getSettings().set(SETTINGS_GAMESTATE, this.gameState);
    },

    setGameStateField: function (field, newValue) {
        this.gameState[field] = newValue;
        this.saveGameState();
    },
    getGameStateField: function (field, defaultValue) {
        if (!this.gameState || !this.gameState.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState[field];
    },
    setScore: function (newNumber) {
        this.setGameStateField('score', newNumber);
    },
    getScore: function () {
        return this.getGameStateField('score', 0);
    },
    setCoins: function (newNumber) {
        this.setGameStateField('coins', newNumber);
        this.emitChangeCoins();
    },
    getCoins: function () {
        return this.getGameStateField('coins', 0);
    },
    addCoins: function (coinsToAdd) {
        newTotalCoins = this.getCoins() + coinsToAdd;
        return this.setCoins(newTotalCoins);
    },
    //setShowAds: function (newBoolean) {
    //    this.setGameStateField('showAds', newBoolean);
    //    this.emitChangeShowAds();
    //},
    //getShowAds: function () {
    //    return this.getGameStateField('showAds', true);
    //},

    setAdPreferencesField: function (field, newValue) {
        if (!this.gameState.adPreferences) {
            this.gameState.adPreferences = {};
        }

        this.gameState.adPreferences[field] = newValue;

        this.saveGameState();
    },
    getAdPreferencesField: function (field, defaultValue) {
        if (!this.gameState.adPreferences || !this.gameState.adPreferences.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.adPreferences[field];
    },
    setRemoveAds: function (newBoolean) {
        this.setAdPreferencesField('removeAds', newBoolean);
        this.emitChangeRemoveAds();
    },
    getRemoveAds: function () {
        return this.getAdPreferencesField('removeAds', false);
    },
    setRemoveAdsDialogueShown: function (newBoolean) {
        this.setAdPreferencesField('removeAdsDialogueShown', newBoolean);
    },
    getRemoveAdsDialogueShown: function () {
        return this.getAdPreferencesField('removeAdsDialogueShown', "");
    },

    setBonusField: function (field, newValue) {
        if (!this.gameState.bonus) {
            this.gameState.bonus = {};
        }

        this.gameState.bonus[field] = newValue;

        this.saveGameState();
    },
    getBonusField: function (field, defaultValue) {
        if (!this.gameState.bonus || !this.gameState.bonus.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.bonus[field];
    },
    setLastAccessDate: function (newString) {
        this.setBonusField('lastAccessDate', newString);
    },
    getLastAccessDate: function () {
        return this.getBonusField('lastAccessDate', "");
    },
    setDaysPlayedStreak: function (newNumber) {
        this.setBonusField('daysPlayedStreak', newNumber);
    },
    getDaysPlayedStreak: function () {
        return this.getBonusField('daysPlayedStreak', 1);
    },

    setSettingsField: function (field, newValue) {
        if (!this.gameState.settings) {
            this.gameState.settings = {};
        }

        this.gameState.settings[field] = newValue;
        this.saveGameState();
    },
    getSettingsField: function (field, defaultValue) {
        if (!this.gameState.settings || !this.gameState.settings.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.settings[field];
    },
    setMusic: function (newBoolean) {
        this.setSettingsField('music', newBoolean);
        this.emitChangeMusicAndSFX();
    },
    getMusic: function () {
        return this.getSettingsField('music', true);
    },
    setSound: function (newBoolean) {
        this.setSettingsField('sound', newBoolean);
        this.emitChangeMusicAndSFX();
    },
    getSound: function () {
        return this.getSettingsField('sound', true);
    },

    setPracticeRoundComplete: function (newBoolean) {
        if (!this.gameState.practiceRound) {
            this.gameState.practiceRound = {};
        }

        this.gameState.practiceRound.complete = newBoolean;

        this.saveGameState();
    },
    getPracticeRoundComplete: function () {
        if (!this.gameState.practiceRound || !this.gameState.practiceRound.hasOwnProperty("complete")) {
            return false;
        }

        return this.gameState.practiceRound.complete;
    },
    setPracticeRoundField: function (field, newValue) {
        if (!this.gameState.practiceRound) {
            this.gameState.practiceRound = {};
        }

        if (!this.gameState.practiceRound[router.getLanguage()]) {
            this.gameState.practiceRound[router.getLanguage()] = {};
        }

        this.gameState.practiceRound[router.getLanguage()][field] = newValue;

        this.saveGameState();
    },
    getPracticeRoundField: function (field, defaultValue) {
        if (!this.gameState.practiceRound[router.getLanguage()] || !this.gameState.practiceRound[router.getLanguage()].hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.practiceRound[router.getLanguage()][field];
    },

    setRoundsBundles: function (bundleIndex, field, newValue) {
        if (!this.gameState.roundsBundles) {
            this.gameState.roundsBundles = {};
        }

        if (!this.gameState.roundsBundles.hasOwnProperty(router.getLanguage())) {
            this.gameState.roundsBundles[router.getLanguage()] = {};
        }

        if (!this.gameState.roundsBundles[router.getLanguage()].hasOwnProperty(bundleIndex)) {
            this.gameState.roundsBundles[router.getLanguage()][bundleIndex] = {};
        }

        this.gameState.roundsBundles[router.getLanguage()][bundleIndex][field] = newValue;

        this.saveGameState();
        this.emitChangeRoundsBundles();
    },
    getRoundsBundles: function (bundleIndex) {
        if (!this.gameState.roundsBundles || !this.gameState.roundsBundles[router.getLanguage()]) {
            return false;
        }

        if (typeof bundleIndex == 'undefined') {
            return this.gameState.roundsBundles[router.getLanguage()];
        }

        if (!this.gameState.roundsBundles[router.getLanguage()].hasOwnProperty(bundleIndex)) {
            return false;
        }

        return this.gameState.roundsBundles[router.getLanguage()][bundleIndex];
    },
    setRound: function (bundleIndex, roundIndex, field, newValue) {
        if (!this.gameState.roundsBundles) {
            this.gameState.roundsBundles = {};
        }

        if (!this.gameState.roundsBundles[router.getLanguage()]) {
            this.gameState.roundsBundles[router.getLanguage()] = {};
        }

        if (!this.gameState.roundsBundles[router.getLanguage()][bundleIndex]) {
            this.gameState.roundsBundles[router.getLanguage()][bundleIndex] = {};
        }

        if (!this.gameState.roundsBundles[router.getLanguage()][bundleIndex].hasOwnProperty("rounds")) {
            this.gameState.roundsBundles[router.getLanguage()][bundleIndex].rounds = {};
        }

        if (!this.gameState.roundsBundles[router.getLanguage()][bundleIndex].rounds[roundIndex]) {
            this.gameState.roundsBundles[router.getLanguage()][bundleIndex].rounds[roundIndex] = {};
        }

        this.gameState.roundsBundles[router.getLanguage()][bundleIndex].rounds[roundIndex][field] = newValue;

        this.saveGameState();
    },
    getRound: function (bundleIndex, roundIndex) {
        if (!this.gameState.roundsBundles || !this.gameState.roundsBundles[router.getLanguage()]) {
            return false;
        }

        if (typeof bundleIndex == 'undefined') {
            return this.gameState.roundsBundles[router.getLanguage()];
        }

        if (!this.gameState.roundsBundles[router.getLanguage()][bundleIndex]) {
            return false;
        }

        if (typeof roundIndex == 'undefined') {
            return this.gameState.roundsBundles[router.getLanguage()][bundleIndex];
        }

        if (!this.gameState.roundsBundles[router.getLanguage()][bundleIndex].rounds) {
            return false;
        }

        if (!this.gameState.roundsBundles[router.getLanguage()][bundleIndex].rounds[roundIndex]) {
            return false;
        }

        return this.gameState.roundsBundles[router.getLanguage()][bundleIndex].rounds[roundIndex];
    },




    addChangeMusicAndSFXListener: function(callback){
        this.on(EVENT_CHANGE_MUSICANDSFX, callback);
    },
    removeChangeMusicAndSFXListener: function(callback){
        this.removeListener(EVENT_CHANGE_MUSICANDSFX, callback);
    },
    emitChangeMusicAndSFX: function(){
        this.emit(EVENT_CHANGE_MUSICANDSFX, this);
    },


    addChangeRoundsBundlesListener: function(callback){
        this.on(EVENT_CHANGE_ROUNDS_BUNDLES, callback);
    },
    removeChangeRoundsBundlesListener: function(callback){
        this.removeListener(EVENT_CHANGE_ROUNDS_BUNDLES, callback);
    },
    emitChangeRoundsBundles: function(){
        this.emit(EVENT_CHANGE_ROUNDS_BUNDLES, this);
    },


    addChangeCoinsListener: function(callback){
        this.on(EVENT_CHANGE_COINS, callback);
    },
    removeChangeCoinsListener: function(callback){
        this.removeListener(EVENT_CHANGE_COINS, callback);
    },
    emitChangeCoins: function(){
        this.emit(EVENT_CHANGE_COINS, this);
    },


    addChangeRemoveAdsListener: function(callback){
        this.on(EVENT_REMOVE_ADS, callback);
    },
    removeChangeRemoveAdsListener: function(callback){
        this.removeListener(EVENT_REMOVE_ADS, callback);
    },
    emitChangeRemoveAds: function(){
        this.emit(EVENT_REMOVE_ADS, this);
    }

});
module.exports = GameState;