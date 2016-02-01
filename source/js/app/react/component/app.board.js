"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
//var GameMixin = require('./app.mixin').GameMixin;


module.exports = {};


var LetterClass = Object.assign({}, {}, {

    displayName: 'Letter',

    propTypes: {
        classNames: React.PropTypes.string,
        cellSize: React.PropTypes.number
    },

    getInitialState: function () {
        return {
            classNames: this.props.classNames || "",
            cellSize: this.props.cellSize || 0
        };
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            classNames: nextProps.classNames || "",
            cellSize: nextProps.cellSize || 0
        });
    },

    render: function () {
        var cellStyle = {
            height: this.state.cellSize + "px",
            width: this.state.cellSize + "px",
            lineHeight: this.state.cellSize + "px"
        };

        return (
            <td className={this.state.classNames}
                style={cellStyle}>
                <span>{this.props.children}</span>
            </td>
        );
    }

});
var Letter = React.createClass(LetterClass);


//var BOARD_MARGIN = 50;
var COLOR_SELECTED = "selected";
var COLOR_COMPLETED = "completed";
var ANIMATE_LETTER = "animation";
var LINK_VISIBLE = "visible";
var LINK_FADE = "fade";
var BEFORE_LINK_TOP = "before-link-top";
var BEFORE_LINK_RIGHT = "before-link-right";
var BEFORE_LINK_BOTTOM = "before-link-bottom";
var BEFORE_LINK_LEFT = "before-link-left";
var AFTER_LINK_TOP = "after-link-top";
var AFTER_LINK_RIGHT = "after-link-right";
var AFTER_LINK_BOTTOM = "after-link-bottom";
var AFTER_LINK_LEFT = "after-link-left";
var OPEN_LETTER_COLOR = "open-letter";
var OPEN_LETTER_BEFORE_LINK_TOP = "open-letter-before-link-top";
var OPEN_LETTER_BEFORE_LINK_RIGHT = "open-letter-before-link-right";
var OPEN_LETTER_BEFORE_LINK_BOTTOM = "open-letter-before-link-bottom";
var OPEN_LETTER_BEFORE_LINK_LEFT = "open-letter-before-link-left";
var OPEN_LETTER_AFTER_LINK_TOP = "open-letter-after-link-top";
var OPEN_LETTER_AFTER_LINK_RIGHT = "open-letter-after-link-right";
var OPEN_LETTER_AFTER_LINK_BOTTOM = "open-letter-after-link-bottom";
var OPEN_LETTER_AFTER_LINK_LEFT = "open-letter-after-link-left";
var SELECT_DIFFERENTLY = require('./../component/app.notice.js').SELECT_DIFFERENTLY;
var NO_SUCH_WORD = require('./../component/app.notice.js').NO_SUCH_WORD;

