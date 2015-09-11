"use strict";


var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');


module.exports = {};


var LetterClass = Object.assign({}, {}, {

    propTypes: {
        className: React.PropTypes.string,
        backgroundColor: React.PropTypes.string,
        letter: React.PropTypes.string
    },

    getInitialState: function () {

        var state = {
            className: this.props.className || "c?",
            backgroundColor: this.props.backgroundColor || '#ffffff',
            letter: this.props.letter || ""
        };

        return state;

    },

    render: function () {

        var letterStyle = {
            backgroundColor: this.state.backgroundColor
        };

        return (
            <td className={this.state.className} style={letterStyle}>{this.state.letter}</td>
        );

    }

});
var Letter = React.createClass(LetterClass);


var BoardClass = Object.assign({}, {}, {

    render: function () {

        return (

            <table className="board">

                <tr className="r0">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="B"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>
                <tr className="r1">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>
                <tr className="r2">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>
                <tr className="r3">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>
                <tr className="r4">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>
                <tr className="r5">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>
                <tr className="r6">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>
                <tr className="r7">
                    <Letter className="c0" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c1" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c2" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c3" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c4" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c5" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c6" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c7" backgroundColor="#ff00ff" letter="a"/>
                    <Letter className="c8" backgroundColor="#ff00ff" letter="a"/>
                </tr>

            </table>

        );

    }


});
module.exports.Board = React.createClass(BoardClass);
module.exports.Board.Class = BoardClass;