"use strict";


module.exports = {};

var GameMixin = require('./../component/app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var StartAd = require('./../component/app.startad').StartAd;
var SimpleButton = require('./../component/app.button').SimpleButton;

var PageGameVictoryAbstract = Object.assign({}, {}, {

    getInitialState: function () {
        var state = {
            containerExtraClass: '',
            starsReceived: parseInt(router.getParam('starsReceived')) || 3,
            rewardScore: parseInt(router.getParam('rewardScore')) || 0,
            rewardCoins: parseInt(router.getParam('rewardCoins')) || 0
        };

        return state;
    },

    componentWillMount: function () {
        appManager.getMusicManager().stop();
        appManager.getSFXManager().playWin();
        appAd.hideBanner();
    },

    componentDidMount: function () {
        console.log('componentDidMount not implemented.');
    },

    componentWillUnmount: function () {
        appAd.showBottomBanner();
    },

    selectStarArrangement: function () {
        var starsReceived = this.state.starsReceived;
        var star1Full = "url('" + this.getImagePath('victory/star_full_left') + "')";
        var star2Empty = "url('" + this.getImagePath('victory/star_empty_mid') + "')";
        var star2Full = "url('" + this.getImagePath('victory/star_full_mid') + "')";
        var star3Empty = "url('" + this.getImagePath('victory/star_empty_right') + "')";
        var star3Full = "url('" + this.getImagePath('victory/star_full_right') + "')";
        var starArrangement = [];

        switch (starsReceived) {
            case 1:
                starArrangement = [star1Full, star2Empty, star3Empty];
                break;
            case 2:
                starArrangement = [star1Full, star2Full, star3Empty];
                break;
            case 3:
                starArrangement = [star1Full, star2Full, star3Full];
                break;
            default:
                starArrangement = [star1Full, star2Empty, star3Empty];
        }

        return starArrangement;
    },

    getStarClasses: function () {
        var starsReceived = this.state.starsReceived;
        var starFull = "star-full";
        var starEmpty = "star-empty";
        var starClasses = [];

        switch (starsReceived) {
            case 1:
                starClasses = [starFull, starEmpty, starEmpty];
                break;
            case 2:
                starClasses = [starFull, starFull, starEmpty];
                break;
            case 3:
                starClasses = [starFull, starFull, starFull];
                break;
            default:
                starClasses = [starFull, starEmpty, starEmpty];
        }

        return starClasses;
    },

    getStars: function () {
        var starArrangement = this.selectStarArrangement();
        var styleStar1 = {backgroundImage: starArrangement[0]};
        var styleStar2 = {backgroundImage: starArrangement[1]};
        var styleStar3 = {backgroundImage: starArrangement[2]};

        var starClasses = this.getStarClasses();
        var star1Classes = classNames("star1", starClasses[0]);
        var star2Classes = classNames("star2", starClasses[1]);
        var star3Classes = classNames("star3", starClasses[2]);

        return (
            <div className="stars">
                <div className="star-line">
                    <div className="star1 star-empty"
                         style={{backgroundImage: "url('" + this.getImagePath('victory/star_empty_left') + "')"}}></div>
                    <div className="star2 star-empty"
                         style={{backgroundImage: "url('" + this.getImagePath('victory/star_empty_mid') + "')"}}></div>
                    <div className="star3 star-empty"
                         style={{backgroundImage: "url('" + this.getImagePath('victory/star_empty_right') + "')"}}></div>
                </div>
                <div className="star-line">
                    <div className={star1Classes} style={styleStar1}></div>
                    <div className={star2Classes} style={styleStar2}></div>
                    <div className={star3Classes} style={styleStar3}></div>
                </div>
            </div>
        )
    },

    onStartAdUpdate: function () {
        var $pageContent = $(this.refs.pageContent.getDOMNode());
        if (this.refs.pageContent.getDOMNode().clientHeight - parseInt($pageContent.css('padding-bottom')) > this.refs.container.getDOMNode().offsetHeight) {
            this.state.containerExtraClass = 'transform-center';
        } else {
            this.state.containerExtraClass = '';
        }

        this.setState({containerExtraClass: this.state.containerExtraClass});
    },

    onClick: function () {
        console.log('onClick not implemented.');
    },

    render: function () {
        //console.log({victoryRoundsComplete: appManager.getGameState().getRoundsBundles(this.state.roundsBundleIdx).roundsComplete});

        var progressBar = {
            width: (this.state.roundsCompleteToShow / this.state.roundsTotal * 6.250) + "rem"
        };
        var rewardStar = {
            backgroundImage: "url('" + this.getImagePath('counter/star') + "')"
        };
        var rewardDollar = {
            backgroundImage: "url('" + this.getImagePath('counter/coins') + "')"
        };
        var background = {
            backgroundColor: this.state.backgoundColor
        };

        var wallpaper = {
            backgroundImage: "url('" + Utils.getImgPath('wallpaper/fon.png') + "')"
        };

        return (

            <div className="page page-game-victory" style={wallpaper}>
                <Counters />

                <div ref="pageContent" className="page-content">

                    <div ref="container" className={classNames("container", this.state.containerExtraClass)}
                         style={background}>

                        <div className="excellent">{i18n._('victory.excellent')}</div>

                        {this.getStars()}

                        <div className="rounds-complete">
                            <div className="progress-bar">
                                <div className="panel"></div>
                                <div
                                    className={classNames("fill",this.state.roundsCompleteToShow == this.state.roundsComplete ? "complete" : "")}
                                    style={progressBar}>
                                </div>
                            </div>
                            <div className="stats">{this.state.roundsComplete}/{this.state.roundsTotal}</div>
                        </div>

                        <div className="your-reward">{i18n._('victory.yourReward')}</div>

                        <div className="rewards">
                            <div className="score" style={rewardStar}>{this.state.rewardScore}</div>
                            <div className="coins" style={rewardDollar}>{this.state.rewardCoins}</div>
                        </div>

                        <div className="continue">
                            <SimpleButton className="button"
                                          onClick={this.onClick}>{i18n._('victory.continue')}</SimpleButton>
                        </div>


                        <StartAd onUpdate={this.onStartAdUpdate}/>
                    </div>

                </div>
            </div>

        );
    }

});

var PageGameLearnVictory = Object.assign({}, PageGameVictoryAbstract, {

    displayName: 'PageGameLearnVictory',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = PageGameVictoryAbstract.getInitialState.apply(this);

        state.roundsComplete = 1;
        state.roundsTotal = 1;
        state.roundsCompleteToShow = state.roundsComplete - 1;

        return state;
    },

    componentDidMount: function () {
        window.appAnalytics.trackView('pageGameLearnVictory');
        appDialogs.getRateDialog().showIfTime();

        this.onStartAdUpdate();

        this.setState({
            roundsCompleteToShow: this.state.roundsComplete
        });
    },

    onClick: function () {
        var roundsBundlesGameData = appManager.getSettings().getRoundsBundles();
        var roundsBundleIdx = 0;
        var roundIdx = 0;
        for (var i = 0; i < roundsBundlesGameData.length; i++) {
            var roundsBundlesGameState = appManager.getGameState().getRoundsBundles(i);

            if (roundsBundlesGameState.roundsComplete < roundsBundlesGameData[i].rounds.length) {
                roundsBundleIdx = i;
                roundIdx = roundsBundlesGameState.roundsComplete;
                break;
            }
        }

        var params = {
            roundsBundleIdx: roundsBundleIdx,
            roundIdx: roundIdx
        };

        router.navigate("game", "main", params);
    }

});
module.exports.PageGameLearnVictory = React.createClass(PageGameLearnVictory);
module.exports.PageGameLearnVictory.Class = PageGameLearnVictory;

