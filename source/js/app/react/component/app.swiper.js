/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var libSwiper = require('./../../../app/libs/swiper.jquery');

module.exports = {};

var SLIDE_LAYOUT_LOCKED = "locked";
var SLIDE_LAYOUT_INSTRUCTIONS = "instructions";
var SLIDE_LAYOUT_UNLOCKED = "unlocked";


var SlideClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        className: React.PropTypes.string,
        instructions: React.PropTypes.bool,
        isActive: React.PropTypes.bool,
        isLocked: React.PropTypes.bool,
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

        slideIndex: React.PropTypes.number,
        slideNumber: React.PropTypes.number,
        slideScore: React.PropTypes.number

    },

    getInitialState: function () {

        var state = {
            //backgroundColor: this.props.slideData.backgroundColor || "#0000ff",
            //className: this.props.className || "swiper-slide",
            //instructions: this.props.instructions || false,
            //isActive: this.props.isActive || false,
            //isLocked: this.props.isLocked || true,
            //lockImgPath: this.props.imgPath || 'slide/lock',
            //playerName: this.props.playerName || i18n._('playerName'),
            //playImgPath: this.props.imgPath || 'slide/play',
            //roundsComplete: this.props.roundsComplete || 1,
            //roundsTotal: this.props.slideData.rounds.length || 1,
            //slideData: this.props.slideData,
            //slideIndex: this.props.slideIndex || 0,
            //slideNumber: this.props.slideNumber || this.props.slideIndex + 1 || 0,
            //slideScore: this.props.slideScore || 999999,
            //titleEn: this.props.slideData.name.en,
            //titleRu: this.props.slideData.name.ru,
            //
            slideData: this.props.slideData,
            slideIndex: this.props.slideIndex || 0
        };

        var slideData = this.getSlideData(state.slideIndex);
        state.isLocked = !slideData || !slideData.isUnLocked ?  true : false

        return state;
    },

    getSlideData: function (idx) {

        return appManager.getGameState().getRoundsBundles(idx);

    },

    componentWillMount: function () {

    },

    onClickEffect: function (e) {

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

    onClickInstructions: function () {

        if (!this.state.isLocked) {
            return false;
        }

        var state = {
            instructions: this.state.instructions ? false: true
        };

        this.setState(state);

        return true;

    },

    onClickGame: function () {
        router.navigate("game", "main");
    },

    onClick: function (e) {

        this.onClickEffect(e);

        this.state.isLocked ? this.onClickInstructions(): this.onClickGame() ;

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

        if (this.state.instructions) {
            return this.renderInstructions();
        }

        return this.state.isLocked ? this.renderLocked(): this.renderUnlocked();

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

    getSlidesData: function () {
        return appManager.getSettings().getRoundsBundles();
    },

    render: function () {

        var slides = this.getSlidesData().map(function (slide, slideIndex, allSlides) {

            return (
                <Slide
                    slideData={slide}
                    slideIndex={slideIndex}
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