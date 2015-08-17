/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

module.exports = {};

var SlideClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        slideNumber: React.PropTypes.number,
        playerName: React.PropTypes.string,
        wordsComplete: React.PropTypes.number,
        wordsTotal: React.PropTypes.number,
        slideScore: React.PropTypes.number

    },

    getDefaultProps: function() {

        return {
            playerName: "Гаврюша",
            wordsTotal: 25
        };

    },

    getInitialState: function () {

        return {
            slideNumber: this.props.slideNumber || 0,
            playerName: this.props.playerName || "Player1",
            wordsComplete: this.props.wordsComplete || 15,
            wordsTotal: this.props.wordsTotal || 25,
            slideScore: this.props.slideScore || 999999
        };

    },

    render: function () {

        return (

            <div className="swiper-slide">

                <div>Комплект №{this.state.slideNumber} {this.state.playerName}</div>

                <div>{this.state.wordsComplete}/{this.state.wordsTotal}</div>

                <div></div>

                <div></div>

                <div>Счет {this.state.slideScore}</div>

            </div>

        );
    }
});
module.exports.Slide = React.createClass(SlideClass);
module.exports.Slide.Class = SlideClass;