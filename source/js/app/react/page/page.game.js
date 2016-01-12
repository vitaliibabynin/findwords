"use strict";


//var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var Timer = require('./../component/app.timer').Timer;
var ChipButton = require('./../component/app.button').ChipButton;
var Board = require('./../component/app.board.js').Board;
var Notice = require('./../component/app.notice.js').Notice;
var ShownWords = require('./../component/app.shownWords.js').ShownWords;

var NO_WORDS_TO_SHOW = require('./../component/app.notice.js').NO_WORDS_TO_SHOW;

var PageGameMain = Object.assign({}, {}, {

    //mixins: [GameMixin],
    displayName: 'PageGameMain',

    getInitialState: function () {
        var state = {
            roundsBundleIdx: parseInt(router.getParam('roundsBundleIdx')) || 0,
            roundIdx: parseInt(router.getParam('roundIdx')) || 0,
            shownWordsLetters: [],
            noticeType: "",
            noticeWord: {letters: []},
            chipsOpenWord: appManager.getSettings().getChipsCoinsCost().openWord || 0,
            chipsOpenLetter: appManager.getSettings().getChipsCoinsCost().openLetter || 0,
            chipsShowWord: appManager.getSettings().getChipsCoinsCost().showWord || 0,
            shownWordsAnimationLeave: true
        };
        state.roundData = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx] || [];
        state.boardData = this.getBoardData(state.roundData, state.roundIdx);

        state.board = this.getGameStateRoundField("board", state.roundsBundleIdx, state.roundIdx) || {};
        state.time = state.boardData.time || 0;

        state.openedLetters = this.getGameStateRoundField("openedLetters", state.roundsBundleIdx, state.roundIdx) || [];
        state.shownWords = this.getGameStateRoundField("shownWords", state.roundsBundleIdx, state.roundIdx) || [];
        state.shownWordsLetters = this.shownWordsConverter(state.shownWords, state.boardData) || [];

        return state;
    },

    componentWillMount: function(){
        appManager.getMusicManager().playGameMusic();
    },

    componentDidMount: function () {
        var roundsTotal = appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx].rounds.length;
        if (typeof roundsTotal == "undefined") {
            return;
        }

        console.log({roundIdx: this.state.roundIdx});
        console.log({roundsTotal: roundsTotal});

        if (this.state.roundIdx > roundsTotal) {
            router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
        }

        appAd.prepareInterstitial();
        //console.log("pageGameComponentDidMount");
    },

    componentWillUnmount: function(){
        appManager.getMusicManager().playMusic();
    },

    getBoardData: function (roundData, roundIdx) {
        var boardData = roundData.rounds[roundIdx] || {
                time: 1,
                board: {
                    rows: 1,
                    cols: 1
                },
                words: [
                    {
                        letters: [
                            {x: 0, y: 0, letter: ""}
                        ]
                    }
                ]
            };

        return boardData;
    },

    shownWordsConverter: function (shownWords, boardData) {
        var shownWordsLetters = [];

        if (shownWords.length == 0) {
            return shownWordsLetters;
        }

        for (var i = 0; i < shownWords.length; i++) {
            var letters = boardData.words[shownWords[i]].letters;
            shownWordsLetters.push(letters);
        }

        return shownWordsLetters;
    },

    setGameStateRoundsBundleField: function (field, newValue, roundsBundleIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }

        return appManager.getGameState().setRoundsBundles(roundsBundleIdx, field, newValue);
    },

    getGameStateRoundsBundleField: function (field, roundsBundleIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }

        return appManager.getGameState().getRoundsBundles(roundsBundleIdx)[field];
    },

    setGameStateRoundField: function (field, newValue, roundsBundleIdx, roundIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }
        if (typeof(roundIdx) == "undefined") {
            roundIdx = this.state.roundIdx;
        }

        return appManager.getGameState().setRound(roundsBundleIdx, roundIdx, field, newValue);
    },

    getGameStateRoundField: function (field, roundsBundleIdx, roundIdx) {
        if (typeof(roundsBundleIdx) == "undefined") {
            roundsBundleIdx = this.state.roundsBundleIdx;
        }
        if (typeof(roundIdx) == "undefined") {
            roundIdx = this.state.roundIdx;
        }

        return appManager.getGameState().getRound(roundsBundleIdx, roundIdx)[field];
    },


    onChipOpenWordClick: function () {
        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsOpenWord > coins) {
            appDialogs.getNoMoneyDialog().show();
            return;
        }

        this.refs.board.openWord().then(function (result) {
            if (result !== false) {
                var newCoins = coins - this.state.chipsOpenWord;
                appManager.getGameState().setCoins(newCoins);
                this.forceUpdate();

                if (this.refs.board.checkIfRoundComplete()) {
                    //this.goToPageRoundComplete(2000);
                    this.goToPageRoundComplete();
                }
            }
        }.bind(this));
    },

    onChipOpenLetterClick: function () {
        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsOpenLetter > coins) {
            appDialogs.getNoMoneyDialog().show();
            return;
        }

        var result = this.refs.board.openLetter();
        if (result !== false) {
            var newCoins = coins - this.state.chipsOpenLetter;
            appManager.getGameState().setCoins(newCoins);
            this.forceUpdate();

            if (this.refs.board.checkIfRoundComplete()) {
                //this.goToPageRoundComplete(2000);
                this.goToPageRoundComplete();
            }
        }
    },

    onChipShowWordClick: function () {
        var coins = appManager.getGameState().getCoins();
        if (this.state.chipsShowWord > coins) {
            appDialogs.getNoMoneyDialog().show();
            return;
        }

        var result = this.refs.board.sendWordToShowToPageGame();
        if (result !== false) {
            var newCoins = coins - this.state.chipsShowWord;
            appManager.getGameState().setCoins(newCoins);

            return;
        }

        this.displayNotice(NO_WORDS_TO_SHOW, {letters: []});
    },


    addToShownWords: function (word, wordIdx) {
        var shownWords = this.state.shownWords;
        var shownWordsLetters = this.state.shownWordsLetters;

        shownWords.push(wordIdx);
        shownWordsLetters.push(word);

        this.setGameStateRoundField('shownWords', shownWords);

        this.setState({
            shownWords: shownWords,
            shownWordsLetters: shownWordsLetters
        })
    },

    removeWordFromShownWords: function (wordIdx) {
        var shownWords = this.state.shownWords;
        var shownWordsLetters = this.state.shownWordsLetters;
        var index = false;

        for (var shownWordIdx = 0; shownWordIdx < shownWords.length; shownWordIdx++) {
            if (shownWords[shownWordIdx] == wordIdx) {
                index = shownWordIdx;
                break;
            }
        }

        if (index === false) {
            return;
        }

        shownWords.splice(index, 1);
        shownWordsLetters.splice(index, 1);

        this.setGameStateRoundField('shownWords', shownWords);

        var shownWordsAnimationLeave = true;
        if (this.checkIfOneWordLeft()) {
            shownWordsAnimationLeave = false;
        }

        this.setState({
            shownWordsAnimationLeave: shownWordsAnimationLeave,
            shownWords: shownWords,
            shownWordsLetters: shownWordsLetters
        })
    },

    checkIfOneWordLeft: function () {
        var boardData = this.state.roundData.rounds[this.state.roundIdx] || {};
        var wordsToFind = boardData.words.length || 100;

        var board = this.getGameStateRoundField("board", this.state.roundsBundleIdx, this.state.roundIdx) || {};
        var wordsFound = 0;
        for (var k in board) {
            if (board[k].openWord) {
                wordsFound++;
            }
        }

        return wordsFound == wordsToFind;
    },


    displayNotice: function (type, word) {
        this.setState({
            noticeType: type,
            noticeWord: word
        }, function () {
            setTimeout(function () {
                this.hideNotice();
            }.bind(this), 2000);
        });
    },

    hideNotice: function () {
        this.setState({
            noticeType: "",
            noticeWord: {letters: []}
        });

        //setTimeout(function () {
            this.refs.board.emptySelectedLetters();
        //}.bind(this), 200);
    },

    goToPageRoundComplete: function (time) {
        time = time || 200;

        //var roundsComplete = this.getGameStateRoundsBundleField("roundsComplete");
        //roundsComplete++;
        //this.setGameStateRoundsBundleField("roundsComplete", roundsComplete);

        var params = {
            roundsBundleIdx: this.state.roundsBundleIdx,
            roundIdx: this.state.roundIdx
        };

        setTimeout(function () {
            router.navigate("game", "victory", params);
        }.bind(this), time);
    },


    render: function () {
        //console.log({pageGameScore: appManager.getGameState().getScore()});
        //console.log({pageGameCoins: appManager.getGameState().getCoins()});
        //console.log({pageGameRoundsComplete: this.getGameStateRoundsBundleField("roundsComplete")});

        return (
            <div className="page-game">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}
                              roundsBundleIdx={this.state.roundsBundleIdx}/>

                    <Timer time={this.state.time}
                           setGameStateRoundField={this.setGameStateRoundField}
                           getGameStateRoundField={this.getGameStateRoundField}
                    />

                    <div className="chips">
                        <ChipButton className="open-word"
                                    onClick={this.onChipOpenWordClick}
                                    value={this.state.chipsOpenWord}
                                    icon="open_word">

                            <span>{i18n._('chip.open-word')}</span>
                        </ChipButton>
                        <ChipButton className="open-letter"
                                    onClick={this.onChipOpenLetterClick}
                                    value={this.state.chipsOpenLetter}
                                    icon="open_letter">

                            <span>{i18n._('chip.open-letter')}</span>
                        </ChipButton>
                        <ChipButton className="show-word"
                                    onClick={this.onChipShowWordClick}
                                    value={this.state.chipsShowWord}
                                    icon="show_word">

                            <span>{i18n._('chip.show-word')}</span>
                        </ChipButton>
                    </div>

                    <Board ref="board"
                           boardData={this.state.boardData}
                           board={this.state.board}
                           openedLetters={this.state.openedLetters}
                           shownWords={this.state.shownWords}
                           displayNotice={this.displayNotice}
                           addToShownWords={this.addToShownWords}
                           removeWordFromShownWords={this.removeWordFromShownWords}
                           setGameStateRoundField={this.setGameStateRoundField}
                           goToPageRoundComplete={this.goToPageRoundComplete}
                    />

                    <Notice noticeType={this.state.noticeType}
                            word={this.state.noticeWord}
                            hideNotice={this.hideNotice}
                    />

                    <ShownWords shownWordsLetters={this.state.shownWordsLetters}
                                shownWordsAnimationLeave={this.state.shownWordsAnimationLeave}
                    />

                </div>
            </div>
        );
    }

});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;