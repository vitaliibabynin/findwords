"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');


module.exports = {};


var LetterClass = Object.assign({}, {}, {

    propTypes: {

        classNameLetter: React.PropTypes.string,
        cellSize: React.PropTypes.number

    },

    getInitialState: function () {

        var state = {
            classNameLetter: this.props.classNameLetter || "",
            cellSize: this.props.cellSize || 0
        };

        return state;

    },

    componentWillReceiveProps: function (nextProps) {

        this.setState({
            classNameLetter: nextProps.classNameLetter || "",
            cellSize: nextProps.cellSize || 0
        });

    },

    render: function () {

        var letterStyle = {
            height: this.state.cellSize + "px",
            width: this.state.cellSize + "px"
        };

        return (
            <td className={this.state.classNameLetter}
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
        slideData: React.PropTypes.shape({
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
            board: this.props.slideData.rounds[0] || {},
            selectedLetters: [],
            prevSelection: [],
            completedWords: [],
            highlightedLetters: [],
            cellSize: 0
        };

        return state;

    },

    componentDidMount: function () {

        this.setState({cellSize: ($('.page-content').width() - BOARD_MARGIN) / this.state.board.cols})

    },


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

            var currentWord = this.checkIfLetterIsInCompleteWord(x, y);
            //var completedWords = this.state.completedWords.slice();

            //var index = "undefined";
            //completedWords.map(function (word, wordIndex) {
            //    var result;
            //    if (word.length == currentWord.length) {
            //        result = true;
            //        word.map(function (letter, letterIdx) {
            //            if (letter[0] != currentWord[letterIdx][0] || letter[1] != currentWord[letterIdx][1]) {
            //                result = false;
            //            }
            //        })
            //    }
            //    if (result) {
            //        index = wordIndex;
            //    }
            //});

            //currentWord[0][2].classNames.fade = "fade";
            //currentWord[0][2].classNames.visibility = "visible";

            for (var i = 0; i < currentWord.length; i++) {

                currentWord[i][2].classNames.visibility = "visible";

                //var currentLetter = currentWord[i];
                //var previousLetter = currentWord[i - 1];
                //var previousX = previousLetter[0];
                //var previousY = previousLetter[1];
                //var currentX = currentLetter[0];
                //var currentY = currentLetter[1];
                //
                //if (currentX == previousX + 1 && currentY == previousY) {
                //    currentLetter[2].classNames.linkBefore = "before-link-top";
                //    previousLetter[2].classNames.linkAfter = "after-link-bottom";
                //    currentLetter[2].classNames.fade = "fade";
                //    currentLetter[2].classNames.visibility = "visible";
                //}
                //
                //if (currentX == previousX - 1 && currentY == previousY) {
                //    currentLetter[2].classNames.linkBefore = "before-link-bottom";
                //    previousLetter[2].classNames.linkAfter2 = "after-link-top";
                //    currentLetter[2].classNames.fade = "fade";
                //    currentLetter[2].classNames.visibility = "visible";
                //}
                //
                //if (currentY == previousY + 1 && currentX == previousX) {
                //    currentLetter[2].classNames.linkBefore = "before-link-left";
                //    previousLetter[2].classNames.linkAfter = "after-link-right";
                //    currentLetter[2].classNames.fade = "fade";
                //    currentLetter[2].classNames.visibility = "visible";
                //}
                //
                //if (currentY == previousY - 1 && currentX == previousX) {
                //    currentLetter[2].classNames.linkBefore = "before-link-right";
                //    previousLetter[2].classNames.linkAfter = "after-link-left";
                //    currentLetter[2].classNames.fade = "fade";
                //    currentLetter[2].classNames.visibility = "visible";
                //}

            }

            //completedWords[index] = currentWord;

            this.setState({highlightedLetters: currentWord});

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
        var previousX = previousLetter[0];
        var previousY = previousLetter[1];

        if (x == previousX + 1 && y == previousY) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-top",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-bottom";
        }

        if (x == previousX - 1 && y == previousY) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-bottom",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-top";
        }

        if (y == previousY + 1 && x == previousX) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-left",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-right";
        }

        if (y == previousY - 1 && x == previousX) {
            updatedLetters.push([x, y, {
                classNames: {
                    linkBefore: "before-link-right",
                    backgroundColor: this.selectWordBackgroundColor(),
                    isSelected: "selected"
                }
            }]);
            previousLetter[2].classNames.linkAfter = "after-link-left";
        }

        this.setState({selectedLetters: updatedLetters});

    },

    onTouchEnd: function (e) {

        e.stopPropagation();
        e.preventDefault();

        if (this.state.highlightedLetters != []) {

            var cleanHighlightedLetters = this.state.highlightedLetters.slice();

            cleanHighlightedLetters.map(function (letter) {
                delete letter[2].classNames.visibility;
            });

            this.setState({highlightedLetters: cleanHighlightedLetters});

        }

        if (this.checkForCompletedWord()) {
            this.moveSelectedLettersToCompleteWords();
            return;
        }

        var selection = this.state.selectedLetters.slice();

        this.setState({
            selectedLetters: [],
            prevSelection: selection
        });

    },


    openWord: function () {


        console.log("word opened");

    },

    openLetter: function () {
        console.log("letter opened");
    },

    showWord: function () {
        console.log("word shown");
    },


    checkForCompletedWord: function () {

        var words = this.state.board.words;
        var selectedLetters = this.state.selectedLetters;

        var mainResult = false;

        words.map(function (word) {

            if (word.letters.length == selectedLetters.length) {

                var result = true;

                word.letters.map(function (letter, letterIndex) {

                    if (selectedLetters[letterIndex][0] != letter.x || selectedLetters[letterIndex][1] != letter.y) {

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

        var completeWord = this.state.selectedLetters.slice();
        var wordBackgroundColor = this.selectWordBackgroundColor();

        for (var i = 0; i < completeWord.length; i++) {
            completeWord[i][2].classNames.backgroundColor = wordBackgroundColor;
            completeWord[i][2].classNames.inCompleteWord = "complete";
            completeWord[i][2].classNames.fade = "fade";
            delete completeWord[i][2].classNames.isSelected;
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

    //highlightedLettersClasses: function (x, y) {
    //
    //    var classes = '';
    //
    //    this.state.highlightedLetters.map(function (highlightedLetter) {
    //        if (highlightedLetter[0] == x && highlightedLetter[1] == y) {
    //            classes = highlightedLetter[2].classNames;
    //        }
    //    });
    //
    //    var highlightedLetters = [];
    //    for (var c in classes) highlightedLetters.push(classes[c]);
    //
    //    return highlightedLetters;
    //
    //},


    render: function () {

        //console.log(this.state.selectedLetters);
        //console.log(this.state.completedWords);
        //console.log(this.state.highlightedLetters);
        //console.log(this.state.prevSelection);

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

        //var initialBoard = [
        //    ['н', 'а', 'у', 'ш'],
        //    ['а', 'н', 'т', 'и'],
        //    ['м', 'о', 'р', 'г'],
        //    ['п', 'а', 'к', 'в'],
        //    ['у', 'л', 'к', 'к'],
        //    ['к', 'я', 'л', 'б'],
        //    ['а', 'в', 'о', 'а'],
        //    ['п', 'с', 'у', 'л']
        //];

        var boardStyle = {
            fontSize: (this.state.cellSize / 2) + "px"
        };

        return (

            <table className="board"
                   onTouchStart={this.onTouchStart}
                   onTouchMove={this.onTouchMove}
                   onTouchEnd={this.onTouchEnd}
                   style={boardStyle}>

                {initialBoard.map(function (row, rowId) {

                    return (

                        <tr key={rowId}>

                            {row.map(function (cell, cellId) {

                                var letterClassNames = classNames(
                                    this.selectedLetterClasses(rowId, cellId),
                                    this.completedWordsClasses(rowId, cellId)
                                );

                                return (

                                    <Letter key={rowId + '_' + cellId}
                                            classNameLetter={letterClassNames}
                                            cellSize={this.state.cellSize}>
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