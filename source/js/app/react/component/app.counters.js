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
            isDisplayPlusButton: typeof this.props.isDisplayPlusButton == "undefined" ? false : this.props.isDisplayPlusButton
        };

        return state;
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.value || this.state.value,
            isDisplayPlusButton: typeof nextProps.isDisplayPlusButton == "undefined" ? this.state.isDisplayPlusButton : nextProps.isDisplayPlusButton
        })
    },

    onClick: function () {
        var params = router.getParams();
        params.backaction = router.getAction();
        params.backcontroller = router.getController();

        router.navigate("shop", "index", params);
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
        state.isDisplayPlusButton = typeof this.props.isDisplayPlusButton == "undefined" ? true : this.props.isDisplayPlusButton;

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
        if(this.props.onClick && typeof this.props.onClick == 'function'){
            this.props.onClick();
            return
        }

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
        isDisplayPlusButtonScore: React.PropTypes.bool,
        isDisplayPlusButtonCoins: React.PropTypes.bool,
        roundsBundleIdx: React.PropTypes.number
    },

    getInitialState: function () {
        var state = {
            isDisplayBackButton: typeof this.props.isDisplayBackButton == "undefined" ? false : this.props.isDisplayBackButton,
            isDisplayPlusButtonScore: typeof this.props.isDisplayPlusButtonScore == "undefined" ? false : this.props.isDisplayPlusButtonScore,
            isDisplayPlusButtonCoins: typeof this.props.isDisplayPlusButtonCoins == "undefined" ? true : this.props.isDisplayPlusButtonCoins
        };

        return state;
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            isDisplayBackButton: typeof nextProps.isDisplayBackButton == "undefined" ? this.state.isDisplayBackButton : nextProps.isDisplayBackButton,
            isDisplayPlusButtonScore: typeof nextProps.isDisplayPlusButtonScore == "undefined" ? this.state.isDisplayPlusButtonScore : nextProps.isDisplayPlusButtonScore,
            isDisplayPlusButtonCoins: typeof nextProps.isDisplayPlusButtonCoins == "undefined" ? this.state.isDisplayPlusButtonCoins : nextProps.isDisplayPlusButtonCoins

        })
    },

    componentDidMount: function () {
        appManager.getGameState().addChangeCoinsListener(this.update);
    },

    componentWillUnmount: function () {
        appManager.getGameState().removeChangeCoinsListener(this.update);
    },

    update: function () {
        this.forceUpdate();
    },

    showBackButton: function () {
        if (this.state.isDisplayBackButton) {
            return (
                <BackButton onClick={this.props.onBackButtonClick} roundsBundleIdx={this.props.roundsBundleIdx}/>
            );
        }
    },

    render: function () {
        //console.log("counters upd@ted");

        return (

            <div className={classNames("counters", {"backbutton": this.state.isDisplayBackButton})}>

                {this.showBackButton()}

                <ScoreCounter value={appManager.getGameState().getScore()}
                              isDisplayPlusButton={this.props.isDisplayPlusButtonScore} />

                <CoinsCounter value={appManager.getGameState().getCoins()}
                              isDisplayPlusButton={this.props.isDisplayPlusButtonCoins} />

            </div>

        );
    }

});
module.exports.Counters = React.createClass(CountersClass);
module.exports.Counters.Class = CountersClass;