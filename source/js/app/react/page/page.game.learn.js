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
        state.board = this.getGameStateRoundField("board", {}) || {};

        return state;
    },

    getBoardData: function () {
        var boardData = appManager.getSettings().getPracticeRound();

        for (var i = 0; i < boardData.words.length; i++) {
            for (var j = 0; j < boardData.words[i].letters.length; j++) {
                boardData.words[i].letters[j].x = parseInt(boardData.words[i].letters[j].x);
                boardData.words[i].letters[j].y = parseInt(boardData.words[i].letters[j].y);
            }
        }

        return boardData;
    },

    setGameStateRoundField: function (field, newValue) {
        return appManager.getGameState().setPracticeRoundField(field, newValue);
    },

    getGameStateRoundField: function (field, defaultValue) {
        return appManager.getGameState().getPracticeRoundField(field, defaultValue);
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