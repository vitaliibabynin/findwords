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
var DOLLAR = require('./../component/app.button').DOLLAR;
var PRODUCT = require('./../../model/app.store').PRODUCT;


var PageShop = Object.assign({}, {}, {

    displayName: 'PageShop',
    mixins: [GameMixin],

    getInitialState: function () {
        return {
            initialSlide: parseInt(router.getParam('initialSlide')) || 0,
            purchases: appManager.getSettings().getPurchases() || [
                {id: '', coins: 0},
                {id: '', coins: 0},
                {id: '', coins: 0},
                {id: '', coins: 0},
                {id: '', coins: 0}
            ],
            freeCoins: appManager.getSettings().getFreeCoins() || {
                watchVideo: {coins: 0},
                shareWithFrinds: {coins: 0}
            }
        };
    },

    onClickBuyCoins: function (e) {
        console.log(e.target.id);

        //var purchaseID = e.target.id;
        //appStore.order(purchaseID);
    },

    onClickWatchVideo: function () {
        console.log("watch a video");
    },

    onClickShare: function () {
        console.log("share with friends");
    },

    getData: function () {
        var purchases = this.state.purchases;

        //console.log(appStore.getProductPrice(PRODUCT.COINS_50));
        //console.log(appStore.getProduct(PRODUCT.COINS_50));

        return [
            {
                id: PRODUCT.COINS_50,
                coins: PRODUCT.COINS_50 == purchases[0].id ? purchases[0].coins : "n/a",
                price: 1,
                image: "url('" + this.getImagePath(ONE_DOLLAR) + "')"
            },
            {
                id: PRODUCT.COINS_110,
                coins: PRODUCT.COINS_110 == purchases[1].id ? purchases[1].coins : "n/a",
                price: 1,
                image: "url('" + this.getImagePath(THREE_DOLLAR) + "')"
            },
            {
                id: PRODUCT.COINS_245,
                coins: PRODUCT.COINS_245 == purchases[2].id ? purchases[2].coins : "n/a",
                price: 1,
                image: "url('" + this.getImagePath(MANY_DOLLAR) + "')"
            },
            {
                id: PRODUCT.COINS_550,
                coins: PRODUCT.COINS_550 == purchases[3].id ? purchases[3].coins : "n/a",
                price: 1,
                image: "url('" + this.getImagePath(SACK_DOLLAR) + "')"
            },
            {
                id: PRODUCT.COINS_1100,
                coins: PRODUCT.COINS_1100 == purchases[4].id ? purchases[4].coins : "n/a",
                price: 1,
                image: "url('" + this.getImagePath(THREE_SACK_DOLLAR) + "')"
            }
        ]
    },

    //changeDotToComma: function (number) {
    //    var string = number + "";
    //
    //    return string.replace(".", ",");
    //},

    getBlock: function (i) {
        var data = this.getData()[i];

        var image = {
            backgroundImage: data.image
        };

        return (
            <div key={"block" + i} className="outer-block">
                <div id={data.id} onClick={this.onClickBuyCoins} className="inner-block buy-coins" style={image}>
                    <div className="coins">{data.coins}</div>
                    <div className="price">
                        <span>{data.price}</span>
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
                            <div onClick={this.onClickWatchVideo} className="inner-block watch-video">
                                <div className="text">{i18n._('shop.watch-video')}</div>
                                <div className="add-free-coins" style={dollar}>
                                    +{this.state.freeCoins.watchVideo.coins}</div>
                            </div>
                        </div>

                        <div className="outer-block">
                            <div onClick={this.onClickShare} className="inner-block share">
                                <div className="text">{i18n._('shop.share')}</div>
                                <div className="add-free-coins" style={dollar}>
                                    +{this.state.freeCoins.shareWithFrinds.coins}</div>
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