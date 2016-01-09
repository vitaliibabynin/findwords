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
var FreeCoins = require('./../component/app.button').FreeCoins;
var BuyCoins = require('./../component/app.button').BuyCoins;


var PageShop = Object.assign({}, {}, {

    displayName: 'PageShop',
    mixins: [GameMixin],

    getInitialState: function () {
        return {
            initialSlide: parseInt(router.getParam('initialSlide')) || 0,
            purchases: appManager.getSettings().getPurchases() || {},
            freeCoins: appManager.getSettings().getFreeCoins() || {
                watchVideo: 0,
                sendInvite: 0
            }
        };
    },

    componentDidMount: function () {
        appManager.getGameState().addChangeCoinsListener(this.update);
    },

    componentWillUnmount: function () {
        appManager.getGameState().removeChangeCoinsListener(this.update);
    },

    update: function () {
        this.forceUpdate();
    },

    onClickBuyCoins: function (buttonProps) {
        //appManager.getGameState().addCoins(this.state.purchases[buttonProps.blockId]);

        console.log(buttonProps.blockId);

        var purchaseID = buttonProps.blockId;
        appStore.order(purchaseID);
    },

    onClickWatchVideo: function () {
        appManager.getGameState().addCoins(this.state.freeCoins.watchVideo);

        console.log("watch a video");
    },

    onClickShare: function () {
        appManager.getGameState().addCoins(this.state.freeCoins.sendInvite);

        console.log("share with friends");
    },

    getProductPrice: function (productId) {
        if (typeof(appStore.getProduct(productId)) == "undefined") {
            return 0;
        }

        return appStore.getProductPrice(productId);
    },

    getProductCoins: function (productId) {
        var purchases = this.state.purchases;

        for (var i = 0; i < purchases.length; i++) {
            if (purchases[i].purchaseId == productId) {
                return purchases[i].purchaseCoins;
            }
        }

        return 0;
    },

    getData: function () {
        //console.log(appStore.getProductPrice(PRODUCT.COINS.COINSPACK_1));
        //console.log(appStore.getProduct(PRODUCT.COINS.COINSPACK_1));

        //var platform = CONST.CURRENT_PLATFORM.toUpperCase();
        //
        //if (platform == "ANDROID" || platform == "IOS") {
        //    var product = PRODUCT.COINS[platform];
        //
        //    return [
        //        {
        //            id: product.COINSPACK_1,
        //            coins: this.getProductCoins(product.COINSPACK_1),
        //            price: this.getProductPrice(product.COINSPACK_1),
        //            image: "url('" + this.getImagePath(ONE_DOLLAR) + "')"
        //        },
        //        {
        //            id: product.COINSPACK_2,
        //            coins: this.getProductCoins(product.COINSPACK_2),
        //            price: this.getProductPrice(product.COINSPACK_2),
        //            image: "url('" + this.getImagePath(THREE_DOLLAR) + "')"
        //        },
        //        {
        //            id: product.COINSPACK_3,
        //            coins: this.getProductCoins(product.COINSPACK_3),
        //            price: this.getProductPrice(product.COINSPACK_3),
        //            image: "url('" + this.getImagePath(MANY_DOLLAR) + "')"
        //        },
        //        {
        //            id: product.COINSPACK_4,
        //            coins: this.getProductCoins(product.COINSPACK_4),
        //            price: this.getProductPrice(product.COINSPACK_4),
        //            image: "url('" + this.getImagePath(SACK_DOLLAR) + "')"
        //        },
        //        {
        //            id: product.COINSPACK_5,
        //            coins: this.getProductCoins(product.COINSPACK_5),
        //            price: this.getProductPrice(product.COINSPACK_5),
        //            image: "url('" + this.getImagePath(THREE_SACK_DOLLAR) + "')"
        //        }
        //    ]
        //}
        //
        //return [
        //    {
        //        id: "",
        //        coins: 0,
        //        price: "$0",
        //        image: "url('" + this.getImagePath(ONE_DOLLAR) + "')"
        //    },
        //    {
        //        id: "",
        //        coins: 0,
        //        price: "$0",
        //        image: "url('" + this.getImagePath(THREE_DOLLAR) + "')"
        //    },
        //    {
        //        id: "",
        //        coins: 0,
        //        price: "$0",
        //        image: "url('" + this.getImagePath(MANY_DOLLAR) + "')"
        //    },
        //    {
        //        id: "",
        //        coins: 0,
        //        price: "$0",
        //        image: "url('" + this.getImagePath(SACK_DOLLAR) + "')"
        //    },
        //    {
        //        id: "",
        //        coins: 0,
        //        price: "$0",
        //        image: "url('" + this.getImagePath(THREE_SACK_DOLLAR) + "')"
        //    }
        //]


        var product = PRODUCT.COINS;

        return [
            {
                id: product.COINSPACK_1,
                coins: this.getProductCoins(product.COINSPACK_1),
                price: this.getProductPrice(product.COINSPACK_1),
                image: "url('" + this.getImagePath(ONE_DOLLAR) + "')"
            },
            {
                id: product.COINSPACK_2,
                coins: this.getProductCoins(product.COINSPACK_2),
                price: this.getProductPrice(product.COINSPACK_2),
                image: "url('" + this.getImagePath(THREE_DOLLAR) + "')"
            },
            {
                id: product.COINSPACK_3,
                coins: this.getProductCoins(product.COINSPACK_3),
                price: this.getProductPrice(product.COINSPACK_3),
                image: "url('" + this.getImagePath(MANY_DOLLAR) + "')"
            },
            {
                id: product.COINSPACK_4,
                coins: this.getProductCoins(product.COINSPACK_4),
                price: this.getProductPrice(product.COINSPACK_4),
                image: "url('" + this.getImagePath(SACK_DOLLAR) + "')"
            },
            {
                id: product.COINSPACK_5,
                coins: this.getProductCoins(product.COINSPACK_5),
                price: this.getProductPrice(product.COINSPACK_5),
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
                <BuyCoins blockId={data.id} onClick={this.onClickBuyCoins} className="inner-block buy-coins"
                          style={image}>
                    <div className="coins">{data.coins}</div>
                    <div className="price">
                        <span>{data.price}</span>
                    </div>
                </BuyCoins>
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
                            <FreeCoins onClick={this.onClickWatchVideo} className="inner-block watch-video">
                                <div className="text">{i18n._('shop.watch-video')}</div>
                                <div className="add-free-coins" style={dollar}>
                                    +{this.state.freeCoins.watchVideo}</div>
                            </FreeCoins>
                        </div>

                        <div className="outer-block">
                            <FreeCoins onClick={this.onClickShare} className="inner-block share">
                                <div className="text">{i18n._('shop.share')}</div>
                                <div className="add-free-coins" style={dollar}>
                                    +{this.state.freeCoins.sendInvite}</div>
                            </FreeCoins>
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