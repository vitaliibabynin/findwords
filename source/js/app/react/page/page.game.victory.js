"use strict";


//var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;


var PageGameVictory = Object.assign({}, {}, {

    displayName: 'PageGameVictory',

    //getInitialState: function () {
    //
    //    var state = {};
    //
    //    return state;
    //
    //},
    //
    //componentDidMount: function () {
    //
    //},
    //
    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},
    //
    //componentWillUnmount: function () {
    //
    //},

    render: function () {

        return (

            <div className="page-game-victory">

                <div className="page-content">

                    <Counters />

                </div>

            </div>

        );
    }
});
module.exports = React.createClass(PageGameVictory);
module.exports.Class = PageGameVictory;