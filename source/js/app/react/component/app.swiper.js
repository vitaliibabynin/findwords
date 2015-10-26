"use strict";


var classNames = require('classnames');
var GameMixin = require('./app.mixin').GameMixin;
var IconButton = require('./app.button').IconButton;
var Object = {assign: require('react/lib/Object.assign')};
var libSwiper = require('./../../../app/libs/swiper.jquery');


module.exports = {};


var LAYOUT_INSTRUCTIONS = 'instructions';
var LAYOUT_LOCKED = 'locked';
var LAYOUT_UNLOCKED = 'unlocked';
var LAYOUT_COMPLETE = 'complete';
var LAYOUT_COMPLETE_MESSAGE = 'message';


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
        var slideGameState = this.getSlideGameState(state.slideIndex);
        state.isUnlocked = slideGameState && slideGameState.isUnlocked ? true : false;
        state.layout = state.isUnlocked ? LAYOUT_UNLOCKED : LAYOUT_LOCKED;
        var slideComplete = this.checkIfSlideComplete(state.slideIndex, state.slideData);
        if (slideComplete) {
            state.layout = LAYOUT_COMPLETE;
        }

        return state;
    },

    getSlideGameState: function (idx) {
        return appManager.getGameState().getRoundsBundles(idx);
    },

    checkIfSlideComplete (idx, slideData) {
        var roundsComplete = this.getSlideGameState(idx).roundsComplete;
        var roundsTotal = slideData.rounds.length;

        return roundsComplete == roundsTotal;
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

    onClickGame: function () {
        var params = this.getParams();

        if (params === false) {
            return;
        }

        router.navigate("game", "main", params);
    },

    onClickInstructions: function () {
        var layout = this.state.layout == LAYOUT_INSTRUCTIONS ? LAYOUT_LOCKED : LAYOUT_INSTRUCTIONS;
        this.setState({layout: layout});
    },

    onClickBuySet: function (buttonProps, e) {
        e.stopPropagation();

        this.onClickGame();
    },

    onClickComplete: function () {
        var layout = this.state.layout == LAYOUT_COMPLETE_MESSAGE ? LAYOUT_COMPLETE : LAYOUT_COMPLETE_MESSAGE;
        this.setState({layout: layout});
    },

    onClick: function (buttonProps, e) {
        this.onClickEffect(buttonProps);

        this.state.isUnlocked ? this.onClickGame() : this.onClickInstructions();

        if (this.state.layout == LAYOUT_COMPLETE || this.state.layout == LAYOUT_COMPLETE_MESSAGE) {
            this.onClickComplete();
        }
    },

    getParams: function () {
        var slideIdx = this.state.slideIndex;
        var roundIdx = appManager.getGameState().getRoundsBundles(slideIdx).roundsComplete;
        var roundsBundleGameData = appManager.getSettings().getRoundsBundles()[slideIdx].rounds;
        var roundsTotal = roundsBundleGameData.length;

        if (roundIdx >= roundsTotal) {
            return false;
        }

        return {
            roundsBundleIdx: slideIdx,
            roundIdx: roundIdx
        }
    },

    renderComplete: function () {
        var slideGameState = this.getSlideGameState(this.state.slideIndex);

        var doneImg = {
            backgroundImage: "url('" + this.getImagePath('slide/done') + "')"
        };

        return (

            <div>

                <div className="subheading">{i18n._('slide.complete')}</div>

                <div className="done" style={doneImg}></div>

                <div className="score">{i18n._('slide.score')} {slideGameState.bundleScore}</div>

            </div>

        );
    },

    renderCompleteMessage: function () {
        return (
            <div className="text">
                <span>{i18n._('slide.complete.message')}</span>
            </div>
        );
    },

    renderUnlocked: function () {
        var slideGameState = this.getSlideGameState(this.state.slideIndex);

        var progressBar = {
            width: (slideGameState.roundsComplete / this.state.slideData.rounds.length * 6.250) + "rem"
        };

        var playImg = {
            backgroundImage: "url('" + this.getImagePath('slide/play') + "')"
        };

        return (

            <div>

                <div className="rounds-complete">
                    <div className="stats">{slideGameState.roundsComplete}/{this.state.slideData.rounds.length}</div>
                    <div className="progress-bar">
                        <div className="panel">
                        </div>
                        <div className="fill" style={progressBar}>
                        </div>
                    </div>
                </div>

                <div className="play" style={playImg}></div>

                <div className="score">{i18n._('slide.score')} {slideGameState.bundleScore}</div>

            </div>

        );
    },

    renderLocked: function () {
        var lockImg = {
            backgroundImage: "url('" + this.getImagePath('slide/lock') + "')"
        };

        return (

            <div>
                <div className="lock" style={lockImg}></div>
                <div className="stats">0/{this.state.slideData.rounds.length}</div>
            </div>

        );
    },

    renderInstructions: function () {
        return (

            <div>

                <div className="text">
                    <span>{i18n._('slide.instructions')}</span>
                </div>

                <IconButton onClick={this.onClickBuySet}
                            className="purchase">{i18n._('slide.buy')}
                </IconButton>

            </div>

        )
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

        var renderLayout;
        switch (this.state.layout) {
            case LAYOUT_LOCKED:
                renderLayout = this.renderLocked();
                break;
            case LAYOUT_UNLOCKED:
                renderLayout = this.renderUnlocked();
                break;
            case LAYOUT_INSTRUCTIONS:
                renderLayout = this.renderInstructions();
                break;
            case LAYOUT_COMPLETE:
                renderLayout = this.renderComplete();
                break;
            case LAYOUT_COMPLETE_MESSAGE:
                renderLayout = this.renderCompleteMessage();
                break;
            default:
                renderLayout = this.renderLocked();
        }

        return (

            <div className={slideClasses} style={slideStyle} onClick={this.onClick}>

                <div className="slide-title">{slideTitle}</div>

                {renderLayout}

            </div>

        )

    }


});
var Slide = React.createClass(SlideClass);


var SwiperClass = Object.assign({}, {}, {

    displayName: 'Swiper',

    propTypes: {initialSlide: React.PropTypes.number},

    componentDidMount: function () {
        if (null == this.swiper) {
            this.swiper = new libSwiper(this.refs.swiperConatiner.getDOMNode(), {
                direction: 'horizontal',
                loop: false,
                pagination: '.swiper-pagination',
                slidesPerView: 2,
                centeredSlides: true,
                paginationClickable: true,
                spaceBetween: 0,
                initialSlide: this.props.initialSlide || 0
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
                    key={'slide_' + slideIndex}
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