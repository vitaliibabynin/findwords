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
            roundIdx: 0,
            starsReceived: 2,
            roundsComplete: 10,
            roundsTotal: 15,
            score: 99,
            coins: 99999
        };

        return state;
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

    onClick: function () {
        router.navigate("game", "main");
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
                            <div className="score" style={rewardStar}>{this.state.score}</div>
                            <div className="coins" style={rewardDollar}>{this.state.coins}</div>
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