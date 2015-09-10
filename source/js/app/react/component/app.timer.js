"use strict";


var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');


module.exports = {};


var TimeLineClass = Object.assign({}, {}, {

    PropTypes: {

        secondsRemaining: React.PropTypes.number

    },

    getInitialState: function () {

        return {

            isCountDownOn: false,
            secondsRemaining: 0

        };

    },

    tick: function () {

        this.setState({secondsRemaining: this.state.secondsRemaining - 1});

        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
        }

    },

    componentDidMount: function () {

        if (this.props.secondsRemaining == 'undefined') {
            return;
        }

        this.setState({
            isCountDownOn: true,
            secondsRemaining: this.props.secondsRemaining
        });

        this.interval = setInterval(this.tick, 1000);

    },

    componentWillUnmount: function () {

        clearInterval(this.interval);

    },

    render: function () {

        var timeLine = {
            width: (
                this.state.isCountDownOn ?
                100 / this.props.secondsRemaining * this.state.secondsRemaining : 100
            ) + "%"
        };

        return (

            <div className="time-line">
                <div className="panel"></div>
                <div className="fill" style={timeLine}></div>
            </div>

        );
    }

});
var TimeLine = React.createClass(TimeLineClass);


var TimerClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {

        timeAvailable: React.PropTypes.number,
        isCountDownOn: React.PropTypes.bool

    },

    getInitialState: function () {

        var state = {

            timeAvailable: this.props.timeAvailable || 0,
            isCountDownOn: this.props.isCountDownOn || false

        };

        return state;

    },

    render: function () {

        return (

            <div className="timer">

                <TimeLine secondsRemaining={this.state.isCountDownOn ? this.state.timeAvailable : 'undefined'}/>

            </div>

        );

    }

});
module.exports.Timer = React.createClass(TimerClass);
module.exports.Timer.Class = TimerClass;