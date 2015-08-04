/** @jsx React.DOM */
"use strict";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var FbButton = require('./../component/app.button').FbButton;
var Button = require('./../component/app.button').Button;


var PageMain = Object.assign({}, {}, {
    mixins: [PureRenderMixin, GameMixin],
    displayName: 'PageMain',

    getInitialState: function(){
        var state = {
            showHeader: false
        };

        return state;
    },

    componentDidMount: function() {

    },

    componentDidUpdate: function(prevProps, prevState) {

    },

    componentWillUnmount: function() {

    },

    onFBButtonClick: function(buttonProps){
        this.setState({showHeader: !this.state.showHeader});
    },

    onButtonClick: function(buttonProps){
        router.navigate("game", "main");
    },

    renderExample: function() {
        return (
            <div className="page-main">

                <div className="page-content">
                    <h1 className={classNames({hide: !this.state.showHeader})}>Page Main</h1>

                    <FbButton onClick={this.onFBButtonClick}>{i18n._('button.fb')}</FbButton>

                    <Button onClick={this.onButtonClick}>перейти на PageGameMain</Button>
                </div>


            </div>
        );
    },

    renderDisplay: function() {

    },

    render: function() {
        return this.renderExample();
    }
});

module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;
