"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};

var Counters = require('./../component/app.counters').Counters;
var StartAd = require('./../component/app.startad').StartAd;
var SimpleButton = require('./../component/app.button').SimpleButton;


var PageGameLearnVictory = Object.assign({}, {}, {

    displayName: 'PageGameLearnVictory',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            roundsComplete: 1,
            roundsTotal: 1,
            starsReceived: parseInt(router.getParam('starsReceived')) || 3,
            rewardScore: parseInt(router.getParam('rewardScore')) || 0,
            rewardCoins: parseInt(router.getParam('rewardCoins')) || 0
        };

        return state;
    },

    componentWillMount: function () {
        appManager.getMusicManager().stop();
        appManager.getSFXManager().playWin();
        appAd.showInterstitial();
        appAd.hideBanner();
    },

    componentDidMount: function () {
        appDialogs.getRateDialog().showIfTime();
    },

    componentWillUnmount: function () {
        appAd.showBottomBanner();
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

            <div className="page page-game-victory">
                <Counters />

                <div className="page-content">

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
                            <SimpleButton className="button"
                                          onClick={this.onClick}>{i18n._('victory.continue')}</SimpleButton>
                        </div>


                        <StartAd />
                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageGameLearnVictory);
module.exports.Class = PageGameLearnVictory;