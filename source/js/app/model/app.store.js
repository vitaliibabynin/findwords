/** @jsx React.DOM */
"use strict";


var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};


var PRODUCT = {
    COINS: {},
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
    },

    refresh: function(){
        console.log('Rfresh not implemented.');
        return Promise.resolve();
    }

});


var SiteStore = Object.assign({}, AbstractStore, {
    init: function () {
        return Promise.resolve();
    }
});

var CordovaStore = Object.assign({}, AbstractStore, {
    init: function () {

        var coinsPurchaseIds = appManager.getSettings().getShopValue("coins")[CONST.CURRENT_PLATFORM];

        for (var i = 0; i < coinsPurchaseIds.length; i++) {
            PRODUCT.COINS["COINSPACK_" + (i + 1)] = coinsPurchaseIds[i].purchaseId;
        }

        var roundsBundlesNumber = appManager.getSettings().getRoundsBundles().length;
        var roundsBundlePurchaseIdPrefixes = appManager.getSettings().getShopValue("roundsBundles")[CONST.CURRENT_PLATFORM];
        for (i = 1; i < roundsBundlesNumber; i++) {
            PRODUCT.ROUNDSBUNDLES.EN[roundsBundlePurchaseIdPrefixes.en + (i + 1)] = i;
        }
        for (i = 1; i < roundsBundlesNumber; i++) {
            PRODUCT.ROUNDSBUNDLES.RU[roundsBundlePurchaseIdPrefixes.ru + (i + 1)] = i;
        }

        PRODUCT.REMOVE_AD = appManager.getSettings().getShopValue("removeAds")[CONST.CURRENT_PLATFORM];

        //console.log(PRODUCT);

        return new Promise(function (resolve, reject) {
            if (!window.hasOwnProperty('store')) {
                throw 'Cordova store not isset.';
            }

//            store.verbosity = 0;
            if (CONST.ENV != 'production') {
                store.verbosity = store.DEBUG;
            }

            for (var k in PRODUCT.COINS) {
                if (!PRODUCT.COINS.hasOwnProperty(k)) {
                    continue;
                }

                console.log(PRODUCT.COINS[k]);
                store.register({
                    id: PRODUCT.COINS[k],
                    alias: PRODUCT.COINS[k],
                    type: store.CONSUMABLE
                });
                store.when(PRODUCT.COINS[k]).approved(function (order) {
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

                appManager.getGameState().setRemoveAds(product && product.owned ? true : false);
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

    refresh: function(){
        return new Promise(function(resolve, reject){
            store.when('refreshed', function(){
                console.log('refresh:store.refreshed');
                resolve();
            }.bind(this));

            store.refresh();
        }.bind(this));
    },

    getCoins: function (productId) {
        var purchases = appManager.getSettings().getPurchases() || {};

        for (var k in purchases) {
            if (!purchases.hasOwnProperty(k)) {
                continue;
            }

            if (purchases[k].purchaseId == productId) {
                return purchases[k].purchaseCoins;
            }
        }

        return 0;
    },

    addCoins: function (coins) {
        appManager.getGameState().addCoins(coins);
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.addcoins.title'))
            .setContentText(i18n._('app.dialog.info.addcoins.description', coins))
            .show();
    },

    removeAd: function () {
        appManager.getGameState().setRemoveAds(true);
        appAd.setAdRemoved(true);

        if (appManager.getGameState().getRemoveAdsDialogueShown()) {
            console.log("remove ads dialogue already shown");
            return;
        }

        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.removead.title'))
            .setContentText(i18n._('app.dialog.info.removead.description'))
            .show();

        appManager.getGameState().setRemoveAdsDialogueShown(true);
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
            console.log("roundsBundleId is invalid, wrong language");
            return;
        }

        var roundsBundle = appManager.getGameState().getRoundsBundles(idx);
        if (roundsBundle.isPurchased == false) {
            appManager.getGameState().setRoundsBundles(idx, "isPurchased", true);
        }

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
        if (idx === false) {
            console.log("roundsBundleId is invalid, wrong language");
            return;
        }

        var roundsBundle = appManager.getGameState().getRoundsBundles(idx);
        if (roundsBundle.isPurchased != boolean) {
            console.log("setting " + productId + " to: " + boolean);
            appManager.getGameState().setRoundsBundles(idx, "isPurchased", boolean);
        }
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



