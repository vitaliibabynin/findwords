var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

module.exports = {};


const MUSIC_FILE_NAME = 'music_main_menu.mp3';
module.exports.MUSIC_FILE_NAME = MUSIC_FILE_NAME;

const MUSIC_GAME_FILE_NAME = 'music_game.mp3';

var AppMusic = Object.assign({}, AbstractEventEmitter, {

    audioPlayer: null,

    getPlayer: function () {
        if (null == this.audioPlayer) {
            this.audioPlayer = document.createElement('audio');

            if (typeof this.audioPlayer.loop == 'boolean') {
                this.audioPlayer.loop = true;
            } else {
                this.audioPlayer.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
            }

            appManager.getGameState().addChangeMusicAndSFXListener(this.updateMusicSettings.bind(this));
        }

        return this.audioPlayer;
    },

    updateMusicSettings: function () {
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

    stop: function () {
        var player = this.getPlayer();
        if (player.duration > 0 && !player.paused) {
            //player.stop();
            player.pause();
            //player.currentTime = 0;
        }
    },

    play: function (fileName) {
        if (!appManager.getGameState().getMusic()) {
            this.stop();
            return;
        }

        fileName = fileName || MUSIC_FILE_NAME;

        var player = this.getPlayer();

        //player.stop();
        player.src = Utils.getStaticPath() + CONST.STATIC_MUSIC_URL + fileName;
        player.play();
    },

    playMusic: function () {
        this.play(MUSIC_FILE_NAME);
        this.currentMusic = MUSIC_FILE_NAME;
    },

    playGameMusic: function () {
        this.play(MUSIC_GAME_FILE_NAME);
        this.currentMusic = MUSIC_GAME_FILE_NAME;
    }

});

module.exports.AppMusic = AppMusic;


const MUSIC_BUTTON = 'button.mp3';
const MUSIC_BUTTON_GAME = 'button_game.mp3';
const MUSIC_BUTTON_GAME_CORRECT = 'button_game_correct.wav';
const MUSIC_BUTTON_GAME_WRONG = 'button_game_wrong.mp3';
const MUSIC_WIN = 'win.mp3';
const MUSIC_MIX_SOUND = 'mix_sound.mp3';

var AppSound = Object.assign({}, AbstractEventEmitter, {

    buttonGamePlayer: null,
    SFXPlayer: null,
    segmentEnd: null,
    SFXTimes: [
        {name: MUSIC_BUTTON, timeStart: 0, timeStop: 0.182},
        {name: MUSIC_BUTTON_GAME_CORRECT, timeStart: 0.364, timeStop: 1.253},
        {name: MUSIC_BUTTON_GAME_WRONG, timeStart: 1.253, timeStop: 1.6},
        {name: MUSIC_WIN, timeStart: 1.6, timeStop: 3.689}
    ],

    getPlayer: function () {
        if (null == this.SFXPlayer) {
            this.SFXPlayer = document.createElement('audio');
            this.SFXPlayer.src = Utils.getStaticPath() + CONST.STATIC_MUSIC_URL + MUSIC_MIX_SOUND;
            this.SFXPlayer.preload = "auto";


            appManager.getGameState().addChangeMusicAndSFXListener(this.updateSoundSettings.bind(this));

            this.SFXPlayer.addEventListener('timeupdate', function (){
                if (this.segmentEnd && this.SFXPlayer.currentTime >= this.segmentEnd) {
                    this.SFXPlayer.pause();
                }
                console.log(this.SFXPlayer.currentTime);
            }.bind(this), false);
        }

        return this.SFXPlayer;
    },

    getButtonGamePlayer: function () {
        if (null == this.buttonGamePlayer) {
            this.buttonGamePlayer = document.createElement('audio');
            this.buttonGamePlayer.src = Utils.getStaticPath() + CONST.STATIC_MUSIC_URL + MUSIC_BUTTON_GAME;
            this.buttonGamePlayer.preload = "auto";

            appManager.getGameState().addChangeMusicAndSFXListener(this.updateSoundSettings.bind(this));
        }

        return this.buttonGamePlayer;
    },

    updateSoundSettings: function () {
        if (!appManager.getGameState().getSound()) {
            this.stopSoundEffect();
        }
    },

    stopSoundEffect: function () {
        var player = this.getPlayer();
        if (player.duration > 0 && !player.paused) {
            player.pause();
        }

        player = this.getButtonGamePlayer();
        if (player.duration > 0 && !player.paused) {
            player.pause();
        }
    },

    playSoundEffect: function (timeStart, timeStop) {
        if (!appManager.getGameState().getSound()) {
            this.stopSoundEffect();
            return;
        }

        if (typeof timeStart == "undefined" || typeof timeStop == "undefined") {
            return;
        }

        var player = this.getPlayer();
        this.segmentEnd = timeStop;
        player.currentTime = timeStart;
        player.play();
    },

    getSoundEffectTimes: function (name) {
        for (var i = 0; i < this.SFXTimes.length; i++) {
            if (this.SFXTimes[i].name == name) {
                return this.SFXTimes[i];
            }
        }

        return false;
    },

    playButton: function () {
        var times = this.getSoundEffectTimes(MUSIC_BUTTON);
        if (times === false) {
            return;
        }

        this.playSoundEffect(times.timeStart, times.timeStop);
    },

    playButtonGameCorrect: function () {
        var times = this.getSoundEffectTimes(MUSIC_BUTTON_GAME_CORRECT);
        if (times === false) {
            return;
        }

        this.playSoundEffect(times.timeStart, times.timeStop);
    },

    playButtonGameWrong: function () {
        var times = this.getSoundEffectTimes(MUSIC_BUTTON_GAME_WRONG);
        if (times === false) {
            return;
        }

        this.playSoundEffect(times.timeStart, times.timeStop);
    },

    playWin: function () {
        var times = this.getSoundEffectTimes(MUSIC_WIN);
        if (times === false) {
            return;
        }

        this.playSoundEffect(times.timeStart, times.timeStop);
    },

    playButtonGame: function () {
        if (!appManager.getGameState().getSound()) {
            this.stopSoundEffect();
            return;
        }

        var player = this.getButtonGamePlayer();
        player.cloneNode(true).play();
    }

});

module.exports.AppSound = AppSound;


//var AppSound = Object.assign({}, AbstractEventEmitter, {
//
//    ButtonGamePlayer: null,
//
//    getPlayer: function () {
//
//    },
//
//    updateSoundSettings: function () {
//        if (!appManager.getGameState().getSound()) {
//            this.stopSoundEffect();
//        }
//    },
//
//    stopSoundEffect: function () {
//        var player = this.getPlayer();
//
//        if (player.duration > 0 && !player.paused) {
//            player.pause();
//        }
//    },
//
//    playSoundEffect: function (fileName) {
//        if (!appManager.getGameState().getSound()) {
//            this.stopSoundEffect();
//            return;
//        }
//        //
//        //if (typeof fileName == "undefined") {
//        //    return;
//        //}
//        //
//        var player = this.getPlayer();
//
//        player.cloneNode(true).play();
//    },
//
//    playButton: function () {
//        this.playSoundEffect(MUSIC_BUTTON);
//    },
//
//    playButtonGame: function () {
//        this.playSoundEffect(MUSIC_BUTTON_GAME);
//    },
//
//    playButtonGameCorrect: function () {
//        this.playSoundEffect(MUSIC_BUTTON_GAME_CORRECT);
//    },
//
//    playButtonGameWrong: function () {
//        this.playSoundEffect(MUSIC_BUTTON_GAME_WRONG);
//    },
//
//    playWin: function () {
//        this.playSoundEffect(MUSIC_WIN);
//    }
//
//});
//
//module.exports.AppSound = AppSound;

