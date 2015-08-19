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
        imgName: React.PropTypes.string,
        isActive: React.PropTypes.bool
    },

    getDefaultProps: function () {

        return {
            wordsTotal: 25,
            imgPath: 'play/play'
        };

    },

    getInitialState: function () {

        return {
            slideNumber: this.props.slideNumber || 0,
            playerName: this.props.playerName || i18n._('playerName'),
            wordsComplete: this.props.wordsComplete || 15,
            wordsTotal: this.props.wordsTotal || 25,
            slideScore: this.props.slideScore || 999999,
            imgPath: this.props.imgPath || 'play/play',
            isActive: false
        };

    },

    onClick: function(e){
        e.preventDefault();

        if(!this.state.isActive){
            this.setState({isActive: true}, function(){
                setTimeout(function(){
                    if(this.isMounted()){
                        this.setState({isActive: false});
                    }
                }.bind(this), 300);
            });
        }

        if(this.props.onClick && typeof this.props.onClick == 'function'){
            this.props.onClick(this.props);
        }
    },

    render: function () {

        var progress = {
            width: (this.state.wordsComplete / this.state.wordsTotal * 6.250) + "rem"
        };

        var playImg = {
            backgroundImage: "url('" + this.getImagePath(this.state.imgPath) + "')"
        };

        var slideClickedStyle = {
            backgroundColor: ''
        };

        if (this.state.isActive) {
            slideClickedStyle = {
                backgroundColor: 'rgba(0,0,0,0.2)'
            };
        }

        return (

            <div className="swiper-slide">
                <div className="on-click" onClick={this.onClick} style={slideClickedStyle}>

                    <div className="slide-number">{i18n._('slide.set')} №{this.state.slideNumber}</div>
                    <div className="player-name">{this.state.playerName}</div>

                    <div className="words-complete">
                        <div className="stats">{this.state.wordsComplete}/{this.state.wordsTotal}</div>
                        <div className="progress-bar">
                            <div className="panel">
                            </div>
                            <div className="fill" style={progress}>
                            </div>
                        </div>
                    </div>

                    <div className="play" style={playImg}></div>

                    <div className="score">{i18n._('slide.score')} {this.state.slideScore}</div>

                </div>
            </div>
        );
    }
});
module.exports.Slide = React.createClass(SlideClass);
module.exports.Slide.Class = SlideClass;