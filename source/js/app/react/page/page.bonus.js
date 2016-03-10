"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var SimpleButton = require('./../component/app.button').SimpleButton;


var DAY = "day";
var UNLOCKED = "unlocked";
var TODAY = "today";
var LOCKED = "locked";
var TICK = "tick";
var PRIZE = "prize";
var LINE = "line";
var CALENDAR = "calendar";
var CONTENT = "content";


var PageBonus = Object.assign({}, {}, {

    displayName: 'PageBonus',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            initialSlide: parseInt(router.getParam('initialSlide')) || 0,
            bonusCoins: appManager.getSettings().getBonusCoins() || {},
            daysPlayed: appManager.getGameState().getDaysPlayedStreak() || 0
            //daysPlayed: 1
        };
        state.bonusDaysTotal = Utils.countObjectProperties(state.bonusCoins) || 0;

        return state;
    },

    componentWillMount: function () {
        window.appAnalytics.trackView('pageBonus');

        appAd.hideBanner();
    },

    onClick: function () {
        //var day = this.state.daysPlayed;
        //day++;
        //this.setState({
        //    daysPlayed: day
        //});

        var daysPlayed = this.state.daysPlayed;
        var bonusDaysTotal = this.state.bonusDaysTotal;

        if (daysPlayed >= bonusDaysTotal) {
            daysPlayed = bonusDaysTotal;
        }

        var daysPlayedConverter = "day" + (daysPlayed);
        var coinsToAdd = this.state.bonusCoins[daysPlayedConverter];

        if (typeof(coinsToAdd) != "undefined") {
            appManager.getGameState().addCoins(coinsToAdd);
        }

        router.navigate("main", "index", {initialSlide: this.state.initialSlide});
    },

    componentWillUnmount: function () {
        appAd.showBottomBanner();
    },

    selectContentNumber: function (dayNumber, daysTotal) {
        var number = 0;
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        for (var i = 0; i < dayNumber - daysTotal + 1; i++) {
            number = numbers[i % numbers.length];
        }

        return number;
    },

    generateDays: function () {
        var daysPlayed = this.state.daysPlayed;
        var daysTotal = this.state.bonusDaysTotal;

        appAnalytics.trackEvent('dailyBonus', 'day-'+daysPlayed, '', 1);

        var daysRender = new Array(daysTotal);

        for (var i = 0; i < daysTotal; i++) {

            if (daysPlayed < daysTotal) {
                var dayNumber = i;
                var bonusConverter = "bonus.day" + (dayNumber + 1);
                var content = i18n._(bonusConverter);
                var bonusCoinsDay = "day" + (dayNumber + 1);
                var coins = this.state.bonusCoins[bonusCoinsDay];
            } else {
                dayNumber = daysPlayed - daysTotal + i + 1;

                if (i < daysTotal - Utils.difference(daysPlayed, daysTotal) - 1) {
                    bonusConverter = "bonus.day" + (dayNumber + 1);
                } else {
                    bonusConverter = "bonus.day" + (daysTotal) + "." + this.selectContentNumber(dayNumber, daysTotal);
                }

                content = i18n._(bonusConverter);
                bonusCoinsDay = "day" + (daysTotal);
                coins = this.state.bonusCoins[bonusCoinsDay];
            }

            if (dayNumber < daysPlayed - 1) {
                daysRender[i] = this.getUnlockedDay(dayNumber, content, coins);
                continue;
            }

            if (dayNumber == daysPlayed - 1) {
                daysRender[i] = this.getToday(dayNumber, content, coins);
                continue;
            }

            if (dayNumber > daysPlayed - 1) {
                daysRender[i] = this.getLockedDay(dayNumber, content, coins);
            }
        }

        return daysRender;
    },

    getUnlockedDay: function (dayIdx, content) {
        var unlockedDayClassNames = classNames(
            DAY,
            UNLOCKED
        );

        var tick = {
            backgroundImage: "url('" + this.getImagePath('bonus/tick') + "')"
        };

        var unlockedDayImage = {
            backgroundImage: "url('" + this.getImagePath('bonus/day_frame') + "')"
        };

        return (
            <div key={UNLOCKED + dayIdx} className={unlockedDayClassNames}>

                <div className={LINE}></div>

                <div className={CALENDAR} style={unlockedDayImage}>
                    <span>{dayIdx + 1}</span><br />
                    <span>{i18n._('bonus.day')}</span>
                </div>

                <span className={CONTENT}>{content}</span>

                <div className={TICK} style={tick}></div>
            </div>
        );
    },

    getToday: function (dayIdx, content, coins) {
        var dollar = {
            backgroundImage: "url('" + this.getImagePath('counter/coins') + "')"
        };

        var today = {
            backgroundImage: "url('" + this.getImagePath('bonus/today') + "')"
        };

        var todayClassNames = classNames(
            DAY,
            TODAY
        );

        return (
            <div key={TODAY + dayIdx} className={todayClassNames}>

                <div className={CALENDAR} style={today}></div>

                <span className={CONTENT}>{content}</span>

                <div className={PRIZE} style={dollar}>{coins}</div>
            </div>
        )
    },

    getLockedDay: function (dayIdx, content, coins) {
        var lockedDayClassNames = classNames(
            DAY,
            LOCKED
        );

        var dollar = {
            backgroundImage: "url('" + this.getImagePath('bonus/dollar50') + "')"
        };

        var dayIdxConverter = "day" + (dayIdx + 1);
        var bonusConverter = "bonus." + dayIdxConverter;

        var unlockedDayImage = {
            backgroundImage: "url('" + this.getImagePath('bonus/day_frame50') + "')"
        };

        if (this.state.daysPlayed == dayIdx) {
            return (
                <div key={LOCKED + dayIdx} className={lockedDayClassNames}>

                    <div className={CALENDAR} style={unlockedDayImage}>
                        <span>{dayIdx + 1}</span><br />
                        <span>{i18n._('bonus.day')}</span>
                    </div>

                    <span className={CONTENT}>{content}</span>

                    <div className={PRIZE} style={dollar}>{coins}</div>
                </div>
            )
        }

        return (
            <div key={LOCKED + dayIdx} className={lockedDayClassNames}>

                <div className={LINE}></div>

                <div className={CALENDAR} style={unlockedDayImage}>
                    <span>{dayIdx + 1}</span><br />
                    <span>{i18n._('bonus.day')}</span>
                </div>

                <span className={CONTENT}>{content}</span>

                <div className={PRIZE} style={dollar}>{coins}</div>
            </div>
        )
    },

    render: function () {

        var wallpaper = {
            backgroundImage: ""
        };
        //var wallpaper = {
        //    backgroundImage: "url('" + Utils.getImgPath('wallpaper/fon.png') + "')"
        //};

        return (

            <div className="page page-bonus" style={wallpaper}>
                <Counters />

                <div className="page-content">

                    <div className="container">
                        <div className="heading">{i18n._('bonus.heading')}</div>

                        {this.generateDays()}

                        <SimpleButton className="collect"
                                      onClick={this.onClick}>{i18n._('bonus.collect')}</SimpleButton>
                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageBonus);
module.exports.Class = PageBonus;