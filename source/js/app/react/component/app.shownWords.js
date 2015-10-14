"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');
//var GameMixin = require('./app.mixin').GameMixin;

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
        return {
            shownWordsLetters: this.props.shownWordsLetters || []
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            shownWordsLetters: nextProps.shownWordsLetters || []
        });
    },

    capitalizeWord: function () {
        var initialWord = this.state.word.letters;

        if (initialWord.length == 0) {
            return false;
        }

        var word = initialWord[0].letter.toUpperCase();
        for (var i = 1; i < initialWord.length; i++) {
            word += initialWord[i].letter.toLowerCase();
        }

        return word;
    },

    showWords: function () {
        var shownWords = this.state.shownWordsLetters;

        var toDisplay = [];

        for (var i = 0; i < shownWords.length; i++) {

            var word = "";

            for (var j = 0; j < shownWords[i].length; j++) {
                word += shownWords[i][j].letter
            }

            toDisplay.push(<div key={i + "_" + j}>{word}</div>)
        }

        return toDisplay;
    },

    render: function () {
        return (
            <div className="shown-words">
                {this.showWords()}
            </div>
        );
    }

});
module.exports.ShownWords = React.createClass(ShownWordsClass);
module.exports.ShownWords.Class = ShownWordsClass;