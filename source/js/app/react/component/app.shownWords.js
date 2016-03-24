"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classNames = require('classnames');


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
        ),
        shownWordsAnimationLeave: React.PropTypes.bool
    },

    getInitialState: function () {
        var state = {
            shownWordsLetters: this.props.shownWordsLetters || [],
            time: 1000,
            shownWordsAnimationLeave: typeof this.props.shownWordsAnimationLeave == "undefined" ? true : this.props.shownWordsAnimationLeave,
        };
        state.words = this.convertWords(state.shownWordsLetters);

        return state;
    },

    componentWillReceiveProps: function (nextProps) {
        var newState = {};
        newState.shownWordsLetters = nextProps.shownWordsLetters || [];
        newState.words = this.convertWords(newState.shownWordsLetters);
        newState.shownWordsAnimationLeave = typeof nextProps.shownWordsAnimationLeave == "undefined" ? true : nextProps.shownWordsAnimationLeave;

        this.setState(newState);
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

        if (shownWordsLength <= 1) {
            return 2;
        }

        if (shownWordsLength <= 2) {
            return 1.25;
        }

        if (shownWordsLength <= 6) {
            return 1;
        }

        if (shownWordsLength <= 9) {
            return 0.75;
        }

        return 87 / 128;
    },

    render: function () {
        var whichFontSize = this.chooseFontSize();

        var words = this.state.words.map(function (word, i) {
            word = Utils.capitalizeWord(word);

            return (
                <div key={word}>
                    {word}
                </div>
            );
        });

        var style = {
            lineHeight: (whichFontSize * 1.125) + "rem",
            fontSize: whichFontSize + "rem"
        };

        var classes = classNames(
            "shown-words",
            this.state.shownWordsLetters.length == 0 ? "hidden" : ""
        );

        var margin = {
            marginTop: "0.25rem"
        };

        return (
            <div className={classes} style={margin}>
                <div className="words" style={style}>
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnter={true}
                        transitionLeave={this.state.shownWordsAnimationLeave}
                        transitionEnterTimeout={this.state.time}
                        transitionLeaveTimeout={this.state.time}>
                        {words}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );

    }

});
module.exports.ShownWords = React.createClass(ShownWordsClass);
module.exports.ShownWords.Class = ShownWordsClass;