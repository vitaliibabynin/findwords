/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var IconButton = require('./app.button').IconButton;

module.exports = {};

var CounterClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        imgPath: React.PropTypes.string,
        value: React.PropTypes.number,
        iconImg: React.PropTypes.string,
        isDisplayPlusButton: React.PropTypes.bool

    },

    getInitialState: function () {

        var state = {
            imgPath: '',
            value: this.props.value || 0,
            iconImg: this.props.iconImg || "plus",
            isDisplayPlusButton: this.props.isDisplayPlusButton || false
        };

        return state;

    },

    componentWillReceiveProps: function (nextProps) {

        if (!nextProps.hasOwnProperty(value) || nextProps.value == this.state.value) {
            return;
        }

        this.setState({
            value: nextProps.value
        })

    },

    showIcon: function () {

        if (this.state.isDisplayPlusButton) {
            return (
                <IconButton icon={this.state.iconImg}></IconButton>
            );
        }

    },

    render: function () {

        var style = {};

        var className = classNames('counter', this.props.className);
        if (this.state.imgPath) {
            style.backgroundImage = "url('" + this.getImagePath(this.state.imgPath) + "')";
            className += ' icon';
        }

        var styleText = {};
        if (this.state.isDisplayPlusButton) {
            styleText.paddingRight = "0.750rem";
        }

        return (
            <div className={className} style={style}>
                <div className="text" style={styleText}>
                    {this.state.value}
                </div>
                {this.showIcon()}
            </div>
        );

    }
});
module.exports.Counter = React.createClass(CounterClass);
module.exports.Counter.Class = CounterClass;


var ScoreCounterClass = Object.assign({}, CounterClass, {

    getInitialState: function () {

        var state = CounterClass.getInitialState.apply(this);
        state.imgPath = 'counter/star';
        state.isDisplayPlusButton = this.props.isDisplayPlusButton || false;

        return state;

    }

});
module.exports.ScoreCounter = React.createClass(ScoreCounterClass);
module.exports.ScoreCounter.Class = ScoreCounterClass;

var CoinsCounterClass = Object.assign({}, CounterClass, {

    getInitialState: function () {

        var state = CounterClass.getInitialState.apply(this);
        state.imgPath = 'counter/coins';
        state.isDisplayPlusButton = this.props.isDisplayPlusButton || true;

        return state;

    }

});
module.exports.CoinsCounter = React.createClass(CoinsCounterClass);
module.exports.CoinsCounter.Class = CoinsCounterClass;