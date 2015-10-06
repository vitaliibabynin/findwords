"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var GameMixin = require('./app.mixin').GameMixin;


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


var SELECT_DIFFERENTLY = "selectDifferently";
var NO_SUCH_WORD = "noSuchWord";

var NoticeClass = Object.assign({}, {}, {

    displayName: 'Notice',
    mixins: [GameMixin],

    propTypes: {
        classNames: React.PropTypes.string,
        noticeType: React.PropTypes.string,
        word: React.PropTypes.array
    },

    getInitialState: function () {

        return {
            classNames: this.props.classNames || "",
            noticeType: this.props.noticeType || "",
            word: this.props.word || []
        };

    },

    componentWillReceiveProps: function (nextProps) {

        this.setState({
            classNames: nextProps.classNames || "",
            noticeType: nextProps.noticeType || "",
            word: nextProps.word || []
        });

    },

    capitalizeWord: function () {

        var initialWord = this.state.word;

        if (initialWord.length == 0) {
            return false;
        }

        var word = initialWord[0].letter.toUpperCase();
        for (var i = 1; i < initialWord.length; i++) {
            word += initialWord[i].letter.toLowerCase();
        }

        return word;

    },

    whichText: function () {

        if (this.state.noticeType == "") {
            return false;
        }

        if (this.capitalizeWord() === false) {
            return false;
        }

        var textBefore;
        var textAfter;

        if (this.state.noticeType == NO_SUCH_WORD) {
            textBefore = i18n._('notice.noSuchWord.before');
            textAfter = i18n._('notice.noSuchWord.after');
        }

        if (this.state.noticeType == SELECT_DIFFERENTLY) {
            textBefore = i18n._('notice.selectDifferently.before');
            textAfter = i18n._('notice.selectDifferently.after');
        }

        return textBefore + ' "' + this.capitalizeWord() + '" ' + textAfter;

    },

    render: function () {

        var noticeImg = {
            backgroundImage: "url('" + this.getImagePath('notice/wrong') + "')"
        };

        var text = this.whichText() ? this.whichText() : "";

        return (
            <div className={this.state.classNames}
                 style={noticeImg}>
                <div><span>{text}</span></div>
            </div>
        );

    }

});
var Notice = React.createClass(NoticeClass);


