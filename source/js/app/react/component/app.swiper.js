"use strict";

var classNames = require('classnames');
var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var libSwiper = require('./../../../app/libs/swiper.jquery');

module.exports = {};

var LAYOUT_LOCKED = 'locked';
var LAYOUT_UNLOCKED = 'unlocked';

var SlideClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        slideData: React.PropTypes.shape({
            backgroundColor: React.PropTypes.string,
            name: React.PropTypes.shape({
                en: React.PropTypes.string,
                ru: React.PropTypes.string
            }),
            numberOfRoundsRequired: React.PropTypes.number,
            rounds: React.PropTypes.arrayOf(React.PropTypes.object)
        }),

        slideIndex: React.PropTypes.number

    },

    getInitialState: function () {

        var state = {

            slideData: this.props.slideData || {},
            slideIndex: this.props.slideIndex || 0

        };

        var slideGameState = this.getStateSlideGameState(state.slideIndex);
        state.isUnlocked = slideGameState && slideGameState.isUnlocked ?  true : false;
        state.layout = state.isUnlocked ? LAYOUT_UNLOCKED : LAYOUT_LOCKED;

        return state;

    },

    getStateSlideGameState: function (idx) {

        return appManager.getGameState().getRoundsBundles(idx);

    },

    render: function () {

        var slideClasses = classNames(
            'swiper-slide',
            this.state.layout,
            {'hover': this.state.isActive}
        );

        var slideStyle = {
            backgroundColor: this.state.slideData.backgroundColor
        };

        var slideTitle;
        if (router.getLanguage() == "ru") {
            slideTitle = this.state.slideData.name.ru;
        } else if (router.getLanguage() == "en") {
            slideTitle = this.state.slideData.name.en;
        }

        return (

            <div className={slideClasses} style={slideStyle} onClick={this.onClick}>

                <div className="slide-title">{slideTitle}</div>

            </div>

        )

    }


});
var Slide = React.createClass(SlideClass);


var CLASSNAME = "swiper-slide";
var LAYOUT_INSTRUCTIONS = 'instructions';

var LOCK_IMG_PATH = 'slide/lock';
var PLAYER_NAME = i18n._('playerName');
var PLAY_IMG_PATH = 'slide/play';
var ROUNDS_COMPLETE = 1;
var SLIDE_SCORE = 999999;

var SlideClassOld = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        slideData: React.PropTypes.shape({
            backgroundColor: React.PropTypes.string,
            name: React.PropTypes.shape({
                en: React.PropTypes.string,
                ru: React.PropTypes.string
            }),
            numberOfRoundsRequired: React.PropTypes.number,
            rounds: React.PropTypes.arrayOf(React.PropTypes.object)
        }),

        slideIndex: React.PropTypes.number

    },

    getInitialState: function () {

        var state = {

            //Оставил то что будет менятся


            //backgroundColor: this.props.slideData.backgroundColor || "#0000ff",
            //className: CLASSNAME || "swiper-slide",
            instructions: false,
            isActive: false,
            //isUnlocked: false,
            //layout: LAYOUT_LOCKED,
            //lockImgPath: LOCK_IMG_PATH,
            //playerName: PLAYER_NAME,
            //playImgPath: PLAY_IMG_PATH,
            //roundsComplete: 1,
            //roundsTotal: this.props.slideData.rounds.length || 1,
            
            slideData: this.props.slideData || {},
            //slideIndex: this.props.slideIndex || 0,
            
            //slideNumber: this.props.slideIndex + 1 || 1,
            slideScore: SLIDE_SCORE || 0
        
        };

        //unpack slideData
        var slideData = this.getSlideData(state.slideIndex);

        //set isUnlocked
        state.isUnlocked = slideData && slideData.isUnlocked ?  true : false;

        //set layout
        if (state.isUnlocked) {
            state.layout = LAYOUT_UNLOCKED;
        } else if (!state.isUnlocked) {
            state.layout = LAYOUT_LOCKED;
        } else if (!state.isUnlocked && state.instructions) {
            state.layout = LAYOUT_INSTRUCTIONS;
        }

        
        
        return state;
    },

    getSlideData: function (idx) {

        return appManager.getGameState().getRoundsBundles(idx);

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

        var state = {
            instructions: this.state.instructions ? false : true
        };

        this.setState(state);

        return true;

    },

    onClickGame: function () {

        router.navigate("game", "main");

    },

    onClick: function (e) {

        this.onClickEffect(e);

        this.state.isUnlocked ? this.onClickGame() : this.onClickInstructions() ;

    },

    renderLocked: function () {

        var lockImg = {
            backgroundImage: "url('" + this.getImagePath(this.state.lockImgPath) + "')"
        };

        var slideClasses = classNames(
            this.state.className,
            'locked',
            {'hover': this.state.isActive}
        );

        var style = {
            backgroundColor: this.state.backgroundColor
        };

        var title;
        if (router.getLanguage() == "ru") {
            title = this.state.slideData.name.ru;
        } else if (router.getLanguage() == "en") {
            title = this.state.slideData.name.en;
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
            'instructions',
            {'hover': this.state.isActive}
        );

        var style = {
            backgroundColor: this.state.slideData.backgroundColor
        };

        var title;
        if (router.getLanguage() == "ru") {
            title = this.state.slideData.name.ru;
        } else if (router.getLanguage() == "en") {
            title = this.state.slideData.name.en;
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
            'unlocked',
            {'hover': this.state.isActive}
        );

        var style = {
            backgroundColor: this.state.backgroundColor
        };

        var title;
        if (router.getLanguage() == "ru") {
            title = this.state.slideData.name.ru;
        } else if (router.getLanguage() == "en") {
            title = this.state.slideData.name.en;
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

        return this.state.isUnlocked ? this.renderUnlocked() : this.renderLocked() ;

    },
    
    renderNew: function () {
        
        
        
    }

});

var SwiperClass = Object.assign({}, {}, {

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