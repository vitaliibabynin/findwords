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
        y: React.PropTypes.number
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

        //check if locked
        if (this.state.isLocked) {
            return false;
        }

        //if active
        if (this.state.isActive) {
            //check if link ? remove link : continue
            //make inactive
            this.setState({isActive: false});
        }

        //if not active
        if (!this.state.isActive) {

            //check if first letter ? make active, add to selected letters, return true : continue
            //check if this letter is allowed to be clicked ? continue : return false
            //check if a word has been completed ? lock, change appearance, clear selected letters : continue
            //add link
            this.setState({link: LINK_LEFT});
            //add color
            //make active

            return true;
        }

        //if active
        //remove link
        //remove color
        //make inactive
        this.setState({isActive: false});

    },

    render: function () {
        return (
            <td onClick={this.onClick}>
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
            }
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

    render: function () {

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

                                    <Letter key={rowId + '_' + cellId} x={rowId} y={cellId}>
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