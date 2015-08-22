
var Object = {assign: require('react/lib/Object.assign')};


var GameState = Object.assign({}, {}, {

    gameState: {

        settings: {

            buttonLayout: "menu",
            settings: false,
            languages: false,
            music: true,
            sound: true

        }

    },

    setButtonLayout: function(newValue){
        this.gameState.settings.buttonLayout = newValue;
    },

    setSettings: function(newBoolean){
        this.gameState.settings.settings = newBoolean;
    },

    setLanguages: function(newBoolean){
        this.gameState.settings.languages = newBoolean;
    },

    setMusic: function(newBoolean){
        this.gameState.settings.music = newBoolean;
    },

    setSound: function(newBoolean){
        this.gameState.settings.sound = newBoolean;
    },

    getButtonLayout: function(){
        return this.gameState.settings.buttonLayout;
    },

    getSettings: function(){
        return this.gameState.settings.settings;
    },

    getLanguages: function(){
        return this.gameState.settings.languages;
    },

    getMusic: function(){
        return this.gameState.settings.music;
    },

    getSound: function(){
        return this.gameState.settings.sound;
    }

});

module.exports = GameState;



