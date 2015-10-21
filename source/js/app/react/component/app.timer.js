"use strict";


var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var TimerClass = Object.assign({}, {}, {

    displayName: 'Timer',
    mixins: [GameMixin],

    propTypes: {
        isCountDownOn: React.PropTypes.bool,
        secondsRemaining: React.PropTypes.number,
        setGameStateRoundField: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            isCountDownOn: false,
            secondsRemaining: this.props.secondsRemaining || 0,
            starOneThirdOn: this.getImagePath('timer/star_on'),
            starTwoThirdsOn: this.getImagePath('timer/star_on'),
            starBase: this.getImagePath('timer/star_on'),
            timerImg: this.getImagePath('timer/timer'),
            starOneThirdOff: this.getImagePath('timer/star_off'),
            starTwoThirdsOff: this.getImagePath('timer/star_off'),
            starsReceived: 3,
            setGameStateRoundField: this.props.setGameStateRoundField || function() {
            }
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

        if (100 / this.props.secondsRemaining * this.state.secondsRemaining < 33.3) {
            if (this.state.starsReceived == 1) {
                return;
            }
            this.state.setGameStateRoundField('starsReceived', 1);
            this.setState({starsReceived: 1});
            return;
        }

        if (100 / this.props.secondsRemaining * this.state.secondsRemaining < 66.6) {
            if (this.state.starsReceived == 2) {
                return;
            }
            this.state.setGameStateRoundField('starsReceived', 2);
            this.setState({starsReceived: 2});
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
        var starOneThird = this.state.starOneThirdOn;
        var starTwoThirds = this.state.starTwoThirdsOn;
        var starBase = this.state.starBase;
        var timerImg = this.state.timerImg;

        if (100 / this.props.secondsRemaining * this.state.secondsRemaining < 66.6) {
            starTwoThirds = this.state.starTwoThirdsOff;
        }
        if (100 / this.props.secondsRemaining * this.state.secondsRemaining < 33.3) {
            starOneThird = this.state.starOneThirdOff;
        }

        var stars = {
            backgroundImage: "url('" + starBase + "'), url('" + starOneThird + "'), url('" + starTwoThirds + "')"
        };
        var clock = {
            backgroundImage: "url('" + timerImg + "')"
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

                <div className="timer-stars" style={stars}></div>

                <div className="timer-clock" style={clock}></div>

            </div>

        );
    }

});
module.exports.Timer = React.createClass(TimerClass);
module.exports.Timer.Class = TimerClass;