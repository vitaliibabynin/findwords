var Object = {assign: require('react/lib/Object.assign')};

var SETTINGS_GAMESTATE = 'game_state';

var GameState = Object.assign({}, {}, {

    propTypes: {
        gameState: React.PropTypes.shape({

            settings: {
                music: React.PropTypes.bool,
                sound: React.PropTypes.bool,
                score: React.PropTypes.number,
                coins: React.PropTypes.number
            }

        })
    },

    gameState: {

        settings: {
            music: true,
            sound: true,
            score: 0,
            coins: 0
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

    setSound: function (newBoolean) {
        this.setSettingsField('sound', newBoolean);
    },

    setScore: function (newNumber) {
        this.setSettingsField('score', newNumber)
    },

    setCoins: function (newNumber) {
        this.setSettingsField('coins', newNumber)
    },

    getMusic: function () {
        return this.getSettingsField('music', true);
    },

    getSound: function () {
        return this.getSettingsField('sound', true);
    },

    getScore: function () {
        return this.getSettingsField('score', 0);
    },

    getCoins: function () {
        return this.getSettingsField('coins', 0);
    }

});

module.exports = GameState;



