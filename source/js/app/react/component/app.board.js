"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');


module.exports = {};


var LetterClass = Object.assign({}, {}, {

    propTypes: {

        x: React.PropTypes.number,
        y: React.PropTypes.number,
        classNameLetter: React.PropTypes.string

    },

    getInitialState: function () {

        var state = {
            classNameLetter: this.props.classNameLetter || ""
        };

        return state;

    },

    componentWillReceiveProps: function (nextProps) {

        this.setState({
            classNameLetter: nextProps.classNameLetter || ""
        });

    },

    render: function () {

        return (
            <td className={this.state.classNameLetter}>
                {this.props.children}
            </td>
        );

    }

});
var Letter = React.createClass(LetterClass);


var BoardClass = Object.assign({}, {}, {

    onTouchStart: function (e) {

        e.stopPropagation();
        e.preventDefault();

        var screenX = e.touches[0].clientX;
        var screenY = e.touches[0].clientY;

        var boardX = screenX - e.currentTarget.getBoundingClientRect().left;
        var boardY = screenY - e.currentTarget.getBoundingClientRect().top;

        var rows = this.state.board.rows;
        var cols = this.state.board.cols;

        var boardWidthX = e.currentTarget.getBoundingClientRect().width;
        var boardHeightY = e.currentTarget.getBoundingClientRect().height;

        var cellWidthX = boardWidthX / cols;
        var cellHeightY = boardHeightY / rows;

        var y = Math.floor(boardX / cellWidthX);
        var x = Math.floor(boardY / cellHeightY);

        if (this.checkIfLetterIsInCompleteWord(x, y)) {
            console.log(this.checkIfLetterIsInCompleteWord(x, y));
            return;
        }

        var updatedLetters = this.state.selectedLetters.slice();
        updatedLetters.push([x, y, {
            classNames: {
                backgroundColor: this.selectWordBackgroundColor(),
                isSelected: "selected"
            }
        }]);
        this.setState({selectedLetters: updatedLetters});

    },

    onTouchMove: function (e) {

        e.stopPropagation();
        e.preventDefault();

        var screenX = e.touches[0].clientX;
        var screenY = e.touches[0].clientY;

        var boardX = screenX - e.currentTarget.getBoundingClientRect().left;
        var boardY = screenY - e.currentTarget.getBoundingClientRect().top;

        var rowsX = this.state.board.rows;
        var colsY = this.state.board.cols;

        var boardWidthX = e.currentTarget.getBoundingClientRect().width;
        var boardHeightY = e.currentTarget.getBoundingClientRect().height;

        var cellWidthX = boardWidthX / rowsX;
        var cellHeightY = boardHeightY / colsY;

        if (boardX > boardWidthX || boardX < 0 || boardY > boardHeightY || boardY < 0) {
            console.log("off-limits");
            return;
        }

        var y = Math.floor(boardX / cellWidthX);
        var x = Math.floor(boardY / cellHeightY);

        //check for invalid number of rows and columns
        if (x > rowsX - 1 || y > colsY - 1 || x < 0 || y < 0) {
            console.log("invalid x or y" + x, y);
            return;
        }

        if (this.state.selectedLetters.length == 0) {
            return;
        }

        if (this.checkIfLetterIsInCompleteWord(x, y)) {
            return;
        }

        //check if different letter
        if (x == this.state.selectedLetters[this.state.selectedLetters.length - 1][0] && y == this.state.selectedLetters[this.state.selectedLetters.length - 1][1]) {
            return;
        }

        var letterSelected = false;
        var index = 0;
        this.state.selectedLetters.map(function (letter, letterIndex) {
            if (x == letter[0] && y == letter[1]) {
                letterSelected = true;
                index = letterIndex;
            }
        });

        var updatedLetters = this.state.selectedLetters.slice();

        //remove letter
        if (letterSelected) {
            updatedLetters.splice(index + 1, updatedLetters.length - (index - 1));
            delete updatedLetters[index][2].classNames.linkAfter;
            this.setState({selectedLetters: updatedLetters});
            console.log("removed letters");
            return;
        }

        //add letter
        var previousLetter = updatedLetters[this.state.selectedLetters.length - 1];

        //find out which link needs to be attached
        //restrict which letters can be clicked
        var lastX = previousLetter[0];
        var lastY = previousLetter[1];

        if (x == lastX + 1 && y == lastY) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-top",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-bottom";
            this.setState({selectedLetters: updatedLetters});
        }

        if (x == lastX - 1 && y == lastY) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-bottom",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-top";
            this.setState({selectedLetters: updatedLetters});
        }

        if (y == lastY + 1 && x == lastX) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-left",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-right";
            this.setState({selectedLetters: updatedLetters});
        }

        if (y == lastY - 1 && x == lastX) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-right",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-left";
            this.setState({selectedLetters: updatedLetters});
        }

    },

    onTouchEnd: function (e) {

        e.stopPropagation();
        e.preventDefault();

        if (!this.checkForCompletedWord()) {
            this.setState({selectedLetters: []});
            return;
        }

        this.moveSelectedLettersToCompleteWords();

    },


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
            selectedLetters: [],
            completedWords: []
        };
        return state;
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

        var result = false;

        words.map(function (word) {

            if (word.letters.length == selectedLetters.length) {

                result = true;

                word.letters.map(function (letter, letterIndex) {

                    if (selectedLetters[letterIndex][0] != letter.x || selectedLetters[letterIndex][1] != letter.y) {

                        result = false;
                    }

                });

            }

        });

        return result;

    },

    moveSelectedLettersToCompleteWords: function () {

        var completeWord = this.state.selectedLetters.slice();
        var wordBackgroundColor = this.selectWordBackgroundColor();

        for (var i = 0; i < completeWord.length; i++) {
            completeWord[i][2].classNames = {
                backgroundColor: wordBackgroundColor,
                inCompleteWord: "complete"
            };
            completeWord[i].push({isLocked: true})
        }

        var completedWords = this.state.completedWords.slice();
        completedWords.push(completeWord);

        this.setState({
            selectedLetters: [],
            completedWords: completedWords
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

        //  +1 because word hasn't been added to wordsComplete yet
        for (var i = 0; i < wordsComplete + 1; i++) {
            backgroundColor = backgroundColors[i % backgroundColors.length];
        }

        return backgroundColor;

    },

    getSelectedLetterIndex: function (x, y) {

        var index = false;
        this.state.selectedLetters.map(function (selectedLetter, slIndex) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                index = slIndex;
            }
        });

        return index;

    },

    checkIfLetterIsInCompleteWord: function (x, y) {

        var result = false;

        this.state.completedWords.map(function (completedWord) {
            completedWord.map(function (letterInCompletedWord, idx, word) {
                if (letterInCompletedWord[0] == x && letterInCompletedWord[1] == y) {
                    result = word;
                }
            });
        });

        return result;

    },


    selectedLetterClasses: function (x, y) {

        /// === because index 0 is treated as false
        if (this.getSelectedLetterIndex(x, y) === false) {
            return false;
        }

        var index = this.getSelectedLetterIndex(x, y);

        var classes = this.state.selectedLetters[index][2].classNames;

        var letterClasses = [];
        for (var c in classes) letterClasses.push(classes[c]);

        return letterClasses;

    },

    completedWordsClasses: function (x, y) {

        var classes = '';

        this.state.completedWords.map(function (completedWord) {
            completedWord.map(function (letterInCompletedWord) {
                if (letterInCompletedWord[0] == x && letterInCompletedWord[1] == y) {
                    classes = letterInCompletedWord[2].classNames;
                }
            });
        });

        var completeWordClasses = [];
        for (var c in classes) completeWordClasses.push(classes[c]);

        return completeWordClasses;

    },


    render: function () {

        //console.log(this.state.selectedLetters);
        //console.log(this.state.completedWords);

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

            <table className="board" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove}
                   onTouchEnd={this.onTouchEnd}>

                {initialBoard.map(function (row, rowId) {

                    return (

                        <tr key={rowId}>

                            {row.map(function (cell, cellId) {

                                var letterClassNames = classNames(
                                    this.selectedLetterClasses(rowId, cellId),
                                    this.completedWordsClasses(rowId, cellId)
                                );

                                return (

                                    <Letter key={rowId + '_' + cellId} x={rowId} y={cellId}
                                            classNameLetter={letterClassNames}>
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