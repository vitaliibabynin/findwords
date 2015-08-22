
var Object = {assign: require('react/lib/Object.assign')};

var SETTINGS_GAMESTATE = 'game_state';

var GameState = Object.assign({}, {}, {

    gameState: {

        settings: {
            music: true,
            sound: true
        }

    },

    init: function(){
        return new Promise(function(resolve, reject){
            DB.getSettings().get(SETTINGS_GAMESTATE).then(function(gameState){
                if(gameState){
                    this.gameState = gameState;
                }

                return resolve();
            }.bind(this));
        }.bind(this));
    },

    saveGameState: function(){
        DB.getSettings().set(SETTINGS_GAMESTATE, this.gameState);
    },

    setSettingsField: function(field, newValue){
        this.gameState.settings[field] = newValue;
        this.saveGameState();
    },

    getSettingsField: function(field, defaultValue){
        if(!this.gameState.settings || !this.gameState.settings.hasOwnProperty(field)){
            return defaultValue;
        }

        return this.gameState.settings[field];
    },

    setMusic: function(newBoolean){
        this.setSettingsField('music', newBoolean);
    },

    setSound: function(newBoolean){
        this.setSettingsField('sound', newBoolean);
    },


    getMusic: function(){
        return this.getSettingsField('music', true);
    },

    getSound: function(){
        return this.getSettingsField('sound', true);
    }

});

module.exports = GameState;



