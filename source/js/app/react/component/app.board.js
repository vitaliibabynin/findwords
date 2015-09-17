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
        checkIfFirstSelectedLetter: React.PropTypes.func,
        addSelectedLetter: React.PropTypes.func,
        checkIfLetterCanBeClicked: React.PropTypes.func,
        removeSelectedLetter: React.PropTypes.func,
        addLink: React.PropTypes.func,
        checkIfLastSelectedLetter: React.PropTypes.func,
        checkForCompletedWord: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            x: this.props.x || 0,
            y: this.props.y || 0,
            isActive: false,
            isLocked: false,
            link: ''
        };
        return state;
    },

    onClick: function () {

        var x = this.state.x;
        var y = this.state.y;

        //check if locked
        if (this.state.isLocked) {
            return;
        }

        //if active
        if (this.state.isActive) {

            //check if last letter
            if (!this.props.checkIfLastSelectedLetter(x, y)) {
                return;
            }

            //check if link ? remove link : continue
            if (this.state.link) {
                this.setState({link: ''})
            }

            //remove from selected letters
            this.props.removeSelectedLetter(x, y);

            //make inactive
            this.setState({isActive: false});

            return;
        }

        //if not active

        //check if first letter ? add to selected letters, make active, return true : continue
        if (this.props.checkIfFirstSelectedLetter()) {
            if (!this.props.addSelectedLetter(x, y)){
                return;
            }
            this.setState({isActive: true});
            return;
        }

        //check if this letter is allowed to be clicked ? add to selected letters : return false
        if (!this.props.checkIfLetterCanBeClicked(x, y)) {
            return;
        }

        this.props.addSelectedLetter(x, y);

        //check if a word has been completed ? lock, change appearance, clear selected letters : continue
        if (this.props.checkForCompletedWord()) {
            console.log("Word Complete");
            return;
        }

        //add link
        this.setState({link: this.props.addLink(x, y)});

        //make active
        this.setState({isActive: true});

    },

    render: function () {

        var letterClassNames = classNames(
            {'selected': this.state.isActive}
        );

        return (
            <td className={letterClassNames} onClick={this.onClick}>
                {this.props.children}
                <div className={this.state.link}></div>
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
                            {x: 0, y: 0, letter: "a"},
                            {x: 1, y: 0, letter: "a"},
                            {x: 2, y: 0, letter: "a"},
                            {x: 2, y: 1, letter: "a"},
                            {x: 2, y: 2, letter: "a"}
                        ]
                    },
                    {
                        letters: [
                            {x: 0, y: 1, letter: "b"},
                            {x: 1, y: 1, letter: "b"},
                            {x: 1, y: 2, letter: "b"},
                            {x: 0, y: 2, letter: "b"}
                        ]
                    }
                ]
            },
            selectedLetters: []
        };
        return state;
    },

    addSelectedLetter: function (x, y) {

        if (x == 'undefined' || y == 'undefined') {
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

        var index;
        this.state.selectedLetters.map(function (selectedLetter, slIndex) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                index = slIndex;
            }
        });

        console.log(index);
        var updatedLetters = this.state.selectedLetters.slice();
        updatedLetters.splice(index, 1);
        this.setState({selectedLetters: updatedLetters})

    },

    checkIfFirstSelectedLetter: function () {
        if (this.state.selectedLetters.length == 0) {
            return true;
        }
    },

    checkIfLastSelectedLetter: function (x, y) {
        var lastLetterClicked = this.state.selectedLetters[this.state.selectedLetters.length - 1];
        var lastX = lastLetterClicked[0];
        var lastY = lastLetterClicked[1];

        if (x == lastX && y == lastY) {
            return true;
        }
    },

    checkIfLetterCanBeClicked: function (x, y) {

        var lastLetterClicked = this.state.selectedLetters[this.state.selectedLetters.length - 1];
        var lastX = lastLetterClicked[0];
        var lastY = lastLetterClicked[1];

        if ((x == lastX + 1 || x == lastX - 1) && y == lastY) {
            return true;
        }

        if ((y == lastY + 1 || y == lastY - 1) && x == lastX) {
            return true;
        }

        return false;
    },

    addLink: function (x, y) {
        var lastLetterClicked = this.state.selectedLetters[this.state.selectedLetters.length - 1];
        var lastX = lastLetterClicked[0];
        var lastY = lastLetterClicked[1];

        if (x == lastX + 1) {
            return LINK_TOP;
        }

        if (x == lastX - 1) {
            return LINK_BOTTOM;
        }

        if (y == lastY + 1) {
            return LINK_LEFT;
        }

        if (y == lastY - 1) {
            return LINK_RIGHT;
        }

        return ''
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

    checkForCompletedWord: function () {

        var words = this.state.board.words;
        var selectedLetters = this.state.selectedLetters;
        console.log(this.state.selectedLetters);

        words.map(function (word, wordIndex) {
            console.log(word.letters.length);
            console.log(selectedLetters.length);

            if (word.letters.length == selectedLetters.length) {
                //var wordArr = new Array(word.letters.length);
                var completeness = true;
                word.letters.map(function (letter, letterIndex) {
                    console.log("selectedLetters x: " + selectedLetters[letterIndex][0]);
                    console.log("letter.x: " + letter.x);

                    if (selectedLetters[letterIndex][0] != letter.x || selectedLetters[letterIndex][1] != letter.y) {
                        completeness = false;
                    }


                    //selectedLetters.map(function(selectedLetter){
                    //    //console.log(selectedLetter[0]);
                    //    //console.log(letter.x);
                    //
                    //    if (selectedLetter[0] != letter.x || selectedLetter[1] != letter.y) {
                    //        completeness = false;
                    //        console.log(completeness);
                    //    }


                    //});

                });

                return completeness;

            }

        });

        return false;
        //word.letters = array of objects letters.x, letters.y

        //var words = [[[0,1],[0,2]],[[0,1],[0,2]]]


    },

    render: function () {

        //console.log(this.state.selectedLetters);

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

                                return (

                                    <Letter key={rowId + '_' + cellId} x={rowId} y={cellId}
                                            checkIfFirstSelectedLetter={this.checkIfFirstSelectedLetter}
                                            addSelectedLetter={this.addSelectedLetter}
                                            checkIfLetterCanBeClicked={this.checkIfLetterCanBeClicked}
                                            removeSelectedLetter={this.removeSelectedLetter}
                                            addLink={this.addLink}
                                            checkIfLastSelectedLetter={this.checkIfLastSelectedLetter}
                                            checkForCompletedWord={this.checkForCompletedWord}>
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