"use strict";


var Object = {assign: require('react/lib/Object.assign')};

var Counters = require('./../component/app.counters').Counters;
var Timer = require('./../component/app.timer').Timer;
var Board = require('./../component/app.board.js').Board;
var Notice = require('./../component/app.notice.js').Notice;


var PageGameLearn = Object.assign({}, {}, {

    displayName: 'PageGameLearn',

    getInitialState: function () {
        var state = {
            noticeType: "",
            noticeContainerHeight: "",
            noticeWord: {letters: []},
            gameBoardMaxHeight: 0
        };
        state.boardData = this.getBoardData() || {};
        state.time = state.boardData.time || 0;
        state.board = this.getGameStateRoundField("board", {}) || {};

        return state;
    },

    componentWillMount: function () {
        //appManager.getMusicManager().playGameMusic();
        appAd.hideBanner();
    },

    componentDidMount: function () {
        window.appAnalytics.trackView('pageGameLearn');

        var $pageContent = $(this.refs.pageContent.getDOMNode());
        var gameBoardMaxHeight = this.refs.pageContent.getDOMNode().clientHeight
            - parseInt($pageContent.css('padding-bottom'));

        this.setState({gameBoardMaxHeight: gameBoardMaxHeight});
    },

    componentWillUnmount: function () {
        appManager.getMusicManager().playMusic();
        appAd.showBottomBanner();
    },

    getBoardData: function () {
        return appManager.getSettings().getPracticeRound();
    },

    setGameStateRoundField: function (field, newValue) {
        return appManager.getGameState().setPracticeRoundField(field, newValue);
    },

    getGameStateRoundField: function (field, defaultValue) {
        return appManager.getGameState().getPracticeRoundField(field, defaultValue);
    },

    displayNotice: function (type, word) {
        var boardHeight = this.refs.board.getDOMNode().clientHeight;
        var boardTop = this.refs.board.getDOMNode().getBoundingClientRect().top;

        var noticeContainerStyle = {
            height: boardHeight,
            marginTop: boardTop
        };

        this.setState({
            noticeType: type,
            noticeContainerStyle: noticeContainerStyle || {},
            noticeWord: word
        }, function () {
            setTimeout(function () {
                this.hideNotice();
            }.bind(this), 2000);
        });
    },

    hideNotice: function () {
        if (this.isMounted()) {
            this.setState({
                noticeType: "",
                noticeWord: {letters: []}
            });

            this.refs.board.emptySelectedLetters();
        }
    },

    getStarsReceived: function () {
        return appManager.getGameState().getPracticeRoundField('starsReceived') || 3;
    },

    getRewardScore: function (round, starsReceived) {
        //return round.score * (starsReceived / 3) || 0;
        return round.bonus[starsReceived].score || 0;
    },

    getRewardCoins: function (round, starsReceived) {
        //return round.coins * (starsReceived / 3) || 0;
        return round.bonus[starsReceived].coins || 0;
    },

    addRewardScore: function (rewardScore) {
        var prevTotalScore = appManager.getGameState().getScore();
        var newTotalScore = prevTotalScore + rewardScore;
        appManager.getGameState().setScore(newTotalScore);
    },

    addRewardCoins: function (rewardCoins) {
        var prevTotalCoins = appManager.getGameState().getCoins();
        var newTotalCoins = prevTotalCoins + rewardCoins;
        appManager.getGameState().setCoins(newTotalCoins);
    },

    addRewards: function () {
        var round = this.state.boardData;
        var params = {};
        params.starsReceived = this.getStarsReceived() || 3;
        params.rewardScore = this.getRewardScore(round, params.starsReceived) || 0;
        params.rewardCoins = this.getRewardCoins(round, params.starsReceived) || 0;

        this.addRewardScore(params.rewardScore);
        this.addRewardCoins(params.rewardCoins);

        return params;
    },

    setPracticeRoundComplete: function () {
        appManager.getGameState().setGameStateField("practiceRound", {});
        appManager.getGameState().setPracticeRoundComplete(true);
    },

    goToPageRoundComplete: function (time) {
        var params = this.addRewards();
        this.setPracticeRoundComplete();

        if(appFB.isAuthorized()){
            appApi.updateRating(
                appFB.getAccessToken(),
                CONST.GAME_TYPE,
                appManager.getSettings().getGameId(),
                appManager.getGameState().getScore(),
                appManager.getGameState().getCompletedRoundsCount()
            );
        }

        time = time || 0;
        setTimeout(function () {
            router.navigate("game", "learn_victory", params);
        }.bind(this), time);
    },

    render: function () {

        return (
            <div className="page page-game">

                <Notice noticeType={this.state.noticeType}
                        noticeContainerStyle={this.state.noticeContainerStyle}
                        word={this.state.noticeWord}
                        hideNotice={this.hideNotice}
                />

                <Counters isDisplayBackButton={true}
                          roundsBundleIdx={this.state.roundsBundleIdx}/>
                <Timer time={this.state.time}
                       setGameStateRoundField={this.setGameStateRoundField}
                       getGameStateRoundField={this.getGameStateRoundField}
                />
                <div ref="pageContent" className="page-content">

                    <div className="container transform-center">
                        {this.state.gameBoardMaxHeight > 0 ? <Board ref="board"
                                                                    boardMaxHeight={this.state.gameBoardMaxHeight}
                                                                    boardData={this.state.boardData}
                                                                    board={this.state.board}
                                                                    isPracticeRound={true}
                                                                    displayNotice={this.displayNotice}
                                                                    setGameStateRoundField={this.setGameStateRoundField}
                                                                    goToPageRoundComplete={this.goToPageRoundComplete}
                        /> : ''}
                    </div>

                </div>
            </div>
        );
    }

});
module.exports = React.createClass(PageGameLearn);
module.exports.Class = PageGameLearn;