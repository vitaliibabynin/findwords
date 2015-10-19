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

var SELECT_DIFFERENTLY = require('./../component/app.notice.js').SELECT_DIFFERENTLY;
var NO_SUCH_WORD = require('./../component/app.notice.js').NO_SUCH_WORD;
var NO_WORDS_TO_SHOW = require('./../component/app.notice.js').NO_WORDS_TO_SHOW;

var PageGameMain = Object.assign({}, {}, {

    //mixins: [GameMixin],
    displayName: 'PageGameMain',

    getInitialState: function () {
        var state = {
            roundsBundleIdx: 0,
            //roundIdx: router.getParam('roundidx') || 0,
            roundIdx: 0,
            shownWordsLetters: [],
            noticeType: "",
            noticeWord: {letters: []},
            chipsOpenWord: appManager.getGameState().getChipOpenWord() || 0,
            chipsOpenLetter: appManager.getGameState().getChipOpenLetter() || 0,
            chipsShowWord: appManager.getGameState().getChipShowWord() || 0
        };
        state.roundData = appManager.getSettings().getRoundsBundles()[state.roundsBundleIdx] || {};
        state.boardData = state.roundData.rounds[state.roundIdx] || {};
        state.board = this.getGameStateRoundField(state.roundsBundleIdx, state.roundIdx, "board") || {};
        state.openedLetters = this.getGameStateRoundField(state.roundsBundleIdx, state.roundIdx, "openedLetters") || [];
        state.shownWords = this.getGameStateRoundField(state.roundsBundleIdx, state.roundIdx, "shownWords") || [];
        state.shownWordsLetters = this.shownWordsConverter(state.shownWords, state.boardData);

        return state;
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

    setGameStateRoundField: function (field, newValue) {
        var bundleIndex = this.state.roundsBundleIdx;
        var roundIndex = this.state.roundIdx;

        return appManager.getGameState().setRound(bundleIndex, roundIndex, field, newValue);
    },

    getGameStateRoundField: function (roundsBundleIdx, roundIdx, field) {
        return appManager.getGameState().getRound(roundsBundleIdx, roundIdx)[field];
    },

    //componentDidMount: function() {
    //
    //},
    //
    //componentDidUpdate: function(prevProps, prevState) {
    //
    //},
    //
    //componentWillUnmount: function() {
    //
    //},


    onChipOpenWordClick: function () {
        if (this.state.chipsOpenWord < 1) {
            console.log("no chips left");
            return;
        }

        var result = this.refs.board.openWord();
        if (result !== false) {
            var chipsOpenWord = this.state.chipsOpenWord - 1;

            appManager.getGameState().setChipOpenWord(chipsOpenWord);

            this.setState({
                chipsOpenWord: chipsOpenWord
            });

            if (this.refs.board.checkIfRoundComplete()){
                this.goToPageRoundComplete(800);
            }
        }
    },

    onChipOpenLetterClick: function () {
        if (this.state.chipsOpenLetter < 1) {
            console.log("no chips left");
            return;
        }

        var result = this.refs.board.openLetter();
        if (result !== false) {
            var chipsOpenLetter = this.state.chipsOpenLetter - 1;

            appManager.getGameState().setChipOpenLetter(chipsOpenLetter);

            this.setState({
                chipsOpenLetter: chipsOpenLetter
            });

            if (this.refs.board.checkIfRoundComplete()){
                this.goToPageRoundComplete(800);
            }
        }
    },

    onChipShowWordClick: function () {
        if (this.state.chipsShowWord < 1) {
            console.log("no chips left");
            return;
        }

        var result = this.refs.board.sendWordToShowToPageGame();
        if (result !== false) {
            var chipsShowWord = this.state.chipsShowWord - 1;

            appManager.getGameState().setChipShowWord(chipsShowWord);

            this.setState({
                chipsShowWord: chipsShowWord
            });

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

        this.setState({
            shownWords: shownWords,
            shownWordsLetters: shownWordsLetters
        })
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
        time = time || 300;

        setTimeout(function () {
            router.navigate("game", "victory")
        }.bind(this), time);
    },


    render: function () {

        return (
            <div className="page-game">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <Timer secondsRemaining={30} isCountDownOn={true}/>

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
                        />

                    <ShownWords shownWordsLetters={this.state.shownWordsLetters}/>

                </div>
            </div>
        );
    }

});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;