"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');


module.exports = {};


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
            isActive: false
        };
        return state;
    },

    onClick: function () {

        var x = this.state.x;
        var y = this.state.y;

        if (this.state.isActive) {
            if (this.props.removeSelectedLetter(x, y)) {
                this.setState({isActive: false});
            }
        }

        if (!this.state.isActive) {
            if (this.props.addSelectedLetter(x, y)) {
                this.setState({isActive: true});
            }
        }

    },

    render: function () {

        var letterClassName = classNames(
            this.props.classNameLetter
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

        if (x == 'undefined' || y == 'undefined') {
            return false;
        }

        var result = false;
        this.state.selectedLetters.map(function (selectedLetter, selectedLetterIndex) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                result = true;
            }
        });

        return result;
    },

    addSelectedLetter: function (x, y) {

        if (x == 'undefined' || y == 'undefined') {
            return false;
        }

        console.log(this.checkIfLetterIsSelected(x, y));
        if (this.checkIfLetterIsSelected(x, y)) {
            return false;
        }

        var updatedLetters = this.state.selectedLetters.slice();

        updatedLetters.push([x, y]);
        console.log(updatedLetters);
        this.setState({selectedLetters: updatedLetters});

        return true;

    },

    removeSelectedLetter: function (x, y) {

        if (x == 'undefined' || y == 'undefined') {
            return false;
        }

        console.log(this.checkIfLetterIsSelected(x, y));
        if (!this.checkIfLetterIsSelected(x, y)) {
            return false;
        }

        var index = 'undefined';
        this.state.selectedLetters.map(function (selectedLetter, slIndex) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                index = slIndex;
            }
        });

        if (index == 'undefined') {
            return false;
        }

        //var updatedLetters = this.state.selectedLetters.slice();
        //updatedLetters.splice(index, this.state.selectedLetters.length - index);
        this.setState({
            selectedLetters: this.state.selectedLetters.splice(index, this.state.selectedLetters.length - index)
        });

        return true;

    },

    letterLink: function (x, y) {

        //check if letter is selected
        if (!this.checkIfLetterIsSelected(x, y)) {
            return false;
        }

        //check if there is a previous letter
        var index = 0;

        this.state.selectedLetters.map(function (selectedLetter, slIndex) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                index = slIndex;
            }

        });

        if (index = 0) {
            return false;
        }

        var previousLetter = this.state.selectedLetters[index - 1];

        //find out which link needs to be attached
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

                                console.log(this.checkIfLetterIsSelected(rowId, cellId));

                                var boardClassName = classNames(
                                    {"selected": this.checkIfLetterIsSelected(rowId, cellId)}
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