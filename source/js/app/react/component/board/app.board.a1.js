"use strict";

var Object = {assign: require('react/lib/Object.assign')};

var BoardAbstract = require('./app.board.abstract').BoardAbstract;

module.exports = {};

var BoardA1Class = Object.assign({}, BoardAbstract.Class, {

    displayName: 'BoardA1',

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
module.exports.BoardA1 = React.createClass(BoardA1Class);
module.exports.BoardA1.Class = BoardA1Class;
