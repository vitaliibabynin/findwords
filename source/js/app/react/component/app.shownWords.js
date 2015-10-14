var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');
//var GameMixin = require('./app.mixin').GameMixin;

var ShownWordsClass = Object.assign({}, {}, {

    displayName: 'ShownWords',

    //propTypes: {
    //    shownWordsLetters: React.PropTypes.arrayOf(React.PropTypes.shape({
    //            letters: React.PropTypes.arrayOf(React.PropTypes.shape({
    //                classNames: React.PropTypes.object,
    //                letter: React.PropTypes.string,
    //                x: React.PropTypes.number,
    //                y: React.PropTypes.number
    //            }))
    //        })
    //    )
    //},

    getInitialState: function () {
        return {};
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({});
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

    render: function () {
        return (
            <div className="shown-words">
                <div></div>
            </div>
        );
    }

});
module.exports.ShownWords = React.createClass(ShownWordsClass);
module.exports.ShownWords.Class = ShownWordsClass;