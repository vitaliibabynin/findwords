var Object = {assign: require('react/lib/Object.assign')};

var SETTINGS_GAMESTATE = 'game_state';

var GameState = Object.assign({}, {}, {

    gameState: {

        coins: 99999,
        score: 99999,
        chips: {
            openWord: 999,
            openLetter: 9,
            showWord: 99999
        },
        settings: {
            music: true,
            sound: true
        },
        roundsBundles: {
            0: {
                bundleScore: 99999,
                isUnlocked: true,
                roundsComplete: 1
            },
            1: {
                bundleScore: 99999,
                isUnlocked: false,
                roundsComplete: 2
            }
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

    setSettingsField: function (field, newValue) {
        this.gameState.settings[field] = newValue;
        this.saveGameState();
    },

    setRoundsBundles: function (bundleIndex, field, newValue) {
        this.gameState.roundsBundles[bundleIndex][field] = newValue;
    },

    setChipsField: function (field, newValue) {
        this.gameState.chips[field] = newValue;
        this.saveGameState();
    },

    getGameStateField: function (field, defaultValue) {
        if (!this.gameState || !this.gameState.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState[field];
    },

    getSettingsField: function (field, defaultValue) {
        if (!this.gameState.settings || !this.gameState.settings.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.settings[field];
    },

    getRoundsBundles: function (bundleIndex) {

        if (bundleIndex == 'undefined') {
            return this.gameState.roundsBundles;
        }

        if (!this.gameState.roundsBundles.hasOwnProperty(bundleIndex)) {
            return false;
        }

        return this.gameState.roundsBundles[bundleIndex];

    },

    getChipsField: function (field, defaultValue) {
        if (!this.gameState.chips || !this.gameState.chips.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.chips[field];
    },

    setScore: function (newNumber) {
        this.setGameStateField('score', newNumber)
    },

    setCoins: function (newNumber) {
        this.setGameStateField('coins', newNumber)
    },

    setMusic: function (newBoolean) {
        this.setSettingsField('music', newBoolean);
    },

    setSound: function (newBoolean) {
        this.setSettingsField('sound', newBoolean);
    },
    setOpenWord: function (newNumber) {
        this.setChipsField('openWord', newNumber);
    },
    setOpenLetter: function (newNumber) {
        this.setChipsField('openLetter', newNumber);
    },
    setShowWord: function (newNumber) {
        this.setChipsField('showWord', newNumber);
    },

    getScore: function () {
        return this.getGameStateField('score', 0);
    },

    getCoins: function () {
        return this.getGameStateField('coins', 0);
    },

    getMusic: function () {
        return this.getSettingsField('music', true);
    },

    getSound: function () {
        return this.getSettingsField('sound', true);
    },
    getOpenWord: function () {
        return this.getChipsField('openWord', 0);
    },
    getOpenLetter: function () {
        return this.getChipsField('openLetter', 0);
    },
    getShowWord: function () {
        return this.getChipsField('showWord', 0);
    }

});
module.exports = GameState;