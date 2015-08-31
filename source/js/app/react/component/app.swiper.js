/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var libSwiper = require('./../../../app/libs/swiper.jquery');

module.exports = {};


var SLIDE_LAYOUT = "instructions";


var SlideClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        className: React.PropTypes.string,
        isActive: React.PropTypes.bool,
        layout: React.PropTypes.oneOf(["locked","instructions","unlocked"]),
        lockImgPath: React.PropTypes.string,
        playerName: React.PropTypes.string,
        playImgPath: React.PropTypes.string,
        roundsComplete: React.PropTypes.number,

        slideData: React.PropTypes.shape({
            backgroundColor: React.PropTypes.string,
            name: React.PropTypes.shape({
                en: React.PropTypes.string,
                ru: React.PropTypes.string
            }),
            numberOfRoundsRequired: React.PropTypes.number,
            rounds: React.PropTypes.arrayOf(React.PropTypes.object)
        }),

        slideNumber: React.PropTypes.number,
        slideScore: React.PropTypes.number

    },

    getInitialState: function () {

        return {

            backgroundColor: this.props.slideData.backgroundColor || "#0000ff",
            className: this.props.className || "swiper-slide",
            isActive: this.props.isActive || false,
            layout: this.props.layout || 'locked',
            lockImgPath: this.props.imgPath || 'slide/lock',
            playerName: this.props.playerName || i18n._('playerName'),
            playImgPath: this.props.imgPath || 'slide/play',
            roundsComplete: this.props.roundsComplete || 1,
            roundsTotal: this.props.slideData.rounds.length || 1,
            slideData: this.props.slideData,
            slideNumber: this.props.slideNumber || 0,
            slideScore: this.props.slideScore || 999999,
            titleEn: this.props.slideData.name.en || "Set #?",
            titleRu: this.props.slideData.name.ru || "Комплект №?"

        };

    },

    onClick: function (e) {
        e.preventDefault();

        if (!this.state.isActive) {
            this.setState({isActive: true}, function () {
                setTimeout(function () {
                    if (this.isMounted()) {
                        this.setState({isActive: false});
                    }
                }.bind(this), 300);
            });
        }

        if (this.props.onClick && typeof this.props.onClick == 'function') {
            this.props.onClick(this.props);
        }
    },

    renderLocked: function () {

        var lockImg = {
            backgroundImage: "url('" + this.getImagePath(this.state.lockImgPath) + "')"
        };

        var slideClasses = classNames(
            this.state.className,
            this.props.className,
            'locked',
            {'hover': this.state.isActive || this.props.isActive}
        );

        var style = {
            backgroundColor: this.state.backgroundColor
        };

        var title;
        if (router.getLanguage() == "ru") {
            title = this.state.titleRu;
        } else if (router.getLanguage() == "en") {
            title = this.state.titleEn;
        }

        return (

            <div className={slideClasses} style={style} onClick={this.onClick}>

                <div className="slide-title">{title}</div>
                <div className="player-name">{this.state.playerName}</div>
                <div className="lock" style={lockImg}></div>
                <div className="stats">0/{this.state.roundsTotal}</div>

            </div>

        );

    },

    renderInstructions: function () {

        var slideClasses = classNames(
            this.state.className,
            this.props.className,
            'instructions',
            {'hover': this.state.isActive || this.props.isActive}
        );

        var style = {
            backgroundColor: this.state.backgroundColor
        };

        var title;
        if (router.getLanguage() == "ru") {
            title = this.state.titleRu;
        } else if (router.getLanguage() == "en") {
            title = this.state.titleEn;
        }

        return (

            <div className={slideClasses} style={style} onClick={this.onClick}>

                <div className="slide-title">{title}</div>
                <div className="player-name">{this.state.playerName}</div>
                <div className="text"><span>{i18n._('slide.instructions')}</span></div>
                <div className="purchase">{i18n._('slide.buy')}</div>

            </div>

        );

    },

    renderUnlocked: function () {

        var progress = {
            width: (this.state.roundsComplete / this.state.roundsTotal * 6.250) + "rem"
        };

        var playImg = {
            backgroundImage: "url('" + this.getImagePath(this.state.playImgPath) + "')"
        };

        var slideClasses = classNames(
            this.state.className,
            this.props.className,
            'unlocked',
            {'hover': this.state.isActive || this.props.isActive}
        );

        var style = {
            backgroundColor: this.state.backgroundColor
        };

        var title;
        if (router.getLanguage() == "ru") {
            title = this.state.titleRu;
        } else if (router.getLanguage() == "en") {
            title = this.state.titleEn;
        }

        return (

            <div className={slideClasses} style={style} onClick={this.onClick}>

                <div className="slide-title">{title}</div>
                <div className="player-name">{this.state.playerName}</div>

                <div className="rounds-complete">
                    <div className="stats">{this.state.roundsComplete}/{this.state.roundsTotal}</div>
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

    },

    render: function () {

        switch (this.state.layout) {
            case "locked":
                return this.renderLocked();
            case "instructions":
                return this.renderInstructions();
            case "unlocked":
                return this.renderUnlocked();
        }

    }

});
var Slide = React.createClass(SlideClass);


var SwiperClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    componentDidMount: function () {

        if (null == this.swiper) {
            this.swiper = new libSwiper(this.refs.swiperConatiner.getDOMNode(), {

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

    getSlideData: function () {
        return appManager.getSettings().getRoundsBundle();
    },

    render: function () {

        var slides = this.getSlideData().map(function (slide, slideIndex, allSlides) {

            return (
                <Slide
                    layout={SLIDE_LAYOUT}
                    slideData={slide}
                    slideNumber={slideIndex+1}
                    />
            )

        });

        return (
            <div ref="swiperConatiner" className="swiper-container">

                <div className="swiper-wrapper">
                    {slides}
                </div>

                <div className="swiper-pagination"></div>

            </div>
        );
    }
});
module.exports.Swiper = React.createClass(SwiperClass);
module.exports.Swiper.Class = SwiperClass;