/** @jsx React.DOM */
"use strict";


var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};


var PRODUCT = {
    COINS: {
        //ANDROID: {
            //COINSPACK_1: 'coinspack_1',
            //COINSPACK_2: 'coinspack_2',
            //COINSPACK_3: 'coinspack_3',
            //COINSPACK_4: 'coinspack_4',
            //COINSPACK_5: 'coinspack_5'
        //},
        //IOS: {
            //COINSPACK_1: 'coinspack_1',
            //COINSPACK_2: 'coinspack_2',
            //COINSPACK_3: 'coinspack_3',
            //COINSPACK_4: 'coinspack_4',
            //COINSPACK_5: 'coinspack_5'
        //}
    },
    //REMOVE_AD: 'remove_ad',
    ROUNDSBUNDLES: {
        EN: {},
        RU: {}
    }
};

var AbstractStore = Object.assign({}, AbstractEventEmitter, {

    init: function () {
        return new Promise(function (resolve, reject) {
            throw 'AbstractStore.init not implemented';
        }.bind(this));
    },

    getProduct: function (productId) {
        console.log('Get product not implemented.');

        return {};
    },

    getProductPrice: function (productId) {
        console.log('Get product price not implemented.');
        return '$0';
    },

    order: function (productId) {
        console.log('Order not implemented.');
    }

});


var SiteStore = Object.assign({}, AbstractStore, {
    init: function () {
        return Promise.resolve();
    }
});

