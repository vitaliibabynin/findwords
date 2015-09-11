"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var LetterClass = Object.assign({}, {}, {

    propTypes: {
        //key = [row, column]
        key: React.PropTypes.arrayOf(React.PropTypes.number),
        backgroundColor: React.PropTypes.string
    },

    getInitialState: function () {

        var state = {
            backgroundColor: this.props.backgroundColor || "#ffffff"
        };

        return state;

    },

    render: function () {

        var letterStyle = {
            backgroundColor: this.state.backgroundColor
        };

        return (
            <td style={letterStyle}>{this.props.children}</td>
        );

    }

});
var Letter = React.createClass(LetterClass);


var BoardClass = Object.assign({}, {}, {

    propTypes: {
        letters: React.PropTypes.array,
        backgroundColors: React.PropTypes.array
    },

    getInitialState: function () {
        var state = {
            letters: this.props.letters || [
                ['н', 'а', 'у', 'ш', 'н', 'и', 'к', 'c'],
                ['а', 'н', 'т', 'и', 'к', 'а', 'и', 'а'],
                ['м', 'о', 'р', 'г', 'л', 'а', 'м', 'н'],
                ['п', 'а', 'к', 'в', 'о', 'л', 'у', 'а'],
                ['у', 'л', 'к', 'к', 'о', 'а', 'р', 'н'],
                ['к', 'я', 'л', 'б', 'л', 'н', 'г', 'а'],
                ['а', 'в', 'о', 'а', 'с', 'а', 'а', 'к'],
                ['п', 'с', 'у', 'л', 'а', 'б', 'у', 'л']
            ],
            backgroundColors: this.props.backgroundColors || [
                ['#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', 'brown'],
                ['#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', 'brown'],
                ['#e8e8e8', '#e8e8e8', '#e8e8e8', 'purple', 'purple', 'purple', 'purple', 'brown'],
                ['green', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', 'purple', 'brown'],
                ['green', 'green', 'red', '#e8e8e8', '#e8e8e8', '#e8e8e8', 'purple', 'brown'],
                ['orange', 'green', 'red', '#e8e8e8', '#e8e8e8', '#e8e8e8', '#e8e8e8', 'brown'],
                ['orange', 'red', 'red', '#e8e8e8', '#e8e8e8', '#e8e8e8', 'cyan', 'cyan'],
                ['orange', 'orange', 'orange', 'orange', 'orange', 'cyan', 'cyan', 'cyan']
            ]
        };

        return state;
    },

    getBackgroundColor: function (rid, cid) {

        var backgroundColor = "#ffffff";

        this.state.backgroundColors.map(function (br, brid) {
            if (brid == rid) {
                br.map(function (bc, bcid) {
                    if (bcid == cid) {
                        backgroundColor = bc;
                    }
                })
            }
        });

        return backgroundColor;

    },

    render: function () {

        return (

            <table className="board">

                {this.state.letters.map(function (row, rid) {

                    return (

                        <tr>

                            {row.map(function (cell, cid) {

                                return (

                                    <Letter key={[rid, cid]} backgroundColor={this.getBackgroundColor(rid, cid)}>
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