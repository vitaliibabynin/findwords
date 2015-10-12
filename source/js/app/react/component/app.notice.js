var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');
var GameMixin = require('./app.mixin').GameMixin;

var SELECT_DIFFERENTLY = "selectDifferently";
var NO_SUCH_WORD = "noSuchWord";
module.exports.SELECT_DIFFERENTLY = SELECT_DIFFERENTLY;
module.exports.NO_SUCH_WORD = NO_SUCH_WORD;

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
        })
    },

    getInitialState: function () {
        return {
            classNames: this.props.classNames || "",
            noticeType: this.props.noticeType || "",
            word: this.props.word || {letters: []}
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            classNames: nextProps.classNames || "",
            noticeType: nextProps.noticeType || "",
            word: nextProps.word || {letters: []}
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
        if (this.state.noticeType == "") {
            return false;
        }

        if (this.capitalizeWord() === false) {
            return false;
        }

        var textBefore;
        var textAfter;

        if (this.state.noticeType == NO_SUCH_WORD) {
            textBefore = i18n._('notice.noSuchWord.before');
            textAfter = i18n._('notice.noSuchWord.after');
        }

        if (this.state.noticeType == SELECT_DIFFERENTLY) {
            textBefore = i18n._('notice.selectDifferently.before');
            textAfter = i18n._('notice.selectDifferently.after');
        }

        return textBefore + ' "' + this.capitalizeWord() + '" ' + textAfter;
    },

    render: function () {
        if (this.state.noticeType == "") {
            return (<div></div>)
        }

        var noticeImg = {
            backgroundImage: "url('" + this.getImagePath('notice/wrong') + "')"
        };

        var text = this.whichText() ? this.whichText() : "";

        return (
            <div className="lock-screen">
                <div className={this.state.classNames}
                     style={noticeImg}>
                    <div><span>{text}</span></div>
                </div>
            </div>
        );
    }

});
module.exports.Notice = React.createClass(NoticeClass);
module.exports.Notice.Class = NoticeClass;
