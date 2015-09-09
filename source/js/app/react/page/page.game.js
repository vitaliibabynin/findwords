"use strict";


//var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var ChipButton = require('./../component/app.button').ChipButton;

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

    render: function() {

        return (
            <div className="page-game">
                <div className="page-content">

                    <Counters isDisplayBackButton={true} />

                    <div className="timer">

                    </div>

                    <div className="chips">
                        <ChipButton className="open-word" value={appManager.getGameState().getOpenWord()} icon="open_word">{i18n._('chip.open-word')}</ChipButton>
                        <ChipButton className="open-letter" value={appManager.getGameState().getOpenLetter()} icon="open_letter">{i18n._('chip.open-letter')}</ChipButton>
                        <ChipButton className="show-word" value={appManager.getGameState().getShowWord()} icon="show_word">{i18n._('chip.show-word')}</ChipButton>
                    </div>

                    <div className="game">

                    </div>

                    <div className="ad">

                    </div>

                </div>
            </div>
        );
    }
});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;