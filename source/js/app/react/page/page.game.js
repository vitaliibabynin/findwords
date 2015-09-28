"use strict";


//var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var Timer = require('./../component/app.timer').Timer;
var ChipButton = require('./../component/app.button').ChipButton;
var Board = require('./../component/app.board.js').Board;


var OPEN_WORD = require('./../component/app.board').OPEN_WORD;
var OPEN_LETTER = require('./../component/app.board').OPEN_LETTER;
var SHOW_WORD = require('./../component/app.board').SHOW_WORD;


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

    render: function () {

        return (
            <div className="page-game">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <Timer secondsRemaining={30} isCountDownOn={true}/>

                    <div className="chips">
                        <ChipButton className="open-word"
                                    id={OPEN_WORD}
                                    value={appManager.getGameState().getOpenWord()}
                                    icon="open_word">

                            <span>{i18n._('chip.open-word')}</span>
                        </ChipButton>
                        <ChipButton className="open-letter"
                                    id={OPEN_LETTER}
                                    value={appManager.getGameState().getOpenLetter()}
                                    icon="open_letter">

                            <span>{i18n._('chip.open-letter')}</span>
                        </ChipButton>
                        <ChipButton className="show-word"
                                    id={SHOW_WORD}
                                    value={appManager.getGameState().getShowWord()}
                                    icon="show_word">

                            <span>{i18n._('chip.show-word')}</span>
                        </ChipButton>
                    </div>

                    <Board ref="board"
                           slideData={appManager.getSettings().getRoundsBundles()[0]}/>

                    <div className="ad">

                    </div>

                </div>
            </div>
        );
    }
});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;