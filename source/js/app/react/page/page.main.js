/** @jsx React.DOM */
"use strict";
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var FbButton = require('./../component/app.button').FbButton;
var Button = require('./../component/app.button').Button;

var ScoreCounter = require('./../component/app.counter').ScoreCounter;
var CoinsCounter = require('./../component/app.counter').CoinsCounter;


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

        var headImgName = "head/head_img_" + router.getLanguage();
        var headStyle = {
            backgroundImage: "url(" + this.getImagePath(headImgName) + ")"
        };

        return (

            <div className="page-main">
                <div className="page-content">
                    <div className="head"
                        style={headStyle}>
                    </div>
                    <div className="counters">
                        <ScoreCounter value={999999} />
                        <CoinsCounter value={999999} />
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
