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

    //getInitialState: function(){
    //
    //    var state = {
    //
    //        //roundIdx: router.getParam('roundidx') || 0
    //
    //    };
    //
    //    return state;
    //},
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

    onChipClick: function (e) {

        switch (e.id) {
            case OPEN_WORD:
                this.refs.board.openWord();
                break;
            case OPEN_LETTER:
                this.refs.board.openLetter();
                break;
            case SHOW_WORD:
                this.refs.board.showWord();
                break;
            default:
                return;
        }

    },

    render: function () {

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

                    <div className="ad">

                    </div>

                </div>
            </div>
        );
    }
});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;