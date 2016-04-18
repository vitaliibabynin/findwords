"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var BoardAbstract = require('./app.board.abstract').BoardAbstract;
var Letter = require('./app.board.abstract').Letter;

module.exports = {};

var BoardA2Class = Object.assign({}, BoardAbstract.Class, {

    displayName: 'BoardA2',

    getInitialState: function () {
        var state = BoardAbstract.Class.getInitialState.apply(this);
        state.boardType = "board-a2";

        return state;
    },

    checkWhichRules: function (x, y, prevX, prevY) {
        return (Math.abs(x - prevX) <= 1 && Math.abs(y - prevY) <= 1);
    },

    chooseRowMargin: function (rowId, smallerCellSize) {
        var rowStyles = {};

        var top = smallerCellSize * 0.18 * rowId * -1;

        if (rowId % 2 != 0) {
            rowStyles.WebkitTransform = "translate(" + smallerCellSize * 0.23 + "px, "+top+"px)";
            rowStyles.transform = "translate(" + smallerCellSize * 0.23 + "px, "+top+"px)";
        } else {
            rowStyles.WebkitTransform = "translate(" + (-smallerCellSize * 0.25) + "px, "+top+"px)";
            rowStyles.transform = "translate(" + (-smallerCellSize * 0.25) + "px, "+top+"px)";
        }
        return rowStyles;
    },

    render: function () {

        //console.log({prevSelectedLetters: this.state.prevSelectedLetters});
        //console.log({stateBoard: this.state.board});
        //console.log({wordsToFind: this.state.wordsToFind});
        //console.log({boardArr: this.state.boardArr});
        //console.log({selectedLetters: this.state.selectedLetters});

        var smallerCellSize = (this.state.cellSize * (this.state.boardData.board.cols - 0.5)) / this.state.boardData.board.cols;
        console.log('smallerCellSize', smallerCellSize);

        var gameBoardStyle = {
            paddingTop: 1 + "px",
            paddingBottom: 1 + "px"
        };


        var boardArr = this.state.boardArr;
        var boardStyle = {
            fontSize: (smallerCellSize / 2) + "px",
            width: this.state.cellSize * (this.state.boardData.board.cols /*- 1*/) + "px",
            marginTop: ((0.7071 * (0.5774 * smallerCellSize)) - 1) + "px",
            marginBottom: (0.7071 * (0.5774 * smallerCellSize)) + "px"
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
                        //style={this.chooseRowMargin(rowId, smallerCellSize)}
                        var rowStyle = {
                            marginTop: (smallerCellSize * 0.2555) +'px',
                            zIndex: rowId+1
                        };
                        if(rowId % 2 != 0){
                            rowStyle.marginLeft = (smallerCellSize * 0.485) +'px';
                        }

                        return (
                            <div className="row" key={rowId} style={rowStyle} >

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
module.exports.BoardA2 = React.createClass(BoardA2Class);
module.exports.BoardA2.Class = BoardA2Class;


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
            marginTop: 0.2887+'px',
            marginBottom: 0.2887+'px',
            zIndex: (this.props.rowId+1) * this.props.cellId
        };

        var topTriangleStyle = {
            width: (0.7071 * this.props.cellSize) + "px",
            height: (0.7071 * this.props.cellSize) + "px",
            left: ((0.136447 * this.props.cellSize)-1) + "px",

            top: (-0.353553 * this.props.cellSize) + "px"
            //borderTopWidth: (0.70711 * hexagramSize) + "px",
            //borderRightWidth: (0.70711 * hexagramSize) + "px"
        };

        var bottomTriangleStyle = {
            width: (0.7071 * this.props.cellSize) + "px",
            height: (0.7071 * this.props.cellSize) + "px",
            left: ((0.136447 * this.props.cellSize)-1) + "px",

            bottom: (-0.353553 * this.props.cellSize) + "px"
            //borderBottomWidth: (0.70711 * hexagramSize) + "px",
            //borderLeftWidth: (0.70711 * hexagramSize) + "px"
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

