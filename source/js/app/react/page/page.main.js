/** @jsx React.DOM */
"use strict";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var FbButton = require('./../component/app.button').FbButton;
var Button = require('./../component/app.button').Button;

var ScoreCounter = require('./../component/app.counter').ScoreCounter;
var CoinsCounter = require('./../component/app.counter').CoinsCounter;

var Swiper = require('./../component/app.swiper').Swiper;
var Navigation = require('./../component/app.menu').Navigation;
var Switch = require('./../component/app.switch').Switch;


var PageMain = Object.assign({}, {}, {
    mixins: [PureRenderMixin, GameMixin],
    displayName: 'PageMain',

    swiper: null,

    getInitialState: function () {
        var state = {

        };

        return state;
    },

    componentDidMount: function () {

    },

    componentDidUpdate: function (prevProps, prevState) {

    },

    componentWillUnmount: function () {

    },

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
                    <div className="counters">
                        <ScoreCounter value={appManager.getGameState().getScore()} />
                        <CoinsCounter value={appManager.getGameState().getCoins()} />
                    </div>
                    <div className="main">
                        <Swiper />
                        <Navigation />
                    </div>
                    <div className="footer">
                        <Switch />
                    </div>
                </div>
            </div>

        );
    }
});

module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;
