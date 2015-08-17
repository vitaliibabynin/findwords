/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

module.exports = {};

var SlideClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        slideNumber: React.PropTypes.string,
        playerName: React.PropTypes.string,
        wordsComplete: React.PropTypes.number,
        wordsTotal: React.PropTypes.number,
        slideScore: React.PropTypes.number,
        imgName: React.PropTypes.string

    },

    getDefaultProps: function () {

        return {
            playerName: "Гаврюша",
            wordsTotal: 25,
            imgPath: 'play/play'
        };

    },

    getInitialState: function () {

        return {
            slideNumber: this.props.slideNumber || 0,
            playerName: this.props.playerName || "Player1",
            wordsComplete: this.props.wordsComplete || 15,
            wordsTotal: this.props.wordsTotal || 25,
            slideScore: this.props.slideScore || 999999,
            imgPath: this.props.imgPath || 'play/play'
        };

    },

    render: function () {

        var progress = {
            width: (this.state.wordsComplete / this.state.wordsTotal * 6.250) + "rem"
        };

        var playImg = {
            backgroundImage: "url('" + this.getImagePath(this.state.imgPath) + "')"
        };

        return (

            <div className="swiper-slide">

                <div className="slide-number">Комплект №{this.state.slideNumber}</div>
                <div className="player-name">{this.state.playerName}</div>
                <div className="words-complete">

                    <div className="wc-stats">{this.state.wordsComplete}/{this.state.wordsTotal}</div>
                    <div className="wc-panel">
                        <div className="wc-progress" style={progress}>
                        </div>
                    </div>

                </div>

                <div className="play" style={playImg}></div>

                <div className="score">Счет {this.state.slideScore}</div>

            </div>

        );
    }
});
module.exports.Slide = React.createClass(SlideClass);
module.exports.Slide.Class = SlideClass;