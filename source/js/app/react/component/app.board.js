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
            completedWords: []
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

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        //check if letter is in completed word

        selectedLetters.push(board[y][x]);
        board[y][x].classNames.backgroundColor = this.selectWordBackgroundColor();
        board[y][x].classNames.color = COLOR_SELECTED;

        this.setState({
            board: board,
            selectedLetters: selectedLetters
        });

    },

    onTouchMove: function (e) {

        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        //check if different letter
        if (selectedLetters.length == 0) {
            return;
        }
        if (y == selectedLetters[selectedLetters.length - 1].y && x == selectedLetters[selectedLetters.length - 1].x) {
            return;
        }

        var letterSelected = false;
        var index = 0;
        selectedLetters.map(function (letter, letterIndex) {
            if (y == letter.y && x == letter.x) {
                letterSelected = true;
                index = letterIndex;
            }
        });

        if (letterSelected) {
            return;
        }

        //add letter
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

    onTouchEnd: function (e) {

        this.preventDefaultOnEvent(e);

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        if (this.checkForCompletedWord()) {

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

            return;

        }

        selectedLetters.map(function (letter) {
            for (var property in board[letter.y][letter.x].classNames) {
                delete board[letter.y][letter.x].classNames[property];
            }
        });

        this.setState({
            board: board,
            selectedLetters: []
        });

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

    selectWordBackgroundColor: function () {

        return "backgroundColor10";

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





        //var completeWord = this.state.selectedLetters.slice();
        //var wordBackgroundColor = this.selectWordBackgroundColor();
        //
        //for (var i = 0; i < completeWord.length; i++) {
        //    completeWord[i][2].classNames.backgroundColor = wordBackgroundColor;
        //    completeWord[i][2].classNames.inCompleteWord = "complete";
        //    completeWord[i][2].classNames.fade = "fade";
        //    delete completeWord[i][2].classNames.isSelected;
        //}
        //
        //var completedWords = this.state.completedWords.slice();
        //completedWords.push(completeWord);
        //
        //this.setState({
        //    selectedLetters: [],
        //    completedWords: completedWords
        //});

    },


    render: function () {

        console.log(this.state.completedWords);

        var boardArr = this.state.board;
        //console.log(boardArr);
        //console.log(this.state.selectedLetters);

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