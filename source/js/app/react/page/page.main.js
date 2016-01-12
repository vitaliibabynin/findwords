"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');
var moment = require('moment');

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
            adsRemoved: appManager.getGameState().getRemoveAds() ? true : false
        };

        return state;
    },

    componentDidMount: function () {
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


        var lastAccessNumber = appManager.getGameState().getLastAccessDate();
        var todayString = moment().format("YYYYMMDD") || "";
        //var todayString = moment().format("YYYYMMDDHHmmss") || "";

        //if first access ever
        if (lastAccessNumber == "") {
            appManager.getGameState().setLastAccessDate(todayString);
            return;
        }

        //daysPlayedStreak
        var daysSinceLastAccess = moment(todayString, "YYYYMMDD").diff(moment(lastAccessNumber, "YYYYMMDD"), "days");
        //var daysSinceLastAccess = moment(todayString, "YYYYMMDDHHmmss").diff(moment(lastAccessNumber, "YYYYMMDDHHmmss"), "seconds");

        if (daysSinceLastAccess < 1) {
            return;
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

    componentWillUnmount: function () {
        appManager.getGameState().removeChangeRemoveAdsListener(this.updateAdSwitch);
    },

    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},

    updateAdSwitch: function () {
        this.setState({
            adsRemoved: appManager.getGameState().getRemoveAds() ? true : false
        })
    },

    adSwitchToggle: function () {
        if (this.state.adsRemoved) {
            return;
        }

        appDialogs.getTurnOffAdsDialog().show();
    },

    render: function () {
        //console.log(appManager.getGameState().gameState);
        //console.log(this.state.checked);

        var headImgName = "head/head_img_" + router.getLanguage();
        if (CONST.CURRENT_PLATFORM == "ios" && router.getLanguage() == "en") {
            headImgName = "head/head_img_ios_en";
        }

        var headStyle = {
            backgroundImage: "url(" + this.getImagePath(headImgName) + ")"
        };

        console.log({GameStateRemoveAds: appManager.getGameState().getRemoveAds()});
        console.log({StateAdsRemoved: this.state.adsRemoved});

        var checked = this.state.adsRemoved ? "" : "checked";
        console.log({checked: checked});

        return (

            <div className="page-main">

                <div className="page-content">

                    <div className="head"
                         style={headStyle}>
                    </div>

                    <Counters />

                    <div className="main">
                        <Swiper initialSlide={this.state.initialSlide}/>
                        <Navigation />
                    </div>

                    <div className="footer">
                        <AdSwitch
                            name="adSwitch"
                            label={i18n._('switch.ad')}
                            onChange={this.adSwitchToggle}
                            checked={checked}
                        />
                    </div>

                </div>

            </div>

        );
    }
});
module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;