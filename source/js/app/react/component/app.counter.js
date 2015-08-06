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

    getPropValue: function () {
        return this.props.value;
    },

    setPropValue: function () {

        if (typeof(newValue) !== "number") {

            throw 'counter.value must be a number';

        }

        this.setValueForProperty({value: newValue});

    },

    setStateValue: function (newValue) {

        if (typeof(newValue) !== "number") {

            throw 'counter.value must be a number';

        }

        this.setState({value: newValue});

    },

    getStateValue: function () {

        return this.state.value;

    },

    render: function () {

        var counterClasses = classNames(
            this.state.className
        );

        var finalValue = this.getStateValue();

        return (

            <counter className={counterClasses}>{finalValue}</counter>

        );

    }
});

module.exports.Counter = React.createClass(CounterClass);
module.exports.Counter.Class = CounterClass;


var StarCounterClass = Object.assign({}, CounterClass, {
    displayName: 'StarCounter',

    getInitialState: function () {

        var state = CounterClass.getInitialState.call(this);
        state.className += 'star';

        return state;

    },

    render: function () {

        return CounterClass.render.call(this);

    }

});

module.exports.StarCounter = React.createClass(StarCounterClass);
module.exports.StarCounter.Class = StarCounterClass;


var CashCounterClass = Object.assign({}, CounterClass, {
    displayName: 'CashCounter',

    getInitialState: function () {

        var state = CounterClass.getInitialState.call(this);
        state.className += 'cash';

        return state;

    },

    render: function () {

        return CounterClass.render.call(this);

    }

});

module.exports.CashCounter = React.createClass(CashCounterClass);
module.exports.CashCounter.Class = CashCounterClass;
