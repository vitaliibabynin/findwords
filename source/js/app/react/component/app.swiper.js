/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var libSwiper = require('./../../../app/libs/swiper.jquery');

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
        isActive: React.PropTypes.bool,
        className: React.PropTypes.string
    },

    getInitialState: function () {

        return {
            slideNumber: this.props.slideNumber || 0,
            playerName: this.props.playerName || i18n._('playerName'),
            wordsComplete: this.props.wordsComplete || 15,
            wordsTotal: this.props.wordsTotal || 25,
            slideScore: this.props.slideScore || 999999,
            imgPath: this.props.imgPath || 'play/play',
            isActive: false,
            className: this.props.className || "swiper-slide"
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

        var slideClasses = classNames(
            this.state.className,
            this.props.className,
            {'hover': this.state.isActive || this.props.isActive}
        );

        return (

            <div className={slideClasses} onClick={this.onClick}>

                <div className="slide-number">{i18n._('slide.set') + this.state.slideNumber}</div>
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

        );
    }
});
var Slide = React.createClass(SlideClass);


var SwiperClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    componentDidMount: function () {

        if(null == this.swiper){
            this.swiper = new libSwiper (this.refs.swiperConatiner.getDOMNode(), {

                direction: 'horizontal',
                loop: false,
                pagination: '.swiper-pagination',
                slidesPerView: 2,
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 0

            });
        }
    },

    render: function () {

        return (
            <div ref="swiperConatiner" className="swiper-container">

                <div className="swiper-wrapper">
                    <Slide slideNumber="1" />
                    <Slide slideNumber="2" />
                    <Slide slideNumber="3" />
                    <Slide slideNumber="4" />
                    <Slide slideNumber="5" />
                </div>

                <div className="swiper-pagination"></div>

            </div>
        );
    }
});
module.exports.Swiper = React.createClass(SwiperClass);
module.exports.Swiper.Class = SwiperClass;