"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');
var moment = require('moment');

var IconButton = require('./../component/app.button').IconButton;
var Counters = require('./../component/app.counters').Counters;
var Swiper = require('./../component/app.swiper').Swiper;
var Navigation = require('./../component/app.menu').Navigation;
var AdSwitch = require('./../libs/react-switch-button');


var PageMain = Object.assign({}, {}, {

    mixins: [GameMixin],

    displayName: 'PageMain',

    getInitialState: function () {
        var state = {
            initialSlide: parseInt(router.getParam('roundsBundleIdx')) || 0,
            adsRemoved: appManager.getGameState().getRemoveAds() ? true : false,
            allRoundsBundlesComplete: false,
            socialUrls: appManager.getSettings().getSocialUrls() || {}
        };

        return state;
    },

    componentWillMount: function () {
        appAd.hideBanner();

        if (this.checkIfAllRoundsBundlesComplete() !== false) {
            this.setState({
                allRoundsBundlesComplete: true,
                initialSlide: 0
            })
        }
    },

    componentDidMount: function () {
        window.appAnalytics.trackView('pageMain');
        appManager.getGameState().addChangeRemoveAdsListener(this.updateAdSwitch);

        //var gameState = appManager.getGameState().gameState;
        //var roundsBundles = gameState.roundsBundles;
        //
        //console.log(gameState);

        //for (var k in roundsBundles) {
        //    if (!roundsBundles.hasOwnProperty(k)) {
        //        continue;
        //    }
        //    for (var m in roundsBundles[k]) {
        //        if (!roundsBundles[k].hasOwnProperty(m)) {
        //            continue;
        //        }
        //        console.log("roundsBundle_" + k + "_number_" + (parseInt(m) + 1) + " isUnlocked: " + roundsBundles[k][m].isUnlocked);
        //        console.log("roundsBundle_" + k + "_number_" + (parseInt(m) + 1) + " isPurchased: " + roundsBundles[k][m].isPurchased);
        //    }
        //}

        this.checkForBonuses()
    },

    componentWillUnmount: function () {
        appManager.getGameState().removeChangeRemoveAdsListener(this.updateAdSwitch);
        appAd.showBottomBanner();
    },

    checkForBonuses: function () {
        var lastAccessNumber = appManager.getGameState().getLastAccessDate();
        var todayString = moment().format("YYYYMMDD") || "";
        //var todayString = moment().format("YYYYMMDDHHmmss") || "";

        //if first access ever
        if (lastAccessNumber == "") {
            appManager.getGameState().setLastAccessDate(todayString);
            return false;
        }

        //daysPlayedStreak
        var daysSinceLastAccess = moment(todayString, "YYYYMMDD").diff(moment(lastAccessNumber, "YYYYMMDD"), "days");
        //var daysSinceLastAccess = moment(todayString, "YYYYMMDDHHmmss").diff(moment(lastAccessNumber, "YYYYMMDDHHmmss"), "seconds");

        //console.log(lastAccessNumber);
        //console.log(daysSinceLastAccess);

        if (daysSinceLastAccess < 1) {
            return false;
        }

        if (daysSinceLastAccess > 1) {
            appManager.getGameState().setDaysPlayedStreak(1);
        }

        if (daysSinceLastAccess == 1) {
            var daysPlayedStreakIncrement = appManager.getGameState().getDaysPlayedStreak() + 1;
            appManager.getGameState().setDaysPlayedStreak(daysPlayedStreakIncrement);
        }

        //set lastAccessDate to now
        appManager.getGameState().setLastAccessDate(todayString);

        //go to bonus page
        router.navigate("bonus", "index", {initialSlide: this.state.initialSlide});
    },


    checkIfAllRoundsBundlesComplete: function () {
        //return true;

        var roundsBundlesGameState = appManager.getGameState().getRoundsBundles();
        var roundsBundlesGameData = appManager.getSettings().getRoundsBundles();
        var roundsBundlesComplete = 0;

        for (var k in roundsBundlesGameState) {
            if (!roundsBundlesGameState.hasOwnProperty(k)) {
                continue;
            }

            if (roundsBundlesGameState[k].roundsComplete >= roundsBundlesGameData[k].rounds.length) {
                ++roundsBundlesComplete;
            }
        }

        return roundsBundlesComplete >= roundsBundlesGameData.length;
    },

    renderGameCompleteMessage: function () {
        if (this.state.allRoundsBundlesComplete !== true) {
            return;
        }

        return (
            <div className="game-complete">
                <span>{i18n._('gamecomplete')}</span>
            </div>
        );
    },


    updateAdSwitch: function () {
        this.setState({
            adsRemoved: appManager.getGameState().getRemoveAds() ? true : false
        })
    },

    adSwitchToggle: function () {
        if (this.state.adsRemoved) {
            return;
        }

        var loadingDialog = appDialogs.getLoadingDialog();
        loadingDialog.show();

        appDialogs.getTurnOffAdsDialog().show();

        setTimeout(function () {
            loadingDialog.hide();
        }, 5000);
    },

    renderAdSwitch: function () {
        if (this.state.allRoundsBundlesComplete === true) {
            return;
        }

        return (
            <div className="footer">
                <AdSwitch
                    name="adSwitch"
                    label={i18n._('switch.ad')}
                    onChange={this.adSwitchToggle}
                    checked={this.state.adsRemoved ? "" : "checked"}
                />
            </div>
        );
    },


    onClickFacebook: function () {
        Utils.openUrl(this.state.socialUrls.fb[router.getLanguage()]);
    },

    onClickTwitter: function () {
        Utils.openUrl(this.state.socialUrls.twitter[router.getLanguage()]);
    },

    onClickVk: function () {
        Utils.openUrl(this.state.socialUrls.vk[router.getLanguage()]);
    },


    render: function () {
        //console.log(appManager.getGameState().gameState);

        var headImgName = "head/head_img_" + router.getLanguage();
        if (CONST.CURRENT_PLATFORM == "ios" && router.getLanguage() == "en") {
            headImgName = "head/head_img_ios_en";
        }

        var headStyle = {
            backgroundImage: "url(" + this.getImagePath(headImgName) + ")"
        };

        var wallpaper = {
            backgroundImage: "url('" + Utils.getImgPath('wallpaper/fon.png') + "')"
        };

        return (

            <div className="page page-main" style={wallpaper}>

                <div className="page-content">

                    <div className="head" style={headStyle}>
                        <IconButton className="facebook" icon="icon_fb" onClick={this.onClickFacebook}/>
                        <IconButton className="twitter" icon="icon_tw" onClick={this.onClickTwitter}/>
                        <IconButton className="vk" icon="icon_vk" onClick={this.onClickVk}/>
                    </div>

                    <Counters />

                    {this.renderGameCompleteMessage()}

                    <div className="main">
                        <Swiper initialSlide={this.state.initialSlide}
                                allRoundsBundlesComplete={this.state.allRoundsBundlesComplete}
                        />
                        <Navigation />
                    </div>

                    {this.renderAdSwitch()}

                </div>

            </div>

        );
    }
});
module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;