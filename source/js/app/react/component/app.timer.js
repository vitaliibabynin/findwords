"use strict";


var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var TimerClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        isCountDownOn: React.PropTypes.bool,
        secondsRemaining: React.PropTypes.number

    },

    getInitialState: function () {

        var state = {

            isCountDownOn: false,
            secondsRemaining: this.props.secondsRemaining || 0

        };

        if (this.props.isCountDownOn && this.props.secondsRemaining) {
            state.isCountDownOn = true;
        }

        return state;

    },

    tick: function () {

        this.setState({secondsRemaining: this.state.secondsRemaining - 1});

        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
        }

    },

    componentDidMount: function () {

        if (!this.state.isCountDownOn) {
            return;
        }

        this.interval = setInterval(this.tick, 1000);

    },

    componentWillUnmount: function () {

        clearInterval(this.interval);

    },

    render: function () {

        var starOneThird = this.getImagePath('timer/star_on');
        var starTwoThirds = this.getImagePath('timer/star_on');
        var starBase = this.getImagePath('timer/star_on');
        var timerImg = this.getImagePath('timer/timer');

        if (100 / this.props.secondsRemaining * this.state.secondsRemaining < 66.6) {
            starTwoThirds = this.getImagePath('timer/star_off');
        }

        if (100 / this.props.secondsRemaining * this.state.secondsRemaining < 33.3) {
            starOneThird = this.getImagePath('timer/star_off');
        }

        var timerImages = {

            backgroundImage: "url('" + starBase + "'), url('" + starOneThird + "'), url('" + starTwoThirds + "'), url('" + timerImg + "')"

        };

        var timeLine = {
            width: (
                this.state.isCountDownOn ?
                100 / this.props.secondsRemaining * this.state.secondsRemaining : 100
            ) + "%"
        };

        return (

            <div className="timer">

                <div className="time-line">

                    <div className="panel"></div>

                    <div className="fill" style={timeLine}></div>

                </div>

                <div className="timer-images" style={timerImages}></div>

            </div>

        );
    }

});
module.exports.Timer = React.createClass(TimerClass);
module.exports.Timer.Class = TimerClass;