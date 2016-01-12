"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var GameMixin = require('./app.mixin').GameMixin;

var SELECT_DIFFERENTLY = "selectDifferently";
module.exports.SELECT_DIFFERENTLY = SELECT_DIFFERENTLY;

var NO_SUCH_WORD = "noSuchWord";
module.exports.NO_SUCH_WORD = NO_SUCH_WORD;

var NO_WORDS_TO_SHOW = "noWordsToShow";
module.exports.NO_WORDS_TO_SHOW = NO_WORDS_TO_SHOW;

var NoticeClass = Object.assign({}, {}, {

    displayName: 'Notice',
    mixins: [GameMixin],

    propTypes: {
        classNames: React.PropTypes.string,
        noticeType: React.PropTypes.string,
        word: React.PropTypes.shape({
            letters: React.PropTypes.arrayOf(React.PropTypes.shape({
                classNames: React.PropTypes.object,
                letter: React.PropTypes.string,
                x: React.PropTypes.number,
                y: React.PropTypes.number
            }))
        }),
        hideNotice: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            classNames: this.props.classNames || "",
            noticeType: this.props.noticeType || "",
            word: this.props.word || {letters: []},
            hideNotice: this.props.hideNotice || function () {
            }
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            classNames: nextProps.classNames || "",
            noticeType: nextProps.noticeType || "",
            word: nextProps.word || {letters: []},
            hideNotice: nextProps.hideNotice || function () {
            }
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

    whichText: function () {
        var capitalizedWord = this.capitalizeWord();
        var textBefore = "";
        var textAfter = "";

        switch (this.state.noticeType) {
            case NO_WORDS_TO_SHOW:
                return i18n._('notice.noWordsToShow');
            case NO_SUCH_WORD:
                if (capitalizedWord === false) {
                    return false;
                }
                textBefore = i18n._('notice.noSuchWord.before');
                textAfter = i18n._('notice.noSuchWord.after');
                return textBefore + ' "' + capitalizedWord + '" ' + textAfter;
            case SELECT_DIFFERENTLY:
                if (capitalizedWord === false) {
                    return false;
                }
                textBefore = i18n._('notice.selectDifferently.before');
                textAfter = i18n._('notice.selectDifferently.after');
                return textBefore + ' "' + capitalizedWord + '" ' + textAfter;
            default:
                return false;
        }
    },

    whichImage: function () {
        switch (this.state.noticeType) {
            case NO_WORDS_TO_SHOW:
                return "url('" + this.getImagePath('notice/no_words_to_show') + "')";
            case NO_SUCH_WORD:
                return "url('" + this.getImagePath('notice/wrong') + "')";
            case SELECT_DIFFERENTLY:
                return "url('" + this.getImagePath('notice/change') + "')";
            default:
                return "url('" + this.getImagePath('notice/wrong') + "')";
        }
    },

    render: function () {
        if (this.state.noticeType == "") {
            return (<div></div>)
        }

        var noticeImg = {
            backgroundImage: this.whichImage()
        };

        var text = this.whichText() ? this.whichText() : "";

        var noticeClassNames = classNames(
            "notice",
            this.state.classnames,
            {'no-such-word': this.state.noticeType == NO_SUCH_WORD},
            {'select-differently': this.state.noticeType == SELECT_DIFFERENTLY},
            {'no-words-to-show': this.state.noticeType == NO_WORDS_TO_SHOW}
        );

        return (
            <div className="lock-screen">
                <div className={noticeClassNames}
                     style={noticeImg}
                     onClick={this.state.hideNotice}
                >
                    <div><span>{text}</span></div>
                </div>
            </div>
        );
    }

});
module.exports.Notice = React.createClass(NoticeClass);
module.exports.Notice.Class = NoticeClass;
