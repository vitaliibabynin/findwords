var Object = {assign: require('react/lib/Object.assign')};

var SETTINGS_GAMESTATE = 'game_state';

var GameState = Object.assign({}, {}, {

    gameState: {

        coins: 99999,
        score: 99999,
        chips: {
            chipOpenWord: 999,
            chipOpenLetter: 9,
            chipShowWord: 99999
        },
        settings: {
            music: true,
            sound: true
        },
        roundsBundles: {
            0: {
                bundleScore: 99999,
                isUnlocked: true,
                roundsComplete: 1,
                rounds: {
                    0: {
                        board: {
                            0: {
                                color: "backgroundColor7",
                                openWord: false
                            },
                            2: {
                                color: "backgroundColor5",
                                openWord: false
                            }
                        },
                        openedLetters: [{x: 0, y: 0}, {x: 1, y: 0}],
                        shownWords: []
                    },
                    1: {},
                    2: {}
                }
            },
            1: {
                bundleScore: 99999,
                isUnlocked: false,
                roundsComplete: 2,
                rounds: {
                    0: {
                        board: {
                            0: {
                                color: '#000000',
                                openWord: true
                            },
                            2: {
                                color: '#000000',
                                openWord: false
                            }
                        },
                        //completedWords: [],
                        openedLetters: [{x:0, y:1}, {x:4, y:3}],
                        shownWords: []
                    },
                    1: {},
                    2: {}
                }
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
    getGameStateField: function (field, defaultValue) {
        if (!this.gameState || !this.gameState.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState[field];
    },

    setSettingsField: function (field, newValue) {
        this.gameState.settings[field] = newValue;
        this.saveGameState();
    },
    getSettingsField: function (field, defaultValue) {
        if (!this.gameState.settings || !this.gameState.settings.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.settings[field];
    },
    setScore: function (newNumber) {
        this.setGameStateField('score', newNumber)
    },
    getScore: function () {
        return this.getGameStateField('score', 0);
    },
    setCoins: function (newNumber) {
        this.setGameStateField('coins', newNumber)
    },
    getCoins: function () {
        return this.getGameStateField('coins', 0);
    },
    setMusic: function (newBoolean) {
        this.setSettingsField('music', newBoolean);
    },
    getMusic: function () {
        return this.getSettingsField('music', true);
    },
    setSound: function (newBoolean) {
        this.setSettingsField('sound', newBoolean);
    },
    getSound: function () {
        return this.getSettingsField('sound', true);
    },

    setChipsField: function (field, newValue) {
        this.gameState.chips[field] = newValue;
        this.saveGameState();
    },
    getChipsField: function (field, defaultValue) {
        if (!this.gameState.chips || !this.gameState.chips.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.chips[field];
    },
    setChipOpenWord: function (newNumber) {
        this.setChipsField('chipOpenWord', newNumber);
    },
    getChipOpenWord: function () {
        return this.getChipsField('chipOpenWord', 0);
    },
    setChipOpenLetter: function (newNumber) {
        this.setChipsField('chipOpenLetter', newNumber);
    },
    getChipOpenLetter: function () {
        return this.getChipsField('chipOpenLetter', 0);
    },
    setChipShowWord: function (newNumber) {
        this.setChipsField('chipShowWord', newNumber);
    },
    getChipShowWord: function () {
        return this.getChipsField('chipShowWord', 0);
    },

    setRoundsBundles: function (bundleIndex, field, newValue) {
        this.gameState.roundsBundles[bundleIndex][field] = newValue;
        this.saveGameState();
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
    setRound: function(bundleIndex, roundIndex, field, newValue){
        this.gameState.roundsBundles[bundleIndex].rounds[roundIndex][field] = newValue;
        this.saveGameState();
    },
    getRound: function (bundleIndex, roundIndex) {
        if (bundleIndex == 'undefined') {
            return this.gameState.roundsBundles;
        }

        if (!this.gameState.roundsBundles.hasOwnProperty(bundleIndex)) {
            return false;
        }

        if (roundIndex == 'undefined') {
            return this.gameState.roundsBundles[bundleIndex];
        }

        if (!this.gameState.roundsBundles[bundleIndex].rounds.hasOwnProperty(roundIndex)) {
            return false;
        }

        return this.gameState.roundsBundles[bundleIndex].rounds[roundIndex];
    }

});
module.exports = GameState;