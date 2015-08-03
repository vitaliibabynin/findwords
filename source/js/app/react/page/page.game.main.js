/** @jsx React.DOM */
"use strict";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Button = require('./../component/app.button').Button;


var PageGameMain = Object.assign({}, {}, {
    mixins: [PureRenderMixin, GameMixin],
    displayName: 'PageGameMain',

    getInitialState: function(){
        var state = {

        };

        return state;
    },

    componentDidMount: function() {

    },

    componentDidUpdate: function(prevProps, prevState) {

    },

    componentWillUnmount: function() {

    },

    onButtonClick: function(buttonProps){
        router.navigate("main", "index");
    },

    render: function() {

        return (
            <div className="page-main">

                <div className="page-content">
                    <h1 >Page Game Main</h1>

                    <Button onClick={this.onButtonClick}>На главную</Button>
                </div>


            </div>
        );
    }
});

module.exports = React.createClass(PageGameMain);
module.exports.Class = PageGameMain;
