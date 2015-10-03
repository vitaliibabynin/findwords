"use strict";


//var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var Timer = require('./../component/app.timer').Timer;
var ChipButton = require('./../component/app.button').ChipButton;
var Board = require('./../component/app.board.js').Board;


var OPEN_WORD = "open_word";
var OPEN_LETTER = "open_letter";
var SHOW_WORD = "show_word";


var PageGameMain = Object.assign({}, {}, {

    //mixins: [GameMixin],
    displayName: 'PageGameMain',

    getInitialState: function () {

        var state = {

            //roundIdx: router.getParam('roundidx') || 0,
            shownWords: []

        };

        return state;
    },
    //
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

    addToShownWords: function () {

        var wordToShow = this.refs.board.getUnopenedUnshownWord();

        if (!wordToShow) {
            return
        }

        var shownWords = this.state.shownWords;
        shownWords.push(wordToShow);
        this.setState({shownWords: shownWords});

    },

    showWords: function () {

        var shownWords = this.state.shownWords;

        var toDisplay = [];

        for (var i = 0; i < shownWords.length; i++) {

            var word = "";

            for (var j = 0; j < shownWords[i].length; j++) {
                word += shownWords[i][j].letter
            }

            toDisplay.push(<div key={i + "_" + j}>{word}</div>)
        }

        return toDisplay

    },

    onChipClick: function (e) {

        switch (e.id) {
            case OPEN_WORD:
                this.refs.board.openWord();
                break;
            case OPEN_LETTER:
                this.refs.board.openLetter();
                break;
            case SHOW_WORD:
                this.addToShownWords();
                break;
            default:
                return;
        }

    },

    render: function () {

        //console.log({pageGame: this.state.shownWords});

        return (
            <div className="page-game">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <Timer secondsRemaining={30} isCountDownOn={true}/>

                    <div className="chips">
                        <ChipButton className="open-word"
                                    id={OPEN_WORD}
                                    onClick={this.onChipClick}
                                    value={appManager.getGameState().getOpenWord()}
                                    icon="open_word">

                            <span>{i18n._('chip.open-word')}</span>
                        </ChipButton>
                        <ChipButton className="open-letter"
                                    id={OPEN_LETTER}
                                    onClick={this.onChipClick}
                                    value={appManager.getGameState().getOpenLetter()}
                                    icon="open_letter">

                            <span>{i18n._('chip.open-letter')}</span>
                        </ChipButton>
                        <ChipButton className="show-word"
                                    id={SHOW_WORD}
                                    onClick={this.onChipClick}
                                    value={appManager.getGameState().getShowWord()}
                                    icon="show_word">

                            <span>{i18n._('chip.show-word')}</span>
                        </ChipButton>
                    </div>

                    <Board ref="board"
                           boardData={appManager.getSettings().getRoundsBundles()[0]}
                        />

                    <div className="shown-words">{this.showWords()}</div>

                    <div className="ad">

                    </div>

                </div>
            </div>
        );
    }
});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;