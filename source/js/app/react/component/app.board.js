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
            width: this.state.cellSize + "px"
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


var BOARD_MARGIN = 50;
var COLOR_SELECTED = "selected";
var COLOR_COMPLETED = "completed";
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
//var OPEN_LETTER_COLOR = "open-letter";
//var OPEN_LETTER_BEFORE_LINK_TOP = "open-letter-before-link-top";
//var OPEN_LETTER_BEFORE_LINK_RIGHT = "open-letter-before-link-right";
//var OPEN_LETTER_BEFORE_LINK_BOTTOM = "open-letter-before-link-bottom";
//var OPEN_LETTER_BEFORE_LINK_LEFT = "open-letter-before-link-left";
//var OPEN_LETTER_AFTER_LINK_TOP = "open-letter-after-link-top";
//var OPEN_LETTER_AFTER_LINK_RIGHT = "open-letter-after-link-right";
//var OPEN_LETTER_AFTER_LINK_BOTTOM = "open-letter-after-link-bottom";
//var OPEN_LETTER_AFTER_LINK_LEFT = "open-letter-after-link-left";

var BoardClass = Object.assign({}, {}, {

    displayName: 'Board',

    propTypes: {
        roundsBundleIdx: React.PropTypes.number,
        roundIdx: React.PropTypes.number,
        boardData: React.PropTypes.shape({
            backgroundColor: React.PropTypes.string,
            name: React.PropTypes.shape({
                en: React.PropTypes.string,
                ru: React.PropTypes.string
            }),
            numberOfRoundsRequired: React.PropTypes.number,
            rounds: React.PropTypes.arrayOf(React.PropTypes.object)
        }),
        displayNotice: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            roundsBundleIdx: this.props.roundsBundleIdx || 0,
            roundIdx: this.props.roundIdx || 0,
            board: {
                0: {
                    color: '#000000',
                    openWord: true
                },
                2: {
                    color: '#000000',
                    openWord: false
                }
            },
            selectedLetters: {letters: []},
            openedLetters: [{x: 0, y: 1}, {x: 4, y: 3}],
            shownWords: [0],
            displayNotice: this.props.displayNotice || function () {
            }
        };
        state.boardData = this.props.boardData.rounds[state.roundIdx] || {};
        state.boardArr = this.boardConverter(state.boardData);
        state.wordsToFind = this.extractWordsToFind(state.boardData);
        return state;
    },

    componentDidMount: function () {
        this.setState({
            cellSize: ($('.page-content').width() - BOARD_MARGIN) / this.state.boardData.cols || 0
        })
    },

    boardConverter: function (boardData) {
        var arr = new Array(boardData.rows);
        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(boardData.cols);
        }
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
            wordsToFind.words[wordIndex] = {word: "", letters: word.letters};
            word.letters.map(function (letter) {
                wordsToFind.words[wordIndex].word += letter.letter;
            });
        });

        return wordsToFind;
    },


    onTouchStart: function (e) {
        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

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

        if (this.removeSelectedLettersAfter(x, y)) {
            return;
        }

        this.addLetterToSelectedLetters(x, y);
    },

    onTouchEnd: function (e) {
        this.preventDefaultOnEvent(e);

        if (this.checkForCompletedWord()) {
            return;
        }

        this.emptySelectedLetters();
    },

    onTouchCancel: function () {
        this.preventDefaultOnEvent(e);
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

        var rows = this.state.boardData.rows;
        var cols = this.state.boardData.cols;

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
        return "backgroundColor1"
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

        var index = false;
        selectedLetters.map(function (letter, letterIndex) {
            if (y == letter.y && x == letter.x) {
                index = letterIndex;
            }
        });

        return index;

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

        var mainResult = false;
        words.map(function (word) {
            if (word.letters.length != selectedLetters.length) {
                return false;
            }

            var result = true;
            word.letters.map(function (letter, letterIndex) {
                if (selectedLetters[letterIndex].letter != letter.letter) {
                    result = false;
                }

                var resultCell = false;
                selectedLetters.map(function (selectedLetter) {
                    if (selectedLetter.x == letter.x && selectedLetter.y == letter.y) {
                        resultCell = true;
                    }
                });

                if (!resultCell) {
                    result = false;
                }
            });

            if (result) {
                mainResult = true;
            }
        });

        return mainResult;
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


    render: function () {

        console.log(this.state.selectedLetters);
        console.log(this.state.wordsToFind);

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
                       style={boardStyle}>

                    {boardArr.map(function (row, rowId) {
                        return (
                            <tr key={rowId}>

                                {row.map(function (cell, cellId) {
                                    var properties = [];
                                    for (var property in cell.classNames) {
                                        properties.push(cell.classNames[property])
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