var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

module.exports = {};


const MUSIC_FILE_NAME = 'music_main_menu.mp3';
const MUSIC_GAME_FILE_NAME = 'music_game.mp3';

var AppMusic = Object.assign({}, AbstractEventEmitter, {

    audioPlayer: null,

    getPlayer: function(){
        if(null == this.audioPlayer){
            this.audioPlayer = document.createElement('audio');

            if (typeof this.audioPlayer.loop == 'boolean') {
                this.audioPlayer.loop = true;
            } else {
                this.audioPlayer.addEventListener('ended', function() {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }

            appManager.getGameState().addChangeMusicAndSFXListener(this.updateMusicSettings.bind(this));
        }

        return this.audioPlayer;
    },

    updateMusicSettings: function(){
        if (appManager.getGameState().getMusic()) {
            var player = this.getPlayer();
            if (player.duration > 0 && !player.paused) {
                return;
            }

            this.play();
        } else {
            this.stop();
        }
    },

    stop: function(){
        var player = this.getPlayer();
        if(player.duration > 0 && !player.paused){
            //player.stop();
            player.pause();
            //player.currentTime = 0;
        }
    },

    play: function(fileName){
        if(!appManager.getGameState().getMusic()){
            this.stop();
            return;
        }

        fileName = fileName || MUSIC_FILE_NAME;

        var player = this.getPlayer();

        //player.stop();
        player.src = Utils.getStaticPath() + CONST.STATIC_MUSIC_URL + fileName;
        player.play();
    },

    playMusic: function(){
        this.play(MUSIC_FILE_NAME);
    },

    playGameMusic: function(){
        this.play(MUSIC_GAME_FILE_NAME);
    }

});

module.exports.AppMusic = AppMusic;


const MUSIC_BUTTON = 'button.mp3';
const MUSIC_BUTTON_GAME = 'button_game.mp3';
const MUSIC_BUTTON_GAME_CORRECT = 'button_game_correct.mp3';
const MUSIC_BUTTON_GAME_WRONG = 'button_game_wrong.mp3';
const MUSIC_WIN = 'win.mp3';

var AppSound = Object.assign({}, AbstractEventEmitter, {

    SFXPlayer: null,

    getPlayer: function(){
        if(null == this.SFXPlayer){
            this.SFXPlayer = document.createElement('audio');

            appManager.getGameState().addChangeMusicAndSFXListener(this.updateSoundSettings.bind(this));
        }

        return this.SFXPlayer;
    },

    updateSoundSettings: function(){
        if(!appManager.getGameState().getSound()){
            this.stopSoundEffect();
        }
    },

    stopSoundEffect: function(){
        var player = this.getPlayer();

        if(player.duration > 0 && !player.paused){
            player.pause();
        }
    },

    playSoundEffect: function (fileName) {
        if(!appManager.getGameState().getSound()){
            this.stopSoundEffect();
            return;
        }

        if (typeof fileName == "undefined") {
            return;
        }

        var player = this.getPlayer();

        player.src = Utils.getStaticPath() + CONST.STATIC_MUSIC_URL + fileName;
        player.play();
    },

    playButton: function(){
        this.playSoundEffect(MUSIC_BUTTON);
    },

    playButtonGame: function(){
        this.playSoundEffect(MUSIC_BUTTON_GAME);
    },

    playButtonGameCorrect: function(){
        this.playSoundEffect(MUSIC_BUTTON_GAME_CORRECT);
    },

    playButtonGameWrong: function(){
        this.playSoundEffect(MUSIC_BUTTON_GAME_WRONG);
    },

    playWin: function(){
        this.playSoundEffect(MUSIC_WIN);
    }

});

module.exports.AppSound = AppSound;

