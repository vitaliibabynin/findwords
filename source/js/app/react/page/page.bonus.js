"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;


var PageBonus = Object.assign({}, {}, {

    displayName: 'PageBonus',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            coins: [9991, 992, 93, 4, 9995, 9996, 9997]
        };

        return state;
    },

    //componentDidMount: function () {
    //
    //},
    //
    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},
    //
    //componentWillUnmount: function () {
    //
    //},

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

    render: function () {

        var dollar = {
            backgroundImage: "url('" + this.getImagePath('counter/coins') + "')"
        };

        var tick = {
            backgroundImage: "url('" + this.getImagePath('bonus/tick') + "')"
        };

        return (

            <div className="page-bonus">
                <div className="page-content">

                    <Counters />

                    <div className="container">
                        <div className="heading">{i18n._('bonus.heading')}</div>

                        <div className="day unlocked" style={this.getDayImg("day1")}>
                            <span>{i18n._('bonus.day1')}</span>
                            <div className="tick" style={tick}></div>
                        </div>

                        <div className="day today" style={this.getDayImg("today")}>
                            <span>{i18n._('bonus.day2')}</span>
                            <div className="prize" style={dollar}>{this.state.coins[1]}</div>
                        </div>

                        <div className="day locked" style={this.getDayImg("day3")}>
                            <div className="line"></div>
                            <span>{i18n._('bonus.day3')}</span>
                            <div className="prize" style={dollar}>{this.state.coins[2]}</div>
                        </div>

                        <div className="day locked" style={this.getDayImg("day4")}>
                            <div className="line"></div>
                            <span>{i18n._('bonus.day4')}</span>
                            <div className="prize" style={dollar}>{this.state.coins[3]}</div>
                        </div>

                        <div className="day locked" style={this.getDayImg("day5")}>
                            <div className="line"></div>
                            <span>{i18n._('bonus.day5')}</span>
                            <div className="prize" style={dollar}>{this.state.coins[4]}</div>
                        </div>

                        <div className="day locked" style={this.getDayImg("day6")}>
                            <div className="line"></div>
                            <span>{i18n._('bonus.day6')}</span>
                            <div className="prize" style={dollar}>{this.state.coins[5]}</div>
                        </div>

                        <div className="day locked" style={this.getDayImg("day7")}>
                            <div className="line"></div>
                            <span>{i18n._('bonus.day7')}</span>
                            <div className="prize" style={dollar}>{this.state.coins[6]}</div>
                        </div>

                        <div className="collect" onClick={this.onClick}>{i18n._('bonus.collect')}</div>
                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageBonus);
module.exports.Class = PageBonus;