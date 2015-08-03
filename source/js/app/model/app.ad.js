/** @jsx React.DOM */
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
    this.chartboostInited = false;

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

        if(window.chartboost && this.settings.hasOwnProperty("chartboost") && this.settings.chartboost.id){
            window.chartboost.setUp = function(appId, appSignature) {
                var self = this;
                cordova.exec(
                    function (result) {
                        console.log('setUp succeeded.');

                        if (typeof result == "string") {
                            if (result == "onFullScreenAdPreloaded") {
                                if (self.onFullScreenAdPreloaded)
                                    self.onFullScreenAdPreloaded();
                            }
                            else if (result == "onFullScreenAdLoaded") {
                                if (self.onFullScreenAdLoaded)
                                    self.onFullScreenAdLoaded();
                            }
                            else if (result == "onFullScreenAdShown") {
                                if (self.onFullScreenAdShown)
                                    self.onFullScreenAdShown();
                            }
                            else if (result == "onFullScreenAdHidden") {
                                if (self.onFullScreenAdHidden)
                                    self.onFullScreenAdHidden();
                            }
                            else if (result == "onMoreAppsAdPreloaded") {
                                if (self.onMoreAppsAdPreloaded)
                                    self.onMoreAppsAdPreloaded();
                            }
                            else if (result == "onMoreAppsAdLoaded") {
                                if (self.onMoreAppsAdLoaded)
                                    self.onMoreAppsAdLoaded();
                            }
                            else if (result == "onMoreAppsAdShown") {
                                if (self.onMoreAppsAdShown)
                                    self.onMoreAppsAdShown();
                            }
                            else if (result == "onMoreAppsAdHidden") {
                                if (self.onMoreAppsAdHidden)
                                    self.onMoreAppsAdHidden();
                            }
                            else if (result == "onRewardedVideoAdPreloaded") {
                                if (self.onRewardedVideoAdPreloaded)
                                    self.onRewardedVideoAdPreloaded();
                            }
                            else if (result == "onRewardedVideoAdLoaded") {
                                if (self.onRewardedVideoAdLoaded)
                                    self.onRewardedVideoAdLoaded();
                            }
                            else if (result == "onRewardedVideoAdShown") {
                                if (self.onRewardedVideoAdShown)
                                    self.onRewardedVideoAdShown();
                            }
                            else if (result == "onRewardedVideoAdHidden") {
                                if (self.onRewardedVideoAdHidden)
                                    self.onRewardedVideoAdHidden();
                            }
                            else if (result == "onRewardedVideoAdCompleted") {
                                if (self.onRewardedVideoAdCompleted)
                                    self.onRewardedVideoAdCompleted();
                            }
                            else if (result == "onFailToLoadRewardedVideo") {
                                if (self.onFailToLoadRewardedVideo)
                                    self.onFailToLoadRewardedVideo();
                            }
                        }
                        else {
                            //if (result["event"] == "onXXX") {
                            //	//result["message"]
                            //	if (self.onXXX)
                            //		self.onXXX(result);
                            //}
                        }
                    },
                    function (error) {
                        console.log('setUp failed.');
                    },
                    'ChartboostPlugin',
                    'setUp',
                    [appId, appSignature]
                );
            };

            window.chartboost.setUp(this.settings.chartboost.id, this.settings.chartboost.sign);
            window.chartboost.onRewardedVideoAdPreloaded = function() {
                console.log('onRewardedVideoAdPreloaded');
            }.bind(this);
            window.chartboost.onRewardedVideoAdLoaded = function() {
                console.log('onRewardedVideoAdLoaded');
            }.bind(this);
            window.chartboost.onRewardedVideoAdShown = function() {
                console.log('onRewardedVideoAdShown');
            }.bind(this);
            window.chartboost.onRewardedVideoAdHidden = function() {
                console.log('onRewardedVideoAdHidden');
            }.bind(this);
            window.chartboost.onRewardedVideoAdCompleted = function(rewarded){
                console.log('onRewardedVideoAdCompleted', rewarded);

                var addedCoins = this.settings.chartboost.coins || 1;
                appManager.addCoins(addedCoins);

                var dialogDescription = i18n._('app.dialog.info.rewardedvideo.bonus', addedCoins);
                appDialogs.getInfoDialog()
                    //.setTitle('Info text')
                    .setContentText(dialogDescription)
                    .show();
            }.bind(this);
            window.chartboost.onFailToLoadRewardedVideo = function(){
                console.log('onFailToLoadRewardedVideo');
                var dialogDescription = i18n._('app.dialog.info.rewardedvideo.notfound');
                appDialogs.getInfoDialog()
                    //.setTitle('Info text')
                    .setContentText(dialogDescription)
                    .show();
            }.bind(this);

            this.chartboostInited = true;
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
        admob.showInterstitial();
        this.updateLastShowInterstitialTime();
    }

    this.showInterstitial = function(){
        if(this.adRemoved){
            return false;
        }

        if(this.admobInited && this.isCordovaApp && this.lastShowInterstitialTime < Date.now() && window.admob){
            admob.cacheInterstitial();
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
        if(this.chartboostInited){
            window.chartboost.showRewardedVideoAd('Default');
        }
    }
}



module.exports = {
    Ad: Ad
}




