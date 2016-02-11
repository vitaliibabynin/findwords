"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var StartAd = require('./../component/app.startad').StartAd;
var SimpleButton = require('./../component/app.button').SimpleButton;


var PageGameVictory = Object.assign({}, {}, {

    displayName: 'PageGameVictory',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            containerExtraClass: '',
            roundsBundleIdx: parseInt(router.getParam('roundsBundleIdx')) || 0,
            roundIdx: parseInt(router.getParam('roundIdx')) || 0
        };
        state.starsReceived = this.getGameStateRoundField(state.roundsBundleIdx, state.roundIdx, 'starsReceived') || 3;
        //state.roundsComplete = this.getGameStateRoundsBundleField(state.roundsBundleIdx, 'roundsComplete') || 0;
        var rounds = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].rounds;
        state.roundsTotal = rounds.length || 1;
        //state.rewardScore = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].rounds[state.roundIdx].score * (state.starsReceived / 3) || 0;
        //state.rewardCoins = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].rounds[state.roundIdx].coins * (state.starsReceived / 3) || 0;
        state.rewardScore = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].rounds[state.roundIdx].bonus[state.starsReceived].score || 0;
        state.rewardCoins = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].rounds[state.roundIdx].bonus[state.starsReceived].coins || 0;

        return state;
    },

    componentWillMount: function(){
        appManager.getMusicManager().getPlayer().pause();
        appManager.getSFXManager().playWin();
        appAd.showInterstitial();
        appAd.hideBanner();
    },

    componentDidMount: function () {
        this.addRewardScore(this.state.rewardScore, this.state.roundsBundleIdx);
        this.addRewardCoins(this.state.rewardCoins);
        var roundsComplete = appManager.getGameState().getRoundsBundles(this.state.roundsBundleIdx).roundsComplete || 0;
        roundsComplete++;
        appManager.getGameState().setRoundsBundles(this.state.roundsBundleIdx, "roundsComplete", roundsComplete);

        if(appFB.isAuthorized()){
            appApi.updateRating(
                appFB.getAccessToken(),
                CONST.GAME_TYPE,
                appManager.getSettings().getGameId(),
                appManager.getGameState().getScore(),
                appManager.getGameState().getCompletedRoundsCount()
            );
        }


        this.setState({roundsComplete: roundsComplete});
        //this.forceUpdate();

        if (CONST.CURRENT_PLATFORM == CONST.PLATFORM_IOS) {
            appDialogs.getRequirePushDialog().showIfTime();
        }

        appDialogs.getRateDialog().showIfTime();
        this.onStartAdUpdate();
    },

    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},

    componentWillUnmount: function () {
        appAd.showBottomBanner();
    },

    getGameStateRoundsBundleField: function (roundsBundleIdx, field) {
        return appManager.getGameState().getRoundsBundles(roundsBundleIdx)[field];
    },

    getGameStateRoundField: function (roundsBundleIdx, roundIdx, field) {
        return appManager.getGameState().getRound(roundsBundleIdx, roundIdx)[field];
    },

    addRewardScore: function (rewardScore, roundsBundleIdx) {
        var prevTotalScore = appManager.getGameState().getScore();
        var newTotalScore = prevTotalScore + rewardScore;
        appManager.getGameState().setScore(newTotalScore);

        var prevRoundsBundleScore = appManager.getGameState().getRoundsBundles(roundsBundleIdx).bundleScore;
        var newRoundsBundleScore = prevRoundsBundleScore + rewardScore;
        appManager.getGameState().setRoundsBundles(roundsBundleIdx, 'bundleScore', newRoundsBundleScore);
    },

    addRewardCoins: function (rewardCoins) {
        var prevTotalCoins = appManager.getGameState().getCoins();
        var newTotalCoins = prevTotalCoins + rewardCoins;
        appManager.getGameState().setCoins(newTotalCoins);
    },

    nextRoundIdx: function () {
        var currentRoundIdx = this.state.roundIdx;
        var roundsTotal = this.state.roundsTotal;

        var nextRoundIdx = currentRoundIdx + 1;

        if (nextRoundIdx < roundsTotal) {
            return nextRoundIdx;
        }

        return false;
    },

    getRoundsBundleRoundsComplete: function (roundsBundleIdx) {
        var roundsBundle = appManager.getGameState().getRoundsBundles(roundsBundleIdx);
        var roundsBundleRoundsComplete = roundsBundle.roundsComplete;
        var roundsBundleRoundsTotal = appManager.getSettings().getRoundsBundles()[roundsBundleIdx].rounds.length;

        if (roundsBundleRoundsComplete == roundsBundleRoundsTotal) {
            return false;
        }

        return roundsBundleRoundsComplete;
    },

    openNextSlide: function () {
        var numberOfRoundsRequired = appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx].numberOfRoundsRequired;

        if (this.state.roundIdx >= numberOfRoundsRequired - 1) {
            var roundsBundleToOpen = this.state.roundsBundleIdx + 1;
            appManager.getGameState().setRoundsBundles(roundsBundleToOpen, 'isUnlocked', true);
        }
    },

    navigateToUncompletedRound: function (roundsBundlesGameData, roundsBundleIdx, roundIdx, index) {
        for (var i = index; i < roundsBundlesGameData.length; i++) {
            var roundsBundlesGameState = appManager.getGameState().getRoundsBundles(i);

            if (roundsBundlesGameState.roundsComplete < roundsBundlesGameData[i].rounds.length) {
                roundsBundleIdx = i;
                roundIdx = roundsBundlesGameState.roundsComplete;

                var params = {
                    roundsBundleIdx: roundsBundleIdx,
                    roundIdx: roundIdx
                };

                router.navigate("game", "main", params);
                return true;
            }
        }
        return false;
    },

    onClick: function () {
        if (this.state.clickedContinue) {
            return;
        }
        this.setState({clickedContinue: true});

        var roundsBundlesGameData = appManager.getSettings().getRoundsBundles();
        var roundsBundleIdx = this.state.roundsBundleIdx;
        var roundIdx = this.state.roundIdx + 1;

        if (this.state.roundsBundleIdx < roundsBundlesGameData.length - 1) {
            this.openNextSlide();
        }

        if (this.navigateToUncompletedRound(roundsBundlesGameData, roundsBundleIdx, roundIdx, roundsBundleIdx)) {
            return;
        }
        if (this.navigateToUncompletedRound(roundsBundlesGameData, roundsBundleIdx, roundIdx, 0)) {
            return;
        }
        router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
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

    onStartAdUpdate: function(){
        var $pageContent = $(this.refs.pageContent.getDOMNode());
        if(this.refs.pageContent.getDOMNode().clientHeight - parseInt($pageContent.css('padding-bottom'))  > this.refs.container.getDOMNode().offsetHeight){
            this.state.containerExtraClass = 'transform-center';
        }else{
            this.state.containerExtraClass = '';
        }

        this.setState({containerExtraClass: this.state.containerExtraClass});
    },

    render: function () {
        //console.log({victoryRoundsComplete: appManager.getGameState().getRoundsBundles(this.state.roundsBundleIdx).roundsComplete});

        var starArrangement = this.selectStarArrangement();
        var styleStar1 = {
            backgroundImage: starArrangement[0]
        };
        var styleStar2 = {
            backgroundImage: starArrangement[1]
        };
        var styleStar3 = {
            backgroundImage: starArrangement[2]
        };

        var progressBar = {
            width: (this.state.roundsComplete / this.state.roundsTotal * 6.250) + "rem"
        };

        var rewardStar = {
            backgroundImage: "url('" + this.getImagePath('counter/star') + "')"
        };
        var rewardDollar = {
            backgroundImage: "url('" + this.getImagePath('counter/coins') + "')"
        };

        var background = {
            backgroundColor: appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx].backgroundColor || "#ff5722"
        };

        return (

            <div className="page page-game-victory">
                <Counters />

                <div ref="pageContent" className="page-content">

                    <div ref="container" className={classNames("container", this.state.containerExtraClass)} style={background} >

                        <div className="excellent">{i18n._('victory.excellent')}</div>

                        <div className="stars">
                            <div className="star1" style={styleStar1}></div>
                            <div className="star2" style={styleStar2}></div>
                            <div className="star3" style={styleStar3}></div>
                        </div>

                        <div className="rounds-complete">
                            <div className="progress-bar">
                                <div className="panel">
                                </div>
                                <div className="fill" style={progressBar}>
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
                            <SimpleButton className="button" onClick={this.onClick}>{i18n._('victory.continue')}</SimpleButton>
                        </div>


                        <StartAd onUpdate={this.onStartAdUpdate} />
                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageGameVictory);
module.exports.Class = PageGameVictory;