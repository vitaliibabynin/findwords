"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');


module.exports = {};


var LetterClass = Object.assign({}, {}, {

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

        var letterStyle = {
            height: this.state.cellSize + "px",
            width: this.state.cellSize + "px"
        };

        return (
            <td className={this.state.classNames}
                style={letterStyle}>
                <span>{this.props.children}</span>
            </td>
        );

    }

});
var Letter = React.createClass(LetterClass);


var BOARD_MARGIN = 40;
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
var OPEN_LETTER = "open-letter";


var BoardClass = Object.assign({}, {}, {

    propTypes: {
        boardData: React.PropTypes.shape({
            backgroundColor: React.PropTypes.string,
            name: React.PropTypes.shape({
                en: React.PropTypes.string,
                ru: React.PropTypes.string
            }),
            numberOfRoundsRequired: React.PropTypes.number,
            rounds: React.PropTypes.arrayOf(React.PropTypes.object)
        })
    },

    getInitialState: function () {

        return {
            boardData: this.props.boardData.rounds[0] || {},
            cellSize: 0,
            board: [],
            selectedLetters: [],
            completedWords: [],
            highlightedWord: [],
            openedLetters: []
        };

    },

    componentDidMount: function () {

        this.setState({
            board: this.boardConverter() || {},
            cellSize: ($('.page-content').width() - BOARD_MARGIN) / this.state.boardData.cols || 0
        })

    },

    boardConverter: function () {

        var arr = new Array(this.state.boardData.rows);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.state.boardData.cols);
        }

        this.state.boardData.words.map(function (word) {

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

        if (this.checkIfLetterIsInCompleteWord(x, y)) {
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

        if (this.checkForCompletedWord()) {
            this.moveSelectedLettersToCompleteWords();
            return;
        }

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

    highlightCompletedWord: function (x, y) {

        var board = this.state.board;
        var wordAlreadyCompleted = false;

        var currentWord = this.checkIfLetterIsInCompleteWord(x, y);
        if (currentWord !== false) {

            currentWord.map(function (letter) {
                board[letter.y][letter.x].classNames.linkVisibility = LINK_VISIBLE;
            });

            this.setState({highlightedWord: currentWord});

            wordAlreadyCompleted = true;

        }

        return wordAlreadyCompleted;

    },

    fadeHighlightedWord: function () {

        var highlightedWord = this.state.highlightedWord;

        if (highlightedWord != []) {

            var board = this.state.board;

            highlightedWord.map(function (letter) {
                board[letter.y][letter.x].classNames.linkVisibility = LINK_FADE;
            });

            this.setState({highlightedWord: []});

        }

    },

    checkIfLetterIsInCompleteWord: function (x, y) {

        var result = false;

        this.state.completedWords.map(function (completedWord) {
            completedWord.map(function (letterInCompletedWord, idx, word) {
                if (letterInCompletedWord.x == x && letterInCompletedWord.y == y) {
                    result = word;
                }
            });
        });

        return result;

    },

    checkIfDifferentLetter: function (x, y) {

        var selectedLetters = this.state.selectedLetters;

        if (selectedLetters.length == 0) {
            return false;
        }

        return !(y == selectedLetters[selectedLetters.length - 1].y && x == selectedLetters[selectedLetters.length - 1].x);

    },

    addFirstLetterToSelectedLetters: function (x, y) {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        selectedLetters.push(board[y][x]);
        board[y][x].classNames.backgroundColor = this.selectWordBackgroundColor();
        board[y][x].classNames.color = COLOR_SELECTED;
        board[y][x].classNames.linkVisibility = LINK_VISIBLE;

        this.setState({
            board: board,
            selectedLetters: selectedLetters
        });

    },

    getIndexIfLetterIsSelected: function (x, y) {

        var selectedLetters = this.state.selectedLetters;

        var index = false;
        selectedLetters.map(function (letter, letterIndex) {
            if (y == letter.y && x == letter.x) {
                index = letterIndex;
            }
        });

        return index;

    },

    removeSelectedLettersAfter: function (x, y) {

        var lettersRemoved = false;

        var index = this.getIndexIfLetterIsSelected(x, y);
        if (index !== false) {

            var board = this.state.board;
            var selectedLetters = this.state.selectedLetters;

            for (var i = index + 1; i < selectedLetters.length; i++) {
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.linkBefore;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.linkAfter;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.linkVisibility;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.backgroundColor;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.color;
            }

            delete board[selectedLetters[index].y][selectedLetters[index].x].classNames.linkAfter;

            selectedLetters.splice(index + 1, selectedLetters.length - (index - 1));

            this.setState({selectedLetters: selectedLetters});

            lettersRemoved = true;

        }

        return lettersRemoved;

    },

    addLetterToSelectedLetters: function (x, y) {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        var previousLetter = selectedLetters[selectedLetters.length - 1];

        //find out which link needs to be attached
        //restrict which letters can be clicked
        var prevX = previousLetter.x;
        var prevY = previousLetter.y;
        var prevColor = previousLetter.classNames.backgroundColor;

        if (y == prevY + 1 && x == prevX) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames = {
                linkBefore: BEFORE_LINK_TOP,
                linkVisibility: LINK_VISIBLE,
                backgroundColor: prevColor,
                color: COLOR_SELECTED
            };
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
        }

        if (y == prevY - 1 && x == prevX) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames = {
                linkBefore: BEFORE_LINK_BOTTOM,
                linkVisibility: LINK_VISIBLE,
                backgroundColor: prevColor,
                color: COLOR_SELECTED
            };
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
        }

        if (x == prevX + 1 && y == prevY) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames = {
                linkBefore: BEFORE_LINK_LEFT,
                linkVisibility: LINK_VISIBLE,
                backgroundColor: prevColor,
                color: COLOR_SELECTED
            };
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
        }

        if (x == prevX - 1 && y == prevY) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames = {
                linkBefore: BEFORE_LINK_RIGHT,
                linkVisibility: LINK_VISIBLE,
                backgroundColor: prevColor,
                color: COLOR_SELECTED
            };
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
        }

        this.setState({
            board: board,
            selectedLetters: selectedLetters
        });

    },

    selectWordBackgroundColor: function () {

        var backgroundColor = '';
        var wordsComplete = this.state.completedWords.length;

        var backgroundColors = [
            "backgroundColor1",
            "backgroundColor2",
            "backgroundColor3",
            "backgroundColor4",
            "backgroundColor5",
            "backgroundColor6",
            "backgroundColor7",
            "backgroundColor8",
            "backgroundColor9",
            "backgroundColor10"
        ];

        //  +1 because word hasn't been added to completedWords yet
        for (var i = 0; i < wordsComplete + 1; i++) {
            backgroundColor = backgroundColors[i % backgroundColors.length];
        }

        return backgroundColor;

    },

    checkForCompletedWord: function () {

        var words = this.state.boardData.words;
        var selectedLetters = this.state.selectedLetters;

        var mainResult = false;

        words.map(function (word) {

            if (word.letters.length == selectedLetters.length) {

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

            }
        });

        return mainResult;

    },

    moveSelectedLettersToCompleteWords: function () {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        selectedLetters.map(function (letter) {
            board[letter.y][letter.x].classNames.color = COLOR_COMPLETED;
            board[letter.y][letter.x].classNames.linkVisibility = LINK_FADE;
        });

        var completedWords = this.state.completedWords;
        completedWords.push(selectedLetters);

        this.setState({
            board: board,
            selectedLetters: [],
            completedWords: completedWords
        });

    },

    emptySelectedLetters: function () {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        selectedLetters.map(function (letter) {
            delete board[letter.y][letter.x].classNames.linkBefore;
            delete board[letter.y][letter.x].classNames.linkAfter;
            delete board[letter.y][letter.x].classNames.linkVisibility;
            delete board[letter.y][letter.x].classNames.backgroundColor;
            delete board[letter.y][letter.x].classNames.color;
        });

        this.setState({
            board: board,
            selectedLetters: []
        });

    },


    openWord: function () {

        var unopenedWord = this.getUnopenedWord();

    },

    openLetter: function () {

        var board = this.state.board;
        var openedLetters = this.state.openedLetters;
        var unopenedWord = this.getUnopenedWord();

        if (openedLetters.length == 0) {
            var LetterToOpen = unopenedWord[0];
            board[letterToOpen.y][letterToOpen.x].classNames.openLetter = OPEN_LETTER;

            this.setState({openedLetters: [letterToOpen]});
            return;
        }

        //var letterToOpen = unopenedWord[openedLetters.length];
        //var previousLetter = openedLetters[openedLetters.length - 1];
        //
        //console.log(previousLetter);
        //
        ////find out which link needs to be attached
        ////restrict which letters can be clicked
        //var prevX = previousLetter.x;
        //var prevY = previousLetter.y;
        //
        //if (y == prevY + 1 && x == prevX) {
        //    openedLetters.push(board[y][x]);
        //    board[y][x].classNames = {
        //        linkBefore: BEFORE_LINK_TOP,
        //        linkVisibility: LINK_VISIBLE,
        //        backgroundColor: prevColor,
        //        color: COLOR_SELECTED
        //    };
        //    board[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
        //}
        //
        //if (y == prevY - 1 && x == prevX) {
        //    selectedLetters.push(board[y][x]);
        //    board[y][x].classNames = {
        //        linkBefore: BEFORE_LINK_BOTTOM,
        //        linkVisibility: LINK_VISIBLE,
        //        backgroundColor: prevColor,
        //        color: COLOR_SELECTED
        //    };
        //    board[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
        //}
        //
        //if (x == prevX + 1 && y == prevY) {
        //    selectedLetters.push(board[y][x]);
        //    board[y][x].classNames = {
        //        linkBefore: BEFORE_LINK_LEFT,
        //        linkVisibility: LINK_VISIBLE,
        //        backgroundColor: prevColor,
        //        color: COLOR_SELECTED
        //    };
        //    board[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
        //}
        //
        //if (x == prevX - 1 && y == prevY) {
        //    selectedLetters.push(board[y][x]);
        //    board[y][x].classNames = {
        //        linkBefore: BEFORE_LINK_RIGHT,
        //        linkVisibility: LINK_VISIBLE,
        //        backgroundColor: prevColor,
        //        color: COLOR_SELECTED
        //    };
        //    board[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
        //}
        //
        //this.setState({
        //    board: board,
        //    selectedLetters: selectedLetters
        //});


    },

    showWord: function () {

        var unopenedWord = this.getUnopenedWord();
        //console.log(unopenedWord);

    },

    getUnopenedWord: function () {

        var words = this.state.boardData.words;
        var completedWords = this.state.completedWords;
        var unopenedWord = [];

        if (completedWords.length == 0) {
            unopenedWord.push(words[0].letters[0]);
        }

        return unopenedWord;

    },


    render: function () {

        //console.log(this.state.completedWords);
        //console.log(this.state.selectedLetters);
        console.log(this.state.openedLetters);

        var boardArr = this.state.board;
        //console.log(boardArr);

        var boardStyle = {
            fontSize: (this.state.cellSize / 2) + "px"
        };

        return (

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

        );
    }

});
module.exports.Board = React.createClass(BoardClass);
module.exports.Board.Class = BoardClass;