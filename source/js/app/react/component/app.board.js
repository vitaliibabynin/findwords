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
        handleLetterClick: React.PropTypes.func,
        classNameLetter: React.PropTypes.string,
        isLocked: React.PropTypes.bool

    },

    getInitialState: function () {

        var state = {
            x: this.props.x || 0,
            y: this.props.y || 0,
            handleLetterClick: this.props.handleLetterClick || function () {
            },
            classNameLetter: this.props.classNameLetter || "",
            isLocked: this.props.isLocked || false
        };

        return state;

    },

    componentWillReceiveProps: function (nextProps) {

        this.setState({
            classNameLetter: nextProps.classNameLetter || "",
            isLocked: nextProps.isLocked || false
        });

    },

    //onClick: function () {
    //
    //    if (this.state.isLocked) {
    //        return;
    //    }
    //
    //    this.state.handleLetterClick(this.state.x, this.state.y);
    //
    //},

    //onTouchMove: function () {
    //
    //    console.log("touchMove");
    //
    //    if (this.state.isLocked) {
    //        return;
    //    }
    //
    //    this.state.handleLetterClick(this.state.x, this.state.y);
    //
    //},

    render: function () {

        var letterClassName = classNames(
            this.state.classNameLetter
        );

        return (
            <td className={letterClassName} onTouchMove={this.props.onTouchMove}>
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
            selectedLetters: [],
            completedWords: []
        };
        return state;
    },

    componentDidUpdate: function () {

        if (!this.checkForCompletedWord()) {
            return;
        }

        this.moveSelectedLettersToCompleteWords();

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
                backgroundColor: wordBackgroundColor
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

    onTouchStart: function (e) {

        e.stopPropagation();
        e.preventDefault();

        //console.log(e._dispatchIDs);
        //console.log(e._dispatchListeners);
        //console.log(e.altKey);
        //console.log(e.bubbles);
        //console.log(e.cancelable);
        //console.log(e.changedTouches);
        //console.log(e.ctrlKey);
        console.log(e.currentTarget);
        //console.log(e.defaultPrevented);
        //console.log(e.detail);
        //console.log(e.dispatchConfig);
        //console.log(e.dispatchMarker);
        //console.log(e.eventPhase);
        //console.log(e.getModifierState);
        //console.log(e.isDefaultPrevented());
        //console.log(e.isPropagationStopped());
        //console.log(e.isTrusted);
        //console.log(e.metaKey);
        //console.log(e.nativeEvent);
        //console.log(e.shiftKey);
        //console.log(e.target);
        //console.log(e.targetTouches);
        //console.log(e.timeStamp);
        //console.log(e.touches);
        //console.log(e.type);
        //console.log(e.view);

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        console.log(x, y);

    },

    onTouchMove: function (e) {

        e.stopPropagation();
        e.preventDefault();

        //console.log(e._dispatchIDs);
        //console.log(e._dispatchListeners);
        //console.log(e.altKey);
        //console.log(e.bubbles);
        //console.log(e.cancelable);
        //console.log(e.changedTouches);
        //console.log(e.ctrlKey);
        console.log(e.currentTarget);
        //console.log(e.defaultPrevented);
        //console.log(e.detail);
        //console.log(e.dispatchConfig);
        //console.log(e.dispatchMarker);
        //console.log(e.eventPhase);
        //console.log(e.getModifierState);
        //console.log(e.isDefaultPrevented());
        //console.log(e.isPropagationStopped());
        //console.log(e.isTrusted);
        //console.log(e.metaKey);
        //console.log(e.nativeEvent);
        //console.log(e.shiftKey);
        //console.log(e.target);
        //console.log(e.targetTouches);
        //console.log(e.timeStamp);
        //console.log(e.touches);
        //console.log(e.type);
        //console.log(e.view);

        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;

        console.log(x, y);

        //console.log("touchMove");

        //if (this.state.isLocked) {
        //    return;
        //}

        //this.handleLetterClick(this.state.x, this.state.y);

    },

    onTouchEnd: function (e) {

        e.stopPropagation();
        e.preventDefault();

        //console.log(e._dispatchIDs);
        //console.log(e._dispatchListeners);
        //console.log(e.altKey);
        //console.log(e.bubbles);
        //console.log(e.cancelable);
        //console.log(e.changedTouches);
        //console.log(e.ctrlKey);
        //console.log(e.currentTarget);
        //console.log(e.defaultPrevented);
        //console.log(e.detail);
        //console.log(e.dispatchConfig);
        //console.log(e.dispatchMarker);
        //console.log(e.eventPhase);
        //console.log(e.getModifierState);
        //console.log(e.isDefaultPrevented());
        //console.log(e.isPropagationStopped());
        //console.log(e.isTrusted);
        //console.log(e.metaKey);
        //console.log(e.nativeEvent);
        //console.log(e.shiftKey);
        //console.log(e.target);
        //console.log(e.targetTouches);
        //console.log(e.timeStamp);
        //console.log(e.touches);
        //console.log(e.type);
        //console.log(e.view);

        //var x = e.touches[0].clientX;
        //var y = e.touches[0].clientY;
        //
        //console.log(x, y);

    },

    handleLetterClick: function (x, y) {

        if (x == 'undefined' || y == 'undefined') {
            return false;
        }

        if (this.checkIfLetterIsSelected(x, y)) {

            this.removeSelectedLetter(x, y);

        } else {

            //this.addSelectedLetter(x, y);
            this.addTouchedLetters(x, y);

        }

        return true;

    },

    checkIfLetterIsSelected: function (x, y) {

        var result = false;
        this.state.selectedLetters.map(function (selectedLetter) {
            if (selectedLetter[0] == x && selectedLetter[1] == y) {
                result = true;
            }
        });

        return result;

    },

    removeSelectedLetter: function (x, y) {

        /// === because index 0 is treated as false
        if (this.getSelectedLetterIndex(x, y) === false) {
            return false;
        }

        var index = this.getSelectedLetterIndex(x, y);

        var updatedLetters = this.state.selectedLetters.slice();

        if (index != 0) {
            delete updatedLetters[index - 1][2].classNames.linkAfter;
        }

        updatedLetters.splice(index, this.state.selectedLetters.length - index);

        this.setState({
            selectedLetters: updatedLetters
        });

        return true;

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

        var updatedLetters = this.state.selectedLetters.slice();

        //check if there is a previous letter
        if (this.state.selectedLetters.length == 0) {
            updatedLetters.push([x, y, {classNames: {}}]);
            this.setState({selectedLetters: updatedLetters});
            return true;
        }

        var previousLetter = updatedLetters[this.state.selectedLetters.length - 1];

        //find out which link needs to be attached
        //restrict which letters can be clicked
        var lastX = previousLetter[0];
        var lastY = previousLetter[1];

        if (x == lastX + 1 && y == lastY) {
            updatedLetters.push([x, y, {classNames: {linkBefore: LINK_TOP}}]);
            previousLetter[2].classNames.linkAfter = LINK_BOTTOM;
            this.setState({selectedLetters: updatedLetters});
            return true;
        }

        if (x == lastX - 1 && y == lastY) {
            updatedLetters.push([x, y, {classNames: {linkBefore: LINK_BOTTOM}}]);
            previousLetter[2].classNames.linkAfter = LINK_TOP;
            this.setState({selectedLetters: updatedLetters});
            return true;
        }

        if (y == lastY + 1 && x == lastX) {
            updatedLetters.push([x, y, {classNames: {linkBefore: LINK_LEFT}}]);
            previousLetter[2].classNames.linkAfter = LINK_RIGHT;
            this.setState({selectedLetters: updatedLetters});
            return true;
        }

        if (y == lastY - 1 && x == lastX) {
            updatedLetters.push([x, y, {classNames: {linkBefore: LINK_RIGHT}}]);
            previousLetter[2].classNames.linkAfter = LINK_LEFT;
            this.setState({selectedLetters: updatedLetters});
            return true;
        }

        return false;

    },

    addTouchedLetters: function (x, y) {

        var updatedLetters = this.state.selectedLetters.slice();
        updatedLetters.push([x, y, {classNames: {linkBefore: LINK_LEFT}}]);
        this.setState({selectedLetters: updatedLetters});

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

    selectedLetterLinks: function (x, y) {

        /// === because index 0 is treated as false
        if (this.getSelectedLetterIndex(x, y) === false) {
            return false;
        }

        var index = this.getSelectedLetterIndex(x, y);

        var before = '';
        var after = '';

        if (this.state.selectedLetters[index][2].classNames.linkBefore !== undefined) {
            before = "before-" + this.state.selectedLetters[index][2].classNames.linkBefore;
        }

        if (this.state.selectedLetters[index][2].classNames.linkAfter !== undefined) {
            after = "after-" + this.state.selectedLetters[index][2].classNames.linkAfter;
        }

        return [before, after];

    },

    checkIfLetterIsInCompleteWord: function (x, y) {

        var result = false;

        this.state.completedWords.map(function (completedWord) {
            completedWord.map(function (letterInCompletedWord) {
                if (letterInCompletedWord[0] == x && letterInCompletedWord[1] == y) {
                    result = true;
                }
            });
        });

        return result;

    },

    getLetterBackgroundColor: function (x, y) {

        var color = '';

        this.state.completedWords.map(function (completedWord) {
            completedWord.map(function (letterInCompletedWord) {
                if (letterInCompletedWord[0] == x && letterInCompletedWord[1] == y) {
                    color = letterInCompletedWord[2].classNames.backgroundColor;
                }
            });
        });

        return color;

    },

    render: function () {

        //console.log(this.state.selectedLetters);
        //console.log(this.offset().left);

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

            <table className="board" onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>

                {initialBoard.map(function (row, rowId) {

                    return (

                        <tr key={rowId}>

                            {row.map(function (cell, cellId) {

                                var letterClassNames = classNames(
                                    {"selected": this.checkIfLetterIsSelected(rowId, cellId)},
                                    this.selectedLetterLinks(rowId, cellId),
                                    {"isLocked": this.checkIfLetterIsInCompleteWord(rowId, cellId)},
                                    this.getLetterBackgroundColor(rowId, cellId)
                                );

                                return (

                                    <Letter key={rowId + '_' + cellId} x={rowId} y={cellId}
                                            classNameLetter={letterClassNames}
                                            handleLetterClick={this.handleLetterClick}
                                            isLocked={this.checkIfLetterIsInCompleteWord(rowId, cellId)}
                                            onTouchMove={this.onTouchMove}>
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