"use strict";


var Object = {assign: require('react/lib/Object.assign')};

var Counters = require('./../component/app.counters').Counters;
var Timer = require('./../component/app.timer').Timer;
var Board = require('./../component/app.board.js').Board;
var Notice = require('./../component/app.notice.js').Notice;

var MUSIC_FILE_NAME = require('./../../model/app.music.js').MUSIC_FILE_NAME;

var PageGameLearn = Object.assign({}, {}, {

    displayName: 'PageGameLearn',

    getInitialState: function () {
        var state = {
            goToVictory: false,
            noticeType: "",
            noticeWord: {letters: []}

        };
        state.boardData = this.getBoardData() || {};
        state.time = state.boardData.time || 0;
        state.board = this.getGameStateRoundField("board", {}) || {};

        return state;
    },

    componentWillMount: function () {
        var currentMusic = appManager.getMusicManager().getCurrentMusic();
        if (currentMusic === false || currentMusic == MUSIC_FILE_NAME) {
            appManager.getMusicManager().playGameMusic();
        }
    },

    componentWillUnmount: function () {
        if (!this.state.goToVictory) {
            appManager.getMusicManager().playMusic();
        }
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

        this.setState({goToVictory: true}, function () {
            setTimeout(function () {
                router.navigate("game", "learn_victory");
            }.bind(this), time);
        }.bind(this));
    },

    render: function () {

        return (
            <div className="page page-game">
                <Counters isDisplayBackButton={true}
                          roundsBundleIdx={this.state.roundsBundleIdx}/>

                <div className="page-content">

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