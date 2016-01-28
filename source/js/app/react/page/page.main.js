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
            adsRemoved: appManager.getGameState().getRemoveAds() ? true : false,
            bonusReceived: false
        };

        return state;
    },

    componentWillMount: function () {
        appAd.hideBanner();
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

        this.checkForBonuses();
        this.checkForNewFriends();
    },

    componentWillUnmount: function () {
        appManager.getGameState().removeChangeRemoveAdsListener(this.updateAdSwitch);
        appAd.showBottomBanner();
    },

    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},

    checkForNewFriends: function () {
        var friendsInvited = appManager.getGameState().getFriendsInvited();
        if (friendsInvited.length == 0) {
            return;
        }

        //console.log({friendsInvited: friendsInvited});

        appFB.getAppFriends().then(function (result) {
            if (result.constructor !== Array) {
                console.log("getAppFriends result invalid");
                return;
            }
            if (result.length == 0) {
                return;
            }

            var friendsJoined = new Array(result.length);
            for (var i = 0; i < friendsJoined.length; i++) {
                friendsJoined[i] = result[i].id;
            }

            //friendsJoined.push("114199905627003");

            var bonusFriends = Utils.getMatchingValues(friendsJoined.concat(friendsInvited));
            if (bonusFriends.length == 0) {
                return;
            }

            var newFriendsInvited = Utils.removeMatchingValues(friendsInvited, bonusFriends);
            appManager.getGameState().setFriendsInvited(newFriendsInvited);

            var coinsPerFriend = appManager.getSettings().getFreeCoins().friendAdded;
            var coinsToAdd = bonusFriends.length * coinsPerFriend;
            appManager.getGameState().addCoins(coinsToAdd);

            this.forceUpdate();

            appDialogs.getInfoDialog()
                .setTitle(i18n._('app.dialog.info.friends-joined.title'))
                .setContentText(i18n._('app.dialog.info.friends-joined.description.friends', bonusFriends.length) + " " + i18n._('app.dialog.info.friends-joined.description.coins', coinsToAdd))
                .show();
        }.bind(this));

        //var friendsInvitedTest = appManager.getGameState().getFriendsInvited();
        //friendsInvitedTest.push("114199905627003");
        //appManager.getGameState().setFriendsInvited(friendsInvitedTest);
    },

    checkForBonuses: function () {
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

        //console.log(lastAccessNumber);
        //console.log(daysSinceLastAccess);

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
        console.log(appManager.getGameState().gameState);
        //console.log(this.state.checked);
        //console.log(router.getController());

        var headImgName = "head/head_img_" + router.getLanguage();
        if (CONST.CURRENT_PLATFORM == "ios" && router.getLanguage() == "en") {
            headImgName = "head/head_img_ios_en";
        }

        var headStyle = {
            backgroundImage: "url(" + this.getImagePath(headImgName) + ")"
        };

        //console.log({GameStateRemoveAds: appManager.getGameState().getRemoveAds()});
        //console.log({StateAdsRemoved: this.state.adsRemoved});

        var checked = this.state.adsRemoved ? "" : "checked";
        //console.log({checked: checked});

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