"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;


module.exports = {};


var LetterClass = Object.assign({}, {}, {
    mixins: [PureRenderMixin],
    displayName: 'Letter',

    propTypes: {
        classNames: React.PropTypes.string,
        cellSize: React.PropTypes.number
    },

    getInitialState: function () {
        return {};
    },


    render: function () {
        var cellStyle = {
            height: this.props.cellSize + "px",
            width: this.props.cellSize + "px",
            lineHeight: this.props.cellSize + "px"
        };

        return (
            <td className={this.props.classNames}
                style={cellStyle}>
                <span>{this.props.children}</span>
            </td>
        );
    }

});
module.exports.Letter = React.createClass(LetterClass);
module.exports.Letter.Class = LetterClass;


var COLOR_SELECTED = "selected";
var COLOR_COMPLETED = "completed";
module.exports.COLOR_COMPLETED = COLOR_COMPLETED;

var OPEN_LETTER_COLOR = require('./app.gamecontrol.js').OPEN_LETTER_COLOR;

var LINK_VISIBLE = "visible";
module.exports.LINK_VISIBLE = LINK_VISIBLE;

var LINK_FADE = "fade";

var BEFORE_LINK_TOP = "before-link-top";

var BEFORE_LINK_RIGHT = "before-link-right";
module.exports.BEFORE_LINK_RIGHT = BEFORE_LINK_RIGHT;

var BEFORE_LINK_BOTTOM = "before-link-bottom";

var BEFORE_LINK_LEFT = "before-link-left";
module.exports.BEFORE_LINK_LEFT = BEFORE_LINK_LEFT;

var AFTER_LINK_TOP = "after-link-top";

var AFTER_LINK_RIGHT = "after-link-right";
module.exports.AFTER_LINK_RIGHT = AFTER_LINK_RIGHT;

var AFTER_LINK_BOTTOM = "after-link-bottom";

var AFTER_LINK_LEFT = "after-link-left";
module.exports.AFTER_LINK_LEFT = AFTER_LINK_LEFT;

var SELECT_DIFFERENTLY = require('./../app.notice.js').SELECT_DIFFERENTLY;
var NO_SUCH_WORD = require('./../app.notice.js').NO_SUCH_WORD;


