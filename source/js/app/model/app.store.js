/** @jsx React.DOM */
"use strict";

var AbstractEventEmitter = require('./abstract.eventemitter');
var Object = {assign: require('react/lib/Object.assign')};
//var appManager = require('./../app.manager');


var PRODUCT = {
    COINS: {
        COINSPACK_1: 'coinspack_1',
        COINSPACK_2: 'coinspack_2',
        COINSPACK_3: 'coinspack_3',
        COINSPACK_4: 'coinspack_4',
        COINSPACK_5: 'coinspack_5'
    },
    REMOVE_AD: 'remove_ad',
    ROUNDSBUNDLES: {
        EN: {
            //1: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_2'
            //},
            //2: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_3'
            //},
            //3: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_4'
            //},
            //4: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_5'
            //},
            //5: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_6'
            //},
            //6: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_7'
            //},
            //7: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_8'
            //},
            //8: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_9'
            //},
            //9: {
            //    ROUNDSBUNDLE_ID: 'en_roundsbundle_10'
            //}
        },
        RU: {
        //    1: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_2'
        //    },
        //    2: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_3'
        //    },
        //    3: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_4'
        //    },
        //    4: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_5'
        //    },
        //    5: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_6'
        //    },
        //    6: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_7'
        //    },
        //    7: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_8'
        //    },
        //    8: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_9'
        //    },
        //    9: {
        //        ROUNDSBUNDLE_ID: 'ru_roundsbundle_10'
        //    }
        }
    }
};

//var roundsBundlesNumber = appManager.getSettings().getRoundsBundles().length;
var roundsBundlesNumber = 10;
for (var i = 1; i < roundsBundlesNumber; i++) {
    PRODUCT.ROUNDSBUNDLES.EN[i] = {};
    PRODUCT.ROUNDSBUNDLES.EN[i].ROUNDSBUNDLE_ID = "en_roundsbundle_" + (i+1);
}
for (i = 1; i < roundsBundlesNumber; i++) {
    PRODUCT.ROUNDSBUNDLES.RU[i] = {};
    PRODUCT.ROUNDSBUNDLES.RU[i].ROUNDSBUNDLE_ID = "ru_roundsbundle_" + (i+1);
}

console.log(PRODUCT);

var AbstractStore = Object.assign({}, AbstractEventEmitter, {

    init: function(){
        return new Promise(function(resolve, reject){
            throw 'AbstractStore.init not implemented';
        }.bind(this));
    },

    getProduct: function(productId){
        console.log('Get product not implemented.');

        return {};
    },

    getProductPrice: function(productId){
        console.log('Get product price not implemented.');
        return '$0';
    },

    order: function(productId){
        console.log('Order not implemented.');
    }

});


var SiteStore = Object.assign({}, AbstractStore, {
    init: function(){
        return Promise.resolve();
    }
});

var CordovaStore = Object.assign({}, AbstractStore, {
    init: function(){
        return new Promise(function(resolve, reject){
            if(!window.hasOwnProperty('store')){
                throw 'Cordova store not isset.';
            }

//            store.verbosity = 0;
            if(CONST.ENV != 'production'){
                store.verbosity = store.DEBUG;
            }

            for (var k in PRODUCT.COINS) {
                if (!PRODUCT.COINS.hasOwnProperty(k)) {
                    continue;
                }

                store.register({
                    id: PRODUCT.COINS[k],
                    alias: PRODUCT.COINS[k],
                    type: store.CONSUMABLE
                });
                store.when(PRODUCT.COINS[k]).approved(function (order) {
                    var coins = this.getCoins(PRODUCT.COINS[k]);
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
                        id: PRODUCT.ROUNDSBUNDLES[k][m],
                        alias: PRODUCT.ROUNDSBUNDLES[k][m],
                        type: store.NON_CONSUMABLE
                    });
                    store.when(PRODUCT.ROUNDSBUNDLES[k][m]).approved(function (order) {
                        this.unlockRoundsBundle(roundsBundleNumber);
                        order.finish();
                    }.bind(this));
                    store.when(PRODUCT.ROUNDSBUNDLES[k][m]).updated(function (product) {
                        console.log(PRODUCT.ROUNDSBUNDLES[k][m]+(product.owned ? " OWNED" : " not owned")+"!");

                        var productOwned = product && product.owned ? true : false;
                        this.setRoundsBundle(roundsBundleNumber, productOwned);
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
                console.log("remove_ad "+(product.owned ? "OWNED" : "not owned")+"!");

                appAd.setAdRemoved(product && product.owned ? true : false);
            }.bind(this));


            store.ready(function() {
                console.log('store.ready');
                resolve();
            });

            store.when('initiated', function(){
                console.log('store.initiated');
            }.bind(this));
            store.when('refreshed', function(){
                console.log('store.refreshed');
                resolve();
            }.bind(this));

            store.refresh();
        }.bind(this));
    },

    getProduct: function(productId){
        return store.get(productId);
    },

    getProductPrice: function(productId){
        var product = store.get(productId);

        if(product && product.price){
            product.price = product.price.replace('₽', '<i class="fa fa-rub"></i>');
        }

        return product.price;
    },

    order: function(productId){
        store.order(productId);
    },

    getCoins: function(productId) {
        var purchases = appManager.getSettings().getPurchases() || {};

        for (var k in purchases) {
            if (!purchases.hasOwnProperty(k)) {
                continue;
            }

            if (k == productId) {
                return purchases[productId];
            }
        }

        return 0;
    },

    addCoins: function(coins){
        appManager.getGameState().addCoins(coins);
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.addcoins.title'))
            .setContentText(i18n._('app.dialog.info.addcoins.description', coins))
            .show();
    },

    removeAd: function(){
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.removead.title'))
            .setContentText(i18n._('app.dialog.info.removead.description'))
            .show();
    },

    unlockRoundsBundle: function(idx) {
        appManager.getGameState().setRoundsBundles(idx, "isUnlocked", true);
        appDialogs.getInfoDialog()
            .setTitle(i18n._('app.dialog.info.unlockroundsbundle.title'))
            .setContentText(i18n._('app.dialog.info.unlockroundsbundle.description', number))
            .show();
    },

    setRoundsBundle: function(idx, boolean) {
        appManager.getGameState().setRoundsBundles(idx, "isUnlocked", boolean);
    }

});



var StoreFactory = function(platform){
    switch(platform){
        case CONST.PLATFORM_IOS:
        case CONST.PLATFORM_ANDROID:
            return CordovaStore;
            break;

        case CONST.PLATFORM_SITE:
        default:
            return SiteStore;
            break;
    }
}

module.exports = {
    StoreFactory: StoreFactory,
    SiteStore: SiteStore,
    CordovaStore: CordovaStore,
    PRODUCT: PRODUCT
};



