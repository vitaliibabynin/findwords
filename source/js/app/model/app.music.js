var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

module.exports = {};

var AbstractSound = Object.assign({}, AbstractEventEmitter, {
    playSoundEnabled: false,

    init: function(){
        appManager.getGameState().addChangeMusicAndSFXListener(this.updateSoundSettings.bind(this));
        this.updateSoundSettings();
    },

    canPlay: function(){
        return this.playSoundEnabled;
    },

    updateSoundSettings: function(){
        if(!this.canPlay()){
            this.stop();
        }else{
            this.play();
        }
    },

    getSoundPath: function(soundFileName){
        throw 'AbstractSound.getSoundPath not implemented.';
    },

    play: function (soundFileName) {
        throw 'AbstractSound.play not implemented.';
    },

    stop: function(){
        throw 'AbstractSound.stop not implemented.';
    }
});

var SiteSound = Object.assign({}, AbstractSound, {
    init: function(){
        AbstractSound.init.call(this);
    },

    updateSoundSettings: function(){
        this.playSoundEnabled = appManager.getGameState().getSound();
        AbstractSound.updateSoundSettings.call(this);
    },

    getPlayer: function () {
        var player = document.createElement('audio');
        player.preload = "auto";

        return player;
    },

    getSoundPath: function(soundFileName){
        return Utils.getStaticPath() + CONST.STATIC_MUSIC_URL + soundFileName;
    },

    play: function (soundFileName) {
        if (!this.canPlay()) {
            return;
        }

        var player = this.getPlayer();
        player.src = this.getSoundPath(soundFileName);
        player.play();
    },

    stop: function () {
        var player = this.getPlayer();
        if (player.duration > 0 && !player.paused) {
            player.pause();
        }
    }
});

var CordovaSound = Object.assign({}, AbstractSound, {
    init: function(){
        AbstractSound.init.call(this);
    },

    updateSoundSettings: function(){
        this.playSoundEnabled = appManager.getGameState().getSound();
        AbstractSound.updateSoundSettings.call(this);
    },

    prepareSound: function(sound){
        this.getPlayer().preloadSimple(
            sound,
            this.getSoundPath(sound),
            function(msg){
                console.log('success:' + msg);
            }, function(msg){
                console.log('error: ' + msg);
            }
        );
    },

    getPlayer: function () {
        return window.plugins.NativeAudio;
    },

    getSoundPath: function(soundFileName){
        return CONST.STATIC_MUSIC_URL + soundFileName;
    },

    play: function (soundFileName) {
        if (!this.canPlay()) {
            return;
        }

        var player = this.getPlayer();
        player.play(soundFileName);
    },

    stop: function () {

    },

    unload: function(soundFileName){
        this.getPlayer().unload(soundFileName);
    }
});

var SiteMusic = Object.assign({}, SiteSound, {
    player: null,
    lastSound: null,

    updateSoundSettings: function(){
        this.playSoundEnabled = appManager.getGameState().getMusic();
        AbstractSound.updateSoundSettings.call(this);
    },

    setDefaultSound: function(soundFileName){
        this.lastSound = soundFileName;
    },

    getPlayer: function () {
        if(null == this.player){
            this.player = SiteSound.getPlayer.call(this);
            if (typeof this.player.loop == 'boolean') {
                this.player.loop = true;
            } else {
                this.player.addEventListener('ended', function () {
                    this.player.currentTime = 0;
                    this.play();
                }.bind(this), false);
            }
        }

        return this.player;
    },

    play: function (soundFileName) {
        if(soundFileName && soundFileName != this.lastSound){
            this.stop();
            this.lastSound = soundFileName;
        }

        if (!this.canPlay()) {
            return;
        }

        if(!soundFileName){
            soundFileName = this.lastSound;
        }

        var player = this.getPlayer();
        player.src = this.getSoundPath(soundFileName);
        player.play();
    }
});

var CordovaMusic = Object.assign({}, CordovaSound, {
    lastSound: null,

    init: function(){
        AbstractSound.init.call(this);

        document.addEventListener("pause", this.onPause.bind(this), false);
        document.addEventListener("resume", this.onResume.bind(this), false);
    },

    onPause: function(){
        this.stop();
    },

    onResume: function(){
        this.play();
    },

    setDefaultSound: function(soundFileName){
        this.lastSound = soundFileName;
    },

    updateSoundSettings: function(){
        this.playSoundEnabled = appManager.getGameState().getMusic();
        AbstractSound.updateSoundSettings.call(this);
    },

    prepareSound: function(sound, onSuccess, onError){
        this.getPlayer().preloadComplex(
            sound,
            this.getSoundPath(sound),
            1,
            1,
            0,
            function(msg){
                console.log('success:' + msg);
                onSuccess(msg);
            }, function(msg){
                console.log( 'error: ' + msg );
                onError(msg);
            }
        );
    },

    play: function (soundFileName) {
        if(soundFileName && soundFileName != this.lastSound){
            this.stop();
            this.lastSound = soundFileName;
        }

        if (!this.canPlay()) {
            return;
        }

        if(!soundFileName){
            soundFileName = this.lastSound;
        }

        this.prepareSound(soundFileName, function(){
            var player = this.getPlayer();
            player.loop(soundFileName);
        }.bind(this));
    },

    stop: function () {
        try{
            this.getPlayer().stop(this.lastSound);
            this.unload(this.lastSound);
        }catch(e){
            console.log(e.getMessage());
        }

    }
});




const MUSIC_FILE_NAME = 'music_main_menu.mp3';
const MUSIC_GAME_FILE_NAME = 'music_game.mp3';
var AppMusic = function(platform){
    var soundManager = null;
    switch(platform){
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            soundManager = CordovaMusic;
            break;

        case CONST.PLATFORM_SITE:
        default:
            soundManager = SiteMusic;
            break;
    }

    soundManager.setDefaultSound(MUSIC_FILE_NAME);

    soundManager.playMusic = function () {
        this.play(MUSIC_FILE_NAME);
    }

    soundManager.playGameMusic = function () {
        this.play(MUSIC_GAME_FILE_NAME);
    }

    return soundManager;
}
module.exports.AppMusic = AppMusic;


const SFX_BUTTON = 'button.mp3';
const SFX_BUTTON_GAME = 'button_game.mp3';
const SFX_BUTTON_GAME_CORRECT = 'button_game_correct.wav';
const SFX_BUTTON_GAME_WRONG = 'button_game_wrong.mp3';
const SFX_WIN = 'win.mp3';
var AppSFX = function(platform){
    var soundManager = null;
    switch(platform){
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            soundManager = CordovaSound;
            soundManager.prepareSound(SFX_BUTTON);
            soundManager.prepareSound(SFX_BUTTON_GAME);
            soundManager.prepareSound(SFX_BUTTON_GAME_CORRECT);
            soundManager.prepareSound(SFX_BUTTON_GAME_WRONG);
            soundManager.prepareSound(SFX_WIN);
            break;

        case CONST.PLATFORM_SITE:
        default:
            soundManager = SiteSound;
            break;
    }

    soundManager.playButton = function () {
        this.play(SFX_BUTTON);
    }

    soundManager.playButtonGameCorrect = function () {
        this.play(SFX_BUTTON_GAME_CORRECT);
    }

    soundManager.playButtonGameWrong = function () {
        this.play(SFX_BUTTON_GAME_WRONG);
    }

    soundManager.playWin = function () {
        this.play(SFX_WIN);
    }

    soundManager.playButtonGame = function () {
        this.play(SFX_BUTTON_GAME);
    }

    return soundManager;
}
module.exports.AppSFX = AppSFX;
