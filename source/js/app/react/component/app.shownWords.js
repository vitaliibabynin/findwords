"use strict";


var Object = {assign: require('react/lib/Object.assign')};
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
        state.words = this.convertWords(state.shownWordsLetters);

        return state;
    },

    componentWillReceiveProps: function (nextProps) {
        var shownWordsLetters = nextProps.shownWordsLetters || [];
        var words = this.convertWords(shownWordsLetters);

        this.setState({
            shownWordsLetters: shownWordsLetters,
            words: words
        });
    },

    convertWords: function (shownWordsLetters) {
        var words = [];

        for (var i = 0; i < shownWordsLetters.length; i++) {

            var word = "";

            for (var j = 0; j < shownWordsLetters[i].length; j++) {
                word += shownWordsLetters[i][j].letter
            }

            words.push(word);
        }

        return words;
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

        var words = this.state.words.map(function(word, i) {
            return (
                <div key={word} >
                    {word}
                </div>
            );
        });

        return (
            <div className="shown-words"
                 style={style}>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}>
                    {words}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

});
module.exports.ShownWords = React.createClass(ShownWordsClass);
module.exports.ShownWords.Class = ShownWordsClass;