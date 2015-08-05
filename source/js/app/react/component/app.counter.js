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

        var counterClasses = classNames(
            this.state.className
        );

        var finalValue = this.getValue();

        return (

            <Counter className={counterClasses}>{finalValue}</Counter>

        );

    }
});

module.exports.Counter = React.createClass(CounterClass);
module.exports.Counter.Class = CounterClass;