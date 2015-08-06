/** @jsx React.DOM */
"use strict";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var FbButton = require('./../component/app.button').FbButton;
var Button = require('./../component/app.button').Button;

//var Head = require('./../component/app.head').Head;

var StarCounter = require('./../component/app.counter').StarCounter;
var CashCounter = require('./../component/app.counter').CashCounter;


var PageMain = Object.assign({}, {}, {
    mixins: [PureRenderMixin, GameMixin],
    displayName: 'PageMain',

    getInitialState: function () {
        var state = {
            showHeader: false
        };

        return state;
    },

    componentDidMount: function () {

    },

    componentDidUpdate: function (prevProps, prevState) {

    },

    componentWillUnmount: function () {

    },

    onFBButtonClick: function (buttonProps) {
        this.setState({showHeader: !this.state.showHeader});
    },

    onButtonClick: function (buttonProps) {
        router.navigate("game", "main");
    },

    renderExample: function () {
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

    renderDisplay: function () {

        var lang = router.getLanguage();
        var imgName = "head/head_img_" + lang;
        var url = "url(" + this.getImagePath(imgName) + ")";

        var style = {
            backgroundImage: url
        };

        return (

            <div className="page-main">
                <div className="page-content">
                    <div className="head"
                        style={style}>
                    </div>
                    <div className="counters">
                        <div className="stars">
                            <div className="star">
                                <img src=""/>
                            </div>
                            <StarCounter />
                        </div>
                        <div className="cash">
                            <div className="dollar">
                                <img src=""/>
                            </div>
                            <CashCounter />

                            <div className="plus">
                                <img src=""/>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <div className="swiper">
                            /*swiper-element*/
                        </div>
                        <div className="navigation">
                            <div className="settings">
                                /*settings-element*/
                            </div>
                            <div className="rating">
                                /*link to ratings*/
                            </div>
                            <div className="facebook">
                                /*facebook-element*/
                            </div>
                            <div className="shop">
                                /*link to shop*/
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="advertisement-switch">
                            <div className="advertisement">
                                /*babelfish-element*/
                            </div>
                            <div className="switch">
                                /*switch-element*/
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    },

    render: function () {
        //return this.renderExample();
        return this.renderDisplay();
    }
});

module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;