var BoardAbstractClass = Object.assign({}, {}, {

    propTypes: {
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
        isPracticeRound: React.PropTypes.bool,
        displayNotice: React.PropTypes.func,
        setGameStateRoundField: React.PropTypes.func,
        goToPageRoundComplete: React.PropTypes.func,
        removeFromShownWordsIfShown: React.PropTypes.func
    },


    getInitialState: function () {
        var state = {
            boardType: "abstract",

            //for centering
            boardExtraClass: [],

            //gameData
            boardData: this.props.boardData || {},

            //gameState
            board: this.props.board || {},

            openedLetters: this.props.openedLetters || [],

            selectedLetters: {letters: [], idx: {}},

            prevSelectedLetters: {letters: [], idx: {}},

            //highlights completed word when clicked
            highlightedWord: {letters: []},

            //used to choose word background colors
            isPracticeRound: typeof this.props.isPracticeRound == "undefined" ? false : this.props.isPracticeRound,

            displayNotice: this.props.displayNotice || function () {
            },

            setGameStateRoundField: this.props.setGameStateRoundField || function () {
            },

            goToPageRoundComplete: this.props.goToPageRoundComplete || function () {
            },

            //removes shown words
            removeFromShownWordsIfShown: this.props.removeFromShownWordsIfShown || function () {
            }
        };

        //data adapted for render
        state.boardArr = this.boardConverter(state.boardData);

        state.backgroundColors = this.getBackgroundColors(state.isPracticeRound) || [];

        return state;
    },

    boardConverter: function (boardData) {
        var arr = new Array(boardData.board.rows);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(boardData.board.cols);
        }

        boardData.words.map(function (word, wordIdx) {
            word.letters.map(function (letter, letterIdx) {
                arr[letter.y][letter.x] = {
                    x: letter.x,
                    y: letter.y,
                    letter: letter.letter,
                    wordIdx: wordIdx,
                    classNames: {}
                };
            })
        });

        return arr;
    },

    getBackgroundColors: function (isPracticeRound) {
        var backgroundColors = [];
        if (isPracticeRound) {
            backgroundColors = [
                "learn-bg-color-1",
                "learn-bg-color-2",
                "learn-bg-color-3"
            ];
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
            ];
        }

        return backgroundColors;
    },

    addFoundWordsToBoardArr: function (newState) {
        var board = this.state.board;

        for (var k in board) {
            if (!board.hasOwnProperty(k)) {
                continue;
            }

            if (!board[k].openWord) {
                continue;
            }

            var backgroundColor = board[k].color;

            this.openWord(k, newState, backgroundColor);
        }
    },

    addLettersInFoundWord: function (currentWord, backgroundColor, boardArr) {
        boardArr[currentWord.letters[0].y][currentWord.letters[0].x].classNames = {
            backgroundColor: backgroundColor,
            color: COLOR_COMPLETED,
            linkVisibility: LINK_VISIBLE
        };

        for (var i = 1; i < currentWord.letters.length; i++) {
            var x = currentWord.letters[i].x;
            var y = currentWord.letters[i].y;
            var prevLetter = currentWord.letters[i - 1];
            var prevX = prevLetter.x;
            var prevY = prevLetter.y;

            boardArr[y][x].classNames = {
                backgroundColor: backgroundColor,
                color: COLOR_COMPLETED,
                linkVisibility: LINK_VISIBLE
            };

            if (y == prevY + 1 && x == prevX) {
                boardArr[y][x].classNames.linkBefore = BEFORE_LINK_TOP;
                boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
            }

            if (y == prevY - 1 && x == prevX) {
                boardArr[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM;
                boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
            }

            if (x == prevX + 1 && y == prevY) {
                boardArr[y][x].classNames.linkBefore = BEFORE_LINK_LEFT;
                boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
            }

            if (x == prevX - 1 && y == prevY) {
                boardArr[y][x].classNames.linkBefore = BEFORE_LINK_RIGHT;
                boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
            }
        }
    },


    componentDidMount: function () {
        var newState = {};

        this.addFoundWordsToBoardArr(newState);
        newState.cellSize = this.calculateCellSize();

        this.setState(newState);
    },

    calculateCellSize: function () {
        return Math.min(
                ($('.game-board').width() - this.state.boardData.board.cols) / this.state.boardData.board.cols,
                (this.props.boardMaxHeight - this.state.boardData.board.rows - 5) / this.state.boardData.board.rows
            ) || 0;
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            openedLetters: typeof nextProps.openedLetters == "undefined" ? this.state.openedLetters : nextProps.openedLetters
        })
    },


    onTouchStart: function (e) {
        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        appManager.getSFXManager().playButtonGame();

        var newState = {};

        var currentWordOrFalse = this.checkIfLetterIsInCompleteWord(x, y);
        if (currentWordOrFalse) {
            this.highlightCompletedWord(x, y, currentWordOrFalse, newState)
        } else {
            this.addFirstLetterToSelectedLetters(x, y, newState);
        }

        this.setState(newState);
    },

    onTouchMove: function (e) {
        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        if (!this.checkIfValidLetter(x, y)) {
            return;
        }

        if (this.checkIfLetterIsInCompleteWord(x, y) !== false) {
            return;
        }

        appManager.getSFXManager().playButtonGame();

        var newState = {};

        var selectedLetterIdxOrFalse = this.getIndexIfLetterIsSelected(x, y);
        if (selectedLetterIdxOrFalse !== false) {
            this.removeSelectedLettersAfter(x, y, selectedLetterIdxOrFalse, newState)
        } else {
            this.addLetterToSelectedLetters(x, y, newState);
        }

        this.setState(newState);
    },

    onTouchEnd: function (e) {
        this.preventDefaultOnEvent(e);

        var newState = {};

        this.fadeHighlightedWord(newState);

        var completedWordIdxOrFalse = this.checkForCompletedWord();
        if (completedWordIdxOrFalse !== false) {
            this.openWord(completedWordIdxOrFalse, newState);
            this.setState(newState);

            this.state.removeFromShownWordsIfShown(completedWordIdxOrFalse);

            if (this.checkIfRoundComplete()) {
                this.state.goToPageRoundComplete();
            }
            return;
        }

        appManager.getSFXManager().playButtonGameWrong();

        if (this.checkLettersInWordsToFind()) {
            this.bringUpNotice(SELECT_DIFFERENTLY);
            this.copySelectedLettersToPrevSelectedLetters(newState);
            //emptySelectedLetters called through ref
            return;
        }

        if (this.selectedLettersEqualsPrevSelectedLetters()) {
            this.bringUpNotice(NO_SUCH_WORD);
            this.copySelectedLettersToPrevSelectedLetters(newState);
            //emptySelectedLetters called through ref
            return;
        }

        this.copySelectedLettersToPrevSelectedLetters(newState);
        this.emptySelectedLetters(newState);

        this.setState(newState);
    },

    onTouchCancel: function (e) {
        console.log("cancel");
        this.preventDefaultOnEvent(e);

        appManager.getSFXManager().playButtonGameWrong();

        var newState = {};

        this.fadeHighlightedWord(newState);
        this.emptySelectedLetters(newState);

        this.setState(newState);
    },


    preventDefaultOnEvent: function (e) {
        e.stopPropagation();
        e.preventDefault();
    },

    calcWhichCellIsTouched: function (e) {
        var screenX = e.touches[0].clientX;
        var screenY = e.touches[0].clientY;

        var clientRect = e.currentTarget.getBoundingClientRect();

        var boardX = screenX - clientRect.left;
        var boardY = screenY - clientRect.top;

        var rows = this.state.boardData.board.rows;
        var cols = this.state.boardData.board.cols;

        var boardWidthX = clientRect.width;
        var boardHeightY = clientRect.height;

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


    checkIfValidLetter: function (x, y) {
        var selectedLetters = this.state.selectedLetters.letters;

        if (selectedLetters.length == 0) {
            return false;
        }

        var prevX = selectedLetters[selectedLetters.length - 1].x;
        var prevY = selectedLetters[selectedLetters.length - 1].y;

        if (y == prevY && x == prevX) {
            return false;
        }

        if (this.getIndexIfLetterIsSelected(x, y) !== false) {
            return true;
        }

        return this.checkWhichRules(x, y, prevX, prevY);
    },

    checkWhichRules: function (x, y, prevX, prevY) {
        throw 'BoardAbstract.checkWhichRules not implemented.';
    },


    addFirstLetterToSelectedLetters: function (x, y, newState) {
        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;
        var selectedLetters = newState && newState.selectedLetters ? newState.selectedLetters : this.state.selectedLetters;

        selectedLetters.letters.push(boardArr[y][x]);
        selectedLetters.idx[y + '_' + x] = selectedLetters.letters.length - 1;

        boardArr[y][x].classNames.backgroundColor = this.selectWordBackgroundColor();
        boardArr[y][x].classNames.color = COLOR_SELECTED;
        boardArr[y][x].classNames.linkVisibility = LINK_VISIBLE;

        newState.boardArr = boardArr;
        newState.selectedLetters = selectedLetters;
    },

    addLetterToSelectedLetters: function (x, y, newState) {
        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;
        var selectedLetters = newState && newState.selectedLetters ? newState.selectedLetters : this.state.selectedLetters;

        var previousLetter = selectedLetters.letters[selectedLetters.letters.length - 1];

        //find out which link needs to be attached
        //restrict which letters can be clicked
        var prevX = previousLetter.x;
        var prevY = previousLetter.y;
        var prevColor = previousLetter.classNames.backgroundColor;


        selectedLetters.letters.push(boardArr[y][x]);
        selectedLetters.idx[y + '_' + x] = selectedLetters.letters.length - 1;

        boardArr[y][x].classNames.backgroundColor = prevColor;
        boardArr[y][x].classNames.color = COLOR_SELECTED;
        boardArr[y][x].classNames.linkVisibility = LINK_VISIBLE;

        this.addLinksToSelectedLetter(boardArr, x, y, prevX, prevY);

        newState.boardArr = boardArr;
        newState.selectedLetters = selectedLetters;
    },

    addLinksToSelectedLetter: function (boardArr, x, y, prevX, prevY) {
        if (y == prevY + 1 && x == prevX) {
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_TOP;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
        }

        if (y == prevY - 1 && x == prevX) {
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
        }

        if (x == prevX + 1 && y == prevY) {
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_LEFT;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
        }

        if (x == prevX - 1 && y == prevY) {
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_RIGHT;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
        }
    },

    emptySelectedLetters: function (newState) {
        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;
        var selectedLetters = newState && newState.selectedLetters ? newState.selectedLetters : this.state.selectedLetters;

        for (var i = 0; i < selectedLetters.letters.length; i++) {
            delete boardArr[selectedLetters.letters[i].y][selectedLetters.letters[i].x].classNames.linkBefore;
            delete boardArr[selectedLetters.letters[i].y][selectedLetters.letters[i].x].classNames.linkAfter;
            delete boardArr[selectedLetters.letters[i].y][selectedLetters.letters[i].x].classNames.linkVisibility;
            delete boardArr[selectedLetters.letters[i].y][selectedLetters.letters[i].x].classNames.backgroundColor;
            delete boardArr[selectedLetters.letters[i].y][selectedLetters.letters[i].x].classNames.color;
        }

        if (newState) {
            newState.boardArr = boardArr;
            newState.selectedLetters = {letters: [], idx: {}};
        } else {
            this.setState({
                boardArr: boardArr,
                selectedLetters: {letters: [], idx: {}}
            });
        }
    },

    getIndexIfLetterIsSelected: function (x, y) {
        var selectedIdx = this.state.selectedLetters.idx;

        var key = y + '_' + x;
        if (!selectedIdx.hasOwnProperty(key)) {
            return false;
        }

        return selectedIdx[key];
    },

    removeSelectedLettersAfter: function (x, y, index, newState) {
        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;
        var selectedLetters = newState && newState.selectedLetters ? newState.selectedLetters.letters : this.state.selectedLetters.letters;
        var selectedIdx = newState && newState.selectedLetters ? newState.selectedLetters.idx : this.state.selectedLetters.idx;

        for (var i = index + 1; i < selectedLetters.length; i++) {
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.linkBefore;
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.linkAfter;
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.linkVisibility;
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.backgroundColor;
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.color;
            delete selectedIdx[selectedLetters[i].y + '_' + selectedLetters[i].x];
        }
        delete boardArr[selectedLetters[index].y][selectedLetters[index].x].classNames.linkAfter;

        selectedLetters.splice(index + 1, selectedLetters.length - (index - 1));

        newState.selectedLetters = {letters: selectedLetters, idx: selectedIdx};
    },


    copySelectedLettersToPrevSelectedLetters: function (newState) {
        newState.prevSelectedLetters = newState && newState.selectedLetters ? newState.selectedLetters : this.state.selectedLetters;
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

        for (var i = 0; i < selectedLetters.length; i++) {
            if (selectedLetters[i] != previousSelection[i]) {
                return false;
            }
        }

        return true;
    },

    checkLettersInWordsToFind: function () {
        var words = this.state.boardData.words;
        var selectedLetters = this.state.selectedLetters.letters;

        for (var wordIdx = 0; wordIdx < words.length; wordIdx++) {
            var word = words[wordIdx].letters;
            if (word.length != selectedLetters.length) {
                continue;
            }

            var lettersMatch = true;
            for (var letterIdx = 0; letterIdx < word.length; letterIdx++) {
                if (selectedLetters[letterIdx].letter != word[letterIdx].letter) {
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

    bringUpNotice: function (type) {
        var word = this.state.selectedLetters;
        this.state.displayNotice(type, word);
    },


    howManyCompleteWordsInBoard: function () {
        var board = this.state.board;

        var wordsComplete = 0;
        for (var word in board) {
            if (!board.hasOwnProperty(word)) {
                continue;
            }

            if (board[word].openWord == true) {
                wordsComplete++;
            }
        }

        return wordsComplete;
    },

    checkForCompletedWord: function () {
        var words = this.state.boardData.words;

        var selectedLetters = this.state.selectedLetters.letters;
        if (selectedLetters.length == 0) {
            return false;
        }

        var wordIdx = selectedLetters[0].wordIdx;
        if (words[wordIdx].letters.length != selectedLetters.length) {
            return false;
        }

        for (var i = 0; i < selectedLetters.length; i++) {
            if (wordIdx != selectedLetters[i].wordIdx) {
                return false;
            }

            if (words[wordIdx].letters[i].letter != selectedLetters[i].letter) {
                return false;
            }
        }

        return wordIdx;
    },

    openWord: function (index, newState, backgroundColor) {
        if (typeof backgroundColor == "undefined") {
            backgroundColor = this.selectWordBackgroundColor();
            this.nextColorIdx();
        }

        var board = this.state.board;
        board[index] = {
            color: backgroundColor,
            openWord: true
        };
        this.setBoardGameState(board);

        appManager.getSFXManager().playButtonGameCorrect();

        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;
        var currentWord = this.state.boardData.words[index];

        if (this.state.selectedLetters.letters.length != 0) {
            for (var i = 0; i < currentWord.letters.length; i++) {
                boardArr[currentWord.letters[i].y][currentWord.letters[i].x].classNames.color = COLOR_COMPLETED;
                boardArr[currentWord.letters[i].y][currentWord.letters[i].x].classNames.linkVisibility = LINK_FADE;
            }

            this.setOpenedLettersGameState({});

            newState.boardArr = boardArr;
            newState.selectedLetters = {letters: [], idx: {}};
            newState.board = board;
            newState.openedLetters = {};
        } else {
            this.addLettersInFoundWord(currentWord, backgroundColor, boardArr);

            this.setState({
                boardArr: boardArr,
                board: board
            }, function () {
                for (var i = 0; i < currentWord.letters.length; i++) {
                    boardArr[currentWord.letters[i].y][currentWord.letters[i].x].classNames.linkVisibility = LINK_FADE;
                }
                setTimeout(function () {
                    if (this.isMounted()) {
                        this.setState({
                            boardArr: boardArr
                        })
                    }
                }.bind(this), 200);
            });
        }
    },

    checkIfLetterIsInCompleteWord: function (x, y) {
        var boardArr = this.state.boardArr;
        if (!boardArr || !boardArr[y] || !boardArr[y][x]) {
            return false;
        }
        var completeWordIndex = boardArr[y][x].wordIdx;
        var completeWord = this.state.boardData.words[completeWordIndex].letters;

        if (!this.state.board[completeWordIndex]) {
            return false;
        }

        if (this.state.board[completeWordIndex].openWord === true) {
            return completeWord;
        }

        return false;
    },

    highlightCompletedWord: function (x, y, currentWord, newState) {
        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;

        for (var i = 0; i < currentWord.length; i++) {
            boardArr[currentWord[i].y][currentWord[i].x].classNames.linkVisibility = LINK_VISIBLE;
        }

        newState.boardArr = boardArr;
        newState.highlightedWord = {letters: currentWord};
    },

    fadeHighlightedWord: function (newState) {
        var highlightedWord = this.state.highlightedWord.letters;

        if (highlightedWord == []) {
            return;
        }

        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;

        for (var i = 0; i < highlightedWord.length; i++) {
            boardArr[highlightedWord[i].y][highlightedWord[i].x].classNames.linkVisibility = LINK_FADE;
        }

        newState.boardArr = boardArr;
        newState.highlightedWord = {letters: []};
    },


    selectWordBackgroundColor: function () {
        var backgroundColor = '';
        var backgroundColors = this.state.backgroundColors || [];
        var wordsComplete = this.howManyCompleteWordsInBoard();

        if (this.state.isPracticeRound) {
            //  +1 because word hasn't been added to completedWords yet
            for (var i = 0; i < wordsComplete + 1; i++) {
                backgroundColor = backgroundColors[i % backgroundColors.length];
            }
        } else {
            var colorIdx = appManager.getGameState().getBoardColorIdx();
            backgroundColor = backgroundColors[colorIdx];
        }

        return backgroundColor;
    },

    nextColorIdx: function () {
        var backgroundColors = this.state.backgroundColors || [];
        var colorIdx = appManager.getGameState().getBoardColorIdx();

        colorIdx++;
        if (colorIdx >= backgroundColors.length) {
            colorIdx = colorIdx - backgroundColors.length;
        }

        appManager.getGameState().setBoardColorIdx(colorIdx);
    },


    setBoardGameState: function (board) {
        this.state.setGameStateRoundField('board', board);
    },

    setOpenedLettersGameState: function (openedLetters) {
        this.state.setGameStateRoundField('openedLetters', openedLetters);
    },

    checkIfRoundComplete: function () {
        var boardLength = Utils.countObjectProperties(this.state.board);
        return boardLength == this.state.boardData.words.length;
    },


    getBoard: function () {
        return this.state.board;
    },

    getBoardArr: function () {
        return this.state.boardArr;
    },

    setBoardArr: function (boardArr) {
        this.setState({boardArr: boardArr})
    },

    getOpenedLetters: function () {
        return this.state.openedLetters;
    },

    removeOpenLetterLinksInSelectedLetters: function (cellClassNames) {
        var filteredCellClassNames = JSON.parse(JSON.stringify(cellClassNames));

        if (filteredCellClassNames.openLetter == OPEN_LETTER_COLOR && filteredCellClassNames.color == COLOR_SELECTED) {
            delete filteredCellClassNames.openLetterLinkAfter;
            delete filteredCellClassNames.openLetterLinkBefore;
        }

        return filteredCellClassNames;
    },

    render: function () {

        //console.log({prevSelectedLetters: this.state.prevSelectedLetters});
        //console.log({stateBoard: this.state.board});
        //console.log({wordsToFind: this.state.wordsToFind});
        //console.log({boardArr: this.state.boardArr});
        //console.log({selectedLetters: this.state.selectedLetters});

        var boardArr = this.state.boardArr;
        var boardStyle = {
            fontSize: (this.state.cellSize / 2) + "px"
        };

        return (
            <div className={classNames("game-board", this.state.boardExtraClass, this.state.boardType)}>
                <table ref="board"
                       className="board"
                       onTouchStart={this.onTouchStart}
                       onTouchMove={this.onTouchMove}
                       onTouchEnd={this.onTouchEnd}
                       onTouchCancel={this.onTouchCancel}
                       style={boardStyle}>

                    {boardArr.map(function (row, rowId) {
                        return (
                            <tr key={rowId}>

                                {row.map(function (cell, cellId) {

                                    var filteredCellClassNames = this.removeOpenLetterLinksInSelectedLetters(cell.classNames);
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
                                        <module.exports.Letter key={rowId + '_' + cellId}
                                                               classNames={letterClassNames}
                                                               cellSize={this.state.cellSize}>
                                            {cell.letter}
                                        </module.exports.Letter>
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
module.exports.BoardAbstract = React.createClass(BoardAbstractClass);
module.exports.BoardAbstract.Class = BoardAbstractClass;