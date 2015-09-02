/** @jsx React.DOM */
"use strict";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var IconButton = require('./../component/app.button').IconButton;
var ScoreCounter = require('./../component/app.counter').ScoreCounter;
var CoinsCounter = require('./../component/app.counter').CoinsCounter;

var Button = require('./../component/app.button').Button;


var PageGameMain = Object.assign({}, {}, {
    mixins: [PureRenderMixin, GameMixin],
    displayName: 'PageGameMain',

    getInitialState: function(){

        var state = {

            backArrowImg: "plus"

        };

        return state;
    },

    componentDidMount: function() {

    },

    componentDidUpdate: function(prevProps, prevState) {

    },

    componentWillUnmount: function() {

    },

    onButtonClick: function(buttonProps){

        router.navigate("main", "index");

    },

    render: function() {

        return (
            <div className="page-main">
                <div className="page-content">

                    <div className="counters">
                        <IconButton className="back-arrow" icon={this.state.backArrowImg} onClick={this.onButtonClick} />
                        <ScoreCounter value={appManager.getGameState().getScore()} />
                        <CoinsCounter value={appManager.getGameState().getCoins()} />
                    </div>

                </div>
            </div>
        );
    }
});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;