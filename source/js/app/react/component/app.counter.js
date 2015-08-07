/** @jsx React.DOM */
"use strict";

var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

module.exports = {};

var StarImgClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    getInitialState: function () {

        var state = {
            className: 'starImg',
            style: {}
        };

        this.updateStyle(state.style);

        return state;
    },

    updateStyle: function (style) {

        var imgLoc = this.getBackgoundImageLocation();
        style.backgroundImage = "url('" + this.getImagePath(imgLoc) + "')";

    },

    getBackgoundImageLocation: function () {
        return "star/star";
    },

    render: function () {

        return (

            <div className={this.state.className} style={this.state.style}></div>

        );
    }

});

module.exports.StarImg = React.createClass(StarImgClass);
module.exports.StarImg.Class = StarImgClass;

var StarCounterClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        value: React.PropTypes.number

    },

    getInitialState: function () {

        var state = {
            className: 'starCounter',
            value: this.props.value || 0
        };

        return state;
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

        <div className={this.state.className}>{this.getStateValue()}</div>

    }

});

module.exports.StarCounter = React.createClass(StarCounterClass);
module.exports.StarCounter.Class = StarCounterClass;

var StarsClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    getInitialState: function () {

        var state = {
            className: 'stars'

        };

        return state;

    },

    render: function () {

        return (

            <div className={this.state.className}>
                <StarImg />
                <StarCounter />
            </div>

        );
    }

});

module.exports.Stars = React.createClass(StarsClass);
module.exports.Stars.Class = StarsClass;