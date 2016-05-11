"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var OPEN_LETTER_COLOR = "open-letter";
module.exports.OPEN_LETTER_COLOR = OPEN_LETTER_COLOR;

var OPEN_LETTER_BEFORE_LINK_TOP = "open-letter-before-link-top";
var OPEN_LETTER_BEFORE_LINK_RIGHT = "open-letter-before-link-right";
var OPEN_LETTER_BEFORE_LINK_BOTTOM = "open-letter-before-link-bottom";
var OPEN_LETTER_BEFORE_LINK_LEFT = "open-letter-before-link-left";
var OPEN_LETTER_AFTER_LINK_TOP = "open-letter-after-link-top";
var OPEN_LETTER_AFTER_LINK_RIGHT = "open-letter-after-link-right";
var OPEN_LETTER_AFTER_LINK_BOTTOM = "open-letter-after-link-bottom";
var OPEN_LETTER_AFTER_LINK_LEFT = "open-letter-after-link-left";


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
        openedLetters: React.PropTypes.shape({
            letters: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    x: React.PropTypes.number,
                    y: React.PropTypes.number
                })),
            wordIdx: React.PropTypes.oneOfType([
                React.PropTypes.bool,
                React.PropTypes.number
            ])
        }),
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
            openedLetters: this.props.openedLetters || [],
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

    componentDidMount: function () {
        this.addOpenedLettersToBoardArr();
    },


    addOpenedLettersToBoardArr: function () {
        var openedLetters = this.getAndCheckOpenedLetters();
        var boardArr = this.refs.board.getBoardArr();
        var wordIdx = openedLetters.wordIdx;
        if (wordIdx === false) {
            return;
        }

        var unopenedWord = this.state.boardData.words[wordIdx].letters;
        boardArr[unopenedWord[0].y][unopenedWord[0].x].classNames.openLetter = OPEN_LETTER_COLOR;
        for (var i = 1; i < openedLetters.letters.length; i++) {
            var currentLetter = unopenedWord[i];
            var prevLetter = unopenedWord[i - 1];
            this.addOpenedLetterToBoardArr(boardArr, openedLetters, currentLetter, prevLetter);
        }
    },

    addOpenedLetterToBoardArr: function (boardArr, openedLetters, currentLetter, prevLetter) {
        var x = currentLetter.x;
        var y = currentLetter.y;
        var prevX = prevLetter.x;
        var prevY = prevLetter.y;

        boardArr[y][x].classNames = {
            openLetter: OPEN_LETTER_COLOR
        };
        if (y == prevY + 1 && x == prevX) {
            boardArr[y][x].classNames.openLetterLinkBefore = OPEN_LETTER_BEFORE_LINK_TOP;
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_BOTTOM;
        }
        if (y == prevY - 1 && x == prevX) {
            boardArr[y][x].classNames.openLetterLinkBefore = OPEN_LETTER_BEFORE_LINK_BOTTOM;
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_TOP;
        }
        if (x == prevX + 1 && y == prevY) {
            boardArr[y][x].classNames.openLetterLinkBefore = OPEN_LETTER_BEFORE_LINK_LEFT;
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_RIGHT;
        }
        if (x == prevX - 1 && y == prevY) {
            boardArr[y][x].classNames.openLetterLinkBefore = OPEN_LETTER_BEFORE_LINK_RIGHT;
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_LEFT;
        }
    },

    getAndCheckOpenedLetters: function () {
        var openedLetters = this.refs.board.getOpenedLetters();
        console.log(openedLetters);

        if (!openedLetters.hasOwnProperty("letters")) {
            openedLetters.letters = [];
        }
        if (!openedLetters.hasOwnProperty("wordIdx")) {
            openedLetters.wordIdx = false;
        }

        return openedLetters;
    },

    setOpenedLettersStateAndGameState: function (openedLetters) {
        this.state.setGameStateRoundField('openedLetters', openedLetters);
        this.setState({openedLetters: openedLetters})
    },

    openLetter: function () {
        var openedLetters = this.getAndCheckOpenedLetters();
        var wordIdx = false;
        if (openedLetters.letters.length == 0) {
            wordIdx = this.getUnopenedWordIndex();
        } else {
            wordIdx = openedLetters.wordIdx;
        }
        if (wordIdx === false) {
            return false;
        }

        var boardArr = this.refs.board.getBoardArr();
        var unopenedWord = this.state.boardData.words[wordIdx].letters;

        if (openedLetters.letters.length == 0) {
            appManager.getSFXManager().playButtonGame();

            boardArr[unopenedWord[0].y][unopenedWord[0].x].classNames.openLetter = OPEN_LETTER_COLOR;
            openedLetters = {letters: [{x: unopenedWord[0].x, y: unopenedWord[0].y}], wordIdx: wordIdx};

            this.setOpenedLettersStateAndGameState(openedLetters);
            this.refs.board.setBoardArr(boardArr);
            return;
        }

        if (openedLetters.letters.length == unopenedWord.length - 1) {
            this.openWord(wordIdx);
            return;
        }

        appManager.getSFXManager().playButtonGame();

        var currentLetter = unopenedWord[openedLetters.letters.length];
        var prevLetter = unopenedWord[openedLetters.letters.length - 1];
        openedLetters.letters.push({x: currentLetter.x, y: currentLetter.y});
        this.addOpenedLetterToBoardArr(boardArr, openedLetters, currentLetter, prevLetter);

        this.setOpenedLettersStateAndGameState(openedLetters);
        this.refs.board.setBoardArr(boardArr);
    },


    getUnopenedWordIndex: function () {
        var board = this.refs.board.getBoard();

        var index = false;

        for (var i = 0; i < this.state.boardData.words.length; i++) {
            if (!board[i] || board[i].openWord === false) {
                index = i;
                break;
            }
        }

        return index;
    },

    openWord: function (index) {
        index = (typeof index == "undefined") ? this.getUnopenedWordIndex() : index;

        if (index === false) {
            return false;
        }

        this.refs.board.openWord(index);
        this.setOpenedLettersStateAndGameState({});

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
        var words = this.state.boardData.words;
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


    emptySelectedLetters: function () {
        return this.refs.board.emptySelectedLetters();
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
                openedLetters={this.state.openedLetters}
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
