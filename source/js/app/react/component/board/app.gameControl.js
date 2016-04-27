"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var GameControlClass = Object.assign({}, {}, {
    displayName: 'GameControl',

    propTypes: {
        boardType: React.PropTypes.func,
        boardMaxHeight: React.PropTypes.number,
        boardData: React.PropTypes.shape({
            board: React.PropTypes.shape({
                rows: React.PropTypes.number,
                cols: React.PropTypes.number
            }),
            words: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    letters: React.PropTypes.arrayOf(
                        React.PropTypes.shape({
                            x: React.PropTypes.number,
                            y: React.PropTypes.number,
                            letter: React.PropTypes.string
                        })
                    )
                })
            )
        }),
        board: React.PropTypes.object,
        displayNotice: React.PropTypes.func,
        setGameStateRoundField: React.PropTypes.func,
        goToPageRoundComplete: React.PropTypes.func,
        shownWords: React.PropTypes.arrayOf(React.PropTypes.number),
        addToShownWords: React.PropTypes.func,
        removeWordFromShownWords: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            boardType: this.props.boardType || function () {
            },
            boardMaxHeight: this.props.boardMaxHeight || 0,
            boardData: this.props.boardData || {},
            board: this.props.board || {},
            displayNotice: this.props.displayNotice || function () {
            },
            setGameStateRoundField: this.props.setGameStateRoundField || function () {
            },
            goToPageRoundComplete: this.props.goToPageRoundComplete || function () {
            },
            shownWords: this.props.shownWords || [],
            addToShownWords: this.props.addToShownWords || function () {
            },
            removeWordFromShownWords: this.props.removeWordFromShownWords || function () {
            }
        };

        return state;
    },

    emptySelectedLetters: function () {
        return this.refs.board.emptySelectedLetters();
    },

    getUnopenedWordIndex: function (wordsToFind) {
        var board = this.refs.board.getBoard();

        var index = false;

        for (var i = 0; i < wordsToFind.words.length; i++) {
            if (!board[i] || board[i].openWord === false) {
                index = i;
                break;
            }
        }

        return index;
    },

    openWord: function () {
        var wordsToFind = this.refs.board.getWordsToFind();
        var index = this.getUnopenedWordIndex(wordsToFind);

        if (index === false) {
            return false;
        }

        this.refs.board.openWord(index);

        this.removeFromShownWordsIfShown(index);
    },

    sendWordToShowToPageGame: function () {
        var wordArr = this.getUnopenedUnshownWordAndIndex();

        if (!wordArr) {
            return false;
        }

        this.state.addToShownWords(wordArr[0], wordArr[1]);
    },

    getUnopenedUnshownWordAndIndex: function () {
        var words = this.refs.board.getWordsToFind().words;
        var board = this.refs.board.getBoard();

        if (board.length == words.length) {
            return false;
        }

        for (var wordIdx = 0; wordIdx < words.length; wordIdx++) {
            var word = words[wordIdx].letters;

            var wordIsOpen = this.checkIfWordIsOpen(wordIdx);
            var wordIsShown = this.checkIfWordIsShown(wordIdx);

            if (!wordIsOpen && !wordIsShown) {
                return [word, wordIdx];
            }
        }

        return false;
    },

    checkIfWordIsOpen: function (wordIdx) {
        var board = this.state.board;

        if (!board.hasOwnProperty(wordIdx)) {
            return false;
        }

        return board[wordIdx].openWord;
    },

    checkIfWordIsShown: function (wordIdx) {
        var shownWords = this.state.shownWords;

        if (shownWords.length == 0) {
            return false;
        }

        for (var shownWordIdx = 0; shownWordIdx < shownWords.length; shownWordIdx++) {
            if (shownWords[shownWordIdx] === wordIdx) {
                return true;
            }
        }

        return false;
    },

    removeFromShownWordsIfShown: function (index) {
        if (this.checkIfWordIsShown(index)) {
            this.state.removeWordFromShownWords(index);
        }
    },

    checkIfRoundComplete: function () {
        return this.refs.board.checkIfRoundComplete();
    },


    render: function () {

        var BoardType = this.state.boardType;

        return (
            <BoardType
                ref="board"
                boardMaxHeight={this.state.boardMaxHeight}
                boardData={this.state.boardData}
                board={this.state.board}
                displayNotice={this.state.displayNotice}
                setGameStateRoundField={this.state.setGameStateRoundField}
                goToPageRoundComplete={this.state.goToPageRoundComplete}
                removeFromShownWordsIfShown={this.removeFromShownWordsIfShown}
            />
        );

    }

});
module.exports.GameControl = React.createClass(GameControlClass);
module.exports.GameControl.Class = GameControlClass;
