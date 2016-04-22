"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var BoardA1 = require('./app.board.a1').BoardA1;
var BoardA2 = require('./app.board.a2').BoardA2;


module.exports = {};


var GameControlClass = Object.assign({}, {}, {
    displayName: 'GameControl',

    propTypes: {
        boardMaxHeight: React.PropTypes.number,
        boardData: React.PropTypes.shape({
            board: React.PropTypes.shape({
                rows: React.PropTypes.number,
                cols: React.PropTypes.number
            }),
            words: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    letters: React.PropTypes.arrayOf(
                        React.PropTypes.shape({
                            x: React.PropTypes.number,
                            y: React.PropTypes.number,
                            letter: React.PropTypes.string
                        })
                    )
                })
            )
        }),
        board: React.PropTypes.object,
        displayNotice: React.PropTypes.func,
        setGameStateRoundField: React.PropTypes.func,
        goToPageRoundComplete: React.PropTypes.func
    },

    getInitialState: function () {
        var state = {
            boardMaxHeight: this.props.boardMaxHeight || 0,
            boardData: this.props.boardData || {},
            board: this.props.board || {},
            displayNotice: this.props.displayNotice || function () {
            },
            setGameStateRoundField: this.props.setGameStateRoundField || function () {
            },
            goToPageRoundComplete: this.props.goToPageRoundComplete || function () {
            }
        };

        return state;
    },

    emptySelectedLetters: function () {
        this.refs.board.emptySelectedLetters();
    },

    render: function () {

        return (
            <BoardA2
                ref="board"
                boardMaxHeight={this.state.boardMaxHeight}
                boardData={this.state.boardData}
                board={this.state.board}
                displayNotice={this.state.displayNotice}
                setGameStateRoundField={this.state.setGameStateRoundField}
                goToPageRoundComplete={this.state.goToPageRoundComplete}
            />
        );

    }

});
module.exports.GameControl = React.createClass(GameControlClass);
module.exports.GameControl.Class = GameControlClass;
