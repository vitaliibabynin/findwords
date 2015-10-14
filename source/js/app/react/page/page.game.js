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

var PageGameMain = Object.assign({}, {}, {

    //mixins: [GameMixin],
    displayName: 'PageGameMain',

    getInitialState: function () {

        var state = {

            roundsBundleIdx: 0,
            //roundIdx: router.getParam('roundidx') || 0,
            roundIdx: 0,
            shownWords: [],
            shownWordsLetters: [],
            noticeType: "",
            noticeWord: {letters: []}

        };

        return state;
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

    //addToShownWords: function () {
    //
    //    var wordToShow = this.refs.board.getUnopenedUnshownWord();
    //
    //    if (!wordToShow) {
    //        return
    //    }
    //
    //    var shownWords = this.state.shownWords;
    //    shownWords.push(wordToShow);
    //    this.setState({shownWords: shownWords});
    //
    //},
    //
    //showWords: function () {
    //
    //    var shownWords = this.state.shownWords;
    //
    //    var toDisplay = [];
    //
    //    for (var i = 0; i < shownWords.length; i++) {
    //
    //        var word = "";
    //
    //        for (var j = 0; j < shownWords[i].length; j++) {
    //            word += shownWords[i][j].letter
    //        }
    //
    //        toDisplay.push(<div key={i + "_" + j}>{word}</div>)
    //    }
    //
    //    return toDisplay
    //
    //},


    onChipOpenWordClick: function () {
        this.refs.board.openWord();
    },

    onChipOpenLetterClick: function () {
        this.refs.board.openLetter();
    },

    onChipShowWordClick: function () {
        //this.addToShownWords();
    },

    addShownWords: function (word, wordIdx) {
        var shownWords = this.state.shownWords


        this.setState({

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


    render: function () {

        return (
            <div className="page-game">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <Timer secondsRemaining={30} isCountDownOn={true}/>

                    <div className="chips">
                        <ChipButton className="open-word"
                                    onClick={this.onChipOpenWordClick}
                                    value={appManager.getGameState().getChipOpenWord()}
                                    icon="open_word">

                            <span>{i18n._('chip.open-word')}</span>
                        </ChipButton>
                        <ChipButton className="open-letter"
                                    onClick={this.onChipOpenLetterClick}
                                    value={appManager.getGameState().getChipOpenLetter()}
                                    icon="open_letter">

                            <span>{i18n._('chip.open-letter')}</span>
                        </ChipButton>
                        <ChipButton className="show-word"
                                    onClick={this.onChipShowWordClick}
                                    value={appManager.getGameState().getChipShowWord()}
                                    icon="show_word">

                            <span>{i18n._('chip.show-word')}</span>
                        </ChipButton>
                    </div>

                    <Board ref="board"
                           displayNotice={this.displayNotice}
                           roundBundleIdx={this.state.roundsBundleIdx}
                           roundIdx={this.state.roundIdx}
                           boardData={appManager.getSettings().getRoundsBundles()[this.state.roundsBundleIdx]}
                           shownWords={this.state.shownWords}
                        />

                    <Notice classNames="notice"
                            noticeType={this.state.noticeType}
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