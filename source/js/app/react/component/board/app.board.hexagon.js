"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var BoardAbstract = require('./app.board.abstract').BoardAbstract;
var Letter = require('./app.board.abstract').Letter;

module.exports = {};

//var LINK_VISIBLE = require('./app.board.abstract.js').LINK_VISIBLE;
var BEFORE_LINK_LEFT = require('./app.board.abstract.js').BEFORE_LINK_LEFT;
var BEFORE_LINK_RIGHT = require('./app.board.abstract.js').BEFORE_LINK_RIGHT;
var AFTER_LINK_LEFT = require('./app.board.abstract.js').AFTER_LINK_LEFT;
var AFTER_LINK_RIGHT = require('./app.board.abstract.js').AFTER_LINK_RIGHT;
var BEFORE_LINK_TOP_LEFT = "before-link-top-left";
var BEFORE_LINK_TOP_RIGHT = "before-link-top-right";
var AFTER_LINK_TOP_LEFT = "after-link-top-left";
var AFTER_LINK_TOP_RIGHT = "after-link-top-right";
var BEFORE_LINK_BOTTOM_LEFT = "before-link-bottom-left";
var BEFORE_LINK_BOTTOM_RIGHT = "before-link-bottom-right";
var AFTER_LINK_BOTTOM_LEFT = "after-link-bottom-left";
var AFTER_LINK_BOTTOM_RIGHT = "after-link-bottom-right";