var BoardClass = Object.assign({}, {}, {

    displayName: 'Board',

    propTypes: {
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
        openedLetters: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                x: React.PropTypes.number,
                y: React.PropTypes.number
            })
        ),
        shownWords: React.PropTypes.arrayOf(React.PropTypes.number),
        isPracticeRound: React.PropTypes.bool,
        displayNotice: React.PropTypes.func,
        addToShownWords: React.PropTypes.func,
        removeWordFromShownWords: React.PropTypes.func,
        setGameStateRoundField: React.PropTypes.func,
        goToPageRoundComplete: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            board: this.props.board || {},
            openedLetters: this.props.openedLetters || [],
            shownWords: this.props.shownWords || [],
            selectedLetters: {letters: []},
            prevSelectedLetters: {letters: []},
            highlightedWord: {letters: []},
            isPracticeRound: this.props.isPracticeRound || false,
            displayNotice: this.props.displayNotice || function () {
            },
            addToShownWords: this.props.addToShownWords || function () {
            },
            removeWordFromShownWords: this.props.removeWordFromShownWords || function () {
            },
            setGameStateRoundField: this.props.setGameStateRoundField || function () {
            },
            goToPageRoundComplete: this.props.goToPageRoundComplete || function () {
            }
        };
        state.boardData = this.props.boardData || {};
        state.boardArr = this.boardConverter(state.boardData);
        state.wordsToFind = this.extractWordsToFind(state.boardData);
        this.addOpenedLettersToBoardArr(state.openedLetters, state.wordsToFind, state.boardArr);
        this.addFoundWordsToBoardArr(state.board, state.wordsToFind, state.boardArr);

        return state;
    },

    componentDidMount: function () {
        this.setState({
            //cellSize: ($('.page-content').width() - BOARD_MARGIN) / this.state.boardData.board.cols || 0
            cellSize: $('.game-board').width() / this.state.boardData.board.cols || 0
        })
    },

    boardConverter: function (boardData) {
        var arr = new Array(boardData.board.rows);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(boardData.board.cols);
        }

        //console.log(boardData);

        boardData.words.map(function (word) {
            word.letters.map(function (letter) {
                arr[letter.y][letter.x] = {
                    x: letter.x,
                    y: letter.y,
                    letter: letter.letter,
                    classNames: {}
                };
            })
        });

        return arr;
    },

    extractWordsToFind: function (boardData) {
        var boardDataWords = boardData.words;
        var wordsToFind = {words: []};

        boardDataWords.map(function (word, wordIndex) {
            wordsToFind.words[wordIndex] = {letters: word.letters};
        });

        return wordsToFind;
    },

    addOpenedLettersToBoardArr: function (openedLetters, wordsToFind, boardArr) {
        var wordIndex = this.findWhichWordLetterIsIn(openedLetters, wordsToFind);

        if (wordIndex === false) {
            return;
        }

        var unopenedWord = wordsToFind.words[wordIndex].letters;

        boardArr[unopenedWord[0].y][unopenedWord[0].x].classNames.openLetter = OPEN_LETTER_COLOR;

        for (var i = 1; i < openedLetters.length; i++) {
            var currentLetter = unopenedWord[i];
            var x = currentLetter.x;
            var y = currentLetter.y;

            var prevLetter = openedLetters[i - 1];
            var prevX = prevLetter.x;
            var prevY = prevLetter.y;

            if (y == prevY + 1 && x == prevX) {
                boardArr[y][x].classNames = {
                    openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_TOP,
                    openLetter: OPEN_LETTER_COLOR
                };
                boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_BOTTOM;
            }

            if (y == prevY - 1 && x == prevX) {
                boardArr[y][x].classNames = {
                    openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_BOTTOM,
                    openLetter: OPEN_LETTER_COLOR
                };
                boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_TOP;
            }

            if (x == prevX + 1 && y == prevY) {
                boardArr[y][x].classNames = {
                    openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_LEFT,
                    openLetter: OPEN_LETTER_COLOR
                };
                boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_RIGHT;
            }

            if (x == prevX - 1 && y == prevY) {
                boardArr[y][x].classNames = {
                    openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_RIGHT,
                    openLetter: OPEN_LETTER_COLOR
                };
                boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_LEFT;
            }
        }
    },

    addFoundWordsToBoardArr: function (board, wordsToFind, boardArr) {
        for (var k in board) {

            if (!board[k].openWord) {
                continue;
            }

            var backgroundColor = board[k].color;

            var currentWord = wordsToFind.words[k];

            boardArr[currentWord.letters[0].y][currentWord.letters[0].x].classNames = {
                backgroundColor: backgroundColor,
                color: COLOR_COMPLETED,
                linkVisibility: LINK_FADE
            };

            for (var i = 1; i < currentWord.letters.length; i++) {
                var x = currentWord.letters[i].x;
                var y = currentWord.letters[i].y;
                var prevLetter = currentWord.letters[i - 1];
                var prevX = prevLetter.x;
                var prevY = prevLetter.y;

                if (y == prevY + 1 && x == prevX) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_TOP,
                        linkVisibility: LINK_FADE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
                }

                if (y == prevY - 1 && x == prevX) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_BOTTOM,
                        linkVisibility: LINK_FADE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
                }

                if (x == prevX + 1 && y == prevY) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_LEFT,
                        linkVisibility: LINK_FADE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
                }

                if (x == prevX - 1 && y == prevY) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_RIGHT,
                        linkVisibility: LINK_FADE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
                }
            }
        }
    },

    findWhichWordLetterIsIn: function (openedLetters, wordsToFind) {
        if (!wordsToFind) {
            wordsToFind = this.state.wordsToFind.words;
        } else {
            wordsToFind = wordsToFind.words;
        }

        if (!openedLetters) {
            openedLetters = this.state.openedLetters;
        }

        if (openedLetters.length == 0) {
            return false;
        }

        for (var wordIdx = 0; wordIdx < wordsToFind.length; wordIdx++) {
            var word = wordsToFind[wordIdx].letters;
            if (openedLetters[0].x == word[0].x && openedLetters[0].y == word[0].y) {
                return wordIdx;
            }
        }

        return false;
    },


    onTouchStart: function (e) {
        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        if (this.highlightCompletedWord(x, y)) {
            return;
        }

        this.addFirstLetterToSelectedLetters(x, y);
    },

    onTouchMove: function (e) {
        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        if (!this.checkIfDifferentLetter(x, y)) {
            return;
        }

        if (this.checkIfLetterIsInCompleteWord(x, y) !== false) {
            return;
        }

        if (this.removeSelectedLettersAfter(x, y)) {
            return;
        }

        this.addLetterToSelectedLetters(x, y);
    },

    onTouchEnd: function (e) {
        this.preventDefaultOnEvent(e);

        this.fadeHighlightedWord();

        var completedWordIndex = this.checkForCompletedWord();
        if (completedWordIndex !== false) {
            this.addCompletedWordToBoard(completedWordIndex);

            if (this.checkIfWordIsShown(completedWordIndex)) {
                this.state.removeWordFromShownWords(completedWordIndex);
            }

            if (this.checkIfRoundComplete()) {
                //this.state.goToPageRoundComplete(2200);
                this.state.goToPageRoundComplete();
            }
            return;
        }

        if (this.checkLettersInWordsToFind()) {
            this.bringUpNotice(SELECT_DIFFERENTLY);
            return;
        }

        if (this.selectedLettersEqualsPrevSelectedLetters()) {
            this.bringUpNotice(NO_SUCH_WORD);
            return;
        }

        this.copySelectedLettersToPrevSelectedLetters();

        this.emptySelectedLetters();
    },

    onTouchCancel: function () {
        this.preventDefaultOnEvent(e);

        this.fadeHighlightedWord();

        this.emptySelectedLetters();
    },


    preventDefaultOnEvent: function (e) {
        e.stopPropagation();
        e.preventDefault();
    },

    calcWhichCellIsTouched: function (e) {
        var screenX = e.touches[0].clientX;
        var screenY = e.touches[0].clientY;

        var boardX = screenX - e.currentTarget.getBoundingClientRect().left;
        var boardY = screenY - e.currentTarget.getBoundingClientRect().top;

        var rows = this.state.boardData.board.rows;
        var cols = this.state.boardData.board.cols;

        var boardWidthX = e.currentTarget.getBoundingClientRect().width;
        var boardHeightY = e.currentTarget.getBoundingClientRect().height;

        var cellWidthX = boardWidthX / cols;
        var cellHeightY = boardHeightY / rows;

        var x = Math.floor(boardX / cellWidthX);
        var y = Math.floor(boardY / cellHeightY);

        //check for invalid number of rows and columns
        if (y > rows - 1 || x > cols - 1 || y < 0 || x < 0) {
            return false;
        }

        return {x: x, y: y};
    },

    highlightCompletedWord: function (x, y) {
        var boardArr = this.state.boardArr;
        var wordAlreadyCompleted = false;

        var currentWord = this.checkIfLetterIsInCompleteWord(x, y);

        if (currentWord !== false) {

            currentWord.map(function (letter) {
                boardArr[letter.y][letter.x].classNames.linkVisibility = LINK_VISIBLE;
            });

            this.setState({highlightedWord: {letters: currentWord}});

            wordAlreadyCompleted = true;
        }

        return wordAlreadyCompleted;
    },

    fadeHighlightedWord: function () {
        var highlightedWord = this.state.highlightedWord.letters;

        if (highlightedWord != []) {
            var boardArr = this.state.boardArr;

            highlightedWord.map(function (letter) {
                boardArr[letter.y][letter.x].classNames.linkVisibility = LINK_FADE;
            });

            this.setState({highlightedWord: {letters: []}});
        }
    },

    checkIfLetterIsInCompleteWord: function (x, y) {
        var completeWord = false;
        var completeWordIndex = false;
        var wordsToFind = this.state.wordsToFind.words;

        for (var wordIdx = 0; wordIdx < wordsToFind.length; wordIdx++) {
            var word = wordsToFind[wordIdx].letters;

            for (var letterIdx = 0; letterIdx < word.length; letterIdx++) {
                var letter = word[letterIdx];

                if (letter.x == x && letter.y == y) {
                    completeWord = word;
                    completeWordIndex = wordIdx;
                    break;
                }
            }

            if (completeWordIndex !== false) {
                break;
            }
        }

        if (!this.state.board[completeWordIndex]) {
            return false;
        }

        if (this.state.board[completeWordIndex].openWord === true) {
            return completeWord;
        }

        return false;
    },

    addFirstLetterToSelectedLetters: function (x, y) {

        var boardArr = this.state.boardArr;
        var selectedLetters = this.state.selectedLetters;

        selectedLetters.letters.push(boardArr[y][x]);
        boardArr[y][x].classNames.backgroundColor = this.selectWordBackgroundColor();
        boardArr[y][x].classNames.color = COLOR_SELECTED;
        boardArr[y][x].classNames.linkVisibility = LINK_VISIBLE;

        this.setState({
            boardArr: boardArr,
            selectedLetters: selectedLetters
        });

    },

    selectWordBackgroundColor: function () {
        var backgroundColor = '';
        var wordsComplete = this.howManyCompleteWordsInBoard();

        var backgroundColors = [];
        if (this.state.isPracticeRound) {
            backgroundColors = [
                "learn-bg-color-1",
                "learn-bg-color-2",
                "learn-bg-color-3"
            ]
        } else {
            backgroundColors = [
                "bg-color-1",
                "bg-color-2",
                "bg-color-3",
                "bg-color-4",
                "bg-color-5",
                "bg-color-6",
                "bg-color-7",
                "bg-color-8",
                "bg-color-9",
                "bg-color-10",
                "bg-color-11",
                "bg-color-12",
                "bg-color-13",
                "bg-color-14",
                "bg-color-15"
            ]
        }

        //  +1 because word hasn't been added to completedWords yet
        for (var i = 0; i < wordsComplete + 1; i++) {
            backgroundColor = backgroundColors[i % backgroundColors.length];
        }

        return backgroundColor;
    },

    howManyCompleteWordsInBoard: function () {
        var board = this.state.board;

        var wordsComplete = 0;
        for (var word in board) {
            if (board[word].openWord == true) {
                wordsComplete++;
            }
        }

        return wordsComplete;
    },

    checkIfDifferentLetter: function (x, y) {
        var selectedLetters = this.state.selectedLetters.letters;

        if (selectedLetters.length == 0) {
            return false;
        }

        return !(y == selectedLetters[selectedLetters.length - 1].y && x == selectedLetters[selectedLetters.length - 1].x);
    },

    removeSelectedLettersAfter: function (x, y) {
        var lettersRemoved = false;

        var index = this.getIndexIfLetterIsSelected(x, y);
        if (index !== false) {

            var boardArr = this.state.boardArr;
            var selectedLetters = this.state.selectedLetters.letters;

            for (var i = index + 1; i < selectedLetters.length; i++) {
                delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.linkBefore;
                delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.linkAfter;
                delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.linkVisibility;
                delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.backgroundColor;
                delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.color;
            }

            delete boardArr[selectedLetters[index].y][selectedLetters[index].x].classNames.linkAfter;

            selectedLetters.splice(index + 1, selectedLetters.length - (index - 1));

            this.setState({
                selectedLetters: {letters: selectedLetters}
            });

            lettersRemoved = true;

        }

        return lettersRemoved;
    },

    getIndexIfLetterIsSelected: function (x, y) {
        var selectedLetters = this.state.selectedLetters.letters;

        for (var letterIdx = 0; letterIdx < selectedLetters.length; letterIdx++) {
            var letter = selectedLetters[letterIdx];
            if (y == letter.y && x == letter.x) {
                return letterIdx;
            }
        }

        return false;
    },

    addLetterToSelectedLetters: function (x, y) {
        var boardArr = this.state.boardArr;
        var selectedLetters = this.state.selectedLetters;

        var previousLetter = selectedLetters.letters[selectedLetters.letters.length - 1];

        //find out which link needs to be attached
        //restrict which letters can be clicked
        var prevX = previousLetter.x;
        var prevY = previousLetter.y;
        var prevColor = previousLetter.classNames.backgroundColor;

        if (y == prevY + 1 && x == prevX) {
            selectedLetters.letters.push(boardArr[y][x]);
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_TOP;
            boardArr[y][x].classNames.linkVisibility = LINK_VISIBLE;
            boardArr[y][x].classNames.backgroundColor = prevColor;
            boardArr[y][x].classNames.color = COLOR_SELECTED;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
        }

        if (y == prevY - 1 && x == prevX) {
            selectedLetters.letters.push(boardArr[y][x]);
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM;
            boardArr[y][x].classNames.linkVisibility = LINK_VISIBLE;
            boardArr[y][x].classNames.backgroundColor = prevColor;
            boardArr[y][x].classNames.color = COLOR_SELECTED;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
        }

        if (x == prevX + 1 && y == prevY) {
            selectedLetters.letters.push(boardArr[y][x]);
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_LEFT;
            boardArr[y][x].classNames.linkVisibility = LINK_VISIBLE;
            boardArr[y][x].classNames.backgroundColor = prevColor;
            boardArr[y][x].classNames.color = COLOR_SELECTED;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
        }

        if (x == prevX - 1 && y == prevY) {
            selectedLetters.letters.push(boardArr[y][x]);
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_RIGHT;
            boardArr[y][x].classNames.linkVisibility = LINK_VISIBLE;
            boardArr[y][x].classNames.backgroundColor = prevColor;
            boardArr[y][x].classNames.color = COLOR_SELECTED;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
        }

        this.setState({
            boardArr: boardArr,
            selectedLetters: selectedLetters
        });
    },

    checkForCompletedWord: function () {
        var words = this.state.wordsToFind.words;
        var selectedLetters = this.state.selectedLetters.letters;

        for (var wordIdx = 0; wordIdx < words.length; wordIdx++) {
            var word = words[wordIdx].letters;
            if (word.length != selectedLetters.length) {
                continue;
            }

            var lettersAndCellsMatch = true;
            for (var letterIdx = 0; letterIdx < word.length; letterIdx++) {
                var letterInWord = word[letterIdx];
                if (selectedLetters[letterIdx].letter != letterInWord.letter) {
                    lettersAndCellsMatch = false;
                    break;
                }

                var cellsMatch = false;
                for (var selectedLetterIdx = 0; selectedLetterIdx < selectedLetters.length; selectedLetterIdx++) {
                    var selectedLetter = selectedLetters[selectedLetterIdx];
                    if (selectedLetter.x == letterInWord.x && selectedLetter.y == letterInWord.y) {
                        cellsMatch = true;
                        break;
                    }
                }

                if (!cellsMatch) {
                    lettersAndCellsMatch = false;
                }
            }

            if (lettersAndCellsMatch) {
                return wordIdx;
            }
        }
        return false;
    },

    addCompletedWordToBoard: function (index) {
        var boardArr = this.state.boardArr;
        var selectedLetters = this.state.selectedLetters.letters;

        selectedLetters.map(function (letter) {
            boardArr[letter.y][letter.x].classNames.color = COLOR_COMPLETED;
            boardArr[letter.y][letter.x].classNames.linkVisibility = LINK_FADE;
            boardArr[letter.y][letter.x].classNames.animation = ANIMATE_LETTER;
        });

        var backgroundColor = boardArr[selectedLetters[0].y][selectedLetters[0].x].classNames.backgroundColor;
        var board = this.state.board;
        board[index] = {
            color: backgroundColor,
            openWord: true
        };

        var openedLetters = this.clearOpenedLettersInWord(index);

        this.state.setGameStateRoundField('openedLetters', openedLetters);
        this.state.setGameStateRoundField('board', board);

        this.setState({
            openedLetters: openedLetters,
            boardArr: boardArr,
            selectedLetters: {letters: []},
            board: board
        });
    },

    clearOpenedLettersInWord: function (index) {
        var openedLetters = this.state.openedLetters;
        var wordsToFind = this.state.wordsToFind;
        var word = wordsToFind.words[index].letters;
        var boardArr = this.state.boardArr;

        if (openedLetters.length == 0) {
            return openedLetters;
        }

        if (word[0].x == openedLetters[0].x && word[0].y == openedLetters[0].y) {
            openedLetters.map(function (openedLetter) {
                delete boardArr[openedLetter.y][openedLetter.x].classNames.openLetterLinkAfter;
                delete boardArr[openedLetter.y][openedLetter.x].classNames.openLetterLinkBefore;
            });
            openedLetters = [];
        }

        return openedLetters;
    },

    copySelectedLettersToPrevSelectedLetters: function () {
        var selectedLetters = this.state.selectedLetters;

        this.setState({
            prevSelectedLetters: selectedLetters
        })
    },

    checkLettersInWordsToFind: function () {
        var words = this.state.wordsToFind.words;
        var selectedLetters = this.state.selectedLetters.letters;

        for (var wordIdx = 0; wordIdx < words.length; wordIdx++) {
            var word = words[wordIdx].letters;
            if (word.length != selectedLetters.length) {
                continue;
            }

            var lettersMatch = true;
            for (var letterIdx = 0; letterIdx < word.length; letterIdx++) {
                var letterInWord = word[letterIdx];
                if (selectedLetters[letterIdx].letter != letterInWord.letter) {
                    lettersMatch = false;
                    break;
                }
            }

            if (lettersMatch) {
                return true;
            }
        }
        return false;
    },

    selectedLettersEqualsPrevSelectedLetters: function () {
        var selectedLetters = this.state.selectedLetters.letters;
        var previousSelection = this.state.prevSelectedLetters.letters;

        if (selectedLetters.length < 2) {
            return false;
        }

        if (selectedLetters.length != previousSelection.length) {
            return false;
        }

        var result = true;
        for (var i = 0; i < selectedLetters.length; i++) {
            if (selectedLetters[i].letter != previousSelection[i].letter) {
                result = false;
            }
        }

        return result;
    },

    bringUpNotice: function (type) {
        var word = this.state.selectedLetters;
        this.state.displayNotice(type, word);

        this.copySelectedLettersToPrevSelectedLetters();

        //setTimeout(function () {
        //    this.emptySelectedLetters();
        //}.bind(this), 2000);
    },

    emptySelectedLetters: function () {
        var boardArr = this.state.boardArr;
        var selectedLetters = this.state.selectedLetters;

        selectedLetters.letters.map(function (letter) {
            delete boardArr[letter.y][letter.x].classNames.linkBefore;
            delete boardArr[letter.y][letter.x].classNames.linkAfter;
            delete boardArr[letter.y][letter.x].classNames.linkVisibility;
            delete boardArr[letter.y][letter.x].classNames.backgroundColor;
            delete boardArr[letter.y][letter.x].classNames.color;
        });

        this.setState({
            boardArr: boardArr,
            selectedLetters: {letters: []}
        });
    },


    openLetter: function () {
        var unopenedWordIndex = this.findWhichWordLetterIsIn();

        if (unopenedWordIndex === false) {
            unopenedWordIndex = this.getUnopenedWordIndex();
        }

        if (unopenedWordIndex === false) {
            return false;
        }

        var boardArr = this.state.boardArr;
        var openedLetters = this.state.openedLetters;
        var unopenedWord = this.state.wordsToFind.words[unopenedWordIndex].letters;

        if (openedLetters.length == 0) {
            boardArr[unopenedWord[0].y][unopenedWord[0].x].classNames.openLetter = OPEN_LETTER_COLOR;
            openedLetters = [{x: unopenedWord[0].x, y: unopenedWord[0].y}];
            this.state.setGameStateRoundField('openedLetters', openedLetters);
            this.setState({
                openedLetters: openedLetters
            });
            return;
        }

        if (openedLetters.length == unopenedWord.length - 1) {
            this.openWord();
            return;
        }

        var currentLetter = unopenedWord[openedLetters.length];
        var x = currentLetter.x;
        var y = currentLetter.y;

        var prevLetter = openedLetters[openedLetters.length - 1];
        var prevX = prevLetter.x;
        var prevY = prevLetter.y;

        if (y == prevY + 1 && x == prevX) {
            openedLetters.push({x: x, y: y});
            boardArr[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_TOP,
                openLetter: OPEN_LETTER_COLOR
            };
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_BOTTOM;
        }

        if (y == prevY - 1 && x == prevX) {
            openedLetters.push({x: x, y: y});
            boardArr[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_BOTTOM,
                openLetter: OPEN_LETTER_COLOR
            };
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_TOP;
        }

        if (x == prevX + 1 && y == prevY) {
            openedLetters.push({x: x, y: y});
            boardArr[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_LEFT,
                openLetter: OPEN_LETTER_COLOR
            };
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_RIGHT;
        }

        if (x == prevX - 1 && y == prevY) {
            openedLetters.push({x: x, y: y});
            boardArr[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_RIGHT,
                openLetter: OPEN_LETTER_COLOR
            };
            boardArr[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_LEFT;
        }

        this.state.setGameStateRoundField('openedLetters', openedLetters);

        this.setState({
            boardArr: boardArr,
            openedLetters: openedLetters
        });
    },

    openWord: function () {
        return new Promise(function (resolve, reject) {
            var board = this.state.board;
            var index = this.getUnopenedWordIndex();

            if (index === false) {
                return false;
            }

            var backgroundColor = this.selectWordBackgroundColor();
            var wordsToFind = this.state.wordsToFind;
            var currentWord = wordsToFind.words[index];
            var boardArr = this.state.boardArr;

            boardArr[currentWord.letters[0].y][currentWord.letters[0].x].classNames = {
                backgroundColor: backgroundColor,
                color: COLOR_COMPLETED,
                linkVisibility: LINK_VISIBLE,
                animation: ANIMATE_LETTER
            };

            for (var i = 1; i < currentWord.letters.length; i++) {
                var x = currentWord.letters[i].x;
                var y = currentWord.letters[i].y;
                var prevLetter = currentWord.letters[i - 1];
                var prevX = prevLetter.x;
                var prevY = prevLetter.y;

                if (y == prevY + 1 && x == prevX) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_TOP,
                        linkVisibility: LINK_VISIBLE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED,
                        animation: ANIMATE_LETTER
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
                }

                if (y == prevY - 1 && x == prevX) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_BOTTOM,
                        linkVisibility: LINK_VISIBLE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED,
                        animation: ANIMATE_LETTER
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
                }

                if (x == prevX + 1 && y == prevY) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_LEFT,
                        linkVisibility: LINK_VISIBLE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED,
                        animation: ANIMATE_LETTER
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
                }

                if (x == prevX - 1 && y == prevY) {
                    boardArr[y][x].classNames = {
                        linkBefore: BEFORE_LINK_RIGHT,
                        linkVisibility: LINK_VISIBLE,
                        backgroundColor: backgroundColor,
                        color: COLOR_COMPLETED,
                        animation: ANIMATE_LETTER
                    };
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
                }
            }

            board[index] = {
                color: backgroundColor,
                openWord: true
            };

            if (this.checkIfWordIsShown(index)) {
                this.state.removeWordFromShownWords(index);
            }

            this.state.setGameStateRoundField('openedLetters', []);
            this.state.setGameStateRoundField('board', board);

            this.setState({
                boardArr: boardArr,
                board: board,
                openedLetters: []
            }, function () {
                currentWord.letters.map(function (letter) {
                    boardArr[letter.y][letter.x].classNames.linkVisibility = LINK_FADE;
                });
                setTimeout(function () {
                    this.setState({
                        boardArr: boardArr
                    }, function () {
                        resolve();
                    })
                }.bind(this), 200);
            });
        }.bind(this));
    },

    sendWordToShowToPageGame: function () {
        var wordArr = this.getUnopenedUnshownWordAndIndex();

        if (!wordArr) {
            return false;
        }

        this.state.addToShownWords(wordArr[0], wordArr[1]);
    },

    getUnopenedUnshownWordAndIndex: function () {
        var words = this.state.wordsToFind.words;
        var board = this.state.board;

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

    getUnopenedWordIndex: function () {
        var board = this.state.board;
        var wordsToFind = this.state.wordsToFind.words;
        var index = false;

        for (var i = 0; i < wordsToFind.length; i++) {
            if (!board[i] || board[i].openWord === false) {
                index = i;
                break;
            }
        }

        return index;
    },

    checkIfRoundComplete: function () {
        var board = this.state.board;
        var wordsToFind = this.state.wordsToFind.words;

        var boardLength = Utils.countObjectProperties(board);

        if (boardLength == wordsToFind.length) {
            return true;
        }

        return false;
    },


    filterClassNames: function (cellClassNames) {
        var filteredCellClassNames = JSON.parse(JSON.stringify(cellClassNames));

        if (filteredCellClassNames.openLetter == OPEN_LETTER_COLOR && filteredCellClassNames.color == COLOR_SELECTED) {
            delete filteredCellClassNames.openLetterLinkAfter;
            delete filteredCellClassNames.openLetterLinkBefore;
        }

        return filteredCellClassNames;
    },

    render: function () {
        //console.log({board: this.state.shownWords});
        //console.log({boardProps: this.props.shownWords});
        //console.log(this.state.boardArr);
        //console.log(this.state.selectedLetters);
        //console.log(this.state.wordsToFind);
        //console.log(this.state.board);
        //console.log(this.state.openedLetters);
        //console.log(this.checkIfRoundComplete());

        var boardArr = this.state.boardArr;
        var boardStyle = {
            fontSize: (this.state.cellSize / 2) + "px"
        };
        return (
            <div className="game-board">
                <table className="board"
                       onTouchStart={this.onTouchStart}
                       onTouchMove={this.onTouchMove}
                       onTouchEnd={this.onTouchEnd}
                       onTouchCancel={this.onTouchCancel}
                       style={boardStyle}>

                    {boardArr.map(function (row, rowId) {
                        return (
                            <tr key={rowId}>

                                {row.map(function (cell, cellId) {
                                    var filteredCellClassNames = this.filterClassNames(cell.classNames);
                                    var properties = [];
                                    for (var property in filteredCellClassNames) {
                                        if (filteredCellClassNames.hasOwnProperty(property)) {
                                            properties.push(filteredCellClassNames[property]);
                                        }
                                    }
                                    var letterClassNames = classNames(
                                        properties
                                    );
                                    return (
                                        <Letter key={rowId + '_' + cellId}
                                                classNames={letterClassNames}
                                                cellSize={this.state.cellSize}>
                                            {cell.letter}
                                        </Letter>
                                    );
                                }.bind(this))}

                            </tr>
                        );
                    }.bind(this))}

                </table>
            </div>
        );
    }

});
module.exports.Board = React.createClass(BoardClass);
module.exports.Board.Class = BoardClass;