var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};

const MUSIC_FILE_NAME = 'music1.mp3';
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
        if(!appManager.getGameState().getMusic()){
            this.stop();
        }else{
            this.play();
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

module.exports = AppMusic;



