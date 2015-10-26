"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;


var PageGameVictory = Object.assign({}, {}, {

    displayName: 'PageGameVictory',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            roundsBundleIdx: parseInt(router.getParam('roundsBundleIdx')) || 0,
            roundIdx: parseInt(router.getParam('roundIdx')) || 0,
            rewardScore: 99999,
            rewardCoins: 99999
        };
        state.starsReceived = this.getGameStateRoundField(state.roundsBundleIdx, state.roundIdx, 'starsReceived') || 3;
        state.roundsComplete = this.getGameStateRoundsBundleField(state.roundsBundleIdx, 'roundsComplete') || 0;
        var rounds = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx].rounds;
        state.roundsTotal = rounds.length || 1;

        return state;
    },

    getGameStateRoundsBundleField: function (roundsBundleIdx, field) {
        return appManager.getGameState().getRoundsBundles(roundsBundleIdx)[field];
    },

    getGameStateRoundField: function (roundsBundleIdx, roundIdx, field) {
        return appManager.getGameState().getRound(roundsBundleIdx, roundIdx)[field];
    },

    //componentDidMount: function () {
    //
    //},
    //
    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},
    //
    //componentWillUnmount: function () {
    //
    //},

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

        if (this.state.roundIdx == numberOfRoundsRequired - 1) {
            var roundsBundleToOpen = this.state.roundsBundleIdx + 1;
            appManager.getGameState().setRoundsBundles(roundsBundleToOpen, 'isUnlocked', true);
        }
    },

    onClick: function () {
        var nextRoundIdx = this.nextRoundIdx();
        var nextRoundsBundleIdx = this.state.roundsBundleIdx;

        this.openNextSlide();

        if (nextRoundIdx === false) {
            var roundsBundlesTotal = appManager.getSettings().getRoundsBundles().length;
            var nextRoundsBundlesRoundsComplete;

            for (var i = nextRoundsBundleIdx; i < roundsBundlesTotal; i++) {
                nextRoundsBundlesRoundsComplete = this.getRoundsBundleRoundsComplete(i);

                if (nextRoundsBundlesRoundsComplete !== false) {
                    nextRoundsBundleIdx = i;
                    nextRoundIdx = nextRoundsBundlesRoundsComplete;
                    break;
                }

                if (i == roundsBundlesTotal - 1 && nextRoundsBundlesRoundsComplete === false) {
                    router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
                    return;
                }
            }
        }

        var params = {
            roundsBundleIdx: nextRoundsBundleIdx,
            roundIdx: nextRoundIdx
        };

        router.navigate("game", "main", params);
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

    render: function () {
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

        return (

            <div className="page-game-victory">
                <div className="page-content">

                    <Counters />

                    <div className="container">

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
                            <div className="button" onClick={this.onClick}>{i18n._('victory.continue')}</div>
                        </div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageGameVictory);
module.exports.Class = PageGameVictory;