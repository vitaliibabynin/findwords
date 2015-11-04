"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
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
            initialSlide: parseInt(router.getParam('roundsBundleIdx')) || 0
        };

        return state;
    },

    componentDidMount: function () {
        var lastAccessNumber = appManager.getGameState().getLastAccessDate();
        var todayNumber = moment().format("YYYYMMDD");

        //if first access ever
        if (lastAccessNumber == 0) {
            appManager.getGameState().setLastAccessDate(todayNumber);
            return;
        }

        //daysPlayedStreak
        var daysSinceLastAccess = moment(todayNumber, "YYYYMMDD").diff(moment(lastAccessNumber, "YYYYMMDD"), "days");
        //var daysSinceLastAccess = 1;

        if(daysSinceLastAccess < 1) {
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
        appManager.getGameState().setLastAccessDate(todayNumber);

        //go to bonus page
        router.navigate("bonus", "index", {initialSlide: this.state.initialSlide});
        this.forceUpdate();
    },

    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},
    //
    //componentWillUnmount: function () {
    //
    //},

    render: function () {

        var headImgName = "head/head_img_" + router.getLanguage();
        var headStyle = {
            backgroundImage: "url(" + this.getImagePath(headImgName) + ")"
        };

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
                        <AdSwitch defaultChecked="checked" label={i18n._('switch.ad')}/>
                    </div>

                </div>

            </div>

        );
    }
});
module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;