"use strict";


var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');


module.exports = {};


var LetterClass = Object.assign({}, {}, {

    propTypes: {
        row: React.PropTypes.number,
        column: React.PropTypes.number,
        className: React.PropTypes.string,
        addSelectedLetter: React.PropTypes.func,
        removeSelectedLetter: React.PropTypes.func,
        isSelected: React.PropTypes.bool,
        onClick: React.PropTypes.func
    },

    getInitialState: function () {

        var state = {
            row: this.props.row || 0,
            column: this.props.column || 0,
            isSelected: false
        };

        return state;

    },

    addSelectedLetter: function () {
        if (typeof this.props.addSelectedLetter === 'function') {
            this.props.addSelectedLetter(this.state.row, this.state.column);
        }
    },

    removeSelectedLetter: function () {
        if (typeof this.props.removeSelectedLetter === 'function') {
            this.props.removeSelectedLetter(this.state.row, this.state.column);
        }
    },

    onClickLetter: function (e) {

        if (typeof this.props.onClick !== 'function') {
            return false;
        }

        if (!this.props.onClick(this.state.row, this.state.column)) {
            return false;
        }

        switch (this.state.isSelected) {
            case true:
                this.setState({isSelected: false});
                this.removeSelectedLetter();
                break;
            case false:
                this.setState({isSelected: true});
                this.addSelectedLetter();
                break;
            default:
                return false;
        }

    },

    render: function () {

        var letterClasses = classNames(
            this.props.className,
            {'selected': this.state.isSelected}
        );

        return (
            <td className={letterClasses} onClick={this.onClickLetter}>
                {this.props.children}
            </td>
        );

    }

});
var Letter = React.createClass(LetterClass);


var BoardClass = Object.assign({}, {}, {

    propTypes: {
        letters: React.PropTypes.array,
        words: React.PropTypes.array
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
            words: this.props.words || [
              [[0,0],[0,1],[0,2],[0,3],[0,5],[0,6],[0,7]]
            ],
            selectedLetters: []

        };

        return state;
    },

    onClick: function (row, column) {

        if (this.state.selectedLetters.length == 0) {
            return true;
        }

        //if (this.state.selectedLetters)

        return false;
    },

    addSelectedLetter: function (row, column) {

        if (row == 'undefined' || column == 'undefined') {
            return false;
        }

        var updatedLetters = this.state.selectedLetters.slice();
        updatedLetters.push([row, column]);
        this.setState({selectedLetters: updatedLetters})

    },

    removeSelectedLetter: function (row, column) {

        if (row == 'undefined' || column == 'undefined') {
            return false;
        }

        var index;
        this.state.selectedLetters.map(function (rowColumn, rcIndex) {
            if (rowColumn[0] == row && rowColumn[1] == column) {
                index = rcIndex;
            }
        });

        console.log(index);
        var updatedLetters = this.state.selectedLetters.slice();
        updatedLetters.splice(index, 1);
        this.setState({selectedLetters: updatedLetters})

    },

    wordComplete: function () {



    },

    //getBackgroundColor: function (rid, cid) {
    //
    //    var backgroundColor = "#ffffff";
    //
    //    this.state.backgroundColors.map(function (br, brid) {
    //        if (brid == rid) {
    //            br.map(function (bc, bcid) {
    //                if (bcid == cid) {
    //                    backgroundColor = bc;
    //                }
    //            })
    //        }
    //    });
    //
    //    return backgroundColor;
    //
    //},

    letterClassName: function (rid, cid) {


        var backgroundColor = classNames(
            "connector-left"
        );

        //this.state.backgroundColors.map(function (br, brid) {
        //    if (brid == rid) {
        //        br.map(function (bc, bcid) {
        //            if (bcid == cid) {
        //                backgroundColor = bc;
        //            }
        //        })
        //    }
        //});

        return backgroundColor;

    },

    render: function () {

        console.log(this.state.selectedLetters);

        return (

            <table className="board">

                {this.state.letters.map(function (row, rid) {

                    return (

                        <tr key={rid}>

                            {row.map(function (cell, cid) {

                                return (

                                    <Letter key={rid + '_' + cid} row={rid} column={cid}
                                            addSelectedLetter={this.addSelectedLetter}
                                            removeSelectedLetter={this.removeSelectedLetter}
                                            className={this.letterClassName()}
                                            onClick={this.onClick}>
                                        {cell}
                                        <div className="hello"></div>
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
//module.exports.Board = React.createClass(BoardClass);
//module.exports.Board.Class = BoardClass;