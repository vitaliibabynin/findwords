"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');
//var GameMixin = require('./app.mixin').GameMixin;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var ShownWordsClass = Object.assign({}, {}, {

    displayName: 'ShownWords',

    propTypes: {
        shownWordsLetters: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    letter: React.PropTypes.string,
                    x: React.PropTypes.number,
                    y: React.PropTypes.number
                })
            )
        )
    },

    getInitialState: function () {
        var state = {
            shownWordsLetters: this.props.shownWordsLetters || []
        };

        return state;
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            shownWordsLetters: nextProps.shownWordsLetters || []
        });
    },

    showWords: function () {
        var shownWords = this.state.shownWordsLetters;

        var toDisplay = [];

        for (var i = 0; i < shownWords.length; i++) {

            var word = "";

            for (var j = 0; j < shownWords[i].length; j++) {
                word += shownWords[i][j].letter
            }

            toDisplay.push(
                <div key={i + "_" + j}>
                    {word}
                </div>
            )
        }

        return toDisplay;
    },

    chooseFontSize: function () {
        var shownWordsLength = this.state.shownWordsLetters.length;

        if (shownWordsLength <= 2) {
            return 2;
        }

        if (shownWordsLength <= 8) {
            return 1;
        }

        if (shownWordsLength <= 16) {
            return 0.75;
        }

        return 87 / 128;
    },

    render: function () {
        var whichFontSize = this.chooseFontSize();

        var style = {
            fontSize: whichFontSize + "rem"
        };

        return (
            <div className="shown-words"
                 style={style}>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={2000}
                    transitionLeaveTimeout={2000}>
                    {this.showWords()}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

});
module.exports.ShownWords = React.createClass(ShownWordsClass);
module.exports.ShownWords.Class = ShownWordsClass;