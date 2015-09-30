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

        var state = {
            classNames: this.props.classNames || "",
            cellSize: this.props.cellSize || 0
        };

        return state;

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

        var state = {
            boardData: this.props.boardData.rounds[0] || {},
            cellSize: 0,
            board: [],
            selectedLetters: []
        };

        return state;

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

                arr[letter.x][letter.y] = {
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
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        var board = this.state.board;

        //check if in complete word

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (i == x && j == y) {
                    board[i][j].classNames.backgroundColor = "backgroundColor1";
                    board[i][j].classNames.color = "selected";
                    this.state.selectedLetters.push([board[x][y]]);
                }
            }
        }

        this.setState({board: board});

    },

    onTouchMove: function (e) {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (i == x && j == y) {
                    for (var s = 0; s < selectedLetters.length; s++) {
                        if (x != selectedLetters[s].x && y != selectedLetters[s].y) {
                            board[i][j].classNames.backgroundColor = "backgroundColor1";
                            board[i][j].classNames.color = "selected";
                            this.state.selectedLetters.push([board[x][y]]);
                        }
                    }
                }
            }
        }

    },

    onTouchEnd: function (e) {

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

        var y = Math.floor(boardX / cellWidthX);
        var x = Math.floor(boardY / cellHeightY);

        return {x: x, y: y};

    },


    render: function () {

        var boardArr = this.state.board;
        //console.log(boardArr);
        console.log(this.state.selectedLetters);

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

                                var letterClassNames = classNames(
                                    cell.classNames.backgroundColor,
                                    cell.classNames.color
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