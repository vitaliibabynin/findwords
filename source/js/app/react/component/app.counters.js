"use strict";


var GameMixin = require('./app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var IconButton = require('./app.button').IconButton;

module.exports = {};

var DOLLAR = require('./app.button').DOLLAR;

var CounterClass = Object.assign({}, {}, {

    mixins: [GameMixin],

    propTypes: {
        value: React.PropTypes.number,
        iconImg: React.PropTypes.string,
        isDisplayPlusButton: React.PropTypes.bool
    },

    getInitialState: function () {
        var state = {
            className: "",
            imgPath: '',
            value: this.props.value || 0,
            iconImg: this.props.iconImg || "plus",
            isDisplayPlusButton: this.props.isDisplayPlusButton || false
        };

        return state;
    },

    componentWillReceiveProps: function (nextProps) {

        if (!nextProps.hasOwnProperty('value') || nextProps.value == this.state.value) {
            return;
        }

        this.setState({
            value: nextProps.value
        })

    },

    onClick: function () {
      router.navigate("shop", "index");
    },

    showIcon: function () {

        if (this.state.isDisplayPlusButton) {
            return (
                <IconButton icon={this.state.iconImg} onClick={this.onClick}></IconButton>
            );
        }

    },

    render: function () {

        var style = {};

        var className = classNames('counter', this.props.className, this.state.className);
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


var ScoreCounterClass = Object.assign({}, CounterClass, {

    displayName: 'ScoreCounter',

    getInitialState: function () {
        var state = CounterClass.getInitialState.apply(this);
        state.imgPath = 'counter/star';
        state.className = "score";
        state.isDisplayPlusButton = this.props.isDisplayPlusButton || false;

        return state;
    }

});
var ScoreCounter = React.createClass(ScoreCounterClass);


var CoinsCounterClass = Object.assign({}, CounterClass, {
    displayName: 'CoinsCounter',

    getInitialState: function () {

        var state = CounterClass.getInitialState.apply(this);
        state.imgPath = DOLLAR;
        state.className = "coins";
        state.isDisplayPlusButton = this.props.isDisplayPlusButton || true;

        return state;
    }

});
var CoinsCounter = React.createClass(CoinsCounterClass);


var BackButtonClass = Object.assign({}, {}, {

    displayName: 'BackButton',
    mixins: [GameMixin],

    propTypes: {
        roundsBundleIdx: React.PropTypes.number
    },

    getInitialState: function () {
        var state = CounterClass.getInitialState.apply(this);
        state.roundsBundleIdx = this.props.roundsBundleIdx || 0;

        return state;
    },

    onButtonClick: function(){
        router.navigate("main", "index", {roundsBundleIdx: this.state.roundsBundleIdx});
        //router.goBack();
    },

    render: function () {
        var backButtonImg = 'btn_back';

        return (

            <IconButton className="back-arrow" icon={backButtonImg} onClick={this.onButtonClick} />

        );
    }

});
var BackButton = React.createClass(BackButtonClass);


var CountersClass = Object.assign({}, {}, {

    displayName: 'Counters',

    propTypes: {
        isDisplayBackButton: React.PropTypes.bool,
        roundsBundleIdx: React.PropTypes.number
    },

    getInitialState: function () {
        var state = {
            isDisplayBackButton: this.props.isDisplayBackButton || false
        };

        return state;
    },

    showBackButton: function () {

        if (this.state.isDisplayBackButton) {
            return (
                <BackButton roundsBundleIdx={this.props.roundsBundleIdx}/>
            );
        }

    },

    render: function () {
        //console.log({countersScore: appManager.getGameState().getScore()});
        //console.log({countersCoins: appManager.getGameState().getCoins()});

        return (

            <div className={classNames("counters", {"backbutton": this.state.isDisplayBackButton})}>
                {this.showBackButton()}
                <ScoreCounter value={appManager.getGameState().getScore()} />
                <CoinsCounter value={appManager.getGameState().getCoins()} />
            </div>

        );
    }

});
module.exports.Counters = React.createClass(CountersClass);
module.exports.Counters.Class = CountersClass;