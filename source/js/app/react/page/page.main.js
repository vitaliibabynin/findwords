"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;
var Swiper = require('./../component/app.swiper').Swiper;
var Navigation = require('./../component/app.menu').Navigation;
var AdSwitch = require('./../libs/react-switch-button');


var PageMain = Object.assign({}, {}, {

    mixins: [GameMixin],

    displayName: 'PageMain',

    getInitialState: function () {
        var state = {
            initialSlide: parseInt(router.getParam('roundsBundleIdx')) || 0
        };

        return state;
    },

    //componentDidMount: function () {
    //
    //},
    //
    //componentDidUpdate: function (prevProps, prevState) {
    //
    //},
    //
    //componentWillUnmount: function () {
    //
    //},

    render: function () {

        console.log(appManager.getGameState().getRoundsBundles());

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

                    <Counters />

                    <div className="main">
                        <Swiper initialSlide={this.state.initialSlide}/>
                        <Navigation />
                    </div>

                    <div className="footer">
                        <AdSwitch defaultChecked="checked" label={i18n._('switch.ad')}/>
                    </div>

                </div>

            </div>

        );
    }
});
module.exports = React.createClass(PageMain);
module.exports.Class = PageMain;