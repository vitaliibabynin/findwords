"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');


module.exports = {};


var LINK_TOP = "link-top";
var LINK_RIGHT = "link-right";
var LINK_BOTTOM = "link-bottom";
var LINK_LEFT = "link-left";


var LetterClass = Object.assign({}, {}, {

    propTypes: {
        x: React.PropTypes.number,
        y: React.PropTypes.number,
        addSelectedLetter: React.PropTypes.func,
        removeSelectedLetter: React.PropTypes.func,
        classNameLetter: React.PropTypes.string
    },

    getInitialState: function () {
        var state = {
            x: this.props.x || 0,
            y: this.props.y || 0,
            addSelectedLetter: this.props.addSelectedLetter || function () {
            },
            removeSelectedLetter: this.props.removeSelectedLetter || function () {
            },
            classNameLetter: this.props.classNameLetter || ""
        };
        return state;
    },

    componentWillReceiveProps: function (nextProps) {

        this.setState({
            addSelectedLetter: nextProps.addSelectedLetter || function () {
            },
            removeSelectedLetter: nextProps.removeSelectedLetter || function () {
            },
            classNameLetter: nextProps.classNameLetter || ""
        });

    },

    onClick: function () {

        var x = this.state.x;
        var y = this.state.y;

        if (this.props.removeSelectedLetter(x, y)) {
            return;
        }

        if (!this.props.addSelectedLetter(x, y)) {
            return;
        }

    },

    render: function () {

        var letterClassName = classNames(
            this.state.classNameLetter
        );

        return (
            <td className={letterClassName} onClick={this.onClick}>
                {this.props.children}
            </td>
        );
    }

});
var Letter = React.createClass(LetterClass);


var BoardClass = Object.assign({}, {}, {

    getInitialState: function () {
        var state = {
            board: {
                rows: 3,
                cols: 3,
                words: [
                    {
                        letters: [
                            {x: 0, y: 0, letter: "a1"},
                            {x: 1, y: 0, letter: "a2"},
                            {x: 2, y: 0, letter: "a3"},
                            {x: 2, y: 1, letter: "a4"},
                            {x: 2, y: 2, letter: "a5"}
                        ]
                    },
                    {
                        letters: [
                            {x: 0, y: 1, letter: "b1"},
                            {x: 1, y: 1, letter: "b2"},
                            {x: 1, y: 2, letter: "b3"},
                            {x: 0, y: 2, letter: "b4"}
                        ]
                    }
                ]
            },
            selectedLetters: []
        };
        return state;
    },

    checkIfLetterIsSelected: function (x, y) {

        var result = false;
        this.state.selectedLetters.map(function (selectedLetter, selectedLetterIndex) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                result = true;
            }
        });

        return result;
    },

    getSelectedLetterIndex: function (x, y) {

        var index = 'undefined';
        this.state.selectedLetters.map(function (selectedLetter, slIndex) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                index = slIndex;
            }
        });

        if (index == 'undefined') {
            return false;
        }

        return index;

    },

    addSelectedLetter: function (x, y) {

        if (x == 'undefined' || y == 'undefined') {
            return false;
        }

        if (this.checkIfLetterIsSelected(x, y)) {
            return false;
        }

        var updatedLetters = this.state.selectedLetters.slice();

        //check if there is a previous letter
        if (this.state.selectedLetters.length == 0) {
            updatedLetters.push([x, y, '']);
            this.setState({selectedLetters: updatedLetters});
            return true;
        }

        var previousLetter = updatedLetters[this.state.selectedLetters.length - 1];

        //find out which link needs to be attached
        var lastX = previousLetter[0];
        var lastY = previousLetter[1];

        if (x == lastX + 1) {
            updatedLetters.push([x, y, LINK_TOP]);
            previousLetter.push(LINK_BOTTOM);
        }

        if (x == lastX - 1) {
            updatedLetters.push([x, y, LINK_BOTTOM]);
            previousLetter.push(LINK_TOP);
        }

        if (y == lastY + 1) {
            updatedLetters.push([x, y, LINK_LEFT]);
            previousLetter.push(LINK_RIGHT);
        }

        if (y == lastY - 1) {
            updatedLetters.push([x, y, LINK_RIGHT]);
            previousLetter.push(LINK_LEFT);
        }

        this.setState({selectedLetters: updatedLetters});

        return true;

    },

    removeSelectedLetter: function (x, y) {

        if (x == 'undefined' || y == 'undefined') {
            return false;
        }

        if (!this.checkIfLetterIsSelected(x, y)) {
            return false;
        }

        if (!this.getSelectedLetterIndex(x, y)) {
            return false;
        }

        var index = this.getSelectedLetterIndex(x, y);

        var updatedLetters = this.state.selectedLetters.slice();
        updatedLetters[index - 1][3] = '';
        updatedLetters.splice(index, this.state.selectedLetters.length - index);
        this.setState({
            selectedLetters: updatedLetters
        });

        return true;

    },

    selectedLetterLinks: function (x, y) {

        if (!this.getSelectedLetterIndex(x, y)) {
            return false;
        }

        var index = this.getSelectedLetterIndex(x, y);

        return [this.state.selectedLetters[index][2], this.state.selectedLetters[index][3]];

    },

    boardConverter: function () {

        var arr = new Array(this.state.board.rows);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.state.board.cols);
        }

        this.state.board.words.map(function (word) {

            word.letters.map(function (letter) {

                arr[letter.x][letter.y] = letter.letter;

            })

        });

        return arr;

    },

    render: function () {

        console.log(this.state.selectedLetters);

        var initialBoard = this.boardConverter();
        //var initialBoard = [
        //    ['н', 'а', 'у', 'ш', 'н', 'и', 'к', 'c'],
        //    ['а', 'н', 'т', 'и', 'к', 'а', 'и', 'а'],
        //    ['м', 'о', 'р', 'г', 'л', 'а', 'м', 'н'],
        //    ['п', 'а', 'к', 'в', 'о', 'л', 'у', 'а'],
        //    ['у', 'л', 'к', 'к', 'о', 'а', 'р', 'н'],
        //    ['к', 'я', 'л', 'б', 'л', 'н', 'г', 'а'],
        //    ['а', 'в', 'о', 'а', 'с', 'а', 'а', 'к'],
        //    ['п', 'с', 'у', 'л', 'а', 'б', 'у', 'л']
        //];

        return (

            <table className="board">

                {initialBoard.map(function (row, rowId) {

                    return (

                        <tr key={rowId}>

                            {row.map(function (cell, cellId) {

                                var boardClassName = classNames(
                                    {"selected": this.checkIfLetterIsSelected(rowId, cellId)},
                                    this.selectedLetterLinks(rowId, cellId)
                                );

                                return (

                                    <Letter key={rowId + '_' + cellId} x={rowId} y={cellId}
                                            classNameLetter={boardClassName}
                                            addSelectedLetter={this.addSelectedLetter}
                                            removeSelectedLetter={this.removeSelectedLetter}>
                                        {cell}
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