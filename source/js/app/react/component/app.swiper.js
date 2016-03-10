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

var PRODUCT = require('./../../model/app.store').PRODUCT;


var SlideClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {
        slideData: React.PropTypes.shape({
            backgroundColor: React.PropTypes.string,
            name: React.PropTypes.string,
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

        //console.log("slideIndex");
        //console.log(state.slideIndex);
        //console.log("isUnlocked");
        //console.log(slideGameState.isUnlocked);
        //console.log("isPurchased");
        //console.log(slideGameState.isPurchased);

        state.isUnlocked = slideGameState.isPurchased || slideGameState.isUnlocked ? true : false;
        state.layout = state.isUnlocked ? LAYOUT_UNLOCKED : LAYOUT_LOCKED;
        var roundsComplete = slideGameState.roundsComplete;
        var roundsTotal = state.slideData.rounds.length;
        if (roundsComplete >= roundsTotal) {
            state.layout = LAYOUT_COMPLETE;
        }

        return state;
    },

    componentDidMount: function () {
        appManager.getGameState().addChangeRoundsBundlesListener(this.update);
    },

    componentWillUnmount: function () {
        appManager.getGameState().removeChangeRoundsBundlesListener(this.update);
    },

    update: function () {
        var slide = appManager.getGameState().getRoundsBundles(this.state.slideIndex);

        if (!slide.isUnlocked && !slide.isPurchased) {
            return;
        }

        if (this.state.layout == LAYOUT_COMPLETE) {
            return;
        }

        //console.log("changing layout to unlocked slide number " + (this.state.slideIndex + 1));

        this.setState({
            isUnlocked: true,
            layout: LAYOUT_UNLOCKED
        });
    },

    getSlideGameState: function (idx) {
        if (!appManager.getGameState().getRoundsBundles(idx)) {
            appManager.getGameState().setRoundsBundles(idx, "bundleScore", 0);
            appManager.getGameState().setRoundsBundles(idx, "roundsComplete", 0);

            var index = idx - 1 >= 0 ? idx - 1 : 0;
            var numberOfRoundsRequired = parseInt(appManager.getSettings().getRoundsBundles()[index].numberOfRoundsRequired);

            if (idx == 0 || numberOfRoundsRequired == 0) {
                appManager.getGameState().setRoundsBundles(idx, "isUnlocked", true);
            } else {
                appManager.getGameState().setRoundsBundles(idx, "isUnlocked", false);
            }
        }

        return appManager.getGameState().getRoundsBundles(idx) || {};
    },

    onClickEffect: function (e) {
        e.preventDefault();

        if (!this.state.isActive) {
            appManager.getSFXManager().playButton();

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

        var practiceRoundComplete = appManager.getGameState().getPracticeRoundComplete() || false;
        if (practiceRoundComplete === false) {
            var roundsComplete = this.countRoundsComplete();

            if (roundsComplete == 0) {
                router.navigate("learn", "index");
                return;
            }
        }

        router.navigate("game", "main", params);
    },

    countRoundsComplete: function () {
        var roundsBundlesState = appManager.getGameState().getRoundsBundles();
        var roundsComplete = 0;

        for (var key in roundsBundlesState) {
            if (!roundsBundlesState.hasOwnProperty(key)) {
                continue;
            }

            if (isNaN(roundsBundlesState[key].roundsComplete)) {
                continue;
            }

            roundsComplete += roundsBundlesState[key].roundsComplete;
        }

        //console.log(roundsComplete);
        return roundsComplete;
    },

    onClickInstructions: function () {
        var layout = this.state.layout == LAYOUT_INSTRUCTIONS ? LAYOUT_LOCKED : LAYOUT_INSTRUCTIONS;
        this.setState({layout: layout});
    },

    onClickBuySet: function (buttonProps, e) {
        e.stopPropagation();

        var productId = this.getProductId();
        //console.log(productId);

        var loadingDialog = appDialogs.getLoadingDialog();
        loadingDialog.show();

        appStore.order(productId);

        setTimeout(function () {
            loadingDialog.hide();
        }, 5000);
    },

    getProductId: function () {
        var roundsBundleIds = PRODUCT.ROUNDSBUNDLES[router.getLanguage().toUpperCase()];

        for (var k in roundsBundleIds) {
            if (!roundsBundleIds.hasOwnProperty(k)) {
                continue;
            }

            if (roundsBundleIds[k] == this.state.slideIndex) {
                return k;
            }
        }

        return "";
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
        var index = this.state.slideIndex - 1;
        var roundsCompletePrevSlide = appManager.getGameState().getRoundsBundles(index).roundsComplete;
        var roundsNeededToUnlock = appManager.getSettings().getRoundsBundles()[index].numberOfRoundsRequired;
        var roundsLeftTillUnlock = roundsNeededToUnlock - roundsCompletePrevSlide;

        if (roundsLeftTillUnlock < 0) {
            roundsLeftTillUnlock = 0;
        }

        return (

            <div>

                <div className="text">
                    <span>{i18n._('slide.instructions', roundsLeftTillUnlock)}</span>
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

        var slideTitle = this.state.slideData.name;

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

    propTypes: {
        initialSlide: React.PropTypes.number,
        allRoundsBundlesComplete: React.PropTypes.bool
    },

    getInitialState: function () {
        return {
            isActive: false,
            slideSoon: appManager.getSettings().getSlideSoon() || {
                isShown: false,
                backgroundColor: ""
            }
        }
    },

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

    onClickEffect: function (e) {
        e.preventDefault();

        //appManager.getGameState().setRoundsBundles(9, "isPurchased", true);
        //appManager.getGameState().addCoins(9999);

        //appManager.getGameState().setRemoveAds(true);
        //appAd.setAdRemoved(true);

        if (!this.state.isActive) {
            appManager.getSFXManager().playButton();

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

    getSlidesData: function () {
        return appManager.getSettings().getRoundsBundles();
    },

    renderSlideTryThisGame: function () {
        if (this.props.allRoundsBundlesComplete !== true) {
            return;
        }

        var slideClasses = classNames(
            'swiper-slide',
            'slide-try-this-game',
            {'hover': this.state.isActive}
        );

        var gameIcon = {
            backgroundImage: "url(/build/img/wallpaper/fon.png)"
        };

        return (
            <div className={slideClasses} onClick={this.onClickEffect}>
                <div className="centered-block">
                    <div className="game-icon" style={gameIcon}></div>
                    <div className="game-title">Game Title</div>
                    <div className="play">
                        <span>{i18n._('slide.tryThisGame.play')}</span>
                    </div>
                </div>
            </div>
        );
    },

    renderSlideSoon: function () {
        if (this.state.slideSoon.isShown !== true) {
            return;
        }

        var slideClasses = classNames(
            'swiper-slide',
            'slide-soon',
            {'hover': this.state.isActive}
        );

        var soonSlideStyle = {
            backgroundColor: this.state.slideSoon.backgroundColor
        };

        return (
            <div className={slideClasses} style={soonSlideStyle} onClick={this.onClickEffect}>
                <div className="message">
                    <span>{i18n._('slide.soon')}</span>
                </div>
            </div>
        );
    },

    render: function () {
        //console.log(this.swiper);

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
                    {this.renderSlideTryThisGame()}

                    {slides}

                    {this.renderSlideSoon()}
                </div>

                <div className="swiper-pagination"></div>

            </div>
        );
    }

});
module.exports.Swiper = React.createClass(SwiperClass);
module.exports.Swiper.Class = SwiperClass;