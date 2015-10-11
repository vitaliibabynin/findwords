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
//var COLOR_SELECTED = "selected";
//var COLOR_COMPLETED = "completed";
//var LINK_VISIBLE = "visible";
//var LINK_FADE = "fade";
//var BEFORE_LINK_TOP = "before-link-top";
//var BEFORE_LINK_RIGHT = "before-link-right";
//var BEFORE_LINK_BOTTOM = "before-link-bottom";
//var BEFORE_LINK_LEFT = "before-link-left";
//var AFTER_LINK_TOP = "after-link-top";
//var AFTER_LINK_RIGHT = "after-link-right";
//var AFTER_LINK_BOTTOM = "after-link-bottom";
//var AFTER_LINK_LEFT = "after-link-left";
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

    onTouchStart: function () {

    },

    onTouchMove: function () {

    },

    onTouchEnd: function () {

    },

    render: function () {
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