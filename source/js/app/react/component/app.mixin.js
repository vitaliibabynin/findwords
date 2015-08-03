/** @jsx React.DOM */
"use strict";


module.exports = {};


var GameMixin = {

    getWindowWidth: function(){
        return window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
    },

    getImageSize: function(imgName){
        var imtSufix = '';
        if(window.devicePixelRatio >= 1.5){
            imtSufix = "@1.5x";
        }

        if(this.getWindowWidth() >= 600 || window.devicePixelRatio >= 2){
            imtSufix = "@2x";
        }

        imgName += imtSufix;

        return imgName;
    },

    getImagePath: function(imgName, ext){
        ext = ext || ".png";

        return Utils.getImgPath(this.getImageSize(imgName) + ext);
    },

    getPressedImagePath: function(imgName, ext){
        ext = ext || ".png";

        imgName += "_pressed";

        return Utils.getImgPath(this.getImageSize(imgName) + ext);
    }

}
module.exports.GameMixin = GameMixin;

