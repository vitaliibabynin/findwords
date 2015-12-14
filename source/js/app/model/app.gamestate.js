var Object = {assign: require('react/lib/Object.assign')};

var SETTINGS_GAMESTATE = 'game_state';

var GameState = Object.assign({}, {}, {

    gameState: {
        coins: 99999,
        score: 99999,
        bonus: {
            lastAccessDate: "",
            daysPlayedStreak: 0
        },
        //chips: {
        //    chipOpenWord: 999,
        //    chipOpenLetter: 9,
        //    chipShowWord: 99999
        //},
        settings: {
            music: true,
            sound: true
        },
        practiceRound: {
            complete: false,
            en: {
                board: {},
                openedLetters: [],
                starsReceived: 3,
                secondsRemaining: 0
            },
            ru: {
                board: {},
                openedLetters: [],
                starsReceived: 3,
                secondsRemaining: 0
            }
        },
        roundsBundles: {
            en: {
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
            },
            ru: {
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
    addCoins: function (coinsToAdd) {
        newTotalCoins = this.getCoins() + coinsToAdd;
        return this.setCoins(newTotalCoins);
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

    //setChipsField: function (field, newValue) {
    //    this.gameState.chips[field] = newValue;
    //    this.saveGameState();
    //},
    //getChipsField: function (field, defaultValue) {
    //    if (!this.gameState.chips || !this.gameState.chips.hasOwnProperty(field)) {
    //        return defaultValue;
    //    }
    //
    //    return this.gameState.chips[field];
    //},
    //setChipOpenWord: function (newNumber) {
    //    this.setChipsField('chipOpenWord', newNumber);
    //},
    //getChipOpenWord: function () {
    //    return this.getChipsField('chipOpenWord', 0);
    //},
    //setChipOpenLetter: function (newNumber) {
    //    this.setChipsField('chipOpenLetter', newNumber);
    //},
    //getChipOpenLetter: function () {
    //    return this.getChipsField('chipOpenLetter', 0);
    //},
    //setChipShowWord: function (newNumber) {
    //    this.setChipsField('chipShowWord', newNumber);
    //},
    //getChipShowWord: function () {
    //    return this.getChipsField('chipShowWord', 0);
    //},

    setPracticeRoundComplete: function (newBoolean) {
        this.gameState.practiceRound.complete = newBoolean;
        this.saveGameState();
    },
    getPracticeRoundComplete: function () {
        if (!this.gameState.practiceRound || !this.gameState.practiceRound.hasOwnProperty("complete")) {
            return false;
        }

        return this.gameState.practiceRound.complete;
    },
    setPracticeRoundFieldEn: function (field, newValue) {
        this.gameState.practiceRound.en[field] = newValue;
        this.saveGameState();
    },
    getPracticeRoundFieldEn: function (field, defaultValue) {
        if (!this.gameState.practiceRound.en || !this.gameState.practiceRound.en.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.practiceRound.en[field];
    },
    setPracticeRoundFieldRu: function (field, newValue) {
        this.gameState.practiceRound.ru[field] = newValue;
        this.saveGameState();
    },
    getPracticeRoundFieldRu: function (field, defaultValue) {
        if (!this.gameState.practiceRound.ru || !this.gameState.practiceRound.ru.hasOwnProperty(field)) {
            return defaultValue;
        }

        return this.gameState.practiceRound.ru[field];
    },

    setRoundsBundles: function (bundleIndex, field, newValue) {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return this.setRoundsBundlesEn(bundleIndex, field, newValue);
                break;
            case CONST.LANGUAGE_RU:
                return this.setRoundsBundlesRu(bundleIndex, field, newValue);
                break;
            default:
                return;
        }
    },
    getRoundsBundles: function (bundleIndex, field, newValue) {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return this.getRoundsBundlesEn(bundleIndex, field, newValue);
                break;
            case CONST.LANGUAGE_RU:
                return this.getRoundsBundlesRu(bundleIndex, field, newValue);
                break;
            default:
                return;
        }
    },
    setRound: function (bundleIndex, roundIndex, field, newValue) {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return this.setRoundEn(bundleIndex, roundIndex, field, newValue);
                break;
            case CONST.LANGUAGE_RU:
                return this.setRoundRu(bundleIndex, roundIndex, field, newValue);
                break;
            default:
                return;
        }
    },
    getRound: function (bundleIndex, roundIndex) {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return this.getRoundEn(bundleIndex, roundIndex);
                break;
            case CONST.LANGUAGE_RU:
                return this.getRoundRu(bundleIndex, roundIndex);
                break;
            default:
                return;
        }
    },
    setRoundsBundlesEn: function (bundleIndex, field, newValue) {
        this.gameState.roundsBundles.en[bundleIndex][field] = newValue;
        this.saveGameState();
    },
    getRoundsBundlesEn: function (bundleIndex) {
        if (typeof bundleIndex == 'undefined') {
            return this.gameState.roundsBundles.en;
        }

        if (!this.gameState.roundsBundles.en.hasOwnProperty(bundleIndex)) {
            return false;
        }

        return this.gameState.roundsBundles.en[bundleIndex];
    },
    setRoundsBundlesRu: function (bundleIndex, field, newValue) {
        this.gameState.roundsBundles.ru[bundleIndex][field] = newValue;
        this.saveGameState();
    },
    getRoundsBundlesRu: function (bundleIndex) {
        if (typeof bundleIndex == 'undefined') {
            return this.gameState.roundsBundles.ru;
        }

        if (!this.gameState.roundsBundles.ru.hasOwnProperty(bundleIndex)) {
            return false;
        }

        return this.gameState.roundsBundles.ru[bundleIndex];
    },
    setRoundEn: function (bundleIndex, roundIndex, field, newValue) {
        this.gameState.roundsBundles.en[bundleIndex].rounds[roundIndex][field] = newValue;
        this.saveGameState();
    },
    getRoundEn: function (bundleIndex, roundIndex) {
        if (typeof bundleIndex == 'undefined') {
            return this.gameState.roundsBundles.en;
        }

        if (!this.gameState.roundsBundles.en.hasOwnProperty(bundleIndex)) {
            return false;
        }

        if (typeof roundIndex == 'undefined') {
            return this.gameState.roundsBundles.en[bundleIndex];
        }

        if (!this.gameState.roundsBundles.en[bundleIndex].rounds.hasOwnProperty(roundIndex)) {
            return false;
        }

        return this.gameState.roundsBundles.en[bundleIndex].rounds[roundIndex];
    },
    setRoundRu: function (bundleIndex, roundIndex, field, newValue) {
        this.gameState.roundsBundles.ru[bundleIndex].rounds[roundIndex][field] = newValue;
        this.saveGameState();
    },
    getRoundRu: function (bundleIndex, roundIndex) {
        if (typeof bundleIndex == 'undefined') {
            return this.gameState.roundsBundles.ru;
        }

        if (!this.gameState.roundsBundles.ru.hasOwnProperty(bundleIndex)) {
            return false;
        }

        if (typeof roundIndex == 'undefined') {
            return this.gameState.roundsBundles.ru[bundleIndex];
        }

        if (!this.gameState.roundsBundles.ru[bundleIndex].rounds.hasOwnProperty(roundIndex)) {
            return false;
        }

        return this.gameState.roundsBundles.ru[bundleIndex].rounds[roundIndex];
    }

});
module.exports = GameState;