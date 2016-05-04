"use strict";

var Object = {assign: require('react/lib/Object.assign')};

var BoardAbstract = require('./app.board.abstract').BoardAbstract;

module.exports = {};

var BoardSquareClass = Object.assign({}, BoardAbstract.Class, {

    displayName: 'BoardSquare',

    getInitialState: function () {
        var state = BoardAbstract.Class.getInitialState.apply(this);
        state.boardType = "board-a1";

        return state;
    },

    checkWhichRules: function (x, y, prevX, prevY) {
        if (y == prevY + 1 && x == prevX) {
            return true;
        }
        if (y == prevY - 1 && x == prevX) {
            return true;
        }
        if (x == prevX + 1 && y == prevY) {
            return true;
        }
        if (x == prevX - 1 && y == prevY) {
            return true;
        }

        return false;
    },

    render: function () {
        return BoardAbstract.Class.render.apply(this);
    }

});
module.exports.BoardSquare = React.createClass(BoardSquareClass);
module.exports.BoardSquare.Class = BoardSquareClass;
