"use strict";


//var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;


var PageGameMain = Object.assign({}, {}, {

    //mixins: [GameMixin],
    displayName: 'PageGameMain',

    //getInitialState: function(){
    //
    //    var state = {
    //
    //        //roundIdx: router.getParam('roundidx') || 0
    //
    //    };
    //
    //    return state;
    //},
    //
    //componentDidMount: function() {
    //
    //},
    //
    //componentDidUpdate: function(prevProps, prevState) {
    //
    //},
    //
    //componentWillUnmount: function() {
    //
    //},

    render: function() {

        return (
            <div className="page-main">
                <div className="page-content">

                    <Counters isDisplayBackButton={true} />

                    <div className="timer">

                    </div>

                    <div className="chips">
                        <div className="open-word"></div>
                        <div className="open-letter"></div>
                        <div className="show-word"></div>
                    </div>

                    <div className="game">

                    </div>

                    <div className="ad">

                    </div>

                </div>
            </div>
        );
    }
});
module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;