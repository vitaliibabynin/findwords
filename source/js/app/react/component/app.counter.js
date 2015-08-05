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

        count: React.PropTypes.Number

    },

    getInitialState: function () {

        var state = {

            className: 'counter',
            count: this.props.count || 0

        };

        return state;
    },

    setCount: function (newCount) {

        if (typeof(newCount) !== "number") {

            throw 'counter.count must be a number';

        }

        this.setState({count: newCount});

    },

    getCount: function () {

        return this.state.count;

    },

    render: function () {

        var counterClasses = classNames(
            this.state.className
        );

        this.setCount(100);

        var finalCount = this.getCount();

        return (

            <counter className={counterClasses}>{finalCount}</counter>

        );
    }
});

module.exports.Counter = React.createClass(CounterClass);
module.exports.Counter.Class = CounterClass;