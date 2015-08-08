/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

module.exports = {};


var CounterClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    getInitialState: function () {

        var state = {
            imgName: false,
            value: this.props.value || 0
        };

        return state;

    },

    setValue: function (newValue) {
        if (typeof(newValue) !== "number") {
            throw 'counter.value must be a number';
        }

        this.setState({value: newValue});
    },

    getValue: function () {
        return this.state.value;
    },

    render: function () {
        var style = {};
        var className = classNames('counter', this.props.className);
        if (this.state.imgName) {
            style.backgroundImage = "url('" + this.getImagePath(this.state.imgName) + "')";
            className += ' icon';
        }

        return (
            <div className={className} style={style}>
                <div className="text">
                    <span>{this.getValue()}</span>
                </div>
            </div>
        );
    }
});

module.exports.Counter = React.createClass(CounterClass);
module.exports.Counter.Class = CounterClass;


var ScoreCounterClass = Object.assign({}, CounterClass, {
    getInitialState: function () {
        var state = CounterClass.getInitialState.apply(this);
        state.imgName = 'counter/star'

        return state;
    }
});
module.exports.ScoreCounter = React.createClass(ScoreCounterClass);
module.exports.ScoreCounter.Class = ScoreCounterClass;

var CoinsCounterClass = Object.assign({}, CounterClass, {
    getInitialState: function () {
        var state = CounterClass.getInitialState.apply(this);
        state.imgName = 'counter/coins'

        return state;
    }
});
module.exports.CoinsCounter = React.createClass(CoinsCounterClass);
module.exports.CoinsCounter.Class = CoinsCounterClass;