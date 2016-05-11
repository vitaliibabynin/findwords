"use strict";

var StartAD = require('./../libs/ad/startad');


var Ad = function(currentPlatform, isCordovaApp){
    this.showIntersititalPeriod = CONST.AD_PERIOD_INTERSTITIAL * 1000;
    this.isCordovaApp = isCordovaApp || false;
    this.lastShowInterstitialTime = 0;
    this.settings = {};
    this.startAd = null;
    this.adRemoved = false;

    this.appodelInited = false;
    this.bottomBannerHeight = 0;

    this.init = function(){

        return new Promise(function(resolve, reject){
            this.settings = appManager.getSettings().getAdSettings();

            if(!this.settings){
                reject('Ad settings not defined.');
                return;
            }

            if(this.isCordovaApp){
                if(this.settings.hasOwnProperty("appodeal") && window.Appodeal){
                    Appodeal.setAutoCache(Appodeal.INTERSTITIAL | Appodeal.VIDEO | Appodeal.REWARDED_VIDEO, true);
                    Appodeal.disableLocationPermissionCheck();
                    Appodeal.initialize(this.settings.appodeal.appid, Appodeal.INTERSTITIAL | Appodeal.VIDEO | Appodeal.BANNER | Appodeal.REWARDED_VIDEO);
                    Appodeal.enableInterstitialCallbacks(true);
                    if(CONST.PLATFORM_ANDROID == currentPlatform){
                        Appodeal.enableSkippableVideoCallbacks(true);
                        Appodeal.enableNonSkippableVideoCallbacks(true);
                    }else if(CONST.PLATFORM_IOS == currentPlatform){
                        Appodeal.enableVideoCallbacks(true);
                    }
                    Appodeal.enableRewardedVideoCallbacks(true);

                    this.bottomBannerHeight = 50;

                    var screenWidth = this.getScreenWidth();
                    if(screenWidth >= 728){
                        this.bottomBannerHeight = 90;
                    }else if(screenWidth >= 468){
                        this.bottomBannerHeight = 60;
                    }

                    this.appodelInited = true;
                }
            }

            if(this.settings.hasOwnProperty("startAd")){
                this.startAd = new StartAD(this.settings.startAd.trim());
            }

            resolve();
        }.bind(this));

    }

    this.getScreenWidth = function(){
        return CONST.CURRENT_PLATFORM == CONST.PLATFORM_ANDROID ?
            parseInt(window.screen.width / window.devicePixelRatio)
            : window.screen.width;
    }

    this.setAdRemoved = function(adRemoved){
        this.adRemoved = adRemoved;
        if(adRemoved){
            this.hideBanner();
        }
    }

    this.setSettings = function(settings){
        this.settings = settings;

        this.init();
    }

    this.updateLastShowInterstitialTime = function(){
        this.lastShowInterstitialTime = Date.now() + this.showIntersititalPeriod;
    }



    this.getBottomBannerHeight = function(){
        return this.bottomBannerHeight;
    },

    this.showBottomBanner = function(){
        if(this.adRemoved){
            return false;
        }

        if(this.appodelInited) {
            Appodeal.show(Appodeal.BANNER_BOTTOM);
        }
    },

    this.hideBanner = function(){
        if(this.appodelInited) {
            Appodeal.hide(Appodeal.BANNER);
        }
    },

    this.showInterstitial = function(){
        if(this.adRemoved){
            return false;
        }

        if(this.appodelInited && this.isCordovaApp && this.lastShowInterstitialTime < Date.now()){
            Appodeal.isLoaded(Appodeal.VIDEO | Appodeal.INTERSTITIAL, function(result){
                console.log('isLoaded Appodeal.VIDEO | Appodeal.INTERSTITIAL', result);
                if(result){
                    Appodeal.show(Appodeal.VIDEO | Appodeal.INTERSTITIAL);
                    this.updateLastShowInterstitialTime();
                    return;
                }
            }.bind(this));
        }
    }


    this.canShowStartAdBanner = function(){
        if(this.adRemoved){
            return false;
        }

        if(!this.startAd) {
            return false;
        }

        return true;
    }

    this.getStartAd = function(){
        return this.startAd;
    }

    this.showStartAdBanner = function(layout){
        if(this.canShowStartAdBanner()) {
            this.startAd.setZoom($('html').css('zoom'));
            this.startAd.showAd(layout, {language: router.getLanguage() });
        }
    }


    this.showRewardedVideo = function(){
        return new Promise(function(resolve, reject){

            if(this.appodelInited){
                Appodeal.isLoaded(Appodeal.REWARDED_VIDEO, function (result) {
                    if(!result){
                        return reject();
                    }

                    document.addEventListener('onRewardedVideoDidFinish', function (data) {
                        console.log('Reward Video:' + data.amount + ' ' + data.name);  //data.amount  - amount of reward, data.name - reward name
                        resolve();
                    }.bind(this));
                    document.addEventListener('onRewardedVideoFinished', function (data) {
                        console.log('Reward Video:' + data.amount + ' ' + data.name);  //data.amount  - amount of reward, data.name - reward name
                        resolve();
                    }.bind(this));


                    Appodeal.show(Appodeal.REWARDED_VIDEO);
                }.bind(this));

                return;
            }

            return reject();
        }.bind(this));


    }
}



module.exports = {
    Ad: Ad
}




