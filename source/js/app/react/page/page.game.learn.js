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
            noticeWord: {letters: []}
        };
        state.boardData = this.getBoardData() || {};
        state.time = state.boardData.time || 0;
        state.board = this.getGameStateRoundField("board") || {};

        return state;
    },

    getBoardData: function () {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return appManager.getSettings().getPracticeRound().en;
            case CONST.LANGUAGE_RU:
                return appManager.getSettings().getPracticeRound().ru;
            default:
                return {}
        }
    },

    setGameStateRoundField: function (field, newValue) {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return appManager.getGameState().setPracticeRoundFieldEn(field, newValue);
            case CONST.LANGUAGE_RU:
                return appManager.getGameState().setPracticeRoundFieldRu(field, newValue);
            default:
                return {}
        }
    },

    getGameStateRoundField: function (field) {
        switch (router.getLanguage()) {
            case CONST.LANGUAGE_EN:
                return appManager.getGameState().getPracticeRoundFieldEn([field]);
            case CONST.LANGUAGE_RU:
                return appManager.getGameState().getPracticeRoundFieldRu([field]);
            default:
                return {}
        }
    },

    displayNotice: function (type, word) {
        this.setState({
            noticeType: type,
            noticeWord: word
        }, function () {
            setTimeout(function () {
                this.setState({
                    noticeType: "",
                    noticeWord: {letters: []}
                });
            }.bind(this), 2000);
        });
    },

    goToPageRoundComplete: function (time) {
        time = time || 0;

        setTimeout(function () {
            router.navigate("game", "learn_victory");
        }.bind(this), time);
    },

    render: function () {

        return (
            <div className="page-game">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}
                              roundsBundleIdx={this.state.roundsBundleIdx}/>

                    <Timer time={this.state.time}
                           setGameStateRoundField={this.setGameStateRoundField}
                           getGameStateRoundField={this.getGameStateRoundField}
                    />

                    <div className="blank-space"></div>

                    <Board ref="board"
                           boardData={this.state.boardData}
                           board={this.state.board}
                           isPracticeRound={true}
                           displayNotice={this.displayNotice}
                           setGameStateRoundField={this.setGameStateRoundField}
                           goToPageRoundComplete={this.goToPageRoundComplete}
                    />

                    <Notice noticeType={this.state.noticeType}
                            word={this.state.noticeWord}
                    />

                </div>
            </div>
        );
    }

});
module.exports = React.createClass(PageGameLearn);
module.exports.Class = PageGameLearn;