/**
 * Created by Vitaliy Babynin on 04.08.2015.
 */

/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

module.exports = {};

var CounterClass = Object.assign({}, {}, {
    displayName: 'Counter',
    mixins: [GameMixin],

    propTypes: {
        value: React.PropTypes.Number
    },

    getInitialState: function () {
        var state = {
            className: 'counter',
            value: 100
        };
        return state;
    },

    checkIfNumber: function (number) {
        if (isNaN(number)) {
            return false;
        } else {
            return true;
        }
    },

    setValue: function (number) {
        if (this.checkIfNumber(number)) {
            this.setState({value: number});
        }
    },

    getValue: function () {
        return this.state.value;
    },

    render: function() {
        var counterClasses = classNames(
            this.state.className
        );

        return (
            <counter className={counterClasses}>{this.getValue()}</counter>
        );
    }
});

module.exports.Counter = React.createClass(CounterClass);
module.exports.Counter.Class = CounterClass;