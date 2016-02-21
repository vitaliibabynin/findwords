"use strict";


var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var TimerClass = Object.assign({}, {}, {

    displayName: 'Timer',
    mixins: [GameMixin],

    propTypes: {
        time: React.PropTypes.number,
        setGameStateRoundField: React.PropTypes.func,
        getGameStateRoundField: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            secondsRemaining: 0,
            starOneThirdOn: this.getImagePath('timer/2star_on'),
            starTwoThirdsOn: this.getImagePath('timer/3star_on'),
            starBase: this.getImagePath('timer/1star_on'),
            timerImg: this.getImagePath('timer/timer'),
            starOneThirdOff: this.getImagePath('timer/2star_off'),
            starTwoThirdsOff: this.getImagePath('timer/3star_off'),
            setGameStateRoundField: this.props.setGameStateRoundField || function () {
            },
            getGameStateRoundField: this.props.getGameStateRoundField || function () {
            }
        };
        state.starsReceived = state.getGameStateRoundField("starsReceived") || 3;

        var initialTime = state.getGameStateRoundField("secondsRemaining") || 0;

        if (initialTime == 0 || typeof(initialTime) == "undefined") {
            state.setGameStateRoundField("secondsRemaining", this.props.time);
            state.lastSave = this.props.time;
        }

        if (state.getGameStateRoundField("secondsRemaining") != -1 || typeof(initialTime) != "undefined") {
            state.secondsRemaining = Math.min(this.props.time, state.getGameStateRoundField("secondsRemaining")) || 0;
            state.lastSave = state.secondsRemaining;
        }

        if (state.secondsRemaining > 0) {
            state.isCountDownOn = true;
        }

        return state;
    },

    tick: function () {
        var secondsRemaining = this.state.secondsRemaining;

        this.setState({secondsRemaining: secondsRemaining - 1});

        if (this.state.secondsRemaining <= 0) {
            this.state.setGameStateRoundField("secondsRemaining", -1);
            clearInterval(this.interval);
        }

        if (this.state.lastSave - secondsRemaining >= this.props.time / 100 * (100 / 12)) {
            this.state.setGameStateRoundField("secondsRemaining", secondsRemaining);
            this.setState({lastSave: secondsRemaining});
        }

        var timePercentLeft = 100 / this.props.time * secondsRemaining;

        if (timePercentLeft < 33.3) {
            if (this.state.starsReceived == 1) {
                return;
            }
            this.state.setGameStateRoundField('starsReceived', 1);
            this.setState({starsReceived: 1});
            return;
        }

        if (timePercentLeft < 66.6) {
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
        //console.log("timer upd@ted");

        var starOneThird = this.state.starOneThirdOn;
        var starTwoThirds = this.state.starTwoThirdsOn;
        var starBase = this.state.starBase;
        var timerImg = this.state.timerImg;

        if (100 / this.props.time * this.state.secondsRemaining < 66.6) {
            starTwoThirds = this.state.starTwoThirdsOff;
        }
        if (100 / this.props.time * this.state.secondsRemaining < 33.3) {
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
                100 / this.props.time * this.state.secondsRemaining : 0
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