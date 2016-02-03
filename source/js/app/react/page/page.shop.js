"use strict";


var GameMixin = require('./../component/app.mixin').GameMixin;
var Object = {assign: require('react/lib/Object.assign')};
var classNames = require('classnames');
var moment = require('moment');

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
            containerExtraClass: [],
            initialSlide: parseInt(router.getParam('initialSlide')) || 0,
            purchases: appManager.getSettings().getPurchases() || {},
            freeCoins: appManager.getSettings().getFreeCoins() || {
                watchVideo: 0,
                share: 0
            },
            dollar: {
                backgroundImage: "url('" + this.getImagePath(DOLLAR) + "')"
            }
        };
    },

    componentDidMount: function () {
        appManager.getGameState().addChangeCoinsListener(this.update);

        //console.log(this.refs.container.getDOMNode());

        var $pageContent = $(this.refs.pageContent.getDOMNode());
        console.log(this.refs.pageContent.getDOMNode().clientHeight);
        console.log($pageContent.css('padding-bottom'));
        console.log(this.refs.pageContent.getDOMNode().clientHeight - $pageContent.css('padding-bottom'));
        if(this.refs.pageContent.getDOMNode().clientHeight - $pageContent.css('padding-bottom')  > this.refs.container.getDOMNode().offsetHeight){
            this.state.containerExtraClass.push('transform-center');
            this.setState({containerExtraClass: this.state.containerExtraClass});
        }
    },

    componentWillUnmount: function () {
        appManager.getGameState().removeChangeCoinsListener(this.update);
    },

    update: function () {
        this.forceUpdate();
    },

    onClickBuyCoins: function (buttonProps) {
        //appManager.getGameState().addCoins(this.state.purchases[buttonProps.blockId]);
        //console.log(buttonProps.blockId);

        var purchaseID = buttonProps.blockId;
        appStore.order(purchaseID);
    },

    onClickWatchVideo: function () {
        appAd.hideBanner();
        appAnalytics.trackEvent('ad', 'video_start', '', 1);
        appAd.showRewardedVideo().then(function () {
            appManager.getGameState().addCoins(this.state.freeCoins.watchVideo);
            appDialogs.getInfoDialog()
                .setTitle(i18n._('app.dialog.info.addcoins.title'))
                .setContentText(i18n._('app.dialog.info.addcoins.description', this.state.freeCoins.watchVideo))
                .show();
            appAnalytics.trackEvent('ad', 'video_success', '', 1);
            appAd.showBottomBanner();
        }.bind(this), function () {
            appDialogs.getInfoDialog()
                .setTitle(i18n._('app.dialog.info.rewardedvideo.notfound.title'))
                .setContentText(i18n._('app.dialog.info.rewardedvideo.notfound.description'))
                .show();
            appAnalytics.trackEvent('ad', 'video_notfound', '', 1);
            appAd.showBottomBanner();
        }.bind(this));
    },

    onClickInviteFriends: function () {
        appDialogs.getInviteFriendsDialog().show();
    },

    onClickShare: function () {
        appFB.share().then(function (result) {
            //console.log({result: result});

            //set lastShareDateString to now
            var todayDateString = moment().format("YYYYMMDD") || "";
            //var todayDateString = moment().format("YYYYMMDDHHmmss") || "";
            appManager.getGameState().setLastShareDate(todayDateString);

            appManager.getGameState().addCoins(this.state.freeCoins.share);
            appDialogs.getInfoDialog()
                .setTitle(i18n._('app.dialog.info.addcoins.title'))
                .setContentText(i18n._('app.dialog.info.addcoins.description', this.state.freeCoins.share))
                .show();
        }.bind(this));

        //console.log("share with friends");
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

    getShareButton: function () {
        return (
            <div className="outer-block">
                <FreeCoins onClick={this.onClickShare} className="inner-block share">
                    <div className="text">{i18n._('shop.share')}</div>
                    <div className="add-free-coins" style={this.state.dollar}>
                        +{this.state.freeCoins.share}</div>
                </FreeCoins>
            </div>
        );
    },

    showShareButton: function () {
        var lastShareDateString = appManager.getGameState().getLastShareDate();
        var todayDateString = moment().format("YYYYMMDD") || "";
        //var todayDateString = moment().format("YYYYMMDDHHmmss") || "";

        //if not shared ever
        if (lastShareDateString == "") {
            return this.getShareButton();
        }

        //daysSinceLastShare
        var daysSinceLastShare = moment(todayDateString, "YYYYMMDD").diff(moment(lastShareDateString, "YYYYMMDD"), "days");
        //var daysSinceLastShare = moment(todayDateString, "YYYYMMDDHHmmss").diff(moment(lastShareDateString, "YYYYMMDDHHmmss"), "seconds");

        //console.log(lastShareDateString);
        //console.log(daysSinceLastShare);

        if (daysSinceLastShare < appManager.getSettings().getShopValue('shareDays')) {
            return;
        }

        return this.getShareButton();
    },

    render: function () {

        var pageContentHeight = {
            paddingBottom: appAd.getBottomBannerHeight() + 'px'
        };

        return (

            <div className="page page-shop">
                <Counters isDisplayBackButton={true}/>

                <div ref="pageContent" className="page-content" style={pageContentHeight}>

                    <div ref="container" className={classNames("container", this.state.containerExtraClass)} >

                        <div className="heading free-coins">{i18n._('shop.free-coins')}</div>

                        <div className="outer-block">
                            <FreeCoins onClick={this.onClickWatchVideo} className="inner-block watch-video">
                                <div className="text">{i18n._('shop.watch-video')}</div>
                                <div className="add-free-coins" style={this.state.dollar}>
                                    +{this.state.freeCoins.watchVideo}</div>
                            </FreeCoins>
                        </div>

                        <div className="outer-block">
                            <FreeCoins onClick={this.onClickInviteFriends} className="inner-block share">
                                <div className="text">{i18n._('shop.invite-friends')}</div>
                                <div className="add-free-coins" style={this.state.dollar}>
                                    +{this.state.freeCoins.sendInvite}</div>
                            </FreeCoins>
                        </div>

                        {this.showShareButton()}

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