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

        return new Promise(function(resolve, reject){
            this.settings = appManager.getSettings().getAdSettings();

            if(!this.settings){
                reject('Ad settings not defined.');
                return;
            }

            if(this.isCordovaApp){
                if(this.settings.hasOwnProperty("adMob") && window.admob){
                    var bannerId = this.settings.adMob['320x50'];
                    if(window.screen.width >= 468){
                        bannerId = this.settings.adMob['468x60'];
                    }else if(window.screen.width >= 728){
                        bannerId = this.settings.adMob['728x90'];
                    }

                    admob.initAdmob(bannerId.trim(), this.settings.adMob.interstitial.trim());
                    document.addEventListener(
                        admob.Event.onInterstitialReceive,
                        this.onAdMobInterstitialReceive.bind(this),
                        false);
                    this.admobInited = true;
                }
            }

            if(this.settings.hasOwnProperty("startAd")){
                this.startAd = new StartAD(this.settings.startAd.trim());
            }

            if(this.settings.hasOwnProperty("unityAds") && window.unityads){
                var videoAdPlacementId = "video";
                var rewardedVideoAdPlacementId = "rewardedVideo";
                window.unityads.setUp(this.settings.unityAds.id.trim(), videoAdPlacementId, rewardedVideoAdPlacementId, this.settings.unityAds.isTest);

                this.unityAdsInited = true;
            }

            if(this.settings.hasOwnProperty("vungle") && window.vungle){
                window.vungle.setUp(this.settings.vungle.trim());

                this.vungleInited = true;
            }

            resolve();
        }.bind(this));

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

    this.onAdMobInterstitialReceive = function(message) {

    }

    this.getAdMobParams = function(){
        var admobParam = new  admob.Params();
        admobParam.isTesting = this.settings.adMob.isTest ? true : false;

        return admobParam;
    },

    this.prepareInterstitial = function(){
        if(this.adRemoved){
            return false;
        }

        if(this.admobInited && window.admob){
            admob.isInterstitialReady(function(isReady){
                if(!isReady){
                    admob.cacheInterstitial(this.getAdMobParams());
                }
            }.bind(this));
        }
    }

    this.getAdMobBannerType = function(){
        var bannerType = admob.BannerSize.BANNER;
        if(window.screen.width >= 468){
            bannerType = admob.BannerSize.IAB_BANNER;
        }else if(window.screen.width >= 728){
            bannerType = admob.BannerSize.IAB_LEADERBOARD;

            if(deviceJS.ipad()){
                bannerType = admob.BannerSize.IPAD_PORTRAIT;
            }
        }

        return bannerType;
    },

    this.showBottomBanner = function(){
        if(this.adRemoved){
            return false;
        }

        if(this.admobInited && window.admob) {
            admob.showBanner(this.getAdMobBannerType(), admob.Position.BOTTOM_CENTER, this.getAdMobParams());
        }
    },

    this.hideBanner = function(){
        if(this.admobInited && window.admob) {
            admob.hideBanner(
                function (result) {
                    console.log(result);
                },
                function (error) {
                    console.log(error);
                }
            );
        }
    },

    this.showInterstitial = function(){
        if(this.adRemoved){
            return false;
        }

        if(this.admobInited && this.isCordovaApp && this.lastShowInterstitialTime < Date.now() && window.admob){
            admob.isInterstitialReady(function(isReady){
                if(isReady){
                    admob.showInterstitial();
                    this.updateLastShowInterstitialTime();
                }else{
                    this.prepareInterstitial();
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




