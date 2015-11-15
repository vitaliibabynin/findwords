"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;


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
        };
        state.bonusDaysTotal = Utils.countObjectProperties(state.bonusCoins) || 0;

        return state;
    },

    onClick: function () {
        var daysPlayed = this.state.daysPlayed;
        var bonusDaysTotal = this.state.bonusDaysTotal;

        if (daysPlayed >= bonusDaysTotal) {
            daysPlayed = bonusDaysTotal;
        }

        var daysPlayedConverter = "day" + (daysPlayed);
        var newCoins = appManager.getGameState().getCoins() + this.state.bonusCoins[daysPlayedConverter];
        appManager.getGameState().setCoins(newCoins);

        router.navigate("main", "index", {initialSlide: this.state.initialSlide});
    },

    generateDays: function () {
        var daysPlayed = this.state.daysPlayed;
        var bonusDaysTotal = this.state.bonusDaysTotal;

        if (daysPlayed <= bonusDaysTotal) {
            return this.generateFirstSevenDays(daysPlayed, bonusDaysTotal);
        } else {
            return this.generateEightDayOnwards(daysPlayed, bonusDaysTotal);
        }
    },

    selectContentNumber: function (dayNumber, daysTotal) {
        var number = 0;
        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

        for (var i = 0; i < dayNumber - daysTotal + 1; i++) {
            number = numbers[i % numbers.length];
        }

        return number;
    },

    generateEightDayOnwards: function (daysPlayed, daysTotal) {
        var daysRender = new Array(daysTotal);

        for (var i = 0; i < daysTotal; i++) {
            var dayNumber = daysPlayed - daysTotal + i;
            var bonusConverter = "bonus.day" + (daysTotal) + "." + this.selectContentNumber(dayNumber, daysTotal);
            var content = i18n._(bonusConverter);

            if (dayNumber < daysPlayed - 1) {
                daysRender[i] = this.getUnlockedDay(dayNumber, daysTotal, content);
                continue;
            }

            if (dayNumber == daysPlayed - 1) {
                daysRender[i] = this.getToday(dayNumber, daysTotal, content);
            }
        }

        return daysRender;
    },

    generateFirstSevenDays: function (daysPlayed, daysTotal) {
        var daysRender = new Array(daysTotal);

        for (var i = 0; i < daysTotal; i++) {
            var bonusConverter = "bonus.day" + (i + 1);
            var content = i18n._(bonusConverter);

            if (i < daysPlayed - 1) {
                daysRender[i] = this.getUnlockedDay(i, daysTotal);
                continue;
            }

            if (i == daysPlayed - 1) {
                daysRender[i] = this.getToday(i, daysTotal, content);
                continue;
            }

            daysRender[i] = this.getLockedDay(i);
        }

        return daysRender;
    },

    getUnlockedDay: function (dayIdx, daysTotal, content) {
        var unlockedDayClassNames = classNames(
            DAY,
            UNLOCKED
        );

        var bonusConverter = "bonus.day" + (dayIdx + 1);
        var bonusContent = i18n._(bonusConverter);

        if (dayIdx >= daysTotal) {
            bonusContent = content;
        }

        var tick = {
            backgroundImage: "url('" + this.getImagePath('bonus/tick') + "')"
        };

        var unlockedDayImage = {
            backgroundImage: "url('" + this.getImagePath('bonus/day_frame') + "')"
        };

        return (
            <div key={UNLOCKED + dayIdx} className={unlockedDayClassNames}>
                <div className={CALENDAR} style={unlockedDayImage}>
                    <span>{dayIdx + 1}</span><br />
                    <span>{i18n._('bonus.day')}</span>
                </div>

                <span className={CONTENT}>{bonusContent}</span>

                <div className={TICK} style={tick}></div>
            </div>
        );
    },

    getToday: function (dayIdx, daysTotal, content) {
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

        var bonusCoinsDay = "day" + (dayIdx + 1);
        var bonusConverter = "bonus.day" + (dayIdx + 1);
        var bonusContent = i18n._(bonusConverter);

        if (dayIdx >= daysTotal) {
            bonusCoinsDay = "day" + (daysTotal);
            bonusContent = content;
        }

        return (
            <div key={TODAY + dayIdx} className={todayClassNames}>
                <div className={CALENDAR} style={today}></div>

                <span className={CONTENT}>{bonusContent}</span>

                <div className={PRIZE} style={dollar}>{this.state.bonusCoins[bonusCoinsDay]}</div>
            </div>
        )
    },

    getLockedDay: function (dayIdx) {
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

        return (
            <div key={LOCKED + dayIdx} className={lockedDayClassNames}>
                <div className={LINE}></div>

                <div className={CALENDAR} style={unlockedDayImage}>
                    <span>{dayIdx + 1}</span><br />
                    <span>{i18n._('bonus.day')}</span>
                </div>

                <span className={CONTENT}>{i18n._(bonusConverter)}</span>

                <div className={PRIZE} style={dollar}>{this.state.bonusCoins[dayIdxConverter]}</div>
            </div>
        )
    },

    render: function () {

        return (

            <div className="page-bonus">
                <div className="page-content">

                    <Counters />

                    <div className="container">
                        <div className="heading">{i18n._('bonus.heading')}</div>

                        {this.generateDays()}

                        <div className="collect" onClick={this.onClick}>{i18n._('bonus.collect')}</div>
                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageBonus);
module.exports.Class = PageBonus;