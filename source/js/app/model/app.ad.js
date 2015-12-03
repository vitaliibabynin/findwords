"use strict";

var StartAD = require('./../libs/ad/startad');


var Ad = function(currentPlatform, isCordovaApp){
    this.showIntersititalPeriod = CONST.AD_PERIOD_INTERSTITIAL * 1000;
    this.isCordovaApp = isCordovaApp || false;
    this.lastShowInterstitialTime = 0;
    this.settings = {};
    this.startAd = null;
    this.adRemoved = false;

    this.admobInited = false;
    this.unityAdsInited = false;
    this.vungleInited = false;

    this.init = function(){
        if(!this.settings){
            return;
        }

        if(this.isCordovaApp){
            if(this.settings.hasOwnProperty("adMob") && window.admob){
                admob.initAdmob(this.settings.adMob.default, this.settings.adMob.intersitital);
                document.addEventListener(
                    admob.Event.onInterstitialReceive,
                    this.onAdMobInterstitialReceive.bind(this),
                    false);
                this.admobInited = true;
            }
        }

        if(this.settings.hasOwnProperty("startAd")){
            this.startAd = new StartAD(this.settings.startAd);
        }

        if(this.settings.hasOwnProperty("unityAds") && window.unityads){
            var videoAdPlacementId = "defaultZone";
            var rewardedVideoAdPlacementId = "rewardedVideoZone";
            window.unityads.setUp(this.settings.unityAds.id, videoAdPlacementId, rewardedVideoAdPlacementId, this.settings.unityAds.isTest);

            this.unityAdsInited = true;
        }

        if(this.settings.hasOwnProperty("vungle") && window.vungle){
            window.vungle.setUp(this.settings.vungle);

            this.vungleInited = true;
        }

    }

    this.setAdRemoved = function(adRemoved){
        this.adRemoved = adRemoved;
    }

    this.setSettings = function(settings){
        this.settings = settings;

        this.init();
    }

    this.updateLastShowInterstitialTime = function(){
        this.lastShowInterstitialTime = Date.now() + this.showIntersititalPeriod;
    }

    this.onAdMobInterstitialReceive = function(message) {

    }

    this.prepareInterstitial = function(autoShow){
        if(this.adRemoved){
            return false;
        }

        if(this.admobInited && window.admob){
            admob.isInterstitialReady(function(isReady){
                if(!isReady){
                    admob.cacheInterstitial();
                }
            }.bind(this));
        }
    }

    this.showInterstitial = function(){
        if(this.adRemoved){
            return false;
        }

        if(this.admobInited && this.isCordovaApp && this.lastShowInterstitialTime < Date.now() && window.admob){
            admob.isInterstitialReady(function(isReady){
                if(isReady){
                    admob.showInterstitial();
                    this.updateLastShowInterstitialTime();
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

    this.showStartAdBanner = function(layout){
        if(this.canShowStartAdBanner()) {
            this.startAd.setZoom($('html').css('zoom'));
            this.startAd.showAd(layout, {language: router.getLanguage() });
        }
    }


    this.showRewardedVideo = function(){
        return new Promise(function(resolve, reject){

            if(this.unityAdsInited && window.unityads.loadedRewardedVideoAd()){
                window.unityads.onRewardedVideoAdCompleted = function() {
                    resolve();
                };
                window.unityads.showRewardedVideoAd();
                return;
            }

            if(this.vungleInited && window.vungle.loadedRewardedVideoAd()){
                window.vungle.onRewardedVideoAdCompleted = function() {
                    resolve();
                };
                window.vungle.showRewardedVideoAd();
                return;
            }

            return reject();
        }.bind(this));


    }
}



module.exports = {
    Ad: Ad
}




