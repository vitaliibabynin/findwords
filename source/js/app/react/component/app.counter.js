/**
 * Created by Vitaliy Babynin on 04.08.2015.
 */

/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var Radium = require('radium');
var classNames = require('classnames');

module.exports = {};

var CounterClass = Object.assign({}, {}, Radium.wrap({
    displayName: 'Counter',
    mixins: [GameMixin],

    propTypes: {
        value: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
        }
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
            return console.log("CounterClass.value must be a number");
        } else {
            return number;
        }
    },

    setValue: function (number) {
        if (this.checkIfNumber(number)) {
            this.value = number;
        }
    },

    getValue: function () {
        return this.value;
    },

    render: function() {
        var counterClasses = classNames(
            this.state.className,
            this.props.className
        );

        return (
            <counter className={counterClasses}>{this.value}</counter>
        );
    }
}));

module.exports.Counter = React.createClass(CounterClass);
module.exports.Counter.Class = CounterClass;