var PageGameVictory = Object.assign({}, PageGameVictoryAbstract, {

    displayName: 'PageGameVictory',
    mixins: [GameMixin],
    clickedContinue: false,

    getInitialState: function () {
        var state = PageGameVictoryAbstract.getInitialState.apply(this);

        state.roundsBundleIdx = parseInt(router.getParam('roundsBundleIdx')) || 0;
        state.roundIdx = parseInt(router.getParam('roundIdx')) || 0;

        state.nextRoundsBundleIdx = parseInt(router.getParam('nextRoundsBundleIdx')) || 0;
        state.nextRoundIdx = parseInt(router.getParam('nextRoundIdx')) || 0;

        state.roundsComplete = this.getGameStateRoundsBundleField(state.roundsBundleIdx, 'roundsComplete') || 0;
        var rounds = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].rounds;
        state.roundsTotal = rounds.length || 1;
        state.roundsCompleteToShow = state.roundsComplete - 1;
        state.backgoundColor = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].backgroundColor || "#ff5722";

        return state;
    },

    componentWillMount: function () {
        PageGameVictoryAbstract.componentWillMount.apply(this);
        this.showFullScreenAd();
    },

    showFullScreenAd: function () {
        if (this.state.roundsBundleIdx == 0 && this.state.roundIdx < 5) {
            //console.log("no Ad");
            return;
        }

        appAd.showInterstitial();
    },

    componentDidMount: function () {
        window.appAnalytics.trackView('pageGameVictory');

        if (CONST.CURRENT_PLATFORM == CONST.PLATFORM_IOS) {
            appDialogs.getRequirePushDialog().showIfTime();
        }

        appDialogs.getRateDialog().showIfTime();
        this.onStartAdUpdate();

        this.setState({
            roundsCompleteToShow: this.state.roundsComplete
        });
    },

    getGameStateRoundsBundleField: function (roundsBundleIdx, field) {
        return appManager.getGameState().getRoundsBundles(roundsBundleIdx)[field];
    },

    checkIfRoundAlreadyComplete: function (roundsBundleIdx, roundIdx) {
        var wordsTotal = appManager.getSettings().getRoundsBundles()[roundsBundleIdx].rounds[roundIdx].words.length || 1;
        var board = appManager.getGameState().getRound(roundsBundleIdx, roundIdx)["board"] || {};
        var wordsComplete = 0;

        for (var k in board) {
            if (!board.hasOwnProperty(k)) {
                continue;
            }

            if (!board[k].openWord) {
                continue;
            }
            wordsComplete++;
        }

        return wordsComplete == wordsTotal;
    },

    onClick: function () {
        if (this.clickedContinue) {
            console.log("continue already clicked");
            return;
        }
        this.clickedContinue = true;

        if (this.state.nextRoundsBundleIdx >= appManager.getSettings().getRoundsBundles().length) {
            console.log("roundsBundleId greater than total");
            router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
            return;
        }
        if (this.state.nextRoundIdx >= appManager.getSettings().getRoundsBundles()[this.state.nextRoundsBundleIdx].rounds.length) {
            console.log("roundId greater than total rounds in next roundsBundle");
            router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
            return;
        }
        if (this.checkIfRoundAlreadyComplete(this.state.nextRoundsBundleIdx, this.state.nextRoundIdx)) {
            console.log("next round already complete");
            router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
            return;
        }

        var params = {
            roundsBundleIdx: this.state.nextRoundsBundleIdx,
            roundIdx: this.state.nextRoundIdx
        };
        router.navigate("game", "main", params);
    }


});
module.exports.PageGameVictory = React.createClass(PageGameVictory);
module.exports.PageGameVictory.Class = PageGameVictory;