var CordovaStore = Object.assign({}, AbstractStore, {
    init: function () {

        var coinsPurchaseIds = appManager.getSettings().getShopValue("coins");
        for (var k in coinsPurchaseIds) {
            if (!coinsPurchaseIds.hasOwnProperty(k)) {
                continue;
            }

            var platform = k.toUpperCase();
            PRODUCT.COINS[platform] = {};
            for (var i = 0; i < coinsPurchaseIds[k].length; i++) {
                PRODUCT.COINS[platform]["COINSPACK_" + (i + 1)] = coinsPurchaseIds[k][i].purchaseId;
            }
        }

        var roundsBundlesNumber = appManager.getSettings().getRoundsBundles().length;
        var roundsBundlePurchaseIdPrefixes = appManager.getSettings().getShopValue("roundsBundles");
        for (i = 1; i < roundsBundlesNumber; i++) {
            PRODUCT.ROUNDSBUNDLES.EN[roundsBundlePurchaseIdPrefixes.en + (i + 1)] = i;
        }
        for (i = 1; i < roundsBundlesNumber; i++) {
            PRODUCT.ROUNDSBUNDLES.RU[roundsBundlePurchaseIdPrefixes.ru + (i + 1)] = i;
        }

        PRODUCT.REMOVE_AD = appManager.getSettings().getShopValue("removeAds");

        console.log(PRODUCT);

        return new Promise(function (resolve, reject) {
            if (!window.hasOwnProperty('store')) {
                throw 'Cordova store not isset.';
            }

//            store.verbosity = 0;
            if (CONST.ENV != 'production') {
                store.verbosity = store.DEBUG;
            }

            var platform = CONST.CURRENT_PLATFORM.toUpperCase();
            console.log({platform: platform});

            for (var k in PRODUCT.COINS[platform]) {
                if (!PRODUCT.COINS[platform].hasOwnProperty(k)) {
                    continue;
                }

                console.log(PRODUCT.COINS[platform][k]);
                store.register({
                    id: PRODUCT.COINS[platform][k],
                    alias: PRODUCT.COINS[platform][k],
                    type: store.CONSUMABLE
                });
                store.when(PRODUCT.COINS[platform][k]).approved(function (order) {
                    console.log(order);

                    var coins = this.getCoins(order.id);
                    this.addCoins(coins);
                    order.finish();
                }.bind(this));
            }

            for (k in PRODUCT.ROUNDSBUNDLES) {
                if (!PRODUCT.ROUNDSBUNDLES.hasOwnProperty(k)) {
                    continue;
                }

                for (var m in PRODUCT.ROUNDSBUNDLES[k]) {
                    if (!PRODUCT.ROUNDSBUNDLES[k].hasOwnProperty(m)) {
                        continue;
                    }

                    store.register({
                        id: m,
                        alias: m,
                        type: store.NON_CONSUMABLE
                    });
                    store.when(m).approved(function (order) {
                        this.unlockRoundsBundle(order.id);
                        order.finish();
                    }.bind(this));
                    store.when(m).updated(function (product) {
                        console.log(product.id + (product.owned ? " OWNED" : " not owned") + "!");

                        var productOwned = product && product.owned ? true : false;
                        this.setRoundsBundle(product.id, productOwned);
                    }.bind(this));
                }
            }

            store.register({
                id: PRODUCT.REMOVE_AD,
                alias: PRODUCT.REMOVE_AD,
                type: store.NON_CONSUMABLE
            });
            store.when(PRODUCT.REMOVE_AD).approved(function (order) {
                this.removeAd();
                order.finish();
            }.bind(this));
            store.when(PRODUCT.REMOVE_AD).updated(function (product) {
                console.log("remove_ad " + (product.owned ? "OWNED" : "not owned") + "!");

                appAd.setAdRemoved(product && product.owned ? true : false);
            }.bind(this));


            store.ready(function () {
                console.log('store.ready');
                resolve();
            });

            store.when('initiated', function () {
                console.log('store.initiated');
            }.bind(this));
            store.when('refreshed', function () {
                console.log('store.refreshed');
                resolve();
            }.bind(this));

            store.refresh();
        }.bind(this));
    },

    getProduct: function (productId) {
        return store.get(productId);
    },

    getProductPrice: function (productId) {
        var product = store.get(productId);

        if (product && product.price) {
            product.price = product.price.replace('₽', '<i class="fa fa-rub"></i>');
        }

        return product.price;
    },

    order: function (productId) {
        store.order(productId);
    },

    getCoins: function (productId) {
        var purchases = appManager.getSettings().getPurchases() || {};

        if (!purchases.hasOwnProperty(productId)) {
            return 0;
        }

        return purchases[productId].purchaseCoins;
    },

    addCoins: function (coins) {
        appManager.getGameState().addCoins(coins);
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.addcoins.title'))
            .setContentText(i18n._('app.dialog.info.addcoins.description', coins))
            .show();
    },

    removeAd: function () {
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.removead.title'))
            .setContentText(i18n._('app.dialog.info.removead.description'))
            .show();
    },

    getRoundsBundleIndex: function (productId) {
        var roundsBundlesIds = PRODUCT.ROUNDSBUNDLES[router.getLanguage().toUpperCase()];

        for (var k in roundsBundlesIds) {
            if (!roundsBundlesIds.hasOwnProperty(k)) {
                continue;
            }

            if (k == productId) {
                return roundsBundlesIds[productId];
            }
        }

        return false;
    },

    unlockRoundsBundle: function (productId) {
        var idx = this.getRoundsBundleIndex(productId);
        if (idx === false) {
            console.log("roundsBundle id is invalid, wrong language");
            return;
        }

        var roundsBundle = appManager.getGameState().getRoundsBundles(idx);
        appManager.getGameState().setRoundsBundles(idx, "isUnlocked", true);

        if (roundsBundle.hasOwnProperty("dialogueWasShown") && roundsBundle.dialogueWasShown) {
            console.log("dialog was already shown");
        } else {
            appDialogs.getInfoDialog()
                .setTitle(i18n._('app.dialog.info.unlockroundsbundle.title'))
                .setContentText(i18n._('app.dialog.info.unlockroundsbundle.description', idx + 1))
                .show();
            appManager.getGameState().setRoundsBundles(idx, "dialogueWasShown", true);
        }
    },

    setRoundsBundle: function (productId, boolean) {
        var idx = this.getRoundsBundleIndex(productId);
        appManager.getGameState().setRoundsBundles(idx, "isUnlocked", boolean);
    }

});


var StoreFactory = function (platform) {
    switch (platform) {
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            return CordovaStore;
            break;

        case CONST.PLATFORM_SITE:
        default:
            return SiteStore;
            break;
    }
};

module.exports = {
    StoreFactory: StoreFactory,
    SiteStore: SiteStore,
    CordovaStore: CordovaStore,
    PRODUCT: PRODUCT
};



