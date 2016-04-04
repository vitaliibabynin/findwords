"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;


module.exports = {};

var GameControlClass = Object.assign({}, {}, {
    displayName: 'GameControl',

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
        setGameStateRoundField: React.PropTypes.func,
        goToPageRoundComplete: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            boardMaxHeight: this.props.boardMaxHeight || 0,
            boardData: this.props.boardData || {},
            board: this.props.board || {},
            setGameStateRoundField: this.props.setGameStateRoundField || function () {
            },
            goToPageRoundComplete: this.props.goToPageRoundComplete || function () {
            }
        };

        return state;
    },

    render: function () {

        return (
            <BoardType1
                boardMaxHeight={this.state.boardMaxHeight}
                boardData={this.state.boardData}
                board={this.state.board}
                goToPageRoundComplete={this.goToPageRoundComplete}
            />
        );

    }

});
module.exports.GameControl = React.createClass(GameControlClass);
module.exports.GameControl.Class = GameControlClass;


var COLOR_SELECTED = "selected";


//var BoardAbstractClass = Object.assign({}, {}, {});
//var BoardAbstract = React.createClass(BoardAbstractClass);


var BoardA1Class = Object.assign({}, {}, {

    displayName: 'BoardA1',

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
        isPracticeRound: React.PropTypes.bool,
        goToPageRoundComplete: React.PropTypes.func
    },


    getInitialState: function () {
        var state = {
            //for centering
            boardExtraClass: [],

            //gameData
            boardData: this.props.boardData || {},

            //gameState
            board: this.props.board || {},

            selectedLetters: {letters: [], idx: {}},

            //highlights completed word when clicked
            highlightedWord: {letters: []},

            //used to choose word background colors
            isPracticeRound: typeof this.props.isPracticeRound == "undefined" ? false : this.props.isPracticeRound,

            goToPageRoundComplete: this.props.goToPageRoundComplete || function () {
            }
        };

        //data adapted for render
        state.boardArr = this.boardConverter(state.boardData);

        //array of words
        state.wordsToFind = this.extractWordsToFind(state.boardData);

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
                    idx: letter.x + "_" + letter.y,
                    x: letter.x,
                    y: letter.y,
                    content: letter.letter,
                    wordIdx: wordIdx,
                    letterIdxInWord: letterIdx,
                    classNames: {}
                };
            })
        });

        return arr;
    },

    extractWordsToFind: function (boardData) {
        var wordsToFind = {words: []};

        boardData.words.map(function (word, wordIndex) {
            wordsToFind.words[wordIndex] = {letters: word.letters};
        });

        return wordsToFind;
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


    componentDidMount: function () {
        this.setState({
            cellSize: Math.min(
                ($('.game-board').width() - this.state.boardData.board.cols) / this.state.boardData.board.cols,
                (this.props.boardMaxHeight - this.state.boardData.board.rows - 5) / this.state.boardData.board.rows
            ) || 0
        });
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

        this.addFirstLetterToSelectedLetters(x, y, newState);

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

        appManager.getSFXManager().playButtonGame();

        var newState = {};

        var indexOrFalse = this.getIndexIfLetterIsSelected(x, y);
        if (indexOrFalse !== false) {
            this.removeSelectedLettersAfter(x, y, indexOrFalse, newState)
        } else {
            this.addLetterToSelectedLetters(x, y, newState);
        }

        this.setState(newState);
    },

    onTouchEnd: function (e) {
        this.preventDefaultOnEvent(e);

        appManager.getSFXManager().playButtonGameWrong();

        var newState = {};

        this.emptySelectedLetters(newState);

        this.setState(newState);
    },

    onTouchCancel: function (e) {
        console.log("cancel");

        this.preventDefaultOnEvent(e);

        appManager.getSFXManager().playButtonGameWrong();

        var newState = {};

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

    addFirstLetterToSelectedLetters: function (x, y, newState) {
        var boardArr = newState && newState.boardArr ? newState.boardArr : this.state.boardArr;
        var selectedLetters = newState && newState.selectedLetters ? newState.selectedLetters : this.state.selectedLetters;

        selectedLetters.letters.push(boardArr[y][x]);
        selectedLetters.idx[y + '_' + x] = selectedLetters.letters.length - 1;

        boardArr[y][x].classNames.backgroundColor = this.selectWordBackgroundColor();
        boardArr[y][x].classNames.color = COLOR_SELECTED;

        newState.boardArr = boardArr;
        newState.selectedLetters = selectedLetters;
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

    emptySelectedLetters: function (newState) {
        var boardArr = this.state.boardArr;
        var selectedLetters = this.state.selectedLetters.letters;

        for (var i = 0; i < selectedLetters.length; i++) {
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.backgroundColor;
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.color;
        }

        newState.boardArr = boardArr;
        newState.selectedLetters = {letters: [], idx: {}};
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

        //return this.checkWhichRules1(x, y, prevX, prevY);
        return this.checkWhichRules2(x, y, prevX, prevY);
    },

    checkWhichRules1: function (x, y, prevX, prevY) {
        if (y == prevY + 1 && x == prevX) {
            return true;
        }
        if (y == prevY - 1 && x == prevX) {
            return true;
        }
        if (x == prevX + 1 && y == prevY) {
            return true;
        }
        if (x == prevX - 1 && y == prevY) {
            return true;
        }

        return false;
    },

    checkWhichRules2: function (x, y, prevX, prevY) {
        return (Math.abs(x - prevX) <= 1 && Math.abs(y - prevY) <= 1);
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

        //if (y == prevY + 1 && x == prevX) {
        //    boardArr[y][x].classNames.backgroundColor = prevColor;
        //    boardArr[y][x].classNames.color = COLOR_SELECTED;
        //}
        //
        //if (y == prevY - 1 && x == prevX) {
        //    boardArr[y][x].classNames.backgroundColor = prevColor;
        //    boardArr[y][x].classNames.color = COLOR_SELECTED;
        //}
        //
        //if (x == prevX + 1 && y == prevY) {
        //    boardArr[y][x].classNames.backgroundColor = prevColor;
        //    boardArr[y][x].classNames.color = COLOR_SELECTED;
        //}
        //
        //if (x == prevX - 1 && y == prevY) {
        //    boardArr[y][x].classNames.backgroundColor = prevColor;
        //    boardArr[y][x].classNames.color = COLOR_SELECTED;
        //}

        newState.boardArr = boardArr;
        newState.selectedLetters = selectedLetters;
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
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.backgroundColor;
            delete boardArr[selectedLetters[i].y][selectedLetters[i].x].classNames.color;
            delete selectedIdx[selectedLetters[i].y + '_' + selectedLetters[i].x];
        }

        selectedLetters.splice(index + 1, selectedLetters.length - (index - 1));

        newState.selectedLetters = {letters: selectedLetters, idx: selectedIdx};
    },


    render: function () {

        var boardArr = this.state.boardArr;
        var boardStyle = {
            fontSize: (this.state.cellSize / 2) + "px"
        };

        return (
            <div className={classNames("game-board", this.state.boardExtraClass)}>
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

                                    var properties = [];
                                    for (var property in cell.classNames) {
                                        if (!cell.classNames.hasOwnProperty(property)) {
                                            continue;
                                        }
                                        properties.push(cell.classNames[property]);
                                    }
                                    var letterClassNames = classNames(properties);

                                    return (
                                        <Letter key={rowId + '_' + cellId}
                                                classNames={letterClassNames}
                                                cellSize={this.state.cellSize}>
                                            {cell.letterIdxInWord}
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
var BoardA1 = React.createClass(BoardA1Class);
module.exports.BoardA1 = BoardA1;
module.exports.BoardA1.Class = BoardA1Class;


var LetterClass = Object.assign({}, {}, {
    mixins: [PureRenderMixin],
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