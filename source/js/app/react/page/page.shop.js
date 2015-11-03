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

var PageShop = Object.assign({}, {}, {

    displayName: 'PageShop',
    mixins: [GameMixin],

    getInitialState: function () {
        var state = {};

        return state;
    },

    onClick: function () {

    },

    getData: function () {
        return [
            {coins: 1000, price: 3.99},
            {coins: 1500, price: 4.99},
            {coins: 2000, price: 5.99},
            {coins: 2500, price: 16.99},
            {coins: 3000, price: 17.99}
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
                        <span>{this.changeDotToComma(data.price) + "$"}</span>
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

        return (

            <div className="page-shop">
                <div className="page-content">

                    <Counters isDisplayBackButton={true}/>

                    <div className="container">
                        <div className="heading">{i18n._('shop.heading')}</div>

                        {this.generateBlocks()}

                        <div className="outer-block">
                            <div className="inner-block free-coins">{i18n._('shop.free-coins')}</div>
                        </div>

                    </div>

                </div>
            </div>

        );
    }

});
module.exports = React.createClass(PageShop);
module.exports.Class = PageShop;