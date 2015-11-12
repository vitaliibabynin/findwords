var Object = {assign: require('react/lib/Object.assign')};

var SETTINGS_GAMESTATE = 'game_state';

var GameState = Object.assign({}, {}, {

    gameState: {
        coins: 99999,
        score: 99999,
        bonus: {
            lastAccessDate: 0,
            daysPlayedStreak: 0
        },
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
                roundsComplete: 0,
                rounds: {
                    0: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    1: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    2: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    3: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    }
                }
            },
            1: {
                bundleScore: 9999,
                isUnlocked: false,
                roundsComplete: 0,
                rounds: {
                    0: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    1: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    2: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    3: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    }
                }
            },
            2: {
                bundleScore: 9999,
                isUnlocked: false,
                roundsComplete: 0,
                rounds: {
                    0: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    1: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    2: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    3: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    }
                }
            },
            3: {
                bundleScore: 9999,
                isUnlocked: false,
                roundsComplete: 0,
                rounds: {
                    0: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    1: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    2: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    },
                    3: {
                        board: {},
                        openedLetters: [],
                        shownWords: [],
                        starsReceived: 3,
                        secondsRemaining: 0
                    }
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
    setScore: function (newNumber) {
        this.setGameStateField('score', newNumber);
    },
    getScore: function () {
        return this.getGameStateField('score', 0);
    },
    setCoins: function (newNumber) {
        this.setGameStateField('coins', newNumber);
    },
    getCoins: function () {
        return this.getGameStateField('coins', 0);
    },

    setBonusField: function (field, newValue) {
        this.gameState.bonus[field] = newValue;
        this.saveGameState();
    },
    getBonusField: function (field, defaultValue) {
        if (!this.gameState.bonus || !this.gameState.bonus.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.bonus[field];
    },
    setLastAccessDate: function (newNumber) {
        this.setBonusField('lastAccessDate', newNumber);
    },
    getLastAccessDate: function () {
        return this.getBonusField('lastAccessDate', 0);
    },
    setDaysPlayedStreak: function (newNumber) {
        this.setBonusField('daysPlayedStreak', newNumber);
    },
    getDaysPlayedStreak: function () {
        return this.getBonusField('daysPlayedStreak', 1);
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
        if (typeof bundleIndex == 'undefined') {
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
        if (typeof bundleIndex == 'undefined') {
            return this.gameState.roundsBundles;
        }

        if (!this.gameState.roundsBundles.hasOwnProperty(bundleIndex)) {
            return false;
        }

        if (typeof roundIndex == 'undefined') {
            return this.gameState.roundsBundles[bundleIndex];
        }

        if (!this.gameState.roundsBundles[bundleIndex].rounds.hasOwnProperty(roundIndex)) {
            return false;
        }

        return this.gameState.roundsBundles[bundleIndex].rounds[roundIndex];
    }

});
module.exports = GameState;