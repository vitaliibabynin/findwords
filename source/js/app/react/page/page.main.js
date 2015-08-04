/** @jsx React.DOM */
"use strict";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var FbButton = require('./../component/app.button').FbButton;
var Button = require('./../component/app.button').Button;
var Counter = require('./../component/app.counter').Counter;

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
        return (

            <div className = "page-main">
                <div className = "page-content">
                    <div className = "ps-all">
                        <div className = "ps-header">
                            <div className = "ps-image">
                                <div className = "cn-image">
                                    <img src=""/>
                                </div>
                            </div>
                        </div>
                        <div className = "ps-counters">
                            <div className = "ps-stars">
                                <div className = "ps-star">
                                    <div className = "cn-star">
                                        <img src=""/>
                                    </div>
                                </div>
                                <div className = "ps-counter">
                                    <div className = "cn-counter">
                                        <counter value={50}/>
                                    </div>
                                </div>
                            </div>
                            <div className = "ps-cash">
                                <div className = "ps-dollar">
                                    <div className = "cn-dollar">
                                        <img src=""/>
                                    </div>
                                </div>
                                <div className = "ps-counter">
                                    <div className = "cn-counter">
                                        999999
                                    </div>
                                </div>
                                <div className = "ps-plus">
                                    <div className = "cn-plus">
                                        <img src=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "ps-main">
                            <div className = "">
                                <div className = "">
                                    <div className = "">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "ps-footer">
                            <div className = "">
                                <div className = "">
                                    <div className = "">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    },

    render: function() {
        //return this.renderExample();
        return this.renderDisplay();
    }
});

module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;
