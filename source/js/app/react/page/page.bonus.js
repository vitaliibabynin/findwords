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


var PageBonus = Object.assign({}, {}, {

    displayName: 'PageBonus',
    mixins: [GameMixin],

    getInitialState: function () {
        return {
            bonusCoins: {
                day1: 9991,
                day2: 992,
                day3: 93,
                day4: 4,
                day5: 9995,
                day6: 9996,
                day7: 9997
            },
            daysUnlocked: 4
        };
    },

    onClick: function () {

    },

    getDayImg: function (day) {
        var dayImages = {
            day1: "url('" + this.getImagePath('bonus/1day') + "')",
            day2: "url('" + this.getImagePath('bonus/2day') + "')",
            day3: "url('" + this.getImagePath('bonus/3day') + "')",
            day4: "url('" + this.getImagePath('bonus/4day') + "')",
            day5: "url('" + this.getImagePath('bonus/5day') + "')",
            day6: "url('" + this.getImagePath('bonus/6day') + "')",
            day7: "url('" + this.getImagePath('bonus/7day') + "')",
            today: "url('" + this.getImagePath('bonus/today') + "')"
        };

        return {
            backgroundImage: dayImages[day]
        }
    },

    generateDays: function () {
        var daysUnlocked = this.state.daysUnlocked;
        var daysTotal = Utils.countObjectProperties(this.state.bonusCoins);
        var daysRender = new Array(daysTotal);

        for (var i = 0; i < daysTotal; i++) {
            if (i < daysUnlocked - 1) {
                daysRender[i] = this.getUnlockedDay(i);
                continue;
            }

            if (i == daysUnlocked - 1) {
                daysRender[i] = this.getToday(i);
                continue;
            }

            daysRender[i] = this.getLockedDay(i);
        }

        return daysRender;
    },

    getUnlockedDay: function (dayIdx) {
        var unlockedDayClassNames = classNames(
            DAY,
            UNLOCKED
        );

        var dayIdxConverter = "day" + (dayIdx + 1);
        var unlockedDayImage = this.getDayImg(dayIdxConverter);
        var bonusConverter = "bonus." + dayIdxConverter;

        var tick = {
            backgroundImage: "url('" + this.getImagePath('bonus/tick') + "')"
        };

        return (
            <div key={UNLOCKED + dayIdx} className={unlockedDayClassNames} style={unlockedDayImage}>
                <span>{i18n._(bonusConverter)}</span>

                <div className={TICK} style={tick}></div>
            </div>
        );
    },

    getToday: function (dayIdx) {
        var dollar = {
            backgroundImage: "url('" + this.getImagePath('counter/coins') + "')"
        };

        var todayClassNames = classNames(
            DAY,
            TODAY
        );

        var dayIdxConverter = "day" + (dayIdx + 1);
        var bonusConverter = "bonus." + dayIdxConverter;

        return (
            <div key={TODAY + dayIdx} className={todayClassNames} style={this.getDayImg("today")}>
                <span>{i18n._(bonusConverter)}</span>

                <div className={PRIZE} style={dollar}>{this.state.bonusCoins[dayIdxConverter]}</div>
            </div>
        )
    },

    getLockedDay: function (dayIdx) {
        var lockedDayClassNames = classNames(
            DAY,
            LOCKED
        );

        var dollar = {
            backgroundImage: "url('" + this.getImagePath('counter/coins') + "')"
        };

        var dayIdxConverter = "day" + (dayIdx + 1);
        var unlockedDayImage = this.getDayImg(dayIdxConverter);
        var bonusConverter = "bonus." + dayIdxConverter;

        return (
            <div key={LOCKED + dayIdx} className={lockedDayClassNames} style={unlockedDayImage}>
                <div className={LINE}></div>

                <span>{i18n._(bonusConverter)}</span>

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