var BoardHexagonClass = Object.assign({}, BoardAbstract.Class, {

    displayName: 'BoardHexagon',

    lastXY: {x: 0, y: 0},

    getInitialState: function () {
        var state = BoardAbstract.Class.getInitialState.apply(this);
        state.boardType = "board-hexagon";

        return state;
    },

    componentDidMount: function () {
        var cellSize = this.calculateCellSize();
        var smallerCellSize = this.calculateSmallerCellSize(cellSize);
        var coordinatesTable = this.createCoordinatesTable(smallerCellSize);

        this.setState({
            cellSize: cellSize,
            smallerCellSize: smallerCellSize,
            coordinatesTable: coordinatesTable
        });
    },

    calculateSmallerCellSize: function (cellSize) {
        return (cellSize * (this.state.boardData.board.cols - 0.5)) / this.state.boardData.board.cols;
    },

    createCoordinatesTable: function (smallerCellSize) {
        var table = {
            y: {
                //0: {
                //    begin: 0,
                //    end: 10,
                //    x: {
                //        0: {begin: 0, end: 10},
                //        1: {begin: 11, end: 20}
                //    }
                //},
                //1: {
                //    begin: 11,
                //    end: 20,
                //    x: {
                //        0: {begin: 0, end: 10},
                //        1: {begin: 11, end: 20}
                //    }
                //}
            }
        };

        var rows = this.state.boardData.board.rows;
        var cols = this.state.boardData.board.cols;

        var cellWidthX = smallerCellSize;
        var cellHeightY = (0.5774 * smallerCellSize);

        var marginTop = smallerCellSize * 0.2555;
        var marginLeft = smallerCellSize * 0.485;

        //first row
        var lastEndY = cellHeightY;
        table.y[0] = {begin: 0, end: lastEndY, x: {}};
        var lastEndX = 0;
        for (var l = 0; l < cols; l++) {
            var endX = lastEndX + cellWidthX;
            table.y[0].x[l] = {
                begin: lastEndX,
                end: endX
            };
            lastEndX = endX;
        }

        for (var i = 1; i < rows; i++) {
            //y
            var endY = lastEndY + marginTop + cellHeightY;
            table.y[i] = {
                begin: lastEndY + marginTop,
                end: endY,
                x: {}
            };
            lastEndY = endY;

            //x
            var firstBeginX = 0;
            if (i % 2 != 0) {
                firstBeginX = marginLeft;
            }
            lastEndX = firstBeginX + cellWidthX;
            table.y[i].x[0] = {
                begin: firstBeginX,
                end: lastEndX
            };
            for (var j = 1; j < cols; j++) {
                endX = lastEndX + cellWidthX;
                table.y[i].x[j] = {
                    begin: lastEndX,
                    end: endX
                };
                lastEndX = endX;
            }
        }

        //console.log(table);

        return table;
    },

    checkWhichRules: function (x, y, prevX, prevY) {
        var result = false;

        if (Math.abs(x - prevX) <= 1 && Math.abs(y - prevY) <= 1) {
            result =  true;
        }

        if (y % 2 != 0) {
            if (Math.abs(y - prevY) == 1 && x - prevX == 1) {
                result = false;
            }
        } else {
            if (Math.abs(y - prevY) == 1 && x - prevX == -1) {
                result = false;
            }
        }

        return result;
    },

    addLinksToSelectedLetter: function (boardArr, x, y, prevX, prevY) {
        if (x == prevX + 1 && y == prevY) {
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_LEFT;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_RIGHT;
        }
        if (x == prevX - 1 && y == prevY) {
            boardArr[y][x].classNames.linkBefore = BEFORE_LINK_RIGHT;
            boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_LEFT;
        }

        if (y % 2 != 0) {
            console.log("y % 2 != 0");
            if (y == prevY + 1) {
                if (x == prevX) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_TOP_LEFT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM_RIGHT;
                }
                if (x == prevX - 1) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_TOP_RIGHT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM_LEFT;
                }
            }
            if (y == prevY - 1) {
                if (x == prevX) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM_LEFT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP_RIGHT;
                }
                if (x == prevX - 1) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM_RIGHT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP_LEFT;
                }
            }
        } else {
            if (y == prevY + 1) {
                if (x == prevX) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_TOP_RIGHT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM_LEFT;
                }
                if (x == prevX + 1) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_TOP_LEFT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_BOTTOM_RIGHT;
                }
            }
            if (y == prevY - 1) {
                if (x == prevX) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM_RIGHT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP_LEFT;
                }
                if (x == prevX + 1) {
                    boardArr[y][x].classNames.linkBefore = BEFORE_LINK_BOTTOM_LEFT;
                    boardArr[prevY][prevX].classNames.linkAfter = AFTER_LINK_TOP_RIGHT;
                }
            }
        }
    },

    calcWhichCellIsTouched: function (e) {
        var screenX = e.touches[0].clientX;
        var screenY = e.touches[0].clientY;

        var clientRect = e.currentTarget.getBoundingClientRect();

        var boardX = screenX - clientRect.left;
        var boardY = screenY - clientRect.top;

        //console.log({boardX: boardX, boardY: boardY});

        var coordinatesTable = this.state.coordinatesTable;

        var lastY = this.lastXY.y;
        var lastX = this.lastXY.x;
        if (boardY < coordinatesTable.y[lastY].end && boardY > coordinatesTable.y[lastY].begin) {
            if (boardX < coordinatesTable.y[lastY].x[lastX].end && boardX > coordinatesTable.y[lastY].x[lastX].begin) {
                return {x: lastX, y: lastY};
            }
        }

        var y = false;
        var x = false;
        for (var k in coordinatesTable.y) {
            if (!coordinatesTable.y.hasOwnProperty(k)) {
                continue;
            }
            if (boardY < coordinatesTable.y[k].end && boardY > coordinatesTable.y[k].begin) {
                y = k;
                for (var l in coordinatesTable.y[k].x) {
                    if (!coordinatesTable.y[k].x.hasOwnProperty(l)) {
                        continue;
                    }
                    if (boardX < coordinatesTable.y[k].x[l].end && boardX > coordinatesTable.y[k].x[l].begin) {
                        x = l;
                    }
                }
            }
        }

        //console.log({x: x, y: y});

        if (x !== false && y !== false) {
            this.lastXY = {x: x, y: y};
            return {x: x, y: y};
        }

        return false;
    },

    render: function () {

        //console.log({prevSelectedLetters: this.state.prevSelectedLetters});
        //console.log({stateBoard: this.state.board});
        //console.log({wordsToFind: this.state.wordsToFind});
        //console.log({boardArr: this.state.boardArr});
        //console.log({selectedLetters: this.state.selectedLetters});

        //var smallerCellSize = (this.state.cellSize * (this.state.boardData.board.cols - 0.5)) / this.state.boardData.board.cols;
        //console.log('smallerCellSize', smallerCellSize);

        //console.log(this.state.smallerCellSize);

        var boardArr = this.state.boardArr;
        var smallerCellSize = this.state.smallerCellSize;

        var gameBoardStyle = {
            paddingTop: 1 + "px",
            paddingBottom: 1 + "px"
        };

        var boardStyle = {
            fontSize: (smallerCellSize / 2) + "px",
            width: this.state.cellSize * (this.state.boardData.board.cols /*- 1*/) + "px",
            marginTop: (smallerCellSize * 0.2555) + "px",
            marginBottom: (smallerCellSize * 0.2555) + "px"
        };

        return (
            <div className={classNames("game-board", this.state.boardExtraClass, this.state.boardType)}
                 style={gameBoardStyle}
            >
                <div ref="board"
                     className="board"
                     onTouchStart={this.onTouchStart}
                     onTouchMove={this.onTouchMove}
                     onTouchEnd={this.onTouchEnd}
                     onTouchCancel={this.onTouchCancel}
                     style={boardStyle}>

                    {boardArr.map(function (row, rowId) {
                        var rowStyle = {
                            marginTop: (smallerCellSize * 0.2555) + 'px',
                            zIndex: rowId + 1
                        };
                        if (rowId % 2 != 0) {
                            rowStyle.marginLeft = (smallerCellSize * 0.485) + 'px';
                        }

                        return (
                            <div className="row" key={rowId} style={rowStyle}>

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
                                        <LetterA2 key={rowId + '_' + cellId}
                                                  rowId={rowId} cellId={cellId}
                                                  classNames={letterClassNames}
                                                  cellSize={smallerCellSize}>
                                            {cell.letter}
                                        </LetterA2>
                                    );
                                }.bind(this))}

                            </div>
                        );
                    }.bind(this))}

                </div>
            </div>
        );
    }

});
module.exports.BoardHexagon = React.createClass(BoardHexagonClass);
module.exports.BoardHexagon.Class = BoardHexagonClass;


