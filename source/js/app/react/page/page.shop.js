"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;

var Object = {assign: require('react/lib/Object.assign')};
//var classNames = require('classnames');

var Counters = require('./../component/app.counters').Counters;

var ONE_DOLLAR = 'shop/one_dollar';
var THREE_DOLLAR = 'shop/three_dollar';
var MANY_DOLLAR = 'shop/many_dollar';
var SACK_DOLLAR = 'shop/sack_dollar';
var THREE_SACK_DOLLAR = 'shop/three_sack_dollar';
var DOLLAR = 'counter/coins';
var CURRENCY = ' UAH ';
var COINS_FOR_WATCHING_VIDEO = 50;
var COINS_FOR_SHARING_WITH_FRIENDS = 100;

var PageShop = Object.assign({}, {}, {

    displayName: 'PageShop',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {
            initialSlide: parseInt(router.getParam('initialSlide')) || 0
        };

        return state;
    },

    onClick: function () {

    },

    getData: function () {
        return [
            {coins: 1000, price: 3.99},
            {coins: 1500, price: 4.99},
            {coins: 2000, price: 5.99},
            {coins: 2500, price: 160.99},
            {coins: 3000, price: 1700.99}
        ]
    },

    changeDotToComma: function (number) {
        var string = number + "";

        return string.replace(".", ",");
    },

    getImages: function () {
        return [
            "url('" + this.getImagePath(ONE_DOLLAR) + "')",
            "url('" + this.getImagePath(THREE_DOLLAR) + "')",
            "url('" + this.getImagePath(MANY_DOLLAR) + "')",
            "url('" + this.getImagePath(SACK_DOLLAR) + "')",
            "url('" + this.getImagePath(THREE_SACK_DOLLAR) + "')"
        ]
    },

    getBlock: function (i) {
        var image = {
            backgroundImage: this.getImages()[i]
        };

        var data = this.getData()[i];

        return (
            <div key={"block" + i} className="outer-block">
                <div className="inner-block buy-coins" style={image}>
                    <div className="coins">{data.coins}</div>
                    <div className="price">
                        <span>{this.changeDotToComma(data.price) + CURRENCY}</span>
                    </div>
                </div>
            </div>
        );
    },

    generateBlocks: function () {
        var blocksRender = new Array(5);

        for (var i = 0; i < 5; i++) {
            blocksRender[i] = this.getBlock(i);
        }

        return blocksRender;
    },

    render: function () {

        var dollar = {
            backgroundImage: "url('" + this.getImagePath(DOLLAR) + "')"
        };

        return (

            <div className="page-shop">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">

                        <div className="heading free-coins">{i18n._('shop.free-coins')}</div>

                        <div className="outer-block">
                            <div className="inner-block watch-video">
                                <div className="text">{i18n._('shop.watch-video')}</div>
                                <div className="add-free-coins" style={dollar}>+{COINS_FOR_WATCHING_VIDEO}</div>
                            </div>
                        </div>

                        <div className="outer-block">
                            <div className="inner-block share">
                                <div className="text">{i18n._('shop.share')}</div>
                                <div className="add-free-coins" style={dollar}>+{COINS_FOR_SHARING_WITH_FRIENDS}</div>
                            </div>
                        </div>

                        <div className="heading buy-coins">{i18n._('shop.buy-coins')}</div>

                        {this.generateBlocks()}

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageShop);
module.exports.Class = PageShop;