var BOARD_MARGIN = 50;
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
var OPEN_LETTER_COLOR = "open-letter";
var OPEN_LETTER_BEFORE_LINK_TOP = "open-letter-before-link-top";
var OPEN_LETTER_BEFORE_LINK_RIGHT = "open-letter-before-link-right";
var OPEN_LETTER_BEFORE_LINK_BOTTOM = "open-letter-before-link-bottom";
var OPEN_LETTER_BEFORE_LINK_LEFT = "open-letter-before-link-left";
var OPEN_LETTER_AFTER_LINK_TOP = "open-letter-after-link-top";
var OPEN_LETTER_AFTER_LINK_RIGHT = "open-letter-after-link-right";
var OPEN_LETTER_AFTER_LINK_BOTTOM = "open-letter-after-link-bottom";
var OPEN_LETTER_AFTER_LINK_LEFT = "open-letter-after-link-left";

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
        lockScreen: React.PropTypes.func
    },

    getInitialState: function () {

        return {
            roundsBundleIdx: this.props.roundsBundleIdx || 0,
            roundIdx: this.props.roundIdx || 0,
            boardData: this.props.boardData.rounds[0] || {},
            cellSize: 0,
            board: [],
            selectedLetters: [],
            previousSelection: [],
            completedWords: [],
            highlightedWord: [],
            openedLetters: [],
            shownWords: [],
            whichNotice: "",
            lockScreen: this.props.lockScreen || function () {
            }
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

    setGameStateRoundField: function (field, newValue) {

        var bundleIndex = this.state.roundsBundleIdx;
        var roundIndex = this.state.roundIdx;

        return appManager.getGameState().setRound(bundleIndex, roundIndex, field, newValue);

    },

    getGameStateRoundField: function (field) {

        var bundleIndex = this.state.roundsBundleIdx;
        var roundIndex = this.state.roundIdx;

        var round = appManager.getGameState().getRound(bundleIndex, roundIndex);

        return round[field];

    },


    onTouchStart: function (e) {

        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        if (this.highlightCompletedWord(x, y)) {
            return;
        }

        this.addFirstLetterToSelectedLetters(x, y);

    },

    onTouchMove: function (e) {

        this.preventDefaultOnEvent(e);

        var cellCoordinates = this.calcWhichCellIsTouched(e);
        if (!cellCoordinates) {
            return;
        }
        var x = cellCoordinates.x;
        var y = cellCoordinates.y;

        if (!this.checkIfDifferentLetter(x, y)) {
            return;
        }

        if (this.checkIfLetterIsInCompleteWord(x, y)) {
            return;
        }

        if (this.removeSelectedLettersAfter(x, y)) {
            return;
        }

        this.addLetterToSelectedLetters(x, y);

    },

    onTouchEnd: function (e) {

        this.preventDefaultOnEvent(e);

        this.fadeHighlightedWord();

        if (this.checkForCompletedWord()) {
            this.moveSelectedLettersToCompleteWords();
            return;
        }

        if (this.checkForSameLetters()) {

            this.state.lockScreen(3500);
            this.setState({whichNotice: SELECT_DIFFERENTLY}, function () {
                setTimeout(function () {
                    this.setState({whichNotice: ""});
                    setTimeout(function () {
                        this.emptySelectedLetters();
                    }.bind(this), 500);
                }.bind(this), 3000);
            });

            return;

        }

        if (this.selectedLettersEqualPreviousSelection()) {

            this.state.lockScreen(3500);
            this.setState({whichNotice: NO_SUCH_WORD}, function () {
                setTimeout(function () {
                    this.setState({whichNotice: ""});
                    this.moveSelectedLettersToPreviousSelection();
                    setTimeout(function () {
                        this.emptySelectedLetters();
                    }.bind(this), 500);
                }.bind(this), 3000);
            });

            return;

        }

        this.moveSelectedLettersToPreviousSelection();

        this.emptySelectedLetters();

    },

    onTouchCancel: function () {

        this.preventDefaultOnEvent(e);

        this.fadeHighlightedWord();

        this.emptySelectedLetters();

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

    highlightCompletedWord: function (x, y) {

        var board = this.state.board;
        var wordAlreadyCompleted = false;

        var currentWord = this.checkIfLetterIsInCompleteWord(x, y);
        if (currentWord !== false) {

            currentWord.map(function (letter) {
                board[letter.y][letter.x].classNames.linkVisibility = LINK_VISIBLE;
            });

            this.setState({highlightedWord: currentWord});

            wordAlreadyCompleted = true;

        }

        return wordAlreadyCompleted;

    },

    fadeHighlightedWord: function () {

        var highlightedWord = this.state.highlightedWord;

        if (highlightedWord != []) {

            var board = this.state.board;

            highlightedWord.map(function (letter) {
                board[letter.y][letter.x].classNames.linkVisibility = LINK_FADE;
            });

            this.setState({highlightedWord: []});

        }

    },

    checkIfLetterIsInCompleteWord: function (x, y) {

        var result = false;

        this.state.completedWords.map(function (completedWord) {
            completedWord.map(function (letterInCompletedWord, idx, word) {
                if (letterInCompletedWord.x == x && letterInCompletedWord.y == y) {
                    result = word;
                }
            });
        });

        return result;

    },

    checkIfDifferentLetter: function (x, y) {

        var selectedLetters = this.state.selectedLetters;

        if (selectedLetters.length == 0) {
            return false;
        }

        return !(y == selectedLetters[selectedLetters.length - 1].y && x == selectedLetters[selectedLetters.length - 1].x);

    },

    addFirstLetterToSelectedLetters: function (x, y) {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        selectedLetters.push(board[y][x]);
        board[y][x].classNames.backgroundColor = this.selectWordBackgroundColor();
        board[y][x].classNames.color = COLOR_SELECTED;
        board[y][x].classNames.linkVisibility = LINK_VISIBLE;

        this.setState({
            board: board,
            selectedLetters: selectedLetters
        });

    },

    getIndexIfLetterIsSelected: function (x, y) {

        var selectedLetters = this.state.selectedLetters;

        var index = false;
        selectedLetters.map(function (letter, letterIndex) {
            if (y == letter.y && x == letter.x) {
                index = letterIndex;
            }
        });

        return index;

    },

    removeSelectedLettersAfter: function (x, y) {

        var lettersRemoved = false;

        var index = this.getIndexIfLetterIsSelected(x, y);
        if (index !== false) {

            var board = this.state.board;
            var selectedLetters = this.state.selectedLetters;

            for (var i = index + 1; i < selectedLetters.length; i++) {
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.linkBefore;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.linkAfter;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.linkVisibility;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.backgroundColor;
                delete board[selectedLetters[i].y][selectedLetters[i].x].classNames.color;
            }

            delete board[selectedLetters[index].y][selectedLetters[index].x].classNames.linkAfter;

            selectedLetters.splice(index + 1, selectedLetters.length - (index - 1));

            this.setState({selectedLetters: selectedLetters});

            lettersRemoved = true;

        }

        return lettersRemoved;

    },

    addLetterToSelectedLetters: function (x, y) {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        var previousLetter = selectedLetters[selectedLetters.length - 1];

        //find out which link needs to be attached
        //restrict which letters can be clicked
        var prevX = previousLetter.x;
        var prevY = previousLetter.y;
        var prevColor = previousLetter.classNames.backgroundColor;

        if (y == prevY + 1 && x == prevX) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames.linkBefore = BEFORE_LINK_TOP;
            board[y][x].classNames.linkVisibility = LINK_VISIBLE;
            board[y][x].classNames.backgroundColor = prevColor;
            board[y][x].classNames.color = COLOR_SELECTED;
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
        }

        if (y == prevY - 1 && x == prevX) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM;
            board[y][x].classNames.linkVisibility = LINK_VISIBLE;
            board[y][x].classNames.backgroundColor = prevColor;
            board[y][x].classNames.color = COLOR_SELECTED;
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
        }

        if (x == prevX + 1 && y == prevY) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames.linkBefore = BEFORE_LINK_LEFT;
            board[y][x].classNames.linkVisibility = LINK_VISIBLE;
            board[y][x].classNames.backgroundColor = prevColor;
            board[y][x].classNames.color = COLOR_SELECTED;
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
        }

        if (x == prevX - 1 && y == prevY) {
            selectedLetters.push(board[y][x]);
            board[y][x].classNames.linkBefore = BEFORE_LINK_RIGHT;
            board[y][x].classNames.linkVisibility = LINK_VISIBLE;
            board[y][x].classNames.backgroundColor = prevColor;
            board[y][x].classNames.color = COLOR_SELECTED;
            board[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
        }

        this.setState({
            board: board,
            selectedLetters: selectedLetters
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

        //  +1 because word hasn't been added to completedWords yet
        for (var i = 0; i < wordsComplete + 1; i++) {
            backgroundColor = backgroundColors[i % backgroundColors.length];
        }

        return backgroundColor;

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

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

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

    },

    checkForSameLetters: function () {

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

                });

                if (result) {
                    mainResult = true;
                }

            }
        });

        return mainResult;

    },

    moveSelectedLettersToPreviousSelection: function () {

        var selectedLetters = this.state.selectedLetters;

        this.setState({
            previousSelection: selectedLetters
        })

    },

    selectedLettersEqualPreviousSelection: function () {

        var selectedLetters = this.state.selectedLetters;
        var previousSelection = this.state.previousSelection;

        if (selectedLetters.length != previousSelection.length) {
            return false;
        }

        var result = true;
        for (var i = 0; i < selectedLetters.length; i++) {
            if (selectedLetters[i].letter != previousSelection[i].letter) {
                result = false;
            }
        }

        return result;

    },

    emptySelectedLetters: function () {

        var board = this.state.board;
        var selectedLetters = this.state.selectedLetters;

        selectedLetters.map(function (letter) {
            delete board[letter.y][letter.x].classNames.linkBefore;
            delete board[letter.y][letter.x].classNames.linkAfter;
            delete board[letter.y][letter.x].classNames.linkVisibility;
            delete board[letter.y][letter.x].classNames.backgroundColor;
            delete board[letter.y][letter.x].classNames.color;
        });

        this.setState({
            board: board,
            selectedLetters: []
        });

    },


    showNotice: function () {

        var whichNotice = this.state.whichNotice;
        var notice;

        switch (whichNotice) {
            case NO_SUCH_WORD:
                notice = (
                    <Notice classNames="notice"
                            noticeType={NO_SUCH_WORD}
                            word={this.state.selectedLetters}
                        />
                );
                break;
            case SELECT_DIFFERENTLY:
                notice = (
                    <Notice classNames="notice"
                            noticeType={SELECT_DIFFERENTLY}
                            word={this.state.selectedLetters}
                        />
                );
                break;
            default:
                notice = (
                    <div></div>
                );
        }

        return notice;

    },


    openWord: function () {

        var unopenedWord = this.getUnopenedWord();

        if (!unopenedWord) {
            return false;
        }

        var board = this.state.board;
        var backgroundColor = this.selectWordBackgroundColor();

        board[unopenedWord[0].y][unopenedWord[0].x].classNames = {
            backgroundColor: backgroundColor,
            color: COLOR_COMPLETED,
            linkVisibility: LINK_VISIBLE
        };

        for (var i = 1; i < unopenedWord.length; i++) {

            var x = unopenedWord[i].x;
            var y = unopenedWord[i].y;
            var prevLetter = unopenedWord[i - 1];
            var prevX = prevLetter.x;
            var prevY = prevLetter.y;

            if (y == prevY + 1 && x == prevX) {
                board[y][x].classNames = {
                    linkBefore: BEFORE_LINK_TOP,
                    linkVisibility: LINK_VISIBLE,
                    backgroundColor: backgroundColor,
                    color: COLOR_COMPLETED
                };
                board[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM;
            }

            if (y == prevY - 1 && x == prevX) {
                board[y][x].classNames = {
                    linkBefore: BEFORE_LINK_BOTTOM,
                    linkVisibility: LINK_VISIBLE,
                    backgroundColor: backgroundColor,
                    color: COLOR_COMPLETED
                };
                board[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP;
            }

            if (x == prevX + 1 && y == prevY) {
                board[y][x].classNames = {
                    linkBefore: BEFORE_LINK_LEFT,
                    linkVisibility: LINK_VISIBLE,
                    backgroundColor: backgroundColor,
                    color: COLOR_COMPLETED
                };
                board[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
            }

            if (x == prevX - 1 && y == prevY) {
                board[y][x].classNames = {
                    linkBefore: BEFORE_LINK_RIGHT,
                    linkVisibility: LINK_VISIBLE,
                    backgroundColor: backgroundColor,
                    color: COLOR_COMPLETED
                };
                board[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
            }

        }

        var completedWords = this.state.completedWords;
        completedWords.push(unopenedWord);

        this.setState({
            board: board,
            completedWords: completedWords,
            openedLetters: []
        }, function () {
            unopenedWord.map(function (letter) {
                board[letter.y][letter.x].classNames.linkVisibility = LINK_FADE;
            });
            setTimeout(function () {
                this.setState({
                    board: board
                })
            }.bind(this), 200);
        });

    },

    openLetter: function () {

        var unopenedWord = this.getUnopenedWord();

        if (!unopenedWord) {
            return;
        }

        var board = this.state.board;
        var openedLetters = this.state.openedLetters;

        if (openedLetters.length == 0) {
            board[unopenedWord[0].y][unopenedWord[0].x].classNames.openLetter = OPEN_LETTER_COLOR;
            this.setState({openedLetters: [unopenedWord[0]]});
            return;
        }

        if (openedLetters.length == unopenedWord.length - 1) {
            this.openWord();
            return;
        }

        var currentLetter = unopenedWord[openedLetters.length];
        var x = currentLetter.x;
        var y = currentLetter.y;

        var prevLetter = openedLetters[openedLetters.length - 1];
        var prevX = prevLetter.x;
        var prevY = prevLetter.y;

        if (y == prevY + 1 && x == prevX) {
            openedLetters.push(board[y][x]);
            board[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_TOP,
                openLetterColor: OPEN_LETTER_COLOR
            };
            board[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_BOTTOM;
        }

        if (y == prevY - 1 && x == prevX) {
            openedLetters.push(board[y][x]);
            board[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_BOTTOM,
                openLetter: OPEN_LETTER_COLOR
            };
            board[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_TOP;
        }

        if (x == prevX + 1 && y == prevY) {
            openedLetters.push(board[y][x]);
            board[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_LEFT,
                openLetter: OPEN_LETTER_COLOR
            };
            board[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_RIGHT;
        }

        if (x == prevX - 1 && y == prevY) {
            openedLetters.push(board[y][x]);
            board[y][x].classNames = {
                openLetterLinkBefore: OPEN_LETTER_BEFORE_LINK_RIGHT,
                openLetter: OPEN_LETTER_COLOR
            };
            board[prevY][prevX].classNames.openLetterLinkAfter = OPEN_LETTER_AFTER_LINK_LEFT;
        }

        this.setState({
            board: board,
            openedLetters: openedLetters
        });

    },

    getUnopenedUnshownWord: function () {

        var words = this.state.boardData.words;
        var completedWords = this.state.completedWords;

        if (completedWords.length == words.length) {
            return false
        }

        var unopenedWord = false;

        words.map(function (word) {

            var wordIsInCompletedWords = this.checkIfWordIsInCompletedWords(word);
            var wordIsInShownWords = this.checkIfWordIsInShownWords(word);

            if (!wordIsInCompletedWords && !wordIsInShownWords) {
                unopenedWord = word.letters;
            }

        }.bind(this));

        if (unopenedWord !== false) {
            var shownWords = this.state.shownWords;
            shownWords.push(unopenedWord);
            this.setState({shownWords: shownWords})
        }

        return unopenedWord

    },

    getUnopenedWord: function () {

        var words = this.state.boardData.words;
        var completedWords = this.state.completedWords;

        if (completedWords.length == 0) {
            return words[0].letters;
        }

        if (completedWords.length == words.length) {
            return false;
        }

        var unopenedWord = false;

        words.map(function (word) {

            var wordIsInCompletedWords = this.checkIfWordIsInCompletedWords(word);

            if (!wordIsInCompletedWords) {
                unopenedWord = word.letters;
            }

        }.bind(this));

        return unopenedWord;

    },

    checkIfWordIsInCompletedWords: function (word) {

        var completedWords = this.state.completedWords;

        if (completedWords.length == 0) {
            return false
        }

        var wordIsInCompletedWords = false;

        completedWords.map(function (completedWord) {

            var wordIsInCompletedWord = false;
            if (completedWord.length == word.letters.length) {

                var result = true;
                word.letters.map(function (letter, letterIndex) {

                    if (completedWord[letterIndex].letter != letter.letter) {
                        result = false;
                    }

                    var resultCell = false;
                    completedWord.map(function (compWordLetter) {

                        if (compWordLetter.x == letter.x && compWordLetter.y == letter.y) {
                            resultCell = true;
                        }

                    });

                    if (!resultCell) {
                        result = false;
                    }

                });

                if (result) {
                    wordIsInCompletedWord = true;
                }
            }

            if (wordIsInCompletedWord) {
                wordIsInCompletedWords = true;
            }

        });

        return wordIsInCompletedWords;

    },

    checkIfWordIsInShownWords: function (word) {

        var shownWords = this.state.shownWords;

        if (shownWords.length == 0) {
            return false
        }

        var wordIsInShownWords = false;

        shownWords.map(function (shownWord) {

            var wordIsInShownWord = false;
            if (shownWord.length == word.letters.length) {

                var result = true;
                word.letters.map(function (letter, letterIndex) {

                    if (shownWord[letterIndex].letter != letter.letter) {
                        result = false;
                    }

                    var resultCell = false;
                    shownWord.map(function (shownWordLetter) {

                        if (shownWordLetter.x == letter.x && shownWordLetter.y == letter.y) {
                            resultCell = true;
                        }

                    });

                    if (!resultCell) {
                        result = false;
                    }

                });

                if (result) {
                    wordIsInShownWord = true;
                }
            }

            if (wordIsInShownWord) {
                wordIsInShownWords = true;
            }

        });

        return wordIsInShownWords;

    },


    render: function () {

        //console.log(this.getGameStateRoundField('board'));
        //console.log(this.getGameStateRoundField('completedWords'));
        //console.log(this.getGameStateRoundField('openedLetters'));
        //console.log(this.getGameStateRoundField('shownWords'));
        //console.log({board: this.state.shownWords});
        //console.log(this.state.completedWords);
        console.log(this.state.selectedLetters);
        //console.log(this.state.openedLetters);
        console.log(this.state.previousSelection);

        var boardArr = this.state.board;
        //console.log(boardArr);

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
                {this.showNotice()}
            </div>

        );
    }

});
module.exports.Board = React.createClass(BoardClass);
module.exports.Board.Class = BoardClass;