var LetterA2Class = Object.assign({}, Letter.Class, {
    displayName: 'LetterA2',


    getInitialState: function () {
        var state = Letter.Class.getInitialState.apply(this);

        return state;
    },

    render: function () {
        var cellStyle = {
            width: this.props.cellSize + "px",
            height: (0.5774 * this.props.cellSize) + "px",
            lineHeight: (0.5774 * this.props.cellSize) + "px",
            marginTop: 0.2887 + 'px',
            marginBottom: 0.2887 + 'px',
            zIndex: (this.props.rowId + 1) * this.props.cellId
        };

        var topTriangleStyle = {
            width: (0.7071 * this.props.cellSize) + "px",
            height: (0.7071 * this.props.cellSize) + "px",
            left: ((0.136447 * this.props.cellSize) - 1) + "px",
            top: (-0.353553 * this.props.cellSize) + "px"
        };

        var bottomTriangleStyle = {
            width: (0.7071 * this.props.cellSize) + "px",
            height: (0.7071 * this.props.cellSize) + "px",
            left: ((0.136447 * this.props.cellSize) - 1) + "px",
            bottom: (-0.353553 * this.props.cellSize) + "px"
        };

        return (
            <div className={classNames(this.props.classNames, "letter")} style={cellStyle}>
                <div className="top-triangle" style={topTriangleStyle}></div>
                {this.props.children}
                <div className="bottom-triangle" style={bottomTriangleStyle}></div>
            </div>
        );
    }

});
var LetterA2 = React.createClass(LetterA2Class);

